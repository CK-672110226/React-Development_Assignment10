# Assignment2.07 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Applied Session 3 follow-up improvements by memoizing derived Redux selectors and adding a persistent dark mode toggle to AcadeMate UI.

## Reason

The follow-up request required implementing the selector optimization track (option 2) and introducing dark mode while preserving the existing Redux CRUD integration flow.

## Changes

1. Updated src/features/students/selectors.js
   - Added `createSelector` from Redux Toolkit for memoized derived selectors.
   - Kept centralized selectors and refactored:
     - `selectStudentCount` to memoized selector
     - `selectAverageGpa` to memoized selector
     - `selectHighAchievers` to memoized selector
   - Added `selectHighAchieverCount` to expose stable primitive output for summary usage.

2. Updated src/components/GpaSummary.jsx
   - Switched high achiever read from ad-hoc length calculation to `selectHighAchieverCount`.
   - Retained direct Redux reads through `useSelector` for all summary cards.

3. Updated src/App.jsx
   - Added dark mode toggle button in the header.
   - Added persistent theme state (`light`/`dark`) using localStorage.
   - Added startup theme detection fallback from `prefers-color-scheme`.
   - Applied theme by toggling `body.dark-mode` class.

4. Updated src/App.css
   - Added shared CSS variables for light/dark color tokens.
   - Added dark mode token overrides under `body.dark-mode`.
   - Updated existing components (cards, forms, table, modal) to consume theme variables.
   - Added `.theme-toggle` styling and responsive behavior.

5. Updated src/index.css
   - Replaced hard-coded body colors with CSS variables so page-level background/text follow active theme.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran `npm run dev -- --host 127.0.0.1 --port 4173` and verified runtime behavior:
  - Theme toggle changes from light to dark and updates button label.
  - Add student still updates table and GPA summary immediately.
  - Edit modal still opens and allows cancel/save flow.
  - Delete flow still works with confirmation and restores baseline count.

## Notes

- Redux DevTools extension panel automation remains unavailable in this environment.
- Functional verification was performed via observable UI state transitions that reflect Redux action outcomes.
