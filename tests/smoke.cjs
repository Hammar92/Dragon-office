const fs=require('fs'),vm=require('vm'),assert=require('assert');
const gamePath=require('path').join(__dirname,'..','index.html');
const html=fs.readFileSync(gamePath,'utf8');
const code=html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i)[1];
new vm.Script(code,{filename:'index.html'});
const nodes=new Map();
function makeEl(id){
  const n={id,innerHTML:'',textContent:'',value:'',style:{},dataset:{},children:[],parentNode:null,
    classList:{add(){},remove(){},contains(){return false}},
    querySelector(){return null},querySelectorAll(){return []},insertAdjacentHTML(){},addEventListener(){},remove(){},scrollIntoView(){},setAttribute(){},getAttribute(){return null},
    appendChild(c){if(c){c.parentNode=this;this.children.push(c)}return c},
    insertBefore(c,ref){if(!c)return c;c.parentNode=this;const i=this.children.indexOf(ref);if(i<0)this.children.push(c);else this.children.splice(i,0,c);return c}
  };
  Object.defineProperty(n,'nextSibling',{get(){if(!this.parentNode)return null;const a=this.parentNode.children,i=a.indexOf(this);return i>=0?(a[i+1]||null):null}});
  return n;
}
function el(id){if(!nodes.has(id))nodes.set(id,makeEl(id));return nodes.get(id)}
const app=el('app'),game=el('game-screen'),hud=el('hud'),scene=el('scene-area');
app.appendChild(game);game.appendChild(hud);game.appendChild(scene);
const document={head:makeEl('head'),body:makeEl('body'),getElementById:el,querySelector(){return null},querySelectorAll(){return []},createElement(){return makeEl('created')}};
const storage=new Map();const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))};
const context={document,localStorage,sessionStorage:localStorage,console,setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},Math:Object.assign(Object.create(Math),{random:()=>0.1})};context.window=context;context.scrollTo=()=>{};context.window.scrollTo=()=>{};context.window.innerWidth=900;context.document.body.scrollHeight=1000;
vm.createContext(context);vm.runInContext(code,context,{timeout:5000});
function run(s){return vm.runInContext(s,context,{timeout:5000})}
run('startGame()');
run('S.progress="25"; S.restLeft=1; takeNap(1)');assert.strictEqual(run('S.progress'),25,'convenience rest preserves progress');assert.strictEqual(run('S.restLeft'),0);
run('S.restLeft=1; takeNap(2)');assert.strictEqual(run('S.progress'),24,'long rest costs one');
run('S.restLeft=1; S.progress="25"; grant({progress:0})');assert.strictEqual(run('S.progress'),25,'zero grant numeric');
run('S.progress="25"; applyChoice({e:{progress:2},npc:{}})');assert.strictEqual(run('S.progress'),27,'choice numeric');
run('S.progress="25"; S.restLeft=1; takeNap(99)');assert.strictEqual(run('S.restLeft'),1,'invalid rest does not consume');
for(const id of ['v11_4','v11_5','v11_7','v11_9','v11_13','v11_14','v11_15','v11_16']){
  run(`flags['battle_${id}']=false; maybeProjectBattle('${id}',function(){window.battleDone=(window.battleDone||0)+1})`);
  assert.strictEqual(run('projectBattleState.chId'),id,`battle ${id}`);
  assert.ok(el('scene-area').innerHTML.includes('projectBattlePick'),`QTE shown ${id}`);
  for(let i=0;i<3;i++){run('projectBattlePick(2); continueResult()')}
  assert.strictEqual(run('projectBattleState'),null,`battle concluded ${id}`);
  run('continueResult()');assert.ok(run('window.battleDone')>=1,`callback ${id}`);
}
console.log('Smoke OK: rest, numeric progress, eight QTEs, three-round completion');

