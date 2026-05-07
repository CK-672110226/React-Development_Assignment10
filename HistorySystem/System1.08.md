# System1.08 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Added an explicit rule for canonical vs legacy history organization across all assignments so future cleanup work is consistent and non-destructive.

## Reason

After multi-assignment reorganization, the repository now needs a clear permanent rule that defines where canonical records must live, where legacy records must be moved, and how future updates should continue.

## Changes

1. Updated .github/copilot-instructions.md
   - Added `Canonical vs Legacy Organization Rule`.
   - Defined that assignment root folders must contain only canonical sequences.
   - Defined that mis-scoped/superseded files must be moved to named legacy subfolders.
   - Reinforced non-destructive handling (no deletion of historical records).
   - Required assignment + system history notes whenever reorganization occurs.
   - Clarified that future canonical updates must continue from assignment root, not legacy folders.

2. Added HistorySystem/System1.08.md
   - Recorded this rule/process update.

## Validation

- Verified `.github/copilot-instructions.md` contains `Canonical vs Legacy Organization Rule`.
- Verified system history incremented from `System1.07.md` to `System1.08.md`.

## Notes

- This update is process-only and does not affect runtime code behavior.
