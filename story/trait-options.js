/* Experience traits unlock bounded responses; evidence and professional sign-off remain mandatory. */
(function(root){
 'use strict';
 const tiers={rare:{name:'精良',value:1},epic:{name:'史诗',value:2},legendary:{name:'金色传说',value:3}};
 const rows=[
 ['pku','北大毕业','epic',[3,9],'boss','我把研究问题、证据和限制写在同一页。学校只能替我敲门，今天请看团队真正做出的数据。'],
 ['pro','专业优秀','epic',[2,6,14],'quality','先把剂量暴露、效应和不确定性分开。医学结论由我负责，药理与统计各自确认，不能用一句趋势不错代替。'],
 ['socialstrong','社交能力较强','rare',[4,8],'coalition','我们先各说一个真正卡住的依赖。我把分歧带回方案，今天不用谁当众认输。'],
 ['manager','优秀项目经理','epic',[0,10,12],'credit','杨杨，我们把依赖、交付人和确认人放在同一张表。医学内容我来闭环，排期由你统筹，谁也不用替全公司签字。'],
 ['orgleader','组织型领导者','legendary',[10,12,16],'coalition','让各职能先确认自己的交付和资源缺口，杨杨汇总阻塞项。我们拿团队共同认可的工作包请老板批准，授权前不替他宣布。'],
 ['phase3','完整三期经验','epic',[8,11,13],'quality','我见过三期把小问题放大成系统故障。先核中心执行与关键数据，运营、DM和统计分别确认，别让绿灯比数据先到。'],
 ['nda','从FIH做到NDA','legendary',[9,15,17],'quality','我从首针走到过递交。现在就对齐关键研究、原始来源和申报模块，让一建核监管要求；缺口列清楚，递交日期不能替资料签字。'],
 ['fit','精力旺盛','rare',[8,13],'credit','我还能完成本阶段的医学核对，但只接我能确认的部分。额外核查按分工完成，不把精力好当成无限人手。'],
 ['iron','铁人','epic',[11,13],'credit','关键核对我今天做完，交接也留完整。明天要有人接班，耐力不是连续签所有人的名字。'],
 ['boundary','边界清晰','rare',[0,12],'obstruction','医学评估我负责；排期请PM统筹，专业结论请各owner确认。愿意配合和接受全部责任，是两件事。'],
 ['resilient','抗压能力强','rare',[1,7],'credit','您可以继续质疑我的评估，我会逐项回答。但安全时间线今天要保留，PVP的独立意见不能等到汇报好看以后。'],
 ['stable','内核稳定','epic',[3,12],'obstruction','这次汇报没被认可，不代表数据不存在。我们回到待确认项，哪些我补，哪些请您明确决策，不再重复整套自我证明。'],
 ['selfcontrol','高度自控','epic',[7,13],'obstruction','我现在确实生气，但先不争态度。请DM列来源问题，医学和统计确认影响，再谈日期；争赢这间屋子不能修好数据。'],
 ['cool','泰山崩于前而色不变','legendary',[1,7,13],'obstruction','先停一下。事实、专业判断和管理动作分开记，我逐项回答。今天再急，也不能把未观察的数据写成已经发生。'],
 ['workaholic','工作狂','rare',[5,13],'credit','我可以集中完成这轮医学交付，截止时间和交接人先写清。今天加班不是承诺以后每天都由我救火。'],
 ['smartlazy','聪明地偷懒','epic',[12],'obstruction','请把已闭环事项从每日会删掉，只留阻塞、决策和负责人。具体调整仍按已批授权执行，少开会省出来的时间才是真正资源。'],
 ['political','政治敏感','rare',[3,16],'credit','我把贡献人与原始版本一起附上。汇报可以由您主讲，但老板追问来源时，让实际完成的人回答，省得大家各讲一套。'],
 ['highdrive','胜负欲强','rare',[5,14],'credit','我要赢的是研究结论经得起复核。负面结果也署我的名字，不拿漂亮汇报换下一阶段的坑。'],
 ['beenloved','被好好爱过','rare',[12],'coalition','我不需要靠全接下来证明自己有用。我们先问每个人能接多少，按真实容量完成交接。'],
 ['contentalone','一个人也过得很好','rare',[12],'obstruction','下班后的生活不是项目备用资源。医学交付我按承诺完成，超出容量的工作请排期，不能默认谁独居谁就全天在线。'],
 ['scarred','关系里受过伤','rare',[3,16],'credit','口头说共同成果还不够。请把贡献和限制留在原始版本里，避免下一次只有责任能准确找到人。'],
 ['rebuild','把自己重新搭起来过','epic',[12],'obstruction','我重新搭过一次生活，知道无限兜底最后会倒什么。今天把交接条件写清，项目继续，人也要继续。'],
 ['securebase','稳定后方','epic',[12],'coalition','我会按承诺完成这轮交付，但不让所有人的周末替资源缺口买单。请PM排可持续的交接，老板确认缺的人手。'],
 ['hardtotrust','不轻易交付信任','rare',[8,11],'credit','我愿意合作，依据先到：合同范围、来源和确认记录摆在桌上。信任可以慢一点，执行不能只靠一句放心。'],
 ['emotionreg','会处理自己的情绪','epic',[7,13],'obstruction','给我一分钟把情绪和事实分开。问题照样会上报，但我不拿气话替代评估，也不拿忍住了替代处理。'],
 ['caregiver','长期照顾者','epic',[12],'coalition','家里真正需要照顾的人不会按项目节点暂停。我们把不可用时段和替班写清，别把谁最不敢拒绝当成资源最多。'],
 ['relationshipwise','关系不是项目','legendary',[12,16],'coalition','我能投入，也能说清边界。团队支持不是欠我的人情；请把岗位、替班和私人时间留在安排里，让合作不靠谁耗尽自己来维持。']
 ];
 const rules=Object.fromEntries(rows.map(([id,name,tier,chapters,metric,text])=>[id,{id,name,tier,chapters,metric,text}]));
 const profiles={
  pku:{staminaDiscount:0,heartDiscount:0},pro:{staminaDiscount:.12},socialstrong:{},manager:{staminaDiscount:.12},orgleader:{staminaDiscount:.12},phase3:{staminaDiscount:.12},nda:{staminaDiscount:.18},
  fit:{metric:null,staminaDiscount:.08},iron:{metric:null,staminaDiscount:.18},boundary:{heartDiscount:.08},resilient:{metric:null,heartDiscount:.12},stable:{heartDiscount:.12},selfcontrol:{heartDiscount:.12},cool:{heartDiscount:.18},
  workaholic:{staminaDiscount:.12,heartSurcharge:2},smartlazy:{staminaDiscount:.18},political:{},highdrive:{heartSurcharge:1},beenloved:{metric:null,recovery:'heart',heartDiscount:.08},contentalone:{metric:null,recovery:'heart'},scarred:{},rebuild:{metric:null,recovery:'heart',heartDiscount:.12},securebase:{metric:null,recovery:'heart',heartDiscount:.12},hardtotrust:{},emotionreg:{heartDiscount:.12},caregiver:{},relationshipwise:{metric:'obstruction',heartDiscount:.18,recovery:'heart'}
 };
 Object.values(rules).forEach(r=>Object.assign(r,{heartDiscount:0,staminaDiscount:0,heartSurcharge:0},profiles[r.id]));
 const limits={quality:6,coalition:8,boss:6,credit:8,obstruction:8,heart:8};
 const preferred={orgleader:{10:'authority',12:'delegation'},smartlazy:{12:'delegation'}};
 function owns(ids,id){return Array.isArray(ids)&&ids.includes(id);}
 function benefit(r,p){const tier=tiers[r.tier],parts=[];if(r.metric){const amount=p?Math.min(tier.value,Math.max(0,limits[r.metric]-((p.traitBonuses||{})[r.metric]||0))):tier.value;parts.push(({quality:'质量',coalition:'职能支持',boss:'老板认可',credit:'交付记录',obstruction:'管理摩擦'})[r.metric]+(r.metric==='obstruction'?'−':'+')+amount);}if(r.recovery){const amount=p?Math.min(tier.value,Math.max(0,8-((p.traitBonuses||{}).heart||0))):tier.value;parts.push('心力恢复+'+amount);}if(r.staminaDiscount)parts.push('本次体力耗费−'+Math.round(r.staminaDiscount*100)+'%');if(r.heartDiscount)parts.push('本次心力耗费−'+Math.round(r.heartDiscount*100)+'%');if(r.heartSurcharge)parts.push('额外心力消耗'+r.heartSurcharge);return parts.join('；');}
 function eligible(p,index,ids){return rows.map(r=>rules[r[0]]).filter(r=>owns(ids,r.id)&&r.chapters.includes(index)&&!(p.traitUses||{})[r.id]);}
 function augment(ch,p,index,ids){
  const work=ch.choices.find(c=>c.campaignChoice.kind==='work');if(!work)return ch;
  for(const r of eligible(p,index,ids)){
   const kind=(preferred[r.id]||{})[index],base=ch.choices.find(c=>c.campaignChoice.kind===kind)||work;
   const c=JSON.parse(JSON.stringify(base)),tier=tiers[r.tier];
   c.t='【'+tier.name+' · '+r.name+'】「'+r.text+'」';
   c.campaignChoice.slot=ch.choices.length;c.campaignChoice.trait=r.id;
   c.traitOption={id:r.id,tier:r.tier};
   c.r+='\n词条回应：'+r.name+'。'+benefit(r,p)+'；执行成功后生效，本词条本轮限用一次，同类奖励有累计上限。';
   c.t+='（'+benefit(r,p)+'；每轮一次）';
   ch.choices.push(c);
  }return ch;
 }
 function reward(p,m,ids){
  const r=rules[m.trait];if(!r||!['work',(preferred[r.id]||{})[m.index]].includes(m.kind)||!eligible(p,m.index,ids).some(x=>x.id===r.id))return false;
  p.traitUses=p.traitUses||{};p.traitBonuses=p.traitBonuses||{};
  const amount=r.metric?Math.min(tiers[r.tier].value,Math.max(0,limits[r.metric]-(p.traitBonuses[r.metric]||0))):0;
  if(r.metric){p[r.metric]=Math.max(0,Math.min(100,p[r.metric]+(r.metric==='obstruction'?-amount:amount)));p.traitBonuses[r.metric]=(p.traitBonuses[r.metric]||0)+amount;}
  const recovery=r.recovery?Math.min(tiers[r.tier].value,Math.max(0,8-(p.traitBonuses.heart||0))):0;if(recovery)p.traitBonuses.heart=(p.traitBonuses.heart||0)+recovery;
  p.traitUses[r.id]={index:m.index,amount,recovery};
  p.events.push(tiers[r.tier].name+' · '+r.name+'：专属回应已使用。');return true;
 }
 const api={rules,tiers,limits,eligible,augment,reward,benefit};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else {
  root.StoryTraitOptions=api;
  for(const t of TRAIT_RECIPES){const r=rules[t.id];if(r)t.desc+=' 专属回应：第'+r.chapters.map(i=>i+1).join('、')+'章；'+benefit(r)+'；本轮一次。';}
  const oldName=rarityName;rarityName=function(r){return r==='legendary'?'金色传说':oldName(r);};
 }
})(typeof window!=='undefined'?window:globalThis);