run("chapterIdx=3; flags.battle_v11_4=false; maybeEvent=function(id,next){next()}; S.trust=60; S.stamina=80; S.heart=80; pickChapter(0); continueResult()");
assert.strictEqual(run('projectBattleState.chId'),'v11_4','chapter choice reaches meeting QTE');
console.log('Chapter integration OK');

assert.strictEqual(run('V11_CHAPTERS.length'),18,'all chapters reachable');
assert.strictEqual(run('V11_EVENTS.length'),34,'all random events loaded');
assert.strictEqual(run('ACHIEVEMENTS.length'),108,'achievement count');
assert.strictEqual(run('LIFE_STAGE_META.length'),6,'six life-build stages');
assert.strictEqual(run('LIFE_STAGE_META.every(s=>s.time===8)'),true,'every life-build stage starts with 8 points');
assert.strictEqual(run('LIFE_STAGE_META.every(s=>LIFE_EVENTS[s.id].reduce((n,e)=>n+e.cost,0)>s.time)'),true,'no life stage can buy every event');
assert.strictEqual(run('LIFE_STAGE_META.every(s=>Math.min.apply(null,LIFE_EVENTS[s.id].map(e=>e.cost))<=3)'),true,'every life stage has affordable low-cost choices');
run("LIFE_DRAFT.selected.school=[]; toggleLifeEvent('school','school_study'); toggleLifeEvent('school','school_social')");
assert.strictEqual(run("stageSpent('school')"),6,'life-stage spending uses rebalanced costs');
run("toggleLifeEvent('school','school_sport')");
assert.strictEqual(run("stageSpent('school')"),6,'life-stage budget blocks overspend beyond eight');

// High-tier life-build routes must remain mutually exclusive where they compete for the same stage budget.
run("LIFE_DRAFT.selected.senior=[]; toggleLifeEvent('senior','senior_nda'); toggleLifeEvent('senior','senior_phase3')");
assert.deepStrictEqual(run("LIFE_DRAFT.selected.senior.slice()"),['senior_nda'],'FIH-to-NDA blocks phase3 in the same eight-point senior budget');
run("LIFE_DRAFT.selected.senior=[]; toggleLifeEvent('senior','senior_portfolio'); toggleLifeEvent('senior','senior_nda')");
assert.deepStrictEqual(run("LIFE_DRAFT.selected.senior.slice()"),['senior_portfolio'],'portfolio blocks FIH-to-NDA in the same eight-point senior budget');
run("LIFE_DRAFT.selected.middle=[]; toggleLifeEvent('middle','mid_team'); toggleLifeEvent('middle','mid_conflict')");
assert.strictEqual(run("stageSpent('middle')"),6,'organization-leader middle prerequisites fit but do not consume the whole stage');
run("LIFE_DRAFT.selected.senior=[]; toggleLifeEvent('senior','senior_portfolio'); toggleLifeEvent('senior','senior_boundary')");
assert.strictEqual(run("stageSpent('senior')"),6,'portfolio plus boundary remains a deliberate alternative build');
run("window.NG_STAGE_ALLOC={school:2,college:0,graduate:0,early:0,middle:0,senior:0}");
assert.ok(run("lifeBuilderHTML().includes('时间 0 / 10（多周目 +2）')"),'NG+ adds on top of the 8-point stage baseline');
run("window.NG_STAGE_ALLOC={school:0,college:0,graduate:0,early:0,middle:0,senior:0}");
run("Object.keys(LIFE_DRAFT.selected).forEach(k=>LIFE_DRAFT.selected[k]=[])");
assert.deepStrictEqual(run('(()=>{const x=lifeSummary();return [x.skills.professional,x.skills.social,x.skills.charm,x.skills.management,x.skills.insight,x.skills.fitness]})()'),[34,34,34,32,34,38],'RC life-build baseline skills');
run("LIFE_DRAFT.selected={school:['school_care'],college:['college_org','college_intern','college_parttime','college_sidejob'],graduate:['grad_teach','grad_collab'],early:['early_biotech','early_owner','early_goodboss','early_cra'],middle:['mid_cross','mid_team','mid_fire','mid_vendor'],senior:['senior_boundary','senior_mentor','senior_crisis','senior_hire']}");
assert.strictEqual(run('lifeSummary().skills.management'),91,'8-point extreme management build is softened instead of hard-capping');
assert.strictEqual(run('LIFE_STAGE_META.every(s=>stageSpent(s.id)<=s.time)'),true,'extreme management witness respects every 8-point stage budget');
run("Object.keys(LIFE_DRAFT.selected).forEach(k=>LIFE_DRAFT.selected[k]=[])");
assert.strictEqual(run('SKILL_UPGRADE_COST'),1,'RC growth point cost');
run("S.player=Object.assign({},S.player,{skills:{professional:40,social:40,charm:40,management:40,project:40,insight:40,fitness:40},skillPoints:1,heartProfile:{resilience:50},body:{maxStamina:60},personality:{stability:50,boundary:50,conflict:50,control:50,drive:50,trust:50}})");
run("buySkill('professional')");
assert.strictEqual(run('S.player.skills.professional'),44,'RC skill upgrade adds four');

