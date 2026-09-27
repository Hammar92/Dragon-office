# Dragon-office v14.4 Bug Audit

## 结论

本轮针对当前 `main` 的初始化、人物引用、章节/事件目录、选项执行、爱情隐藏线、人生构筑、成就、结局优先级和 UI 事件入口做了系统检查。

当前运行时目录保持：

- 26 个 Canon NPC / 26 份人物小传
- 18 个主线章节
- 34 个标准随机事件
- 2 个 PI 连锁事件
- 108 个成就
- 64 个主结局

## 本轮实际发现并修复的问题

### 1. 爱情线状态被压成一个布尔值

旧实现主要依赖 `flags.love`。这会把以下完全不同的状态压成同一个结果：

- 入职时已有稳定伴侣 / 家庭
- 离婚后已经完成重建
- 主动且满意地长期单身
- 因背叛而处于防御状态
- 游戏过程中认识新伴侣

v14.4 新增 `relationshipArc`，保存 `origin/current/homeBond/source/seen`，主结局后根据初始婚恋状态和本局发展追加不同私人生活尾声。

### 2. 爱情线并不真正隐藏

HUD 原来会直接显示“💗 有人等你”，等于提前把隐藏线告诉玩家。

v14.4 已删除这个 HUD 明示。爱情/家庭状态仍参与 Heart 恢复和事件判定，但只在私人事件与最终尾声中被解释。

### 3. 初始人生构筑可以出现互相矛盾的婚恋经历

v13.2 后补的一批婚恋经历没有继承同阶段 `exclusive` 规则，因此同一人生阶段理论上可以同时选择“结婚 / 离婚 / 长期单身 / 私生活空白 / 再婚”等矛盾状态。

v14.4 将各阶段婚恋类经历统一为阶段互斥组：

- school_romance
- college_romance
- graduate_romance
- early_romance
- middle_romance
- senior_romance

### 4. 稳定家庭误走“认识新的人”事件池

旧系统没有区分已有伴侣与新关系，稳定家庭 Build 仍可能进入“便利店等你 / 高铁共享耳机”等新恋爱语义。

v14.4 对已有稳定伴侣 / 家庭改为 HOME_EVENTS：

- 饭已经热过两次
- 这个周末原本没有项目
- 你最近回家以后不说话

根据 homeBond 可维持关系，也可能进入 estranged。

### 5. true_dragon 结局存在重复段落

“你其实也想过走。后来算了……”整段在同一结局中重复两次。

已删除重复段，当前源码仅保留一次。

### 6. 成就只有名字，没有人物化评述

108 个成就过去只显示标题，未把 NPC 人物小传反映进成就层。

v14.4 为全部 108 个成就增加 `comment`，按对应章节/事件的主要 NPC 生成一小段黑色幽默评述。未解锁成就仍保持隐藏。

### 7. smoke test 的假 DOM 已落后于 v14.3 UI

新版三栏养成 UI 使用 `parentNode / insertBefore / children / nextSibling`，旧 smoke mock 不完整，可能测试代码先于游戏逻辑报错。

已更新 `tests/smoke.cjs` 的 DOM harness。

## 已执行的运行时检查

### 目录与 ID

- NPC 引用错误：0
- 重复主线 ID：0
- 重复随机事件 ID：0
- 重复成就 ID：0
- 重复 HTML id：0
- 缺失 onclick handler：0
- LIFE_EVENT 重复 ID：0

### 选项执行

对当前：

- 18章 × 3基础选项
- 34随机事件 × 3基础选项
- 2个PI连锁事件 × 3选项

共 162 个 Choice 对象逐一执行 `presentedChoice → applyChoice`。

结果：

- 执行异常：0
- NaN 状态：0
- 非 Canon NPC delta：0
- 非 Canon lock/witness：0

### 婚恋状态场景验证

已实际构造并验证：

- mid_marriage → partnered_family
- mid_divorce → divorced_rebuilt
- mid_single → single_content
- mid_betrayal → guarded
- senior_secondmarriage → partnered_family

各状态会进入不同私人生活尾声。

## 当前仍存在的设计债

### A. 选项结构仍然过于固定

18章和34个标准随机事件的基础数据仍普遍为固定 3 选 1。

当前理智系统主要改变措辞和代价，但还没有真正做到：

- 高理智出现更精细的第4选择
- 高洞察出现“看穿问题”的特殊选择
- 低 Heart 出现逃避/妥协选择
- 低 Sanity 出现冲动、讽刺或直接退出选择
- 高 Power / 高关系 / 特定人生经历解锁额外路径

这是下一版应优先解决的问题，但不建议与本轮 Bug 修复混在一起，因为会同时影响成就槽位和结局频率。

### B. 多年代代码包装仍然较深

`index.html` 仍由 v7–v14 多层 wrapper 组成。当前初始化通过，但整段删除旧版本代码有较高回归风险。

下一轮代码清理应先做函数依赖图，再逐层合并。

### C. 64结局的概率分布仍需 Monte Carlo

本轮验证的是目录、条件链和可执行性，不等于已经证明 64 个结局的自然出现概率合理。

下一轮平衡应独立运行大样本模拟，检查：

- 不可达结局
- 低于目标频率的隐藏结局
- v14事件回响是否挤压主线结局
- true_dragon 是否仍“可刻意达成但不会随手撞上”
- 爱情尾声是否改变主结局分布（设计上不应改变）
