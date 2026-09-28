# Dragon Office · 64结局攻略（RC v14.6）

> 本文件以 `ending-resolver.js` 当前生产逻辑为准。  
> “条件满足”不等于“一定得到”：先看优先级。高层结局会覆盖低层结局。

## 0. 先记住优先级

```text
即时终局
→ P1 隐藏核心（afterdragon / dragon / slayer）
→ P2 职业（promotion / unsung / next / firstline）
→ P2.5 组织（7个）
→ P3 v14 Joint
→ P4 v14 Event
→ P5 NPC / Love
→ P6 Generic
```

### 最重要的攻略窗口

- **Progress <35**：主要进入失败类。
- **Progress 35–59**：半座桥 / 幸存者 / 信任失败 / 苏苏 / 爱情等。
- **Progress 60–74**：最重要的“长尾窗口”。
  - v14 Joint / Event 只有这里最容易拿到；
  - 成功型NPC结局也主要在这里拿；
  - 因为 Progress≥75 时至少会触发 `ge_project`，组织层会覆盖这些低层结局。
- **Progress ≥75**：组织型 / 职业型 / 隐藏核心结局主战场。

---

# 1. 隐藏核心结局（3）

## true_afterdragon · 龙见过你，你没坐下

条件：

- 上一周目解锁 echo 路线并本周目选择；
- `meta_echo_refuse=true`；
- Progress≥75；
- Morale≥58；
- Dragon<20。

攻略：

1. 前周目先达成 `true_dragon`，解锁“龙之回声”。
2. 新周目选 echo。
3. 专注治理和组织建设，不要在第二次机会里继续收权。
4. 保持项目强成功和士气。
5. echo事件选择拒绝再次集中权力。

优先级最高，能覆盖职业、组织、v14事件。

## true_dragon · 屠龙

条件：

- Progress≥60；
- Dragon≥8；
- Power≥65；
- Merit≥45；
- 终章真实选择 Power，或明确 `dragon_take`。

已验证真实路径：

- 前期用 govern 累积成果、记录和Power；
- 中后期转Power；
- 分支终章选择接管；
- 完整18章压力回放可稳定达成。

## ge_slayer · 屠龙者

条件：

- Progress≥60；
- 终章真实route=Power；
- Dragon<10；
- Power≥65；
- 至少2名有效支持者达到60（若NPC有更高 `allyAt` 则按更高值）。

推荐路线：

1. 前17章以 govern 为主。
2. 集中经营专业盟友，实测可做到：
   - K总 76
   - 则韩 64
   - 肖恩 62
3. 不通过甩锅/集权累积Dragon。
4. 第18章改选 Power。
5. 不要求基础 `main_18_3`；v12分支终章只要 `v14FinalRoute=power` 即可。若 Dragon≥8 且 Merit≥45，同时满足 true_dragon，则 true_dragon 优先于 Slayer。

真实路径已验证：`v12_18_network → power → ge_slayer`。

---

# 2. 职业结局（4）

## ge_promotion · 名字写在第一行

条件：

- Progress≥60
- Merit≥70
- Reputation≥45
- BossTrust≥45
- 晋升支持票：
  - Normal/Story ≥3
  - Hard ≥4
- 反对票：
  - Normal/Story ≤3
  - Hard ≤2
- `duelWin=true` 或 Trust≥30

攻略：公开产出 + 老板可见记录 + 多方背书，避免把所有关系打穿。

## ge_unsung · 无名功臣

条件：

- Progress≥60
- Merit≥75
- Reputation<25

攻略：大量做成真正工作，但少做可见功劳/政治展示。

## ge_next · 更好的地方

条件：

- Progress≥60
- 终章真实route=Govern
- Career≥75
- Dragon<10

攻略：把项目做成，同时持续积累离开当前组织仍有价值的履历。

## ge_firstline · 交付者

条件：

- Progress≥60
- 终章真实route=Govern
- Career≥55
- Dragon<10
- 且未满足 ge_next

攻略：稳定完成项目、保持中高职业资产，但不要把Career推到75。

---

# 3. 组织结局（7，Progress≥75）

> 若没有命中P1/P2，Progress≥75至少会进入 `ge_project`，所以这一层也构成v14 Event/NPC的天然上界。

## ge_succession · 继承人名单上没有名字

- Progress≥75
- Power≥68
- BossBand≥42
  - BossBand=(CEO+CSO+小圆)/3
- Trust≥50

## ge_puppetmaster · 老板说得对

- Progress≥75
- Power≥64
- Trust≥58
- BossBand≥38
- Morale<62

