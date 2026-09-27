/* Dragon Office RC terminal-ending entry audit.
 * These endings are intentionally outside the final resolver and must be proven at their real trigger layer.
 */
'use strict';

const TERMINAL={
  be_heart:{entry:'TERMINAL_DEATH',predicate:s=>s.heart<=0},
  be_sanity:{entry:'TERMINAL_DEATH',predicate:s=>s.heart>0&&s.sanity<=0},
  be_trust:{entry:'TERMINAL_DEATH',predicate:s=>s.heart>0&&s.sanity>0&&s.trust<=0},
  be_morale:{entry:'TERMINAL_DEATH',predicate:s=>s.heart>0&&s.sanity>0&&s.trust>0&&s.morale<=0},
  be_progress:{entry:'TERMINAL_DEATH',predicate:s=>s.heart>0&&s.sanity>0&&s.trust>0&&s.morale>0&&s.progress<=0},
  be_fraud:{entry:'TERMINAL_FLAG',predicate:s=>!!s.fraud},
  be_probation:{entry:'TERMINAL_WRAPPER',predicate:s=>s.chapterIdx<=2&&s.trust<=24}
};
const W={
  be_heart:{heart:0,sanity:50,trust:50,morale:50,progress:50},
  be_sanity:{heart:20,sanity:0,trust:50,morale:50,progress:50},
  be_trust:{heart:20,sanity:20,trust:0,morale:50,progress:50},
  be_morale:{heart:20,sanity:20,trust:20,morale:0,progress:50},
  be_progress:{heart:20,sanity:20,trust:20,morale:20,progress:0},
  be_fraud:{fraud:true},
  be_probation:{chapterIdx:2,trust:24}
};
function run(){const failures=[];for(const [id,x] of Object.entries(TERMINAL)){if(!x.predicate(W[id]))failures.push({id,entry:x.entry,witness:W[id]});}return{pass:!failures.length,total:Object.keys(TERMINAL).length,failures};}
if(require.main===module){const r=run();if(!r.pass){console.error(JSON.stringify(r,null,2));process.exitCode=1;}else console.log(`PASS terminal witnesses: ${r.total}/${r.total}`);}
module.exports={TERMINAL,W,run};
