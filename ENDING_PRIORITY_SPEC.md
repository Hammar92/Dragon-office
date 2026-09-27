# Dragon Office — RC 结局优先级规范

> 本文件是候选发布版的**结局判定单一规范**。后续 `finalizeEvaluation()`、`FLOW_TREE.md`、自动化测试均应以本文件为准。

## 1. 设计原则

结局优先级按“越能概括整局长期轨迹，优先级越高”处理。最后一次随机/后果事件不能覆盖已经由18章累计状态形成的核心人物结局。

同一层内只允许按明确条件决定；不得依赖对象遍历顺序、事件数组顺序或偶然的最后一次赋值。

## 2. Priority Resolver

```text
Terminal  即时终局（不进入 final resolver）
    ├─ be_heart / be_sanity / be_trust / be_morale / be_progress
    ├─ be_fraud
    └─ be_probation / be_burnout / be_vendor

P0  特殊终局机制
    └─ shouldDuel() → 事实QTE → duelWin / duelLose（只改变最终状态，不占64公开ID）

P1  跨周目 / 隐藏核心路线
    ├─ true_afterdragon
    ├─ true_dragon
    └─ ge_slayer

P2  整局职业轨迹
    ├─ ge_promotion
    ├─ ge_unsung
    ├─ ge_next
    └─ ge_firstline

P2.5  整局组织运行模式（Progress≥72）
    ├─ ge_succession
    ├─ ge_puppetmaster
    ├─ ge_regent
    ├─ ge_coalition
    ├─ ge_court
    ├─ ge_system
    └─ ge_project

P3  v14组合后果结局
    ├─ v14_joint_capacity
    ├─ v14_joint_paper
    ├─ v14_joint_site
    ├─ v14_joint_story
    └─ v14_joint_dragon

P4  v14单事件回响结局
    └─ v14_0_0 … v14_8_2，共27个

P5  NPC / 关系特化结局
    ├─ nc_xiaoyuan
    ├─ nc_caolan
    ├─ nc_ruidong
    ├─ nc_heina
    ├─ nc_weilai
    └─ nc_love（仅在项目未完全成功时；私人婚恋状态仍由隐藏尾声补充）

P6  中段与普通生存结局
    ├─ be_island
    ├─ mid_halfbridge
    ├─ ge_survive
    ├─ be_trust
    └─ be_progress

P7  legacy / oldFinalize 兜底
```

## 3. 冲突规则

### 3.1 真结局不能被事件回响覆盖

若玩家已经满足 `true_dragon` / `true_afterdragon` / `ge_slayer`，任何 `v14Candidate` 或 joint flag 均不得改变最终结局。

### 3.2 整局职业轨迹优先于最后一次事件

例如同时满足：

- `ge_promotion`；
- `v14_capacity` 的 govern 回响；

最终必须是 `ge_promotion`。事件内容可以作为结局页的附加“后果回声”，但不能替换主结局 ID。

### 3.3 整局组织运行模式优先于事件回响

Progress≥72 且满足 succession / puppetmaster / regent / coalition / court / system / project 等整局组织条件时，优先于最后一次 v14 事件。理由与职业轨迹相同：整局运行模式比一次随机事件更能概括玩家最终位置。

### 3.4 组合事件优先于单事件

若 joint 条件成立，同时 `v14Candidate` 也指向单事件，则 joint ending 优先。

### 3.5 NPC结局不覆盖明确职业/组织终局

高NPC关系用于描述人物关系与尾声，但不能把已经形成的晋升、无名功臣、屠龙或接班路线替换掉。

### 3.6 婚恋状态不占64公开结局

`relationshipEpilogue()` 是正交包装层：

`公开主结局 + 私人生活尾声`

初始 partnered / partnered_family / strained / divorced_rebuilt / single_content / guarded / open 均由隐藏状态决定私人尾声，不增加公开结局 ID。

## 4. 64/64 Reachability 验收要求

每一个 `ENDINGS` ID 必须有至少一个**通过正式 resolver 命中**的测试状态。禁止以直接调用 `showEnding(id)` 作为“可达性证明”。

每个测试 case 至少记录：

- state：Progress / Trust / Morale / Sanity / Heart / Power / Dragon / Merit / Reputation / BossTrust / Career；
- NPC阈值；
- flags；
- v14Candidate / v14FinalRoute（如适用）；
- expected ending ID；
- blocker：如果当前代码无法命中，记录先于它命中的 ending ID。

验收：`64 / 64 reachable`，且 `0 shadowed`。

## 5. Pairwise Priority 验收

至少覆盖：

- true route × career；
- true route × joint；
- true route × single-event；
- career × organization；
- organization × joint；
- organization × single-event；
- career × joint；
- career × single-event；
- joint × single-event；
- career × NPC；
- event × NPC；
- NPC × generic fallback。

测试不是要求所有64×64组合全部有业务意义，而是每一条实际可能发生的跨层冲突必须至少有一个明确 case。

## 6. 发布阻断条件

以下任一存在则不得标记 RC PASS：

1. `ENDINGS` 数量不是64；
2. 任一 ending 没有 resolver reachability case；
3. 任一公开 ending 永远被更早条件遮挡；
4. v14 单事件覆盖 P0–P2.5 结局；
5. 婚恋尾声改变公开 ending ID；
6. `FLOW_TREE.md` 与实际 resolver 顺序不一致。