assert.strictEqual(run('new Set(ACHIEVEMENTS.map(a=>a.id)).size'),108,'unique achievement IDs');
assert.strictEqual(run(`(()=>{const s=new Set();V11_CHAPTERS.forEach(ch=>(ch.choices||[]).forEach(c=>c.achievement&&s.add(c.achievement)));V11_EVENTS.forEach(ev=>(ev.choices||[]).forEach(c=>c.achievement&&s.add(c.achievement)));return ACHIEVEMENTS.every(a=>s.has(a.id));})()`),true,'all 108 achievements have a real chapter/event source');
assert.strictEqual(html.includes('unlockAchievement("a')||html.includes("unlockAchievement('a"),false,'no stale hard-coded achievement ID auto-unlocks');
assert.strictEqual(run('Object.keys(ENDINGS).length'),64,'ending count');
for(const k of ['anyu','qiaoqiao','wenjing','xiaoke','linpi','tongxin']){
  assert.strictEqual(run(`Object.prototype.hasOwnProperty.call(NPCs,'${k}')`),false,`deleted NPC ${k} absent`);
  assert.strictEqual(run(`Object.prototype.hasOwnProperty.call(NPC_BIOS,'${k}')`),false,`deleted NPC bio ${k} absent`);
}
assert.strictEqual(run('PI_CHAIN_EVENTS.length'),2,'PI chain events installed');
run('S.prestige={boss:0,team:0,chain:0,last:null,history:[]}; const _p=prestigeState(); addPrestige(3,4,"test")');
assert.strictEqual(run('S.prestige.boss'),3,'boss prestige');
assert.strictEqual(run('S.prestige.team'),4,'team prestige');
assert.ok(html.includes('Demo v14.5'),'visible release label is current');
assert.ok(html.includes('RC_CANONICAL_ENDING_RESOLVER_BEGIN'),'canonical ending resolver embedded in single-file build');
assert.ok(html.includes('RC_ENDING_RUNTIME_BRIDGE_BEGIN'),'canonical runtime bridge embedded in single-file build');
assert.strictEqual(run('typeof rcEndingAudit'),'function','runtime ending audit installed');
assert.ok(run('String(finalizeEvaluation).includes("canonicalFinalize")'),'canonical finalizer is the last production wrapper');
assert.ok(!html.includes('钟时（Dragon）'),'Zhong Shi label has no Dragon suffix');
assert.ok(html.includes('pm-left-panel'),'life-sim ability panel is installed');
assert.ok(html.includes('能力数值'),'ability values are visibly labeled');
assert.ok(html.includes('组织威信'),'boss/team prestige is visibly labeled');
assert.ok(!html.includes('💗 有人等你'),'love line stays hidden from HUD');
assert.strictEqual(run('ACHIEVEMENTS.filter(a=>a.comment).length'),108,'all achievements have commentary');
assert.strictEqual(run('v145Audit().badRefs.length'),0,'v14.5 has no bad NPC refs');
assert.strictEqual(run('Object.values(v145Audit().lifeDup).every(x=>x.length===0)'),true,'life event ids remain unique');
assert.strictEqual(run('Object.values(v145Audit().counts).join(",")'),'26,18,34,108,64,2','v14.5 catalog counts');
assert.strictEqual((html.match(/你其实也想过走。后来算了/g)||[]).length,1,'true dragon duplicated paragraph removed');

