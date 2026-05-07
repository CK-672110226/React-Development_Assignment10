# Assignment2.01 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Connected students data flow from Redux store to UI read-only components in App. GpaSummary and StudentTable now consume real data from store via useSelector, while AddStudentForm remains a no-op stub for the next step.

## Reason

This update implements the first Session 3 integration step after Session 2 migration: read state from Redux without dispatch wiring yet, so UI reflects centralized store data and Redux DevTools state immediately.

## Changes

1. Updated src/App.jsx
   - Imported `useSelector` from `react-redux`.
   - Added `const students = useSelector(state => state.students.list);`.
   - Passed Redux students list into `GpaSummary`.
   - Passed Redux students list into `StudentTable`.
   - Kept `AddStudentForm` and delete callback as no-op stubs to preserve current incremental scope.

## Validation

- Ran `npm run lint` successfully (no errors).
- Ran `npm run build` successfully.
- Confirmed production bundle generation completed without failure.

## Notes

- UI now renders 5 initial students and GPA cards from Redux state instead of empty arrays.
- Action dispatch integration (`addStudent`, `deleteStudent`) is intentionally deferred to the next step.
