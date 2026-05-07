# System1.07 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Performed a full cross-assignment history organization pass so Assignment1, Assignment2, and Assignment3 each have clearer canonical scope boundaries with legacy archives for mis-scoped records.

## Reason

The user requested complete organization across all three assignments, similar to prior cleanup. This required aligning each assignment root to its intended lab scope while preserving all older records non-destructively.

## Changes

1. Assignment1 scope (already cleaned in prior step)
   - Confirmed `HistoryVersions/Assignment1/` contains only:
     - `Assignment1.00.md`
     - `Assignment1.01.md`

2. Assignment2 scope cleanup
   - Created `HistoryVersions/Assignment2/LegacyFromAssignment2MisScopedLab3/`.
   - Moved mis-scoped Lab 3 files from root:
     - `Assignment2.06.md` to `Assignment2.09.md`
   - Added `HistoryVersions/Assignment2/Assignment2.11.md` to record cleanup state.

3. Assignment3 canonical rebuild
   - Archived previous broad rebase chain into:
     - `HistoryVersions/Assignment3/LegacyFromPreviousRebase/`
   - Rebuilt canonical Assignment3 root from actual Lab 3 records:
     - `Assignment3.00.md` to `Assignment3.03.md`
   - Added `HistoryVersions/Assignment3/Assignment3.04.md` to document reorganization.

4. Added HistorySystem/System1.07.md
   - Recorded this full 3-assignment organization process update.

## Validation

- Verified Assignment1 root has only Lab 1 canonical files.
- Verified Assignment2 root contains canonical Lab 2 chain plus redirect notes, with mis-scoped Lab 3 files moved to legacy archive.
- Verified Assignment3 root now starts at clean canonical `Assignment3.00` and previous rebase files are retained in legacy archive.

## Notes

- All reorganizations were non-destructive; no historical files were deleted.
- Future updates should continue from each assignment root canonical chain and only use legacy folders for archival lookup.
