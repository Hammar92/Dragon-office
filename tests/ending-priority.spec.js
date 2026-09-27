/* Dragon Office RC ending-priority contract tests.
 * Canonical resolver lives in ../ending-resolver.js; tests must not duplicate production order.
 */
'use strict';

const { PRIORITY, buildFinalEndingState, resolveFinalEnding } = require('../ending-resolver.js');

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

function raw(overrides){
  const base={
    progress:65,trust:50,morale:55,sanity:60,heart:60,power:45,dragon:2,merit:30,reputation:30,bossTrust:35,career:40,
    difficultyId:'normal',promotionSupport:1,promotionOppose:0,
    npc:{ceo:35,cso:35,xiaoyuan:50,caolan:45,ruidong:45,heina:40,weilai:40},allyAt:{},flags:{main_18_2:true},joints:{}
  };
  const out=Object.assign({},base,overrides||{});
  out.flags=Object.assign({},base.flags,(overrides&&overrides.flags)||{});
  out.npc=Object.assign({},base.npc,(overrides&&overrides.npc)||{});
  out.joints=Object.assign({},base.joints,(overrides&&overrides.joints)||{});
  return out;
}

const rawCases=[
  ['raw after-dragon route',raw({progress:72,morale:58,dragon:10,flags:{metaRoute:'echo',meta_echo_refuse:true}}),'true_afterdragon'],
  ['raw dragon route beats promotion',raw({power:70,dragon:12,merit:80,reputation:60,bossTrust:60,promotionSupport:4,flags:{main_18_3:true,dragon_take:true}}),'true_dragon'],
  ['raw slayer route',raw({power:70,dragon:5,flags:{main_18_3:true},npc:{ceo:65,cso:60,xiaoyuan:65,caolan:62}}),'ge_slayer'],
  ['raw promotion',raw({merit:75,reputation:55,bossTrust:55,promotionSupport:3,flags:{main_18_2:true}}),'ge_promotion'],
  ['raw unsung',raw({merit:80,reputation:20}),'ge_unsung'],
  ['raw next career',raw({career:80,flags:{main_18_1:true}}),'ge_next'],
  ['raw firstline career',raw({career:60,flags:{main_18_1:true}}),'ge_firstline'],
  ['raw joint beats event',raw({joints:{v14_joint_capacity:true},v14Candidate:'v14_0_0',v14FinalRoute:'govern'}),'v14_joint_capacity'],
  ['raw matching event echo',raw({v14Candidate:'v14_4_1',v14FinalRoute:'appease'}),'v14_4_1'],
  ['raw mismatched event ignored',raw({progress:50,v14Candidate:'v14_4_1',v14FinalRoute:'govern'}),'mid_halfbridge'],
  ['raw xiaoyuan NPC',raw({npc:{xiaoyuan:86},flags:{main_18_1:true}}),'nc_xiaoyuan'],
  ['raw love only on incomplete project',raw({progress:50,flags:{love:true}}),'nc_love'],
  ['raw halfbridge',raw({progress:50}),'mid_halfbridge'],
  ['raw survive',raw({progress:50,trust:40,morale:40,sanity:40}),'ge_survive'],
  ['raw trust failure',raw({progress:50,trust:20,morale:40,sanity:40}),'be_trust'],
  ['raw progress failure',raw({progress:20}),'be_progress']
];

function runEndingPriorityContract() {
  const failures=[];
  for(const [name,state,expected] of cases){
    const actual=resolveFinalEnding(state);
    if(actual!==expected)failures.push({name,expected,actual,state});
  }
  for(const [name,state,expected] of rawCases){
    const built=buildFinalEndingState(state),actual=resolveFinalEnding(built);
    if(actual!==expected)failures.push({name,expected,actual,state,built});
  }
  return {pass:failures.length===0,total:cases.length+rawCases.length,failures};
}

if(require.main===module){
  const r=runEndingPriorityContract();
  if(!r.pass){console.error(JSON.stringify(r,null,2));process.exitCode=1;}
  else console.log('PASS ending priority contract: '+r.total+'/'+r.total);
}
module.exports={PRIORITY,buildFinalEndingState,resolveFinalEnding,runEndingPriorityContract,cases,rawCases};
