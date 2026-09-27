# Dragon Office · Release Candidate System Bug Audit

基线：`rc-ending-integration`，2026-09-27。目标是把当前版本按候选发布版验收，而不是继续以“目录数量正确”代替可发布性。

## 1. 审计范围

初始化/存档、18章主线、34随机事件、2个PI连锁、8类会议QTE、隐藏爱情与婚恋状态、64公开结局、108成就，以及单文件运行和文档一致性。

当前目录：26 NPC / 18主线章节 / 34随机事件 / 2 PI连锁 / 108成就 / 64公开结局。

## 2. 已关闭的原P1问题

### RC-01 · 结局优先级不一致 — CLOSED ON RC BRANCH

`ending-resolver.js` 已成为唯一规则源，并内联进单文件 `index.html`；runtime bridge 是最后的 `finalizeEvaluation` 包装层。

当前顺序：P0终局决斗 → P1跨周目/屠龙 → P2职业 → P2.5组织 → P3组合事件 → P4单事件 → P5 NPC/关系 → P6普通生存/失败 → P7 legacy。

原则：单个随机事件回响不能覆盖18章累计形成的职业或组织命运。

### RC-02 · 64结局逐项可达性 — RULE-WITNESSED

- 57个 final resolver：`tests/ending-witness.spec.js`
- 7个即时终局：`tests/terminal-ending-witness.spec.js`
- 64总目录门禁：`tests/all-ending-witness.spec.js`
- 冲突优先级：`tests/ending-priority.spec.js`

状态：`64/64 RULE-WITNESSED`。仍需浏览器 replay / Monte Carlo 验证实际概率。

### RC-03 · 108成就source — PASS AT STATIC/VM LAYER

`ACHIEVEMENT_AUDIT_RC.md` 与 smoke 已确认：108/108 ID唯一、108/108有chapter/random source、0 orphan、0旧版硬编码aXX自动解锁、108条comment均存在且唯一、旧档迁移保留NG点。

## 3. 当前开放问题

### RC-04 · QTE真实计时器竞争 — P2 / OPEN

VM timer 是stub。浏览器仍需覆盖 timeout临界点击、双击、旧按钮、callback乱序、手机端快速点击、旧timer污染新scene。

### RC-05 · 多层 monkey patch — P2 / ACCEPTED RC TECH DEBT

RC不做全面模块化，以免扩大回归面；但从本次起冻结新增无审计wrapper。v15再拆 state/story/events/relationship/qte/achievements/endings/ui/save。

### RC-06 · 仍残留开发期PLACEHOLDER/待数值测试机制 — P1 / OPEN

深审发现角色构筑与组织系统仍有开发期占位：

- `playerBaseSkills()` 基准值标记 `PLACEHOLDER`；
- 能力门槛注明“最终门槛后续统一重算”；
- 组织凝聚力初始50标记 `PLACEHOLDER`；
- `SKILL_UPGRADE_COST=1` 标记 `PLACEHOLDER`；
- 每次成长 `+5` 标记 `PLACEHOLDER`；
- 成长商店用户可见“最终增幅与成本待数值测试”；
- 人物创建预览仍显示“当前数值仅用于机制验证”。

这会直接告诉玩家系统未定稿，也会影响能力门槛、成长经济、组织凝聚力和分支频率。

已新增 `tests/release-placeholders.spec.js`。该门禁**现在应当保持红灯**，直到RC常量冻结并清理上述开发文案；不能通过删除测试来获得假PASS。

处理原则：先冻结常量，再Monte Carlo；严重偏斜时只调常量，不改事件结构。

## 4. 初始化 / 存档

已验证：人生构筑性别/年龄是最终身份来源；女性不会被旧male默认覆盖；同阶段矛盾婚恋旧档归一化；旧成就迁移保留NG点；已有伴侣不误设 `flags.love`。

最终浏览器验收还要补：空localStorage、损坏JSON、旧版本重复迁移两次、NG+连续三局。

## 5. 婚恋初始状态 × 私人生活

私人生活继续是隐藏尾声，不占64公开结局。

