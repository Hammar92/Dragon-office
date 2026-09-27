/* Dragon Office RC reachability witnesses for canonical final resolver.
 * This file proves resolver-level reachability; terminal/special endings remain audited at their real entry points.
 */
'use strict';
const {buildFinalEndingState,resolveFinalEnding}=require('../ending-resolver.js');

function base(overrides){
  const b={progress:65,trust:50,morale:50,sanity:60,heart:60,power:40,dragon:2,merit:20,reputation:30,bossTrust:30,career:35,difficultyId:'normal',promotionSupport:0,promotionOppose:0,
    npc:{ceo:40,cso:40,xiaoyuan:45,caolan:45,ruidong:45,heina:45,weilai:45},allyAt:{},flags:{main_18_2:true}};
  const o=Object.assign({},b,overrides||{});o.flags=Object.assign({},b.flags,(overrides&&overrides.flags)||{});o.npc=Object.assign({},b.npc,(overrides&&overrides.npc)||{});return o;
}
const W={};
function add(id,state){W[id]=state;}
add('true_afterdragon',base({progress:75,morale:65,dragon:8,flags:{metaRoute:'echo',meta_echo_refuse:true}}));
add('true_dragon',base({power:70,dragon:12,merit:50,flags:{main_18_3:true,dragon_take:true}}));
add('ge_slayer',base({power:70,dragon:5,flags:{main_18_3:true},npc:{ceo:65,cso:65,xiaoyuan:65}}));
add('ge_promotion',base({merit:72,reputation:50,bossTrust:50,promotionSupport:3}));
add('ge_unsung',base({merit:80,reputation:20}));
add('ge_next',base({career:80,flags:{main_18_1:true}}));
add('ge_firstline',base({career:60,flags:{main_18_1:true}}));
[
 ['v14_joint_capacity',['v14_0_0','v14_6_0'],'govern'],['v14_joint_paper',['v14_1_0','v14_2_0'],'govern'],['v14_joint_site',['v14_3_0','v14_6_0'],'govern'],
 ['v14_joint_story',['v14_4_1','v14_7_1'],'appease'],['v14_joint_dragon',['v14_5_2','v14_8_2'],'power']
].forEach(([id,fs,route])=>{const flags={main_18_2:true};fs.forEach(k=>flags[k]=true);add(id,base({flags,v14FinalRoute:route}));});
for(let e=0;e<9;e++)for(let c=0;c<3;c++){const id=`v14_${e}_${c}`;add(id,base({v14Candidate:id,v14FinalRoute:['govern','appease','power'][c]}));}
add('nc_xiaoyuan',base({flags:{main_18_1:true},npc:{xiaoyuan:86}}));
add('nc_caolan',base({flags:{main_18_1:true},npc:{caolan:66}}));
add('nc_ruidong',base({flags:{main_18_1:true},npc:{ruidong:71}}));
add('nc_heina',base({dragon:7,flags:{main_18_3:true},npc:{heina:71}}));
add('nc_weilai',base({progress:50,npc:{weilai:61}}));
add('nc_love',base({progress:50,flags:{love:true}}));
add('be_island',base({progress:50,npc:{ceo:25,cso:25,xiaoyuan:25,caolan:25,ruidong:25,heina:25,weilai:25}}));
add('mid_halfbridge',base({progress:50,trust:50,morale:50,sanity:50}));
add('ge_survive',base({progress:50,trust:40,morale:40,sanity:40}));
add('be_trust',base({progress:50,trust:20,morale:40,sanity:40}));
add('be_progress',base({progress:20}));

function run(){const failures=[];for(const [id,raw] of Object.entries(W)){const state=buildFinalEndingState(raw),actual=resolveFinalEnding(state);if(actual!==id)failures.push({id,actual,raw,state});}return{pass:!failures.length,total:Object.keys(W).length,failures};}
if(require.main===module){const r=run();if(!r.pass){console.error(JSON.stringify(r,null,2));process.exitCode=1;}else console.log(`PASS final-resolver witnesses: ${r.total}/${r.total}`);}
module.exports={W,run};
