/* Dragon Office RC ending-priority contract tests.
 * This file intentionally tests the resolver contract independently from DOM/UI code.
 * Wire production finalizeEvaluation() to the same ordering before RC PASS.
 */
'use strict';

const PRIORITY = Object.freeze({
  DUEL: 0,
  TRUE: 1,
  CAREER: 2,
  JOINT: 3,
  EVENT: 4,
  NPC: 5,
  GENERIC: 6,
  LEGACY: 7,
});

function firstTruthy(items) {
  for (const item of items) if (item && item.when) return item.id;
  return null;
}

function resolveEnding(s) {
  // P0 — special terminal mechanism. A duel result exists only after shouldDuel() has fired.
  let hit = firstTruthy([
    { id: 'duelWin', when: !!s.duelWin },
    { id: 'duelLose', when: !!s.duelLose },
  ]);
  if (hit) return hit;

  // P1 — cross-run / hidden core routes.
  hit = firstTruthy([
    { id: 'true_afterdragon', when: !!s.trueAfterdragon },
    { id: 'true_dragon', when: !!s.trueDragon },
    { id: 'ge_slayer', when: !!s.slayer },
  ]);
  if (hit) return hit;

  // P2 — whole-run career trajectory.
  hit = firstTruthy([
    { id: 'ge_promotion', when: !!s.promotion },
    { id: 'ge_unsung', when: !!s.unsung },
    { id: 'ge_next', when: !!s.next },
    { id: 'ge_firstline', when: !!s.firstline },
  ]);
  if (hit) return hit;

  // P3 — combined v14 consequences beat their component event ending.
  hit = firstTruthy([
    { id: 'v14_joint_capacity', when: !!s.jointCapacity },
    { id: 'v14_joint_paper', when: !!s.jointPaper },
    { id: 'v14_joint_site', when: !!s.jointSite },
    { id: 'v14_joint_story', when: !!s.jointStory },
    { id: 'v14_joint_dragon', when: !!s.jointDragon },
  ]);
  if (hit) return hit;

  // P4 — one-event echo. Candidate must already be a registered v14 ending id.
  if (/^v14_[0-8]_[0-2]$/.test(s.v14Candidate || '')) return s.v14Candidate;

  // P5 — NPC/relationship specialization. nc_love is a public ending only when
  // the project did not fully succeed; private relationship epilogue remains orthogonal.
  hit = firstTruthy([
    { id: 'nc_xiaoyuan', when: !!s.ncXiaoyuan },
    { id: 'nc_caolan', when: !!s.ncCaolan },
    { id: 'nc_ruidong', when: !!s.ncRuidong },
    { id: 'nc_heina', when: !!s.ncHeina },
    { id: 'nc_weilai', when: !!s.ncWeilai },
    { id: 'nc_love', when: !!s.ncLove && !s.projectFullySuccessful },
  ]);
  if (hit) return hit;

  // P6 — middle/generic survival endings.
  hit = firstTruthy([
    { id: 'be_island', when: !!s.island },
    { id: 'mid_halfbridge', when: !!s.halfbridge },
    { id: 'ge_survive', when: !!s.survive },
    { id: 'be_trust', when: !!s.beTrust },
    { id: 'be_progress', when: !!s.beProgress },
  ]);
  if (hit) return hit;

  return s.legacy || null;
}

const cases = [
  ['duel beats true route', { duelWin:true, trueDragon:true }, 'duelWin'],
  ['true route beats career', { trueDragon:true, promotion:true }, 'true_dragon'],
  ['true route beats joint', { trueAfterdragon:true, jointCapacity:true }, 'true_afterdragon'],
  ['true route beats event', { slayer:true, v14Candidate:'v14_0_0' }, 'ge_slayer'],
  ['career beats joint', { promotion:true, jointCapacity:true }, 'ge_promotion'],
  ['career beats event', { unsung:true, v14Candidate:'v14_4_1' }, 'ge_unsung'],
  ['joint beats event', { jointPaper:true, v14Candidate:'v14_2_0' }, 'v14_joint_paper'],
  ['career beats NPC', { next:true, ncXiaoyuan:true }, 'ge_next'],
  ['event beats NPC', { v14Candidate:'v14_8_2', ncHeina:true }, 'v14_8_2'],
  ['NPC beats generic', { ncCaolan:true, survive:true }, 'nc_caolan'],
  ['love public ending blocked by full project success', { ncLove:true, projectFullySuccessful:true, survive:true }, 'ge_survive'],
  ['love public ending allowed when project incomplete', { ncLove:true, projectFullySuccessful:false, survive:true }, 'nc_love'],
  ['invalid event candidate cannot hijack resolver', { v14Candidate:'ge_promotion', beTrust:true }, 'be_trust'],
  ['legacy is last fallback', { legacy:'legacy_old_finalize' }, 'legacy_old_finalize'],
];

function runEndingPriorityContract() {
  const failures = [];
  for (const [name, state, expected] of cases) {
    const actual = resolveEnding(state);
    if (actual !== expected) failures.push({ name, expected, actual, state });
  }
  return { pass: failures.length === 0, total: cases.length, failures };
}

if (typeof module !== 'undefined') module.exports = { PRIORITY, resolveEnding, runEndingPriorityContract, cases };
if (typeof window !== 'undefined') window.RCEndingPriorityContract = { PRIORITY, resolveEnding, runEndingPriorityContract, cases };
