'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),createGame=require('./runtime-fixture.cjs');
function makeRunner(){const g=createGame();g.run(`
window.playCollectionPath=function(plan,seed){
 var rng=seed>>>0;Math.random=function(){rng=(rng*1664525+1013904223)>>>0;return rng/4294967296;};
 selectedDifficulty=plan.difficulty||'story';startGame();var trace=[],steps=0;
 function drain(){for(var guard=0;guard<150;guard++){
  if(S.collection&&S.collection.primary)return;
  if(window._next){continueResult();continue;}
  if(window._careerPending){pickCareerChoice(plan.depart&&window._careerChoices.length>1?1:0);continue;}
  if(projectBattleState){var opts=projectBattleState.opts||[];var pick=opts.findIndex(x=>x.kind==='evidence');projectBattlePick(pick<0?0:pick);continue;}
  if(duelState){duelPick(DUEL_ROUNDS[duelState.round].correct);continue;}
  if(window._evObj){var ev=window._evObj.ev,rows=contextualChoiceList(ev.choices);var i=plan.eventChoice==null?0:Math.min(plan.eventChoice,rows.length-1);if(plan.resource)i=rows.reduce((best,c,j)=>Number(c.e&&c.e[plan.resource]||0)<Number(rows[best].e&&rows[best].e[plan.resource]||0)?j:best,0);if(plan.targetBranch){var j=rows.findIndex(c=>c.branchFlag===plan.targetBranch);if(j>=0)i=j;}trace.push({type:'event',id:ev.id,choice:i});pickEvent(i);continue;}
  if(S.coverage&&S.coverage.current){skipCoverage147();continue;}
  if(window._romEv){pickRomanceEncounter(plan.noCare?2:0);continue;}
  if(window._homeEv){pickHomeEvent(plan.noCare?2:0);continue;}
  if(window._lovePending){lovePick(plan.noCare?2:0);continue;}
  return;
 }throw Error('Collection drain guard');}
 while(!(S.collection&&S.collection.primary)&&chapterIdx<18&&steps++<25){
  if(!plan.noCare&&S.restLeft>0&&(S.heart<65||S.stamina<30)){showRest();takeNap(2);restClose();}
  if(!plan.noCare&&!plan.resource&&S.sanity<25&&S.sanityCareLeft>0){startGroundingGame();for(var gi=0;gi<4;gi++)pickGrounding(GROUNDING_ROUNDS[groundingState.r].ok);if(window._next)continueResult();}
  var rows=runChapters[chapterIdx].choices,wanted=plan.steps&&plan.steps[chapterIdx]||plan.kind||'work',i=rows.findIndex(c=>c.campaignChoice.kind===wanted);if(i<0)i=0;
  trace.push({type:'main',chapter:chapterIdx+1,kind:rows[i].campaignChoice.kind,choice:i});pickChapter(i);drain();
 }
 if(!(S.collection&&S.collection.primary))throw Error('Collection path did not end');
 return {seed:seed,plan:plan,primary:S.collection.primary,records:S.collection.records,choices:trace,achievements:S.collection.choices.map(c=>c.id).filter(Boolean),allAwards:JSON.parse(localStorage.getItem('dragon_achievements')||'[]'),project:{outcome:S.campaign.outcome,history:S.campaign.history.length,quality:S.campaign.quality,cash:S.campaign.cash}};
};`);return g;}
function audit(limit=400){
 const g=makeRunner(),ends=g.json('Object.keys(ENDINGS)'),ach=g.json('ACHIEVEMENTS.map(a=>a.id)'),witnesses={},awards={},cases=[];
 function play(plan,seed){const prior=new Set(g.json("JSON.parse(localStorage.getItem('dragon_achievements')||'[]')")),r=g.json(`playCollectionPath(${JSON.stringify(plan)},${seed})`);cases.push({seed,plan,primary:r.primary});for(const id of r.records)if(!witnesses[id])witnesses[id]=r;for(const id of r.allAwards)if(!prior.has(id)&&!awards[id])awards[id]=r;return r;}
 const chain={10:'authority',12:'delegation',15:'department',17:'vp'};
 play({},1);play({steps:chain},2);play({steps:{10:'authority',12:'delegation'}},3);play({steps:{17:'shortcut'}},4);play({steps:{8:'shortcut'}},5);play({steps:{13:'fraud'}},6);play({steps:{10:'authority'}},7);
 for(let i=0;i<18;i++)play({steps:{[i]:'shortcut'}},100+i);
 for(const [i,kind] of [[1,'safetyReview'],[3,'present'],[4,'exploration'],[6,'btd'],[7,'safetyReview'],[13,'delay']])play({steps:{[i]:kind}},200+i);
 play({steps:{10:'authority',12:'delegation',17:'concentrate'}},301);
 for(let seed=1;seed<=limit;seed++){
  const eventChoice=seed%3;play({steps:seed%4===0?chain:{},eventChoice,depart:seed%5===0},10000+seed);
  if(seed<=100){play({kind:'shortcut',eventChoice,noCare:seed%2===0,difficulty:seed%3===0?'hard':'normal'},20000+seed);play({kind:'shortcut',resource:seed%2?'sanity':'morale'},30000+seed);}
  if(ends.every(id=>witnesses[id])&&ach.every(id=>awards[id]))break;
 }
 const missingEndings=ends.filter(id=>!witnesses[id]),missingAchievements=ach.filter(id=>!awards[id]);
 const report={endings:ends.length,achievements:ach.length,fullRuns:cases.length,coveredEndings:Object.keys(witnesses).length,coveredAchievements:Object.keys(awards).length,missingEndings,missingAchievements,witnesses,awards,cases};
 if(process.env.COLLECTION_OUTPUT)fs.writeFileSync(process.env.COLLECTION_OUTPUT,JSON.stringify(report,null,2));
 console.log(JSON.stringify({endings:report.endings,achievements:report.achievements,fullRuns:report.fullRuns,coveredEndings:report.coveredEndings,coveredAchievements:report.coveredAchievements,missingEndings,missingAchievements},null,2));
 if(!process.env.COLLECTION_DIAGNOSTIC){assert.deepEqual(missingEndings,[]);assert.deepEqual(missingAchievements,[]);
  const cache=new Map();for(const [kind,table] of [['ending',witnesses],['achievement',awards]])for(const [id,w] of Object.entries(table)){
   const key=JSON.stringify([w.plan,w.seed]);let replay=cache.get(key);if(!replay){const fresh=makeRunner();fresh.run('playCollectionPath({},1)');replay=fresh.json(`playCollectionPath(${JSON.stringify(w.plan)},${w.seed})`);cache.set(key,replay);}
   assert((kind==='ending'?replay.records:replay.allAwards).includes(id),'clean replay of '+kind+' '+id);
  }report.cleanReplayScenarios=cache.size;report.cleanReplayRuns=cache.size*2;if(process.env.COLLECTION_OUTPUT)fs.writeFileSync(process.env.COLLECTION_OUTPUT,JSON.stringify(report,null,2));console.log('PASS clean replay witnesses: '+cache.size+' deterministic scenarios; all 64 records and 108 awards.');
 }return report;
}
if(require.main===module)audit(Number(process.env.COLLECTION_LIMIT)||400);
module.exports={audit,makeRunner};