## ge_regent · 摄政

- Progress≥75
- Power≥60
- ProfessionalBand≥55
  - K总 / 肖恩 / 则韩 / 明夜平均
- Trust<55

## ge_coalition · 没有王座的多数派

- Progress≥75
- ≥5名有效支持者达到50
- Morale≥58
- Power≥48

## ge_court · 听调不听宣

- Progress≥75
- Power≥52
- Trust≥50

## ge_system · 吵着把事做完

- Progress≥75
- Morale≥62
- Power≥48

## ge_project · 药做出来了

- Progress≥75
- 未命中上述任何更具体组织/职业/隐藏结局

这是强项目成功的最终组织兜底。

---

# 4. v14 Joint隐藏结局（5）

共同条件：

- **Progress 60–74最安全**
- Heart>0 / Trust>0 / Morale>0
- 对应两个历史选择都发生
- 第18章最终route一致
- 不满足P1/P2/P2.5

| ID | 名称 | 必须发生 | 最终route |
|---|---|---|---|
| `v14_joint_capacity` | 没有人力的关键路径 | `v14_0_0 + v14_6_0` | govern |
| `v14_joint_paper` | 两份文件一条时间线 | `v14_1_0 + v14_2_0` | govern |
| `v14_joint_site` | 最便宜的是别让患者来 | `v14_3_0 + v14_6_0` | govern |
| `v14_joint_story` | 漂亮故事的两份分母 | `v14_4_1 + v14_7_1` | appease |
| `v14_joint_dragon` | 新的龙有审批权限 | `v14_5_2 + v14_8_2` | power |

攻略重点：**不要把Progress冲到72以上**，否则组织层先吃掉Joint。

---

# 5. v14 Event回响（27）

共同条件：

- 对应事件实际被抽到；
- 做出对应choice；
- Progress≥60；
- Heart/Trust/Morale>0；
- 第18章最终route与事件choice route一致；
- 最好保持 Progress 60–74；
- 不命中更高优先级结局。

## Event 0 · 一张容量表能装几个人

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_0_0` | 资源表终于有减号 | 明确容量并删无资源里程碑 | govern |
| `v14_0_1` | TBD负责到凌晨 | 全节点先答应 | appease |
| `v14_0_2` | 不可替代直到不能请假 | 关键事项全收到自己手里 | power |

## Event 1 · 安全信号的传播顺序

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_1_0` | 没形成信号也要看见事实 | 先事实和医学判断 | govern |
| `v14_1_1` | 十七页解释一个否定句 | 先按未形成signal出材料 | appease |
| `v14_1_2` | 把事实吵成阵营 | 公开指责PV | power |

## Event 2 · 最终版的最后一个签名

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_2_0` | 晚半小时，少十年解释 | 找回医学Owner并重确认 | govern |
| `v14_2_1` | 元数据比人诚实 | 先提交后补签 | appease |
| `v14_2_2` | 签字权是最后一口锅 | 自己替所有人签 | power |

## Event 3 · 中心多出来的一百个小时

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_3_0` | 少一次访视，多一点人性 | 量化患者负担并找替代 | govern |
| `v14_3_1` | 总部绿灯，中心红灯 | 直接增加访视 | appease |
| `v14_3_2` | 正确决定的错误传达 | 直接否决 | power |

## Event 4 · 这张中期图能不能上会

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_4_0` | 十二个人不是全部世界 | 标探索性/人数/限制 | govern |
| `v14_4_1` | 附录里的分母 | 先按老板要求上会 | appease |
| `v14_4_2` | 把统计正确说成了人身攻击 | 当众撤图并攻击判断 | power |

## Event 5 · 上市以后谁有资格说医学

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_5_0` | 业务和医学各答各的 | 分开业务目标/医学问题 | govern |
| `v14_5_1` | 医学负责最后一个句号 | 市场先定方向 | appease |
| `v14_5_2` | 围墙里的正确 | Clinical接管 | power |

## Event 6 · 预算会里的沉默项目

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_6_0` | 新增一项，必须删一项 | 明确价值成本并取舍 | govern |
| `v14_6_1` | 原则同意不能付款 | 全保留，下季申请 | appease |
| `v14_6_2` | 优先级长着老板的脸 | 砍二老板探索项 | power |

## Event 7 · 主要终点的第四种说法

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_7_0` | 预设终点还活着 | 保持预设，新增探索项 | govern |
| `v14_7_1` | 摘要先于方案诞生 | 先换摘要口径 | appease |
| `v14_7_2` | 会议纪要成了证人 | 当场列出三次旧说法 | power |

