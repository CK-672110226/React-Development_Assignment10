# Assignment4.10 History

Date: 12 May 2026 (12 พฤษภาคม 2569)

## Overview

Normalized the remaining `courses` and `grades` slices with entity adapters so all collection slices now use the same O(1) entity lookup pattern.

## Reason

The performance checklist called for normalization across the app. After `students` was converted, `courses` and `grades` still used array-backed state and O(n) mutation paths.

## Changes

1. Added src/features/courses/coursesAdapter.js
   - Created a shared entity adapter for the courses collection.

2. Updated src/features/courses/coursesSlice.js
   - Replaced array-backed list state with adapter-backed state.
   - Switched add/delete reducers to adapter helpers.

3. Added src/features/grades/gradesAdapter.js
   - Created a shared entity adapter for the grades collection.

4. Updated src/features/grades/gradesSlice.js
   - Replaced array-backed list state with adapter-backed state.
   - Switched add/update/delete reducers to adapter helpers.

5. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced the canonical Assignment 4 chain to include `Assignment4.10.md`.

6. Updated HistoryVersions/README.md
   - Synced the Assignment 4 canonical chain to `Assignment4.10.md`.

## Validation

- Ran `npm test` successfully.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.

## Notes

- No UI consumers currently depend on `courses.list` or `grades.list`, so this change stays inside the slice layer.