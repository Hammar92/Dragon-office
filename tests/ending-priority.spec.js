/* Dragon Office RC ending-priority contract tests. */
'use strict';
const { PRIORITY, buildFinalEndingState, resolveFinalEnding } = require('../ending-resolver.js');
const cases=[
 ['duel beats true route',{duelWinEnding:true,trueDragon:true},'duelWin'],['true route beats career',{trueDragon:true,promotion:true},'true_dragon'],
 ['true route beats joint',{trueAfterdragon:true,joints:{v14_joint_capacity:true}},'true_afterdragon'],['true route beats event',{slayer:true,v14Candidate:'v14_0_0'},'ge_slayer'],
 ['career beats joint',{promotion:true,joints:{v14_joint_capacity:true}},'ge_promotion'],['career beats event',{unsung:true,v14Candidate:'v14_4_1'},'ge_unsung'],
 ['joint beats event',{v14Eligible:true,joints:{v14_joint_paper:true},v14Candidate:'v14_2_0'},'v14_joint_paper'],['career beats NPC',{next:true,ncXiaoyuan:true},'ge_next'],
 ['event beats NPC',{v14Eligible:true,v14Candidate:'v14_8_2',ncHeina:true},'v14_8_2'],['NPC beats generic',{ncCaolan:true,survive:true},'nc_caolan'],
 ['love blocked by full success',{ncLove:true,projectFullySuccessful:true,survive:true},'ge_survive'],['love allowed when incomplete',{ncLove:true,projectFullySuccessful:false,survive:true},'nc_love'],
 ['invalid candidate ignored',{v14Candidate:'ge_promotion',beTrust:true},'be_trust'],['route mismatch blocks echo',{v14Candidate:'v14_2_1',v14RouteMatched:false,survive:true},'ge_survive'],
 ['legacy last',{legacy:'legacy_old_finalize'},'legacy_old_finalize']
];
function raw(o){const b={progress:65,trust:50,morale:55,sanity:60,heart:60,power:45,dragon:2,merit:30,reputation:30,bossTrust:35,career:40,difficultyId:'normal',promotionSupport:1,promotionOppose:0,npc:{ceo:35,cso:35,xiaoyuan:50,caolan:45,ruidong:45,heina:40,weilai:40},allyAt:{},flags:{main_18_2:true},joints:{}};const x=Object.assign({},b,o||{});x.flags=Object.assign({},b.flags,(o&&o.flags)||{});x.npc=Object.assign({},b.npc,(o&&o.npc)||{});x.joints=Object.assign({},b.joints,(o&&o.joints)||{});return x;}
const rawCases=[
 ['raw after-dragon',raw({progress:72,morale:58,dragon:10,flags:{metaRoute:'echo',meta_echo_refuse:true}}),'true_afterdragon'],
 ['raw dragon beats promotion',raw({power:70,dragon:12,merit:80,reputation:60,bossTrust:60,promotionSupport:4,flags:{main_18_3:true,dragon_take:true}}),'true_dragon'],
 ['raw slayer',raw({power:70,dragon:5,flags:{main_18_3:true},npc:{ceo:65,cso:60,xiaoyuan:65,caolan:62}}),'ge_slayer'],
 ['raw promotion',raw({merit:75,reputation:55,bossTrust:55,promotionSupport:3}),'ge_promotion'],['raw unsung',raw({merit:80,reputation:20}),'ge_unsung'],
 ['raw next',raw({career:80,flags:{main_18_1:true}}),'ge_next'],['raw firstline',raw({career:60,flags:{main_18_1:true}}),'ge_firstline'],
 ['joint capacity from flags',raw({flags:{v14_0_0:true,v14_6_0:true},v14FinalRoute:'govern'}),'v14_joint_capacity'],
 ['joint paper from flags',raw({flags:{v14_1_0:true,v14_2_0:true},v14FinalRoute:'govern'}),'v14_joint_paper'],
 ['joint site from flags',raw({flags:{v14_3_0:true,v14_6_0:true},v14FinalRoute:'govern'}),'v14_joint_site'],
 ['joint story from flags',raw({flags:{v14_4_1:true,v14_7_1:true},v14FinalRoute:'appease'}),'v14_joint_story'],
 ['joint dragon from flags',raw({flags:{v14_5_2:true,v14_8_2:true},v14FinalRoute:'power'}),'v14_joint_dragon'],
 ['joint wrong route ignored',raw({progress:50,flags:{v14_0_0:true,v14_6_0:true},v14FinalRoute:'power'}),'mid_halfbridge'],
 ['raw matching echo',raw({v14Candidate:'v14_4_1',v14FinalRoute:'appease'}),'v14_4_1'],['raw low-progress echo blocked',raw({progress:50,v14Candidate:'v14_4_1',v14FinalRoute:'appease'}),'mid_halfbridge'],['raw low-progress joint blocked',raw({progress:50,flags:{v14_1_0:true,v14_2_0:true},v14FinalRoute:'govern'}),'mid_halfbridge'],['raw mismatched echo',raw({progress:50,v14Candidate:'v14_4_1',v14FinalRoute:'govern'}),'mid_halfbridge'],
 ['raw xiaoyuan',raw({npc:{xiaoyuan:86},flags:{main_18_1:true}}),'nc_xiaoyuan'],['raw love incomplete',raw({progress:50,flags:{love:true}}),'nc_love'],
 ['raw halfbridge',raw({progress:50}),'mid_halfbridge'],['raw survive',raw({progress:50,trust:40,morale:40,sanity:40}),'ge_survive'],
 ['raw trust failure',raw({progress:50,trust:20,morale:40,sanity:40}),'be_trust'],['raw progress failure',raw({progress:20}),'be_progress']
];
function runEndingPriorityContract(){const failures=[];for(const [name,state,expected] of cases){const actual=resolveFinalEnding(state);if(actual!==expected)failures.push({name,expected,actual,state});}for(const [name,state,expected] of rawCases){const built=buildFinalEndingState(state),actual=resolveFinalEnding(built);if(actual!==expected)failures.push({name,expected,actual,state,built});}return{pass:!failures.length,total:cases.length+rawCases.length,failures};}
if(require.main===module){const r=runEndingPriorityContract();if(!r.pass){console.error(JSON.stringify(r,null,2));process.exitCode=1;}else console.log('PASS ending priority contract: '+r.total+'/'+r.total);}
module.exports={PRIORITY,buildFinalEndingState,resolveFinalEnding,runEndingPriorityContract,cases,rawCases};