## Event 8 · 谁能在你请假时做决定

| ID | 名称 | 事件选择 | 最终route |
|---|---|---|---|
| `v14_8_0` | 你请假，项目还在 | 给真实决策边界 | govern |
| `v14_8_1` | 再忙过这一阵 | 不交接 | appease |
| `v14_8_2` | 全公司等你点同意 | 自己做最终审批人 | power |

---

# 6. NPC / 私人关系结局（6）

> 成功型NPC结局位于组织层之后，因此建议把Progress控制在60–71。

## nc_xiaoyuan · 元老的船

- Progress 60–74最安全
- 小圆≥43
- 最终route=Govern

## nc_caolan · 商业化的门

- Progress 60–74最安全
- 曹兰≥50
- 最终route=Govern

## nc_ruidong · 毒理的答案

- Progress 60–74最安全
- 瑞冬≥36
- 最终route=Govern

## nc_heina · 对面的椅子

- Progress 60–74最安全
- 黑娜≥35
- Dragon≥6
- 最终route=Power

## nc_weilai · 财务的计算器

- Progress 35–59
- 苏苏≥50

## nc_love · 有人记得你几点下班

- Progress 35–49
- 隐藏爱情三幕完成，`flags.love=true`
- Heart≥50
- Dragon≤6

注意：项目成功后，爱情只追加私人生活尾声，不覆盖职业主结局。

---

# 7. Generic / 中结局（5）

## be_island · 孤岛

- 未被更高层结局覆盖
- 所有NPC关系最大值≤30

推荐玩法：持续只做事/收权，不经营任何人。

## mid_halfbridge · 半座桥

- Progress 35–59
- Trust≥45
- Morale≥45
- Sanity≥35

## ge_survive · 幸存者

两类入口：

1. Progress 35–59，Trust/Morale/Sanity均≥35，但没达到半座桥；
2. **Progress 60–74，未命中更具体成功结局**。

第二条是v14.5.1恢复的成功项目兜底，防止resolver返回null。

## be_trust · 完美替罪羊

终局generic入口：

- Progress 35–59
- Trust/Morale/Sanity至少一项低于35
- 且未更早死亡

也可在Trust≤0时被即时死亡检查直接触发。

## be_progress · 项目祭天

终局generic入口：

- Progress<35

也可在Progress≤0时被即时死亡检查直接触发。

---

# 8. 即时终局（7类真实入口）

## be_heart · 凌晨三点的空椅子

- Heart≤0

## be_sanity · 精神离职

死亡检查顺序要求：

- Heart>0
- Sanity≤0

## be_trust · 完美替罪羊

即时版：

- Heart>0
- Sanity>0
- Trust≤0

## be_morale · 树倒猢狲散

- Heart/Sanity/Trust仍>0
- Morale≤0

## be_progress · 项目祭天

- Heart/Sanity/Trust/Morale仍>0
- Progress≤0

## be_fraud · 签字的人

- 选择写入 `flags.fraud`
- 章节/事件结算后直接终局

## be_probation · 提桶走人

- chapterIdx≤2
- Trust≤24

## be_burnout · 人先上市了

- Stamina≤3
- Heart≤15

## be_vendor · Sponsor确认过

- `vendorCaptured=true`
- chapterIdx≥8
- Blame≥18

> `be_trust` 与 `be_progress` 同时拥有即时入口和终局generic入口，因此64图鉴只各算一个ID。

---

# 9. 当前可达性验证等级

### 已完整主循环验证

- `true_dragon`
- `ge_slayer`
- 组织结局代表路径
- v14 Event代表路径
- `nc_love`
- Generic/BE代表路径
- 34/34随机事件真实抽取
- 2/2 PI连锁真实触发

### 已规则witness但仍需逐ID固化完整攻略路径

- 其余低频v14 Event
- 5个Joint逐项完整随机路径
- 各NPC专属结局
- 部分组织细分结局
- `true_afterdragon`

因此当前状态仍是：

`64/64 RULE-WITNESSED`

而不是：

`64/64 FULL PLAYTHROUGH-WITNESSED`

---

# 10. 平衡原则

当前不因为某个长尾结局频率低就直接降门槛。

优先检查顺序：

1. 是否真实能抽到对应事件；
2. 是否真实能选到对应route；
3. 终章route是否正确记录；
4. 是否被错误的旧wrapper/flag阻断；
5. 是否有合法的Progress窗口；
6. 最后才考虑数值阈值。

压力模拟工具：

`tests/balance-sim.cjs`

平衡审计：

`BALANCE_AUDIT_RC.md`
