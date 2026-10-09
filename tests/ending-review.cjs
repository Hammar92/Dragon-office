'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),createGame=require('./runtime-fixture.cjs');
const g=createGame({'dragon_collection_schema':'17.2','dragon_legacy_achievements':'["deleted old badge"]','dragon_achievements':'["a55","invalid"]','dragon_achievement_details':'{"invalid":"old"}','dragon_ng_points':'9'});
assert.equal(g.run("localStorage.getItem('dragon_legacy_achievements')"),null);assert.deepEqual(g.json("JSON.parse(localStorage.getItem('dragon_achievements'))"),['a55']);assert.equal(g.run("localStorage.getItem('dragon_ng_points')"),'9');
assert.deepEqual(g.json("JSON.parse(localStorage.getItem('dragon_achievement_details'))"),{});
const entries=g.json('EndingReview.entries'),ends=g.json('ENDINGS');assert.equal(Object.keys(entries).length,64);assert.equal(new Set(Object.values(entries).map(e=>e[1])).size,64);
for(const [id,e] of Object.entries(ends)){assert(entries[id][2].length>5);assert(e.verdict.length>20);assert(fs.existsSync(path.join(__dirname,'..',e.art)));}
g.run('startGame();applyChoice(runChapters[0].choices[0])');const before=g.json('({p:S.campaign,flags,awards:localStorage.getItem("dragon_achievements")})');g.run('DragonCollectionV3.book()');const c=g.json("EndingReview.capture('ge_survive')");assert.equal(c.review.length,8);assert.equal(c.p.progress,before.p.progress);assert.deepEqual(g.json('({p:S.campaign,flags,awards:localStorage.getItem("dragon_achievements")})'),before,'report must not change gameplay');
const good=g.json("EndingReview.evaluate({heart:65,stamina:60,sanity:80,blame:5,reputation:50},Object.assign({},S.campaign,{boss:80,credit:80,supporters:['PV','统计','质量'],authority:1,teamReady:true,meetingReformed:true}),{})");
const poor=g.json("EndingReview.evaluate({heart:0,stamina:10,sanity:10,blame:60,reputation:10},Object.assign({},S.campaign,{boss:20,credit:80,supporters:[],authority:0,teamReady:false,dailyMeeting:true,history:[{kind:'shortcut'},{kind:'shortcut'},{kind:'shortcut'}]}),{})");
assert.match(good.map(x=>x[1]).join(''),/同盟|职能支持/);assert.match(poor.map(x=>x[1]).join(''),/献血式|口头/);assert.notDeepEqual(good,poor);
for(const id of Object.keys(entries))assert(g.json('EndingReview.condition('+JSON.stringify(id)+',null)').some(x=>x.includes('没有当轮快照')));
console.log('PASS 64 unique verdicts, 6 saved illustrations, retired achievement cleanup, preserved points, read-only evidence, adaptive political reviews, honest historical fallback.');
