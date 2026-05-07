# Assignment4.04 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Adjusted Lab 4 data behavior so `major` options are sourced from Courses API while `gpa` is treated as local-only state when using remote students API.

## Reason

The requested behavior is to integrate major selection with the courses endpoint and keep GPA local rather than relying on remote student API values.

## Changes

1. Updated src/features/students/studentsThunks.js
   - Added `COURSES_API_URL` support from `VITE_COURSES_API_URL`.
   - Added `fetchMajorsFromCoursesApi` helper to read distinct `major` values from courses API payload.
   - Added local GPA storage map (`academate-local-gpa`) with read/write/update/remove helpers.
   - For remote students API path:
     - `fetchStudents` now merges remote records with local GPA values by student id.
     - `addStudentAsync` and `updateStudentAsync` no longer send `gpa` in API body; GPA is persisted locally.
     - `deleteStudentAsync` removes local GPA entry for deleted student.
   - Kept local fallback mode behavior for full local CRUD when remote endpoint is unavailable.

2. Updated src/components/AddStudentForm.jsx
   - Added mount-time major loading via `fetchMajorsFromCoursesApi`.
   - When major options exist, renders a `<select>` populated from courses API.
   - Falls back to text input if no majors are available.
   - Keeps existing student validation and async dispatch flow.

3. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced canonical chain to `Assignment4.00.md to Assignment4.04.md`.

4. Updated HistoryVersions/README.md
   - Synced Assignment 4 canonical chain to `Assignment4.00.md` through `Assignment4.04.md`.

## Validation

- Ran `npm test` successfully.
  - 2 test files passed, 15 tests passed.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.

## Notes

- Students API continues to handle name/studentId/major persistence.
- GPA now behaves as local state keyed by student id, so GPA values survive refresh on the same browser/localStorage but are not authored by remote students API.
