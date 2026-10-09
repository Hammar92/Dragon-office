'use strict';
const assert=require('assert/strict'),createGame=require('./runtime-fixture.cjs'),api=require('../story/project-campaign-v2.js'),t=require('../story/trait-options.js');
assert.equal(Object.keys(t.rules).length,27);assert.equal(Object.values(t.rules).filter(x=>x.tier==='legendary').length,4);
for(const r of Object.values(t.rules)){
 const p=api.fresh(false);p.cash=100000;const i=r.chapters[0],c=api.chapter(i,p,[r.id]).choices.find(c=>c.campaignChoice.trait===r.id);assert(c,r.id);assert.equal(c.campaignChoice.kind,'work');assert(!api.chapter(i,p,[]).choices.some(c=>c.campaignChoice.trait));
 api.apply(p,c,[r.id]);assert(p.traitUses[r.id],r.id+' rewarded');assert.equal(p.traitUses[r.id].amount,t.tiers[r.tier].value);assert(!api.chapter(i,p,[r.id]).choices.some(c=>c.campaignChoice.trait===r.id));
 const snapshot=JSON.stringify(p);api.apply(p,c,[r.id]);assert.equal(JSON.stringify(p),snapshot,'no duplicate settlement');
 const poor=api.fresh(false);poor.cash=0;api.apply(poor,c,[r.id]);assert(!poor.traitUses,'no bonus without execution');
 const forged=api.fresh(false);assert.equal(t.reward(forged,c.campaignChoice,[]),false);
 const restored=JSON.parse(JSON.stringify(p));assert(!api.chapter(i,restored,[r.id]).choices.some(c=>c.campaignChoice.trait===r.id),'save keeps use');
}
const bounded=api.fresh(false);bounded.traitBonuses={coalition:7};assert(t.reward(bounded,{trait:'orgleader',kind:'work',index:10},['orgleader']));assert.equal(bounded.traitBonuses.coalition,8);
const authority=api.fresh(false);authority.cash=100000;const special=api.chapter(10,authority,['orgleader']);assert(special.choices.some(c=>c.campaignChoice.trait==='orgleader'));assert(!special.choices.some(c=>c.campaignChoice.kind==='authority'));assert.equal(api.gate(authority,'nda').outcome,'blocked');
const g=createGame();g.run(`startGame();S.campaign.cash=100000;S.player.traits=['nda','cool','orgleader','relationshipwise'];chapterIdx=15;renderChapter();`);assert(g.run('runChapters[15].choices.some(c=>c.campaignChoice.trait==="nda")'));
const base=g.run('costHeart(runChapters[15].choices[0],true)'),discount=g.run('costHeart(runChapters[15].choices.find(c=>c.campaignChoice.trait==="nda"),true)');assert.equal(discount,Math.round(base*.82),'rounded heart discount');assert(g.run('costStamina(runChapters[15].choices.find(c=>c.campaignChoice.trait==="nda"))<costStamina(runChapters[15].choices[0])'),'actual stamina discount');g.run(`applyChoice(runChapters[15].choices.find(c=>c.campaignChoice.trait==='nda'));`);assert(g.run('!!S.campaign.traitUses.nda'));assert.equal(g.run('rarityName("legendary")'),'金色传说');
console.log('PASS all27 trait responses /4 golden legendaries; tiers, actual costs, cash prerequisite, bounded rewards, authority/evidence gates, save and no repeat.');
