# Assignment2.03 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Completed delete action wiring to Redux. StudentTable delete clicks now dispatch students/deleteStudent through App, so list updates are stored in Redux state and visible in Redux DevTools action log.

## Reason

After Assignment2.02 connected add flow to Redux, delete remained a no-op callback. This step completes core students CRUD interaction expected for Session 3-style Redux integration and enables proper action-based debugging/time-travel.

## Changes

1. Updated src/App.jsx
   - Imported `deleteStudent` action creator from `src/features/students/studentsSlice`.
   - Added `handleDeleteStudent(id)` that dispatches `deleteStudent(id)`.
   - Replaced StudentTable no-op delete callback with `onDeleteStudent={handleDeleteStudent}`.
   - Kept existing add flow (`dispatch(addStudent(newStudent))`) unchanged.

## Validation

- Ran `npm run lint` successfully (no errors).
- Ran `npm run build` successfully.
- Confirmed production bundle generation completed without failure.

## Notes

- Clicking Delete now emits `students/deleteStudent` in Redux DevTools.
- State diff after delete should affect only `students.list`.
- Add and Delete student flows are now both connected to Redux dispatch.
