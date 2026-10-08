'use strict';
const fs=require('fs'),path=require('path'),Module=require('module');
module.exports=function createGame(initial={}){
 let source=fs.readFileSync(path.join(__dirname,'balance-sim.cjs'),'utf8');
 source=source.slice(0,source.indexOf('const N='))+'\nmodule.exports={run,context};';
 source=source.replace('vm.createContext(context);','for(const [k,v] of Object.entries('+JSON.stringify(initial)+'))localStorage.setItem(k,v);vm.createContext(context);');
 const m=new Module(path.join(__dirname,'__fixture_virtual.cjs'),module);m.filename=path.join(__dirname,'__fixture_virtual.cjs');m.paths=Module._nodeModulePaths(__dirname);m._compile(source,m.filename);
 const {run,context}=m.exports;
 return {run,context,json:s=>JSON.parse(JSON.stringify(run(s)))};
};
if(require.main===module){const g=module.exports();console.log(g.json('Object.entries(ENDINGS).map(([id,e])=>[id,e.name])'));}
