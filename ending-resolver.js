/* Dragon Office · canonical final-ending resolver
 * RC contract: one ordered resolver, no wrapper-specific early returns.
 * Browser-safe and Node-testable.
 */
(function(root,factory){
  const api=factory();
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.DragonEndingResolver=api;
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';

  const PRIORITY=Object.freeze({DUEL:0,TRUE:1,CAREER:2,JOINT:3,EVENT:4,NPC:5,GENERIC:6,LEGACY:7});
  const V14_EVENT=/^v14_[0-8]_[0-2]$/;
  const V14_ROUTE=['govern','appease','power'];
  const JOINT_RULES=Object.freeze([
    {id:'v14_joint_capacity',need:['v14_0_0','v14_6_0'],route:'govern'},
    {id:'v14_joint_paper',need:['v14_1_0','v14_2_0'],route:'govern'},
    {id:'v14_joint_site',need:['v14_3_0','v14_6_0'],route:'govern'},
    {id:'v14_joint_story',need:['v14_4_1','v14_7_1'],route:'appease'},
    {id:'v14_joint_dragon',need:['v14_5_2','v14_8_2'],route:'power'}
  ]);
  const JOINT=JOINT_RULES.map(function(x){return x.id;});

  function yes(v){return !!v;}
  function num(v,d){v=Number(v);return Number.isFinite(v)?v:(d||0);}
  function first(items){for(const x of items)if(x&&x.when)return x.id;return null;}
  function rel(s,k){return num(s&&s.npc&&s.npc[k],0);}
  function maxRel(s){const n=s&&s.npc||{};const a=Object.keys(n).map(function(k){return num(n[k],0);});return a.length?Math.max.apply(null,a):0;}
  function supportCount(s,min){const n=s&&s.npc||{},ally=s&&s.allyAt||{};return Object.keys(n).filter(function(k){return num(n[k],0)>=Math.max(min,num(ally[k],0));}).length;}
  function highTicket(s){return Math.max(rel(s,'ceo'),rel(s,'cso'));}
  function finalMainFlag(s,n){return yes(s&&s.flags&&s.flags['main_18_'+n]);}
  function eventRouteMatches(candidate,finalRoute){const m=/^v14_([0-8])_([0-2])$/.exec(candidate||'');return !!(m&&finalRoute===V14_ROUTE[Number(m[2])]);}
  function deriveJoints(flags,finalRoute,override){
    const out={};
    JOINT_RULES.forEach(function(rule){
      const fromFlags=finalRoute===rule.route&&rule.need.every(function(k){return yes(flags&&flags[k]);});
      out[rule.id]=fromFlags||yes(override&&override[rule.id]);
    });
    return out;
  }

  function buildFinalEndingState(raw){
    raw=raw||{};
    const f=raw.flags||{};
    const progress=num(raw.progress),trust=num(raw.trust),morale=num(raw.morale),sanity=num(raw.sanity),heart=num(raw.heart);
    const power=num(raw.power),dragon=num(raw.dragon),merit=num(raw.merit),reputation=num(raw.reputation),bossTrust=num(raw.bossTrust),career=num(raw.career);
    const promoSupport=num(raw.promotionSupport),promoOppose=num(raw.promotionOppose),hard=raw.difficultyId==='hard';
    const mid60=supportCount(raw,60),ticket=highTicket(raw),alive3=trust>=35&&morale>=35&&sanity>=35;
    const projectFull=progress>=60;
    const candidate=raw.v14Candidate||f.v14Candidate||null,finalRoute=raw.v14FinalRoute||f.v14FinalRoute||null;
    const joints=deriveJoints(f,finalRoute,raw.joints);

    return {
      duelWinEnding:yes(raw.duelWinEnding),duelLoseEnding:yes(raw.duelLoseEnding),
      trueAfterdragon:f.metaRoute==='echo'&&yes(f.meta_echo_refuse)&&progress>=72&&morale>=58&&dragon<20,
      trueDragon:projectFull&&dragon>=10&&power>=65&&merit>=45&&(yes(f.dragon_take)||finalMainFlag(raw,3)),
      slayer:projectFull&&finalMainFlag(raw,3)&&dragon<10&&power>=65&&mid60>=3,
      promotion:projectFull&&merit>=70&&reputation>=45&&bossTrust>=45&&promoSupport>=(hard?4:3)&&promoOppose<=(hard?2:3)&&(yes(f.duelWin)||trust>=30),
      unsung:projectFull&&merit>=75&&reputation<35,
      next:projectFull&&finalMainFlag(raw,1)&&career>=75&&dragon<10,
      firstline:projectFull&&finalMainFlag(raw,1)&&career>=55&&dragon<10,
      joints:joints,
      v14Candidate:candidate,
      v14RouteMatched:eventRouteMatches(candidate,finalRoute),
      ncXiaoyuan:projectFull&&rel(raw,'xiaoyuan')>=85&&finalMainFlag(raw,1),
      ncCaolan:projectFull&&rel(raw,'caolan')>=65&&finalMainFlag(raw,1),
      ncRuidong:projectFull&&rel(raw,'ruidong')>=70&&finalMainFlag(raw,1),
      ncHeina:projectFull&&rel(raw,'heina')>=70&&dragon>=6&&finalMainFlag(raw,3),
      ncWeilai:progress>=35&&!projectFull&&rel(raw,'weilai')>=60,
      ncLove:progress>=35&&!projectFull&&yes(f.love)&&heart>=50&&dragon<=6,
      projectFullySuccessful:projectFull,
      island:maxRel(raw)<=30,
      halfbridge:progress>=35&&!projectFull&&alive3&&trust>=45&&morale>=45,
      survive:progress>=35&&!projectFull&&alive3,
      beTrust:progress>=35&&!projectFull&&!alive3,
      beProgress:progress<35,
      legacy:raw.legacy||null,
      _audit:{mid60:mid60,highTicket:ticket,maxRel:maxRel(raw),finalRoute:finalRoute,joints:joints}
    };
  }

  function resolveFinalEnding(s){
    s=s||{};
    let hit;
    hit=first([{id:'duelWin',when:yes(s.duelWinEnding)},{id:'duelLose',when:yes(s.duelLoseEnding)}]);
    if(hit)return hit;
    hit=first([{id:'true_afterdragon',when:yes(s.trueAfterdragon)},{id:'true_dragon',when:yes(s.trueDragon)},{id:'ge_slayer',when:yes(s.slayer)}]);
    if(hit)return hit;
    hit=first([{id:'ge_promotion',when:yes(s.promotion)},{id:'ge_unsung',when:yes(s.unsung)},{id:'ge_next',when:yes(s.next)},{id:'ge_firstline',when:yes(s.firstline)}]);
    if(hit)return hit;
    hit=first(JOINT.map(function(id){return{id:id,when:yes(s.joints&&s.joints[id])};}));
    if(hit)return hit;
    if(V14_EVENT.test(s.v14Candidate||'')&&s.v14RouteMatched!==false)return s.v14Candidate;
    hit=first([{id:'nc_xiaoyuan',when:yes(s.ncXiaoyuan)},{id:'nc_caolan',when:yes(s.ncCaolan)},{id:'nc_ruidong',when:yes(s.ncRuidong)},{id:'nc_heina',when:yes(s.ncHeina)},{id:'nc_weilai',when:yes(s.ncWeilai)},{id:'nc_love',when:yes(s.ncLove)&&!yes(s.projectFullySuccessful)}]);
    if(hit)return hit;
    hit=first([{id:'be_island',when:yes(s.island)},{id:'mid_halfbridge',when:yes(s.halfbridge)},{id:'ge_survive',when:yes(s.survive)},{id:'be_trust',when:yes(s.beTrust)},{id:'be_progress',when:yes(s.beProgress)}]);
    if(hit)return hit;
    return s.legacy||null;
  }

  return {PRIORITY:PRIORITY,V14_EVENT:V14_EVENT,JOINT:JOINT,JOINT_RULES:JOINT_RULES,V14_ROUTE:V14_ROUTE,deriveJoints:deriveJoints,buildFinalEndingState:buildFinalEndingState,resolveFinalEnding:resolveFinalEnding};
});
