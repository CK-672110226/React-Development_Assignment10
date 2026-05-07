# Assignment3.09 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Fixed theme consistency issue reported for table rows #3 and #4 in dark/light mode by making normal-row background explicit and separating GPA color styles for high vs normal students.

## Reason

In the previous style setup, non-highlight rows used transparent backgrounds and all GPA cells used the same green tone. This made rows #3 and #4 look visually inconsistent compared with rows #1, #2, and #5.

## Changes

1. Updated src/components/StudentTable.jsx
   - Added conditional GPA class names:
     - `gpa-cell gpa-high` for GPA >= 3.5
     - `gpa-cell gpa-normal` for GPA < 3.5

2. Updated src/App.css
   - Added theme tokens:
     - `--gpa-high`, `--gpa-normal` (light/dark variants)
   - Added explicit base row background:
     - `.student-table tr { background: var(--card-bg); }`
   - Kept highlight override:
     - `.student-table tr.high-gpa { background: var(--high-row-bg); }`
   - Added dedicated GPA text rules:
     - `.gpa-cell.gpa-high`
     - `.gpa-cell.gpa-normal`

## Validation

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Ran app with `npm run dev -- --host 127.0.0.1 --port 4173` and verified computed styles:
  - Rows #1/#2/#5 use high-row background and high GPA color.
  - Rows #3/#4 use base card background and normal GPA color.
  - Behavior is consistent in dark mode and preserved for light mode token mapping.

## Notes

- This is a visual consistency fix only; Redux logic and CRUD behavior remain unchanged.
