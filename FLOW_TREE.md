# Dragon-office v14.5 · 全事件流树

> 生成自当前 `main/index.html`。用于排查可达性、分支条件、成就映射和后续平衡。  
> **爱情/婚恋线为隐藏系统**：游戏过程中不展示路线进度，本文件作为开发攻略会完整列出。

## 0. 总状态机

```text
开局人生构筑
├─ 年龄 / 性别
├─ 六项能力 + 人格 + 体力/心力
└─ 婚恋历史 → relationshipArc（隐藏）
      ↓
第 N 章主线
├─ 3 个基础选择
├─ +0~2 个状态选择（心力 / 理智 / 情绪控制 / 管理 / 洞察 / 权力 / 人生词条）
│    └─ 状态选择继承最近的主线 route / achievement / branch flag
├─ 结算 → 死亡线检查
├─ 条件随机事件 / PI 连锁事件
├─ 指定章节会议 QTE
├─ 隐藏私人关系事件
├─ 电话事件
├─ 章节被动结算
└─ 下一章
      ↓
第 18 章
└─ 最终判定 → 主线结局 / NPC结局 / 隐藏结局 + 私人生活尾声
```

### 固定死亡线优先级
`Heart≤0 → be_heart` → `Sanity≤0 → be_sanity` → `Trust≤0 → be_trust` → `Morale≤0 → be_morale` → `Progress≤0 → be_progress`.

### 随机事件基础概率
- 剧情模式：34%
- 标准模式：53%
- 困难模式：72%
- 已发生随机事件本周目不重复。
- 后续未解决后果会增加特定事件权重，例如 CRO 责任、PVP 医学判断、资源不足、MK–N 冲突等。

### 当前会议 QTE 章节
第 4、5、7、9、13、14、15、16 章；每次 3 轮。

---

## 1. 18章主线树

