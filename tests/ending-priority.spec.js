/* Dragon Office RC ending-priority contract tests.
 * Canonical resolver lives in ../ending-resolver.js; tests must not duplicate production order.
 */
'use strict';

const { PRIORITY, resolveFinalEnding } = require('../ending-resolver.js');

const cases = [
  ['duel beats true route', { duelWinEnding:true, trueDragon:true }, 'duelWin'],
  ['true route beats career', { trueDragon:true, promotion:true }, 'true_dragon'],
  ['true route beats joint', { trueAfterdragon:true, joints:{v14_joint_capacity:true} }, 'true_afterdragon'],
  ['true route beats event', { slayer:true, v14Candidate:'v14_0_0' }, 'ge_slayer'],
  ['career beats joint', { promotion:true, joints:{v14_joint_capacity:true} }, 'ge_promotion'],
  ['career beats event', { unsung:true, v14Candidate:'v14_4_1' }, 'ge_unsung'],
  ['joint beats event', { joints:{v14_joint_paper:true}, v14Candidate:'v14_2_0' }, 'v14_joint_paper'],
  ['career beats NPC', { next:true, ncXiaoyuan:true }, 'ge_next'],
  ['event beats NPC', { v14Candidate:'v14_8_2', ncHeina:true }, 'v14_8_2'],
  ['NPC beats generic', { ncCaolan:true, survive:true }, 'nc_caolan'],
  ['love public ending blocked by full project success', { ncLove:true, projectFullySuccessful:true, survive:true }, 'ge_survive'],
  ['love public ending allowed when project incomplete', { ncLove:true, projectFullySuccessful:false, survive:true }, 'nc_love'],
  ['invalid event candidate cannot hijack resolver', { v14Candidate:'ge_promotion', beTrust:true }, 'be_trust'],
  ['route mismatch blocks event echo', { v14Candidate:'v14_2_1', v14RouteMatched:false, survive:true }, 'ge_survive'],
  ['legacy is last fallback', { legacy:'legacy_old_finalize' }, 'legacy_old_finalize'],
];

function runEndingPriorityContract() {
  const failures=[];
  for(const [name,state,expected] of cases){
    const actual=resolveFinalEnding(state);
    if(actual!==expected)failures.push({name,expected,actual,state});
  }
  return {pass:failures.length===0,total:cases.length,failures};
}

if(require.main===module){
  const r=runEndingPriorityContract();
  if(!r.pass){console.error(JSON.stringify(r,null,2));process.exitCode=1;}
  else console.log('PASS ending priority contract: '+r.total+'/'+r.total);
}
module.exports={PRIORITY,resolveFinalEnding,runEndingPriorityContract,cases};
