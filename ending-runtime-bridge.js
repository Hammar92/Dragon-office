/* Dragon Office RC browser bridge.
 * Loaded after ending-resolver.js and after the legacy game script.
 * It replaces the final wrapper chain with one canonical resolver call while leaving
 * immediate death/fraud/vendor/probation entries untouched.
 */
(function(root){
  'use strict';
  if(!root||!root.DragonEndingResolver)throw new Error('DragonEndingResolver must load before ending-runtime-bridge.js');
  const R=root.DragonEndingResolver;

  function allyThresholds(){
    const out={};
    Object.keys(root.NPCs||{}).forEach(function(k){out[k]=Number(root.NPCs[k]&&root.NPCs[k].allyAt)||0;});
    return out;
  }
  function promotionCounts(){
    if(typeof root.promotionEndorsements!=='function')return {support:[],oppose:[]};
    const p=root.promotionEndorsements()||{};
    return {support:Array.isArray(p.support)?p.support:[],oppose:Array.isArray(p.oppose)?p.oppose:[]};
  }
  function difficultyId(){
    try{return typeof root.difficulty==='function'&&root.difficulty()?root.difficulty().id:'normal';}catch(e){return 'normal';}
  }
  function rawFinalState(){
    const S=root.S||{},f=root.flags||{},promo=promotionCounts();
    f.promotionSupport=promo.support.length;f.promotionOppose=promo.oppose.length;
    return Object.assign({},S,{
      flags:f,
      npc:Object.assign({},S.npc||{}),
      allyAt:allyThresholds(),
      difficultyId:difficultyId(),
      promotionSupport:promo.support.length,
      promotionOppose:promo.oppose.length,
      v14Candidate:f.v14Candidate||null,
      v14FinalRoute:f.v14FinalRoute||null
    });
  }
  function canonicalFinalize(){
    const raw=rawFinalState();
    const state=R.buildFinalEndingState(raw);
    const id=R.resolveFinalEnding(state);
    if(!id)throw new Error('Canonical ending resolver returned no ending');
    if(!root.ENDINGS||!root.ENDINGS[id])throw new Error('Canonical ending is not in gallery: '+id);
    root.__lastEndingAudit={id:id,raw:raw,state:state};
    root.showEnding(id);
    return id;
  }
  root.buildRuntimeFinalEndingState=rawFinalState;
  root.finalizeEvaluation=canonicalFinalize;
  root.rcEndingAudit=function(){
    const raw=rawFinalState(),state=R.buildFinalEndingState(raw),id=R.resolveFinalEnding(state);
    return {id:id,exists:!!(root.ENDINGS&&root.ENDINGS[id]),raw:raw,state:state};
  };
})(typeof window!=='undefined'?window:globalThis);
