# Dragon-office v14.4 完整事件流程树

> 由当前 main 分支运行时数据直接生成。本文含完整剧透。主目录保持 18章 / 34随机事件 / 108成就 / 64主结局；私人生活结局作为主结局后的隐藏尾声，不占64主结局编号。

## 0. 每章后的统一事件链

    主线章节选择
    └─ checkDeath / fraud检查
       ├─ 死亡/硬失败 → 对应BE
       └─ 存活
          ├─ 若第18章 → evaluateFinal → finalizeEvaluation → 主结局 → 私人生活尾声
          └─ 非第18章
             └─ maybeEvent（随机事件 / 跨周目事件 / PI连锁覆盖层）
                └─ maybeProjectBattle（指定章节会议QTE）
                   └─ maybeRomanceEncounter
                      ├─ 初始已有稳定伴侣/家庭 → HOME_EVENTS
                      └─ 其他状态 → 线下关系事件池
                         └─ maybePhoneEvent
                            └─ chapterIdx + 1 → applyChapterPassives
                               └─ maybeResourceConflict → maybePrivateChat → maybeLove → 下一章

## 1. 18章主线

### 第1章 · 试用期 · 第2周 · 五个会以后

- 场外人物：明夜 — 她上午已经听过一次。你下午最好还是从背景讲。
- 场景：下午第四个会。钟时盯着你的文件看了很久。 / 「这里‘支持’是不是换成‘提示’更稳一点？还有这段再解释一下。」 / 你问：「那今天要不要先定主要终点的方向？」 / 她停了一下：「这个你们再想完整一点。明天再拉大家过一遍。」
  - A. 明天只带两个方案，请她最后选一个。
    - 结果：trust+4；progress+5；NPC[zihan+3]；路线=govern；setFlag=main_1_1
    - 成就：a1
  - B. 今天先把方向定了，措辞会后再改。
    - 结果：trust-5；progress+9；power+3；NPC[mingye+4]；路线=power；setFlag=main_1_2
    - 成就：a2
  - C. 所有comment逐条接下，今晚全改。
    - 结果：trust+7；progress-5；heart-7；路线=appease；setFlag=main_1_3
    - 成就：a3

### 第2章 · 试用期 · 第1个月 · 三个项目都最重要

- 场外人物：K总 — 如果每件事都是P0，就等于没有P0。
- 场景：钟时说：「8006不能耽误，8016也得往前，新Combo老板昨天又问了。三个都很重要。」 / 你问：「那这周先保哪个？」 / 「不是先保哪个，是都要做好。大家辛苦一下。」
  - A. 把三件事按‘今天不做会发生什么’排成一页，请她划掉一个。
    - 结果：progress+8；power+3；trust-2；NPC[kzong+7]；路线=govern；setFlag=main_2_1
    - 成就：a4
  - B. 三条线一起开工。
    - 结果：trust+6；stamina-10；heart-6；morale-4；NPC[yangyang+4]；路线=appease；setFlag=main_2_2
    - 成就：a5
  - C. 「做不到。要么加人，要么减事。」
    - 结果：trust-9；power+6；morale+5；NPC[kzong+5]；路线=power；setFlag=main_2_3
    - 成就：a6

### 第3章 · Phase I · 一页，最后变成十七页

- 场外人物：苏苏 — 老板要的是结论，不是数据仓库。
- 场景：老板要一页肝安全性判断。钟时review后说：「ALT都放一下。AST呢？胆红素也要。非临床最好补。竞品也带上。」 / 文件变成17页。老板翻了三页：「所以你们到底怎么看？」钟时转向你：「对，我们的结论呢？」
  - A. 第一页只留三句话：发生了什么、怎么看、下一步做什么。
    - 结果：progress+7；power+4；NPC[weilai+6，zihan+4]；路线=govern；setFlag=main_3_1
    - 成就：a7
  - B. 现场从17页里帮她找答案。
    - 结果：trust+5；heart-5；progress+2；NPC[weilai-2]；路线=appease；setFlag=main_3_2
    - 成就：a8
  - C. 继续补数据，确保‘完整’。
    - 结果：trust+4；progress-6；stamina-8；路线=appease；setFlag=main_3_3
    - 成就：a9

### 第4章 · Phase I · 昨天已经定过

- 场外人物：则韩 — 我把昨天的决定和理由写成三行了。别拿它去证明谁记错，只拿它救项目。
- 场景：昨天会议最后定了A。今天老板随口问：「为什么不考虑B？」钟时立刻接话：「对，我也一直觉得B可以再看看。」 / 昨天最后一句就是她说的：「A，就这么定。」
  - A. 「昨天选A是因为这三个原因。现在如果有新信息，再把B打开。」
    - 结果：progress+7；trust+1；power+3；NPC[zihan+6]；路线=govern；setFlag=main_4_1
    - 成就：a10
  - B. 「您昨天明确说的是A。」
    - 结果：trust-10；power+4；sanity+3；NPC[mingye+5]；路线=power；setFlag=main_4_2
    - 成就：a11
  - C. 不说，重新做B。
    - 结果：trust+5；progress-8；stamina-7；路线=appease；setFlag=main_4_3
    - 成就：a12

### 第5章 · Phase II · PVP先别说

- 场外人物：PVP — 刚才Clinical问我那个case，我没回。加琳说先统一口径。
- 场景：Safety会上，Clinical问：「这例肾脏事件，医学上你怎么看？」PVP刚开口：「从时间关系上——」 / 加琳打断：「这个我们PV内部先统一，稍后我来回复。」 / 二老板问：「我问的是PVP本人怎么看。」PVP看了一眼加琳。
  - A. 让PVP先讲医学判断；流程怎么对外另定。
    - 结果：power+5；progress+4；NPC[pvp+8，jialin-6，xiaoen+5]；路线=govern；setFlag=main_5_1
    - 成就：a13
  - B. 顺着加琳，先统一口径。
    - 结果：trust+3；progress-3；NPC[jialin+6，pvp-6]；路线=appease；setFlag=main_5_2
    - 成就：a14
  - C. 让加琳直接给结论。
    - 结果：progress+1；NPC[jialin+4，xiaoen-4，pvp-4]；路线=power；setFlag=main_5_3
    - 成就：a15

### 第6章 · Phase II · 瑞冬再查一下

- 场外人物：瑞冬 — 我晚点再给您一版，我想把机制再核一下。
- 场景：你问瑞冬：「猴子那几个肾小管变化，对临床到底意味着什么？」 / 她讲了十分钟背景，又说：「我再查一下，今晚补一个完整版本。」第二天版本很长，但剂量组写错了一处。 / 老板看见她凌晨两点还在改：「她经验少一点，很努力，你们多带带。」
  - A. 只让她回答：看到了什么、怎么判断、对临床意味着什么，并给出处。
    - 结果：progress+6；power+3；NPC[ruidong+2，xiaoen+3]；路线=govern；setFlag=main_6_1
    - 成就：a16
  - B. 替她把错误改掉，不提。
    - 结果：trust+2；progress+2；heart-4；NPC[ruidong+5]；路线=care；setFlag=main_6_2
    - 成就：a17
  - C. 会上直接问：「你自己到底懂不懂这个study？」
    - 结果：power+3；trust-3；morale-3；NPC[ruidong-10，ceo-6]；路线=power；setFlag=main_6_3
    - 成就：a18

### 第7章 · Phase II · 请Sponsor发个邮件

