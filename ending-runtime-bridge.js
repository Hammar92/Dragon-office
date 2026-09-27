/* Dragon Office RC browser bridge.
 * Runs after ending-resolver.js and after the legacy game declarations.
 * Important: S / flags / NPCs are global lexical bindings in index.html, not guaranteed window properties.
 * Therefore production state is read through direct identifiers while exports are attached to window.
 */
(function(root){
  'use strict';
  if(!root||!root.DragonEndingResolver)throw new Error('DragonEndingResolver must load before ending-runtime-bridge.js');
  const R=root.DragonEndingResolver;

  function allyThresholds(){
    const out={};
    if(typeof NPCs!=='undefined')Object.keys(NPCs||{}).forEach(function(k){out[k]=Number(NPCs[k]&&NPCs[k].allyAt)||0;});
    return out;
  }
  function promotionCounts(){
    if(typeof promotionEndorsements!=='function')return {support:[],oppose:[]};
    const p=promotionEndorsements()||{};
    return {support:Array.isArray(p.support)?p.support:[],oppose:Array.isArray(p.oppose)?p.oppose:[]};
  }
  function difficultyId(){
    try{return typeof difficulty==='function'&&difficulty()?difficulty().id:'normal';}catch(e){return 'normal';}
  }
  function rawFinalState(){
    if(typeof S==='undefined'||!S)throw new Error('Game state S is not initialized');
    const f=(typeof flags!=='undefined'&&flags)||{},promo=promotionCounts();
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
    if(typeof ENDINGS==='undefined'||!ENDINGS[id])throw new Error('Canonical ending is not in gallery: '+id);
    root.__lastEndingAudit={id:id,raw:raw,state:state};
    showEnding(id);
    return id;
  }
  root.buildRuntimeFinalEndingState=rawFinalState;
  finalizeEvaluation=canonicalFinalize;
  root.rcEndingAudit=function(){
    const raw=rawFinalState(),state=R.buildFinalEndingState(raw),id=R.resolveFinalEnding(state);
    return {id:id,exists:!!(typeof ENDINGS!=='undefined'&&ENDINGS[id]),raw:raw,state:state};
  };
})(typeof window!=='undefined'?window:globalThis);
