# Assignment4.09 History

Date: 12 May 2026 (12 พฤษภาคม 2569)

## Overview

Improved student-data rendering performance by normalizing the students slice with `createEntityAdapter`, memoizing derived selectors, and moving row-level lookups into memoized child components.

## Reason

The dashboard and explorer were repeatedly deriving arrays from the full student list and doing O(n) lookups in row-level UI. That created unnecessary reference churn and made row updates broader than needed.

## Changes

1. Updated src/features/students/studentsAdapter.js
   - Added a shared entity adapter for students.
   - Normalized student ids to strings for stable entity keys.

2. Updated src/features/students/studentsSlice.js
   - Replaced array-only list state with adapter-backed `ids`/`entities` state.
   - Switched CRUD fulfilled handlers to adapter helpers: `setAll`, `addOne`, `upsertOne`, and `removeOne`.

3. Updated src/features/students/selectors.js
   - Exported adapter selectors for ids, entities, all students, count, and lookup by id.
   - Added memoized selectors for unique majors, high achievers, and filtered explorer results.

4. Updated src/features/students/studentsThunks.js
   - Switched fetch-time merge logic to read the current students list through the selector layer.

5. Added src/components/StudentRow.jsx
   - Split row rendering into a memoized child component.
   - Each row now selects its own student entity by id.

6. Updated src/components/StudentTable.jsx
   - Switched table rendering to ids plus row components.
   - Changed edit state to store only the selected student id.

7. Updated src/components/EditModal.jsx
   - Changed the modal to select the student by id and initialize its local form from that entity.

8. Updated src/pages/DataExplorerPage.jsx
   - Moved unique-major and filtered-list derivation into memoized selectors.
   - Kept local filter inputs in component state.

9. Updated src/features/students/selectors.test.js
   - Adjusted coverage for adapter-backed state shape.
   - Added checks for ids, unique majors, and memoized filtering.

10. Updated src/features/students/studentsSlice.test.js
   - Adjusted reducer tests for adapter-backed state shape and helper-driven CRUD updates.

11. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced the canonical Assignment 4 chain to include `Assignment4.09.md`.

12. Updated HistoryVersions/README.md
   - Synced the Assignment 4 canonical chain to `Assignment4.09.md`.

## Validation

- Ran `npm test` successfully.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.

## Notes

- Scope was intentionally limited to the students slice and its heaviest consumers.
- `courses` and `grades` remain array-based because they are not currently the dominant read path in the UI.