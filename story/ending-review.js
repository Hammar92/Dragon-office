/* Literary verdicts are presentation. Unlock rules remain in collection-v3 and the resolver. */
(function(root){
 'use strict';
 const C=root.DragonCollectionV3,A=root.ProjectCampaignV2;if(!C||!A)return;
 const entries={
 be_trust:['firefighter','你替日期担保，日期替别人担保。等责任退回个人，组织终于实现了精准投递。','至少3次主线捷径选择。'],
 be_progress:['audit','预算先断气，项目后盖章。复盘会上人人都谈外部环境，仿佛现金流是天气预报。','项目结束且开发结果为停止。'],
 be_island:['empty-chair','你把每一道题都答对了，唯独忘了答题卡由别人收。没有同伴的正确，是会议室里最安静的自费演出。','至少4次主线选择，未形成任何职能支持来源。'],
 be_heart:['empty-chair','灯还亮着，人已经下线。公司称你情绪稳定——因为他们再也听不见异议。','心力见底，且没有尚可使用的合格交接休假。'],
 be_fraud:['audit','正确废话没有签名栏，错误文件有。你把自己的名字借给捷径，捷径把你还给了问责。','主线造假标记或造假主尾声；后续措辞不能洗掉来源。'],
 ge_survive:['exit','你没有被吃掉，这值得庆祝；但别把未上菜单误认成坐上主桌。活下来是底线，不是组织欠你的晋升书。','项目结束、无造假、心力仍大于0；不代表已经递交或获批。'],
 ge_slayer:['team','你没有砍掉龙头，只让它的每句废话都必须带上预算、owner和截止日。神兽第一次被迫填写表格，传说从此缺乏想象力。','合格接替、会议改革、实际运行权同时成立。'],
 true_dragon:['dragon','你曾恨所有问题都要问她，后来只恨它们没有先问你。王座没有换制度，只换了一个更懂数据的臀部。','本轮明确选择把全部入口集中到自己。'],
 ge_firstline:['team','交付让老板看见你，却未必让HR改工资。你已拿到进入下一场谈判的证据，别再拿它换一句“辛苦了”。','项目结束、交付记录≥40、老板认可≥45。'],
 ge_next:['exit','你带走的是可核查的履历，不是会议室里留下的掌声。终于有人愿意给贡献报价，原公司这才想起感情没有预算科目。','真实邀约存在，交付记录≥45、质量≥60、无造假，明确选择离开。'],
 mid_halfbridge:['audit','桥只修到一半，至少你没把河流写成“已通过”。坏消息保住了返工的可能，好看的谎话通常只保住第一页。','项目结束但暂缓，验收进度≥35；仍需真实补证。'],
 ge_promotion:['firefighter','名字终于单独占了一行。别急着庆功：岗位说明书里多出的每个动词，都在等你确认它有没有预算。','本轮有正式晋升记录；职级和产品结果分开判定。'],
 ge_unsung:['firefighter','你把火灭了，别人把照片拍了。奖杯证明你擅长救急，空白的任命邮件证明公司更擅长省钱。','项目结束、交付记录≥55、职级低于副总监。'],
 ge_project:['audit','卷宗递交了，药还没有获批。庆功宴可以提前，证据不能；最危险的一页，往往写着“后续再说”。','项目结束，NDA验收结果为已递交。'],
 ge_system:['team','大家仍然彼此嫌弃，居然也能把事做完。制度最朴素的胜利，是让合作不再依赖每个人今天心情不错。','每日全员会已经改为可执行的阻塞会。'],
 ge_court:['empty-chair','每日会准时开，阻塞准时还在。你向上汇报了越来越多的进度，向下分配了越来越少的时间。','每日进度会仍在运行，且没有完成会议改革。'],
 ge_regent:['firefighter','你有运行权，却没有能接班的人。摄政听起来威风，翻译成考勤语言，是休假必须本人到场。','运行权已批、接替未落实、未把全部入口集中到本人。'],
 ge_coalition:['team','你没有私人王国，只有一群肯在关键处署名的人。比起亲信，盟友贵一点；好处是他们不必每天向你证明忠诚。','至少3类真实职能支持，且未集中全部入口。'],
 ge_puppetmaster:['dragon','你替漂亮日期付过四次账，老板次次都对。聪明的逢迎能让会议散得早，却不能让缺失的源文件长出来。','至少4次主线捷径；这是迎合记录，不是幕后操盘已成功。'],
 ge_succession:['team','接班的资格来自有人接你的班。若下一把椅子只能靠你永不离席来坐稳，那不是晋升，是换个高度值夜班。','至少总监职级，且合格接替已落实。'],
 true_afterdragon:['team','第二次走到王座前，你终于舍得把扶手拆成别人的桌子。经验没有让你更像龙，这才算没有白死上一回。','跨周目、项目结束、接替与运行权具备、未集中入口。'],
 nc_xiaoyuan:['team','署名留在材料里，比留在酒杯边可靠。你给团队留下位置，别人以后才有理由在权力桌上给你留一把椅子。','选择保留团队署名的汇报，且一期交付来源有效。'],
 nc_caolan:['audit','你让商业叙事有了边界，也让正确不再只躺在抽屉里。别把传播权送得太干净：讲故事的人，总爱顺手当故事的作者。','真实治理选择形成曹兰伙伴记录。'],
 nc_heina:['audit','责任终于写进执行范围。合同没有突然变温柔，只是不再允许一句“你们确认了”买走所有风险。','中心交付来源有效；不代表投靠供应商或跳槽。'],
 nc_ruidong:['team','原始来源保住了，人的名字也保住了。你没有把同事的工作炼成自己的履历，这笔不够聪明的账，可能最耐花。','真实治理选择形成瑞冬伙伴记录。'],
 nc_weilai:['audit','协议上的零很多，账户里的零也很多——只是站的位置不同。你终于学会把鼓掌的承诺和能付款的承诺分开。','预算交付来源有效；不代表项目被收购。'],
 nc_love:['exit','有人问你几点下班，没有问你项目百分比。你尚未因此赢得公司，却至少没把整个人生抵押给公司。','恋爱承诺、稳定私人关系，或已有伴侣且家庭联系≥4。'],
 ce_fih_review:['audit','第一针之前，你先核清了谁该签什么。没新闻，没神话，只有一个不必靠祈祷开始的试验。','首例、安全、剂量三类证据有效且风险闭合。'],
 ce_team_ready:['team','终于有人能在你不在时做决定。你把“不可替代”的奖状撕成了交接表，这是比自我证明更昂贵的成熟。','合格接替已实际就位。'],
 ce_source_repair:['audit','缺的资料补回来了，缺的时间也花掉了。钟时的“原则同意”没有印钞，幸好你没有拿它当源文件。','至少一个来源风险通过真实补证关闭。'],
 ce_mental_strain:['empty-chair','判断余地被一点点借走，最后连拒绝都要加班。懂得代价，和还有力气付代价，是两回事。','实际选择累计理智消耗≥8，或理智见底的主尾声。'],
 ce_team_fray:['empty-chair','每个人都还在群里，已经没人愿意多说一句。你赢过几次争论，也可能输掉了问题发生之前的提醒。','实际选择累计士气消耗≥8，或士气见底的主尾声。'],
 v14_joint_capacity:['team','你把人力表和预算表叠在一起，漂亮日期终于露出了借条。管理第一次需要做选择，而不是做总结。','同时选择v14_0_0和v14_6_0。'],
 v14_joint_paper:['audit','两份文件只有一条时间线，稽查组失去了发挥空间。无聊，是你给未来自己买下的最便宜保险。','同时选择v14_1_0和v14_2_0。'],
 v14_joint_site:['team','少一次无用访视，比多一次关怀患者的讲话便宜。你让预算学会了人话，也让人话终于进了预算。','同时选择v14_3_0和v14_6_0。'],
 v14_joint_story:['audit','曲线很漂亮，摘要很勇敢，分母躲了两次。讲好故事的政治利润，终于碰上不听故事的审评者。','同时选择v14_4_1和v14_7_1。'],
 v14_joint_dragon:['dragon','没有钟时也能转，离了你却不能转。屠龙的验收单上，你把旧瓶颈签收为个人资产。','同时选择v14_5_2和v14_8_2。']
 };
 const eventVerdicts=[
 ['你给“不可能”留了一个合法单元格。科学没变温柔，至少资源不再靠下属的睡眠自动扩容。','岗位仍叫TBD，承担者却有姓名。你用答应解决了会议，用熬夜解决了答应。','人人需要你，没人敢替你。不可替代既像奖章，也像不附钥匙的手铐。'],
 ['你没有替风险化妆。事实带着限制出门，反倒比一张过分干净的脸更容易被信任。','“未见风险”省了四个字，后来花了十七页。办公室里最贵的删减，常被叫作简洁。','你把事实说成了输赢，赢了这次，失去了下次有人悄悄提醒你的资格。'],
 ['迟到半小时，省下多年解释。你终于分清交付速度和把责任甩进未来的速度。','文件可以补签，时间不会陪签。元数据没有大局观，所以它终于说了真话。','你收拢了签字，也收拢了收件人。领导力很集中，问责信也很集中。'],
 ['你替患者减了一趟路，也替中心减了一句怨言。真正的同盟，有时从少填一张表开始。','总部一片绿，中心一路红。你用一张Tracker建设了一个没人住得起的理想世界。','你做了正确的减法，却把提醒你的人一起减掉。技术上省了事，政治上断了线。'],
 ['十二个人没有被你讲成十二亿人的未来。分母留在明处，限制才不必在法务室重逢。','分母进了附录，掌声进了会议室。以后回来的问题，通常比当初省下的说明长。','图撤了，人也被撤出会议。你守住统计判断，却让上级把科学误听成公开羞辱。'],
 ['各自回答各自的问题，居然不需要一个万能总指挥。边界不是甩锅，是给合作装上门把手。','你负责句号，别人负责结论。参与感很充分，决定权很节约。','围墙挡住了干预，也把预算和专家关系关在了外面。医学终于全权负责，包括医学不该独吞的活。'],
 ['新增必须配删除，老板第一次不能同时拥有所有愿望。减号，是预算表上最不受欢迎的民主。','原则同意全票通过，付款申请无人认领。你把愿望存进银行，银行不肯承认这种货币。','预算长了老板的脸，也长了二老板的记性。你赢下这次排序，别忘了对方还有下一次议程。'],
 ['预设和探索各有位置，统计不必替昨天改户口。你让科学问题免于按庆功宴的座次更名。','摘要先走，方案后追。故事跑得快，锁库后的文件却不会替它让路。','纪要赢了一次辩论，却不保证下一次合作。证人可以保护你，把证人当锤子也会磨损同盟。'],
 ['请假期间项目仍转，你没有变轻，只是组织不再把你的重量算成基础设施。','再忙过这一阵，便有了下一阵。你把暂时当作制度，公司很满意这份永久的临时工协议。','审批都归你，假期也归零。你终于学会了钟时的核心技术：让每个人依赖你，再称它为管理。']
 ];
 eventVerdicts.forEach((row,i)=>row.forEach((verdict,j)=>{entries['v14_'+i+'_'+j]=[j===0?(i===1||i===2||i===4||i===7?'audit':'team'):j===1?(i===1||i===2||i===4||i===7?'audit':'empty-chair'):'dragon',verdict,'本轮实际作出对应事件选择；回响不要求它覆盖主尾声。'];}));
 const art={
  'empty-chair':'凌晨空椅与无人领取的奖章',firefighter:'救火者在奖杯脚下',dragon:'审批之笔投下龙影',team:'众人托起的工作桥',exit:'门外的晚饭与卸下的金手铐',audit:'签字、源文件与红色稽查印章'
 };
 Object.keys(ENDINGS).forEach(id=>{if(!entries[id])throw Error('Missing ending verdict: '+id);ENDINGS[id].verdict=entries[id][1];if(!root.EndingArtMap||!root.EndingArtMap[id])throw Error('Missing unique ending art: '+id);ENDINGS[id].art=root.EndingArtMap[id].url;ENDINGS[id].story=entries[id][1];});
 const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const read=()=>{try{const x=JSON.parse(localStorage.getItem('dragon_ending_reviews')||'{}');return x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).filter(([id,r])=>ENDINGS[id]&&r&&r.schema===1&&r.p&&Array.isArray(r.p.promotionHistory)&&r.p.flags&&r.s&&Array.isArray(r.choices)&&Array.isArray(r.ids)&&r.eligible&&Array.isArray(r.review)&&r.review.every(row=>Array.isArray(row)&&row.length===2))):{};}catch(e){return {};}};
 function evaluate(s,p,f){
  const shorts=p.history.filter(h=>h.kind==='shortcut').length,valid=Object.keys(p.proofs).filter(k=>p.proofs[k]&&!p.risks.some(r=>r.key===k&&r.status!=='closed')).length,open=p.risks.filter(r=>r.status!=='closed').length;
  const rows=[];
  rows.push(['项目与证据',p.flags.fraud?'你选择补造来源。日期也许保住过，可信度已经抵押；签字不是替团队挡风，是把自己钉到风口。':valid>=8?'你留下了'+valid+'类可核查证据。真正的进度有来源，虚假的进度只有颜色；这轮你至少没有把二者全混在一起。':'有效证据共'+valid+'类。工作量不是证据量；一屋子的文件若没有来源，最多证明打印机还活着。']);
  rows.push(['资金与速度','开发第'+p.months+'月，现金'+Math.round(p.cash)+'万元，验收进度'+p.progress+'，已核查质量'+p.quality+'。'+(p.cash<=0?'钱已经断流；“抓紧推进”不接受银行转账。':open?'仍有'+open+'项未闭合来源风险。提前变绿的日期，正在向未来收利息。':'没有未闭合来源风险；至少没把下一次稽查当成未来同事的问题。')]);
  rows.push(['向上政治',p.boss>=55?'老板认可'+p.boss+'，交付记录'+p.credit+'。你让成果进了决策者的记忆，但记住你和正式任命你，是两张不同的纸。':'老板认可'+p.boss+'，交付记录'+p.credit+'。'+(p.credit>=55?'你把活做成了可见的事实，却没充分做成高层的共同记忆。献血式努力很容易被表扬，因为表扬不占编制。':'贡献的可见性和高层认可都还薄。直接挑战钟时的空话，若没有证据与背书，只会被翻译成“不成熟”。')]);
  rows.push(['横向联盟',(p.supporters||[]).length>=3?'你留下'+p.supporters.length+'类职能支持：'+p.supporters.join('、')+'。同盟让你不必一个人证明所有问题；也记住，他们不是你的私兵。':'真实职能支持'+(p.supporters||[]).length+'类。'+((p.supporters||[]).length?'小范围合作已形成，但还不足以让整个组织替你承担公开表态的成本。':'你把正确握在自己手里，却没把利害放到同一张桌上。政治不是交朋友，而是让别人有理由在关键处与你一起署名。')]);
  rows.push(['权力与接替','实际职级：'+A.data.ranks[p.rank]+'；'+(p.authority?'运行权已批。':'运行权未批。')+(p.flags.centralized?'你选择集中全部入口。赢得控制，未必赢得组织；更精明的车棚管理员仍然是管理员。':p.teamReady?'合格接替已到位。你把权力做成可交接的职责，而非永远在线的个人售后。':p.authority?'权力比接替走得快。名义上你有兵，实际上你正在成为所有人的备用电池。':'没有正式授权，承担更多任务只会增加责任，不会自动增加话语权。')]);
  rows.push(['与钟时的博弈',shorts>=3?'你做了'+shorts+'次主线捷径选择。钟时的正确废话获得了漂亮日期，你获得了来源问题；这笔交易里，语气最温和的人通常毛利最高。':p.meetingReformed?'你让每日点名改为阻塞处置。不是把钟时骂倒，而是让她的每一次要求都碰到执行范围，这是少见的有效政治。':p.dailyMeeting?'每日会仍在。人人报进度，没人替阻塞付账；你尚未把汇报权和执行权拆开。':'你没有把大量捷径当作政治投名状。但边界是否稳定，还取决于团队与老板是否愿意维护它。']);
  rows.push(['个人代价','心力'+s.heart+'、体力'+s.stamina+'、理智'+s.sanity+'。'+(s.heart<=0?'精疲力尽不是政治失败的道德罪名，却说明这轮的承诺已超出你的可持续边界。':Math.min(s.heart,s.sanity)<30?'你保住了不少事项，却把自己压到警戒线。英雄叙事最方便公司的地方，是英雄通常不开发票。':'你仍有判断与恢复余地。留点命给下一场谈判，比给第47版字号更有长期价值。')+(f.love||f.romanceSecure?'私人关系有实际承诺；别让它只剩结算页的一句安慰。':'私人关系未见稳定承诺记录，不据此断言你没有被爱。')]);
  rows.push(['责任与口碑','本轮背锅风险'+s.blame+'，公司声望'+s.reputation+'。'+(s.blame>=40?'你的名字比你的权限更容易出现在责任链上。口头的“共同承担”若没有专业owner和版本来源，通常只是锅的群发通知。':s.reputation<30?'风险还未堆到高位，但口碑也未形成护城河。只把记录存好不够，还要让相关的人看见并确认它。':'责任边界与公司口碑尚有支撑。留痕不是为了每次当场打脸，而是让事后改写故事变得昂贵。')]);
  return rows;
 }
 function observed(id,p,b,s,f){
  const chosen=k=>p.history.filter(h=>h.kind===k).length,valid=k=>!!p.proofs[k]&&!p.risks.some(r=>r.key===k&&r.status!=='closed'),yes=x=>x?'是':'否';
  const facts={
   be_trust:'主线捷径次数：'+chosen('shortcut'),be_progress:'开发停止：'+yes(p.finished&&p.outcome==='stopped'),be_island:'主线选择次数：'+p.history.length+'；真实职能支持：'+(p.supporters||[]).length,
   be_fraud:'造假标记：'+yes(p.flags.fraud),ge_survive:'项目结束：'+yes(p.finished)+'；造假：'+yes(p.flags.fraud)+'；心力：'+s.heart,
   ge_next:'已确认邀约：'+yes(p.offers.newCompany)+'；本轮职业选择：'+({depart:'接受并交接离开',stay:'留下'}[f.careerDecision]||'未选择'),
   true_dragon:'集中全部入口的主线选择：'+chosen('concentrate'),ge_slayer:'接替：'+yes(p.teamReady)+'；会议改革：'+yes(p.meetingReformed)+'；运行权：'+p.authority,
   ge_system:'会议改革：'+yes(p.meetingReformed),ge_court:'每日会：'+yes(p.dailyMeeting)+'；改革：'+yes(p.meetingReformed),ge_regent:'运行权：'+p.authority+'；接替：'+yes(p.teamReady)+'；集中入口：'+yes(p.flags.centralized),
   ge_coalition:'实际职能支持：'+((p.supporters||[]).join('、')||'无')+'；集中入口：'+yes(p.flags.centralized),ge_puppetmaster:'主线捷径次数：'+chosen('shortcut'),ge_succession:'职级：'+A.data.ranks[p.rank]+'；接替：'+yes(p.teamReady),
   true_afterdragon:'跨周目：'+yes(f.newGamePlus)+'；项目结束：'+yes(p.finished)+'；接替：'+yes(p.teamReady)+'；运行权：'+p.authority+'；集中入口：'+yes(p.flags.centralized),
   ce_fih_review:['fih','safety','dose'].map(k=>k+'有效：'+yes(valid(k))).join('；'),ce_team_ready:'合格接替就位：'+yes(p.teamReady),ce_source_repair:'已真实关闭的风险：'+(p.risks.filter(r=>r.status==='closed').map(r=>r.key).join('、')||'无'),
   ce_mental_strain:'记录内累计理智消耗：'+b.choices.reduce((n,c)=>n+(c.sanityDrop||0),0)+'；结算理智：'+s.sanity,ce_team_fray:'记录内累计士气消耗：'+b.choices.reduce((n,c)=>n+(c.moraleDrop||0),0)+'；结算士气：'+s.morale,
   nc_xiaoyuan:'团队署名汇报选择：'+chosen('present')+'；一期证据有效：'+yes(valid('phase1')),nc_heina:'中心交付有效：'+yes(valid('sites')),nc_weilai:'预算交付有效：'+yes(valid('budget')),
   nc_caolan:'曹兰伙伴记录：'+yes(b.partners.includes('caolan')),nc_ruidong:'瑞冬伙伴记录：'+yes(b.partners.includes('ruidong')),nc_love:'恋爱承诺：'+yes(f.love)+'；稳定关系：'+yes(f.romanceSecure)+'；已有伴侣：'+yes(f.existingPartner)+'；家庭联系：'+Number(S.relationshipArc&&S.relationshipArc.homeBond||0),
   ge_project:'实际产品结果：'+p.outcome,mid_halfbridge:'项目结束：'+yes(p.finished)+'；实际产品结果：'+p.outcome
  };
  return facts[id]||'';
 }
 function capture(primary){
  const p=JSON.parse(JSON.stringify(A.ensure())),b=JSON.parse(JSON.stringify(C.book())),s={heart:S.heart,stamina:S.stamina,sanity:S.sanity,morale:S.morale,blame:Number(S.blame)||0,reputation:Number(S.reputation)||0},f={...flags};
  const eligible=C.eligibility(primary),ids=[...new Set([primary,...b.records.filter(id=>eligible[id])])].filter(id=>ENDINGS[id]);
  const audit=root.__lastEndingAudit&&root.__lastEndingAudit.id===primary?root.__lastEndingAudit:null;
  const compact=Object.fromEntries(['progress','cash','quality','months','rank','authority','credit','boss','coalition','teamReady','dailyMeeting','meetingReformed','outcome','promotionHistory','flags'].map(k=>[k,p[k]]));
  const raw=audit?Object.fromEntries(['progress','trust','morale','sanity','heart','power','dragon','merit','reputation','bossTrust','career','promotionSupport','promotionOppose','difficultyId'].map(k=>[k,audit.raw[k]])):null;
  return {schema:1,primary,round:Number(S.run||localStorage.getItem('dragon_runs')||0),time:Date.now(),p:compact,s,choices:b.choices.filter(c=>c.branch).map(c=>({branch:c.branch,text:c.text})),ids,eligible,canonical:audit?{state:audit.state,raw}:null,observed:Object.fromEntries(ids.map(id=>[id,observed(id,p,b,s,f)])),review:evaluate(s,p,f),privateLife:typeof root.relationshipEpilogue==='function'?root.relationshipEpilogue():''};
 }
 function condition(id,r){
  const lines=[entries[id][2]];
  if(!r)return ['通用收集条件：'+lines[0],'旧记录没有当轮快照；不推断旧周目的资源或政治表现。'];
  const event=/^v14_[0-8]_[0-2]$/.test(id),joint=DragonEndingResolver.JOINT_RULES.find(x=>x.id===id);
  const selected=r.choices.filter(c=>c.branch===id||joint&&joint.need.includes(c.branch));
  if(selected.length)lines.push(...selected.map(c=>'实际选择：'+c.text));
  if(r.primary===id&&!r.eligible[id])lines[0]='本轮主尾声由终局优先级判定选中；它与独立回响的收集规则分别计算。';
  if(r.primary===id&&r.canonical&&r.canonical.state&&r.canonical.raw){
   const q=r.canonical.raw,a=r.canonical.state._audit||{},rules={
    true_afterdragon:'跨周目回响路线及拒绝集权、进度≥72、士气≥58、龙性<20',true_dragon:'进度≥60、龙性≥8、权力≥65、功勋≥45，且明确收权或权力路线',ge_slayer:'进度≥60、权力路线、龙性<10、权力≥65，至少2名关系达到60的支持者',
    ge_promotion:'进度≥60、功勋≥70、声望≥45、高层信任≥45；支持票达到难度阈值，反对票未超限；辩论赢或钟时信任≥30',ge_unsung:'进度≥60、功勋≥75、公司声望<25',ge_next:'进度≥60、治理路线、履历≥75、龙性<10且接受离开',ge_firstline:'进度≥60、治理路线、履历≥55、龙性<10',
    ge_succession:'进度≥75、权力≥68、高层关系均值≥42、钟时信任≥50',ge_puppetmaster:'进度≥75、权力≥64、钟时信任≥58、高层关系均值≥38、士气<62',ge_regent:'进度≥75、权力≥60、专业职能关系均值≥55、钟时信任<55',ge_coalition:'进度≥75、至少5名关系达到50的支持者、士气≥58、权力≥48',ge_court:'进度≥75、权力≥52、钟时信任≥50',ge_system:'进度≥75、士气≥62、权力≥48',ge_project:'进度≥75',
    be_island:'所有NPC关系最高值≤30',mid_halfbridge:'35≤进度<60，钟时信任、士气、理智均≥35，且信任和士气≥45',ge_survive:'进度≥35；已满足部分项目进度或未完成项目时关键个人资源仍安全',be_trust:'35≤进度<60，信任/士气/理智至少一项低于35',be_progress:'进度<35',
    nc_xiaoyuan:'进度≥60、小圆关系≥43、治理路线',nc_caolan:'进度≥60、曹兰关系≥50、治理路线',nc_ruidong:'进度≥60、瑞冬关系≥36、治理路线',nc_heina:'进度≥60、黑娜关系≥35、龙性≥6、权力路线',nc_weilai:'35≤进度<60、苏苏关系≥50',nc_love:'35≤进度<50、恋爱承诺成立、心力≥50、龙性≤6'
   };
   lines.push('主尾声优先级判定：'+(rules[id]||'实际事件回响与终局路线匹配，并通过事件资格检查')+'。');
   lines.push('主尾声当时指标：进度'+q.progress+'、权力'+q.power+'、功勋'+q.merit+'、公司声望'+q.reputation+'、钟时信任'+q.trust+'、士气'+q.morale+'、理智'+q.sanity+'、履历'+q.career+'、高层信任'+q.bossTrust+'；支持/反对票'+q.promotionSupport+'/'+q.promotionOppose+'；高层关系均值'+Number(a.bossBand||0).toFixed(1)+'、专业关系均值'+Number(a.proBand||0).toFixed(1)+'、最高NPC关系'+a.maxRel+'。');
  }
  if(r.observed&&r.observed[id])lines.push(r.observed[id]);
  if(r.primary===id&&id==='ge_promotion')lines.push('正式任命记录：'+r.p.promotionHistory.map(h=>A.data.ranks[h.from]+' → '+A.data.ranks[h.to]).join('；'));
  if(id==='be_heart')lines.push('结算心力：'+r.s.heart+'；接替：'+(r.p.teamReady?'有':'无')+'；本轮交接休假已使用：'+(r.p.flags.usedLeave?'是':'否'));
  if(!event&&!joint)lines.push('本轮：进度'+r.p.progress+' / 质量'+r.p.quality+' / 现金'+Math.round(r.p.cash)+'万元；交付'+r.p.credit+' / 老板认可'+r.p.boss+' / 职能支持'+r.p.coalition+'；职级'+A.data.ranks[r.p.rank]+'。');
  return lines;
 }
 function detail(id,r){const e=ENDINGS[id];return '<article class="er-detail"><img src="'+e.art+'" alt="'+esc(root.EndingArtMap[id].alt)+'"><small>'+esc(e.layer)+' / '+(r?'本轮记录':'历史卷宗')+'</small><h2>'+esc(e.name)+'</h2><blockquote>'+esc(e.verdict)+'</blockquote><h3>'+(r?'这一轮达成的依据':'收集条件')+'</h3><ul>'+condition(id,r).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+(r?'<div class="er-report">'+r.review.map(([title,text])=>'<section><h3>'+esc(title)+'</h3><p>'+esc(text)+'</p></section>').join('')+'</div>':'')+'</article>';}
 let current=null;
 function view(id){if(!ENDINGS[id]||!getUnlocked().includes(id))return false;const r=current&&current.ids.includes(id)?current:read()[id];if(!document.createElement)return false;const old=document.getElementById('er-dialog');if(old)old.remove();const d=document.createElement('dialog');d.id='er-dialog';d.innerHTML='<button class="er-close" onclick="this.closest(\'dialog\').close()">关闭卷宗</button>'+detail(id,r);document.body.appendChild(d);d.addEventListener('click',e=>{if(e.target===d)d.close();});d.addEventListener('close',()=>d.remove());d.showModal();return true;}
 function render(){if(!current||!document.createElement)return;const node=document.getElementById('ending-screen');if(!node)return;const prior=document.getElementById('ending-review');if(prior)prior.remove();const wrap=document.createElement('div');wrap.id='ending-review';wrap.innerHTML=detail(current.primary,current)+'<h3>这一轮的全部回响 · 点击查看判词</h3><div class="er-records">'+current.ids.map(id=>'<button onclick="EndingReview.view(\''+id+'\')">'+esc(ENDINGS[id].name)+'</button>').join('')+'</div>';node.insertBefore(wrap,document.getElementById('ending-stats'));const story=document.getElementById('ending-story');if(story)story.textContent='本轮产品结果：'+({submitted:'已递交NDA，尚未获批',deferred:'申报暂缓，仍需补证',stopped:'开发停止',scientific_stop:'负面研究结果，不支持继续开发'}[current.p.outcome]||'当前工作状态结束，产品开发尚未完成')+'。主尾声与职业、团队、支线回响分别记账。'+(current.privateLife?'\n\n'+current.privateLife:'');const old=document.getElementById('collection-results');if(old)old.hidden=true;}
 const oldShow=showEnding;showEnding=function(id){const r=oldShow.apply(this,arguments),resolved=C.retired[id]?C.retired[id][0]:id;const name=document.getElementById('ending-name'),actual=Object.keys(ENDINGS).find(k=>name&&ENDINGS[k].name===name.textContent)||resolved;C.book().primary=actual;current=capture(actual);const saved=read();current.ids.forEach(k=>saved[k]=current);try{localStorage.setItem('dragon_ending_reviews',JSON.stringify(Object.fromEntries(Object.keys(ENDINGS).filter(k=>saved[k]).map(k=>[k,saved[k]]))));}catch(e){/* The current report still displays if persistent storage is full. */}render();const toast=document.getElementById('toast-wrap');if(toast)toast.innerHTML='';return r;};root.showEnding=showEnding;
 const oldGallery=renderGallery;renderGallery=function(){const r=oldGallery(),node=document.getElementById('gallery-grid'),got=getUnlocked();if(node&&document.createElement)node.innerHTML=[...new Set(Object.values(ENDINGS).map(e=>e.layer))].map(layer=>'<section class="er-layer"><h3>'+esc(layer)+'</h3><div class="er-gallery">'+Object.entries(ENDINGS).filter(([,e])=>e.layer===layer).map(([id,e])=>got.includes(id)?'<button class="er-card" onclick="EndingReview.view(\''+id+'\')"><img loading="lazy" src="'+e.art+'" alt="'+esc(root.EndingArtMap[id].alt)+'"><strong>'+esc(e.name)+'</strong><span>'+esc(e.verdict)+'</span></button>':'<div class="er-card er-locked"><b>权限不足</b><span>未解锁卷宗</span></div>').join('')+'</div></section>').join('')+'<p>已解锁 '+got.length+' / '+Object.keys(ENDINGS).length+' · 判词按记录分别保存</p>';return r;};root.renderGallery=renderGallery;
 const oldStart=startGame;startGame=function(){current=null;root.__lastEndingAudit=null;return oldStart.apply(this,arguments);};root.startGame=startGame;
 root.EndingReview={entries,evaluate,capture,condition,detail,view,current:()=>current};renderGallery();
})(typeof window!=='undefined'?window:globalThis);
