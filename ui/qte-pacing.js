/* Reading and progressive option reveal do not consume the answer window. */
(function(root){
 'use strict';let pending=[],generation=0,active=null;
 const policy={readingMs:15000,revealMs:5000,minAnswerSeconds:10};
 function clear(){generation++;pending.forEach(clearTimeout);pending=[];active=null;}
 function pace(kind,state,limit,onTimeout){
  const selector=kind==='project'?'button[onclick^="projectBattlePick("]':'button[onclick^="meetingPick("]';
  const buttons=Array.from(document.querySelectorAll('#scene-area '+selector));if(!buttons.length)return;
  clear();const token=generation;active={kind,state};state.uiPhase='reading';state.deadline=null;
  buttons.forEach(b=>{b.hidden=true;b.disabled=true;b.setAttribute('aria-hidden','true');});
  const title=document.querySelector('#scene-area .scene-sub'),answerSeconds=Math.max(policy.minAnswerSeconds,limit),readyAfter=policy.readingMs+(buttons.length-1)*policy.revealMs;
  function later(fn,ms){pending.push(setTimeout(()=>{if(token===generation&&active&&active.state===state)fn();},ms));}
  function status(text){if(title){title.textContent=text;title.setAttribute('role','status');}}
  status('阅读题干：15秒。之后每5秒出现一个选项；选项全部出现后开始作答倒计时。');
  buttons.forEach((b,i)=>later(()=>{state.uiPhase='revealing';b.hidden=false;b.removeAttribute('aria-hidden');status('正在展示选项：'+(i+1)+' / '+buttons.length+'。作答计时尚未开始。');},policy.readingMs+i*policy.revealMs));
  later(()=>{state.uiPhase='answering';state.deadline=Date.now()+answerSeconds*1000;buttons.forEach(b=>{b.disabled=false;});status('请作答：'+answerSeconds+'秒。题干与选项展示未占用这段时间。');
   function tick(){if(state.uiPhase!=='answering')return;const left=Math.max(0,Math.ceil((state.deadline-Date.now())/1000));status('请作答：剩余'+left+'秒。');if(left>0)later(tick,1000);}
   later(tick,1000);later(onTimeout,answerSeconds*1000);
  },readyAfter);
 }
 const projectRender=renderProjectBattle;renderProjectBattle=function(){clear();const r=projectRender.apply(this,arguments),s=projectBattleState;if(s){if(projectBattleTimer){clearTimeout(projectBattleTimer);projectBattleTimer=null;}pace('project',s,battleTimeLimit(),()=>projectBattlePick(-1,s.round,s.token));}return r;};
 const meetingRender=renderMeetingControl;renderMeetingControl=function(){clear();const r=meetingRender.apply(this,arguments),s=meetingState;if(s){if(meetingTimer){clearTimeout(meetingTimer);meetingTimer=null;}pace('meeting',s,meetingTimeLimit(),()=>meetingPick(-1));}return r;};
 const projectPick=projectBattlePick;projectBattlePick=function(i,round,token){const s=projectBattleState;if(!s||(token!=null&&token!==s.token)||(round!=null&&round!==s.round)||s.awaitingResult)return;if(s.uiPhase&&s.uiPhase!=='answering')return;clear();return projectPick.apply(this,arguments);};
 const meetingPickPrior=meetingPick;meetingPick=function(i){const s=meetingState;if(!s||s.uiPhase&&s.uiPhase!=='answering')return;s.uiPhase='result';clear();return meetingPickPrior.apply(this,arguments);};
 const projectFinish=finishProjectBattle;finishProjectBattle=function(){clear();return projectFinish.apply(this,arguments);};
 const meetingFinish=finishMeetingControl;finishMeetingControl=function(){clear();return meetingFinish.apply(this,arguments);};
 if(root.loadGameV2){const load=root.loadGameV2;root.loadGameV2=function(){clear();return load.apply(this,arguments);};}
 if(root.startGame){const start=root.startGame;root.startGame=function(){clear();return start.apply(this,arguments);};}
 root.QTEPacing={policy,clear,get phase(){return active&&active.state.uiPhase;}};
})(typeof window!=='undefined'?window:globalThis);