### 第 1 章 · 试用期 · 第2周 · 五个会以后
- 场外人物：**明夜** — 她上午已经听过一次。你下午最好还是从背景讲。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 明天只带两个方案，请她最后选一个。 | govern | trust+4 / progress+5 | zihan+3 | a1 | set:main_1_1 |
| 2 | 今天先把方向定了，措辞会后再改。 | power | trust-5 / progress+9 / power+3 | mingye+4 | a2 | set:main_1_2 |
| 3 | 所有comment逐条接下，今晚全改。 | appease | trust+7 / progress-5 / heart-7 | — | a3 | set:main_1_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 2 章 · 试用期 · 第1个月 · 三个项目都最重要
- 场外人物：**K总** — 如果每件事都是P0，就等于没有P0。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 把三件事按‘今天不做会发生什么’排成一页，请她划掉一个。 | govern | progress+8 / power+3 / trust-2 | kzong+7 | a4 | set:main_2_1 |
| 2 | 三条线一起开工。 | appease | trust+6 / stamina-10 / heart-6 / morale-4 | yangyang+4 | a5 | set:main_2_2 |
| 3 | 「做不到。要么加人，要么减事。」 | power | trust-9 / power+6 / morale+5 | kzong+5 | a6 | set:main_2_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 3 章 · Phase I · 一页，最后变成十七页
- 场外人物：**苏苏** — 老板要的是结论，不是数据仓库。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 第一页只留三句话：发生了什么、怎么看、下一步做什么。 | govern | progress+7 / power+4 | weilai+6 / zihan+4 | a7 | set:main_3_1 |
| 2 | 现场从17页里帮她找答案。 | appease | trust+5 / heart-5 / progress+2 | weilai-2 | a8 | set:main_3_2 |
| 3 | 继续补数据，确保‘完整’。 | appease | trust+4 / progress-6 / stamina-8 | — | a9 | set:main_3_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 4 章 · Phase I · 昨天已经定过
- 场外人物：**则韩** — 我把昨天的决定和理由写成三行了。别拿它去证明谁记错，只拿它救项目。
- **会后进入会议 QTE**（3轮）。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 「昨天选A是因为这三个原因。现在如果有新信息，再把B打开。」 | govern | progress+7 / trust+1 / power+3 | zihan+6 | a10 | set:main_4_1 / record:doseMatrix |
| 2 | 「您昨天明确说的是A。」 | power | trust-10 / power+4 / sanity+3 | mingye+5 | a11 | set:main_4_2 |
| 3 | 不说，重新做B。 | appease | trust+5 / progress-8 / stamina-7 | — | a12 | set:main_4_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 5 章 · Phase II · PVP先别说
- 场外人物：**PVP** — 刚才Clinical问我那个case，我没回。加琳说先统一口径。
- **会后进入会议 QTE**（3轮）。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 让PVP先讲医学判断；流程怎么对外另定。 | govern | power+5 / progress+4 | pvp+8 / jialin-6 / xiaoen+5 | a13 | set:main_5_1 / record:safetyTrail |
| 2 | 顺着加琳，先统一口径。 | appease | trust+3 / progress-3 | jialin+6 / pvp-6 | a14 | set:main_5_2 |
| 3 | 让加琳直接给结论。 | power | progress+1 | jialin+4 / xiaoen-4 / pvp-4 | a15 | set:main_5_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 6 章 · Phase II · 瑞冬再查一下
- 场外人物：**瑞冬** — 我晚点再给您一版，我想把机制再核一下。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 只让她回答：看到了什么、怎么判断、对临床意味着什么，并给出处。 | govern | progress+6 / power+3 | ruidong+2 / xiaoen+3 | a16 | set:main_6_1 |
| 2 | 替她把错误改掉，不提。 | care | trust+2 / progress+2 / heart-4 | ruidong+5 | a17 | set:main_6_2 |
| 3 | 会上直接问：「你自己到底懂不懂这个study？」 | power | power+3 / trust-3 / morale-3 | ruidong-10 / ceo-6 | a18 | set:main_6_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 7 章 · Phase II · 请Sponsor发个邮件
- 场外人物：**黑娜** — 为了后续记录清楚，最好由Sponsor这边确认。
- **会后进入会议 QTE**（3轮）。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 先让CRO把事实时间线和各自责任写清楚。 | govern | progress+5 / power+4 | kzong+7 / heina+4 / zhuzong-3 | a19 | set:main_7_1 / record:approvalChain |
| 2 | 让朱粽照发，先把事推进。 | appease | progress+4 / blame+8 | zhuzong+6 / heina+5 / xiaoen-7 | a20 | set:main_7_2 |
| 3 | 直接让黑娜自己发。 | power | progress+1 / power+2 | heina-6 / kzong+2 | a21 | set:main_7_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 8 章 · Phase II · 这个PI我来聊
- 场外人物：**Parker** — 新领域而已，专家关系都差不多，多见两次就熟了。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 接过话题，讲研究问题和两个没想清楚的地方，请MK主任挑。 | govern | progress+6 / piRep+5 | houpi+8 / parker-2 | a22 | set:main_8_1 |
| 2 | 顺着Parker，先把关系做热。 | appease | trust+2 / piRep-2 | parker+7 / houpi-3 | a23 | set:main_8_2 |
| 3 | 当场让Parker回答人群选择。 | power | power+2 | parker-8 / houpi-2 | a24 | set:main_8_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 9 章 · Phase II · 谁的研究
- 场外人物：**N院长** — 主研究谁leading我不是特别在意。我更想知道机制这块谁来做。
- **会后进入会议 QTE**（3轮）。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 主研究、机制子研究和长期随访分别写清负责人。 | govern | progress+7 / power+4 / piRep+6 | houpi+6 / niupi+7 | a25 | set:main_9_1 / record:imActions |
| 2 | 两边都叫Co-Leading。 | appease | trust+5 / progress+1 | houpi-4 / niupi-4 | a26 | set:main_9_2 |
| 3 | 只保MK主任为Leading。 | power | progress+3 / piRep-2 | houpi+6 / niupi-9 | a27 | set:main_9_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 10 章 · 长期随访 · 样本留了吗
- 场外人物：**明夜** — PR转CR那两个人我拉了曲线。N院长已经问三遍有没有PBMC。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 主线做长期随访，机制另立子研究，共用一套样本和统计计划。 | govern | progress+7 / career+3 | niupi+8 / houpi+5 / mingye+4 / zihan+4 | a28 | set:main_10_1 |
| 2 | 全部塞进一个摘要，先抢时间。 | appease | progress+5 / piRep-4 | niupi-6 / houpi-2 | a29 | set:main_10_2 |
| 3 | 只做机制，主结果晚点。 | power | progress-4 / career+2 | niupi+7 / houpi-6 | a30 | set:main_10_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 11 章 · Phase III · 我们中心做了这么多
- 场外人物：**林主任** — 上次说后续研究优先考虑我们，这句话我还记得。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 把主文、亚组、后续研究按实际贡献一起排成计划。 | govern | piRep+6 / progress+4 | zhangpi+8 | a31 | set:main_11_1 |
| 2 | 告诉他作者名额有限，请理解。 | appease | progress+2 / piRep-4 | zhangpi-8 | a32 | set:main_11_2 |
| 3 | 先答应一个后续substudy。 | appease | progress+5 | zhangpi+5 | a33 | set:main_11_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 12 章 · Phase III · 林丹总能出现
- 场外人物：**琳琳** — 前面两周没人追，老板一问，今天所有人都开始要CRA晚上给。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 危机处理功劳给林丹，后续核查、关闭和复盘分别写清owner。 | govern | morale+6 / progress+5 / power+3 | linan+5 / miaomiao+6 / xiaoen+4 | a34 | set:main_12_1 |
| 2 | 既然林丹接手，就让她全包到底。 | power | progress+3 | linan-4 / miaomiao+3 | a35 | set:main_12_2 |
| 3 | 当众问：「前两周你怎么没这么积极？」 | power | power+3 / morale-4 | linan-10 | a36 | set:main_12_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 13 章 · Phase III · 再拉个专项会
- 场外人物：**杨杨** — 风险这么多，今晚最好把所有人都拉上。
- **会后进入会议 QTE**（3轮）。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 只留真正要决定的三个人，30分钟定方案，再发全体。 | govern | progress+8 / morale+4 | kzong+6 / yangyang-3 / mingye+4 | a37 | set:main_13_1 |
| 2 | 全员参加，确保没人被漏掉。 | appease | trust+3 / stamina-8 / morale-5 | yangyang+6 | a38 | set:main_13_2 |
| 3 | 让钟时主持拍板。 | appease | trust+4 / progress-4 | yangyang+2 | a39 | set:main_13_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 14 章 · Phase III · D级工作，VP级签名
- 场外人物：**则韩** — 她把正文改了四个词，留了27个comment。没有一个碰到主问题。
- **会后进入会议 QTE**（3轮）。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 先解决2条真正影响结论的，语言意见放统一QC。 | govern | progress+7 / power+3 | zihan+6 | a40 | set:main_14_1 / record:writtenWarning |
| 2 | 27条逐条今天清零。 | appease | trust+6 / stamina-10 / heart-6 | linan+3 | a41 | set:main_14_2 |
| 3 | 回复每条comment解释为什么不改。 | appease | power+2 / progress-5 / heart-5 | — | a42 | set:main_14_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 15 章 · Pre-NDA · 老板问：你要我决定什么
- 场外人物：**老板** — 我不是来帮你读数据的。你要我决定什么？
- **会后进入会议 QTE**（3轮）。
- 动态章版本条件：`(S.power\|\|0`

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 直接说：「两个决定。第一，是否接受两周延迟；第二，是否追加资源。」 | govern | power+6 / progress+6 | ceo+5 / kzong+5 | a43 | set:main_15_1 |
| 2 | 替钟时继续讲38页。 | appease | trust+6 / stamina-8 / heart-5 | ceo-4 | a44 | set:main_15_2 |
| 3 | 让钟时自己回答。 | power | power+3 / trust-6 | ceo-2 | a45 | set:main_15_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 16 章 · NDA · 功劳怎么写
- 场外人物：**林丹** — 庆功PPT我可以帮忙整理，大家贡献都写得好看一点。
- **会后进入会议 QTE**（3轮）。

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 按里程碑列贡献人和证据，不做排名。 | govern | career+5 / power+4 / morale+5 | mingye+6 / kzong+5 / linan+2 | a46 | set:main_16_1 / record:authorshipTrail |
| 2 | 统一写‘钟时领导下的团队成果’。 | appease | trust+9 / morale-7 / career-3 | mingye-8 / kzong-5 | a47 | set:main_16_2 |
| 3 | 把自己的名字放在最前面。 | power | power+8 / morale-8 / dragon+5 | linan+3 / mingye-6 | a48 | set:main_16_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 17 章 · NDA · 项目做成以后
- 场外人物：**二老板** — 药做出来是一件事。这个组织以后还怎么做下一件，是另一件。
- 动态章版本条件：`flags.power_claim`

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 把决策权、专业owner、资源和会议规则写成新的运行方式。 | govern | progress+10 / power+6 / morale+6 / career+5 | cso+6 / kzong+6 / xiaoen+5 / zihan+4 | a49 | set:main_17_1 |
| 2 | 项目做成就够了，别再碰组织。 | appease | progress+8 / career+4 | ceo+3 | a50 | set:main_17_2 |
| 3 | 让所有人以后都直接听你。 | power | power+12 / dragon+8 / morale-6 | ceo-3 / cso-2 | a51 | set:main_17_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

