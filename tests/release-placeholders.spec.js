/* Dragon Office RC release gate: development placeholders must not ship.
 * RC-06 freeze gate: this must stay green after numeric lock.
 */
'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');

const blockers=[];
const placeholderCount=(html.match(/PLACEHOLDER/g)||[]).length;
if(placeholderCount) blockers.push(`PLACEHOLDER markers: ${placeholderCount}`);
[
  '最终门槛后续统一重算',
  '最终增幅与成本待数值测试',
  '当前数值仅用于机制验证',
  '待最终数值测试'
].forEach(text=>{if(html.includes(text))blockers.push(`unfinished user/dev copy: ${text}`);});

if(blockers.length){
  console.error('RC-06 OPEN\n'+blockers.map(x=>' - '+x).join('\n'));
  process.exitCode=1;
}else{
  assert.strictEqual(blockers.length,0);
  console.log('PASS release placeholder gate');
}

module.exports={blockers,placeholderCount};