- 场外人物：黑娜 — 为了后续记录清楚，最好由Sponsor这边确认。
- 场景：CRO一个中心出了执行偏差。黑娜说：「考虑到Sponsor之前也调过要求，建议贵方发封邮件确认。」 / 朱粽已经打开Outlook：「好的，我来发。」 / K总抬头：「等一下。为什么是我们发？」
  - A. 先让CRO把事实时间线和各自责任写清楚。
    - 结果：progress+5；power+4；NPC[kzong+7，heina+4，zhuzong-3]；路线=govern；setFlag=main_7_1
    - 成就：a19
  - B. 让朱粽照发，先把事推进。
    - 结果：progress+4；blame+8；NPC[zhuzong+6，heina+5，xiaoen-7]；路线=appease；setFlag=main_7_2
    - 成就：a20
  - C. 直接让黑娜自己发。
    - 结果：progress+1；power+2；NPC[heina-6，kzong+2]；路线=power；setFlag=main_7_3
    - 成就：a21

### 第8章 · Phase II · 这个PI我来聊

- 场外人物：Parker — 新领域而已，专家关系都差不多，多见两次就熟了。
- 场景：Parker第一次见MK主任前很有信心：「这种PI我知道怎么聊。」 / 二十分钟后，MK主任问：「这个研究最后谁真正leading？为什么选这个人群？」 / Parker笑了一下：「主任，后面我们可以慢慢深聊。」
  - A. 接过话题，讲研究问题和两个没想清楚的地方，请MK主任挑。
    - 结果：progress+6；piRep+5；NPC[houpi+8，parker-2]；路线=govern；setFlag=main_8_1
    - 成就：a22
  - B. 顺着Parker，先把关系做热。
    - 结果：trust+2；piRep-2；NPC[parker+7，houpi-3]；路线=appease；setFlag=main_8_2
    - 成就：a23
  - C. 当场让Parker回答人群选择。
    - 结果：power+2；NPC[parker-8，houpi-2]；路线=power；setFlag=main_8_3
    - 成就：a24

### 第9章 · Phase II · 谁的研究

- 场外人物：N院长 — 主研究谁leading我不是特别在意。我更想知道机制这块谁来做。
- 场景：MK主任希望继续牵头主研究和长期随访。N院长看完数据后问：「这些晚期应答的人，样本留了吗？我想做机制。」 / 钟时说：「两位老师都很重要，我们都叫Co-Leading就好了。」
  - A. 主研究、机制子研究和长期随访分别写清负责人。
    - 结果：progress+7；power+4；piRep+6；NPC[houpi+6，niupi+7]；路线=govern；setFlag=main_9_1
    - 成就：a25
  - B. 两边都叫Co-Leading。
    - 结果：trust+5；progress+1；NPC[houpi-4，niupi-4]；路线=appease；setFlag=main_9_2
    - 成就：a26
  - C. 只保MK主任为Leading。
    - 结果：progress+3；piRep-2；NPC[houpi+6，niupi-9]；路线=power；setFlag=main_9_3
    - 成就：a27

### 第10章 · 长期随访 · 样本留了吗

- 场外人物：明夜 — PR转CR那两个人我拉了曲线。N院长已经问三遍有没有PBMC。
- 场景：长期随访出现几个晚期应答。钟时说：「这个结果很好，都放摘要里。」 / N院长：「先别急着写漂亮。为什么停药后还继续变好？样本呢？」 / MK主任：「长期随访本身也应该是一条完整的故事。」
  - A. 主线做长期随访，机制另立子研究，共用一套样本和统计计划。
    - 结果：progress+7；career+3；NPC[niupi+8，houpi+5，mingye+4，zihan+4]；路线=govern；setFlag=main_10_1
    - 成就：a28
  - B. 全部塞进一个摘要，先抢时间。
    - 结果：progress+5；piRep-4；NPC[niupi-6，houpi-2]；路线=appease；setFlag=main_10_2
    - 成就：a29
  - C. 只做机制，主结果晚点。
    - 结果：progress-4；career+2；NPC[niupi+7，houpi-6]；路线=power；setFlag=main_10_3
    - 成就：a30

### 第11章 · Phase III · 我们中心做了这么多

- 场外人物：林主任 — 上次说后续研究优先考虑我们，这句话我还记得。
- 场景：林主任中心入组靠前，也帮项目扛过几次难点。现在主文章作者位置有限。 / Parker说：「主任关系不错，我去解释一下。」 / 林主任只问：「我们中心投入应该不算少吧？之前说的后续机会怎么安排？」
  - A. 把主文、亚组、后续研究按实际贡献一起排成计划。
    - 结果：piRep+6；progress+4；NPC[zhangpi+8]；路线=govern；setFlag=main_11_1
    - 成就：a31
  - B. 告诉他作者名额有限，请理解。
    - 结果：progress+2；piRep-4；NPC[zhangpi-8]；路线=appease；setFlag=main_11_2
    - 成就：a32
  - C. 先答应一个后续substudy。
    - 结果：progress+5；NPC[zhangpi+5]；路线=appease；setFlag=main_11_3
    - 成就：a33

### 第12章 · Phase III · 林丹总能出现

- 场外人物：琳琳 — 前面两周没人追，老板一问，今天所有人都开始要CRA晚上给。
- 场景：site issue拖了两周。老板今天问了一句：「这个怎么还没解决？」 / 上午十点，林丹拉会、找CRO、打电话给中心，中午已经做出一页summary。老板说：「林丹这个事情处理得不错。」 / 琳琳问你：「后面所有核查还是CRA做。她收尾吗？」
  - A. 危机处理功劳给林丹，后续核查、关闭和复盘分别写清owner。
    - 结果：morale+6；progress+5；power+3；NPC[linan+5，miaomiao+6，xiaoen+4]；路线=govern；setFlag=main_12_1
    - 成就：a34
  - B. 既然林丹接手，就让她全包到底。
    - 结果：progress+3；NPC[linan-4，miaomiao+3]；路线=power；setFlag=main_12_2
    - 成就：a35
  - C. 当众问：「前两周你怎么没这么积极？」
    - 结果：power+3；morale-4；NPC[linan-10]；路线=power；setFlag=main_12_3
    - 成就：a36

### 第13章 · Phase III · 再拉个专项会

- 场外人物：杨杨 — 风险这么多，今晚最好把所有人都拉上。
- 场景：一个关键定义没锁，统计等Medical，Medical等方案澄清。 / 杨杨说：「今晚拉全体专项会。后天正式节点，最好明天内部就完成。」 / K总问：「真正没定的是哪两个人之间的问题？」 / 杨杨停了一下：「大家都需要对齐。」
  - A. 只留真正要决定的三个人，30分钟定方案，再发全体。
    - 结果：progress+8；morale+4；NPC[kzong+6，yangyang-3，mingye+4]；路线=govern；setFlag=main_13_1
    - 成就：a37
  - B. 全员参加，确保没人被漏掉。
    - 结果：trust+3；stamina-8；morale-5；NPC[yangyang+6]；路线=appease；setFlag=main_13_2
    - 成就：a38
  - C. 让钟时主持拍板。
    - 结果：trust+4；progress-4；NPC[yangyang+2]；路线=appease；setFlag=main_13_3
    - 成就：a39

### 第14章 · Phase III · D级工作，VP级签名

