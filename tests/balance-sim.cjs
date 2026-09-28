/* Dragon Office RC balance simulator.
 * Headless production-loop agent. It drives the real index.html state machine instead of
 * fabricating final states. Use:
 *   node tests/balance-sim.cjs
 *   SIM_N=2000 SIM_SEED=20260928 node tests/balance-sim.cjs
 *   SIM_DIFFICULTY=hard SIM_N=1000 node tests/balance-sim.cjs
 *
 * This is a structural balance tool, not a model of human play. Profiles are intentionally
 * simple policies used to detect route collapse, unreachable outcomes and ending monopolies.
 */
'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path');

const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const m=html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
if(!m)throw new Error('index.html inline game script not found');
const code=m[1];
new vm.Script(code,{filename:'index.html'});

function makeEl(id){
  const n={id,innerHTML:'',textContent:'',value:'',style:{},dataset:{},children:[],parentNode:null,
    classList:{add(){},remove(){},contains(){return false},toggle(){}},
    querySelector(){return null},querySelectorAll(){return []},insertAdjacentHTML(){},addEventListener(){},
    remove(){},scrollIntoView(){},setAttribute(){},getAttribute(){return null},
    appendChild(c){if(c){c.parentNode=this;this.children.push(c)}return c},
    insertBefore(c,ref){if(!c)return c;c.parentNode=this;const i=this.children.indexOf(ref);if(i<0)this.children.push(c);else this.children.splice(i,0,c);return c}
  };
  Object.defineProperty(n,'nextSibling',{get(){if(!this.parentNode)return null;const a=this.parentNode.children,i=a.indexOf(this);return i>=0?(a[i+1]||null):null}});
  return n;
}
const nodes=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,makeEl(id));return nodes.get(id)}
const app=el('app'),game=el('game-screen'),hud=el('hud'),scene=el('scene-area');
app.appendChild(game);game.appendChild(hud);game.appendChild(scene);
const document={
  head:makeEl('head'),body:makeEl('body'),getElementById:el,
  querySelector(){return null},querySelectorAll(){return []},createElement(){return makeEl('created')}
};
document.body.scrollHeight=1000;
const storage=new Map();
const localStorage={
  getItem:k=>storage.has(k)?storage.get(k):null,
  setItem:(k,v)=>storage.set(k,String(v)),
  removeItem:k=>storage.delete(k),
  clear:()=>storage.clear()
};
const context={
  document,localStorage,sessionStorage:localStorage,console,
  setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},
  Math:Object.create(Math)
};
context.window=context;context.scrollTo=()=>{};context.window.innerWidth=900;
vm.createContext(context);vm.runInContext(code,context,{timeout:10000});
function run(s){return vm.runInContext(s,context,{timeout:20000})}

const N=Math.max(10,parseInt(process.env.SIM_N||'1000',10)||1000);
const SEED=(parseInt(process.env.SIM_SEED||'20260928',10)||20260928)>>>0;
const DIFFICULTY=['story','normal','hard'].includes(process.env.SIM_DIFFICULTY)?process.env.SIM_DIFFICULTY:'normal';

