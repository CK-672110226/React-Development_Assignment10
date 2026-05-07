# Assignment4.06 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Completed end-to-end integration verification and fixed two data-layer issues that made API linkage appear inconsistent: silent local fallback during remote CRUD failures and unsynchronized major selection value on add.

## Reason

User reported that the app looked disconnected. E2E checks showed:
- Added records could appear in UI without persisting remotely when remote calls failed transiently, because thunks silently fell back to local storage on `TypeError`.
- Major dropdown could submit as `Undeclared` even when a course major was visibly selected.

## Changes

1. Updated src/features/students/studentsThunks.js
   - Removed silent `TypeError` fallback branches for remote `fetchStudents`, `addStudentAsync`, `updateStudentAsync`, and `deleteStudentAsync`.
   - Remote mode now reports actual API failure instead of creating local-only ghost records.
   - Added default normalization for missing majors:
     - if `major` is missing/blank from student API, set to `Undeclared`.

2. Updated src/components/AddStudentForm.jsx
   - Fixed major submission sync:
     - submit now uses `form.major || majorOptions[0] || 'Undeclared'`.
     - after successful add, form resets with default major from options.
     - select value now binds as `form.major || majorOptions[0]` so displayed value matches submitted value.

3. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced canonical chain to `Assignment4.00.md to Assignment4.06.md`.

4. Updated HistoryVersions/README.md
   - Synced Assignment 4 canonical chain to `Assignment4.00.md` through `Assignment4.06.md`.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm test` successfully.
  - 2 test files passed, 15 tests passed.
- Ran `npm run build` successfully.
- Manual E2E verification on `http://127.0.0.1:4173/`:
  - Initial load: students API + courses API loaded.
  - Add: new record persisted to backend (verified by API response containing `E2E Persist Check`).
  - Edit: updated row reflected in UI.
  - Delete: backend record removed and row cleared from UI after async completion.

## Notes

- Delete result can appear with slight delay before UI refreshes after dialog confirmation due async request completion timing.
- Existing records without `major` from backend now render as `Undeclared` for clarity.
