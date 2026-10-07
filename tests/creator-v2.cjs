'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert'),vm=require('vm');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
new vm.Script(html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i)[1]);
for(const old of ['avatarSVG1478','spriteStyle152','renderPortraitCreator1479','renderPortraitCreator150','renderPortraitCreator151','npc_portraits_sheet','player_portraits_30','player_preset_sheet'])assert(!html.includes(old),old+' removed');
const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const mime={'.html':'text/html','.webp':'image/webp','.png':'image/png','.js':'application/javascript','.css':'text/css','.json':'application/json'};
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':mime[path.extname(file)]||'text/plain'});res.end(e?'missing':b);});});
(async()=>{
 await new Promise(r=>server.listen(8765,'127.0.0.1',r));
 const browser=await pw.chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/');
 const data=await page.evaluate(()=>PortraitResolver.data);assert.equal(data.npc.length,27);assert.equal(data.player.length,30);assert.equal(new Set(data.npc.map(n=>n.portrait)).size,27);assert.equal(new Set(data.player.map(n=>n.portrait)).size,30);
 for(const p of [...data.npc,...data.player]){assert(fs.existsSync(path.join(root,p.portrait)),p.portrait);}
 assert.equal(data.npc.find(n=>n.name==='肖恩').gender,'male');assert.equal(data.npc.find(n=>n.name==='肖恩').body,'微胖');assert.equal(data.npc.find(n=>n.name==='则韩').body,'强壮');assert.equal(data.npc.find(n=>n.name==='杨杨').gender,'female');
 await page.evaluate(()=>Promise.all(PortraitResolver.data.npc.map(p=>new Promise((r,j)=>{const i=new Image();i.onload=()=>i.naturalWidth>0?r():j(p.portrait);i.onerror=j;i.src=p.portrait;}))));
 await page.evaluate(()=>openCreatorScreen());assert.equal(await page.locator('.cc-preview-photo').count(),0);
 await page.locator('[data-gender="female"]').click();await page.locator('[data-age="g3"]').click();await page.locator('[data-step="2"]').click();assert.equal(await page.locator('[data-preset]').count(),3);assert.equal(await page.locator('.cc-preview-photo').count(),0);
 for(const g of ['female','male'])for(const a of ['g1','g2','g3','g4','g5']){
  await page.evaluate(([g,a])=>{CharacterCreatorV2.identity('gender',g);CharacterCreatorV2.identity('age',a);},[g,a]);
  const pool=await page.evaluate(()=>CharacterCreatorV2.pool());assert.equal(pool.length,3);
  for(const p of pool){await page.evaluate(async id=>{CharacterCreatorV2.select(id);await CharacterCreatorV2.pending;},p.id);assert.equal(await page.evaluate(()=>CharacterCreatorV2.error),'');assert.equal(await page.evaluate(()=>CharacterCreatorV2.previewURL),p.portrait);}
 }
 await page.screenshot({path:path.join(__dirname,'creator-before.png'),fullPage:true});
 const groups=await page.evaluate(()=>Object.keys(CharacterCreatorV2.draft).filter(k=>['body','hair','face','makeup','hairColor','outfit','accessory','expression','pose'].includes(k)));
 let count=0;for(const group of groups){const options=await page.locator('[data-group="'+group+'"]').count();assert(options>=6);for(let i=0;i<options;i++){const before=await page.evaluate(()=>CharacterCreatorV2.previewURL);await page.evaluate(async([g,i])=>{CharacterCreatorV2.detail(g,i);await CharacterCreatorV2.pending;},[group,i]);assert.equal(await page.evaluate(()=>CharacterCreatorV2.error),'');assert.equal(await page.evaluate(g=>CharacterCreatorV2.draft[g],group),i);assert(await page.evaluate(()=>CharacterCreatorV2.previewURL));if(i>0)assert.notEqual(await page.evaluate(()=>CharacterCreatorV2.previewURL),before,group+" changes pixels");count++;}}
 await page.evaluate(async()=>{CharacterCreatorV2.detail('hair',1);CharacterCreatorV2.detail('outfit',1);CharacterCreatorV2.detail('accessory',1);CharacterCreatorV2.detail('pose',3);await CharacterCreatorV2.pending;});
 await page.evaluate(async()=>{CharacterCreatorV2.identity('gender','female');CharacterCreatorV2.identity('age','g3');CharacterCreatorV2.select('f_g3_a');CharacterCreatorV2.detail('hair',4);CharacterCreatorV2.detail('outfit',4);await CharacterCreatorV2.pending;});await page.screenshot({path:path.join(__dirname,'creator-female.png'),fullPage:true});await page.evaluate(async()=>{CharacterCreatorV2.identity('gender','male');CharacterCreatorV2.identity('age','g5');CharacterCreatorV2.select('m_g5_c');CharacterCreatorV2.detail('hair',1);CharacterCreatorV2.detail('outfit',1);CharacterCreatorV2.detail('accessory',1);CharacterCreatorV2.detail('pose',3);await CharacterCreatorV2.pending;});
 await page.screenshot({path:path.join(__dirname,'creator-custom.png'),fullPage:true});
 assert.equal(await page.evaluate(()=>S),null);await page.evaluate(()=>CharacterCreatorV2.confirm());assert.equal(await page.evaluate(()=>!!CharacterCreatorV2.confirmed),true);
 for(const n of [3,4,5,3,5]){await page.evaluate(n=>CharacterCreatorV2.go(n),n);if(n===3)assert.equal(await page.locator('#cc-ng-slot #ng-panel').count(),1);if(n===5)assert.equal(await page.locator('#cc-difficulty-slot .difficulty-wrap').count(),1);}
 await page.locator('#creator-v2-root button[onclick="startGame()"]').click();assert.equal(await page.evaluate(()=>S.player.gender),'male');assert.equal(await page.evaluate(()=>S.player.age),'g5');
 const appearance=await page.evaluate(()=>JSON.stringify(S.player.appearance));await page.evaluate(()=>{CharacterCreatorV2.detail('outfit',3);});assert.equal(await page.evaluate(()=>JSON.stringify(S.player.appearance)),appearance);
 assert.equal(await page.evaluate(()=>saveGameV2()),true);const saved=await page.evaluate(()=>JSON.stringify(S));await page.reload();assert.equal(await page.evaluate(()=>loadGameV2()),true);assert.equal(await page.evaluate(()=>JSON.stringify(S)),saved);
 assert.equal(await page.locator('.pm-player-photo').count(),1);await page.evaluate(()=>renderVP());assert.equal(await page.locator('#vp-card .vp-portrait-final').getAttribute('src'),data.npc.find(n=>n.name==='钟时').portrait);
 await page.evaluate(()=>{document.getElementById('scene-area').innerHTML=dialogueHTML('肖恩：「先看记录。」\n\n杨杨：「明天完成。」','肖恩');});assert.equal(await page.locator('.dialogue-portrait-img').count(),2);
 await page.screenshot({path:path.join(__dirname,'game.png'),fullPage:true});
 for(const width of [390,768]){await page.setViewportSize({width,height:844});await page.evaluate(()=>{openCreatorScreen();CharacterCreatorV2.go(2);});await page.screenshot({path:path.join(__dirname,'mobile-'+width+'.png'),fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow at '+width);}
 assert.deepEqual(errors,[]);console.log(JSON.stringify({result:'PASS',templates:30,npc:27,detailChoices:count,desktop:1440,mobile:[390,768],syntax:true,saveLoad:true,errors},null,2));
 await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1);});
