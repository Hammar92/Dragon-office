/* Shared document, real deadline, roster and receipts sourced from campaign state. */
(function(root){
 'use strict';
 const files=[
 ['FIH临床试验方案 / 首例启动包','“首例”还是“首名”','版本与批次对应、首例放行条件','附件版本','批次记录','首例确认'],
 ['哨兵安全评估记录','把邮件标题的红色改灰色','症状时间线与暂停／恢复依据','给药时间','原始随访','恢复条件'],
 ['一期暴露与剂量矩阵','图例大小与小数点位数','暴露、安全与推荐剂量的对应依据','暴露分析','安全判断','推荐依据'],
 ['一期融资汇报材料','第六版封面与统筹署名','一期限制、真实贡献与融资承诺','一期结果','证据限制','下一步范围'],
 ['IIa方案可行性表','意见全部体现与列宽调整','预设问题、中心容量与患者负担','预设终点','中心容量','新增访视'],
 ['IIa信号分析 / 融资材料','标题写得更有突破性','分母、预设分析与临床优势','人群定义','截止日期','预设分析'],
 ['IIb剂量选择记录','目录层级与整体把关','剂量依据与认定所需真实证据','剂量矩阵','安全依据','信号来源'],
 ['扩展安全评估报告','“整体可控”与横向材料','即时安全行动不能被补材料替代','事件事实','医学判断','升级边界'],
 ['多中心启动Tracker','每日九点逐项报进度','整改依据、中心条件与实际责任','中心整改','CRO核查','Sponsor确认'],
 ['EOP2与三期投资材料','八十页材料与整体统筹','剂量、人群、终点与可兑现的资金','三期依据','关键缺口','分期安排'],
 ['三期立项预算签批','主人翁意识与先把日期排上','到账现金、批准范围与运行权限','首期现金','执行范围','批准岗位'],
 ['供应放行与冷链档案','外盒的两种蓝色','批次稳定性与冷链来源','批次核查','稳定性依据','冷链记录'],
 ['三期执行阻塞清单','80%日报与全员每日会','真实接替与中心支持','人员容量','中心阻塞','接替安排'],
 ['DBL / 关键Query审阅','红色Query改成“提示”','主要终点相关来源与真实关闭依据','来源核查','分析边界','锁库判断'],
 ['Topline融资汇报','“本人领导下完成”','可追溯结果、限制与贡献归属','主要分析','结果追溯','团队贡献'],
 ['NDA模块整合审阅','标点与术语的第三轮统一','安全、批次与临床结论冲突','安全模块','批次模块','临床模块'],
 ['Pre-NDA / 岗位评审','高层会议发言顺序','真实复核、响应资金与职责履约','递交准备','职责记录','后续预算'],
 ['NDA提交包 / 签署页','关键节点与公司整体角度','真实资料与下一阶段接替','附件依据','递交判断','响应责任']
 ];
 const valid=(p,key)=>!!p.proofs[key]&&!p.risks.some(r=>r.key===key&&r.status!=='closed');
 const responses=[
 ['杨杨','专业条件和版本各自确认了，我按启动表协调中心排期与反馈，RA继续跟监管版本。不是再发一句“材料已齐”。','启动表仍有待确认项。我会继续跟各职能，中心是否能给药不能由我把日期排上就算通过。'],
 ['PVP','我的独立时间线和限制保留了。恢复条件以后可以沿这条记录核，不必猜当时是谁点头。','我会保留当前版本。统一结论没有核清之前，我不能把待评估改成已排除。'],
 ['则韩','这次推荐剂量有对应依据。下一阶段引用它时，安全范围和分析限制也要一起带。','曲线可以放上去。有人追问为什么选这个剂量，仍然需要这次没有完成的依据。'],
 ['小圆','结论、限制和负责的人都放在材料里了。明天问到，不用再隔着三层找答案。','彩排可以继续。钱会不会来，要看实际证据；统一发言没有替我们增加一块数据。'],
 ['琳琳','这次中心能做什么，终于跟方案写什么对上了。追加的要求以后也照这个方式确认。','意见写全了，中心容量没有凭空增加。我会把不能执行的地方继续报出来。'],
 ['谷雨','我拿这版去谈，能守住的优势和不能承诺的范围都说清。价格再谈，事实不换。','好看的口径留下了。对方一旦问到另一版，我还是得回来要真正的解释。'],
 ['则韩','IIb按核实的依据推进。认定请求若提交，评估仍看证据，不靠我们替自己取名字。','沿用口径不等于依据有效。我会保留这次的未核查项，后面分析还要面对它。'],
 ['肖恩','当前行动和待补材料终于拆开了。记录里谁确认什么，不再由一句整体可控包起来。','报告还可以补。今天没有成立的判断，明天不能写成昨天已经成立。'],
 ['黑娜','各层的确认范围清楚了，我们按这个配合。CRO支持执行，不替Sponsor确认未核实条件。','我们会把仍待确认的条件列出来。Tracker的颜色不会改变合同和核查边界。'],
 ['K总','现在可以按有效依据和实际资金谈三期。签约的额度与能动用的钱，我继续分开跟。','计划先谈了，缺口仍在。投资人给不给、怎么分期，不会只看我们是不是说得整齐。'],
 ['苏苏','这笔按实际批准范围走。授权和任命以批准记录为准，不由一张预算表自动生成。','日期记下了，钱没有跟着日期增加。超范围的执行我仍不会按默认批准付款。'],
 ['肖恩','这次放行有来源。以后核查可以沿记录走，不用再找谁说过应该没问题。','批次的缺口会留在记录里。后补必须核真实来源，不能补成一段从未发生过的确认。'],
 ['杨杨','我能按明确的安排接下去，剩下的阻塞有位置可报，不必每个细节都来等你。','日报我会继续发。80%停在这里的原因还在，不会因为更新更勤就自动变成100%。'],
 ['则韩','来源和处置有记录了。是否延期与分析边界也保留，后续看结果的人可以追溯。','锁库日期可以往前走，来源问题不会跟着消失。下一张表仍要背着它。'],
 ['谷雨','我按可追溯的结果继续谈，不拿一句积极替代限制。贡献是谁做的，也留在正式材料里。','积极的标题能先发出去。钱和后续尽调要面对的，仍是完整的数据和来源。'],
 ['一建','这次能整合的是确认后的结论，不只是一样的术语。以后问模块冲突，我有对应记录可找。','包整出来了，冲突还没消失。递交前仍要有人确认哪句是真正的结论。'],
 ['杨杨','递交准备有各职能的确认，RA核版本和申报要求；岗位材料另交HR评审。两套确认都不能靠辛苦替代。','窗口先保留了，专业确认还待补。我跟准备清单，HR另跟岗位评审，不把两件事混成一次通过。'],
 ['一建','按真实核验结果记录这次递交判断。即使递交完成，下一阶段的回复也不能当作已经获批。','我会保留这次选择和仍待核查的附件。按没按按钮，与资料能不能成立，是两份记录。']
 ];
 function snapshot(index,p){const d=ProjectCampaignV2.data.chapters[index],f=ProjectCampaignV2.data.financing.find(x=>x.month>=p.months&&!p.financing[x.id]?.settled);return{index,title:files[index][0],surface:files[index][1],risk:files[index][2],rows:files[index].slice(3),verified:valid(p,d.proof),remaining:f?Math.max(0,f.month-p.months):null,due:f&&f.month,proof:d.proof};}
 const apply=applyChoice;applyChoice=function(c){const before=S&&S.campaign&&S.campaign.history.length,r=apply.apply(this,arguments),m=c&&c.campaignChoice,p=S&&S.campaign;if(m&&!m.context&&p.history.length>before){
  const d=ProjectCampaignV2.data.chapters[m.index],ok=valid(p,d.proof),h=p.history.find(x=>x.index===m.index);
  const response=responses[m.index];c.r=response[0]+'：「'+response[ok?1:2]+'」\n\n'+c.r;
  if(!S.meetingMinutes)S.meetingMinutes=[];
  S.meetingMinutes.push({chapter:m.index+1,title:d.title,month:p.months,reply:c.t,kind:h.kind,proof:d.proof,verified:ok,
   conclusion:ok?'【'+files[m.index][2]+'】已形成可追溯交付；具体限制与专业确认保留在阶段记录。':'【'+files[m.index][2]+'】本次未形成有效的可追溯交付；日期与口径不能代替来源核查。',
   authority:p.authority,rank:p.rank,responsibility:d.responsibility,notes:p.events.slice(-3)});
 }return r;};root.applyChoice=applyChoice;
 const api={files,snapshot,valid};root.MeetingDocuments=api;
 if(!document.documentElement||!root.MutationObserver)return;
 const $=s=>document.querySelector(s),esc=root.esc||function(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));};
 function minutesHTML(m){return '<section class="md-minutes '+(m&&!m.verified?'md-unresolved':'')+'" aria-live="polite"><header><b>会议纪要 · '+(m?'已记入本轮':'草稿箱')+'</b><small>'+(m?'第'+m.chapter+'章 · 开发第'+m.month+'月':'等待回应')+'</small></header><p>'+(m?esc(m.conclusion):'尚未作出回应。确认交付或未形成结论，都会在选择后据实记录。')+'</p>'+(m?'<details><summary>查看原话与后续记录</summary><blockquote>'+esc(m.reply)+'</blockquote><p>'+m.notes.map(esc).join('<br>')+'</p></details>':'')+'</section>';}
 function paint(){const area=$('#scene-area');if(!area||!S||!S.campaign)return;
  const result=area.querySelector('.result-box');if(result&&!result.querySelector('.md-minutes')){const last=(S.meetingMinutes||[]).at(-1);if(last&&last.chapter===chapterIdx+1){const box=document.createElement('div');box.innerHTML=minutesHTML(last);result.appendChild(box.firstElementChild);}return;}
  const scene=area.querySelector('.sd-scene');if(!scene||scene.querySelector('.md-workspace')||!scene.querySelector('button[onclick^="pickChapter("]'))return;
  const ch=runChapters[chapterIdx],p=S.campaign,v=snapshot(chapterIdx,p),panel=document.createElement('section');panel.className='md-workspace';
  const names=[...new Set(StoryDialogue.scenes[chapterIdx].turns.map(x=>x[0]))].filter(n=>n!=='你');
  panel.innerHTML='<details class="md-share" open><summary><span>▣ SCREEN SHARE / 当前展示文件</span><b>'+esc(v.title)+'</b></summary><div class="md-paper"><header>DRAGON BIOTECH <small>内部审阅 · 第'+(chapterIdx+1)+'章</small></header><p class="md-marked">'+esc(v.surface)+'<span>请再统一一下</span></p><div class="md-paper-rows">'+v.rows.map(n=>'<div><span>'+esc(n)+'</span><b>'+esc(v.verified?'已有阶段核查记录':'本阶段待核查')+'</b></div>').join('')+'</div><footer>批注最醒目的地方，未必是决定项目成败的地方。</footer></div></details><div class="md-agenda"><section><small>明面会议 · 正在纠缠</small><p>'+esc(v.surface)+'</p></section><section class="md-risk '+(!v.verified?'md-pending':'')+'"><small>真实业务 · '+(v.verified?'已有依据':'悬而未决')+'</small><p>'+esc(v.risk)+'</p><b>'+(v.remaining!==null?'距第'+v.due+'月融资核验 '+v.remaining+' 个月':'按当前阶段递交／响应条件核验')+'</b><span>项目时间按选择结算；限时会议按屏幕倒计时。</span></section></div><section class="md-room"><header><b>参会者 · 职能现场</b><small>悬停或聚焦回复，查看预计关系变化</small></header><div class="md-roster">'+names.map(n=>'<div data-person="'+esc(n)+'">'+(PortraitResolver.url(n)?'<img src="'+esc(PortraitResolver.url(n))+'" alt="'+esc(n)+'">':'<i>'+esc(n.slice(0,1))+'</i>')+'<b>'+esc(n)+'</b><small data-room-note>'+esc(n==='钟时'?'关注表面议题':'等待业务回应')+'</small></div>').join('')+(chapterIdx===13?'<div data-person="DM"><i>DM</i><b>数据管理</b><small>关键Query待确认</small></div>':'')+'</div></section>';
  const duplicate=panel.querySelectorAll('[data-person="DM"]');if(duplicate.length>1)duplicate[1].remove();
  const duty=document.createElement('details');duty.className='md-duty';duty.innerHTML='<summary>本场职责分工</summary><p>'+esc(ch.responsibility)+'</p>';panel.appendChild(duty);
  const stage=scene.querySelector('.ow-stage'),dialogue=scene.querySelector('.sd-dialogue');if(stage)stage.after(panel);else if(dialogue)dialogue.before(panel);else scene.prepend(panel);
  const choices=scene.querySelector('.choices');if(choices){const box=document.createElement('div');box.innerHTML=minutesHTML(null);choices.after(box.firstElementChild);}
  scene.querySelectorAll('button[onclick^="pickChapter("]').forEach(b=>{const i=Number(b.getAttribute('onclick').match(/\((\d+)/)[1]);const show=()=>{const c=presentedChoice(ch.choices,i);panel.querySelectorAll('[data-person]').forEach(row=>{const n=row.dataset.person,key=Object.keys(NPCs).find(k=>NPCs[k].name===n),delta=n==='钟时'?c.e&&c.e.trust:key&&c.npc&&c.npc[key];row.classList.toggle('md-gain',delta>0);row.classList.toggle('md-loss',delta<0);row.querySelector('[data-room-note]')?.replaceChildren(document.createTextNode(delta?'预计关系 '+(delta>0?'+':'')+delta:n==='钟时'?'关注表面议题':'本选项无直接关系增减'));});};const clear=()=>{panel.querySelectorAll('[data-person]').forEach(row=>{row.classList.remove('md-gain','md-loss');row.querySelector('[data-room-note]')?.replaceChildren(document.createTextNode(row.dataset.person==='钟时'?'关注表面议题':'等待业务回应'));});};b.addEventListener('mouseenter',show);b.addEventListener('focus',show);b.addEventListener('mouseleave',clear);b.addEventListener('blur',clear);});
 }
 api.paint=paint;new MutationObserver(paint).observe($('#scene-area'),{childList:true,subtree:true});paint();
})(typeof window!=='undefined'?window:globalThis);
