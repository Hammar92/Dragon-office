/* Historical resolver compatibility fixtures. Current collection reachability is gated by collection-paths.cjs. */
'use strict';
const final=require('./ending-witness.spec.js');
const terminal=require('./terminal-ending-witness.spec.js');
function run(){
  const f=Object.keys(final.W),t=Object.keys(terminal.W),all=f.concat(t),dupes=all.filter((x,i)=>all.indexOf(x)!==i);
  const failures=[];
  const fr=final.run(),tr=terminal.run();
  if(!fr.pass)failures.push({layer:'FINAL_RESOLVER',details:fr.failures});
  if(!tr.pass)failures.push({layer:'TERMINAL',details:tr.failures});
  if(dupes.length)failures.push({layer:'CATALOGUE',duplicatePrimaryWitnesses:[...new Set(dupes)]});
  if(all.length!==64)failures.push({layer:'CATALOGUE',expected:64,actual:all.length});
  return{pass:!failures.length,total:all.length,final:f.length,terminal:t.length,failures};
}
if(require.main===module){const r=run();if(!r.pass){console.error(JSON.stringify(r,null,2));process.exitCode=1;}else console.log(`PASS legacy resolver fixtures: ${r.total}/64 (${r.final} final + ${r.terminal} terminal); not a current reachability proof`);}
module.exports={run};