### 第 18 章 · 终局 · 下一项项目
- 场外人物：**K总** — 这次交付了。下次谁来做决定？
- 动态章版本条件：`flags.shadow_capture\|\|flags.power_claim`

| 路径 | 选择 | route | 状态影响 | NPC影响 | 成就 | 后续标记 |
|---|---|---|---|---|---|---|
| 1 | 把本次的决策规则、专业owner和升级路径写进下一项目的启动章程。 | govern | progress+8 / morale+6 / power+3 | kzong+5 / zihan+4 / xiaoen+4 | a52 | set:main_18_1 |
| 2 | 先按旧流程启动，等真的卡住再调整。 | appease | trust+5 / progress+3 | zouting+2 | a53 | set:main_18_2 |
| 3 | 以后所有关键决定都先交给你。 | power | power+10 / dragon+6 / morale-5 | kzong-3 / mingye-3 | a54 | set:main_18_3 |

**状态追加选项：** 满足条件时最多再出现 2 项；Heart≤30、Sanity≤45/情绪控制低、管理≥50+高自控、洞察≥50+“不轻易交付信任”、Power≥65、或“稳定后方”均可能打开额外路径。

---

## 2. 34个随机事件池

### R1. 62条Comment · `v11e_comment`
- **1** 先标出3条会改变结论的，今晚只关这3条。 → route=govern；progress+4 / power+2；NPC zihan+5；成就 a55
- **2** 62条逐条回复。 → route=appease；trust+5 / stamina-8 / heart-5；NPC —；成就 a56
- **3** 给每条comment写一段为什么不改。 → route=power；progress-4 / heart-4；NPC —；成就 a57
### R2. 大家辛苦一下 · `v11e_resource`
- **1** 把四块工作按停一天的后果排出来，要求现场删一块。 → route=govern；power+3 / progress+4；NPC kzong+6；成就 a58
- **2** 全部接住。 → route=appease；trust+4 / stamina-9 / heart-6；NPC —；成就 a59
- **3** 把最重要的一块直接交给林丹。 → route=power；progress+3；NPC linan+5；成就 a60
### R3. 这段话怎么这么熟 · `v11e_ai`
- **1** 不猜来源，只要求每个关键判断都能回到原始报告。 → route=govern；progress+4；NPC ruidong+1 / xiaoen+3；成就 a61
- **2** 当群里问：「这是AI写的吗？」 → route=appease；power+2 / morale-3；NPC ruidong-9 / ceo-3；成就 a62
- **3** 直接帮她把错误修掉。 → route=power；progress+2 / heart-3；NPC ruidong+4；成就 a63
### R4. 老板刚问过 · `v11e_visible`
- **1** 让林丹接Visible汇报，同时把后台核查也明确给她。 → route=govern；progress+4 / power+2；NPC linan+2 / miaomiao+4；成就 a64
- **2** 只让她对老板汇报，后台继续由CRA做。 → route=appease；trust+3 / morale-4；NPC linan+6 / miaomiao-6；成就 a65
- **3** 当众提醒这件事已经挂了一周。 → route=power；power+2；NPC linan-7；成就 a66
### R5. 为了记录清楚 · `v11e_cro`
- **1** 先把事实、责任和decision owner分开，再决定谁发。 → route=govern；progress+4 / power+3；NPC kzong+6 / heina+3；成就 a67
- **2** 让朱粽发，先把问题关掉。 → route=appease；progress+3 / blame+6；NPC zhuzong+4 / heina+4 / xiaoen-5；成就 a68；branch:v11_cro_sponsor_mail
- **3** 把邮件退给CRO：「你们的问题你们自己解释。」 → route=power；power+2 / progress-2；NPC heina-5；成就 a69
### R6. 统一出口 · `v11e_pvp`
- **1** 私下问PVP他的医学判断，再和加琳确认正式出口。 → route=govern；progress+3；NPC pvp+5 / jialin-2；成就 a70
- **2** 只等加琳统一回复。 → route=appease；trust+2；NPC jialin+4 / pvp-3；成就 a71
- **3** 群里直接追问PVP：「我问的是你的判断。」 → route=power；power+3；NPC pvp+4 / jialin-6；成就 —
### R7. 关系很好 · `v11e_pi`
- **1** 让他把主任真正问过的三个问题写下来。 → route=govern；progress+3；NPC parker+1；成就 a72
- **2** 既然关系好，下次继续让Parker单独去。 → route=appease；trust+2 / piRep-2；NPC parker+5 / houpi-3；成就 a73
- **3** 下次你和统计一起去。 → route=power；piRep+4 / progress+3；NPC houpi+4 / mingye+3 / parker-2；成就 —
### R8. Action已经Close · `v11e_zhuzong`
- **1** 把‘Action完成’和‘风险关闭’拆成两列。 → route=govern；progress+4 / power+2；NPC xiaoen+5 / zhuzong-2；成就 a74
- **2** 既然CRO close了，就先过。 → route=appease；progress+3 / blame+5；NPC zhuzong+4 / xiaoen-5；成就 a75
- **3** 让朱粽现场解释为什么可以close。 → route=power；power+3；NPC zhuzong-7 / xiaoen+3；成就 —
### R9. 两份会议纪要 · `v12e_minutes`
- **1** 回到录音和会中明确的decision句，只保留一版。 → route=govern；progress+4 / power+2；NPC zihan+5 / yangyang-2；成就 a76
- **2** 两版都留，免得得罪人。 → route=appease；trust+3 / progress-2；NPC —；成就 a77
- **3** 让钟时选哪版。 → route=power；trust+5；NPC —；成就 —
### R10. 武总来推动一下 · `v12e_wuzong`
- **1** 先让武总说清业务问题，再由Medical定义科学问题。 → route=govern；progress+4 / power+2；NPC wuzong+3 / caolan+4；成就 a78
- **2** 按武总排期先出一版。 → route=appease；progress+5 / stamina-5；NPC wuzong+5；成就 a79
- **3** 告诉他上市后医学不是他能拍板的。 → route=power；power+4 / trust-3；NPC wuzong-6；成就 —
### R11. 产品数据谁记得 · `v12e_xianren`
- **1** 让贤人只负责专家反馈，产品数据和证据由曹兰/Medical准备。 → route=govern；progress+3；NPC xianren+2 / caolan+5；成就 a80
- **2** 让贤人自己补课，下次必须能讲。 → route=appease；progress+1；NPC xianren-2；成就 a81
- **3** 直接让曹兰代替贤人参加。 → route=power；progress+4；NPC caolan+6 / xianren-7；成就 —
### R12. 尽调前夜 · `v12e_bd`
- **1** 每个问题只准备一句结论、三条证据、一个风险。 → route=govern；progress+4 / career+2；NPC guyu+6；成就 a82
- **2** 把完整数据都放进主Deck。 → route=appease；trust+4 / stamina-5；NPC guyu-2；成就 a83
- **3** 让谷雨自己决定讲什么。 → route=power；progress+3；NPC guyu+4；成就 —
### R13. 苏苏突然要求多人参会 · `v12e_susu`
- **1** 按正式治理需求定义哪些会议需要哪些角色，不讨论个人动机。 → route=govern；progress+3；NPC weilai+3 / yangyang+2；成就 a84
- **2** 全部照苏苏要求拉人。 → route=appease；trust+3 / stamina-4；NPC weilai+5 / yangyang-3；成就 a85
- **3** 私下告诉杨杨这可能不是流程问题。 → route=power；power+2；NPC yangyang+5 / weilai-4；成就 —
### R14. 年轻人要多承担 · `v12e_ceo`
- **1** 把她当前错误率和工作量一起给老板看，建议减少scope。 → route=govern；power+3 / progress+2；NPC ceo-2 / ruidong+2 / kzong+4；成就 a86
- **2** 支持老板，多给机会才会成长。 → route=appease；trust+5；NPC ceo+5 / ruidong-2；成就 a87
- **3** 直接说她培养不出来。 → route=power；power+4 / trust-6；NPC ceo-8 / ruidong-5；成就 —
### R15. 同一个大会席位 · `v12e_mkn`
- **1** 按本次报告内容决定讲者，另一个方向单独安排后续舞台。 → route=govern；piRep+5 / power+3；NPC houpi+2 / niupi+3；成就 a88
- **2** 给MK主任，Leading PI优先。 → route=appease；piRep+2；NPC houpi+6 / niupi-5；成就 a89
- **3** 给N院长，谁有最新科学内容谁讲。 → route=power；piRep+2；NPC niupi+6 / houpi-5；成就 —
### R16. 老板突然问到一个数字 · `v13e_ceo_detail`
- **1** 先回答数字，再补一句这个数字对当前decision意味着什么。 → route=govern；progress+4 / power+2；NPC ceo+4 / mingye+3；成就 a90；branch:v13_ceo_number
- **2** 把完整分析表翻出来，从第一行开始讲。 → route=appease；trust+3 / stamina-3；NPC ceo-2；成就 a90
- **3** 让钟时自己回答。 → route=power；power+3 / trust-4；NPC ceo-1；成就 a90
### R17. 二老板随机深挖 · `v13e_cso_deepdive`
- **1** 让真正负责医学判断的人先回答，再由流程owner补充。 → route=govern；progress+4 / power+2；NPC cso+5 / pvp+4 / jialin-2；成就 a91；branch:v13_cso_owner
- **2** 大家轮流把自己知道的部分都讲一遍。 → route=appease；trust+3 / stamina-5；NPC —；成就 a91
- **3** 直接指出PV职责边界不清。 → route=power；power+5 / morale-3；NPC cso+3 / jialin-7；成就 a91
### R18. 老板一句话，小圆一张表 · `v13e_xiaoyuan_translate`
- **1** 和小圆一起把‘快一点’翻成两个可执行动作。 → route=govern；progress+6；NPC xiaoyuan+6；成就 a92；branch:v13_translate
- **2** 先把所有部门都叫来brainstorm。 → route=appease；trust+3 / stamina-5；NPC yangyang+3 / xiaoyuan-2；成就 a92
- **3** 告诉老板现有timeline已经最优。 → route=power；power+4 / trust-4；NPC ceo-3 / xiaoyuan+2；成就 a92
### R19. HR建议做一次工作坊 · `v13e_hr_patch`
- **1** 先把职责和decision rights写出来，再决定是否需要工作坊。 → route=govern；progress+4 / power+2；NPC zouting+2 / kzong+5；成就 a93；branch:v13_hr_structure
- **2** 先做工作坊，关系好了再谈职责。 → route=appease；morale+4 / progress-2；NPC zouting+6；成就 a93
- **3** 直接说这是组织设计问题，不是沟通问题。 → route=power；power+4 / trust-3；NPC zouting-4 / kzong+3；成就 a93
### R20. 这个文件为什么你们看不到 · `v13e_yijian_secret`
- **1** 要求建立need-to-know清单，内容owner必须拿到原文。 → route=govern；progress+5 / power+2；NPC zihan+4 / yijian-2；成就 a94；branch:v13_reg_access
- **2** 尊重REG流程，让一建摘要转述。 → route=appease；trust+4 / progress-2；NPC yijian+5；成就 a94
- **3** 找老板要原文。 → route=power；power+5 / trust-5；NPC yijian-6 / ceo+1；成就 a94
### R21. 谁来讲产品 · `v13e_caolan_xianren`
- **1** 贤人负责专家关系和提问，曹兰负责证据内容，Medical把边界收住。 → route=govern；progress+4；NPC xianren+2 / caolan+5 / wuzong+3；成就 a95；branch:v13_postlaunch_roles
- **2** 让贤人自己讲，毕竟他是MA。 → route=appease；trust+3；NPC xianren+4 / caolan-2；成就 a95
- **3** 直接让曹兰主讲。 → route=power；progress+5 / power+2；NPC caolan+6 / xianren-6；成就 a95
### R22. BD最怕买方自己发现 · `v13e_guyu_safety`
- **1** 把case事实、医学判断和公司当前结论分三层准备。 → route=govern；progress+4 / career+2；NPC guyu+6 / pvp+3 / jialin-1；成就 a96；branch:v13_dd_safety
- **2** 按加琳口径，只在被问到时回应。 → route=appease；trust+3；NPC jialin+5 / guyu-3；成就 a96
- **3** 让谷雨自己决定怎么包装。 → route=power；progress+3；NPC guyu+4 / pvp-2；成就 a96
### R23. 又多一次访视 · `v13e_linline`
- **1** 先说清这次访视具体要降低哪个风险，再找替代方式。 → route=govern；progress+4 / morale+3；NPC miaomiao+6 / yangyang+1；成就 a97；branch:v13_visit_tradeoff
- **2** 安全优先，增加访视。 → route=appease；trust+3 / stamina-4；NPC yangyang+5 / miaomiao-5；成就 a97
- **3** 直接否掉：「不要为了管理感加访视。」 → route=power；power+4 / trust-3；NPC yangyang-6 / miaomiao+4；成就 a97
### R24. 午饭桌上的组织图 · `v13e_lindan_mingye`
- **1** 只把它当风向，不拿去做正式判断。 → route=govern；insight+3；NPC linan+3 / mingye+4；成就 a98；branch:v13_gossip_used
- **2** 马上调整站位，离那条线远一点。 → route=appease；power+2；NPC linan+4；成就 a98
- **3** 追问林丹消息源。 → route=power；insight+2；NPC linan-3 / mingye+3；成就 a98
### R25. 谁拥有医学判断 · `v13e_susu_wu`
- **1** 把业务目标、医学问题和最终医学判断拆开，分别定owner。 → route=govern；progress+4 / power+2；NPC weilai+5 / wuzong+2 / xianren+1；成就 a99；branch:v13_medical_boundary
- **2** 既然MA归武总，就由他统一。 → route=appease；trust+4；NPC wuzong+5 / weilai-4；成就 a99
- **3** 直接说武总没有医学判断权。 → route=power；power+5 / trust-4；NPC wuzong-7 / weilai+3；成就 a99
### R26. 一张容量表能装几个人 · `v14_capacity`
- **1** 明确每个人的容量，删掉一个没有资源的里程碑。 → route=govern；progress+3 / morale+5 / power+2；NPC kzong+5 / yangyang+2 / miaomiao+4；成就 a100；branch:v14_0_0
- **2** 先答应全部节点，之后靠加班补。 → route=appease；progress+5 / stamina-7 / morale-5；NPC kzong-3 / miaomiao-4；成就 a100；branch:v14_0_1
- **3** 把所有关键事项收到自己手里。 → route=power；power+6 / stamina-5 / dragon+2；NPC kzong-2 / yangyang-3；成就 a100；branch:v14_0_2
### R27. 安全信号的传播顺序 · `v14_safety_copy`
- **1** 先确认事实与医学判断，宣传措辞最后写。 → route=govern；progress+3 / trust-1；NPC pvp+5 / guyu+3 / jialin+2；成就 a101；branch:v14_1_0
- **2** 按「未形成signal」先出材料。 → route=appease；trust+5 / progress+2；NPC guyu-4 / pvp-3；成就 a101；branch:v14_1_1
- **3** 公开指责PV在掩盖风险。 → route=power；power+5 / trust-5；NPC jialin-7 / pvp+2；成就 a101；branch:v14_1_2
### R28. 最终版的最后一个签名 · `v14_signature`
- **1** 找回医学Owner，保留版本差异并重新确认提交包。 → route=govern；progress+2 / power+2；NPC xiaoen+5 / yijian+3；成就 a102；branch:v14_2_0
- **2** 先提交，回头补签。 → route=appease；progress+6 / trust+4 / blame+5；NPC xiaoen-6 / yijian+2；成就 a102；branch:v14_2_1
- **3** 你替所有人签，并要求他们以后向你报告。 → route=power；power+7 / dragon+4 / blame+4；NPC xiaoen-5 / zihan-3；成就 a102；branch:v14_2_2
### R29. 中心多出来的一百个小时 · `v14_site_time`
- **1** 量化患者负担，先试既有访视合并检查。 → route=govern；progress+4 / morale+3；NPC miaomiao+5 / niupi+4 / yangyang+1；成就 a103；branch:v14_3_0
- **2** 照建议加访视，中心自行协调。 → route=appease；trust+4 / progress+2；NPC miaomiao-6 / niupi-3；成就 a103；branch:v14_3_1
- **3** 直接否决，谁再提就自己去中心执行。 → route=power；power+5 / trust-3；NPC miaomiao+3 / yangyang-6；成就 a103；branch:v14_3_2
### R30. 这张中期图能不能上会 · `v14_interim`
- **1** 标注探索性、人数和限制，讨论真正需要的下一步。 → route=govern；progress+3 / career+2；NPC mingye+5 / zihan+4 / ceo-1；成就 a104；branch:v14_4_0
- **2** 先按老板要求上会，限制放附录。 → route=appease；trust+5 / power+2；NPC mingye-4 / zihan-3；成就 a104；branch:v14_4_1
- **3** 当众说老板不懂统计，把图撤掉。 → route=power；power+5 / trust-7；NPC ceo-8 / mingye+2；成就 a104；branch:v14_4_2
### R31. 上市以后谁有资格说医学 · `v14_postmarket`
- **1** 业务目标与医学问题分开，约定证据门槛和各自Owner。 → route=govern；progress+3 / power+2；NPC caolan+5 / weilai+4 / wuzong+2；成就 a105；branch:v14_5_0
- **2** 先让市场定方向，医学随后补材料。 → route=appease；trust+4 / progress+3；NPC wuzong+5 / caolan-4；成就 a105；branch:v14_5_1
- **3** Clinical接管研究，MA只负责传话。 → route=power；power+6 / dragon+2；NPC wuzong-7 / xianren-4；成就 a105；branch:v14_5_2
### R32. 预算会里的沉默项目 · `v14_budget`
- **1** 逐项说清决策价值与成本，请老板选择取舍。 → route=govern；power+3 / progress+2；NPC weilai+5 / cso+3 / ceo+1；成就 a106；branch:v14_6_0
- **2** 全留着，下一季度再申请预算。 → route=appease；trust+4 / progress-2；NPC weilai-5 / cso+2；成就 a106；branch:v14_6_1
- **3** 直接砍掉二老板的探索项，保留老板的新想法。 → route=power；power+5 / trust+2；NPC ceo+5 / cso-7 / weilai+1；成就 a106；branch:v14_6_2
### R33. 主要终点的第四种说法 · `v14_endpoint`
- **1** 维持预设分析，将新问题列为明确标注的探索项。 → route=govern；progress+4 / career+2；NPC zihan+5 / mingye+5；成就 a107；branch:v14_7_0
- **2** 先换口径写摘要，正式文件以后再对齐。 → route=appease；trust+5 / progress+2 / blame+4；NPC zihan-6 / mingye-5；成就 a107；branch:v14_7_1
- **3** 直接公布钟时之前三次说法，让她当场认错。 → route=power；power+6 / trust-6；NPC zihan+2 / mingye+2；成就 a107；branch:v14_7_2
### R34. 谁能在你请假时做决定 · `v14_successor`
- **1** 给杨杨和琳琳真实决策边界，留一张可交接的运行图。 → route=govern；morale+5 / power+2；NPC yangyang+4 / miaomiao+4 / kzong+4；成就 a108；branch:v14_8_0
- **2** 先不交接，忙过这一阵再培养。 → route=appease；progress+4 / stamina-4；NPC zouting+2 / yangyang-2；成就 a108；branch:v14_8_1
- **3** 指定自己为所有决定的最终审批人。 → route=power；power+7 / dragon+4 / morale-4；NPC kzong-5 / miaomiao-4；成就 a108；branch:v14_8_2

