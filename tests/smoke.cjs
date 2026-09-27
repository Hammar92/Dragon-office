const fs=require('fs'),vm=require('vm'),assert=require('assert');
const gamePath=require('path').join(__dirname,'..','index.html');
const html=fs.readFileSync(gamePath,'utf8');
const code=html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i)[1];
new vm.Script(code,{filename:'index.html'});
const nodes=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{id,innerHTML:'',textContent:'',value:'',style:{},classList:{add(){},remove(){}},querySelector(){return null},insertAdjacentHTML(){},addEventListener(){},appendChild(){},remove(){},scrollIntoView(){}});return nodes.get(id)}
const document={head:{appendChild(){}},getElementById:el,querySelector(){return null},querySelectorAll(){return []},createElement(){return el('created')}};
const storage=new Map();const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))};
const context={document,localStorage,sessionStorage:localStorage,console,setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},Math:Object.assign(Object.create(Math),{random:()=>0.1})};context.window=context;context.scrollTo=()=>{};context.window.scrollTo=()=>{};context.window.innerWidth=900;context.document.body={scrollHeight:1000};
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

// Verify that chapter completion reaches the QTE entry, not only direct invocations.
run("chapterIdx=3; flags.battle_v11_4=false; maybeEvent=function(id,next){next()}; S.trust=60; S.stamina=80; S.heart=80; pickChapter(0); continueResult()");
assert.strictEqual(run('projectBattleState.chId'),'v11_4','chapter choice reaches meeting QTE');
console.log('Chapter integration OK');

assert.strictEqual(run('V11_CHAPTERS.length'),18,'all chapters reachable');
assert.strictEqual(run('V11_EVENTS.length'),25,'all random events loaded');
assert.strictEqual(run('ACHIEVEMENTS.length'),99,'achievement cap');
assert.strictEqual(run('new Set(ACHIEVEMENTS.map(a=>a.id)).size'),99,'unique achievement IDs');
assert.strictEqual(run('V11_EVENTS.every((ev,i)=>ev.choices.some(c=>c.achievement) && RANDOM_ACHIEVEMENT_IDS[i].length>0)'),true,'every random event has an achievement');
assert.strictEqual(run('V11_EVENTS.slice(15).every(ev=>ev.choices.every(c=>c.achievement))'),true,'new random events award on every choice');
assert.strictEqual(run('new Set(V11_EVENTS.map((ev,i)=>ACHIEVEMENTS.find(a=>a.id===RANDOM_ACHIEVEMENT_IDS[i][0]).name)).size'),25,'individual black humor event names');
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

// Existing v12 saves map old random IDs to their surviving outcomes and archive retired ones.
const legacyStorage=new Map([['dragon_achievements','["a55","a70","a72","a99"]'],['dragon_ng_points','7']]);
const migrated=Object.assign({},context,{localStorage:{getItem:k=>legacyStorage.get(k)||null,setItem:(k,v)=>legacyStorage.set(k,String(v))}});
migrated.window=migrated;
vm.createContext(migrated);vm.runInContext(code,migrated,{timeout:5000});
assert.deepStrictEqual(JSON.parse(legacyStorage.get('dragon_achievements')),['a55','a70'],'old unlocked outcomes mapped');
assert.deepStrictEqual(JSON.parse(legacyStorage.get('dragon_legacy_achievements')),['PVP本人请发言','机制抢麦'],'retired outcomes archived');
assert.strictEqual(legacyStorage.get('dragon_ng_points'),'7','earned points preserved');
console.log('Story, random achievements, migration, and QTE guards OK');
