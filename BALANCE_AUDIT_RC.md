# Dragon Office — RC Balance Audit

基线：Demo v14.6。  
目的：区分**逻辑Bug、理论可达但现实不可达、设计性高风险路线、纯长尾结局**，避免只凭一次游玩调整阈值。

## 1. 可重复模拟工具

仓库已新增：

`tests/balance-sim.cjs`

默认：

```bash
node tests/balance-sim.cjs
SIM_N=2000 SIM_SEED=20260928 node tests/balance-sim.cjs
```

它直接驱动 `index.html` 的真实运行函数，而不是伪造final state，覆盖：

- 18章正式选择
- 34普通随机事件
- 2个PI连锁
- 会议Battle QTE
- 最终事实决斗QTE
- 休息/复盘
- 电话事件
- 线下私人关系事件
- 已有伴侣 HOME_EVENTS
- 三幕隐藏爱情线
- chapter passives
- canonical final resolver

策略profile只是压力测试代理，不代表真实玩家：

- random
- govern
- appease
- power
- slayer
- dragon
- love_appease

## 2. 本轮通过压力测试发现并修复的结构性Bug

### B1. v14 Event/Joint 越级

旧canonical迁移后只看 candidate/route，没有保留旧版的项目成功门槛。

修复后必须：

- Progress≥60
- Heart>0
- Trust>0
- Morale>0

才允许 v14 Joint/Event 成为最终结局。

### B2. Progress 60–74 可能没有任何结局

组织结局从 Progress≥75 才开始，而早期canonical把 `ge_survive` 限成 Progress<60，造成60–71的一批合法状态返回 `null`。

回溯v11真实规则后恢复：

- Progress≥75：组织结局层
- Progress 60–74：若没有更具体终局，回落 `ge_survive`
- Progress 35–59：按半座桥/幸存者/信任失败处理

修复后压力代理未再出现 resolver `null`。

### B3. 分支终章吞掉 ge_slayer / career / NPC入口

v12分支终章使用：

- dragon_refuse / dragon_delay / dragon_take
- network_repeat / network_dissolve / network_chair

而不是基础第18章的 `main_18_1/2/3`。

因此“玩家实际选了Power路线”并不等于 `main_18_3=true`，导致 `ge_slayer` 被错误阻断。

修复：终章意图统一由 `v14FinalRoute` 优先表示，旧 `main_18_x` 只作为兼容fallback。

真实18章回放验证：

- final chapter = `v12_18_network`
- v14FinalRoute = power
- main_18_3 = false
- Progress 99
- Power 100
- Dragon 0
- Merit 100
- ≥60支持者 = 3

最终正确命中：

`ge_slayer`

### B4. 第一个PI连锁与“按下葫芦浮起瓢”互相打架

旧条件：MK主任≥38 且 N院长≥38。

但第9章治理选项本身会触发PI冲突关系损耗，真实结算从约31/31变成：

- MK主任≈32
- N院长≈38

因此38/38在新机制下反而把最合理的治理路线挡掉。

新条件：

- chapterIdx≥8
- 两人均≥32
- 两人关系合计≥70

真实第9章治理路径已进入 `pi_chain_lead`。

## 3. 当前频率信号

在全流程代理中，已经确认：

### 随机profile

能进入多类：

- ge_court
- ge_survive
- mid_halfbridge
- ge_firstline
- ge_project
- nc_love
- true_dragon
- v14单事件长尾
- 各类BE

说明默认路线没有被某一个final ending完全垄断。

### Govern偏好

主要集中在：

- ge_unsung
- ge_regent
- ge_court
- ge_system

同时 `true_dragon`、`ge_next` 等保持低频入口。

这是“整局治理/职业画像优先于最后一次随机事件”的预期结果。

### Appease偏好

在不主动维护私人生活时，Heart死亡极高。

这**暂时不判为Bug**。原 `costHeart()` 校准记录已经明确把“长期迎合、不断自我关闭”设计为高心力风险，并曾验证私人关系/爱情source能显著降低死亡。

因此不能为了让appease生存率好看，直接降低Heart成本。

### Power偏好

主要风险是：

- Trust死亡
- Heart死亡