### 随机事件加权条件
- `v11e_cro`：若第7章走相应责任路径或 Blame>8，权重 +3。
- `v11e_pvp`：若第5章压住 PVP 或 PVP关系低，权重 +3。
- `v11e_visible`：当前主导路线为 appease，权重 +2。
- `v11e_resource`：Stamina<45，权重 +2。
- `v12e_ceo`：瑞冬关系较高，权重 +2。
- `v12e_mkn`：MK主任与N院长均较高，权重 +3。
- `v12e_susu`：苏苏关系较高，权重 +1。
- 跨周目 metaRoute 在第3章以后、且本周目尚未触发时，优先于普通随机池。

---

## 3. PI「按下葫芦浮起瓢」连锁

- **首次条件 A**：chapterIdx≥8、MK主任/N院长均≥32，且两人关系合计≥70、`piChainEvent1` 未触发 → **两个Leading，只有一个封面**。该阈值与“按下葫芦浮起瓢”的关系损耗联动校准：第9章治理选项真实结算约为 32/38，可直接打开连锁。
- **首次条件 B**：chapterIdx≥11、林主任≥35、且 `piChainEvent2` 未触发 → **中心贡献账不会自动归零**。

### 两个Leading，只有一个封面
- 1. 替VP分别安抚两边，暂时不谈边界。 → trust+4；NPC houpi+6 / niupi-6
- 2. 把主论文、机制论文、样本使用和decision right写成一页学术治理规则，在老板和两位PI面前确认。 → power+5 / progress+3；NPC houpi+5 / niupi+5；record:piGovernance
- 3. 让钟时继续逐个承诺，你只把每句话同步进会议纪要。 → power+3 / trust-5；NPC houpi+4 / niupi-4；record:piPromiseLog

