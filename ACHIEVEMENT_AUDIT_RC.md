# Dragon Office · RC Achievement Audit

基线：`rc-ending-integration/index.html`，2026-09-27。

## 结论

当前 108 个成就：

- 目录数量：108
- ID 唯一：108/108
- 有真实 chapter/random-event source：108/108
- Orphan：0
- 缺失黑色幽默评述：0
- 评述唯一性：108/108
- 旧版硬编码 `unlockAchievement("aXX")`：0

## Source Map

### A. 主线选择成就：a1–a54

18章 × 3个正式 authored outcome，共54个。每个基础主线选择各有唯一成就。

v14.5 的动态第4/5状态选项不会创造新ID，而是继承最近的 authored route / achievement / branch flag。其目的不是增加成就目录，而是保证状态选项仍进入既有分支网。

### B. 早期随机事件 outcome 成就：a55–a89

来自 v11/v12 随机事件。部分事件按选择区分成就，部分第三选项不另发成就；目录中的 a55–a89 均至少有一个真实选择来源。

### C. v13/v14 事件级成就：a90–a108

- a90–a99：10个 v13 character-driven random events，一事件一个成就；三个选择均可解锁同一事件成就。
- a100–a108：9个 v14 consequence events，一事件一个成就；三个选择均可解锁同一事件成就，同时选择各自产生不同 branchFlag 和结局回响。

## 本轮发现并修复的发布级 Bug

108目录重排后，旧99成就时代仍遗留一批硬编码自动解锁：

- `chapterIdx<=2 → a1`
- `Stamina<20 → a2`
- `Power>=55 → a11`
- `doseMatrix → a13`
- `Progress>=70 → a96`
- `Morale>=70 → a97`
- `Dragon>=18 / true_dragon → a95`
- `be_probation → a99`
- 任意 `ge_*` ending → a97

这些ID在108目录中已经有了完全不同的含义，因此会造成“做了A，却解锁B名字”的错误。

RC修复：删除所有旧硬编码ID自动解锁。现在解锁来源只认当前 choice/event 的 `achievement` 字段；`unlockAchievement()` 自身仍保持幂等，因此重复进入同一来源不会重复发放轮回点。

## 重复覆盖判断

### 合理重复

- v13/v14 的事件级成就：同一事件三个选择共享一个 achievement ID，属于设计行为。
- 动态第4/5选项继承 authored slot achievement：属于同一主线 outcome family，不新增图鉴项。
- `unlockAchievement()` 对已解锁ID直接 return，因此不会重复计轮回点。

### 不允许重复

- 结局、数值阈值、旧版本全局状态不得再硬编码解锁某个已被重新定义的 aXX。
- migration 只能迁移旧存档，不得在新周目运行时产生额外 achievement source。

## 随机事件可达性

最终普通随机池使用 `V11_EVENTS`，当前共34个事件；v13/v14事件均已 append 进入该池。基础 `eventWeight()` 不会把任何事件降为0，因此全部34个事件在多周目中均保留抽取可能。

PI连锁事件和跨周目 meta 事件会在满足条件时优先截获一次普通随机事件入口，但都有一次性 flag；不会永久把某个普通随机事件从全局池删除。

## RC Gate

Achievement layer 当前状态：

`108/108 SOURCED · 0 ORPHAN · 0 STALE HARD-CODED AUTO-UNLOCK · 108 UNIQUE COMMENTS`

后续仍需和最终 `main` 合并后的 smoke / migration 回归一起验证。
