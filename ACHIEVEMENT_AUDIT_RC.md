# Dragon Office · RC Achievement Audit

基线：`rc-ending-integration/index.html`，2026-09-27。

## 结论

当前108个成就：

- 目录数量：108
- ID唯一：108/108
- 有真实 chapter/random-event source：108/108
- Orphan：0
- 缺失黑色幽默评述：0
- 评述唯一性：108/108
- 旧版硬编码 `unlockAchievement("aXX")`：0

状态：`108/108 SOURCED · 0 ORPHAN · 0 STALE HARD-CODED AUTO-UNLOCK · 108 UNIQUE COMMENTS`

## Source Map

### A. 主线选择：a1–a54

18章 × 3个正式 authored outcome，共54个。每个基础主线选择各有唯一成就。

动态第4/5状态选项不创造新ID，而是继承最近的 authored route / achievement / branch flag。它们属于同一个 outcome family，不额外膨胀图鉴。

### B. 早期随机事件：a55–a89

来自 v11/v12 随机事件。部分事件按选择区分成就，部分选择共享事件结果；a55–a89 均至少有一个真实选择来源。

### C. v13/v14事件级：a90–a108

- a90–a99：10个 character-driven random events，一事件一个成就；三个选择可共享该事件成就。
- a100–a108：9个 consequence events，一事件一个成就；三个选择共享事件成就，同时产生不同 branchFlag / ending echo。

## 已修复的发布级Bug

108目录重排后，旧99成就时代曾遗留一批按全局数值/结局硬编码自动解锁的 `aXX`。这些ID在108目录中已经换义，会造成“做A却解锁B名字”。

RC已删除这类旧硬编码来源。现在新周目解锁只认当前 choice/event 的 `achievement` 字段；migration只负责旧档迁移。

## 重复与幂等

### 合理共享

- v13/v14事件的三个选择共享同一事件成就：设计行为。
- contextual第4/5选项继承 authored slot：同一 outcome family。

### 必须幂等

同一个achievement ID无论因重复回调、重复渲染或旧档再次加载被请求多少次，都只能首次加入图鉴和首次发放对应轮回收益。现有 `unlockAchievement()` 对已解锁ID直接返回；smoke同时检查旧档迁移保留既有NG点。

### 禁止来源

- ending ID / 数值阈值不得硬编码映射到已经重新定义的 `aXX`；
- migration不得在新周目运行时制造额外source；
- QTE callback不得绕过choice/event source临时发一个目录成就。

## 随机事件可达性

最终普通随机池 `V11_EVENTS` 当前34个事件；v13/v14均已append进入。基础权重不会把任何事件永久降为0。

PI连锁和跨周目meta事件可以优先截获一次普通随机入口，但均有一次性flag，不会永久删除普通随机事件。

## 黑色幽默comment质量门槛

机器检查只证明108条comment存在且唯一，不代表文案已经足够像角色本人。最终人工审校继续按以下规则：

1. 先写玩家刚造成的具体后果；
2. 能绑定NPC时，使用其稳定行为模式，而不是通用“职场吐槽”；
3. 成就名负责第一层笑点，comment负责第二刀；
4. 通常1–2句；
5. 笑点来自流程、权责、汇报线、组织荒谬，不攻击现实人物外貌或身份。

## 与RC总门禁的关系

Achievement layer 本身当前可以从P1 blocker降级为 **PASS AT STATIC/VM LAYER**。

仍随整包一起做的回归：

- 浏览器真实重复点击 / stale callback；
- 损坏旧档和重复migration；
- 全Choice replay；
- Monte Carlo检查某些随机事件是否因权重/截获机制变成实际极低频。

成就层不再是当前主要发布阻断；当前主要阻断见 `RELEASE_AUDIT_RC.md` 的 RC-06（仍有PLACEHOLDER/待数值测试的角色成长与能力机制）。