### 中心贡献账不会自动归零
- 1. 先去安抚林主任，说后面还有机会。 → trust+3；NPC zhangpi+5 / houpi-4
- 2. 把中心贡献、额外工作量和学术回报做成公开台账，后续机会按贡献触发。 → power+4 / morale+4；NPC zhangpi+6 / houpi+3；record:piContributionLedger
- 3. 维持原安排，让钟时自己解释。 → trust+5 / progress-2；NPC zhangpi-7 / houpi+5

机制：安抚一个核心PI时，会降低冲突另一方关系；若玩家把冲突转成公开规则/边界/贡献台账，可获得老板侧与团队侧威信。

---

## 4. 隐藏婚恋 / 爱情树

```text
人生构筑最后一个有效婚恋经历
├─ partnered / partnered_family
│  └─ 不走“陌生来电”三幕线 → HOME_EVENTS
│      ├─ 第5章后：饭已经热过两次
│      ├─ 第10章后：这个周末原本没有项目
│      └─ 第14章后：你最近回家以后不说话
│          ├─ homeBond>0 → 关系维持
│          └─ homeBond≤0 → estranged → 结局交代疏离/分开
├─ strained
│  └─ 同样进入 HOME_EVENTS
│      ├─ homeBond恢复 → 关系重新建立边界
│      └─ homeBond继续下降 → 安静分开
├─ divorced_rebuilt
│  ├─ 后续隐藏线成功 → 新关系，但不写成“治愈”
│  └─ 未建立新关系 → 单身且完成重建
├─ single_content
│  ├─ 隐藏线成功 → 慢速进入关系，仍保留个人空间
│  └─ 未成功 → 继续单身；明确不是BE
├─ guarded（背叛/边界创伤）
│  ├─ 隐藏线成功 → 学会“边界≠拒绝关系”
│  └─ 未成功 → 没有新关系，作为代价而非失败
└─ open
   ├─ 线下随机约会累计 bond
   │   └─ bond≥10 → romanceSecure（只表示足够接近，不提前完成爱情线）
   └─ 三幕隐藏线
       A 23:47：Heart≤35 且第2章后
       B 周日：A后至少隔3章
       C 那句话：B后至少隔3章且 Heart≤55
           ├─ C选择坦白 → flags.love=true → new_partner
           └─ C拒绝/回避 → loveRouteDone，关系不强行成立
```

