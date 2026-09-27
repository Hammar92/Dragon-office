# Dragon Office · Release Candidate System Bug Audit

基线：`rc-ending-integration`，2026-09-27。目标是把当前版本按候选发布版验收，而不是继续以“目录数量正确”代替可发布性。

## 1. 审计范围

- 初始化 / 新档 / 旧档迁移 / NG+
- 18章主线与动态第4/5选项
- 34随机事件
- 2个PI连锁事件
- 8类会议QTE
- 隐藏爱情线与初始婚恋状态
- 64公开结局的可达性、遮挡与优先级
- 108成就的触发源、重复覆盖与轮回点重复发放
- 单文件运行、文档与实现一致性

当前目录：26 NPC / 18主线章节 / 34随机事件 / 2 PI连锁 / 108成就 / 64公开结局。

## 2. 已关闭的原P1问题

### RC-01 · 结局优先级不一致 — CLOSED ON RC BRANCH

已经建立 `ending-resolver.js` 作为唯一规则源，并在单文件 `index.html` 中内联 canonical resolver 与 runtime bridge。最终判定不再由最后一层历史 wrapper 自由覆盖。

当前顺序：

```text
P0 终局决斗（仅显式作为ending时）
P1 跨周目 / true_dragon / ge_slayer
P2 整局职业轨迹
P2.5 整局组织轨迹
P3 v14组合后果
P4 v14单事件回响
P5 NPC / 关系特化
P6 普通生存 / 失败
P7 legacy fallback
```

原则：单个随机事件回响不能覆盖18章累计形成的职业或组织命运。

### RC-02 · 64结局缺少逐项可达性证据 — RULE-WITNESSED

当前拆分为：

- 57个 `FINAL_RESOLVER` ending：`tests/ending-witness.spec.js`
- 7个即时终局：`tests/terminal-ending-witness.spec.js`
- 总目录门禁：`tests/all-ending-witness.spec.js`
- 优先级冲突：`tests/ending-priority.spec.js`

状态：`64/64 RULE-WITNESSED`。

注意：这证明规则层不存在 orphan ending；仍需真实浏览器 replay / Monte Carlo 证明“理论可达”不是“实际概率接近0”。

### RC-03 · 108成就缺少真实source审计 — CLOSED AT STATIC/VM LAYER

`ACHIEVEMENT_AUDIT_RC.md` 与 `tests/smoke.cjs` 已确认：

- 108/108 ID唯一；
- 108/108 有 chapter/random-event source；
- 0 orphan；
- 0 旧版硬编码 `aXX` 自动解锁；
- 108/108 有唯一黑色幽默comment；
- `unlockAchievement()` 重复来源不重复发轮回点；
- 旧版退出目录的成就归档，既有NG点保留。

动态第4/5选项继承 authored outcome family，不另造图鉴ID。

## 3. 当前仍开放的问题

### RC-04 · QTE真实计时器竞争 — P2 / OPEN

VM smoke 把 timer stub 掉，因此已验证的是状态机，而不是真实时间竞争。浏览器发布验收仍需覆盖：

- timeout临界点击；
- 连续双击；
- timeout后旧按钮点击；
- round callback乱序；
- 手机端按钮换行后的快速点击；
- QTE结束后旧timer不得改写新scene。

### RC-05 · 多层 monkey patch — P2 / ACCEPTED RC TECH DEBT

`index.html` 仍然是历史版本逐层 wrapper 的单文件。RC不做全面模块化，以免扩大回归面；但从本次起禁止继续新增无审计的 `oldX = X; X = function(){...}` 层。

v15建议拆分 state/story/events/relationship/qte/achievements/endings/ui/save。

### RC-06 · 候选发布版仍残留明确“PLACEHOLDER/待数值测试”机制 — P1 / OPEN

本轮继续深审时发现，角色构筑与组织系统仍存在开发期占位标记，包括：

- `playerBaseSkills()` 基准值后仍标记 `PLACEHOLDER`；
- 能力门槛明确写着“最终门槛后续统一重算”；
- 组织凝聚力初始50仍标记 `PLACEHOLDER`；
- `SKILL_UPGRADE_COST=1` 仍标记 `PLACEHOLDER`；
- 每次成长 `+5` 仍标记 `PLACEHOLDER`；
- 成长商店用户可见文案仍写“最终增幅与成本待数值测试”。

