# Dragon Office — RC 结局可达性审计

基线规范：`ENDING_PRIORITY_SPEC.md`。

## 当前状态

- [x] 结局优先级已锁定。
- [x] 已建立独立 canonical resolver：`ending-resolver.js`。
- [x] 已建立纯函数 `buildFinalEndingState(raw)`。
- [x] v14 五个 joint ending 的生产条件已核对并移入 `JOINT_RULES`，builder 直接从真实 branch flags 推导，不再要求 caller 另造一份 joint 布尔值。
- [x] `tests/ending-priority.spec.js` 直接 import canonical resolver。
- [x] contract 当前覆盖 15 个 predicate 冲突 + 21 个 raw production-state case，共 36 个 case；五个 joint ending 均有 production-flag witness，并有 wrong-route negative case。
- [ ] `index.html` 的生产 `finalizeEvaluation()` 尚未委托给 canonical resolver。
- [ ] 64 个公开结局尚未逐个建立正式 witness state。
- [ ] `FLOW_TREE.md` 尚未与最终 resolver 顺序重新核对。
- [ ] RC PASS 尚未允许。

## 已确认的生产问题

### R1. 双层 `finalizeEvaluation()`
基础版本与 v14 wrapper 各自拥有 ending early-return，实际行为依赖脚本声明顺序。

### R2. v14 wrapper 与 RC priority spec 不一致
v14 当前在 Progress≥60 时先检查 joint/event，再检查 promotion/unsung/slayer/NPC/career；canonical priority 要求 Career 高于 Joint/Event。

### R3. 基础 resolver 也有覆盖风险
基础 `finalizeEvaluation()` 中 NPC 特化可以覆盖已经形成的 career ending；canonical priority 要求 Career > NPC。

### R4. Duel 是机制，不是64公开 ending
`finishDuel()` 写 `flags.duelWin` 后仍进入最终判定。除非以后正式扩展 gallery，resolver 不应凭空创造 duelWin/duelLose 公开结局。

### R5. 即时终局不经过 final resolver
`checkDeath()` 可直接进入 `be_heart / be_sanity / be_trust / be_morale / be_progress`；fraud 也有直接终局。因此64/64 witness audit 必须区分 `FINAL_RESOLVER / TERMINAL_DEATH / TERMINAL_FLAG / SPECIAL`。

### R6. 婚恋保持正交
`relationshipEpilogue()` 根据初始/当前婚恋状态追加私人尾声；`nc_love` 只在项目未完全成功时作为公开关系特化结局。

## 已核对的 v14 joint 真条件

| Ending | 必需历史选择 | 终章 route |
|---|---|---|
| `v14_joint_capacity` | `v14_0_0` + `v14_6_0` | govern |
| `v14_joint_paper` | `v14_1_0` + `v14_2_0` | govern |
| `v14_joint_site` | `v14_3_0` + `v14_6_0` | govern |
| `v14_joint_story` | `v14_4_1` + `v14_7_1` | appease |
| `v14_joint_dragon` | `v14_5_2` + `v14_8_2` | power |

这些条件现在由 `ending-resolver.js::deriveJoints(flags, finalRoute)` 单点维护。`raw.joints` 只保留为测试/兼容 override，不再是生产接线要求。

## `buildFinalEndingState(raw)` 当前映射

- `true_afterdragon`：echo 周目 + refuse + Progress≥72 + Morale≥58 + Dragon<20；
- `true_dragon`：Progress≥60 + Dragon≥10 + Power≥65 + Merit≥45 + 主动接管/终章权力选择；
- `ge_slayer`：Progress≥60 + 终章权力选择 + Dragon<10 + Power≥65 + ≥3 张关系支持；
- `ge_promotion`：Merit/Reputation/BossTrust/endorsement/difficulty 阈值；
- `ge_unsung`：Progress≥60 + Merit≥75 + Reputation<35；
- `ge_next / ge_firstline`：终章 main_18_1 + Career 75/55；
- v14 joint：由 `JOINT_RULES` 从真实历史 flags + final route 推导；
- v14 event：candidate 必须匹配 `v14_[0-8]_[0-2]` 且 route 匹配；
- NPC：小圆85、曹兰65、瑞冬70、黑娜70、苏苏60；
- `nc_love`：仅 35≤Progress<60；
- generic：island / halfbridge / survive / be_trust / be_progress。

## 下一步生产接线

目标不再需要 `buildV14JointFlags()`：

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
    v14Candidate:flags.v14Candidate,
    v14FinalRoute:flags.v14FinalRoute
  };
  const state=DragonEndingResolver.buildFinalEndingState(raw);
  const id=DragonEndingResolver.resolveFinalEnding(state);
  if(!id||!ENDINGS[id])throw new Error('Unresolved ending: '+id);
  showEnding(id);
}
```

## 64/64 witness 要求

每个公开 ending 必须记录真实入口、最小 witness state、expected/actual、blocker 和 `PASS / SHADOWED / UNREACHABLE`。禁止直接调用 `showEnding(id)` 作为可达性证明。

## 下一次代码修改顺序

1. 在 `index.html` 加载 canonical resolver，并把最终 `finalizeEvaluation()` 真正接到它。
2. 失效化 v14/旧版对 final ending 的重复 early-return；即时 death/fraud 保持原入口。
3. 从 `Object.keys(ENDINGS)` 自动生成64结局清单，逐个建立 witness；先找出无法由 final resolver 覆盖的特殊入口。
4. 对照 `FLOW_TREE.md` 修订树状图。
5. 仅在 `64/64 reachable + 0 shadowed + priority contract PASS` 后标记 RC PASS。
