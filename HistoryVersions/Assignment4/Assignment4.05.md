# Assignment4.05 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Refined Lab 4 behavior so GPA is maintained in reducer-local Redux state only (not localStorage), while keeping major sourced from courses API.

## Reason

Requested behavior update: GPA should behave as local reducer data. Previous revision stored GPA in localStorage map for remote API paths.

## Changes

1. Updated src/features/students/studentsThunks.js
   - Removed local GPA storage key and helpers (`academate-local-gpa`, read/write/update/remove).
   - Added reducer-state GPA merge strategy during `fetchStudents`:
     - on fetch success, remote student records are merged with current Redux `students.list` by `id` so existing local GPA values remain authoritative.
   - Kept remote API payload behavior for add/update:
     - API body excludes `gpa`
     - thunk returns normalized student including input GPA so reducer stores local GPA immediately.
   - Delete flow no longer performs any local GPA storage cleanup.

2. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced canonical chain to `Assignment4.00.md to Assignment4.05.md`.

3. Updated HistoryVersions/README.md
   - Synced Assignment 4 canonical chain to `Assignment4.00.md` through `Assignment4.05.md`.

## Validation

- Ran `npm test` successfully.
  - 2 test files passed, 15 tests passed.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.

## Notes

- GPA now lives in Redux local state flow and survives normal in-session actions.
- Major source behavior from courses API remains unchanged from Assignment4.04.
