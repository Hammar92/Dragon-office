# Dragon Office — RC 结局可达性审计

基线规范：`ENDING_PRIORITY_SPEC.md`。

## 当前状态

- [x] 结局优先级已锁定。
- [x] 已建立独立 canonical resolver：`ending-resolver.js`。
- [x] 已建立纯函数 `buildFinalEndingState(raw)`，把生产数值/NPC/flags 映射成 canonical predicates。
- [x] `tests/ending-priority.spec.js` 直接 import canonical resolver，不复制判定顺序。
- [x] contract 已覆盖 15 个 predicate 冲突 + 16 个 raw production-state case，共 31 个 case。
- [ ] `index.html` 的生产 `finalizeEvaluation()` 尚未委托给 canonical resolver。
- [ ] 64 个公开结局尚未逐个建立正式 witness state。
- [ ] `FLOW_TREE.md` 尚未与最终 resolver 顺序重新核对。
- [ ] RC PASS 尚未允许。

## 本轮生产代码核查结果

### R1. 已确认存在双层 `finalizeEvaluation()`

基础版本先按 `promotion → NPC → island/love → true/career → generic` 判定；v14.0 又在后部通过 wrapper 重写 `finalizeEvaluation()`，增加 dragon、joint、event、career/NPC 的第二套 early-return 顺序。

这不是理论风险：当前实际生产行为确实依赖脚本声明顺序。

### R2. 当前 v14 wrapper 与 RC priority spec 不一致

当前 v14 wrapper 在 `progress>=60` 时先检查 joint/event，再检查 promotion/unsung/slayer/NPC/career。因此同一状态若同时满足 `ge_promotion` 与 `v14Candidate`，生产代码可能先落到事件回响；这与 P2 Career > P3/P4 Event 的 RC 规范冲突。

### R3. 当前基础 resolver 内部也存在覆盖风险

基础 `finalizeEvaluation()` 先写入 `ge_promotion/ge_unsung`，随后 NPC 特化使用无条件 `if/else if` 再写 `key`，因此高关系 NPC 可以覆盖已经形成的职业结局。RC 规范要求 Career > NPC。

### R4. Duel 目前是机制，不是公开 ending ID

当前 `finishDuel()` 写 `flags.duelWin` 后仍回到 `finalizeEvaluation()`；64公开结局并不以 `duelWin/duelLose` 作为普通 gallery ending。canonical resolver 只在 caller 明确传入 `duelWinEnding/duelLoseEnding` 时返回它们，避免测试反过来创造不存在的公开结局。

### R5. 发现另一类终局入口：即时死亡结局

`checkDeath()` 可以直接进入 `be_heart / be_sanity / be_trust / be_morale / be_progress`；`pickEvent()` 还可因 `flags.fraud` 直接进入 `be_fraud`。这些结局不经过 `finalizeEvaluation()`。

因此 **64/64 reachability 不能错误地要求所有 ending 都由 final resolver 命中**。正式 witness audit 必须区分：

1. `FINAL_RESOLVER`：18章完成后的结局；
2. `TERMINAL_DEATH`：资源归零触发；
3. `TERMINAL_FLAG`：例如 fraud 这种不可逆 flag；
4. 其他明确的特殊终局入口（若后续发现）。

要求仍然是每个公开 ending 必须存在一个真实游戏入口；禁止直接 `showEnding(id)` 作为可达性证明。

### R6. 婚恋正交逻辑目前方向正确

v14.5 已移除旧统一 LOVE_EPILOGUE，并由 `relationshipEpilogue()` 根据初始/当前婚恋状态追加私人尾声；`nc_love` 仍只应在项目未完全成功时作为公开关系特化结局。

## `buildFinalEndingState(raw)` 当前映射

已固定但尚未改平衡阈值：

