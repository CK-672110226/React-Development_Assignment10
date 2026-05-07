# Assignment4.03 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Fixed runtime 404 by correcting students API endpoint format for the active MockAPI project and validated endpoint reachability.

## Reason

The app was configured with `.../api/v1/student`, but this MockAPI project exposes the resource directly at `/student`, causing all CRUD calls to fail with 404.

## Changes

1. Updated .env
   - Changed `VITE_STUDENTS_API_URL` from:
     - `https://69fc372bfce564e2591776a9.mockapi.io/api/v1/student`
   - To:
     - `https://69fc372bfce564e2591776a9.mockapi.io/student`

2. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced canonical chain to `Assignment4.00.md to Assignment4.03.md`.

3. Updated HistoryVersions/README.md
   - Synced Assignment 4 canonical chain to `Assignment4.00.md` through `Assignment4.03.md`.

## Validation

- Ran endpoint probe with `curl`.
- Verified `https://69fc372bfce564e2591776a9.mockapi.io/student` returns HTTP 200 and JSON payload.

## Notes

- Current mock data shows `gpa` values outside 0.0-4.0 and `studentId` as Number.
- Recommended schema alignment for app consistency:
  - `name`: String
  - `studentId`: String
  - `major`: String
  - `gpa`: Number constrained to 0.0-4.0