run("Object.keys(LIFE_DRAFT.selected).forEach(k=>LIFE_DRAFT.selected[k]=[]); LIFE_DRAFT.selected.middle=['mid_marriage']; S=null; flags={}; usedEvents=[]; usedHeina=[]; chapterIdx=0; runChapters=[]; startGame()");
assert.strictEqual(run('ensureRelationshipArc().origin'),'partnered_family','marriage initializes family relationship');
assert.strictEqual(run('flags.love'),false,'existing partner does not expose new-love flag');
assert.strictEqual(run('flags.existingPartner'),true,'existing partner tracked separately');
run("Object.keys(LIFE_DRAFT.selected).forEach(k=>LIFE_DRAFT.selected[k]=[]); LIFE_DRAFT.selected.middle=['mid_divorce']; S=null; flags={}; usedEvents=[]; usedHeina=[]; chapterIdx=0; runChapters=[]; startGame()");
assert.strictEqual(run('ensureRelationshipArc().origin'),'divorced_rebuilt','divorce history preserved');
assert.ok(run('relationshipEpilogue()').includes('重新搭起来'),'divorce epilogue distinct');
run("Object.keys(LIFE_DRAFT.selected).forEach(k=>LIFE_DRAFT.selected[k]=[]); LIFE_DRAFT.selected.middle=['mid_single']; S=null; flags={}; usedEvents=[]; usedHeina=[]; chapterIdx=0; runChapters=[]; startGame()");
assert.strictEqual(run('ensureRelationshipArc().origin'),'single_content','content single status preserved');
assert.ok(run('relationshipEpilogue()').includes('单身'),'single epilogue distinct');
run("Object.keys(LIFE_DRAFT.selected).forEach(k=>LIFE_DRAFT.selected[k]=[]); LIFE_DRAFT.selected.middle=['mid_betrayal']; S=null; flags={}; usedEvents=[]; usedHeina=[]; chapterIdx=0; runChapters=[]; startGame()");
assert.strictEqual(run('ensureRelationshipArc().origin'),'guarded','betrayal creates guarded relationship state');
assert.strictEqual(run('v145Audit().formulaicEmotion'),false,'old canned emotion prefixes removed');
assert.deepStrictEqual(run('v145Audit().achievementCommentsMissing'),[],'all achievement comments present');
assert.strictEqual(run('v145Audit().hiddenLoveHud'),false,'hidden relationship stays off HUD');

run("Object.keys(LIFE_DRAFT.selected).forEach(k=>LIFE_DRAFT.selected[k]=[]); S=null; flags={}; usedEvents=[]; usedHeina=[]; chapterIdx=0; runChapters=[]; startGame(); S.heart=20");
assert.ok(run('contextualChoiceList(runChapters[0].choices).length')>3,'low heart adds contextual option');
run("S.heart=80; S.sanity=35");
assert.ok(run('contextualChoiceList(runChapters[0].choices).length')>3,'low sanity adds contextual option');
run("S.sanity=80; S.power=70");
assert.ok(run('contextualChoiceList(runChapters[0].choices).some(c=>c.contextExtra&&c.route==="power")'),'high power unlocks authority option');
run("chapterIdx=17; runChapters=V11_CHAPTERS.map(x=>Object.assign({},x)); S.heart=20; S.sanity=30; S.power=80");
assert.strictEqual(run('contextualChoiceList(runChapters[17].choices).length'),3,'final chapter preserves only route-bearing choices');