- `true_afterdragon`：echo 周目 + refuse + Progress≥72 + Morale≥58 + Dragon<20；
- `true_dragon`：Progress≥60 + Dragon≥10 + Power≥65 + Merit≥45 + 主动接管/终章权力选择；
- `ge_slayer`：Progress≥60 + 终章权力选择 + Dragon<10 + Power≥65 + ≥3 张中层支持票；
- `ge_promotion`：沿用 Merit/Reputation/BossTrust/endorsement/difficulty 阈值；
- `ge_unsung`：Progress≥60 + Merit≥75 + Reputation<35；
- `ge_next / ge_firstline`：要求终章 main_18_1，并按 Career 75/55 分层；
- v14 event：candidate 必须匹配 `v14_[0-8]_[0-2]` 且最终 route 与 choice route 一致；
- NPC：沿用当前 v14 wrapper 的较高阈值（小圆85、曹兰65、瑞冬70、黑娜70、苏苏60），避免重新引入旧 resolver 的双阈值；
- `nc_love`：仅 35≤Progress<60；完整项目成功时婚恋只进入私人尾声；
- generic：island / halfbridge / survive / be_trust / be_progress。

## Canonical resolver 接线目标

生产 `index.html` 最终应只保留以下职责：

```js
function finalizeEvaluation(){
  const promo = promotionEndorsements();
  const raw = {
    ...S,
    flags,
    difficultyId:difficulty().id,
    promotionSupport:promo.support.length,
    promotionOppose:promo.oppose.length,
    allyAt:Object.fromEntries(Object.keys(NPCs).map(k=>[k,NPCs[k].allyAt||0])),
    joints:buildV14JointFlags(),
    v14Candidate:flags.v14Candidate,
    v14FinalRoute:flags.v14FinalRoute
  };
  const state = DragonEndingResolver.buildFinalEndingState(raw);
  const id = DragonEndingResolver.resolveFinalEnding(state);
  if(!id || !ENDINGS[id]) throw new Error('Unresolved ending: '+id);
  showEnding(id);
}
```

注意：`buildV14JointFlags()` 只是示意名称；生产接线时应复用 v14 当前 `joint` 条件，不另造一套条件。

## Resolver 验收矩阵

| 冲突 | 应胜出层 | contract |
|---|---|---|
| Duel × True | P0 Duel mechanism | PASS case |
| True × Career | P1 True | PASS case |
| True × Joint | P1 True | PASS case |
| True × Event | P1 True | PASS case |
| Career × Joint | P2 Career | PASS case |
| Career × Event | P2 Career | PASS case |
| Joint × Event | P3 Joint | PASS case |
| Career × NPC | P2 Career | PASS case |
| Event × NPC | P4 Event | PASS case |
| NPC × Generic | P5 NPC | PASS case |
| Love × Full Project Success | 非 `nc_love` | PASS case |
| Invalid v14 candidate injection | 忽略 candidate | PASS case |
| v14 route mismatch | 忽略 candidate | PASS case |
| Legacy fallback | P7 | PASS case |

## 64/64 witness state 模板

每个公开 ending 必须增加一条记录：

```text
ending_id:
entry: FINAL_RESOLVER / TERMINAL_DEATH / TERMINAL_FLAG / SPECIAL
expected_priority:
state:
  progress:
  trust:
  morale:
  sanity:
  heart:
  power:
  dragon:
  merit:
  reputation:
  bossTrust:
  career:
npc:
flags:
v14Candidate:
v14FinalRoute:
expected:
actual:
blocker:
status: PASS / SHADOWED / UNREACHABLE
```

## 下一次代码修改顺序

1. 把 v14 `joint` 的5条真实条件抽成纯函数，供 production state builder 和 witness tests 共用。
2. 让唯一生产 `finalizeEvaluation()` 委托 `DragonEndingResolver`；删除/失效化旧 wrapper 的 ending early-return。
3. 保留 `checkDeath()` / fraud 等即时终局，但纳入统一 reachability audit。
4. 建立64条 witness states，并报告所有 shadowed/unreachable endings。
5. 对照 `FLOW_TREE.md`；不一致时以真实入口 + canonical resolver 为准修订文档。
6. 仅在 `64/64 reachable + 0 shadowed + priority contract PASS` 后标记 RC PASS。
