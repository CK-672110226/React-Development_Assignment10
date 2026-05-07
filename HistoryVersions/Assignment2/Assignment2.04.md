# Assignment2.04 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Validated Lab 2 Redux interaction flow in the running app (add and delete) and corrected Lab 2 history placement/versioning into the proper Assignment2 folder sequence.

## Reason

Lab 2 work was previously recorded under Assignment1.02-Assignment1.05. Per repository versioning rules, Lab 2 must start at Assignment2.00. This update fixes audit structure and captures a fresh verification pass.

## Changes

1. Added HistoryVersions/Assignment2/Assignment2.00.md
   - Rebased prior Lab 2 migration baseline record from Assignment1.02.
   - Corrected title to Assignment2.00.

2. Added HistoryVersions/Assignment2/Assignment2.01.md
   - Rebased prior Redux read-only selector integration from Assignment1.03.
   - Corrected title to Assignment2.01.

3. Added HistoryVersions/Assignment2/Assignment2.02.md
   - Rebased prior addStudent dispatch integration from Assignment1.04.
   - Corrected title to Assignment2.02.
   - Corrected previous-version reference from Assignment1.03 to Assignment2.01.

4. Added HistoryVersions/Assignment2/Assignment2.03.md
   - Rebased prior deleteStudent dispatch integration from Assignment1.05.
   - Corrected title to Assignment2.03.
   - Corrected previous-version reference from Assignment1.04 to Assignment2.02.

## Validation

- Launched app with `npm run dev` and verified initial UI state shows 5 students.
- Added one student via form and confirmed UI updated to 6 students with summary changes.
- Deleted the newly added student and confirmed UI returned to 5 students with summary restored.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.

## Notes

- Existing Assignment1.02-Assignment1.05 files were retained to preserve prior audit trail and avoid destructive history removal.
- In this tool environment, Redux browser extension panels (Redux tab / Jump controls) cannot be automated directly; add/delete behavior verification was completed through UI state transitions. Manual DevTools check in Chrome can confirm action log and time-travel controls.
