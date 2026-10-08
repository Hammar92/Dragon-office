'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright'),root=path.join(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+(req.url.split('?')[0]==='/'?'/index.html':decodeURIComponent(req.url.split('?')[0])));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(err,b)=>{res.writeHead(err?404:200,{'Content-Type':file.endsWith('.html')?'text/html':file.endsWith('.webp')?'image/webp':'application/octet-stream'});res.end(err?'missing':b);});});
(async()=>{
  let browser;
  try{
    await new Promise(r=>server.listen(8766,'127.0.0.1',r));browser=await pw.chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
    const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8766/');
    await page.evaluate(async()=>{openCreatorScreen();CharacterCreatorV2.identity('gender','female');CharacterCreatorV2.identity('age','g3');CharacterCreatorV2.select('f_g3_b');await CharacterCreatorV2.pending;await CharacterCreatorV2.confirm();selectedDifficulty='story';startGame();Math.random=()=>0.99;maybeEvent=(id,next)=>next();maybeRomanceEncounter=next=>next();maybePhoneEvent=next=>next();maybeLove=next=>next();});
    const stages=[],battles=[];
    for(let i=0;i<18;i++){
      assert.equal(await page.evaluate(()=>chapterIdx),i);assert.equal(await page.evaluate(()=>runChapters[chapterIdx].id),'v11_'+(i+1));stages.push(await page.evaluate(()=>runChapters[chapterIdx].stage));
      await page.evaluate(()=>{if(S.restLeft>0){showRest();takeNap(2);restClose();}});
      if(i===9){assert(await page.evaluate(()=>saveGameV2()));const state=await page.evaluate(()=>JSON.stringify(S.campaign)),ledger=await page.evaluate(()=>JSON.stringify(S.collection));assert(await page.evaluate(()=>loadGameV2()));assert.equal(await page.evaluate(()=>JSON.stringify(S.campaign)),state);assert.equal(await page.evaluate(()=>JSON.stringify(S.collection)),ledger);}
      await page.locator('button[onclick="pickChapter(0)"]').click();
      for(let count=0;count<30;count++){
        const snapshot=await page.evaluate(()=>({chapter:chapterIdx,battle:!!projectBattleState,ended:document.getElementById('ending-screen').classList.contains('active'),result:!!document.querySelector('button[onclick="continueResult()"]')}));
        if(snapshot.chapter!==i||snapshot.ended)break;
        if(snapshot.result)await page.locator('button[onclick="continueResult()"]').click();
        else if(await page.evaluate(()=>!!window._careerPending)){await page.locator('button[onclick="pickCareerChoice(0)"]').click();}
        else if(snapshot.battle){battles.push(i+1);await page.locator('button[onclick^="projectBattlePick(2,"]').click();}
        else break;
      }
      if(i<17)assert.equal(await page.evaluate(()=>chapterIdx),i+1,'real chapter transition '+(i+1));
    }
    assert.equal(await page.evaluate(()=>S.campaign.outcome),'submitted');assert.equal(await page.evaluate(()=>S.campaign.career),'recognized');assert.equal(await page.evaluate(()=>S.campaign.history.length),18);assert.equal(await page.evaluate(()=>S.campaign.months),63);
    assert.match(await page.locator('#ending-screen').innerText(),/正式递交 NDA/);assert.match(await page.locator('#ending-screen').innerText(),/尚未获批/);assert.deepEqual(errors,[]);
    assert(await page.evaluate(()=>getUnlocked().includes('ge_project')),'product record is not discarded by career outcome');assert(await page.locator('#collection-results').isVisible());
    await page.screenshot({path:path.join(__dirname,'campaign-ending.png'),fullPage:true});
    console.log(JSON.stringify({result:'PASS',actualChapterTransitions:18,stages,qteChapters:[...new Set(battles)],saveReloadAt:'EOP2 / 三期立项',ending:'submitted / recognized',errors},null,2));
  }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
