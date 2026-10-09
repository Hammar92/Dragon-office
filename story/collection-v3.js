/* Collection rules use actual choices and project records. No primary-ending priority can discard a layer. */
(function(root){
 'use strict';
 const api=root.ProjectCampaignV2;if(!api)return;
 const read=(key,fallback)=>{try{const x=JSON.parse(localStorage.getItem(key)||'null');return x===null?fallback:x;}catch(e){return fallback;}};
 const array=key=>{const x=read(key,[]);return Array.isArray(x)?x:[];};
 const object=key=>{const x=read(key,{});return x&&typeof x==='object'&&!Array.isArray(x)?x:{};};
 const write=(key,x)=>localStorage.setItem(key,JSON.stringify(x));
 const clean=(p,key)=>!!p.proofs[key]&&!p.risks.some(r=>r.key===key&&r.status!=='closed');
 const milestones=[
  ['首例条件真正核清','fih'],['PVP的独立意见进入记录','safetyReview'],['剂量不再只是一张漂亮图','dose'],['汇报材料保留团队署名','present'],['子研究有单独预算','exploration'],['临床优势有可核查的依据','clinicalAdvantage'],
  ['认定请求已正式提交','btd'],['安全决定和补材料分开','safetyReview'],['Tracker之外的真实整改','sites'],['三期融资有实际到账','eop2'],['有限运行权正式获批','authority'],['批次衔接回到来源','supply'],
  ['每日会让位给执行','delegation'],['关键Query如实复核','delay'],['限制和主要结果一同上会','topline'],['部门统筹不是口头头衔','department'],['部门试任完成真实交付','departmentDutyCompleted'],['VP任命与职责正式重划','vp']
 ];
 const retired={be_probation:['ce_fih_review','阶段 · FIH交付通过核查'],be_burnout:['ce_team_ready','阶段 · 合格接替已经就位'],be_vendor:['ce_source_repair','阶段 · 确认邮件不能替代来源'],be_sanity:['ce_mental_strain','个人 · 判断需要留出余地'],be_morale:['ce_team_fray','团队 · 默契不会自动维持']};
 const replacementNotes={};
 Object.entries(retired).forEach(([id,[next,name]])=>{replacementNotes[id]=ENDINGS[id].name;delete ENDINGS[id];ENDINGS[next]={name,type:'阶段记录',cls:'ge',story:'这是已经发生的交付或整改记录，不代表产品已经获批。'};});
 ENDINGS.ge_unsung.name='职业 · 金牌救火队员';
 ENDINGS.be_trust.name='组织 · 责任退回个人';
 ENDINGS.ge_slayer.name='组织 · 屠龙者：规则接替了人';
 ENDINGS.true_afterdragon.name='轮回 · 第二次，你没有收拢所有入口';
 const stageStories={ce_fih_review:'首例条件、安全时间线和剂量依据都通过了真实核查。初期评价来自交付，不是钟时的一次脸色。',ce_team_ready:'接替人和执行范围已落实。培养第二个人不等于证明自己不重要。',ce_source_repair:'你用真实补证关闭了一个来源缺口。Sponsor确认邮件不能把不存在的资料变出来。',ce_mental_strain:'这一轮的选择持续消耗了判断余地。若理智见底，你已经退出当前工作状态；个人恢复与产品结果分别记录。',ce_team_fray:'几次选择正在消耗团队士气。头衔不能替代职能之间的信任，资源和责任仍需落实。'};
 Object.entries(stageStories).forEach(([id,story])=>ENDINGS[id].story=story);
 const npcNames={nc_xiaoyuan:'NPC · 署名留在材料里',nc_caolan:'NPC · 比较也有边界',nc_ruidong:'NPC · 报告回到原始来源',nc_heina:'NPC · 责任写回执行范围',nc_weilai:'NPC · 协议金额不等于现金',nc_love:'私人 · 有人记得你几点下班'};
 Object.entries(npcNames).forEach(([id,name])=>ENDINGS[id].name=name);
 const groupOf=id=>id==='ce_mental_strain'?'个人状态':id==='ce_team_fray'?'团队':/^v14_joint_/.test(id)?'组合回响':/^v14_/.test(id)?'事件回响':id.startsWith('nc_')?'人物与私人生活':id.startsWith('ce_')?'阶段记录':id==='ge_project'||id==='be_progress'||id==='mid_halfbridge'?'产品':id==='ge_next'||id==='ge_promotion'||id==='ge_firstline'||id==='ge_unsung'?'职业':'组织与个人';
 Object.entries(ENDINGS).forEach(([id,e])=>{e.layer=groupOf(id);if(/^v14_/.test(id))e.type=e.layer;});
 const book=()=>{if(!S.collection||S.collection.schema!==3){const migrated=S.campaign&&S.campaign.history&&S.campaign.history.length>0;S.collection={schema:3,choices:migrated?Object.keys(flags||{}).filter(k=>/^v14_[0-8]_[0-2]$/.test(k)&&flags[k]).map(branch=>({branch,text:'旧存档中已经记录的事件选择',migrated:true})):[],partners:[],records:[],migrated:!!migrated};}return S.collection;};
 if(localStorage.getItem('dragon_collection_schema')!=='17.2'){
  const unlocked=array('dragon_achievements');
  write('dragon_achievements',unlocked.filter(id=>Number(id.slice(1))>=55));
  const paid=array('dragon_achievement_points_paid');write('dragon_achievement_points_paid',[...new Set(paid.concat(unlocked))]);
  const details=object('dragon_achievement_details');Object.keys(details).filter(id=>Number(id.slice(1))<=54).forEach(id=>delete details[id]);write('dragon_achievement_details',details);
  const ends=array('dragon_endings'),archive=array('dragon_legacy_endings');ends.filter(id=>retired[id]).forEach(id=>archive.push(id));write('dragon_legacy_endings',[...new Set(archive)]);write('dragon_endings',ends.filter(id=>!retired[id]));
  localStorage.setItem('dragon_collection_schema','17.2');
 }
 // Retired achievement labels are deleted; the independent paid-points ledger remains.
 if(localStorage.removeItem)localStorage.removeItem('dragon_legacy_achievements');else write('dragon_legacy_achievements',[]);
 const activeIds=new Set(ACHIEVEMENTS.map(a=>a.id));
 write('dragon_achievements',[...new Set(array('dragon_achievements').filter(id=>activeIds.has(id)))]);
 const activeDetails=object('dragon_achievement_details');Object.keys(activeDetails).filter(id=>!activeIds.has(id)).forEach(id=>delete activeDetails[id]);write('dragon_achievement_details',activeDetails);
 ACHIEVEMENTS.forEach(a=>{const n=Number(a.id.slice(1));if(n<=54){const i=Math.floor((n-1)/3),slot=(n-1)%3,d=api.data.chapters[i];a.name=slot===0?d.stage+' · '+d.honest:slot===1?d.stage+' · '+d.shortcut:milestones[i][0];a.group=slot===2?'milestone_'+i:'main_'+i;a.comment=slot===0?'“安全、质量、效率都重要”没有关闭一个缺口。你留下了可以核查的真实交付。':slot===1?'日期可以先变绿，来源和资源不会因此自动到位。':('已实际完成：'+milestones[i][0]+'。公司终于不能把它只写成“大家共同推动”。');}});
 const normalize=ch=>{if(!ch||!ch.campaign)return ch;(ch.choices||[]).forEach(c=>{const m=c.campaignChoice;c.achievement='a'+(m.index*3+(m.kind==='shortcut'||m.kind==='fraud'?2:1));c.achievementName=ACHIEVEMENTS.find(a=>a.id===c.achievement).name;});return ch;};
 ACHIEVEMENTS.filter(a=>Number(a.id.slice(1))<=54).forEach(a=>a.comment=a.name+' · '+a.comment);
 const originalChapter=api.chapter;api.chapter=(i,p)=>normalize(originalChapter(i,p));V11_CHAPTERS.forEach(normalize);
 const oldRender=renderChapter;renderChapter=function(){const r=oldRender.apply(this,arguments);normalize(runChapters[chapterIdx]);return r;};
 unlockAchievement=function(id,choice){const a=ACHIEVEMENTS.find(x=>x.id===id);if(!a||!S)return;const got=array('dragon_achievements');if(got.includes(id))return;if(!S.achievementGroups)S.achievementGroups={};if(S.achievementGroups[a.group]&&S.achievementGroups[a.group]!==id)return;S.achievementGroups[a.group]=id;got.push(id);write('dragon_achievements',got);const details=object('dragon_achievement_details');details[id]=a.name;write('dragon_achievement_details',details);const paid=array('dragon_achievement_points_paid');if(a.point&&!paid.includes(id)){localStorage.setItem('dragon_ng_points',String((parseInt(localStorage.getItem('dragon_ng_points')||'0',10)||0)+a.point));paid.push(id);write('dragon_achievement_points_paid',paid);}toast('🏆 '+a.name,'up');root.refreshAchievements();};
 checkAchievements=function(c){if(!c||!c.achievement||!S)return;const m=c.campaignChoice,p=api.ensure();if(m&&m.kind!=='shortcut'&&m.kind!=='fraud'&&!clean(p,api.data.chapters[m.index].proof))return;unlockAchievement(c.achievement,c);};
 function milestone(p,m){const d=api.data.chapters[m.index],key=milestones[m.index][1];if(!clean(p,d.proof))return false;if(['safetyReview','present','exploration','btd','authority','delegation','delay','department','vp'].includes(key))return m.kind===key;if(key==='clinicalAdvantage'||key==='departmentDutyCompleted')return !!p.flags[key];if(key==='eop2')return !!(p.financing.eop2&&p.financing.eop2.paid>0);return clean(p,key);}
 function eligibility(primary){const p=api.ensure(),b=book(),f=flags,chosen=kind=>p.history.some(h=>h.kind===kind),short=p.history.filter(h=>h.kind==='shortcut').length,done=p.finished;
  const rules={
   be_heart:primary==='be_heart',ce_mental_strain:primary==='ce_mental_strain'||b.choices.reduce((n,c)=>n+(c.sanityDrop||0),0)>=8,ce_team_fray:primary==='ce_team_fray'||b.choices.reduce((n,c)=>n+(c.moraleDrop||0),0)>=8,be_fraud:primary==='be_fraud'||p.flags.fraud,be_progress:primary==='be_progress'||done&&p.outcome==='stopped',
   be_trust:short>=3,be_island:p.history.length>=4&&!(p.supporters||[]).length,mid_halfbridge:done&&p.outcome==='deferred'&&p.progress>=35,ge_survive:done&&!p.flags.fraud&&S.heart>0,
   ge_project:done&&p.outcome==='submitted',ge_promotion:p.promotionHistory.length>0,ge_unsung:done&&p.credit>=55&&p.rank<2,ge_firstline:done&&p.credit>=40&&p.boss>=45,
   ge_next:f.careerDecision==='depart'&&p.offers.newCompany&&p.credit>=45&&p.quality>=60&&!p.flags.fraud,true_dragon:chosen('concentrate'),ge_slayer:p.teamReady&&p.meetingReformed&&p.authority>0,
   true_afterdragon:done&&f.newGamePlus&&p.teamReady&&p.authority>0&&!p.flags.centralized,ge_system:p.meetingReformed,ge_court:p.dailyMeeting&&!p.meetingReformed,
   ge_regent:p.authority>0&&!p.teamReady&&!p.flags.centralized,ge_coalition:(p.supporters||[]).length>=3&&!p.flags.centralized,ge_puppetmaster:short>=4,ge_succession:p.rank>=3&&p.teamReady,
   ce_fih_review:['fih','safety','dose'].every(k=>clean(p,k)),ce_team_ready:p.teamReady,ce_source_repair:p.risks.some(r=>r.status==='closed'),
   nc_xiaoyuan:chosen('present')&&clean(p,'phase1'),nc_heina:clean(p,'sites'),nc_weilai:clean(p,'budget'),nc_caolan:b.partners.includes('caolan'),nc_ruidong:b.partners.includes('ruidong'),nc_love:!!(f.love||f.romanceSecure||f.existingPartner&&S.relationshipArc&&S.relationshipArc.homeBond>=4)
  };
  Object.keys(ENDINGS).filter(id=>/^v14_[0-8]_[0-2]$/.test(id)).forEach(id=>rules[id]=b.choices.some(x=>x.branch===id));
  DragonEndingResolver.JOINT_RULES.forEach(r=>rules[r.id]=r.need.every(id=>b.choices.some(x=>x.branch===id)));
  return rules;
 }
 function collect(primary){const b=book(),rules=eligibility(primary);
  const ids=Object.keys(ENDINGS).filter(id=>rules[id]);ids.forEach(id=>{saveEnding(id);if(!b.records.includes(id))b.records.push(id);});return ids;
 }
 const oldApply=applyChoice;applyChoice=function(c){if(!S||!c)return oldApply.apply(this,arguments);const p=api.ensure(),m=c.campaignChoice;if(m&&p.history.some(h=>h.index===m.index))return;const b=book();if(m)normalize({campaign:true,choices:[c]});const sanity=S.sanity,morale=S.morale,r=oldApply.apply(this,arguments);b.choices.push({chapter:chapterIdx,id:c.achievement||null,kind:m?m.kind:null,branch:c.branchFlag||null,text:c.t||'',sanityDrop:Math.max(0,sanity-S.sanity),moraleDrop:Math.max(0,morale-S.morale)});Object.keys(c.npc||{}).filter(k=>c.npc[k]>0&&c.route==='govern').forEach(k=>{if(!b.partners.includes(k))b.partners.push(k);});if(c.achievement&&(!m||m.kind==='shortcut'||m.kind==='fraud'||clean(p,api.data.chapters[m.index].proof)))unlockAchievement(c.achievement,c);if(m&&milestone(p,m))unlockAchievement('a'+(m.index*3+3));return r;};
 const oldEnding=showEnding;showEnding=function(id){if(retired[id])id=retired[id][0];const ids=collect(id),r=oldEnding(id),node=document.getElementById('ending-screen');book().primary=id;if(node){const old=document.getElementById('collection-results');if(old)old.remove();const layers=[...new Set(ids.map(groupOf))];node.insertAdjacentHTML('beforeend','<div id="collection-results" class="panel"><h3>这一轮留下的记录</h3><p>产品、职业和支线分别解锁，晋升不会覆盖你的团队与人物经历。阶段记录不是药物获批。</p>'+layers.map(layer=>'<h4>'+layer+'</h4>'+ids.filter(id=>groupOf(id)===layer).map(id=>'<p>'+ENDINGS[id].name+'</p>').join('')).join('')+'</div>');}renderGallery();return r;};
 const oldGallery=renderGallery;renderGallery=function(){const r=oldGallery(),node=document.getElementById('gallery-grid'),got=getUnlocked(),legacy=array('dragon_legacy_endings');if(node)node.innerHTML=[...new Set(Object.keys(ENDINGS).map(groupOf))].map(layer=>'<div class="collection-layer" style="grid-column:1/-1"><h4>'+layer+'</h4>'+Object.keys(ENDINGS).filter(id=>groupOf(id)===layer).map(id=>'<span class="g '+(got.includes(id)?'got '+ENDINGS[id].cls:'')+'">'+(got.includes(id)?ENDINGS[id].name:'？？？')+'</span>').join('')+'</div>').join('')+'<p>已解锁 '+got.length+' / '+Object.keys(ENDINGS).length+' · 同一轮可获得多个层面的记录</p>'+(legacy.length?'<details style="grid-column:1/-1"><summary>历史尾声 · '+legacy.length+'（保留旧版经历，不计入新图鉴）</summary>'+legacy.map(id=>'<p>'+String(replacementNotes[id]||id).replace(/[<>&]/g,'')+'</p>').join('')+'</details>':'');return r;};
 root.renderAchievementsV144=function(){const node=document.getElementById('achievement-panel');if(!node)return;const got=array('dragon_achievements').filter(id=>ACHIEVEMENTS.some(a=>a.id===id));node.innerHTML='<b>🏆 年度绩效记录 · '+ACHIEVEMENTS.length+'</b><p>已解锁 '+got.length+' / '+ACHIEVEMENTS.length+'。只保留当前有效的交付、选择与阶段里程碑；已有轮回点保留。</p><div class="ach-list">'+ACHIEVEMENTS.map(a=>'<div class="ach-card '+(got.includes(a.id)?'got':'locked')+'"><div class="ach-name">'+(got.includes(a.id)?a.name:'？？？')+'</div>'+(got.includes(a.id)?'<div class="ach-comment">'+a.comment+'</div>':'')+'</div>').join('')+'</div>';};
 root.refreshAchievements=root.renderAchievementsV144;root.refreshAchievements();renderGallery();
 root.DragonCollectionV3={collect,eligibility,normalize,milestone,milestones,groupOf,retired,book,sources:()=>({main:api.data.chapters.map((d,i)=>({chapter:i+1,ids:[1,2,3].map(n=>'a'+(i*3+n))})),events:V11_EVENTS.map(e=>({event:e.id,ids:[...new Set(e.choices.map(c=>c.achievement).filter(Boolean))]}))})};
})(typeof window!=='undefined'?window:globalThis);
