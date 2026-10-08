'use strict';
// Runs the repository simulator against an explicitly selected source snapshot.
// Use real three-of-four grounding-game answers, rather than directly awarding stats.
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const root=path.resolve(__dirname,'..');
let src=fs.readFileSync(path.join(root,'tests/balance-sim.cjs'),'utf8');
src=src.replace("fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8')","fs.readFileSync(process.env.SIM_HTML || path.join(__dirname,'..','index.html'),'utf8')");
src=src.replace('timeout:20000','timeout:180000');
const old="S.sanity=clamp(S.sanity+14);S.heart=clamp(S.heart+3);S.sanityCareLeft--;n++;";
if(!src.includes(old))throw new Error('Grounding replacement point not found');
src=src.replace(old,"window._inRest=true;startGroundingGame();for(var gi=0;gi<4;gi++){var gr=GROUNDING_ROUNDS[groundingState.r];pickGrounding(gi===3?(gr.ok+1)%gr.opts.length:gr.ok);}if(window._next)continueResult();window._inRest=false;window._next=null;n++;");
src=src.replace('var rests=0,steps=0;','var rests=0,steps=0,mainPath=[];');
src=src.replace('if(window._next){continueResult();continue}', 'if(window._next){continueResult();continue}if(window._careerPending){pickCareerChoice(Math.floor(rnd()*window._careerChoices.length));continue;}');
src=src.replace("pickCoverageDelivery147(Math.min(ci,cev.choices.length-1));continue;", "ci=Math.min(ci,cev.choices.length-1);var cc=presentedChoice(cev.choices,ci);if((cev.id==='d147_handoff'&&ci===0&&((S.power||0)<(window.RECRUIT_POWER_147||35)||!window.teamState147||!window.teamState147().members.length))||(cc.lock&&!unlocked(cc))||S.stamina<costStamina(cc)){skipCoverage147();continue;}pickCoverageDelivery147(ci);continue;");
src=src.replace('var guard=0;', 'var guard=0,diagnostic=[];');
src=src.replace('if(window.__simEnding)return;', "if(window.__simEnding)return;diagnostic.push({chapter:chapterIdx,next:!!window._next,event:window._evObj&&window._evObj.ev&&window._evObj.ev.id,coverage:S&&S.coverage&&S.coverage.current,romance:!!window._romEv,home:!!window._homeEv,love:!!window._lovePending,battle:projectBattleState&&{round:projectBattleState.round,awaiting:projectBattleState.awaitingResult},duel:duelState&&duelState.round});if(diagnostic.length>8)diagnostic.shift();");
src=src.replace("throw new Error('balance-sim drain guard exceeded')", "throw new Error('balance-sim drain guard exceeded '+JSON.stringify(diagnostic))");
src=src.replace("pickChapter(chooseIndex(shown,profile,'main'));","var chosen=chooseIndex(shown,profile,'main');mainPath.push({chapter:chapterIdx+1,id:ch.id,choice:chosen,text:shown[chosen]&&shown[chosen].t});pickChapter(chosen);");
src=src.replace("id:window.__simEnding||'NO_END',rests:rests,love:!!flags.love,","id:window.__simEnding||'NO_END',chapter:chapterIdx+1,mainPath:mainPath,campaign:S.campaign?JSON.parse(JSON.stringify({outcome:S.campaign.outcome,finished:S.campaign.finished,historyLength:S.campaign.history.length,quality:S.campaign.quality,cash:S.campaign.cash,months:S.campaign.months})):null,rests:rests,love:!!flags.love,");
src=src.replace('var counts={},rests=0,love=0,pi1=0,pi2=0,sum=', 'var counts={},samples={},campaignCounts={},rests=0,love=0,pi1=0,pi2=0,sum=');
src=src.replace('counts[r.id]=(counts[r.id]||0)+1;rests+=r.rests;',"if(!samples[r.id])samples[r.id]=r;if(r.campaign){var outcome=r.campaign.outcome||'unfinished';campaignCounts[outcome]=(campaignCounts[outcome]||0)+1;}counts[r.id]=(counts[r.id]||0)+1;rests+=r.rests;");
src=src.replace('counts:counts,avgRests:', 'counts:counts,samples:samples,campaignCounts:campaignCounts,avgRests:');
src=src.replace('console.log(JSON.stringify(result,null,2));',"if(process.env.SIM_OUTPUT)fs.writeFileSync(process.env.SIM_OUTPUT,JSON.stringify(result,null,2));console.log(JSON.stringify({difficulty:result.difficulty,N:result.N,profiles:Object.fromEntries(Object.entries(result.profiles).map(([k,v])=>[k,{counts:v.counts,campaignCounts:v.campaignCounts}]))},null,2));");
src=src.slice(0,src.indexOf('const balanceBlockers=[];'))+`
const blockers=[];
for(const [name,p] of Object.entries(result.profiles))if(p.counts.NO_END)blockers.push(name+': NO_END');
for(const [name,p] of Object.entries(result.coverageBuilds))if(p.counts.NO_END)blockers.push(name+': NO_END');
if(DIFFICULTY==='normal'){
 const heart=(result.profiles.appease.counts.be_heart||0)/N;
 const next=(result.profiles.govern.counts.ge_next||0)/N;
 if(heart<.70||heart>.90)blockers.push('appease heart exhaustion '+heart);
 if(next<.20||next>.25)blockers.push('govern explicit departure '+next);
 console.log('TARGET RATES heart='+heart+' next='+next);
}
if(blockers.length){console.error('BALANCE GATE FAIL: '+blockers.join('; '));process.exitCode=2;}
else console.log('PASS V2 balance gate: '+DIFFICULTY+' seed='+SEED+' N='+N);
`;
const m=new Module(path.join(root,'tests/__balance-audit-virtual.cjs'),module);
m.filename=path.join(root,'tests/__balance-audit-virtual.cjs');m.paths=Module._nodeModulePaths(path.join(root,'tests'));
m._compile(src,m.filename);
