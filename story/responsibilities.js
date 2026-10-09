/* Fictional organization: coordination is distinct from scientific and functional sign-off. */
(function(root){
 'use strict';
 const functions={
 '杨杨':{label:'PM / 项目统筹',scope:'整合排期、依赖、行动项与阻塞；协调专业确认和中心反馈，不代替专业签认。'},
 '一建':{label:'RA / 注册事务',scope:'监管沟通、批准与申报版本对照、申报资料要求和正式递交；不统筹中心启动或安排首例给药。'},
 '你':{label:'Clinical Medical / 临床医学',scope:'临床问题、方案与终点的医学依据、剂量建议和受试者安全判断；与研究者及专业职能共同评估。'},
 'PVP':{label:'PV / 安全医学',scope:'个例医学评估、安全信号与风险建议；不替研究者或临床医学独自批准给药、暂停或恢复。'},
 '加琳':{label:'PV / 安全管理',scope:'安全流程、报告安排与正式出口；管理确认不代替医师的医学判断。'},
 '则韩':{label:'STAT / 统计负责人',scope:'研究设计的统计依据、样本量、预设分析与结果解释；不独自决定推荐剂量或关全部Query。'},
 '明夜':{label:'STAT / 统计',scope:'分析定义、分母、程序与结果核对；可记录分析决定，不承担全项目会议纪要统筹。'},
 '肖恩':{label:'QA / 质量保证',scope:'核查体系、独立质量审阅与记录完整性；不替CMC提供药品质量依据或替DM关闭Query。'},
 'CMC':{label:'CMC / 药学与供应',scope:'批次、稳定性、无菌与冷链依据；药品放行由相应质量职能按程序确认。'},
 '临床药理':{label:'Clinical Pharmacology / 临床药理',scope:'暴露、PK/PD与暴露—反应依据，支持跨职能剂量建议。'},
 'DM':{label:'DM / 数据管理',scope:'数据清理、Query流转、核对与锁库准备；中心答复来源、医学判断和分析影响分别确认。'},
 '琳琳':{label:'ClinOps / CRA主管',scope:'中心可行性、访视执行与监查、源记录跟进；不独自确定临床问题或科学终点。'},
 'K总':{label:'ClinOps / 临床运营管理',scope:'运营资源、CRO与中心执行边界；不代替RA作正式监管沟通或医学作科学判断。'},
 '邹婷':{label:'HR / 人力资源',scope:'岗位、任命评审、组织与交接；不验收临床资料或统筹NDA递交准备。'},
 '苏苏':{label:'Finance / 财务',scope:'现金、预算、付款与成本假设；不替医学决定研究是否科学成立。'},
 '老板':{label:'CEO / 公司决策',scope:'资源投入、业务取舍和组织授权；不能以公司拍板替代专业安全判断。'}
 };
 const chapters=[
 ['杨杨','PM统筹启动检查和回执；RA核批准版本；医学/研究者确认给药条件；CMC与质量职能确认药品条件。',['yangyang','kzong']],
 ['PVP','PV核安全事实并提出建议；临床医学与研究者按方案评估暂停/恢复；PM协调行动，RA处理必要的监管沟通。',['pvp','jialin']],
 ['则韩','临床药理提供暴露依据，统计核分析，医学形成剂量建议；资源取舍由公司确认。',['zihan','mingye']],
 ['小圆','PM汇总真实交付；各专业负责结果与限制；财务/BD支持融资，高层确认承诺。',['xiaoyuan','guyu']],
 ['琳琳','医学/PI定义临床问题，统计确认设计依据，运营核容量；PM整合访视和资源依赖。',['miaomiao','yangyang']],
 ['明夜','统计核预设分析与分母；医学解释临床意义；BD与财务据证据谈融资。',['zihan','mingye']],
 ['则韩','临床药理、医学与统计形成剂量依据；RA提交认定资料并沟通，PM协调并行开发。',['zihan','pvp']],
 ['加琳','PV负责安全评价流程及信号依据，临床医学负责方案行动建议，QA核记录与过程。',['pvp','jialin']],
 ['黑娜','CRO和运营核中心整改；PM统筹行动项，专业职能分别确认，不以邮件替专业批准。',['kzong','heina']],
 ['一建','RA组织EOP2监管沟通与资料要求；医学/统计提供三期科学依据，PM/运营提供资源计划。',['yijian','kzong']],
 ['苏苏','财务确认到账预算，PM与运营落实批准范围；老板批准资源与运行权限。',['weilai','yangyang']],
 ['肖恩','CMC提供批次、稳定性与冷链依据，质量职能确认放行；QA独立审阅，PM/运营排供应。',['xiaoen','kzong']],
 ['杨杨','PM管理关键路径和阻塞，运营配置中心支持；专业判断不由日报完成。',['yangyang','miaomiao']],
 ['DM','DM统筹清理和锁库准备，中心答复来源、医学判断内容、统计核分析影响，QA独立审阅。',['xiaoen','zihan']],
 ['老板','统计产出与核查分析，医学解释结果与限制；PM记录贡献，BD/财务支撑融资。',['zihan','mingye']],
 ['一建','RA核申报要求及跨模块一致性；各内容负责人解决专业冲突，PM追踪依赖和完成时点。',['yijian','xiaoen']],
 ['杨杨','PM统筹递交准备，RA核申报要求，专业职能确认资料；HR只评审岗位履约与交接。',['yangyang','yijian']],
 ['一建','RA执行正式递交并保留版本；专业职能签认内容，PM安排后续响应，老板确认资源与组织。',['yijian','kzong']]
 ].map(([lead,scope,npc])=>({lead,scope,npc}));
 const api={functions,chapters};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.StoryResponsibilities=api;
})(typeof window!=='undefined'?window:globalThis);