- 场外人物：则韩 — 她把正文改了四个词，留了27个comment。没有一个碰到主问题。
- 场景：钟时review一份关键文件整整两个小时。 / 返回时有27个comment：换词、再解释、这里感觉可以完善、那里担心别人会问。 / 你把comment按影响分了四类。真正会改变策略的只有两条。 / 钟时说：「既然我都提了，最好都处理。」
  - A. 先解决2条真正影响结论的，语言意见放统一QC。
    - 结果：progress+7；power+3；NPC[zihan+6]；路线=govern；setFlag=main_14_1
    - 成就：a40
  - B. 27条逐条今天清零。
    - 结果：trust+6；stamina-10；heart-6；NPC[linan+3]；路线=appease；setFlag=main_14_2
    - 成就：a41
  - C. 回复每条comment解释为什么不改。
    - 结果：power+2；progress-5；heart-5；路线=appease；setFlag=main_14_3
    - 成就：a42

### 第15章 · Pre-NDA · 老板问：你要我决定什么

- 场外人物：老板 — 我不是来帮你读数据的。你要我决定什么？
- 场景：高层会前，钟时准备了38页材料。第一页是背景，第二页也是背景，第十二页开始才出现真正分歧。 / 老板翻到第五页停下：「你要我今天决定什么？」 / 钟时看向你。
  - A. 直接说：「两个决定。第一，是否接受两周延迟；第二，是否追加资源。」
    - 结果：power+6；progress+6；NPC[ceo+5，kzong+5]；路线=govern；setFlag=main_15_1
    - 成就：a43
  - B. 替钟时继续讲38页。
    - 结果：trust+6；stamina-8；heart-5；NPC[ceo-4]；路线=appease；setFlag=main_15_2
    - 成就：a44
  - C. 让钟时自己回答。
    - 结果：power+3；trust-6；NPC[ceo-2]；路线=power；setFlag=main_15_3
    - 成就：a45

### 第16章 · NDA · 功劳怎么写

- 场外人物：林丹 — 庆功PPT我可以帮忙整理，大家贡献都写得好看一点。
- 场景：项目接近递交。钟时说：「对外就一个声音，团队成果不要分太细。」 / 明夜看着你：「所以那些decision log、分析救火、PI协调，最后都叫‘团队共同努力’？」 / 林丹已经打开庆功PPT模板。
  - A. 按里程碑列贡献人和证据，不做排名。
    - 结果：career+5；power+4；morale+5；NPC[mingye+6，kzong+5，linan+2]；路线=govern；setFlag=main_16_1
    - 成就：a46
  - B. 统一写‘钟时领导下的团队成果’。
    - 结果：trust+9；morale-7；career-3；NPC[mingye-8，kzong-5]；路线=appease；setFlag=main_16_2
    - 成就：a47
  - C. 把自己的名字放在最前面。
    - 结果：power+8；morale-8；dragon+5；NPC[linan+3，mingye-6]；路线=power；setFlag=main_16_3
    - 成就：a48

### 第17章 · NDA · 项目做成以后

- 场外人物：二老板 — 药做出来是一件事。这个组织以后还怎么做下一件，是另一件。
- 场景：NDA包终于成形。二老板问你：「如果再来一个项目，你会怎么搭这个团队？」 / 钟时也在场。她正在低头看一份文件，在正文旁边又留下一条comment：「这里是否需要再解释？」
  - A. 把决策权、专业owner、资源和会议规则写成新的运行方式。
    - 结果：progress+10；power+6；morale+6；career+5；NPC[cso+6，kzong+6，xiaoen+5，zihan+4]；路线=govern；setFlag=main_17_1
    - 成就：a49
  - B. 项目做成就够了，别再碰组织。
    - 结果：progress+8；career+4；NPC[ceo+3]；路线=appease；setFlag=main_17_2
    - 成就：a50
  - C. 让所有人以后都直接听你。
    - 结果：power+12；dragon+8；morale-6；NPC[ceo-3，cso-2]；路线=power；setFlag=main_17_3
    - 成就：a51

### 第18章 · 终局 · 下一项项目

- 场外人物：K总 — 这次交付了。下次谁来做决定？
- 场景：庆功会散场以后，K总把下一项研究的启动清单放在你桌上。上面有资源、有专业负责人，也有一栏空着：关键分歧由谁拍板。 / 钟时说：「先按以前的方式跑，有问题再开会。」 / 明夜问你：「这次留下的东西，下次还算数吗？」
  - A. 把本次的决策规则、专业owner和升级路径写进下一项目的启动章程。
    - 结果：progress+8；morale+6；power+3；NPC[kzong+5，zihan+4，xiaoen+4]；路线=govern；setFlag=main_18_1
    - 成就：a52
  - B. 先按旧流程启动，等真的卡住再调整。
    - 结果：trust+5；progress+3；NPC[zouting+2]；路线=appease；setFlag=main_18_2
    - 成就：a53
  - C. 以后所有关键决定都先交给你。
    - 结果：power+10；dragon+6；morale-5；NPC[kzong-3，mingye-3]；路线=power；setFlag=main_18_3
    - 成就：a54

## 2. 动态章节变体

### 原第3章的动态替换
- 条件引用：main_2_2 / main_2_3（可能要求组合状态）

### 原第5章的动态替换
- 条件引用：main_4_2（可能要求组合状态）

### 原第7章的动态替换
- 条件引用：main_5_1 / main_5_3 / main_5_2（可能要求组合状态）

### 原第8章的动态替换
- 条件引用：main_7_2 / v11_cro_sponsor_mail（可能要求组合状态）

### 原第9章的动态替换
- 条件引用：无显式flag（可能要求组合状态）

### 原第10章的动态替换
- 条件引用：mk_direct / main_8_3（可能要求组合状态）

### 原第12章的动态替换
- 条件引用：main_11_3 / territory_doublepromise（可能要求组合状态）

### 原第14章的动态替换
- 条件引用：无显式flag（可能要求组合状态）

### 原第15章的动态替换
- 条件引用：mk_direct / probation_bypass（可能要求组合状态）

### 原第16章的动态替换
- 条件 boss_privatechannel = true → **v12_16_coalition · 没有人完全站你这边**
  - A. 把不同意见压成共同底线，只守住不能动的部分。
    - 结果：progress+7；power+5；morale+5；NPC[xiaoen+4，zihan+4，kzong+4]；路线=govern；setFlag=coalition_floor
    - 成就：— · 没有人完全站你这边 · 把不同意见压成共同底线，只守住不能动的部分。
  - B. 请二老板直接拍板。
    - 结果：progress+5；power+1；NPC[cso+5]；路线=appease；setFlag=coalition_escalate
    - 成就：— · 没有人完全站你这边 · 请二老板直接拍板。
  - C. 宣布按你版本执行。
    - 结果：progress+6；power+7；morale-3；NPC[xiaoen-2]；路线=power；setFlag=coalition_command
    - 成就：— · 没有人完全站你这边 · 宣布按你版本执行。
- 条件 control_ignore = true → **v12_16_coalition · 没有人完全站你这边**
  - A. 把不同意见压成共同底线，只守住不能动的部分。
    - 结果：progress+7；power+5；morale+5；NPC[xiaoen+4，zihan+4，kzong+4]；路线=govern；setFlag=coalition_floor
    - 成就：— · 没有人完全站你这边 · 把不同意见压成共同底线，只守住不能动的部分。
  - B. 请二老板直接拍板。
    - 结果：progress+5；power+1；NPC[cso+5]；路线=appease；setFlag=coalition_escalate
    - 成就：— · 没有人完全站你这边 · 请二老板直接拍板。
  - C. 宣布按你版本执行。
    - 结果：progress+6；power+7；morale-3；NPC[xiaoen-2]；路线=power；setFlag=coalition_command
    - 成就：— · 没有人完全站你这边 · 宣布按你版本执行。

