# Dragon Office · Version Rollback Guide

## Current stable baseline
- Stable rollback branch: `archive/v14.6`
- Source: `main` at the moment v14.7 development started
- Purpose: exact pre-v14.7 recovery point

## v14.7 candidate
- Candidate branch: `release/v14.7-stamina-coverage`
- Scope: stamina-based event coverage + optional delivery side system
- `main` remains unchanged until v14.7 is accepted.

## Rollback policy
If v14.7 pacing, balance, or event density is unsatisfactory, restore from `archive/v14.6` rather than manually reverting individual mechanics.

Recommended release flow:
1. Test `release/v14.7-stamina-coverage`.
2. If accepted, merge that branch into `main`.
3. Keep `archive/v14.6` as the permanent rollback point for this release.
4. If rejected, abandon the v14.7 branch and continue from `archive/v14.6` / `main`.

## Version boundary
The v14.7 stamina coverage implementation is contained in a labeled runtime block:

`v14.7 · STAMINA COVERAGE / DELIVERY SIDE SYSTEM`

This makes later removal or comparison with v14.6 straightforward.
