/* Dragon Office · canonical final-ending resolver
 * RC contract: one ordered resolver, no wrapper-specific early returns.
 * Browser-safe and Node-testable. Production index.html can delegate finalizeEvaluation()
 * to DragonEndingResolver.resolveFinalEnding(buildFinalEndingState()).
 */
(function(root,factory){
  const api=factory();
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.DragonEndingResolver=api;
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';

  const PRIORITY=Object.freeze({DUEL:0,TRUE:1,CAREER:2,JOINT:3,EVENT:4,NPC:5,GENERIC:6,LEGACY:7});
  const V14_EVENT=/^v14_[0-8]_[0-2]$/;
  const JOINT=['v14_joint_capacity','v14_joint_paper','v14_joint_site','v14_joint_story','v14_joint_dragon'];

  function yes(v){return !!v;}
  function first(items){for(const x of items)if(x&&x.when)return x.id;return null;}

  function resolveFinalEnding(s){
    s=s||{};
    let hit;

    // P0: terminal duel result, only when the caller explicitly exposes it as an ending.
    hit=first([{id:'duelWin',when:yes(s.duelWinEnding)},{id:'duelLose',when:yes(s.duelLoseEnding)}]);
    if(hit)return hit;

    // P1: hidden/cross-run routes. These are deliberate route completions, not high-stat side effects.
    hit=first([
      {id:'true_afterdragon',when:yes(s.trueAfterdragon)},
      {id:'true_dragon',when:yes(s.trueDragon)},
      {id:'ge_slayer',when:yes(s.slayer)}
    ]);
    if(hit)return hit;

    // P2: whole-run career trajectory. Promotion/credit outcomes describe the complete run,
    // so they beat a single late random-event echo.
    hit=first([
      {id:'ge_promotion',when:yes(s.promotion)},
      {id:'ge_unsung',when:yes(s.unsung)},
      {id:'ge_next',when:yes(s.next)},
      {id:'ge_firstline',when:yes(s.firstline)}
    ]);
    if(hit)return hit;

    // P3: compound consequences beat either component event.
    hit=first(JOINT.map(function(id){return{id:id,when:yes(s.joints&&s.joints[id])};}));
    if(hit)return hit;

    // P4: one-event echo; whitelist the id shape so arbitrary flags cannot hijack final resolution.
    if(V14_EVENT.test(s.v14Candidate||'')&&s.v14RouteMatched!==false)return s.v14Candidate;

    // P5: relationship/NPC specialization. Love is a public ending only for an incomplete project;
    // otherwise it stays in the private-life epilogue.
    hit=first([
      {id:'nc_xiaoyuan',when:yes(s.ncXiaoyuan)},
      {id:'nc_caolan',when:yes(s.ncCaolan)},
      {id:'nc_ruidong',when:yes(s.ncRuidong)},
      {id:'nc_heina',when:yes(s.ncHeina)},
      {id:'nc_weilai',when:yes(s.ncWeilai)},
      {id:'nc_love',when:yes(s.ncLove)&&!yes(s.projectFullySuccessful)}
    ]);
    if(hit)return hit;

    // P6: generic survival/failure states.
    hit=first([
      {id:'be_island',when:yes(s.island)},
      {id:'mid_halfbridge',when:yes(s.halfbridge)},
      {id:'ge_survive',when:yes(s.survive)},
      {id:'be_trust',when:yes(s.beTrust)},
      {id:'be_progress',when:yes(s.beProgress)}
    ]);
    if(hit)return hit;

    return s.legacy||null;
  }

  return {PRIORITY:PRIORITY,V14_EVENT:V14_EVENT,JOINT:JOINT,resolveFinalEnding:resolveFinalEnding};
});