### 线下随机私人事件
- **楼下最后一家还开着的店**（最早 chapterIdx=3）
  - 坐下来吃完再回去，不打开电脑 → bond +3；heart+14 / sanity+5 / progress-2
  - 先处理最紧急的一封邮件，再把电脑收起来 → bond +2；heart+9 / sanity+3 / progress+1
  - 让她先回去，你还有两个小时 → bond -2；heart-7 / progress+5
- **出差回程的高铁**（最早 chapterIdx=6）
  - 合上电脑，和她听完一整张专辑 → bond +3；heart+16 / sanity+5 / progress-2
  - 先把必须当晚发出的 meeting minutes 发掉，然后合上电脑 → bond +2；heart+10 / progress+2
  - 一路把所有 follow-up 都清完 → bond -2；heart-6 / progress+6
- **发烧的周日**（最早 chapterIdx=8）
  - 请半天假，把电脑关掉 → bond +4；heart+18 / sanity+7 / progress-3 / trust-1
  - 只把明天必须由你确认的一页做完，然后休息 → bond +2；heart+11 / sanity+4 / progress+1
  - 说没事，不让她来 → bond -3；heart-8 / sanity-2
- **“你每次都说忙完这一阵”**（最早 chapterIdx=10，bond≥4）
  - 不解释项目，先承认这半年你确实把所有关系排在工作后面 → bond +4；heart+12 / sanity+6
  - 给出一个可执行边界：每周至少一个晚上不处理非紧急工作 → bond +5；heart+15 / sanity+5 / progress-1
  - 解释这次项目有多关键，希望她再理解一下 → bond -4；heart-9 / progress+2
