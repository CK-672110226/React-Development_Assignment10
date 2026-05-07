# Assignment4.08 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Adjusted student enrichment logic so each fetched student is assigned one of five majors based on studentId hashing, GPA is pseudo-random and stable by `id+major`, and edit/add major selection UX is improved.

## Reason

Requested behavior:
- major should be auto-selected from 5 options for each student (driven by studentId)
- gpa should be generated and then checked/stabilized by `id+major`
- edit major flow needed better control
- add form needed select styling update

## Changes

1. Updated src/features/students/studentsThunks.js
   - Added deterministic hash helper (`hashString`).
   - Added `pickMajorByStudentId(student, majors)`:
     - uses studentId/id hash to select a major from available courses majors (5 options).
   - Added `randomGpaFromIdMajor(id, major)`:
     - generates stable pseudo-random GPA in 2.00-4.00 range from `id:major` key.
   - Updated `mergeWithReducerGpa(...)`:
     - normalizes major using the hash-based major picker.
     - keeps existing GPA if Redux already has the same `id+major` pair.
     - otherwise assigns GPA from `randomGpaFromIdMajor`.
   - Updated `fetchStudents`:
     - loads majors from courses API first.
     - applies same enrichment for both remote fetch and local fallback list.

2. Updated src/components/StudentTable.jsx
   - Added major options loading from courses API for edit usage.
   - On save, major is normalized with fallback (`selected`, first option, or `Undeclared`).
   - Passed `majorOptions` to edit modal.

3. Updated src/components/EditModal.jsx
   - Added `majorOptions` prop.
   - Replaced free-text major input with select when options are available.
   - Keeps text input fallback when options are unavailable.

4. Updated src/App.css
   - Added styles for `.form-row select` and focus ring.
   - Added styles for `.modal select`.
   - Updated responsive rule to include select width handling.

5. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced canonical chain to `Assignment4.00.md to Assignment4.08.md`.

6. Updated HistoryVersions/README.md
   - Synced Assignment 4 canonical chain to `Assignment4.00.md` through `Assignment4.08.md`.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm test` successfully.
  - 2 test files passed, 15 tests passed.
- Ran `npm run build` successfully.

## Notes

- Major assignment from studentId is deterministic (looks random, but stable for same input).
- GPA is stable for each `id+major` key and updates if major changes (new key -> new GPA seed).
