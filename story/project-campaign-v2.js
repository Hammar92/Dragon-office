/* One project clock, three project metrics, evidence ledger and bounded authority. */
(function(root){
 'use strict';
 const data=typeof module!=='undefined'&&module.exports?require('./campaign-v2-data.js'):root.DragonCampaignData;
 const clone=x=>JSON.parse(JSON.stringify(x)),cap=x=>Math.max(0,Math.min(100,x));
 const dialogue=typeof module!=='undefined'&&module.exports?require('./dialogue-scenes.js'):root.StoryDialogue;
 const responsibilities=typeof module!=='undefined'&&module.exports?require('./responsibilities.js'):root.StoryResponsibilities;
 const metrics=['progress','cash','quality','coalition','boss','credit','obstruction'];
 const labels={progress:'验收进度',cash:'现金（万元）',quality:'已核查质量',coalition:'职能支持',boss:'老板认可',credit:'交付记录',obstruction:'管理摩擦'};
 function fresh(migrated){return Object.assign({},data.initial,{version:2,product:data.product.code,flags:{},proofs:{},risks:[],history:[],entries:{},financing:{},milestones:{},coalition:30,boss:30,credit:10,obstruction:20,rank:0,authority:0,promotionHistory:[],btd:{status:'potential'},teamReady:false,dailyMeeting:false,meetingReformed:false,careCount:0,finished:false,migrated:!!migrated,offers:{newCompany:Math.random()<0.60},events:[]});}
 function ensureVersion(p){if(!p||p.version!==2){const n=fresh(true);n.events.push('旧存档的分数不代表新版证据；从当前阶段重新核查。');return n;}return p;}
 function patch(p,x){if(!x)return;metrics.forEach(k=>{if(Number.isFinite(x[k]))p[k]=k==='cash'?Math.max(0,p[k]+x[k]):cap(p[k]+x[k]);});if(x.set)Object.assign(p.flags,x.set);}
 function risk(p,key,index){if(!p.risks.some(r=>r.key===key&&r.status!=='closed'))p.risks.push({key,index,status:'open',source:'有异议或来源未核实，不能以措辞关闭',visible:false});}
 function inspect(p,index){p.risks.filter(r=>r.status==='open'&&(index===7||index===13||index===15||data.financing.some(f=>f.index===index))).forEach(r=>{r.visible=true;p.quality=cap(p.quality-4);r.status='exposed';p.events.push('复核发现：'+r.key+'，相关交付仍需真实修复。');});}
 function missing(p,keys){return keys.filter(k=>!p.proofs[k]||p.risks.some(r=>r.key===k&&r.status!=='closed'));}
 function funding(p,f){
  let record=p.financing[f.id];if(record&&record.settled)return;
  if(p.months<f.month)return;
  const gaps=missing(p,f.proof),late=p.months-f.month;
  if(!record)record=p.financing[f.id]={id:f.id,due:f.month,amount:0,paid:0,status:'unmet',settled:false};
  if(gaps.length||p.progress<f.progress||p.quality<f.quality-10){record.missing=gaps;record.status='unmet';if(late>3){record.settled=true;record.status='window_closed';}return;}
  if(late>3){record.status='window_closed';record.settled=true;return;}
  const full=p.quality>=f.quality,base=f.amount*(full?1:0.6)*(late>0?0.7:1);
  record.amount=Math.round(base*(full&&late===0&&p.btd.status==='granted'?1.2:1));record.status=late>0?'renegotiated':full?'full':'conditional';record.settled=true;record.missing=[];
  // A signed commitment is not cash; later tranche has achievable first-stage prerequisites.
  const fraction=f.id==='eop2'?(p.coalition>=55&&p.boss>=45?0.60:0.40):1;
  record.paid=Math.round(record.amount*fraction);record.remaining=record.amount-record.paid;p.cash+=record.paid;
  p.events.push('第'+f.month+'月融资：协议'+record.amount+'万元，本次到账'+record.paid+'万元。');
 }
 function release(p){const r=p.financing.eop2;if(r&&r.remaining>0&&p.proofs.supply&&p.proofs.budget){p.cash+=r.remaining;r.paid+=r.remaining;p.events.push('供应与首期执行条件成立，后续'+r.remaining+'万元实际到账。');r.remaining=0;}}
 function advance(p,months,index){
  // Check deadlines on passage of time, even if the corresponding chapter is not reached.
  const end=p.months+months,burn=(index<10?50:100)+(p.staffCount||0)*15;
  data.financing.filter(f=>f.month>p.months&&f.month<end).forEach(f=>{p.cash=Math.max(0,p.cash-(f.month-p.months)*burn);p.months=f.month;funding(p,f);});
  p.cash=Math.max(0,p.cash-(end-p.months)*burn);p.months=end;
  data.financing.forEach(f=>funding(p,f));
  if(p.btd.status==='pending'&&p.months>=p.btd.requestedAt+2){p.btd.status=p.quality>=75&&p.flags.clinicalAdvantage&&!missing(p,['dose','safety','signal']).length?'granted':'needs_evidence';p.events.push(p.btd.status==='granted'?'突破性治疗认定获得；后续沟通可条件提速。':'认定需要补充证据；常规开发仍可继续。');}
 }
 function gate(p,name){
  const f=data.financing.find(x=>x.id===name);
  const keys=name==='nda'?data.chapters.map(x=>x.proof):f?f.proof:[];
  const gaps=missing(p,keys),q=name==='nda'?80:f?f.quality:0,progress=name==='nda'?100:f?f.progress:0;
  if(p.quality<q)gaps.push('质量不足');if(p.progress<progress)gaps.push('验收进度不足');if(name==='nda'&&p.cash<=0)gaps.push('递交响应资金不足');
  return{outcome:gaps.length?'blocked':'ready',missing:gaps};
 }
 function promotion(p,index){
  const count=p.history.filter(h=>h.kind==='work'||h.kind==='authority'||h.kind==='btd'||h.kind==='delegation').length;
  let next=p.rank;
  if(index>=5&&count>=2&&p.credit>=30&&p.boss>=42&&p.coalition>=40)next=Math.max(next,1);
  if(index>=10&&p.rank>=1&&p.authority>=1&&p.flags.authorityApproved&&p.proofs.budget&&p.cash>0)next=Math.max(next,2);
  if(index>=16&&p.rank>=2&&p.teamReady&&p.proofs.integration&&p.credit>=65&&p.boss>=55&&p.coalition>=55)next=Math.max(next,3);
  if(next>p.rank){p.promotionHistory.push({index,from:p.rank,to:next,approved:true,scope:next===1?'医学专题':next===2?'已批准三期工作包':'正式项目负责人'});p.rank=next;p.events.push('正式任命：'+data.ranks[next]+'。职责与授权范围已记录；专业owner仍各自确认结论。');}
 }
 function canAuthority(p){return p.credit>=40&&p.boss>=45&&p.coalition>=50&&(p.supporters||[]).length>=2&&p.proofs.eop2&&!missing(p,['dose2','safety2','sites','eop2']).length&&p.cash>=2500;}
 function available(p,index){
  const d=data.chapters[index],rows=[];
  const bad=p.risks.filter(r=>r.status!=='closed');
  rows.push({kind:'work',t:bad.length?'先完成真实补证与当前交付：'+d.honest:d.honest,route:'govern',extraCost:bad.length?250:0,extraMonths:bad.length?0.5:0});
  rows.push({kind:'shortcut',t:d.shortcut,route:'appease'});
  if(index===1&&p.proofs.fih)rows.push({kind:'safetyReview',t:'援引已确认的暂停与恢复标准，请PVP保留独立意见并启动正式复核。',route:'govern'});
  if(index===3&&p.credit>=20&&p.boss>=35)rows.push({kind:'present',t:'带已有交付记录亲自回答一期限制，并保留团队署名。',route:'govern'});
  if(index===4&&p.cash>=d.cost+600)rows.push({kind:'exploration',t:'保留主要临床问题，只对有明确用途的机制子研究另列预算与访视。',route:'govern',extraCost:600,extraMonths:0.5});
  if(index===7&&p.proofs.safety&&p.coalition>=42)rows.push({kind:'safetyReview',t:'带早期时间线邀请PVP和加琳共同汇报，将待补材料与即时安全决定分开。',route:'govern',extraCost:150});
  if(index===6&&p.progress>=40&&p.quality>=75&&p.flags.clinicalAdvantage&&!missing(p,['dose','safety','signal']).length&&p.btd.status!=='granted'&&p.btd.status!=='pending')rows.push({kind:'btd',t:'用可信临床优势提交认定请求，同时按预设规则继续IIb。',route:'govern'});
  if(index===10&&canAuthority(p))rows.push({kind:'authority',t:'用已到账预算、团队支持与交付记录，请老板确认工作包运行权及副总监评审。',route:'power'});
  if(index===12&&p.authority>0&&p.proofs.supply)rows.push({kind:'delegation',t:'按已批岗位安排接替与中心支持，申请将每日全员会改为限时阻塞会。',route:'govern'});
  if(index===13)rows.push({kind:'delay',t:'不补造来源：调查关键Query，接受延期并写清分析边界。',route:'govern',extraCost:200,extraMonths:1});
  if(index===13)rows.push({kind:'fraud',t:'把未观察的来源补写成已确认，留下本人签字。风险：后续核查可使结论失效。',route:'power'});
  if(index===15&&p.rank>=2&&p.authority&&p.teamReady&&p.boss>=65&&p.coalition>=65)rows.push({kind:'department',t:'用已经履行的跨职能职责，请老板批准部门级申报统筹试任，明确岗位和资源。',route:'power'});
  if(index===17&&p.rank>=3&&p.flags.departmentDutyCompleted&&p.teamReady&&p.boss>=70&&p.coalition>=65)rows.push({kind:'vp',t:'依据部门试任的真实交付与批准岗位，进入VP正式任命与职责重划。',route:'power'});
  if(index===17&&p.authority>=1&&p.rank>=2)rows.push({kind:'concentrate',t:'把后续所有对外入口收归自己，替团队继续兜底。',route:'power'});
  return rows;
 }
 function chapter(index,p){
  p=ensureVersion(p);const d=data.chapters[index];if(!d)throw Error('Invalid chapter');
  const rows=available(p,index);
  const text='DO-8006 · 皮下注射液。开发至NDA递交；认定需实际数据，不是开局身份。\n\n'+d.politics+'\n\n'+(p.risks.some(r=>r.status!=='closed')?'前期异议仍在：'+p.risks.filter(r=>r.status!=='closed').map(r=>r.key).join('、')+'。':'已有记录将决定本阶段可以采取的行动。')+'\n\n'+summary(p);
  const ch={id:d.id,n:d.n,stage:d.stage,act:d.act,title:d.title,aside:{from:d.from,text:'当前交付：'+d.honest},text,campaign:true,choices:rows.map((r,j)=>({t:r.t,route:r.route,achievement:'a'+(index*3+Math.min(j,2)+1),achievementName:d.title,e:{progress:0,trust:r.kind==='shortcut'?3:-1,power:r.kind==='authority'?4:0,morale:r.kind==='shortcut'?-2:1,heart:r.kind==='shortcut'?2:2,sanity:r.kind==='shortcut'?-2:0},npc:r.kind==='shortcut'?{}:Object.fromEntries((index===1?['pvp','jialin']:index===2?['zihan','mingye']:index===4?['miaomiao','yangyang']:index===8?['kzong','heina']:index===13?['xiaoen','zihan']:['yijian','kzong']).map(k=>[k,2])),r:r.kind==='shortcut'?'表面日期保住了，未核实的内容仍留下来源与责任记录。':'实际交付、限制与专业owner一并记录。',project:{set:{}},record:r.kind==='shortcut'?undefined:'campaign_'+d.proof,campaignChoice:{index,kind:r.kind,slot:j,extraCost:r.extraCost||0,extraMonths:r.extraMonths||0,context:false}}))};
  ch.text=dialogue.text(index,p)+'\n\n'+summary(p);ch.location=dialogue.scenes[index].place;ch.aside=undefined;ch.from=d.from;ch.responsibility=d.responsibility;
  ch.choices.forEach(c=>{c.t=dialogue.choice(index,c.campaignChoice.kind,p);c.npc=['shortcut','fraud','concentrate'].includes(c.campaignChoice.kind)?{}:Object.fromEntries(responsibilities.chapters[index].npc.map(k=>[k,2]));});
  return ch;
 }
 function apply(p,c){
  const m=c.campaignChoice;if(!m)return null;if(m.context){p.careCount++;return null;}
  if(p.history.some(h=>h.index===m.index))return null;
  const d=data.chapters[m.index],before=clone(p),bad=p.risks.filter(r=>r.status!=='closed'),kind=m.kind||'work';
  const actualCost=d.cost+(m.extraCost||0);let elapsed=d.months+(m.extraMonths||0);
  if(p.cash<actualCost){p.events.push('现金不足，当前研究没有执行：保留资料，提出缩小／补证或停止安排。');p.flags.cashConstraint=true;}
  else{
   p.cash-=actualCost;
   if(kind==='shortcut'||kind==='fraud'){
    p.proofs[d.proof]=true;p.credit=cap(p.credit+1);p.obstruction=cap(p.obstruction+5);
    risk(p,d.proof,m.index);if(kind==='fraud')p.flags.fraud=true;
   }else{
    // Repair needs source verification and real time/payment; fraud cannot be erased by a later choice.
    bad.filter(r=>r.key!=='lock'||!p.flags.fraud).forEach(r=>{r.status='closed';p.proofs[r.key]=true;p.progress=cap(p.progress+data.chapters[r.index].progress);p.quality=cap(p.quality+3);});
    p.proofs[d.proof]=true;p.progress=cap(p.progress+d.progress);p.quality=cap(p.quality+(m.index<4?4:3));
    p.coalition=cap(p.coalition+4);p.boss=cap(p.boss+3);p.credit=cap(p.credit+5);
    const support=m.index===1?['PV']:m.index===2?['统计']:m.index===4?['运营']:m.index===8?['CRO执行']:m.index===13?['质量']:[];p.supporters=Array.from(new Set((p.supporters||[]).concat(support)));
    if(m.index===5)p.flags.clinicalAdvantage=p.flags.negativeClinicalData?false:p.proofs.design&&p.proofs.dose&&p.proofs.safety;
    if(kind==='btd'){p.btd={status:'pending',requestedAt:p.months};p.events.push('认定请求已提交；资格不是获得认定。');}
    if(kind==='authority'&&canAuthority(before)){p.authority=1;p.flags.authorityApproved=true;p.events.push('老板批准有限运行权，专业确认仍由owner完成。');}
    if(kind==='delegation'){p.teamReady=true;p.meetingReformed=true;p.dailyMeeting=false;}
    if(kind==='department'){p.flags.departmentPilot=true;p.events.push('部门级统筹试任获批，需完成整合与复核后才可进入VP评审。');}
    if(m.index===16&&p.flags.departmentPilot&&p.proofs.integration&&p.proofs.prenda){p.flags.departmentDutyCompleted=true;}
    if(kind==='vp'&&before.rank>=3&&before.flags.departmentDutyCompleted){p.rank=4;p.authority=2;p.promotionHistory.push({index:m.index,from:3,to:4,approved:true,scope:'批准的临床开发部门；原VP职责重划'});p.events.push('高层正式任命临床开发VP并确认职责重划，不由一场辩论自动接替钟时。');}
    if(kind==='concentrate'){p.flags.centralized=true;p.teamReady=false;p.coalition=cap(p.coalition-12);}
   }
  }
  if(m.index>=8&&!p.meetingReformed&&(bad.length||p.coalition<50)){p.dailyMeeting=true;p.events.push('钟时要求每天九点逐人报进度，等待资源决定的阻塞没有消失。');}
  if(p.dailyMeeting&&m.index>=12&&!p.meetingReformed){elapsed+=0.25;p.events.push('全员会与日报挤占关键核查工作，本阶段延后0.25个月。');}
  if(p.btd.status==='granted'&&!p.flags['accelerated_'+m.index]&&kind!=='shortcut'&&[9,15].includes(m.index)&&p.coalition>=50&&p.cash>0){elapsed=Math.max(0.5,elapsed-1);p.flags['accelerated_'+m.index]=true;p.events.push('具备认定、资料与协作条件，本次沟通少等待1个月。');}
  inspect(p,m.index);release(p);advance(p,elapsed,m.index);
  const h={index:m.index,slot:m.slot,kind,stage:d.stage,title:d.title,delta:{},cases:bad.map(r=>r.key)};metrics.concat('months').forEach(k=>{if(p[k]!==before[k])h.delta[k]=p[k]-before[k];});p.history.push(h);promotion(p,m.index);
  if(m.index===17){p.finished=true;const g=gate(p,'nda');p.milestones.nda=g;p.outcome=p.flags.negativeClinicalData?'scientific_stop':g.outcome==='ready'?'submitted':p.cash<=0?'stopped':'deferred';p.career=p.credit>=55&&p.boss>=45&&p.coalition>=45?'recognized':p.credit>=55?'isolated':'unrecognized';}
  return h;
 }
 function summary(p){return '验收进度 '+p.progress+' / 100 · 现金 '+Math.round(p.cash)+'万元 · 已核查质量 '+p.quality+' / 100\n开发第'+p.months+'月 · '+data.ranks[p.rank]+' · 授权 '+(p.authority?'已批工作包':'本人职责')+' · 认定 '+({potential:'尚待证据',pending:'评估中',granted:'已获得',needs_evidence:'需补证'}[p.btd.status])+(p.finished?'\n'+({submitted:'已正式递交 NDA；尚未获批',deferred:'NDA暂缓：真实资料仍需补证',stopped:'开发暂停／停止：资金不足',scientific_stop:'研究不支持继续开发：如实保留负面结果'}[p.outcome]):'');}
 const api={data,metrics,labels,fresh,patch,gate,chapter,apply,summary,available,canAuthority,advance,funding,ensureVersion};
 if(typeof module!=='undefined'&&module.exports){module.exports=api;return;}
 root.ProjectCampaignV2=api;root.ProjectCampaignV1=api;
 function ensure(){S.campaign=ensureVersion(S.campaign);return S.campaign;}api.ensure=ensure;
 V12_BRANCH_VARIANTS={};root.V12_BRANCH_VARIANTS=V12_BRANCH_VARIANTS;
 V11_CHAPTERS.splice(0,V11_CHAPTERS.length,...data.chapters.map((_,i)=>chapter(i,fresh(false))));
 buildDevelopmentTimeline=function(){return data.chapters.map((_,i)=>chapter(i,S&&S.campaign?S.campaign:fresh(false)));};
 const oldContext=contextualChoiceList;contextualChoiceList=function(list){if(list&&list.some(c=>c.campaignChoice))return list;return oldContext.apply(this,arguments);};
 const oldRecruit=root.showRecruit147,oldOffer=root.offerCandidate147;
 if(oldRecruit)root.showRecruit147=function(){const p=ensure();if(!p.authority||!p.flags.authorityApproved||p.rank<2||p.cash<300){toast('招聘需要已批准岗位、运行权限与至少300万元的可执行预算','down');return;}if(root.teamState147().members.length>=(p.rank>=3?2:1)){toast('已批准编制已满，新增岗位需要再确认','down');return;}return oldRecruit();};
 if(oldOffer)root.offerCandidate147=function(){const p=ensure(),t=root.teamState147();if(!p.authority||!p.flags.authorityApproved||p.cash<300||t.members.length>=(p.rank>=3?2:1)){toast('当前没有可执行的新增岗位预算','down');return;}const before=t.members.length,r=oldOffer();if(t.members.length>before){p.cash-=300;p.staffCount=t.members.length;p.events.push('岗位实际入职，投入300万元；后续固定现金消耗包含人员支持。');}return r;};
 const oldStart=startGame;startGame=function(){const r=oldStart.apply(this,arguments);if(r===false)return r;S.campaign=fresh(false);flags.careerDecision='stay';root._careerPending=false;root._careerChoices=null;runChapters=buildDevelopmentTimeline();renderChapter();return r;};
 const oldRender=renderChapter;renderChapter=function(){if(S&&data.chapters[chapterIdx])runChapters[chapterIdx]=chapter(chapterIdx,ensure());return oldRender.apply(this,arguments);};
 const oldApply=applyChoice;applyChoice=function(c){if(c&&c.campaignChoice&&ensure().history.some(h=>h.index===c.campaignChoice.index))return;const h=c&&c.campaignChoice?apply(ensure(),c):null;const r=oldApply.apply(this,arguments);if(h){const p=ensure();S.progress=p.progress;S.bossTrust=cap((S.bossTrust||0)+Math.max(0,h.delta.boss||0));S.merit=cap((S.merit||0)+Math.max(0,h.delta.credit||0));c.r+='\n'+summary(p)+'\n'+p.events.slice(-3).join('\n');if(p.flags.centralized)S.dragon=Math.max(12,S.dragon||0);if(p.rank>=2)S.power=Math.max(50,S.power||0);}return r;};
 // Formal review comes before ending; relationship alone cannot kill an authorized career.
 const oldDeath=checkDeath;checkDeath=function(text,deltas,next){
  if(S&&S.campaign&&S.campaign.version===2){const p=ensure();
   if(S.heart<=0){if(p.teamReady&&!p.flags.usedLeave){p.flags.usedLeave=true;S.heart=35;S.stamina=40;p.events.push('有合格替补，休假后回归；项目按已批范围继续。');showResult(text+'\n你完成交接后休假，团队接替既定工作。',deltas,next);return;}showResult(text,deltas,()=>showEnding('be_heart'));return;}
   if(S.sanity<=0){showResult(text,deltas,()=>showEnding('be_sanity'));return;}
   if(S.trust<=0){S.trust=1;p.events.push('与钟时关系破裂，后续通过正式责任和老板确认沟通。');}
   if(S.morale<=0){showResult(text,deltas,()=>showEnding('be_morale'));return;}
   showResult(text,deltas,next);return;
  }return oldDeath.apply(this,arguments);
 };
 const priorEvaluate=evaluateFinal;evaluateFinal=function(){const p=ensure();if(!p.finished)return priorEvaluate.apply(this,arguments);if(!flags.careerReviewed){
  const eligible=p.credit>=45&&p.quality>=60&&p.offers.newCompany&&!p.flags.fraud;
  root._careerPending=true;root._careerChoices=[{id:'stay',t:'留在当前岗位或正式任命范围，明确下一阶段责任。'}];
  if(eligible)root._careerChoices.push({id:'depart',t:'接受已确认的新公司邀约，完成交接后离开。'});
  document.getElementById('scene-area').innerHTML='<div class="scene"><h2>项目之后，你选择去哪</h2><p>'+summary(p)+'</p>'+root._careerChoices.map((x,i)=>'<button class="choice" onclick="pickCareerChoice('+i+')">'+x.t+'</button>').join('')+'</div>';return;
 }return priorEvaluate.apply(this,arguments);};
 root.pickCareerChoice=function(i){const c=root._careerChoices&&root._careerChoices[i];if(!c||!root._careerPending)return;flags.careerDecision=c.id;flags.careerReviewed=true;root._careerPending=false;if(c.id==='depart'){showEnding('ge_next');return;}priorEvaluate();};
 const oldFinal=finalizeEvaluation;finalizeEvaluation=function(){const p=ensure();if(p.finished){if(p.outcome!=='submitted')S.progress=Math.min(p.outcome==='stopped'?34:59,S.progress);if(p.flags.fraud){showEnding('be_fraud');return;}if(p.flags.centralized){showEnding('true_dragon');return;}if(p.rank>=2){showEnding('ge_promotion');return;}}return oldFinal.apply(this,arguments);};
 const oldEnding=showEnding;showEnding=function(id){const p=S&&S.campaign&&S.campaign.version===2?ensure():null;
  if(p&&p.finished&&id==='ge_project'&&p.outcome!=='submitted')id=p.outcome==='stopped'?'be_progress':'mid_halfbridge';
  if(p&&id==='ge_next'&&flags.careerDecision!=='depart')id=p.career==='recognized'?'ge_firstline':'ge_survive';
  const ending=ENDINGS[id],saved=ending&&ending.story;
  if(p&&p.finished&&ending){ending.story=summary(p)+'\n\n'+(id==='true_dragon'?'你收拢了所有对外入口，团队必须经过你才能推进。':id==='ge_promotion'?'正式岗位来自实际交付、团队支持和批准职责。晋升不能代替项目验收。':id==='ge_next'?'你接受了已确认的邀约，完成交接后前往新的团队。':'项目结果和职业评价已经分开记录，个人际遇不能替代临床证据。');}
  let r;try{r=oldEnding(id);}finally{if(ending)ending.story=saved;}if(p){const node=document.getElementById('ending-screen');if(node){let organization=p.flags.centralized?'终成恶龙：所有入口都集中到你身上。':p.teamReady?'建立接替：你不在，团队仍能执行。':p.credit>=55&&p.rank<2?'金牌救火队员：交付归你，实际运行位置没有兑现。':'按已有职责继续运行。';node.insertAdjacentHTML('beforeend','<div class="panel" style="white-space:pre-line"><h3>产品、职业与组织结果</h3>'+summary(p)+'\n职业：'+(flags.careerDecision==='depart'?'接受真实邀约，交接后离开':data.ranks[p.rank]+' · '+({recognized:'贡献获认可',isolated:'贡献未换来团队位置',unrecognized:'贡献未获充分认可'}[p.career]||'阶段尚未结束'))+'\n组织：'+organization+'\n'+p.events.slice(-4).join('\n')+'</div>');}}return r;};
 api.eventAllowed=function(e,i){return !e.campaignStages||e.campaignStages.includes(data.chapters[Math.min(17,i)].stage);};
 if(ENDINGS.ge_project)ENDINGS.ge_project.name='GE · NDA递交了';if(ENDINGS.true_dragon)ENDINGS.true_dragon.name='终成恶龙';
 if(ENDINGS.nc_caolan){ENDINGS.nc_caolan.name='NPC · 合作谈判的门';ENDINGS.nc_caolan.story=ENDINGS.nc_caolan.story.replace(/她/g,'他').replace(/市场部/g,'合作团队').replace(/商业化/g,'开发合作');}
 ['nc_ruidong','nc_weilai'].forEach(k=>{if(ENDINGS[k])ENDINGS[k].story=ENDINGS[k].story.replace(/他/g,'她');});
 Object.values(ENDINGS).forEach(e=>{if(e.story)e.story=e.story.replace(/上市以后|上市后|post-marketing/gi,'下一阶段').replace('上市申请顺利受理','完成实际验收与交接').replace('把二期做完','把下一项已批准工作做完');});
 const stageOverrides={v11_0:['FIH','IIA'],v11_1:['IIB','EOP2','III'],v11_2:['FIH','IIA','NDA'],v11_3:['IIA','IIB','III'],v11_4:['IIA','IIB'],v11_5:['IIA','IIB','EOP2','III','NDA'],v11_6:['IIA','IIB','EOP2','III'],v11_7:['III','NDA','PRENDA'],v11_8:['III','NDA','PRENDA']};
 V11_EVENTS.forEach(e=>{e.text=(e.text||'').replace(/上市后|post-marketing/gi,'开发合作');if(stageOverrides[e.id])e.campaignStages=stageOverrides[e.id];});
})(typeof window!=='undefined'?window:globalThis);