run("LIFE_DRAFT.selected.middle=['mid_marriage','mid_divorce','mid_single']; normalizeRelationshipSelections()");
assert.strictEqual(run('LIFE_DRAFT.selected.middle.filter(id=>(LIFE_EVENTS.middle.find(e=>e.id===id)||{}).exclusive==="middle_romance").length'),1,'old contradictory romance selections normalized');
assert.ok(html.includes('64 个结局，本机存档。'),'intro ending count is current');
assert.ok(!html.includes('建议时长：一局 30–45 分钟。22 个结局，本机存档。'),'stale ending copy removed');
assert.strictEqual(run('V11_EVENTS.every((ev,i)=>ev.choices.some(c=>c.achievement) && RANDOM_ACHIEVEMENT_IDS[i].length>0)'),true,'every random event has an achievement');
assert.strictEqual(run('V11_EVENTS.slice(15).every(ev=>ev.choices.every(c=>c.achievement))'),true,'new random events award on every choice');
assert.strictEqual(run('new Set(V11_EVENTS.map((ev,i)=>ACHIEVEMENTS.find(a=>a.id===RANDOM_ACHIEVEMENT_IDS[i][0]).name)).size'),34,'individual black humor event names');
assert.strictEqual(run('V11_EVENTS.slice(25).every((ev,i)=>ev.choices.every(c=>c.achievement==="a"+(100+i) && c.branchFlag))'),true,'nine new events have assigned awards and consequences');
assert.strictEqual(run('V11_CHAPTERS.every((ch,i)=>ch.choices.every((c,j)=>c.achievement==="a"+(i*3+j+1)))'),true,'main chapter outcome slots');

run('chapterIdx=17; runChapters=V11_CHAPTERS.map(x=>Object.assign({},x)); renderChapter()');
assert.ok(el('scene-area').innerHTML.includes('下一项项目'),'chapter 18 renders');
run('flags.shadow_capture=true; chapterIdx=17; renderChapter()');
assert.strictEqual(run('runChapters[17].id'),'v12_18_dragonpath','final branch variant reachable');
assert.ok(run('runChapters[17].choices[0].achievementName').includes(run('runChapters[17].choices[0].t')),'branch achievement is choice specific');
run('checkAchievements(runChapters[17].choices[0])');
assert.strictEqual(JSON.parse(storage.get('dragon_achievement_details')).a52,run('runChapters[17].choices[0].achievementName'),'branch award stored');
assert.ok(el('achievement-panel').innerHTML.includes(run('runChapters[17].choices[0].achievementName')),'branch award shown');

run('projectBattleState=null; chapterIdx=3; flags.battle_v11_4=false; maybeProjectBattle("v11_4",function(){})');
const before=el('scene-area').innerHTML;
run('showRest()');
assert.strictEqual(el('scene-area').innerHTML,before,'rest cannot replace active QTE');
run('projectBattlePick(2,0); projectBattlePick(2,0)');
assert.strictEqual(run('projectBattleState.round'),1,'duplicate round submission ignored');
run('continueResult(); projectBattlePick(2,0)');
assert.strictEqual(run('projectBattleState.round'),1,'stale QTE click ignored');
run('projectBattleState=null; showAlliances()');
assert.ok(el('scene-area').innerHTML.includes('内部关系网'),'current PM panel renders');