- **周六下午四点**（最早 chapterIdx=12，bond≥7）
  - 去。手机只保留真正紧急联系人提醒 → bond +5；heart+22 / sanity+8 / progress-2
  - 去两个小时，然后回来处理必要工作 → bond +2；heart+12 / sanity+4 / progress+1
  - 还是算了，趁周末把下周材料做完 → bond -4；heart-10 / progress+6

### 电话事件
- “出来吃口东西吗？”（ph_friend_dinner）
- MK主任的电话（ph_pi_thanks）
- 林丹在楼梯间哭（ph_pm_breakdown）
- 凌晨 00:31（ph_vp_midnight）
- 明夜：“你现在方便说话吗？”（ph_mingye_gossip）
- “你最近是不是总在公司？”（ph_home）
---

## 5. 最终结局判定优先级（canonical RC）

> 生产代码由 `DragonEndingResolver` 单点判定；旧版多层 `finalizeEvaluation()` wrapper 不再拥有最终优先级。

```text
任何选择结算
├─ 即时终局层（不进入 final resolver）
│  ├─ Heart≤0 → be_heart
│  ├─ Sanity≤0 → be_sanity
│  ├─ Trust≤0 → be_trust
│  ├─ Morale≤0 → be_morale
│  ├─ Progress≤0 → be_progress
│  ├─ fraud → be_fraud
│  ├─ 试用期低信任 → be_probation
│  ├─ 极低Stamina+Heart → be_burnout
│  └─ vendorCaptured + 高Blame → be_vendor
│
└─ 第18章结束 → shouldDuel()
   ├─ Trust≤30 且 Merit≥55 → 5轮事实QTE
   │  └─ duelWin / duelLose 只改变最终状态，不占64公开结局ID
   └─ canonical final resolver
      P1 隐藏/跨周目
      ├─ echo周目拒绝龙椅 + Progress≥72 + Morale≥58 + Dragon<20 → true_afterdragon
      ├─ 主动接管 + Progress≥60 + Dragon≥10 + Power≥65 + Merit≥45 → true_dragon
      └─ 终章权力路线 + Dragon<10 + Power≥65 + ≥3支持者 → ge_slayer

      P2 整局职业轨迹
      ├─ ge_promotion
      ├─ ge_unsung
      ├─ ge_next
      └─ ge_firstline

      P2.5 整局组织运行模式（Progress≥72）
      ├─ ge_succession
      ├─ ge_puppetmaster
      ├─ ge_regent
      ├─ ge_coalition
      ├─ ge_court
      ├─ ge_system
      └─ ge_project

      P3 v14组合后果
      ├─ v14_joint_capacity
      ├─ v14_joint_paper
      ├─ v14_joint_site
      ├─ v14_joint_story
      └─ v14_joint_dragon

      P4 v14单事件回响
      └─ v14_0_0 … v14_8_2
         条件：最后一次v14 candidate存在，且第18章最终route与该选择route一致

      P5 NPC / 关系特化
      ├─ nc_xiaoyuan
      ├─ nc_caolan
      ├─ nc_ruidong
      ├─ nc_heina
      ├─ nc_weilai
      └─ nc_love（仅35≤Progress<60；项目做成后爱情只作为隐藏私人尾声）

      P6 普通生存/失败
      ├─ be_island
      ├─ mid_halfbridge
      ├─ ge_survive
      ├─ be_trust
      └─ be_progress
```

