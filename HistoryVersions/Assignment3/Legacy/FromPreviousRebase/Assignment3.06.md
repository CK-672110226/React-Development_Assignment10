# Assignment3.06 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Completed Lab 3 Redux Hooks integration for AcadeMate by removing remaining stub props, connecting feature components directly to Redux via `useSelector` and `useDispatch`, and adding a modal-based student edit flow.

## Reason

Session 3 requires each UI feature component to own its Redux read/write logic (instead of prop drilling from App) so CRUD interactions are fully action-driven and observable through Redux state transitions.

## Changes

1. Updated src/features/students/selectors.js
   - Added centralized selectors:
     - `selectAllStudents`
     - `selectStudentCount`
     - `selectAverageGpa`
     - `selectStudentById` (selector factory)
     - `selectHighAchievers`
   - Standardized student state access patterns in one module.

2. Updated src/components/GpaSummary.jsx
   - Replaced prop-based data reads with `useSelector`.
   - Used selectors for total count, average GPA, and high-achiever count.
   - Removed old highest/lowest display to match Session 3 summary card requirements.

3. Updated src/components/AddStudentForm.jsx
   - Replaced callback prop flow with direct `useDispatch` usage.
   - Dispatched `addStudent` directly from form submit.
   - Kept controlled inputs and validation for required fields and GPA range.

4. Updated src/components/StudentTable.jsx
   - Replaced prop-based students/delete/update flow with Redux hooks.
   - Read list from `selectAllStudents`.
   - Dispatched `deleteStudent` and `updateStudent` directly.
   - Switched from inline row editing to modal-triggered editing state (`editing`).

5. Added src/components/EditModal.jsx
   - Added controlled edit modal component for student updates.
   - Added local validation (required name/studentId and GPA range).
   - Emitted normalized payload via `onSave` to parent table logic.

6. Updated src/App.jsx
   - Simplified to a layout shell only.
   - Removed `useSelector`, `useDispatch`, and all student props.
   - Rendered `GpaSummary`, `AddStudentForm`, and `StudentTable` without props.

7. Updated src/App.css
   - Added modal UI styles (`.modal-overlay`, `.modal`, `.modal-actions`, modal input rules).
   - Removed obsolete inline edit input style from previous row-edit approach.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran app with `npm run dev -- --host 127.0.0.1 --port 4173` and verified runtime behavior:
  - Startup summary showed 5 students.
  - Added one student and confirmed table + summary updated immediately.
  - Edited that student via modal (changed GPA) and confirmed table + summary recalculated.
  - Deleted that student and confirmed list/summary returned to baseline values.

## Notes

- Direct automation of Redux DevTools browser extension panels is not available in this environment.
- Fallback verification was completed through UI state transitions that reflect dispatched Redux actions (add, update, delete).
