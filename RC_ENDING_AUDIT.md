# Dragon Office — RC 结局可达性审计

基线规范：`ENDING_PRIORITY_SPEC.md`。

## 当前状态

- [x] 结局优先级已锁定。
- [x] 已增加独立 priority contract：`tests/ending-priority.spec.js`。
- [x] 已覆盖 14 个跨层冲突/兜底测试。
- [ ] `index.html` 的生产 `finalizeEvaluation()` 尚未完成单一 resolver 重构。
- [ ] 64 个公开结局尚未逐个建立正式 resolver witness state。
- [ ] `FLOW_TREE.md` 尚未与最终 resolver 顺序重新核对。
- [ ] RC PASS 尚未允许。

## 已发现的结构性风险

### R1. 多版本 wrapper 叠加

`index.html` 长期采用后置 wrapper 覆盖旧函数的兼容方式。该方式适合渐进开发，但对 RC 的结局判定不安全：最终行为取决于脚本声明顺序，后加入的事件系统可能在旧 `finalizeEvaluation()` 之后再次覆盖候选结局。

**RC 修复原则：** 结局只能有一个最终 resolver；其他系统只写状态/flag，不直接决定最终 ending ID。

### R2. v14 事件结局容易覆盖长期轨迹

v14 为 9 个事件 × 3 个选择增加 27 个事件回响结局，并另有 joint endings。事件回响应该是低于真结局和职业轨迹的 P3/P4 层，而不是“最后发生所以最后覆盖”。

### R3. 婚恋必须保持正交

`relationshipEpilogue()` 已采用公开结局后的私人尾声模式。后续不得为了爱情线再改变公开 ending ID；唯一保留的 `nc_love` 是项目未完全成功时的 NPC/关系特化公开结局。

## Resolver 验收矩阵

| 冲突 | 应胜出层 | 已有 contract |
|---|---|---|
| Duel × True | P0 Duel | 是 |
| True × Career | P1 True | 是 |
| True × Joint | P1 True | 是 |
| True × Event | P1 True | 是 |
| Career × Joint | P2 Career | 是 |
| Career × Event | P2 Career | 是 |
| Joint × Event | P3 Joint | 是 |
| Career × NPC | P2 Career | 是 |
| Event × NPC | P4 Event | 是 |
| NPC × Generic | P5 NPC | 是 |
| Love × Full Project Success | 非 `nc_love` | 是 |
| Invalid v14 candidate injection | 忽略 candidate | 是 |
| Legacy fallback | P7 | 是 |

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

1. 从当前生产 `finalizeEvaluation()` 提取所有现存条件，不改变阈值。
2. 将条件拆成纯 predicate，例如 `canTrueDragon()`、`canPromotion()`、`canNpcEnding()`。
3. 新建唯一 `resolveFinalEnding()`，严格按 P0→P7 调用 predicate。
4. `finalizeEvaluation()` 只负责：`const id = resolveFinalEnding(); showEnding(id);`。
5. v14、NPC、婚恋系统禁止直接覆盖最终 ending ID。
6. 建立 64 条 witness states，并报告所有 shadowed endings。
7. 对照 `FLOW_TREE.md`；不一致时以生产 resolver 为准修订文档。
8. 仅在 `64/64 reachable + 0 shadowed + priority contract PASS` 后标记 RC PASS。
