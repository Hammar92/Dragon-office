(function(root){
 'use strict';
 const D=root.StoryDialogue,E=root.SideDialogue.events;
 const pools=[V11_EVENTS,DELIVERY_EVENTS_147,PI_CHAIN_EVENTS,ROMANCE_ENCOUNTERS,PHONE_EVENTS,root.DragonHomeEvents||[]];
 function prepare(ev){
  if(!ev||!E[ev.id]||ev._spokenScene)return ev;
  const s=E[ev.id];ev._spokenScene=true;ev.originalText=ev.text;
  const opening=String(ev.text||'').split('\n\n')[0];
  // Retain the concrete setup; actor intent is expressed in the following exchange.
  ev.text=opening+'\n\n'+s.turns.map(([n,t])=>n+'：「'+t+'」').join('\n\n');
  (ev.choices||[]).forEach((c,i)=>{if(s.replies[i])c.t='「'+s.replies[i]+'」';});return ev;
 }
 pools.forEach(a=>a.forEach(prepare));
 Object.keys(LOVE_META).forEach(k=>prepare(Object.assign(LOVE_META[k],{id:'love_'+k})));
 const oldLoveOptions=loveOptions;loveOptions=function(st){const list=oldLoveOptions(st),s=E['love_'+st];list.forEach((c,i)=>{if(s&&s.replies[i])c.t='「'+s.replies[i]+'」';});return list;};
 Object.keys(LOVE_META).forEach(k=>{LOVE_META[k].scene=LOVE_META[k].text;});
 const eventRender=renderEventFromObj;renderEventFromObj=function(){if(root._evObj)prepare(root._evObj.ev);const r=eventRender.apply(this,arguments);decorate();return r;};root.renderEventFromObj=renderEventFromObj;
 const replies=choiceHTML;choiceHTML=function(list){
  pools.forEach(a=>a.forEach(ev=>{if(ev.choices===list)prepare(ev);}));
  return replies.apply(this,arguments);
 };
 const render=renderChapter;renderChapter=function(){const r=render.apply(this,arguments);decorate();return r;};root.renderChapter=renderChapter;
 function role(n){const npc=Object.values(NPCs).find(x=>x.name===n);return npc?npc.role:n==='钟时'?'Clinical Development VP':n==='你'?'玩家 · 当前发言':n==='对方'?'工作之外的关系':'私人联系';}
 function html(text){return '<div class="sd-dialogue" aria-label="现场对话">'+String(text||'').split(/\n\n+/).filter(Boolean).map(p=>{
  const m=p.match(/^([^：「\n]{1,12})：「([\s\S]+)」$/);
  if(!m){if(p.startsWith('验收进度 '))return '<details class="sd-summary"><summary>查看本阶段项目记录</summary><p>'+esc(p)+'</p></details>';return '<p class="sd-action">'+esc(p)+'</p>';}
  const n=m[1],url=n==='你'?null:PortraitResolver.url(n);
  return '<article class="sd-turn '+(n==='你'?'sd-player':'')+'" data-speaker="'+esc(n)+'">'+(url?'<img src="'+esc(url)+'" alt="'+esc(n)+'" loading="lazy">':'<span class="sd-initial" aria-hidden="true">'+esc(n.slice(0,1))+'</span>')+'<div><header><b>'+esc(n)+'</b><small>'+esc(role(n))+'</small></header><p>'+esc(m[2])+'</p></div></article>';
 }).join('')+'</div>';}
 function decorate(){
  if(!document.documentElement||!document.createElement)return;
  const area=document.getElementById('scene-area'),scene=area&&area.querySelector('.scene');if(!scene||scene.querySelector('.sd-dialogue'))return;
  let ev=root._evObj&&root._evObj.ev||root._romEv&&root._romEv.ev||root._homeEv&&root._homeEv.ev;
  if(!ev&&S&&S.coverage&&S.coverage.current)ev=DELIVERY_EVENTS_147.find(x=>x.id===S.coverage.current.eventId);
  if(root._lovePending)ev=LOVE_META[root._loveStage]||ev;
  const chapterButton=scene.querySelector('button[onclick^="pickChapter("]');
  if(chapterButton)ev=runChapters[chapterIdx];
  if(!ev||(!ev.campaign&&!E[ev.id]))return;prepare(ev);
  const target=scene.querySelector('.dialogue-stage')||scene.querySelector('.vp-line')||scene.querySelector('.aside');if(!target)return;
  target.outerHTML=html(ev.text);scene.classList.add('sd-scene');
  const label=scene.querySelector('.vp-name');if(label)label.textContent=ev.location||'现场对话';
  const choices=scene.querySelector('.choices');if(choices&&!scene.querySelector('.sd-reply-heading')){const h=document.createElement('div');h.className='sd-reply-heading';h.textContent='你怎么回应？';choices.before(h);}
  root._sceneHTML=area.innerHTML;
 }
 D.prepare=prepare;D.html=html;D.decorate=decorate;D.events=E;
 if(document.documentElement&&root.MutationObserver){new MutationObserver(decorate).observe(document.getElementById('scene-area'),{childList:true,subtree:true});}
})(typeof window!=='undefined'?window:globalThis);
