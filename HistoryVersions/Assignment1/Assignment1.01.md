# Assignment1.01 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Implemented the optional Delete challenge from Lab 1 and completed actual project file creation. The previous Assignment1.00 entry described the planned implementation; this entry records it as fully verified and running.

## Reason

Assignment1.00 noted the Delete button challenge as optional. It was implemented alongside the baseline to keep the codebase fully functional from the start. Additionally, the project used a pre-existing Vite scaffold, requiring dependency installation and file cleanup as a separate confirmed step.

## Changes

1. Installed src/components dependencies
   - Ran `npm install @reduxjs/toolkit react-redux axios` to add all future-session packages upfront.

2. Created src folder structure
   - Added `src/app/`, `src/components/`, `src/pages/`, `src/services/`.
   - Added `src/features/students/`, `src/features/courses/`, `src/features/grades/`.

3. Updated src/index.css
   - Replaced all default Vite styles with the two-line global reset: `box-sizing: border-box` and body reset.

4. Updated src/App.jsx
   - Replaced default Vite counter app with full AcadeMate composition.
   - Added `handleDeleteStudent` using `students.filter(s => s.id !== id)`.
   - Passed `onDeleteStudent` prop down to `StudentTable`.

5. Updated src/App.css
   - Replaced all default Vite styles with full AcadeMate component styles.
   - Added `.btn-delete` styles for the Delete button column.

6. Added src/components/StudentTable.jsx
   - Added optional Delete button column; calls `onDeleteStudent(student.id)` on click.

7. Added src/components/GpaSummary.jsx
   - Four stat cards: Students count, Avg GPA, Highest GPA (highlighted), Lowest GPA.

8. Added src/components/AddStudentForm.jsx
   - Controlled form with single `handleChange` using computed property name.
   - Validation for required fields and GPA range 0.0–4.0.
   - Resets form and clears error on successful submit.

## Validation

- Ran `npm run lint` — no errors.
- Ran `npm run build` — built successfully (194 kB JS, 2.29 kB CSS, 368ms).

## Notes

- `Date.now()` is used as a temporary ID for new students; will be replaced in Session 4.
- All future sessions can build on the `src/features/` and `src/app/` folders created here.
- Session 2 will migrate `INITIAL_STUDENTS` and `students` state into a Redux slice.
