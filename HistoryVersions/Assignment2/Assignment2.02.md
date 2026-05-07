# Assignment2.02 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Integrated Add Student form submission with Redux by dispatching the students/addStudent action from App. The UI now updates from store writes in real time after form submission.

## Reason

After completing read-only store integration in Assignment2.01, the next incremental Session 3 step is to connect user input to Redux actions so the action log and state updates appear in Redux DevTools.

## Changes

1. Updated src/App.jsx
   - Imported `useDispatch` from `react-redux`.
   - Imported `addStudent` action creator from `src/features/students/studentsSlice`.
   - Added `dispatch` instance in App.
   - Added `handleAddStudent(newStudent)` that dispatches `addStudent(newStudent)`.
   - Replaced AddStudentForm no-op callback with `onAddStudent={handleAddStudent}`.
   - Kept delete callback as no-op to preserve current scope.

## Validation

- Ran `npm run lint` successfully (no errors).
- Ran `npm run build` successfully.
- Confirmed production bundle generation completed without failure.

## Notes

- Submitting Add Student should now create `students/addStudent` entries in Redux DevTools action log.
- Students table and GPA summary continue to update from `state.students.list` through `useSelector`.
- Delete action wiring is still pending for the next step.