### 原第17章的动态替换
- 条件 power_claim = true → **v12_17_shadoworg · 组织图和真实组织**
  - A. 把第二张图变成RACI和固定决策机制，减少对你个人的依赖。
    - 结果：power+4；morale+6；progress+4；NPC[kzong+6]；路线=govern；setFlag=shadow_to_system
    - 成就：— · 组织图和真实组织 · 把第二张图变成RACI和固定决策机制，减少对你个人的依赖。
  - B. 继续保持现状，别把潜规则写出来。
    - 结果：power+6；heart-3；NPC[kzong+1]；路线=appease；setFlag=shadow_personal
    - 成就：— · 组织图和真实组织 · 继续保持现状，别把潜规则写出来。
  - C. 主动把更多决策集中到自己。
    - 结果：power+9；dragon+5；morale-5；NPC[kzong-4]；路线=power；setFlag=shadow_capture
    - 成就：— · 组织图和真实组织 · 主动把更多决策集中到自己。
- 条件 boss_direct_logged = true → **v12_17_shadoworg · 组织图和真实组织**
  - A. 把第二张图变成RACI和固定决策机制，减少对你个人的依赖。
    - 结果：power+4；morale+6；progress+4；NPC[kzong+6]；路线=govern；setFlag=shadow_to_system
    - 成就：— · 组织图和真实组织 · 把第二张图变成RACI和固定决策机制，减少对你个人的依赖。
  - B. 继续保持现状，别把潜规则写出来。
    - 结果：power+6；heart-3；NPC[kzong+1]；路线=appease；setFlag=shadow_personal
    - 成就：— · 组织图和真实组织 · 继续保持现状，别把潜规则写出来。
  - C. 主动把更多决策集中到自己。
    - 结果：power+9；dragon+5；morale-5；NPC[kzong-4]；路线=power；setFlag=shadow_capture
    - 成就：— · 组织图和真实组织 · 主动把更多决策集中到自己。

### 原第18章的动态替换
- 条件引用：shadow_capture / power_claim / shadow_to_system / coalition_floor（可能要求组合状态）

## 3. 34个随机事件池

### R1 · v11e_comment · 62条Comment
- 条件：NPC事件
- 场景：钟时把一份12页文件退回来。右侧62条comment。 / 则韩扫了一眼：「真正影响结论的三条。剩下的大部分是在记录她阅读时想到什么。」 / 钟时在群里问：「大家今天能不能全部处理完？」
  - A. 先标出3条会改变结论的，今晚只关这3条。
    - 结果：progress+4；power+2；NPC[zihan+5]；路线=govern
    - 成就：a55
  - B. 62条逐条回复。
    - 结果：trust+5；stamina-8；heart-5；路线=appease
    - 成就：a56
  - C. 给每条comment写一段为什么不改。
    - 结果：progress-4；heart-4；路线=power
    - 成就：a57

### R2 · v11e_resource · 大家辛苦一下
- 条件：NPC事件
- 场景：同一个Medical同时背着三期、NDA、安全性汇总和新Combo。 / K总说：「已经不是时间管理问题，是人不够。」 / 钟时回答：「这段时间大家先辛苦一下，后面再看资源。」
  - A. 把四块工作按停一天的后果排出来，要求现场删一块。
    - 结果：power+3；progress+4；NPC[kzong+6]；路线=govern
    - 成就：a58
  - B. 全部接住。
    - 结果：trust+4；stamina-9；heart-6；路线=appease
    - 成就：a59
  - C. 把最重要的一块直接交给林丹。
    - 结果：progress+3；NPC[linan+5]；路线=power
    - 成就：a60

### R3 · v11e_ai · 这段话怎么这么熟
- 条件：NPC事件
- 场景：瑞冬发来一段机制解释。写得比她平时流畅很多，但其中一个术语和原始毒理报告不一致。 / 明夜看了一眼：「这段像是从哪儿整段来的。」 / 瑞冬很快补了一句：「我再核一下原始资料。」
  - A. 不猜来源，只要求每个关键判断都能回到原始报告。
    - 结果：progress+4；NPC[ruidong+1，xiaoen+3]；路线=govern
    - 成就：a61
  - B. 当群里问：「这是AI写的吗？」
    - 结果：power+2；morale-3；NPC[ruidong-9，ceo-3]；路线=appease
    - 成就：a62
  - C. 直接帮她把错误修掉。
    - 结果：progress+2；heart-3；NPC[ruidong+4]；路线=power
    - 成就：a63

### R4 · v11e_visible · 老板刚问过
- 条件：NPC事件
- 场景：一个没人愿意做的后台核查已经挂了一周。 / 老板在群里问：「这个谁在跟？」 / 林丹三分钟后回复：「我来。」 / 琳琳私聊你：「她前面知道这事。」
  - A. 让林丹接Visible汇报，同时把后台核查也明确给她。
    - 结果：progress+4；power+2；NPC[linan+2，miaomiao+4]；路线=govern
    - 成就：a64
  - B. 只让她对老板汇报，后台继续由CRA做。
    - 结果：trust+3；morale-4；NPC[linan+6，miaomiao-6]；路线=appease
    - 成就：a65
  - C. 当众提醒这件事已经挂了一周。
    - 结果：power+2；NPC[linan-7]；路线=power
    - 成就：a66

### R5 · v11e_cro · 为了记录清楚
- 条件：NPC事件
- 场景：黑娜把一封邮件草稿发给朱粽：「最好由Sponsor发，这样后续记录清楚。」 / 朱粽回复：「好的。」 / K总看完转给你，只写了四个字：「为什么我们？」
  - A. 先把事实、责任和decision owner分开，再决定谁发。
    - 结果：progress+4；power+3；NPC[kzong+6，heina+3]；路线=govern
    - 成就：a67
  - B. 让朱粽发，先把问题关掉。
    - 结果：progress+3；blame+6；NPC[zhuzong+4，heina+4，xiaoen-5]；路线=appease；flag=v11_cro_sponsor_mail
    - 成就：a68
  - C. 把邮件退给CRO：「你们的问题你们自己解释。」
    - 结果：power+2；progress-2；NPC[heina-5]；路线=power
    - 成就：a69

### R6 · v11e_pvp · 统一出口
- 条件：NPC事件
- 场景：Clinical在群里直接@PVP问一个case。 / PVP正在输入。 / 几秒后，加琳先回复：「PV这边内部确认后统一给大家。」 / PVP的‘正在输入’消失了。
  - A. 私下问PVP他的医学判断，再和加琳确认正式出口。
    - 结果：progress+3；NPC[pvp+5，jialin-2]；路线=govern
    - 成就：a70
  - B. 只等加琳统一回复。
    - 结果：trust+2；NPC[jialin+4，pvp-3]；路线=appease
    - 成就：a71
  - C. 群里直接追问PVP：「我问的是你的判断。」
    - 结果：power+3；NPC[pvp+4，jialin-6]；路线=power
    - 成就：—

### R7 · v11e_pi · 关系很好
- 条件：NPC事件
- 场景：Parker从MK主任那里回来，第一句话是：「关系做得挺好。」 / 你问：「主任对方案有什么意见？」 / Parker想了两秒：「他说后面可以再深入讨论。」
  - A. 让他把主任真正问过的三个问题写下来。
    - 结果：progress+3；NPC[parker+1]；路线=govern
    - 成就：a72
  - B. 既然关系好，下次继续让Parker单独去。
    - 结果：trust+2；piRep-2；NPC[parker+5，houpi-3]；路线=appease
    - 成就：a73
  - C. 下次你和统计一起去。
    - 结果：piRep+4；progress+3；NPC[houpi+4，mingye+3，parker-2]；路线=power
    - 成就：—

