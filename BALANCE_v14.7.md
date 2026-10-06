# v14.7 Balance Review — Stamina / Recruitment / Direct Reports

## Scope
This review focuses on the new v14.7 systems:
- stamina-based extra delivery coverage;
- recruitment attractiveness and headcount gates;
- direct-report capability distribution;
- visible management-state effects;
- weak-hire catch-up growth;
- delegation success / partial-cover / failure penalties.

## Recruitment balance

Representative player states using the current attraction formula:

| Player state | Approx. recruitment attraction |
|---|---:|
| Just unlocked first headcount (Power ~35) | ~39 |
| Mid-game manager (Power ~55) | ~54 |
| High-level manager (Power ~75) | ~67 |

Interpretation:
- Early managers mostly compete for junior/growth candidates.
- Mid-game managers can realistically recruit mature Medical Manager / Senior Scientist candidates.
- High-end Senior candidates become reliably attainable only after the player has accumulated power, career, reputation and management capability.

This keeps headcount from functioning as an immediate free power spike.

## Weak-hire growth

Representative weak hires:
- 孙可: starting overall capability ~42, Learning 74, Potential ~88.
- 陶然: starting overall capability ~43, Learning 80, Potential ~91.

With approximately 6 formal development sessions distributed across the 18-chapter run, alternating judgment and execution training:
- both reach overall capability ~56 before counting additional on-the-job growth;
- adding several coaching interactions and real assignment XP can raise them to roughly ~59–60 overall;
- they become highly reliable for matched low/medium-complexity work;
- they become viable, but not dominant, on medium-complexity medical work;
- they remain risky for highly complex PI/scientific judgment without further development.

This is the intended catch-up curve: weak hires can become strong, but only by consuming manager time and carrying interim delivery risk.

## Delegation checks

At baseline:
- junior hires are strong enough for matched simple tasks such as version management / handoff;
- the same junior hires have very high failure probability when assigned immediately to complex safety, regulatory or PI-facing tasks;
- mature Medical Manager-level hires independently complete most matched medical work;
- Senior-level hires can remove substantial manager workload but require a much stronger player profile to recruit.

After sustained coaching:
- Trust, Initiative and Confidence increase the real delegation score;
- Dependence and Burnout reduce it;
- repeated manager takeover therefore creates a measurable long-term productivity penalty.

## Penalty calibration

Current delegation outcomes:
- independent completion: minimal manager stamina cost;
- partial success / manager cover: Stamina -10, Heart -3;
- major failure / emergency redo: Stamina -18, Heart -6, Blame +3, Progress -1;
- failure without enough manager stamina to rescue: Heart -8, Blame +6, Progress -4.

The failure penalty is intentionally large enough that hiring a weak report is not automatically superior to remaining an individual contributor.

## Stamina coverage

Current v14.7 target distribution:
- low-stamina build: ~1–2 extra deliveries/run;
- standard build: ~2–3;
- high-stamina build: ~4–5;
- high-stamina / iron-style build: ~5–7;
- hard run cap: 10.

From the 7th extra delivery onward, Progress and Merit gains are capped to prevent high-stamina + strong-team builds from snowballing numerically.

## Decision

**Keep current v14.7 thresholds for playtest.**

No additional nerf is recommended before human playtest because:
1. junior staff are currently risky enough to matter;
2. catch-up is possible but requires repeated investment;
3. mature hires are gated by player attractiveness;
4. delegation failure remains expensive;
5. stamina coverage has diminishing returns and a hard cap.

The next tuning pass should be based on actual playtest behavior:
- whether players over-select takeover because it is psychologically safer;
- whether junior development feels too slow or too cheap;
- whether Senior hires remove too much late-game tension;
- whether team management crowds out the 18-chapter main narrative.
