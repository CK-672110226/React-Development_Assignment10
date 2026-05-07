# Assignment3.05 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Added student edit capability to the Redux-connected UI and performed Step 7 style verification for Redux store behavior (state shape expectation, action-driven updates, and runtime checks).

## Reason

Current app already supported add/delete dispatch flows. Edit was missing from UI even though `updateStudent` reducer existed in the students slice. This update completes practical students CRUD interaction in the UI.

## Changes

1. Updated src/App.jsx
   - Imported `updateStudent` action creator.
   - Added `handleUpdateStudent(updatedStudent)` and dispatched `updateStudent(updatedStudent)`.
   - Passed `onUpdateStudent` callback into `StudentTable`.

2. Updated src/components/StudentTable.jsx
   - Added inline row edit mode with local state (`editingId`, `draft`, `editError`).
   - Added `Edit`, `Save`, and `Cancel` controls per row.
   - Added input validation for required fields and GPA range 0.0-4.0 before dispatching update.
   - Invoked `onUpdateStudent` with normalized payload on successful save.

3. Updated src/App.css
   - Added styles for `.btn-edit`, `.btn-cancel`, and `.inline-input`.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran `npm run dev` and verified runtime behavior in browser:
  - Initial UI showed 5 students.
  - Edited first row (name + GPA) and confirmed table + GPA summary updated.
  - Added a new student and confirmed count increased to 6.
  - Deleted that newly added student and confirmed count returned to 5.
- Verified configured store shape in code remains:
  - `students` with `list`, `status`, `error`
  - `courses` with `list`
  - `grades` with `list`

## Notes

- Direct automation of Chrome Redux extension panel (Redux tab, `@@INIT` log view, Jump/Time-Travel controls) is not available in this environment.
- Manual Step 7.1-7.4 check in local Chrome DevTools is still recommended for extension-specific panels.