### R8 · v11e_zhuzong · Action已经Close
- 条件：NPC事件
- 场景：朱粽在周会上说：「这个问题CRO已经close了。」 / 肖恩问：「根因呢？」 / 朱粽翻了翻Tracker：「Action已经完成了呀。」 / 会议室安静了两秒。
  - A. 把‘Action完成’和‘风险关闭’拆成两列。
    - 结果：progress+4；power+2；NPC[xiaoen+5，zhuzong-2]；路线=govern
    - 成就：a74
  - B. 既然CRO close了，就先过。
    - 结果：progress+3；blame+5；NPC[zhuzong+4，xiaoen-5]；路线=appease
    - 成就：a75
  - C. 让朱粽现场解释为什么可以close。
    - 结果：power+3；NPC[zhuzong-7，xiaoen+3]；路线=power
    - 成就：—

### R9 · v12e_minutes · 两份会议纪要
- 条件：NPC事件
- 场景：同一场会出现两份纪要。 / 杨杨版写：「一致同意按B推进。」 / 则韩版写：「B待进一步评估，未形成decision。」 / 钟时看完说：「意思差不多吧？」
  - A. 回到录音和会中明确的decision句，只保留一版。
    - 结果：progress+4；power+2；NPC[zihan+5，yangyang-2]；路线=govern
    - 成就：a76
  - B. 两版都留，免得得罪人。
    - 结果：trust+3；progress-2；路线=appease
    - 成就：a77
  - C. 让钟时选哪版。
    - 结果：trust+5；路线=power
    - 成就：—

### R10 · v12e_wuzong · 武总来推动一下
- 条件：NPC事件
- 场景：老板说了一句：「这个上市后研究一直没动，武总你来推动一下。」 / 第二天武总拉群：「Medical今天给方案，统计明天给样本量，周五我们定。」 / Clinical Medical说：「研究问题都还没定义。」
  - A. 先让武总说清业务问题，再由Medical定义科学问题。
    - 结果：progress+4；power+2；NPC[wuzong+3，caolan+4]；路线=govern
    - 成就：a78
  - B. 按武总排期先出一版。
    - 结果：progress+5；stamina-5；NPC[wuzong+5]；路线=appease
    - 成就：a79
  - C. 告诉他上市后医学不是他能拍板的。
    - 结果：power+4；trust-3；NPC[wuzong-6]；路线=power
    - 成就：—

### R11 · v12e_xianren · 产品数据谁记得
- 条件：NPC事件
- 场景：专家会前，贤人在群里问：「我们那个功能性治愈数据是30还是70来着？」 / 曹兰两分钟后回了人群、时间点、分母和竞品对照。 / 贤人发了一个：「对对，谢谢。」
  - A. 让贤人只负责专家反馈，产品数据和证据由曹兰/Medical准备。
    - 结果：progress+3；NPC[xianren+2，caolan+5]；路线=govern
    - 成就：a80
  - B. 让贤人自己补课，下次必须能讲。
    - 结果：progress+1；NPC[xianren-2]；路线=appease
    - 成就：a81
  - C. 直接让曹兰代替贤人参加。
    - 结果：progress+4；NPC[caolan+6，xianren-7]；路线=power
    - 成就：—

### R12 · v12e_bd · 尽调前夜
- 条件：NPC事件
- 场景：谷雨说买方明天会问三件事：长期疗效、安全性信号、为什么这个人群能赢竞品。 / 钟时说：「把所有数据都准备完整，最好做个backup deck。」 / 谷雨看着你：「他们不会给我们三小时。」
  - A. 每个问题只准备一句结论、三条证据、一个风险。
    - 结果：progress+4；career+2；NPC[guyu+6]；路线=govern
    - 成就：a82
  - B. 把完整数据都放进主Deck。
    - 结果：trust+4；stamina-5；NPC[guyu-2]；路线=appease
    - 成就：a83
  - C. 让谷雨自己决定讲什么。
    - 结果：progress+3；NPC[guyu+4]；路线=power
    - 成就：—

### R13 · v12e_susu · 苏苏突然要求多人参会
- 条件：NPC事件
- 场景：杨杨最近和老板直接对了几次项目。苏苏忽然说：「以后这种会把财务和PMO都拉上，信息透明一点。」 / 杨杨有点莫名其妙：「这个和财务有什么关系？」 / 苏苏只说：「流程更规范。」
  - A. 按正式治理需求定义哪些会议需要哪些角色，不讨论个人动机。
    - 结果：progress+3；NPC[weilai+3，yangyang+2]；路线=govern
    - 成就：a84
  - B. 全部照苏苏要求拉人。
    - 结果：trust+3；stamina-4；NPC[weilai+5，yangyang-3]；路线=appease
    - 成就：a85
  - C. 私下告诉杨杨这可能不是流程问题。
    - 结果：power+2；NPC[yangyang+5，weilai-4]；路线=power
    - 成就：—

### R14 · v12e_ceo · 年轻人要多承担
- 条件：NPC事件
- 场景：老板看见瑞冬凌晨还在线，在群里说：「年轻人就是要多承担，很多能力都是扛出来的。」 / 第二天又把一个新项目塞给她。 / K总低声说：「她现在连原来那块都还要别人复核。」
  - A. 把她当前错误率和工作量一起给老板看，建议减少scope。
    - 结果：power+3；progress+2；NPC[ceo-2，ruidong+2，kzong+4]；路线=govern
    - 成就：a86
  - B. 支持老板，多给机会才会成长。
    - 结果：trust+5；NPC[ceo+5，ruidong-2]；路线=appease
    - 成就：a87
  - C. 直接说她培养不出来。
    - 结果：power+4；trust-6；NPC[ceo-8，ruidong-5]；路线=power
    - 成就：—

### R15 · v12e_mkn · 同一个大会席位
- 条件：NPC事件
- 场景：大会只给一个口头报告名额。 / MK主任认为主研究应该由Leading PI报告。 / N院长认为这次最有价值的新信息来自机制子研究。 / 两个人都没有直接找对方。都找了你。
  - A. 按本次报告内容决定讲者，另一个方向单独安排后续舞台。
    - 结果：piRep+5；power+3；NPC[houpi+2，niupi+3]；路线=govern
    - 成就：a88
  - B. 给MK主任，Leading PI优先。
    - 结果：piRep+2；NPC[houpi+6，niupi-5]；路线=appease
    - 成就：a89
  - C. 给N院长，谁有最新科学内容谁讲。
    - 结果：piRep+2；NPC[niupi+6，houpi-5]；路线=power
    - 成就：—

### R16 · v13e_ceo_detail · 老板突然问到一个数字
- 条件：NPC事件
- 场景：高层会开到一半，老板忽然问： / 「这个亚组为什么是这个数？」 / 钟时低头翻材料，翻了半分钟：「这个……我印象里统计之前解释过。」 / 明夜在桌下给你发消息：「她上午刚听过。」
  - A. 先回答数字，再补一句这个数字对当前decision意味着什么。
    - 结果：progress+4；power+2；NPC[ceo+4，mingye+3]；路线=govern；flag=v13_ceo_number
    - 成就：a90
  - B. 把完整分析表翻出来，从第一行开始讲。
    - 结果：trust+3；stamina-3；NPC[ceo-2]；路线=appease
    - 成就：a90
  - C. 让钟时自己回答。
    - 结果：power+3；trust-4；NPC[ceo-1]；路线=power
    - 成就：a90