const legacyStorage=new Map([['dragon_achievements','["a55","a70","a72","a99"]'],['dragon_ng_points','7']]);
const migrated=Object.assign({},context,{localStorage:{getItem:k=>legacyStorage.get(k)||null,setItem:(k,v)=>legacyStorage.set(k,String(v))}});
migrated.window=migrated;
vm.createContext(migrated);vm.runInContext(code,migrated,{timeout:5000});
assert.deepStrictEqual(JSON.parse(legacyStorage.get('dragon_achievements')),['a55','a70'],'old unlocked outcomes mapped');
assert.deepStrictEqual(JSON.parse(legacyStorage.get('dragon_legacy_achievements')),['PVP本人请发言','机制抢麦'],'retired outcomes archived');
assert.strictEqual(legacyStorage.get('dragon_ng_points'),'7','earned points preserved');
console.log('Story, random achievements, migration, and QTE guards OK');

run('showEnding=function(k){window.testEnding=k}; projectBattleState=null');
run("flags={}; chapterIdx=4; S.sanity=80; applyChoice(presentedChoice(V11_EVENTS[25].choices,0)); chapterIdx=17; runChapters=V11_CHAPTERS.map(x=>Object.assign({},x)); applyChoice(presentedChoice(runChapters[17].choices,0))");
assert.strictEqual(run('flags.v14Candidate'),'v14_0_0','event choice records its outcome');
assert.strictEqual(run('flags.v14FinalRoute'),'govern','presented final choice records the route');
for(let ev=0;ev<9;ev++)for(let choice=0;choice<3;choice++){
  const key=`v14_${ev}_${choice}`;
  const route=['govern','appease','power'][choice];
  run(`flags={v14Candidate:'${key}',v14FinalRoute:'${route}'}; S.progress=65; S.heart=70; S.trust=55; S.morale=60; S.dragon=0; S.power=50; S.merit=30; window.testEnding=''; finalizeEvaluation()`);
  assert.strictEqual(run('window.testEnding'),key,`event ending ${key}`);
}
for(const [key,need,route] of [
  ['v14_joint_capacity',[0,6],'govern'],['v14_joint_paper',[1,2],'govern'],
  ['v14_joint_site',[3,6],'govern'],['v14_joint_story',[4,7],'appease'],
  ['v14_joint_dragon',[5,8],'power']
]){
  run(`flags={v14FinalRoute:'${route}'}; flags['v14_${need[0]}_${route==='appease'?1:route==='power'?2:0}']=true; flags['v14_${need[1]}_${route==='appease'?1:route==='power'?2:0}']=true; window.testEnding=''; finalizeEvaluation()`);
  assert.strictEqual(run('window.testEnding'),key,`combined ending ${key}`);
}
run("flags={dragon_take:true,v14Candidate:'v14_0_2',v14FinalRoute:'power'}; S.dragon=12; S.power=70; S.merit=50; window.testEnding=''; finalizeEvaluation()");
assert.strictEqual(run('window.testEnding'),'true_dragon','deliberate dragon path outranks event ending');
run("flags={}; chapterIdx=17; runChapters=V11_CHAPTERS.map(x=>Object.assign({},x)); S.progress=78; S.power=72; S.merit=55; S.dragon=10; S.heart=80; S.sanity=80; S.trust=60; S.morale=65; window.testEnding=''; pickChapter(2); continueResult()");
assert.strictEqual(run('window.testEnding'),'true_dragon','real final choice can reach dragon ending');
run("flags={metaRoute:'echo',meta_echo_refuse:true,v14Candidate:'v14_0_0',v14FinalRoute:'govern'}; S.dragon=0; S.progress=80; S.morale=65; window.testEnding=''; finalizeEvaluation()");
assert.strictEqual(run('window.testEnding'),'true_afterdragon','second-life refusal outranks event ending');
run("flags={v14Candidate:'v14_0_0',v14FinalRoute:'govern'}; S.progress=75; S.power=50; S.trust=45; S.morale=65; S.dragon=0; S.merit=20; S.career=35; window.testEnding=''; finalizeEvaluation()");
assert.strictEqual(run('window.testEnding'),'ge_system','whole-run organization ending outranks one-event echo');
run("flags={v14Candidate:'v14_0_0',v14FinalRoute:'power'}; window.testEnding=''; finalizeEvaluation()");
assert.notStrictEqual(run('window.testEnding'),'v14_0_0','mismatched final decision falls through');
console.log('64 endings and dragon route priority OK');

