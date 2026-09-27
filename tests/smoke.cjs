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
