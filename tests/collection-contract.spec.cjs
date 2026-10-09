'use strict';
const assert=require('node:assert/strict'),createGame=require('./runtime-fixture.cjs');
(async()=>{
const g=createGame();g.run('startGame()');
assert.equal(g.run('Object.keys(ENDINGS).length'),64);assert.equal(g.run('ACHIEVEMENTS.length'),108);
assert.equal(g.run('new Set(ACHIEVEMENTS.map(a=>a.id)).size'),108);assert.equal(g.run('new Set(ACHIEVEMENTS.map(a=>a.comment)).size'),108);
assert.deepEqual(g.json('DragonCollectionV3.collect(null)'),[],'no free collections on a fresh start');
g.run('S.campaign.cash=0;applyChoice(runChapters[0].choices[0]);checkAchievements(runChapters[0].choices[0])');assert.deepEqual(g.json("JSON.parse(localStorage.getItem('dragon_achievements')||'[]')"),[],'delayed award callback cannot credit an unfunded delivery');
const ids=g.json('DragonCollectionV3.sources()'),sources=new Set(ids.main.flatMap(x=>x.ids).concat(ids.events.flatMap(x=>x.ids)));assert.deepEqual([...sources].sort(),g.json('ACHIEVEMENTS.map(a=>a.id)').sort());
assert(g.json('Object.values(ENDINGS).every(e=>e.layer)').valueOf());
const legacy=createGame({'dragon_ach_schema':'v13.3','dragon_collection_schema':'17.1','dragon_achievements':'["a1","a3","a55"]','dragon_ng_points':'8','dragon_endings':'["be_probation","be_burnout","be_vendor","be_sanity","be_morale","ge_project"]'});
assert.deepEqual(legacy.json("JSON.parse(localStorage.getItem('dragon_achievements'))"),['a55']);assert.equal(legacy.run("localStorage.getItem('dragon_ng_points')"),'8');assert.equal(legacy.run("localStorage.getItem('dragon_legacy_achievements')"),null);
assert.deepEqual(legacy.json('getUnlocked()'),['ge_project']);assert.equal(legacy.json("JSON.parse(localStorage.getItem('dragon_legacy_endings')).length"),5);
legacy.run("startGame();applyChoice(runChapters[0].choices[0])");assert.equal(legacy.run("localStorage.getItem('dragon_ng_points')"),'8','previously paid ID cannot pay twice after migration');
const before=legacy.json('({p:S.campaign,awards:localStorage.getItem("dragon_achievements"),points:localStorage.getItem("dragon_ng_points"),choices:S.collection.choices})');legacy.run('applyChoice(runChapters[0].choices[0])');assert.deepEqual(legacy.json('({p:S.campaign,awards:localStorage.getItem("dragon_achievements"),points:localStorage.getItem("dragon_ng_points"),choices:S.collection.choices})'),before,'duplicate click causes no new resources or awards');
assert.equal(await legacy.run('saveGameV2()'),true);const state=legacy.json('S.collection');assert.deepEqual(legacy.json("JSON.parse(localStorage.getItem('dragon_save_v2')).state.collection"),state,'save payload preserves provenance; image-aware load is covered in browser regression');
const cp=legacy.json('S.campaign');legacy.run('renderChapter();renderChapter()');assert.deepEqual(legacy.json('S.campaign'),cp,'render is side-effect free');
console.log('PASS collection contract: reverse sources, no free awards, retired IDs archived, point ledger, duplicate guards and saved provenance.');
})().catch(e=>{console.error(e);process.exitCode=1;});
