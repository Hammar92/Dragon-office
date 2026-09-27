# Dragon-office · Release Candidate System Bug Audit

> 基线：当前 `main`（v14.5）。本文件把 `main` 当作候选发布版，而不是继续把“目录数量正确”当作发布完成。

## 1. 本轮审计范围

必须同时检查：

- 初始化 / 新档 / 旧档迁移 / NG+
- 18章主线与动态第4/5选项
- 34随机事件
- 2个PI连锁事件
- 8类会议QTE
- 隐藏爱情线与初始婚恋状态
- 64公开结局的可达性、遮挡与优先级
- 108成就的触发源、重复覆盖与轮回点重复发放
- 章节树、实现代码与文档是否一致

当前目录仍为：26 NPC / 18主线章节 / 34随机事件 / 2 PI连锁 / 108成就 / 64公开结局。

---

## 2. 已确认仍然有效的修复

### 初始化 / 存档

- 人生构筑性别、年龄仍作为最终身份来源。
- 旧婚恋存档同阶段互斥状态会执行 `normalizeRelationshipSelections()`。
- 旧成就迁移保留轮回点，并把退出目录的旧结果归档。
- 已有伴侣不再直接设置 `flags.love`。

### 主线 / 随机事件

- 18章目录存在，终章保留3个带route的基础选择。
- 34随机事件目录存在。
- 动态状态选项最多把普通正式事件扩到5项，且继承最近的 route / achievement / branch flag。

### QTE

- 当前测试覆盖8类会议入口。
- 已有重复点击、过期点击、休息面板覆盖QTE的保护。
- 固定剧情QTE为 `v11_4` 与 `v11_14`；其他会议按难度概率出现。

### 隐藏爱情 / 婚恋

- `romanceSecure` 与 `flags.love` 已拆开，随机约会不会提前结束三幕爱情线。
- 已有伴侣/家庭走 `HOME_EVENTS`，不进入陌生关系三幕线。
- HUD不显示爱情进度。
- 最终只追加一段动态私人生活尾声。

---

## 3. 本轮发现的发布阻断问题

### RC-01 · `FLOW_TREE.md` 与真实结局优先级不一致

**严重度：P1 / Release blocker**

文档当前写的是：

```text
跨周目拒绝龙椅
→ ge_promotion
→ ge_unsung
→ NPC特化 / 其他旧结局
→ v14事件包装层进一步覆盖
```

但当前 `finalizeEvaluation()` 的实际包装顺序是：

```text
跨周目 echo（交回 oldFinalize）
→ true_dragon
→ 高Dragon条件（交回 oldFinalize）
→ v14组合结局
→ v14单事件结局
→ ge_promotion
→ ge_unsung
→ ge_slayer
→ NPC / career补回结局
→ oldFinalize
```

因此，当玩家同时满足：

- 晋升条件；以及
- 一个匹配终章route的v14事件结局

当前代码会先命中 **v14事件结局**，而不是 `ge_promotion`。

这不是纯文档问题：它直接影响64结局的遮挡关系和玩家对“长期职业轨迹 vs 单个事件回响”的理解。

**需要先定设计原则再修：**

建议优先级采用：

```text
死亡/私人崩溃
> 跨周目真结局
> true_dragon / ge_slayer 等隐藏主路线
> ge_promotion / ge_unsung 等整局职业结局
> v14组合事件结局
> v14单事件结局
> NPC特化结局
> 普通GE/MID/BE兜底
```

理由：单个事件回响不应覆盖一个整局累积70+ Merit、Reputation、BossTrust和多方背书才形成的职业结局。

---

### RC-02 · 64结局测试仍不是“64/64可达性测试”

**严重度：P1 / Release blocker**

当前 `tests/smoke.cjs` 已经验证：

- 27个v14单事件结局可构造命中；
- 5个v14组合结局可构造命中；
- `true_dragon` 可压过普通事件结局；
- `true_afterdragon` 可压过普通事件结局；
- route不匹配时不会错误命中v14单事件结局。

