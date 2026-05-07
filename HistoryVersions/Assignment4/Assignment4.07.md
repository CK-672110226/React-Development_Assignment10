# Assignment4.07 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Added a dedicated data exploration page for selecting and viewing students by course name and GPA band, separated from the CRUD dashboard view.

## Reason

User requested a separated data page where filters can be selected by course name and GPA, while preserving the existing AcadeMate CRUD flow.

## Changes

1. Added src/pages/DataExplorerPage.jsx
   - Added separate page UI for data exploration.
   - Added two independent filters:
     - Course Name (`major` values from student data)
     - GPA band (`All`, `>= 3.5`, `3.0-3.49`, `2.0-2.99`, `< 2.0`)
   - Added filtered result count and table rendering.
   - Reused existing table visual classes for consistency.

2. Updated src/App.jsx
   - Added top-level view switch state (`dashboard` / `explorer`).
   - Added view switch buttons in header.
   - Kept existing dashboard components (`GpaSummary`, `AddStudentForm`, `StudentTable`) unchanged under dashboard view.
   - Rendered new `DataExplorerPage` under explorer view.

3. Updated src/App.css
   - Added styles for view switcher buttons.
   - Added styles for data explorer layout and filter controls.

4. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced canonical chain to `Assignment4.00.md to Assignment4.07.md`.

5. Updated HistoryVersions/README.md
   - Synced Assignment 4 canonical chain to `Assignment4.00.md` through `Assignment4.07.md`.

## Validation

- Ran `npm run lint` successfully.
- Ran `npm test` successfully.
  - 2 test files passed, 15 tests passed.
- Ran `npm run build` successfully.

## Notes

- Explorer page is read-only by design and focuses on filtering/analysis.
- CRUD operations remain in dashboard view to avoid mixing edit actions with analytic filters.
