const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),target=path.join(root,'index.html');
let html=fs.readFileSync(target,'utf8');
for(const [marker,file] of [['RC_CANONICAL_ENDING_RESOLVER','ending-resolver.js'],['RC_ENDING_RUNTIME_BRIDGE','ending-runtime-bridge.js']]){
 const a='/* '+marker+'_BEGIN',b='/* '+marker+'_END */';
 if(html.includes(a)&&html.includes(b))html=html.slice(0,html.indexOf(a))+a+' */\n'+fs.readFileSync(path.join(root,file),'utf8')+'\n'+b+html.slice(html.indexOf(b)+b.length);
}
const begin='/* PROJECT CAMPAIGN V1 START */',end='/* PROJECT CAMPAIGN V1 END */';
const content=begin+'\n'+['responsibilities.js','campaign-v2-data.js','dialogue-scenes.js','side-dialogues.js','project-campaign-v2.js','collection-v3.js','ending-review.js','dialogue-runtime.js'].map(f=>fs.readFileSync(path.join(root,'story',f),'utf8')).join('\n')+'\n'+end;
if(html.includes(begin))html=html.slice(0,html.indexOf(begin))+content+html.slice(html.indexOf(end)+end.length);
else html=html.replace('\nbuildCast();\n', '\n'+content+'\n\nbuildCast();\n').replace('\r\nbuildCast();\r\n','\r\n'+content+'\r\n\r\nbuildCast();\r\n');
if(!html.includes(begin))throw Error('Campaign insertion marker missing');
html=html.replaceAll("return usedEvents.indexOf(e.id)<0;","return usedEvents.indexOf(e.id)<0&&(!window.ProjectCampaignV1||ProjectCampaignV1.eventAllowed(e,chapterIdx));");
if(!html.includes('x.campaignChoice=Object.assign'))html=html.replace('      chosen.push(x);','      if(base.campaignChoice)x.campaignChoice=Object.assign({},base.campaignChoice,{context:true});\n      chosen.push(x);');
if(!html.includes('legacy campaign chapter'))html=html.replace('      const branch=window.V12_BRANCH_VARIANTS',"      // Preserve the position and player of a legacy campaign chapter; do not invent past evidence.\n      if(window.ProjectCampaignV1&&/^v12_\\d+_/.test(id)&&i<18)return ProjectCampaignV1.chapter(i,ProjectCampaignV1.fresh(true));\n      const branch=window.V12_BRANCH_VARIANTS");
html=html.replace(/^    if\(c&&c\.campaignChoice&&c\.project&&c\.project\.set&&c\.project\.set\.piLedger\)return null;[^\n]*\r?\n/gm,'');
html=html.replace('  function piConflictFromChoice(c){','  function piConflictFromChoice(c){\n    if(c&&c.campaignChoice&&c.project&&c.project.set&&c.project.set.piLedger)return null; // A jointly agreed contribution ledger resolves the rivalry.');
html=html.replace('return c.seen.indexOf(e.id)<0;','return c.seen.indexOf(e.id)<0&&(!window.ProjectCampaignV1||ProjectCampaignV1.eventAllowed(e,chapterIdx));').replace('pool=DELIVERY_EVENTS_147.slice();','pool=DELIVERY_EVENTS_147.filter(e=>!window.ProjectCampaignV1||ProjectCampaignV1.eventAllowed(e,chapterIdx));');
html=html.replace(/Demo v(?:16\.0\.1|17\.0\.0|17\.1\.0|17\.2\.0|18\.0\.0|18\.0\.1|18\.1\.0|18\.2\.0)/g,'Demo v18.2.1');
fs.writeFileSync(target,html);
if(fs.existsSync(path.join(root,'ui','office-workspace.js')))require('./sync-office-ui.cjs');
console.log('Canonical V2 campaign embedded: 18 chapters, contextual authority and evidence.');