### R17 · v13e_cso_deepdive · 二老板随机深挖
- 条件：NPC事件
- 场景：二老板原本只是路过会议室，听见一句「整体可控」后停下来。 / 「哪个风险整体可控？怎么判断的？」 / 加琳开始讲流程，钟时开始翻PPT，PVP看着桌面。 / 二老板又问：「谁能直接回答医学上为什么？」
  - A. 让真正负责医学判断的人先回答，再由流程owner补充。
    - 结果：progress+4；power+2；NPC[cso+5，pvp+4，jialin-2]；路线=govern；flag=v13_cso_owner
    - 成就：a91
  - B. 大家轮流把自己知道的部分都讲一遍。
    - 结果：trust+3；stamina-5；路线=appease
    - 成就：a91
  - C. 直接指出PV职责边界不清。
    - 结果：power+5；morale-3；NPC[cso+3，jialin-7]；路线=power
    - 成就：a91

### R18 · v13e_xiaoyuan_translate · 老板一句话，小圆一张表
- 条件：NPC事件
- 场景：老板在群里说：「这个项目要再快一点。」 / 钟时转发：「大家想办法提速。」 / 十分钟后，小圆发来一张表：合同、中心、数据、决策、资源，分别能压几天、代价是什么。 / 他问你：「你觉得真正能动的是哪两项？」
  - A. 和小圆一起把‘快一点’翻成两个可执行动作。
    - 结果：progress+6；NPC[xiaoyuan+6]；路线=govern；flag=v13_translate
    - 成就：a92
  - B. 先把所有部门都叫来brainstorm。
    - 结果：trust+3；stamina-5；NPC[yangyang+3，xiaoyuan-2]；路线=appease
    - 成就：a92
  - C. 告诉老板现有timeline已经最优。
    - 结果：power+4；trust-4；NPC[ceo-3，xiaoyuan+2]；路线=power
    - 成就：a92

### R19 · v13e_hr_patch · HR建议做一次工作坊
- 条件：NPC事件
- 场景：Clinical和PV连续两周争同一个边界问题。 / 邹婷说：「要不我们做一次协作工作坊？把大家的痛点都说出来，可能会好很多。」 / K总看着你：「边界没写清楚，工作坊能把谁的职责写出来吗？」
  - A. 先把职责和decision rights写出来，再决定是否需要工作坊。
    - 结果：progress+4；power+2；NPC[zouting+2，kzong+5]；路线=govern；flag=v13_hr_structure
    - 成就：a93
  - B. 先做工作坊，关系好了再谈职责。
    - 结果：morale+4；progress-2；NPC[zouting+6]；路线=appease
    - 成就：a93
  - C. 直接说这是组织设计问题，不是沟通问题。
    - 结果：power+4；trust-3；NPC[zouting-4，kzong+3]；路线=power
    - 成就：a93

### R20 · v13e_yijian_secret · 这个文件为什么你们看不到
- 条件：NPC事件
- 场景：一建发消息说：「这个监管反馈目前只在REG内部流转，先不要扩散。」 / 但Clinical正在根据旧版本准备回复。 / 则韩问：「我们作为内容owner为什么不能看原文？」 / 一建回复：「主要是考虑信息管理。」
  - A. 要求建立need-to-know清单，内容owner必须拿到原文。
    - 结果：progress+5；power+2；NPC[zihan+4，yijian-2]；路线=govern；flag=v13_reg_access
    - 成就：a94
  - B. 尊重REG流程，让一建摘要转述。
    - 结果：trust+4；progress-2；NPC[yijian+5]；路线=appease
    - 成就：a94
  - C. 找老板要原文。
    - 结果：power+5；trust-5；NPC[yijian-6，ceo+1]；路线=power
    - 成就：a94

### R21 · v13e_caolan_xianren · 谁来讲产品
- 条件：NPC事件
- 场景：专家会前彩排。 / 贤人讲到关键数据时停了一下：「这个亚组是不是70%？」 / 曹兰在旁边轻声补：「100–1000那组，定义和时间点别漏。」 / 武总皱眉：「到底谁来讲？」
  - A. 贤人负责专家关系和提问，曹兰负责证据内容，Medical把边界收住。
    - 结果：progress+4；NPC[xianren+2，caolan+5，wuzong+3]；路线=govern；flag=v13_postlaunch_roles
    - 成就：a95
  - B. 让贤人自己讲，毕竟他是MA。
    - 结果：trust+3；NPC[xianren+4，caolan-2]；路线=appease
    - 成就：a95
  - C. 直接让曹兰主讲。
    - 结果：progress+5；power+2；NPC[caolan+6，xianren-6]；路线=power
    - 成就：a95

### R22 · v13e_guyu_safety · BD最怕买方自己发现
- 条件：NPC事件
- 场景：谷雨在尽调准备会上问：「这几个肾脏case我们准备怎么讲？」 / 加琳说：「目前没有形成signal，不需要主动展开太多。」 / 谷雨摇头：「我不是问要不要主动讲。我是问对方自己看到以后，我们有没有一个经得起追问的答案。」
  - A. 把case事实、医学判断和公司当前结论分三层准备。
    - 结果：progress+4；career+2；NPC[guyu+6，pvp+3，jialin-1]；路线=govern；flag=v13_dd_safety
    - 成就：a96
  - B. 按加琳口径，只在被问到时回应。
    - 结果：trust+3；NPC[jialin+5，guyu-3]；路线=appease
    - 成就：a96
  - C. 让谷雨自己决定怎么包装。
    - 结果：progress+3；NPC[guyu+4，pvp-2]；路线=power
    - 成就：a96

### R23 · v13e_linline · 又多一次访视
- 条件：NPC事件
- 场景：杨杨提议为了‘保险’再加一次确认访视。 / 琳琳当场问：「一个中心多一次，一百个受试者就是一百次。谁去？患者来吗？CRC时间谁出？」 / 杨杨说：「但这样风险更低。」
  - A. 先说清这次访视具体要降低哪个风险，再找替代方式。
    - 结果：progress+4；morale+3；NPC[miaomiao+6，yangyang+1]；路线=govern；flag=v13_visit_tradeoff
    - 成就：a97
  - B. 安全优先，增加访视。
    - 结果：trust+3；stamina-4；NPC[yangyang+5，miaomiao-5]；路线=appease
    - 成就：a97
  - C. 直接否掉：「不要为了管理感加访视。」
    - 结果：power+4；trust-3；NPC[yangyang-6，miaomiao+4]；路线=power
    - 成就：a97

### R24 · v13e_lindan_mingye · 午饭桌上的组织图
- 条件：NPC事件
- 场景：午饭时林丹和明夜坐你旁边。 / 林丹说：「听说老板最近对某条线很不满意。」 / 明夜没抬头：「你说的是他昨天随口那句，还是已经有人要掉下去了？」 / 林丹笑：「所以才问你嘛。」
  - A. 只把它当风向，不拿去做正式判断。
    - 结果：insight+3；NPC[linan+3，mingye+4]；路线=govern；flag=v13_gossip_used
    - 成就：a98
  - B. 马上调整站位，离那条线远一点。
    - 结果：power+2；NPC[linan+4]；路线=appease
    - 成就：a98
  - C. 追问林丹消息源。
    - 结果：insight+2；NPC[linan-3，mingye+3]；路线=power
    - 成就：a98