这符合“强行集中权力有组织/关系成本”的设计，但后续仍应确认存在足够的中间路线，而不是只能死亡或成为龙。

## 4. 隐藏屠龙路线平衡

### true_dragon

定向完整18章策略已证明稳定可达：

- 前期治理积累真实成果
- 后期转Power
- Dragon≥8
- Power/Merit满足
- 终章主动接管

压力样本中可高频命中 `true_dragon`，说明“成龙”入口不是理论路径。

### ge_slayer

修复分支终章route丢失后，真实完整路径已经成功命中。

关键门槛仍保持：

- Progress≥60
- final route = power
- Dragon<10
- Power≥65
- ≥3名有效支持者达到60

一条治理型高质量路径实测可形成：

- K总 76
- 则韩 64
- 肖恩 62

因此暂不降低3票或60阈值。当前更合理的做法是继续观察多seed模拟，而不是先放宽隐藏结局。

## 5. 长尾 v14 Event/Joint

27个单事件结局与5个Joint在压力代理中明显是长尾。

这是设计预期的一部分，因为它们同时要求：

1. 对应随机事件实际出现；
2. 选择某一具体route；
3. 项目最终成功；
4. 终章route与事件route一致；
5. 未被更高层 True / Career / Organization 结局覆盖。

因此“单次Monte Carlo频率低”不能单独作为降低门槛的理由。

真正的验收标准应是：

- 规则层有witness；
- 事件真实可抽取；
- 对应route真实可选；
- 完整路径至少有一条可构造攻略；
- 不被永久shadow。

## 6. v14.6 最小平衡修订

本轮只改5个与频率集中直接相关的门槛，不改事件结构：

- Organization 强项目门槛：Progress≥72 → **Progress≥75**。目的：减少 `ge_court` 对60段成功路线的过早覆盖，并把 v14 Event/Joint 的安全窗口扩大为60–74。
- `ge_unsung`：Reputation<35 → **Reputation<25**。治理样本中原<35的大量命中实际位于25–34，更像“有一定可见度”而非真正无名。
- `true_dragon`：Dragon≥10 → **Dragon≥8**。定向 Dragon profile 在正式模拟中约48%命中，仍保持隐藏但不再过度苛刻。
- `nc_love`：Progress 35–59 → **Progress 35–49**。避免“项目已经接近完成”时爱情主结局覆盖半桥/幸存者；项目成功后仍只追加私人尾声。
- `ge_slayer`：≥3名60支持者 → **≥2名60支持者**。固定seed N=500 A/B中，Slayer profile从5/500（1%）提升到75/500（15%）；random / pure power / dragon profile均保持0次误触发。

正式 `tests/balance-sim.cjs`（seed 20260928, N=500）当前信号：

- random：分散于半桥、Heart BE、幸存者、firstline、court等，没有单一结局超过50%；
- govern：以 `ge_next` 为主，符合定向职业治理策略；`ge_unsung`降至低频；
- appease：不维护私人生活时仍以Heart死亡为主；
- love_appease：Heart死亡仅2/500，说明私人生活/休息救援链有效；主要代价转为Progress不足；
- dragon：`true_dragon` 239/500（47.8%）；
- slayer：门槛A/B后约15%，保持隐藏但不再是近乎抽奖。

这些修改均已写入 priority boundary contract，后续改回旧阈值会直接触发测试失败。

## 7. 下一轮平衡任务

1. 用 `tests/balance-sim.cjs` 固定seed跑多个样本量，记录不同难度。
2. 为64结局建立“攻略型完整路径”而不仅是final-state witness。
3. 单独测：
   - appease + 主动私人生活维护
   - power + 保持专业盟友
   - govern → slayer
   - govern → dragon
   - true_afterdragon 二周目
4. 统计每个结局：
   - 实际命中频率
   - 最短/典型路径
   - 被哪个更高结局shadow的比例
5. 只有出现连续多个seed的结构性垄断时才调整数值。

## 当前判断

`ENDING LOGIC: STABLE`

`64/64 RULE-WITNESSED`

`NO-END HOLE: CLOSED`

`SLAYER REAL PATH: VERIFIED`

`BALANCE FREEZE: v14.6 THRESHOLDS LOCKED · MULTI-SEED CONFIRMATION PENDING`
