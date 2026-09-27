# Dragon Office — RC 结局可达性审计

基线规范：`ENDING_PRIORITY_SPEC.md`。

## 当前状态

- [x] 结局优先级已锁定。
- [x] 已建立 canonical resolver：`ending-resolver.js`。
- [x] 已建立纯函数 `buildFinalEndingState(raw)`。
- [x] v14 五个 joint ending 使用真实 branch flags + final route 单点推导。
- [x] 发现并恢复 v11 遗留但仍在64图鉴中的7个组织结局：`ge_succession / ge_puppetmaster / ge_regent / ge_coalition / ge_court / ge_system / ge_project`。
- [x] `tests/ending-witness.spec.js` 已为 **57 个 final-resolver ending** 建立 primary witness。
- [x] `tests/terminal-ending-witness.spec.js` 已为 **7 个 terminal-only ending** 建立真实入口 witness。
- [x] `tests/all-ending-witness.spec.js` 增加 **57 + 7 = 64、无重复 primary witness** 的 catalogue gate。
- [x] `index.html` 已在 RC 分支内嵌 canonical resolver + runtime bridge，最终 `finalizeEvaluation()` 单点委托。
- [ ] witness 目前证明“规则层可达”，尚未完成浏览器逐步选择的 end-to-end path replay。
- [ ] `FLOW_TREE.md` 尚未与最终 resolver 顺序重新核对。
- [ ] RC PASS 尚未允许：需完成 108 成就 source/orphan 审计与最终 `main` 回归后再标记。

## 64结局入口分类

### A. FINAL_RESOLVER：57
包括：

- 3：`true_afterdragon / true_dragon / ge_slayer`
- 4：`ge_promotion / ge_unsung / ge_next / ge_firstline`
- 7：v11组织结局 `ge_succession / ge_puppetmaster / ge_regent / ge_coalition / ge_court / ge_system / ge_project`
- 5：v14 joint
- 27：v14单事件回响
- 6：NPC/爱情特化
- 5：generic/failure final outcomes

### B. TERMINAL_ONLY：7

| Ending | 真实入口 |
|---|---|
| `be_heart` | `checkDeath()`：Heart≤0，死亡顺序第一 |
| `be_sanity` | `checkDeath()`：Heart>0 且 Sanity≤0 |
| `be_morale` | `checkDeath()`：前置资源仍存活且 Morale≤0 |
| `be_fraud` | 选择写入 `flags.fraud` 后，在章节/事件 next callback 直接 `showEnding` |
| `be_probation` | v11 `checkDeath` wrapper：chapterIdx≤2 且 Trust≤24 |
| `be_burnout` | v11 `checkDeath` wrapper：Stamina≤3 且 Heart≤15 |
| `be_vendor` | v11 `checkDeath` wrapper：vendorCaptured + chapterIdx≥8 + Blame≥18 |

`be_trust` 与 `be_progress` 虽然也能由 `checkDeath()` 即时进入，但它们同时承担终局 generic failure，因此 primary witness 保留在 FINAL_RESOLVER，避免64分类重复计数。

## 新发现：此前的“50 + 14”分类不准确

前一轮把剩余14个都当成非-final ending。实际核查 v11 代码后发现，其中 **7个是仍然有效的整局组织结局**，只是 canonical resolver 第一版漏掉了它们；另7个才是真正 terminal-only。

这也是为什么不能只看 v14 wrapper：64图鉴是多版本叠加形成的，旧版公开结局仍可能是现行产品的一部分。

## Canonical priority（当前）

```text
P0 Duel mechanism（不进入64图鉴）
P1 True / 跨周目 / 屠龙
P2 明确职业轨迹
P2.5 整局组织治理结局（v11 7项）
P3 v14 Joint
P4 v14 Event
P5 NPC / relationship specialization
P6 Generic final outcomes
P7 Legacy fallback
```

组织结局放在 Event 之前：一次随机事件不能覆盖整局形成的组织运行模式；但明确的晋升、跳槽、屠龙等个人职业终局仍优先于组织画像。

## 已确认的生产问题

### R1. 双层/多层 `finalizeEvaluation()`
基础版本、v11、v13、v14 均通过重定义或 wrapper 改写最终判定，实际行为依赖脚本声明顺序。

### R2. v14生产顺序仍与RC规范不一致
当前生产 v14 是 Joint/Event 先于 Promotion/Career；canonical 要求 Career/Org 高于 Joint/Event。

### R3. 基础 resolver 有 NPC 覆盖 Career 风险
旧逻辑先写 career key，随后 NPC 可以重写 key。

### R4. 单文件部署约束
当前 `index.html` 没有加载外部 `ending-resolver.js`。因此不能直接把生产 `finalizeEvaluation()` 改成依赖 `window.DragonEndingResolver`，否则现有单文件打开方式会报错。

生产接线必须二选一：

1. **推荐：** 把 canonical resolver 的浏览器部分内嵌进 `index.html`，`ending-resolver.js` 保持测试镜像，并增加一致性测试；
2. 或正式改成多文件部署，在 HTML 中显式 `<script src="ending-resolver.js"></script>`，同时确认 GitHub Pages/本地打开方式都能加载。

在没有完成浏览器加载验证前，不做破坏单文件兼容性的接线。

## 64/64 当前结论

**规则层 witness catalogue 已达到 64/64，未发现缺失 primary ending ID。**

但这还不是“64/64 production PASS”：生产页面仍使用历史 wrapper，且尚未从第1章开始逐步 replay 到每个 witness。因此当前状态应写为：

`64/64 RULE-WITNESSED · PRODUCTION INTEGRATION PENDING`

## 下一步

1. 采用单文件安全方案，把 canonical resolver 接入 `index.html`，彻底结束多 wrapper early-return。
2. 接线后重跑 priority contract + 64 witness catalogue。
3. 建立 browser/path replay：从开局选择、事件 flags、终章 route 实际推进，验证至少所有高优先级/隐藏/联合结局。
4. 修订 `FLOW_TREE.md` 的最终判定树。
5. 然后进入108成就 source-map / orphan audit。
6. 只有在 production resolver 接线、64 catalogue、QTE回归、成就审计均通过后才允许 RC PASS。

## RC production integration（2026-09-27）

- `index.html` 继续保持**单文件可运行**：`ending-resolver.js` 与 `ending-runtime-bridge.js` 的 canonical source 被内嵌到末尾、旧 wrapper 之后。
- runtime bridge 通过直接词法标识符读取 `S / flags / NPCs`；已修复早期草案使用 `window.S` 导致浏览器拿不到状态的问题。
- 内联 JavaScript syntax check：PASS。
- ending priority contract：36/36 PASS。
- final resolver witnesses：57/57 PASS。
- terminal witnesses：7/7 PASS。
- all-ending catalogue gate：64/64 PASS。
- production replay（真实 `index.html` 环境）已验证：True / Career / Organization / v14 Event / Love / Failure 代表状态全部命中；canonical finalizer 确认为最后一层。
- 8 个会议 QTE 入口在固定 RNG 下全部可触发；婚恋初始状态仍保持隐藏且与主结局正交。
- 修复一项 stale smoke assertion：离婚重建尾声文案已经更新，旧测试仍断言过期句子。

### 当前剩余 Release Blocker

1. 108 个成就必须逐个建立 source map，并确认没有 orphan / 重复覆盖 / 动态选项继承造成的永久不可达。
2. 需要把最终 resolver 顺序同步回 `FLOW_TREE.md`。
3. 合并回 `main` 后再跑一次 catalog / QTE / relationship / ending regression，才允许标记 RC PASS。