### R25 · v13e_susu_wu · 谁拥有医学判断
- 条件：NPC事件
- 场景：武总说：「MA这边今天必须给出一个post-marketing研究方向。」 / 苏苏问：「这个方向是业务负责人定，还是医学负责人定？」 / 武总笑：「我管理MA，当然要推动他们给结果。」 / 贤人在旁边点头点得很认真。
  - A. 把业务目标、医学问题和最终医学判断拆开，分别定owner。
    - 结果：progress+4；power+2；NPC[weilai+5，wuzong+2，xianren+1]；路线=govern；flag=v13_medical_boundary
    - 成就：a99
  - B. 既然MA归武总，就由他统一。
    - 结果：trust+4；NPC[wuzong+5，weilai-4]；路线=appease
    - 成就：a99
  - C. 直接说武总没有医学判断权。
    - 结果：power+5；trust-4；NPC[wuzong-7，weilai+3]；路线=power
    - 成就：a99

### R26 · v14_capacity · 一张容量表能装几个人
- 条件：NPC事件
- 场景：K总把三期、NDA和新项目排进同一张资源表。钟时说：「不用写谁做，大家灵活支持。」杨杨问谁能复核中心启动包，琳琳看见自己的名字出现了四次。
  - A. 明确每个人的容量，删掉一个没有资源的里程碑。
    - 结果：progress+3；morale+5；power+2；NPC[kzong+5，yangyang+2，miaomiao+4]；路线=govern；flag=v14_0_0
    - 成就：a100
  - B. 先答应全部节点，之后靠加班补。
    - 结果：progress+5；stamina-7；morale-5；NPC[kzong-3，miaomiao-4]；路线=appease；flag=v14_0_1
    - 成就：a100
  - C. 把所有关键事项收到自己手里。
    - 结果：power+6；stamina-5；dragon+2；NPC[kzong-2，yangyang-3]；路线=power；flag=v14_0_2
    - 成就：a100

### R27 · v14_safety_copy · 安全信号的传播顺序
- 条件：NPC事件
- 场景：PVP把三例相似事件的时间线放在桌上。加琳说尚未形成signal；谷雨问尽调材料能不能写「未见风险」。钟时建议先统一措辞，医学判断下周再讨论。
  - A. 先确认事实与医学判断，宣传措辞最后写。
    - 结果：progress+3；trust-1；NPC[pvp+5，guyu+3，jialin+2]；路线=govern；flag=v14_1_0
    - 成就：a101
  - B. 按「未形成signal」先出材料。
    - 结果：trust+5；progress+2；NPC[guyu-4，pvp-3]；路线=appease；flag=v14_1_1
    - 成就：a101
  - C. 公开指责PV在掩盖风险。
    - 结果：power+5；trust-5；NPC[jialin-7，pvp+2]；路线=power；flag=v14_1_2
    - 成就：a101

### R28 · v14_signature · 最终版的最后一个签名
- 条件：NPC事件
- 场景：肖恩发现NDA模块的审批链缺一位医学Owner。钟时说：「我Review过很多次，可以先提交，签字后补。」一建提醒递交窗口还有四小时。
  - A. 找回医学Owner，保留版本差异并重新确认提交包。
    - 结果：progress+2；power+2；NPC[xiaoen+5，yijian+3]；路线=govern；flag=v14_2_0
    - 成就：a102
  - B. 先提交，回头补签。
    - 结果：progress+6；trust+4；blame+5；NPC[xiaoen-6，yijian+2]；路线=appease；flag=v14_2_1
    - 成就：a102
  - C. 你替所有人签，并要求他们以后向你报告。
    - 结果：power+7；dragon+4；blame+4；NPC[xiaoen-5，zihan-3]；路线=power；flag=v14_2_2
    - 成就：a102

### R29 · v14_site_time · 中心多出来的一百个小时
- 条件：NPC事件
- 场景：杨杨建议给一百名受试者各加一次非计划访视。琳琳问CRC从哪里来，N院长问患者的交通费谁付。钟时说：「为了稳妥，这点工作量应该可以克服。」
  - A. 量化患者负担，先试既有访视合并检查。
    - 结果：progress+4；morale+3；NPC[miaomiao+5，niupi+4，yangyang+1]；路线=govern；flag=v14_3_0
    - 成就：a103
  - B. 照建议加访视，中心自行协调。
    - 结果：trust+4；progress+2；NPC[miaomiao-6，niupi-3]；路线=appease；flag=v14_3_1
    - 成就：a103
  - C. 直接否决，谁再提就自己去中心执行。
    - 结果：power+5；trust-3；NPC[miaomiao+3，yangyang-6]；路线=power；flag=v14_3_2
    - 成就：a103

### R30 · v14_interim · 这张中期图能不能上会
- 条件：NPC事件
- 场景：明夜指出中期亚组的分母只剩十二人。老板看了曲线，说：「趋势很好，给我放第一页。」则韩问SAP是否事先定义过这个切法。
  - A. 标注探索性、人数和限制，讨论真正需要的下一步。
    - 结果：progress+3；career+2；NPC[mingye+5，zihan+4，ceo-1]；路线=govern；flag=v14_4_0
    - 成就：a104
  - B. 先按老板要求上会，限制放附录。
    - 结果：trust+5；power+2；NPC[mingye-4，zihan-3]；路线=appease；flag=v14_4_1
    - 成就：a104
  - C. 当众说老板不懂统计，把图撤掉。
    - 结果：power+5；trust-7；NPC[ceo-8，mingye+2]；路线=power；flag=v14_4_2
    - 成就：a104

### R31 · v14_postmarket · 上市以后谁有资格说医学
- 条件：NPC事件
- 场景：武总希望MA下周宣布上市后研究方向。苏苏问预算，曹兰说证据还不足，贤人已经邀请好专家。钟时建议Clinical「配合一下」。
  - A. 业务目标与医学问题分开，约定证据门槛和各自Owner。
    - 结果：progress+3；power+2；NPC[caolan+5，weilai+4，wuzong+2]；路线=govern；flag=v14_5_0
    - 成就：a105
  - B. 先让市场定方向，医学随后补材料。
    - 结果：trust+4；progress+3；NPC[wuzong+5，caolan-4]；路线=appease；flag=v14_5_1
    - 成就：a105
  - C. Clinical接管研究，MA只负责传话。
    - 结果：power+6；dragon+2；NPC[wuzong-7，xianren-4]；路线=power；flag=v14_5_2
    - 成就：a105

### R32 · v14_budget · 预算会里的沉默项目
- 条件：NPC事件
- 场景：苏苏要求删掉一项没有清晰决策用途的分析，二老板想留着探索，老板又提出一项新实验。没人主动说钱从哪里来。
  - A. 逐项说清决策价值与成本，请老板选择取舍。
    - 结果：power+3；progress+2；NPC[weilai+5，cso+3，ceo+1]；路线=govern；flag=v14_6_0
    - 成就：a106
  - B. 全留着，下一季度再申请预算。
    - 结果：trust+4；progress-2；NPC[weilai-5，cso+2]；路线=appease；flag=v14_6_1
    - 成就：a106
  - C. 直接砍掉二老板的探索项，保留老板的新想法。
    - 结果：power+5；trust+2；NPC[ceo+5，cso-7，weilai+1]；路线=power；flag=v14_6_2
    - 成就：a106