assert.strictEqual(run('typeof v145Audit'), 'function', 'v14.5 audit installed');
assert.strictEqual(run('v145Audit().formulaicEmotion'), false, 'low-sanity dialogue no longer uses canned prefixes');
assert.strictEqual(run('v145Audit().achievementCommentsMissing.length'), 0, 'all 108 achievements have commentary');
assert.strictEqual(run('new Set(ACHIEVEMENTS.map(a=>a.comment)).size'), 108, 'achievement commentary is unique');
assert.strictEqual(run("deriveCareer({e:{},npc:{kzong:1}}).why.includes('合规背书')"), true, 'K总 counts as compliance/professional backer');

run("chapterIdx=0; S.heart=20; S.sanity=80");
assert.ok(run('contextualChoiceList(V11_CHAPTERS[0].choices).length') >= 4, 'low heart adds contextual choice');
run("S.heart=70; S.sanity=30");
assert.ok(run('contextualChoiceList(V11_CHAPTERS[0].choices).length') >= 4, 'low sanity adds contextual choice');

run("flags={newGamePlus:false}; S.heart=30; chapterIdx=4; S.relationshipArc={origin:'open',current:'open',homeBond:0,source:'',seen:[]}; S.romance={bond:9,seen:[]}; window._romEv={ev:{id:'audit_rom',choices:[{t:'坐一会儿',e:{},npc:{},bond:3,r:'ok'}]},next:function(){}}");
assert.strictEqual(run('loveStage()'),'a','hidden love route is still available before random romance');
run('pickRomanceEncounter(0)');
assert.strictEqual(run('flags.love'),undefined,'random romance bond does not prematurely complete hidden love route');
assert.strictEqual(run('flags.romanceSecure'),true,'random romance can establish secure bond');
assert.strictEqual(run('loveStage()'),'a','random romance does not kill acts B/C');

run("LIFE_DRAFT.selected.school=[];LIFE_DRAFT.selected.college=[];LIFE_DRAFT.selected.graduate=[];LIFE_DRAFT.selected.early=[];LIFE_DRAFT.selected.middle=['mid_marriage'];LIFE_DRAFT.selected.senior=[];startGame();renderHUD()");
assert.strictEqual(run('S.relationshipArc.origin'),'partnered_family','married/family build enters existing-partner arc');
assert.strictEqual(run('!!flags.love'),false,'existing partner does not expose/complete hidden love route');
assert.strictEqual(run("document.getElementById('npcs').innerHTML.includes('有人等你')"),false,'hidden relationship is not exposed in HUD');

run("LIFE_DRAFT.selected.middle=['mid_marriage','mid_divorce'];startGame()");
assert.strictEqual(run("LIFE_DRAFT.selected.middle.join(',')"),'mid_divorce','old contradictory relationship selection migrates to latest state');
assert.strictEqual(run('S.relationshipArc.origin'),'divorced_rebuilt','relationship migration yields correct origin');

run("flags.love=true;S.relationshipArc={origin:'open',current:'new_partner',homeBond:0,source:'',seen:[]};S.romance={bond:12,seen:[]};showEnding('ge_firstline')");
assert.strictEqual(run("(document.getElementById('ending-story').textContent.match(/💗 尾声 · 有人记得你几点下班/g)||[]).length"),0,'legacy fixed love epilogue removed');
assert.strictEqual(run("(document.getElementById('ending-story').textContent.match(/【私人生活 · 没有写进组织架构图】/g)||[]).length"),1,'relationship-specific epilogue appears once');

console.log('v14.5 relationship/contextual-choice regressions OK');

// RC-06 is intentionally a separate release gate in release-placeholders.spec.js.
// Smoke remains green for functional regression while the release gate stays red until tuning is frozen.