但这仍不等于64个结局全部有独立可达路径。

**发布前必须增加：**

`ENDING_REACHABILITY_CASES`，对 `Object.keys(ENDINGS)` 逐一验证：

```js
for (const endingId of Object.keys(ENDINGS)) {
  assert.ok(reachable.has(endingId), `unproven ending: ${endingId}`);
}
```

每个case至少记录：初始状态、关键flags、终章route、预期ending。

禁止用“直接调用 `showEnding(id)`”冒充可达性测试。

---

### RC-03 · 108成就目前验证“目录完整”，没有验证“108/108真实触发”

**严重度：P1 / Release blocker**

现有测试证明：

- 108 ID唯一；
- 108条均有黑色幽默comment；
- 18章基础Choice achievement槽位存在；
- 34随机事件有achievement映射；
- 新增9随机事件的成就和branchFlag存在。

仍缺：

1. 每个成就是否存在至少一个实际触发源；
2. 条件成就是否被更早条件永久遮挡；
3. 动态第4/5选项继承成就是否可能造成同一章重复发放；
4. 重复点击 / 回调重入是否可能重复增加轮回点；
5. 旧存档迁移后再次加载是否幂等。

发布前应建立：

```text
achievement id
→ source type（chapter/random/qte/meta/ending）
→ source id
→ trigger condition
→ mutually exclusive with
→ replay/idempotency expectation
```

并验证108项无 orphan。

---

### RC-04 · QTE仍缺真实计时器层验证

**严重度：P2**

VM smoke 中：

```js
setTimeout:()=>1
setInterval:()=>1
```

因此它验证的是状态机，不是真实时间竞争。

仍需浏览器级覆盖：

- 最后一毫秒点击 vs timeout；
- 连续双击；
- timeout后旧按钮点击；
- round 1 callback在round 2后才返回；
- 手机端按钮换行后快速点击；
- QTE结束后旧timer是否还能改写新scene。

当前不能把“VM smoke通过”等同于“QTE发布验证完成”。

---

### RC-05 · 单文件多版本覆盖仍是最大结构风险

**严重度：P2 / 技术债**

`index.html` 继续大量使用：

```js
const oldX = X;
X = function(){ ... oldX(...); ... };
```

`finalizeEvaluation`、`applyChoice`、`renderHUD`、`maybeEvent` 等均经历多层包装。

本次RC不建议做全面模块化重构，否则会扩大回归面；但从现在开始应冻结新的 monkey patch 层。

v15再拆：

```text
state.js
story.js
events.js
relationship.js
qte.js
achievements.js
endings.js
ui.js
save.js
```

---

## 4. 婚恋初始状态 × 最终私人生活矩阵

私人生活继续作为**隐藏尾声**，不占64公开结局编号。

| 初始状态 | 本局关系结果 | 最终私人生活方向 |
|---|---|---|
| partnered_family | homeBond维持 | 关系保留；工作不再默认吞掉全部私人时间 |
| partnered_family | homeBond崩坏 | 同住但疏离，或最终分开；不能用“事业成功”抵消 |
| strained | homeBond恢复 | 重新建立边界，不写成突然恢复甜蜜 |
| strained | homeBond继续下降 | 安静分开；双方都知道问题不是某一次加班 |
| divorced_rebuilt | 新关系完成 | 新关系不是“治愈”，而是重新允许别人进入生活 |
| divorced_rebuilt | 未建立新关系 | 单身但完成重建，不作为BE |
| single_content | 新关系完成 | 慢速进入关系，同时保留独处空间 |
| single_content | 未建立新关系 | 继续完整地单身 |
| guarded | 新关系完成 | 学会边界和亲密可以同时存在 |
| guarded | 未建立新关系 | 没有强迫自己再次信任；有代价但不是失败 |
| open | romanceSecure但三幕未完成 | 有一个没有被定义的关系，不强行给名分 |
| open | A→B→C完成并坦白 | new_partner；隐藏爱情线完成 |
| open | C拒绝/回避 | 路线结束但不成立关系 |

