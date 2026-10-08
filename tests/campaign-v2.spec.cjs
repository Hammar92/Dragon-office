'use strict';
const assert=require('node:assert/strict'),api=require('../story/project-campaign-v2.js');
function play(picker){const p=api.fresh(false);p.offers.newCompany=false;for(let i=0;i<18;i++){const ch=api.chapter(i,p);api.apply(p,picker?picker(ch,p,i):ch.choices[0]);}return p;}
const good=play();assert.equal(good.outcome,'submitted');assert.equal(good.months,63);assert.equal(good.progress,100);assert(good.cash>100);assert.equal(good.btd.status,'potential');assert.equal(api.data.product.breakthroughBackground,false);
const leader=play((ch,p,i)=>ch.choices.find(c=>c.campaignChoice.kind===(i===10?'authority':i===12?'delegation':'work'))||ch.choices[0]);assert.equal(leader.rank,3);assert.equal(leader.authority,1);assert(leader.teamReady&&leader.promotionHistory.every(x=>x.approved));assert.equal(leader.outcome,'submitted');
const btd=play((ch,p,i)=>i===6?ch.choices.find(c=>c.campaignChoice.kind==='btd'):ch.choices[0]);assert.equal(btd.btd.status,'granted');assert(btd.months<good.months);assert(btd.financing.eop2.amount>good.financing.eop2.amount);
const bad=play(ch=>ch.choices[1]);assert.notEqual(bad.outcome,'submitted');assert(bad.risks.some(r=>r.status!=='closed'));
const fraud=play((ch,p,i)=>i===13?ch.choices.find(c=>c.campaignChoice.kind==='fraud'):ch.choices[0]);assert(fraud.flags.fraud);assert.notEqual(fraud.outcome,'submitted');assert(api.gate(fraud,'nda').missing.includes('lock'));
const fake=api.fresh(false);fake.progress=100;fake.quality=100;fake.cash=1e6;assert.equal(api.gate(fake,'nda').outcome,'blocked');assert(!api.available(fake,10).some(x=>x.kind==='authority'));
const unknown=api.fresh(false),text=JSON.stringify(unknown);api.chapter(8,unknown);assert.equal(JSON.stringify(unknown),text);const c=api.chapter(0,unknown).choices[0];api.apply(unknown,c);const cash=unknown.cash;assert.equal(api.apply(unknown,c),null);assert.equal(unknown.cash,cash);
const deadline=api.fresh(false);api.advance(deadline,10,0);assert.equal(deadline.financing.phase1.status,'unmet');deadline.quality=100;deadline.progress=20;Object.assign(deadline.proofs,{fih:true,safety:true,dose:true,phase1:true});api.funding(deadline,api.data.financing[0]);assert.equal(deadline.financing.phase1.amount,1400);const paid=deadline.cash;api.funding(deadline,api.data.financing[0]);assert.equal(deadline.cash,paid);
const lost=api.fresh(false);api.advance(lost,13,0);lost.quality=100;lost.progress=20;Object.assign(lost.proofs,{fih:true,safety:true,dose:true,phase1:true});api.funding(lost,api.data.financing[0]);assert.equal(lost.financing.phase1.amount,0);
assert.equal(api.ensureVersion({version:1,cash:100,flags:{}}).migrated,true);
const vp=play((ch,p,i)=>ch.choices.find(c=>c.campaignChoice.kind===(i===10?'authority':i===12?'delegation':i===15?'department':i===17?'vp':'work'))||ch.choices[0]);assert.equal(vp.rank,4);assert.equal(vp.authority,2);assert(vp.flags.departmentDutyCompleted);assert.equal(vp.outcome,'submitted');
const noDuty=structuredClone(leader);noDuty.flags.departmentDutyCompleted=false;assert(!api.available(noDuty,17).some(x=>x.kind==='vp'));
const staff=api.fresh(false);staff.staffCount=2;api.advance(staff,1,10);assert.equal(staff.cash,2370,'recruited staff have recurring costs');
console.log('PASS V2 campaign: 18 chapters, money/tranches, clock, risk repair, fraud, BTD acceleration, authority, promotions, migration and NDA evidence.');