### R33 · v14_endpoint · 主要终点的第四种说法
- 条件：NPC事件
- 场景：锁库前钟时又说主要终点「最好更符合现在的趋势」。则韩把方案、SAP、会议纪要并排打开。明夜看着你，等你说这是不是一次正式变更。
  - A. 维持预设分析，将新问题列为明确标注的探索项。
    - 结果：progress+4；career+2；NPC[zihan+5，mingye+5]；路线=govern；flag=v14_7_0
    - 成就：a107
  - B. 先换口径写摘要，正式文件以后再对齐。
    - 结果：trust+5；progress+2；blame+4；NPC[zihan-6，mingye-5]；路线=appease；flag=v14_7_1
    - 成就：a107
  - C. 直接公布钟时之前三次说法，让她当场认错。
    - 结果：power+6；trust-6；NPC[zihan+2，mingye+2]；路线=power；flag=v14_7_2
    - 成就：a107

### R34 · v14_successor · 谁能在你请假时做决定
- 条件：NPC事件
- 场景：邹婷问团队是否有接班人。K总说流程不能靠一个人记在脑子里。钟时说：「你带得很好，所以目前还是你最合适。」
  - A. 给杨杨和琳琳真实决策边界，留一张可交接的运行图。
    - 结果：morale+5；power+2；NPC[yangyang+4，miaomiao+4，kzong+4]；路线=govern；flag=v14_8_0
    - 成就：a108
  - B. 先不交接，忙过这一阵再培养。
    - 结果：progress+4；stamina-4；NPC[zouting+2，yangyang-2]；路线=appease；flag=v14_8_1
    - 成就：a108
  - C. 指定自己为所有决定的最终审批人。
    - 结果：power+7；dragon+4；morale-4；NPC[kzong-5，miaomiao-4]；路线=power；flag=v14_8_2
    - 成就：a108

## 4. PI「按下葫芦浮起瓢」连锁事件

### pi_chain_lead · 两个Leading，只有一个封面
- 触发层：v14.2 maybeEvent覆盖层；核心PI关系达到条件后插入。
  - A. 替VP分别安抚两边，暂时不谈边界。
    - 结果：trust+4；NPC[houpi+6，niupi-6]
    - 成就：—
  - B. 把主论文、机制论文、样本使用和decision right写成一页学术治理规则，在老板和两位PI面前确认。
    - 结果：power+5；progress+3；NPC[houpi+5，niupi+5]
    - 成就：—
  - C. 让钟时继续逐个承诺，你只把每句话同步进会议纪要。
    - 结果：power+3；trust-5；NPC[houpi+4，niupi-4]
    - 成就：—

### pi_chain_site · 中心贡献账不会自动归零
- 触发层：v14.2 maybeEvent覆盖层；核心PI关系达到条件后插入。
  - A. 先去安抚林主任，说后面还有机会。
    - 结果：trust+3；NPC[zhangpi+5，houpi-4]
    - 成就：—
  - B. 把中心贡献、额外工作量和学术回报做成公开台账，后续机会按贡献触发。
    - 结果：power+4；morale+4；NPC[zhangpi+6，houpi+3]
    - 成就：—
  - C. 维持原安排，让钟时自己解释。
    - 结果：trust+5；progress-2；NPC[zhangpi-7，houpi+5]
    - 成就：—

## 5. 隐藏私人生活/爱情线

    人生构筑最后一个有效婚恋状态
    ├─ partnered / partnered_family
    │  ├─ 开局拥有隐藏心力支持，但HUD不显示
    │  └─ HOME_EVENTS → homeBond>0维持 / homeBond≤0疏离
    ├─ divorced_rebuilt → 后续新关系 / 独立重建 两种尾声
    ├─ single_content → 后续新关系 / 保持单身 两种尾声
    ├─ guarded / strained → 建立信任 / 保持距离 两种尾声
    └─ open → ROMANCE_ENCOUNTERS 或三幕隐藏love线 → new_partner / 无关系尾声

### 三幕隐藏 love 线
- A「23:47」：Heart ≤35，且至少第2章。
- B「周日」：A后至少3章。
- C「那句话」：B后至少3章且 Heart ≤55；成功选择后进入隐藏稳定关系。

### 线下关系事件
- **楼下最后一家还开着的店**：最早章节 3。
- **出差回程的高铁**：最早章节 6。
- **发烧的周日**：最早章节 8。
- **“你每次都说忙完这一阵”**：最早章节 10，bond≥4。
- **周六下午四点**：最早章节 12，bond≥7。

### 稳定家庭维护事件
- **饭已经热过两次**：第5章后可能出现。
- **这个周末原本没有项目**：第10章后可能出现。
- **你最近回家以后不说话**：第14章后可能出现；homeBond≤0进入 estranged。

## 6. 终局判定优先级

    finalizeEvaluation
    ├─ NG+ 龙之回声拒绝路径满足 → 旧finalize / true_afterdragon链
    ├─ progress≥60 & dragon≥10 & power≥65 & merit≥45 & 主动接管 → true_dragon
    ├─ 极高dragon/power/merit → 旧finalize兜底
    ├─ 存活且progress≥60
    │  ├─ v14联合事件条件 + 终章route匹配 → 5个联合回响结局
    │  └─ 单个v14Candidate + 终章route匹配 → 27个事件回响结局
    ├─ progress≥60
    │  ├─ merit≥70 & reputation≥45 & bossTrust≥45 & 晋升支持≥3 → ge_promotion
    │  ├─ merit≥75 & reputation<35 → ge_unsung
    │  ├─ main_18_3 & dragon<10 & power≥65 & 支持者≥3 → ge_slayer
    │  ├─ 小圆/曹兰/瑞冬/黑娜关系条件 → NPC结局
    │  ├─ main_18_1 & career≥75 & dragon<10 → ge_next
    │  └─ main_18_1 & career≥55 & dragon<10 → ge_firstline
    ├─ 35≤progress<60
    │  ├─ hidden love & heart≥50 & dragon≤6 → nc_love
    │  ├─ 苏苏关系≥60 → nc_weilai
    │  ├─ 所有人关系≤30 → be_island
    │  ├─ trust≥45 & morale≥45 & sanity≥35 → mid_halfbridge
    │  └─ trust≥35 & morale≥35 & sanity≥35 → ge_survive
    └─ 旧finalize → 其余BE/GE/隐藏结局
    
    主结局显示后 → relationshipEpilogue() 根据初始婚恋状态和本局隐藏关系发展追加私人生活尾声

## 7. v14事件回响组合
- **v14_joint_capacity · 没有人力的关键路径**：容量与预算类事件走 govern，终章匹配 govern。
- **v14_joint_paper · 纸面责任链**：安全拷贝/签字类事件组合走 govern。
- **v14_joint_site · 中心不是无限资源**：中心时间与资源类组合走 govern。
- **v14_joint_story · 漂亮故事的两份分母**：中期图与终点叙事组合走 appease。
- **v14_joint_dragon · 新的龙有审批权限**：上市后/继任类组合走 power。

## 8. 当前已知设计债（非运行时报错）
- 18章与34个标准随机事件的基础数据仍是固定3选1；理智系统会污染措辞/代价，但尚未真正按Heart/Sanity/人格动态增加第4、第5个选项。建议下一版独立重构，以免本次Bug修复同时改变108成就槽位和64结局分布。
- 文件仍有v7–v14多层函数包装。运行检查通过，但维护风险高；整段删除旧代码前必须先做依赖图。