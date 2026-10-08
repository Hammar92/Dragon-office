/* Historical terminal predicate fixtures; these are not production entry/reachability tests.
 * Current replacements and actual entry paths are validated by collection-paths.cjs.
 * be_trust / be_progress also have immediate-death entry paths, but remain in the final resolver because
 * the game deliberately uses them as end-of-run generic failure outcomes too.
 */
'use strict';

const TERMINAL={
  be_heart:{entry:'TERMINAL_DEATH',predicate:s=>s.heart<=0},
  be_sanity:{entry:'TERMINAL_DEATH',predicate:s=>s.heart>0&&s.sanity<=0},
  be_morale:{entry:'TERMINAL_DEATH',predicate:s=>s.heart>0&&s.sanity>0&&s.trust>0&&s.morale<=0},
  be_fraud:{entry:'TERMINAL_FLAG',predicate:s=>!!s.fraud},
  be_probation:{entry:'TERMINAL_WRAPPER',predicate:s=>s.chapterIdx<=2&&s.trust<=24},
  be_burnout:{entry:'TERMINAL_WRAPPER',predicate:s=>s.stamina<=3&&s.heart<=15},
  be_vendor:{entry:'TERMINAL_WRAPPER',predicate:s=>!!s.vendorCaptured&&s.chapterIdx>=8&&s.blame>=18}
};
const W={
  be_heart:{heart:0,sanity:50,trust:50,morale:50},
  be_sanity:{heart:20,sanity:0,trust:50,morale:50},
  be_morale:{heart:20,sanity:20,trust:20,morale:0},
  be_fraud:{fraud:true},
  be_probation:{chapterIdx:2,trust:24},
  be_burnout:{stamina:3,heart:15},
  be_vendor:{vendorCaptured:true,chapterIdx:8,blame:18}
};
function run(){const failures=[];for(const [id,x] of Object.entries(TERMINAL)){if(!x.predicate(W[id]))failures.push({id,entry:x.entry,witness:W[id]});}return{pass:!failures.length,total:Object.keys(TERMINAL).length,failures};}
if(require.main===module){const r=run();if(!r.pass){console.error(JSON.stringify(r,null,2));process.exitCode=1;}else console.log(`PASS terminal-only witnesses: ${r.total}/${r.total}`);}
module.exports={TERMINAL,W,run};