| 初始状态 | 本局结果 | 尾声方向 |
|---|---|---|
| partnered_family | homeBond维持 | 关系保留 |
| partnered_family | homeBond崩坏 | 疏离/分开；事业不能抵消 |
| strained | 恢复 | 重建边界 |
| strained | 继续下降 | 安静分开 |
| divorced_rebuilt | 新关系完成 | 重新允许别人进入生活 |
| divorced_rebuilt | 未建立 | 完成重建的单身 |
| single_content | 新关系完成 | 慢速进入关系 |
| single_content | 未建立 | 完整地单身 |
| guarded | 新关系完成 | 边界与亲密并存 |
| guarded | 未建立 | 不强迫再次信任 |
| open | romanceSecure但三幕未完成 | 未定义关系 |
| open | A→B→C完成 | new_partner |
| open | C拒绝/回避 | 路线结束，不成立关系 |

## 6. 章节总流向

```text
人生构筑 / 旧档迁移
├─ 身份 / 能力 / 身心
├─ relationshipArc
└─ NG+ / Meta
    ↓
Chapter 1–18
├─ 3基础Choice
├─ 普通章 +0~2 contextual Choice
├─ applyChoice：数值 / NPC / route / achievement / branchFlag
├─ 生存与即时终局检查
├─ PI Chain / 34 Random Events
├─ 8类会议QTE候选
├─ hidden relationship / home event
└─ passive settlement
    ↓
Chapter 18: govern / appease / power
    ↓
Canonical Ending Resolver
    ↓
64公开结局之一
    ↓
relationshipEpilogue()
    ↓
隐藏私人生活尾声
```

## 7. 成就黑色幽默验收

机器门禁证明108条comment存在且唯一。人工审校继续要求：评论具体后果；能绑定NPC时使用稳定人物行为；不复述成就名；通常1–2句；笑点来自组织荒谬而非现实人物外貌/身份攻击。

## 8. 剩余RC顺序

1. 冻结并清理 RC-06 placeholder 数值/文案，使 `release-placeholders.spec.js` 变绿。
2. 浏览器层QTE timeout/double-click/stale timer。
3. 新档、损坏存档、重复迁移、连续NG+。
4. 18章、34随机事件、2 PI链全Choice replay。
5. Monte Carlo：64结局频率、Heart崩溃率、隐藏路线、动态选项、能力门槛锁死率。
6. 更新 `FLOW_TREE.md` 与最终实现一致。
7. 全部通过后再合并 PR #4。

## RC-06 数值冻结进展

状态：**STATIC FREEZE PASS**

- 人生构筑六个阶段基础预算统一为 **8 分/阶段**。
- 基础六能力冻结为：专业34 / 社交34 / 魅力34 / 管理32 / 洞察34 / 体能38。
- 旧兼容构筑底盘同步下调为：专业34 / 社交34 / 魅力34 / 项目32 / 洞察34。
- 早期能力检定冻结为：专业50；管理48；社交46 + 洞察48。
- 成长点成本保持 1 点；每次能力成长由 +5 下调为 **+4**。
- Heart resilience 单次成长由 +5 下调为 **+4**；Fitness成长附带最大体力 +2。
- Management治理加成门槛调整为：≥55触发额外收益，≥70进入高档收益。
- Charm关系倍率斜率轻度收窄，避免8分构筑下社交/魅力叠加过度放大。
- 所有 `PLACEHOLDER` 和“待最终数值测试”的用户可见文案已移除。
- `tests/release-placeholders.spec.js` 从故意红灯改为永久发布门禁。
- `tests/smoke.cjs` 新增：6阶段×8分、基础能力、成长点成本与+4成长幅度断言。

剩余工作不再是“数值未定义”，而是 **浏览器级分布验证**：确认高强度Build、传奇词条密度、Heart/Stamina生存率和隐藏结局频率没有因8分预算出现新的极端分布。

## 当前RC结论

`64/64 ENDINGS RULE-WITNESSED · 108/108 ACHIEVEMENTS SOURCED · PRODUCTION SINGLE-FILE BRIDGE INSTALLED`

但仍为 **RC NOT PASS**。

当前P1发布阻断是 RC-06；发布门禁已经显式编码为红灯测试。其次是浏览器真实QTE计时与最终概率平衡。