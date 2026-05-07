# Assignment1.00 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Built Lab 1 AcadeMate Prototype — a Student Academic Performance Tracker using React with useState, without Redux. Implemented project scaffolding, folder structure, hard-coded student data, and three core components connected in App.jsx.

## Reason

Lab 1 requires building the foundational AcadeMate prototype using only local useState state management so that the cost and benefit of migrating to Redux in Session 2 can be understood by direct comparison.

## Changes

1. Scaffolded project with Vite + React
   - Created project using `npm create vite@latest acadeMate -- --template react`.
   - Installed all future-session dependencies upfront: `@reduxjs/toolkit react-redux axios`.

2. Created src/ folder structure
   - Added `src/app/`, `src/components/`, `src/pages/`, `src/services/`.
   - Added `src/features/students/`, `src/features/courses/`, `src/features/grades/`.

3. Cleaned up default Vite starter files
   - Replaced `src/index.css` with global reset: `box-sizing: border-box`, body margin, font, and background color.
   - Cleared all default content from `src/App.jsx` and `src/App.css`.

4. Added hard-coded student data in src/App.jsx (module level)
   - Defined `INITIAL_STUDENTS` array with 5 entries outside the component function.
   - Each entry contains: `id`, `name`, `studentId`, `major`, `gpa`.
   - Data is defined at module scope to avoid unnecessary recreation on each render.

5. Added src/components/StudentTable.jsx
   - Accepts `students` prop and renders an HTML table with columns: `#`, Name, Student ID, Major, GPA.
   - Uses `key={student.id}` (not index) to avoid DOM reconciliation errors on reorder.
   - Applies `high-gpa` class to rows where `gpa >= 3.5`.
   - Renders an empty-state paragraph when the list is empty.

6. Added src/components/GpaSummary.jsx
   - Accepts `students` prop and derives: average GPA, highest GPA, lowest GPA, and student count.
   - All values are computed inline — not stored in state — to avoid stale derived state.
   - Renders four stat cards; highest GPA card uses `highlight` class.
   - Returns `null` when student list is empty.

7. Added src/components/AddStudentForm.jsx
   - Manages form state with `useState(EMPTY_FORM)` for `name`, `studentId`, `major`, `gpa`.
   - Uses a single `handleChange` with computed property name `[e.target.name]` to handle all inputs.
   - Validates that `name` and `studentId` are non-empty, and that `gpa` is a number between 0.0 and 4.0.
   - Calls `onAddStudent(newStudent)` prop on valid submit, then resets form and clears error.
   - Uses `Date.now()` as temporary `id`; Session 4 will replace with API-generated IDs.

8. Updated src/App.jsx to connect all components
   - Holds `students` in `useState(INITIAL_STUDENTS)` as the single source of truth.
   - Implements `handleAddStudent` using immutable spread `[...students, newStudent]`.
   - Renders layout: `GpaSummary` → `AddStudentForm` → `StudentTable` inside `.app-container`.

9. Updated src/App.css
   - Added styles for `.app-container`, `.app-header`, `.app-main`.
   - Added styles for `.gpa-summary`, `.stat-card`, `.stat-label`, `.stat-value`, `.highlight`.
   - Added styles for `.add-form`, `.form-row`, `.form-error`, `.btn-primary`.
   - Added styles for `.student-table`, `.high-gpa`, `.gpa-cell`, `.empty-state`.

## Validation

- Ran `npm run dev` and verified app loads at http://localhost:5173.
- Verified GPA summary statistics update when a new student is added.
- Verified form clears and validates correctly (empty name/studentId, invalid GPA).
- Verified new students appear in the table immediately after submission.
- Verified rows with GPA >= 3.5 are visually highlighted.
- Ran `npm run lint` with no errors.
- Ran `npm run build` successfully.

## Notes

- All existing feature files from the Vite template have been removed or replaced.
- Session 2 will migrate the `INITIAL_STUDENTS` constant and `students` state into a Redux slice.
- The `Date.now()` temporary ID strategy will be replaced in Session 4 when API integration is introduced.
- Challenge feature (Delete button per row using `students.filter`) is optional; if implemented, record in Assignment1.01.