const result=run(`
(function(){
  toast=function(){};renderAchievementsV144=function(){};
  var seed=${SEED};
  function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
  Math.random=rnd;

  function mainTarget(profile){
    if(profile==='slayer')return chapterIdx<17?'govern':'power';
    if(profile==='dragon')return chapterIdx<11?'govern':'power';
    if(profile==='love_appease')return 'appease';
    return profile;
  }
  function chooseIndex(list,profile,kind){
    if(!list||!list.length)return 0;
    if(kind==='private'||kind==='love'){
      if(profile==='love_appease'||profile==='govern'||profile==='slayer'||profile==='dragon')return 0;
      return Math.floor(rnd()*list.length);
    }
    var target=mainTarget(profile);
    if(target==='random')return Math.floor(rnd()*list.length);
    var ids=[];
    list.forEach(function(c,i){if(c&&c.route===target)ids.push(i)});
    if(ids.length&&rnd()<.72)return ids[Math.floor(rnd()*ids.length)];
    if(!ids.length){
      var pref=target==='govern'?0:target==='appease'?1:2;
      if(pref<list.length&&rnd()<.72)return pref;
    }
    return Math.floor(rnd()*list.length);
  }
  function battleIndex(st,profile){
    if(!st||!st.opts)return 0;
    var target=mainTarget(profile);
    var wants=target==='govern'?['evidence','process','ally']:
      target==='appease'?['appease','ally','process']:
      target==='power'?['power','evidence','process']:null;
    if(!wants)return Math.floor(rnd()*st.opts.length);
    for(var j=0;j<wants.length;j++){
      var i=st.opts.findIndex(function(o){return o.kind===wants[j]});
      if(i>=0&&rnd()<.8)return i;
    }
    return Math.floor(rnd()*st.opts.length);
  }
  function selfCare(){
    var n=0;
    if(S&&S.restLeft>0&&(S.heart<48||S.stamina<22)){
      window._inRest=true;takeNap(2);
      if(window._next)continueResult();
      window._inRest=false;window._next=null;n++;
    }
    if(S&&S.sanity<32&&S.sanityCareLeft>0){
      S.sanity=clamp(S.sanity+14);S.heart=clamp(S.heart+3);S.sanityCareLeft--;n++;
    }
    return n;
  }
  function drain(profile){
    var guard=0;
    while(guard++<140){
      if(window.__simEnding)return;
      if(window._next){continueResult();continue}
      if(duelState){
        var pick=profile==='govern'||profile==='slayer'||profile==='dragon'
          ?DUEL_ROUNDS[duelState.round].correct:Math.floor(rnd()*3);
        duelPick(pick);continue;
      }
      if(projectBattleState&&!projectBattleState.awaitingResult){
        projectBattlePick(battleIndex(projectBattleState,profile),projectBattleState.round);continue;
      }
      if(window._evObj){
        var ev=window._evObj.ev;
        pickEvent(chooseIndex(contextualChoiceList(ev.choices||[]),profile,'event'));continue;
      }
      if(window._romEv){
        var rev=window._romEv.ev;
        pickRomanceEncounter(chooseIndex(contextualChoiceList(rev.choices||[]),profile,'private'));continue;
      }
      if(window._homeEv){
        var hev=window._homeEv.ev;
        window.pickHomeEvent(chooseIndex(contextualChoiceList(hev.choices||[]),profile,'private'));continue;
      }
      if(window._lovePending){
        lovePick(chooseIndex(loveOptions(window._loveStage),profile,'love'));continue;
      }
      break;
    }
    if(guard>=140)throw new Error('balance-sim drain guard exceeded');
  }
  function one(profile){
    localStorage.setItem('dragon_runs','0');
    window.__simEnding=null;window._next=null;window._evObj=null;window._romEv=null;window._homeEv=null;
    window._lovePending=false;projectBattleState=null;duelState=null;
    selectedDifficulty='${DIFFICULTY}';
    startGame();
    showEnding=function(k){window.__simEnding=k;return k};
    var rests=0,steps=0;
    while(!window.__simEnding&&chapterIdx<18&&steps++<30){
      rests+=selfCare();
      var ch=runChapters[chapterIdx],shown=contextualChoiceList(ch.choices||[]);
      pickChapter(chooseIndex(shown,profile,'main'));
      drain(profile);
    }
    if(!window.__simEnding&&chapterIdx>=17){evaluateFinal();drain(profile)}
    return {
      id:window.__simEnding||'NO_END',rests:rests,love:!!flags.love,
      pi1:!!flags.piChainEvent1,pi2:!!flags.piChainEvent2,
      progress:S.progress,heart:S.heart,trust:S.trust,power:S.power,dragon:S.dragon,career:S.career,
      support60:supportCount(60)
    };
  }

  var profiles=['random','govern','appease','power','slayer','dragon','love_appease'],out={};
  profiles.forEach(function(profile){
    var counts={},rests=0,love=0,pi1=0,pi2=0,sum={progress:0,heart:0,trust:0,power:0,dragon:0,career:0,support60:0};
    for(var i=0;i<${N};i++){
      var r=one(profile);
      counts[r.id]=(counts[r.id]||0)+1;rests+=r.rests;love+=r.love?1:0;pi1+=r.pi1?1:0;pi2+=r.pi2?1:0;
      Object.keys(sum).forEach(function(k){sum[k]+=Number(r[k])||0});
    }
    Object.keys(sum).forEach(function(k){sum[k]/=${N}});
    out[profile]={N:${N},counts:counts,avgRests:rests/${N},loveRate:love/${N},pi1Rate:pi1/${N},pi2Rate:pi2/${N},avg:sum};
  });
  return {seed:${SEED},N:${N},difficulty:'${DIFFICULTY}',profiles:out};
})()
`);

console.log(JSON.stringify(result,null,2));

const balanceBlockers=[];
for(const [name,p] of Object.entries(result.profiles)){
  if(p.counts.NO_END)balanceBlockers.push(`${name}: NO_END=${p.counts.NO_END}`);
}
if(DIFFICULTY==='normal'){
  const rate=(profile,id)=>(result.profiles[profile].counts[id]||0)/N;
  const maxRandom=Math.max(...Object.values(result.profiles.random.counts))/N;
  if(rate('slayer','ge_slayer')<0.08)balanceBlockers.push(`slayer route too rare: ${rate('slayer','ge_slayer').toFixed(3)}`);
  if(rate('dragon','true_dragon')<0.30)balanceBlockers.push(`dragon route too rare: ${rate('dragon','true_dragon').toFixed(3)}`);
  if(rate('love_appease','be_heart')>0.05)balanceBlockers.push(`love_appease heart death too high: ${rate('love_appease','be_heart').toFixed(3)}`);
  if(maxRandom>=0.45)balanceBlockers.push(`random route monopoly: ${maxRandom.toFixed(3)}`);
}
if(balanceBlockers.length){
  console.error('BALANCE GATE FAIL\n'+balanceBlockers.map(x=>' - '+x).join('\n'));
  process.exitCode=2;
}else{
  console.log(`PASS balance gate · ${DIFFICULTY} · seed ${SEED} · N=${N}`);
}
