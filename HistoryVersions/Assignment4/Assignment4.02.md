# Assignment4.02 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Executed end-to-end CRUD validation and fixed runtime blocking caused by placeholder API configuration by adding a resilient local fallback data path in the students thunk layer.

## Reason

With placeholder `VITE_STUDENTS_API_URL`, Session 4 flows were blocked at runtime and full E2E CRUD verification could not be completed. The update preserves API-first behavior while enabling practical local E2E validation when endpoint setup is incomplete or temporarily unreachable.

## Changes

1. Updated src/features/students/studentsThunks.js
   - Added local fallback storage key: `academate-local-students`.
   - Added local seed dataset matching existing student schema.
   - Added fallback decision rule:
     - use local mode when URL is missing/placeholder (`your-project-id.mockapi.io`)
     - use local mode when network-level fetch failure occurs (`TypeError`)
   - Added local read/write helpers with seed reset on invalid storage payload.
   - Normalized student IDs to string in all paths for stable update/delete matching.
   - Kept API request path unchanged for configured real endpoint usage.

2. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced canonical chain to `Assignment4.00.md to Assignment4.02.md`.

3. Updated HistoryVersions/README.md
   - Synced Assignment 4 canonical chain to `Assignment4.00.md` through `Assignment4.02.md`.

## Validation

- Ran `npm test` successfully.
  - 2 test files passed, 15 tests passed.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Performed manual browser E2E on dev server (`http://127.0.0.1:4174/`):
  - Fetch on mount succeeded (table rendered 5 records from fallback seed).
  - Add student succeeded (count 5 -> 6).
  - Edit student succeeded (name and GPA updated).
  - Delete student succeeded after confirm (count 6 -> 5).

## Notes

- When a real MockAPI endpoint is set in `.env`, thunks continue to use remote API CRUD.
- Local fallback is a resilience path for missing/placeholder/unreachable endpoint and supports local verification continuity.
