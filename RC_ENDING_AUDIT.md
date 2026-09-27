# Dragon Office — RC 结局可达性审计

基线规范：`ENDING_PRIORITY_SPEC.md`。

## 当前状态

- [x] 结局优先级已锁定。
- [x] 已建立独立 canonical resolver：`ending-resolver.js`。
- [x] `tests/ending-priority.spec.js` 已改为直接 import canonical resolver，不再复制一份测试专用判定逻辑。
- [x] 跨层冲突 contract 增至 15 个，新增 v14 route mismatch 防护。
- [ ] `index.html` 的生产 `finalizeEvaluation()` 尚未委托给 canonical resolver。
- [ ] 64 个公开结局尚未逐个建立正式 resolver witness state。
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

当前 `finishDuel()` 写 `flags.duelWin` 后仍回到 `finalizeEvaluation()`；`ENDINGS` 的64公开结局并不以 `duelWin/duelLose` 作为普通 gallery ending。canonical resolver 因此只在 caller 明确传入 `duelWinEnding/duelLoseEnding` 时返回它们，避免测试规范反过来创造不存在的公开结局。后续生产接线时应继续把 duel 视为 P0 机制状态，除非正式决定将其加入公开64结局。

### R5. 婚恋正交逻辑目前方向正确

v14.5 已移除旧统一 LOVE_EPILOGUE，并由 `relationshipEpilogue()` 根据初始/当前婚恋状态追加私人尾声；`nc_love` 仍只应在项目未完全成功时作为公开关系特化结局。

## Canonical resolver 接线目标

生产 `index.html` 最终应只保留以下职责：

```js
function finalizeEvaluation(){
  const state = buildFinalEndingState();
  const id = DragonEndingResolver.resolveFinalEnding(state);
  if(!id || !ENDINGS[id]) throw new Error('Unresolved ending: '+id);
  showEnding(id);
}
```

`buildFinalEndingState()` 负责把当前 `S / flags / NPC / promotionEndorsements / v14FinalRoute` 转成 predicate booleans；任何 v14/NPC/婚恋 wrapper 不再直接 `showEnding()`。

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

1. 建立 `buildFinalEndingState()`，逐条映射当前生产阈值，不先改平衡数值。
2. 让唯一的 `finalizeEvaluation()` 委托 `DragonEndingResolver.resolveFinalEnding()`。
3. 删除/失效化 v14.0 对 `finalizeEvaluation()` 的 wrapper，v14 只负责写 candidate/joint flags。
4. Duel 保持机制层；胜负只影响 resolver state，不新增公开 ending，除非64结局目录正式调整。
5. 建立64条 witness states，并报告所有 shadowed endings。
6. 对照 `FLOW_TREE.md`；不一致时以 canonical resolver 为准修订文档。
7. 仅在 `64/64 reachable + 0 shadowed + priority contract PASS` 后标记 RC PASS。
