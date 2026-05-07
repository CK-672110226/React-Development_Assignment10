# Assignment3.08 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Completed requested follow-up items (1 and 2) by adding unit tests for students selectors/reducer, improving edit modal keyboard accessibility, and fixing dark mode color inconsistency where some UI elements still used hard-coded light colors.

## Reason

The current code needed stronger verification coverage for Redux logic and better keyboard UX in the modal. Dark mode also had visual mismatch because several controls/table accents were not mapped to theme variables.

## Changes

1. Updated package.json
   - Added `test` script: `vitest run`.

2. Updated eslint.config.js
   - Added test-file override for Vitest globals (`globals.vitest`) so test files lint cleanly.

3. Added src/features/students/studentsSlice.test.js
   - Added reducer tests for:
     - initial state
     - `addStudent`
     - `updateStudent`
     - `deleteStudent`

4. Added src/features/students/selectors.test.js
   - Added selector tests for:
     - `selectAllStudents`
     - `selectStudentCount`
     - `selectAverageGpa`
     - `selectHighAchievers`
     - `selectHighAchieverCount`
     - `selectStudentById`

5. Updated src/components/EditModal.jsx
   - Added keyboard accessibility and modal UX improvements:
     - auto-focus first input on open
     - close on `Escape`
     - close on overlay click
     - stop propagation inside modal content
     - explicit `type="button"` on action buttons

6. Updated src/App.css
   - Added additional theme variables for button states, focus, high-GPA row, and accents.
   - Replaced remaining hard-coded colors with CSS variables so dark mode applies consistently.
   - Kept existing layout and component structure intact.

## Validation

- Ran `npm test` successfully.
  - 2 test files passed, 10 tests passed.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran app with `npm run dev -- --host 127.0.0.1 --port 4173` and manually verified:
  - theme toggle switches both directions
  - edit modal opens and closes via `Escape`
  - dark mode no longer leaves action/table accents in mismatched light-only palettes

## Notes

- Redux DevTools extension panel automation is still unavailable in this environment.
- Behavior verification remains based on direct UI transitions and test assertions.