### v14组合结局真条件

| Ending | 历史选择 | 第18章 route |
|---|---|---|
| `v14_joint_capacity` | `v14_0_0 + v14_6_0` | govern |
| `v14_joint_paper` | `v14_1_0 + v14_2_0` | govern |
| `v14_joint_site` | `v14_3_0 + v14_6_0` | govern |
| `v14_joint_story` | `v14_4_1 + v14_7_1` | appease |
| `v14_joint_dragon` | `v14_5_2 + v14_8_2` | power |

### 婚恋与公开结局的关系

64个公开结局只描述职业/组织/项目主结果。婚恋初始状态与最终状态由 `relationshipEpilogue()` 追加，因此：

- 已婚/稳定伴侣不会被新爱情线覆盖；
- 离婚重建、自在单身、受背叛后谨慎、开放状态都有独立私人尾声；
- `nc_love` 只用于项目未完全成功但建立新关系的特化结果；
- 项目成功时，爱情不覆盖职业结局。

### RC可达性状态

- final resolver witness：57/57
- terminal-only witness：7/7
- 公开结局目录：64/64
- priority contract：36/36
- 当前结论：`64/64 RULE-WITNESSED`

## 6. 开发用检查点
- 主线章节：18
- 随机事件：34
- PI连锁：2
- 线下爱情事件：5
- 当前设计允许主线/随机事件从 3 个基础选项动态扩展到 4–5 个。
- 状态追加选项继承最近的既有 route / achievement / branch flag，因此不扩张108成就目录，也不会让后续分支失去来源。
