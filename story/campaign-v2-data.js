/* Fictional development campaign; calendar, costs and thresholds are game parameters. */
(function(root){
 'use strict';
 const responsibilities=typeof module!=='undefined'&&module.exports?require('./responsibilities.js'):root.StoryResponsibilities;
 const rows=[
 ['FIH','第一针之前：准备好的不是同一套文件','一建',1,100,5,'fih','核对版本、批次与首例条件，由相应owner确认。','按现有签字启动，差异留到会后补。','钟时讨论“首例”还是“首名”，说安全和效率都重要，实际门槛请团队评估。'],
 ['FIH','哨兵之后：谁能把判断写进记录','PVP',1,100,5,'safety','保留独立时间线，按正式标准核查并确认恢复条件。','先准备下一队列，统一结论以后再补。','她要求红色邮件改灰色，再说安全必须重视；PVP等的是可以执行的决定。'],
 ['FIH','暴露曲线：下一阶段需要什么剂量依据','则韩',5,300,5,'dose','形成暴露与安全矩阵，写明候选剂量和未决项。','用高暴露的漂亮图推进，解释稍后补齐。','钟时改小数位与图例；剂量尊重专业，重大取舍请老板判断。'],
 ['FIH','第9月：融资会没有等你把材料改完','小圆',2,200,5,'phase1','交付可核查一期总结，明确证据、限制与贡献。','先完成成果汇报，未决问题不要放在第一页。','她退回第六版封面，成果页仍只有她的名字。投资人问的不是页数。'],
 ['IIA','IIa方案：一个研究要回答几个问题','琳琳',4,500,10,'design','按真实中心容量固定患者问题、预设终点与PI承诺。','所有探索都先答应，预算与访视负担以后协调。','钟时改表格列宽，希望意见都充分体现；增加人手与删目标却没人确认。'],
 ['IIA','第20月：第一张图值多少钱','明夜',7,1000,10,'signal','核对分母和预设分析，诚实交付临床信号及比较限制。','突出最好看的亚组，分母和限制移到附录。','钟时要求同时严谨和突破；能否证明优势仍被丢给团队。'],
 ['IIB','IIb剂量：以前没回答的问题回来了','则韩',4,900,5,'dose2','用已核查的暴露与IIa结果固定IIb剂量选择规则。','先按乐观剂量推进，缺口下次会上再解释。','她重排目录，表示充分尊重专业，团队仍需把问题变成可拍板的取舍。'],
 ['IIB','扩大暴露：谁愿意陪你站到会上','加琳',4,800,5,'safety2','请有记录的专业团队共同确认安全策略与升级边界。','将异常写成已有解释，今晚自己补齐全部报告。','钟时同意安全第一，但要求横向材料再丰富一版；决定又被退回明早。'],
 ['IIB','多中心交付：Tracker绿色不等于数据能用','黑娜',3,600,5,'sites','核清CRO责任、实际访视与PI承诺，按记录落实整改。','Tracker先标绿，邮件确认后再找时间落实。','进度有要求，钟时开始要求每天九点逐人过表；人力缺口留给大家内部协调。'],
 ['EOP2','第34月：三期融资只认能跑的研究','K总',3,700,5,'eop2','带剂量、人群、终点与真实资源计划完成EOP2验收。','先承诺原范围全部完成，资源签约后再找。','钟时准备代表所有职能，遇到具体问题转给你，会后又要求统一沟通。'],
 ['III','三期预算：现在才可能争到运行权','苏苏',2,1500,3,'budget','按实际首期现金与批准范围形成分期执行预算。','先独自接下所有工作，编制与权限以后再说。','她改四版组织图，说所有目标都重要；苏苏需要的是哪些钱今天能付。'],
 ['III','供应：外盒颜色与无菌问题不能占同一个位置','肖恩',3,1800,4,'supply','由专业owner确认批次衔接、稳定性与冷链支持。','先保启动日期，批次支持的缺口会后统一表述。','钟时讨论外盒颜色，强调质量和进度都不能牺牲，关键取舍仍请老板判断。'],
 ['III','执行：每天报进度不会长出三名CRC','杨杨',10,7000,5,'execution','处理真实中心阻塞，按批准资源执行并培养合格接替。','白天参加全员每日会，晚上自己补全部进度。','每天九点逐人问为什么还是80%；琳琳需要CRC支持，钟时要求方案再完善。'],
 ['III','锁库：没有提前保护记录，就没有现成的证人','则韩',4,500,5,'lock','和DM、统计、质量核查关键Query；有来源才关闭。','先以无影响关闭争议Query，保证表面日期。','她要求红色Query改提示；发布时间不能动，结论又要专业团队负责。'],
 ['III','第54月：最后一张图与谁的贡献','老板',1,200,8,'topline','按可追溯分析解释主要结果，分别列出团队交付与限制。','按庆功摘要宣布完成，不在融资会上展开未决项。','她已经写好“在本人领导下”，数据追问转统计，最终安排交老板。'],
 ['NDA','整合：她改了术语，却没有决定两个Module谁改','一建',5,3000,5,'integration','安排真正owner追溯安全、批次与临床引用，关闭矛盾。','先把术语改成一样，来源不一致以后补解释。','标点与缩写已过三轮，跨资料冲突仍退给各职能自行负责。'],
 ['PRENDA','第62月：申报钱与那把椅子','邹婷',3,1000,5,'prenda','完成真实复核，按已履约职责与岗位进入正式评审。','先参加庆功预演，正式职责和复核等老板问再说。','钟时安排发言顺序；老板同时问下一阶段谁能真正负责。'],
 ['NDA','提交：你留下的是运行机制，还是一个新入口','一建',1,500,5,'nda','按实际验收与正式责任完成递交或如实安排补证／停止。','接下所有最终入口，继续以本人名义替团队兜底。','最终确认仍需真实证据；更响的声音不能替代一次正式递交。']
 ];
 const data={version:2,product:{code:'DO-8006',name:'DO-8006皮下注射液',breakthroughBackground:false},initial:{progress:0,quality:55,cash:2500,months:0},ranks:['医学经理','高级医学经理','临床开发副总监','临床开发总监','临床开发VP'],financing:[
 {id:'phase1',month:9,index:3,progress:20,quality:65,amount:2000,proof:['fih','safety','dose','phase1']},
 {id:'iia',month:20,index:5,progress:40,quality:70,amount:6000,proof:['design','signal']},
 {id:'eop2',month:34,index:9,progress:60,quality:75,amount:12000,proof:['dose2','safety2','sites','eop2']},
 {id:'topline',month:54,index:14,progress:85,quality:80,amount:18000,proof:['supply','execution','lock','topline']},
 {id:'prenda',month:62,index:16,progress:95,quality:80,amount:8000,proof:['integration','prenda']}
 ],chapters:rows.map((r,i)=>({id:'v11_'+(i+1),n:i+1,stage:r[0],act:r[0]+' · 开发第'+(i+1)+'章',title:r[1],from:r[2],months:r[3],cost:r[4],progress:r[5],proof:r[6],honest:r[7],shortcut:r[8],politics:r[9]}))};
 data.chapters.forEach((ch,i)=>{ch.from=responsibilities.chapters[i].lead;ch.responsibility=responsibilities.chapters[i].scope;});
 if(typeof module!=='undefined'&&module.exports)module.exports=data;else root.DragonCampaignData=data;
})(typeof window!=='undefined'?window:globalThis);