### 婚恋线发布原则

- 不显示bond数值。
- 不在HUD显示“爱情路线”。
- 不因已有伴侣而给予每章大额Heart恢复。
- 新关系不能覆盖已有伴侣状态。
- 私人生活尾声必须服从初始婚恋史，而不是所有人共用一段“有人等你”。

---

## 5. 章节总流向（RC版）

```text
人生构筑 / 旧档迁移
│
├─ 年龄 / 性别 / 六能力 / 人格 / 身心
├─ relationshipArc初始化
└─ NG+ / Meta Route
    ↓
Chapter 1–18
│
├─ renderChapter
│  ├─ 3基础Choice
│  └─ 普通章节 +0~2 contextual Choice
│
├─ applyChoice
│  ├─ 数值
│  ├─ NPC关系
│  ├─ route / achievement
│  ├─ branchFlag
│  └─ PI conflict / prestige包装
│
├─ 生存/崩溃检查
├─ maybeEvent
│  ├─ PI Chain 1
│  ├─ PI Chain 2
│  └─ 34 Random Events
├─ maybeProjectBattle
│  └─ 8类QTE候选
├─ hidden relationship event
├─ phone event
└─ passive chapter settlement
    ↓
Chapter 18
├─ govern
├─ appease
└─ power
    ↓
Duel / Finalize
    ↓
Ending Priority Resolver
    ↓
64公开结局之一
    ↓
relationshipEpilogue()
    ↓
私人生活隐藏尾声
```

---

## 6. 108成就黑色幽默评述的验收规则

v14.5已经做到108条comment字符串互不相同，但发布验收不能只看字符串去重。

每条评述应满足：

1. **点名行为后果**：评论的是玩家刚做的事，不是泛泛吐槽公司。
2. **绑定人物性格**：能看出为什么是这个NPC，而不是换谁都成立。
3. **不复述成就名**：成就名负责笑点，comment负责补刀。
4. **长度控制**：通常1–2句。
5. **黑色幽默来自制度荒谬，不来自歧视、外貌或现实人物攻击。**

推荐句式不是模板，而是结构：

```text
具体后果 + 人物稳定行为模式 + 一点组织荒谬
```

例如：

> 你终于把“大家灵活支持”翻译成了人头数。K总很满意，因为容量管理的最高境界，就是承认人类还没有实现横向扩容。

而不是：

> 恭喜你做出了正确选择。职场就是这样。

---

## 7. 下一步修复顺序

### 第一批：发布阻断

1. 确定并统一64结局优先级；修复 `FLOW_TREE.md` / `finalizeEvaluation()` 不一致。
2. 建立64/64 `ENDING_REACHABILITY_CASES`。
3. 建立108/108 `ACHIEVEMENT_SOURCE_MAP` 与 orphan / duplicate / idempotency 检查。

### 第二批：运行回归

4. 18章 × 基础Choice全跑。
5. 34随机事件 × Choice全跑。
6. 2 PI连锁 × Choice全跑。
7. QTE成功 / 失败 / timeout / stale callback。
8. 6类婚恋origin × hidden-line状态组合。

### 第三批：平衡

9. Monte Carlo重新计算64结局分布。
10. 单独看 `true_dragon` / `ge_slayer` / `true_afterdragon`，避免隐藏结局理论可达、实际接近不可达。
11. 看Heart崩溃率、婚恋尾声分布和动态第4/5选项使用率。

---

## 当前RC结论

**当前 `main` 适合作为 RC 基线，但还不应标记为“发布验证完成”。**

核心游戏目录已经稳定；当前最大风险已经从“明显运行Bug”转为：

- 结局遮挡与优先级；
- 成就触发完整性；
- QTE真实时间竞争；
- 多层monkey patch造成的未来回归风险。

下一轮应先处理 `RC-01 ~ RC-03`，再做概率平衡。