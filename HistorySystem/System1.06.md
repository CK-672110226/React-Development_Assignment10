# System1.06 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Reorganized mixed-scope history files so `Assignment1` now contains only true Lab 1 records, while mis-scoped Lab 2-era artifacts were moved out of the Assignment1 folder.

## Reason

The user requested cleanup of unrelated history files under Assignment1. To preserve audit trail without deleting records, mis-scoped entries were moved to a legacy archive path under Assignment2.

## Changes

1. Updated HistoryVersions structure
   - Created `HistoryVersions/Assignment2/LegacyFromAssignment1/`.

2. Moved files from Assignment1 to Assignment2 legacy archive
   - Moved:
     - `HistoryVersions/Assignment1/Assignment1.02.md`
     - `HistoryVersions/Assignment1/Assignment1.03.md`
     - `HistoryVersions/Assignment1/Assignment1.04.md`
     - `HistoryVersions/Assignment1/Assignment1.05.md`
     - `HistoryVersions/Assignment1/Assignment1.06.md`
     - `HistoryVersions/Assignment1/Assignment1.07.md`
   - New locations:
     - `HistoryVersions/Assignment2/LegacyFromAssignment1/Assignment1.02.md` ... `Assignment1.07.md`

3. Resulting Assignment1 scope cleanup
   - `HistoryVersions/Assignment1/` now contains only:
     - `Assignment1.00.md`
     - `Assignment1.01.md`

## Validation

- Listed `HistoryVersions/Assignment1/` and verified only Lab 1 files remain.
- Listed `HistoryVersions/Assignment2/LegacyFromAssignment1/` and verified all moved files exist.

## Notes

- Canonical Lab 2 history remains `HistoryVersions/Assignment2/Assignment2.00.md` onward.
- Canonical Lab 3 history remains `HistoryVersions/Assignment3/Assignment3.00.md` onward.
