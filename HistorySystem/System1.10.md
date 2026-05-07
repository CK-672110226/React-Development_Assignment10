# System1.10 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Added assignment-level index files for all three assignment folders and updated process rules so HistoryVersions root index must be updated in the same task whenever structure changes.

## Reason

The user requested both follow-up actions:
- add index files in each assignment for quick canonical/legacy navigation
- enforce README synchronization when HistoryVersions structure changes

## Changes

1. Updated .github/copilot-instructions.md
   - Extended `Canonical vs Legacy Organization Rule`.
   - Added requirement to update `HistoryVersions/README.md` whenever `HistoryVersions/` structure changes.

2. Added assignment index files
   - Added `HistoryVersions/Assignment1/INDEX.md`
   - Added `HistoryVersions/Assignment2/INDEX.md`
   - Added `HistoryVersions/Assignment3/INDEX.md`

3. Updated HistoryVersions/README.md
   - Added links/references to each assignment `INDEX.md`.
   - Kept canonical and legacy map consistent with current structure.

4. Added HistorySystem/System1.10.md
   - Recorded this process and documentation update.

## Validation

- Verified `INDEX.md` exists in Assignment1, Assignment2, and Assignment3 folders.
- Verified `.github/copilot-instructions.md` contains the new README-sync rule line.
- Verified `HistoryVersions/README.md` references all assignment index files.

## Notes

- This update is documentation/process only and does not affect runtime application behavior.
