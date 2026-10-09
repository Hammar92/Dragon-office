'use strict';
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..'),target=path.join(root,'index.html');
let html=fs.readFileSync(target,'utf8');
for(const [key,file,tag] of [['OFFICE_UI_STYLE','office-workspace.css','style'],['ENDING_REVIEW_STYLE','ending-review.css','style'],['OFFICE_UI_RUNTIME','office-workspace.js','script']]){
 const begin=tag==='style'?'/* '+key+' START */':'/* '+key+' START */',end='/* '+key+' END */',content=begin+'\n'+fs.readFileSync(path.join(root,'ui',file),'utf8')+'\n'+end;
 if(html.includes(begin))html=html.slice(0,html.indexOf(begin))+content+html.slice(html.indexOf(end)+end.length);
 else if(tag==='style')html=html.replace('</head>','<style>\n'+content+'\n</style>\n</head>');
 else html=html.replace('/* PROJECT CAMPAIGN V1 END */','/* PROJECT CAMPAIGN V1 END */\n\n'+content);
}
fs.writeFileSync(target,html);console.log('Office workspace embedded: v18.1.0');