这不是代码崩溃Bug，但对“候选发布版”属于发布阻断：玩家会直接看到系统尚未定稿，而且能力门槛、成长经济和组织凝聚力会影响分支可达性与平衡。

**RC处理原则：**

1. 不在没有分布模拟的情况下随意重调数值；
2. 先冻结一套RC常量，并删除用户可见“待测试/PLACEHOLDER”文案；
3. 用 Monte Carlo 检查能力门槛锁死率、成长点获得量、治理工具收益与64结局分布；
4. 如模拟显示严重偏斜，再只调整常量，不改事件结构。

因此当前版本仍不能标 `RC PASS`。

## 4. 初始化 / 存档状态

当前已验证：

- 人生构筑性别/年龄作为最终身份来源；
- 女性构筑不会被旧 `PLAYER_DRAFT.gender='male'` 覆盖；
- 同阶段矛盾婚恋旧档会归一化；
- 旧成就迁移保留既有NG点，退出目录的结果进入 legacy archive；
- 已有伴侣不会错误设置 `flags.love`；
- 新关系与已有家庭状态分开。

仍建议最终浏览器验收增加：空 localStorage、损坏JSON、旧版本重复迁移两次、NG+连续开始三局。

## 5. 婚恋初始状态 × 最终私人生活矩阵

私人生活继续作为隐藏尾声，不占64公开结局编号。

| 初始状态 | 本局关系结果 | 最终方向 |
|---|---|---|
| partnered_family | homeBond维持 | 关系保留；工作不再默认吞掉全部私人时间 |
| partnered_family | homeBond崩坏 | 同住但疏离或分开；事业成功不能抵消 |
| strained | homeBond恢复 | 重新建立边界，不突然恢复甜蜜 |
| strained | 继续下降 | 安静分开 |
| divorced_rebuilt | 新关系完成 | 重新允许别人进入生活，而不是“被治愈” |
| divorced_rebuilt | 未建立 | 完成重建的单身，不作为BE |
| single_content | 新关系完成 | 慢速进入关系并保留独处空间 |
| single_content | 未建立 | 完整地单身 |
| guarded | 新关系完成 | 边界与亲密同时存在 |
| guarded | 未建立 | 不强迫再次信任 |
| open | romanceSecure但三幕未完成 | 未定义关系，不强行给名分 |
| open | A→B→C完成 | `new_partner`，隐藏爱情线完成 |
| open | C拒绝/回避 | 路线结束但不成立关系 |

发布原则：不显示bond；HUD不显示爱情路线；已有伴侣不进入陌生关系三幕线；私人生活尾声服从初始婚恋史。

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

## 7. 108成就黑色幽默评述验收

每条comment应：

1. 评论具体行为后果；
2. 尽量绑定人物稳定行为模式；
3. 不简单复述成就名；
4. 通常1–2句；
5. 黑色幽默来自组织荒谬，不来自歧视、外貌或现实人物攻击。

当前机器门禁已经确认108条comment存在且互不相同；人工文案审校仍可继续提高“人物特征密度”。

## 8. 剩余RC顺序

1. **冻结并清理 RC-06 的 placeholder 数值/文案。**
2. 浏览器层跑 QTE timeout / double-click / stale timer。
3. 新档、损坏存档、重复迁移、连续NG+回归。
4. 18章、34随机事件、2 PI链的全Choice replay。
5. Monte Carlo：64结局频率、Heart崩溃率、隐藏路线、动态选项使用率、能力门槛锁死率。
6. 更新 `FLOW_TREE.md` 与最终实现一致。
7. 全部通过后再合并 PR #4 到 `main`。

## 当前RC结论

`64/64 ENDINGS RULE-WITNESSED · 108/108 ACHIEVEMENTS SOURCED · PRODUCTION SINGLE-FILE BRIDGE INSTALLED`

但仍为：**RC NOT PASS**。

当前最大的发布阻断已经从结局/成就目录问题转为 **未冻结的角色成长/能力数值（RC-06）**；其次是浏览器真实QTE计时与最终概率平衡。