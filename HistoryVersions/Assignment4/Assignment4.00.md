# Assignment4.00 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Migrated AcadeMate student data flow from hard-coded Redux state to async CRUD via API thunks for Lab 4 while preserving existing UI components.

## Reason

Session 4 requires real asynchronous data operations using Redux Toolkit `createAsyncThunk`, plus loading/error UI branches driven by `students.status` and `students.error`.

## Changes

1. Updated src/features/students/studentsSlice.js
   - Removed hard-coded initial student records from reducer state.
   - Kept `initialState` with `list`, `status`, and `error`.
   - Replaced sync reducers with `extraReducers` to handle:
     - `fetchStudents` pending/fulfilled/rejected
     - `addStudentAsync` fulfilled
     - `updateStudentAsync` fulfilled
     - `deleteStudentAsync` fulfilled
   - Ensured fetch success replaces `state.list` (no append) to prevent duplication on re-fetch.

2. Added src/features/students/studentsThunks.js
   - Added async thunks:
     - `fetchStudents`
     - `addStudentAsync`
     - `updateStudentAsync`
     - `deleteStudentAsync`
   - Added shared request helper using `fetch`.
   - Added API error parsing and `rejectWithValue` messages.
   - Added student normalization (`gpa` converted to number).
   - Uses `VITE_STUDENTS_API_URL` as endpoint source.

3. Updated src/features/students/selectors.js
   - Added:
     - `selectStudentsStatus`
     - `selectStudentsError`
   - Kept existing memoized selectors unchanged.

4. Updated src/App.jsx
   - Added `useDispatch` and mount-time `fetchStudents` dispatch in `useEffect`.
   - Kept existing dark-mode logic and layout structure.

5. Updated src/components/AddStudentForm.jsx
   - Replaced sync `addStudent` dispatch with async `addStudentAsync` dispatch.
   - Removed client-side `id: Date.now()` generation.
   - Added `.unwrap()` usage with `try/catch` for component-level error handling.

6. Updated src/components/StudentTable.jsx
   - Replaced sync delete/update actions with async thunks.
   - Added status/error reads via selectors.
   - Added conditional rendering branches:
     - loading indicator
     - error banner + retry button (`fetchStudents`)
     - success-only table render guard
   - Kept table and modal interaction structure intact.

7. Updated src/features/students/studentsSlice.test.js
   - Replaced sync reducer tests with async lifecycle reducer tests.
   - Covered pending/fulfilled/rejected for fetch and fulfilled cases for add/update/delete thunks.

8. Updated src/features/students/selectors.test.js
   - Added tests for `selectStudentsStatus` and `selectStudentsError`.

9. Added HistoryVersions/Assignment4/INDEX.md
   - Created canonical index for Assignment 4 history scope.

10. Updated HistoryVersions/README.md
   - Added Assignment 4 canonical root/index/chain entry.

## Validation

- Ran `npm test` successfully.
  - 2 test files passed, 15 tests passed.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.

## Notes

- The thunks expect `VITE_STUDENTS_API_URL` to be configured in environment for runtime API calls.
- Redux DevTools browser extension panel automation is unavailable in this execution environment; verification relied on tests and static/runtime build checks.
