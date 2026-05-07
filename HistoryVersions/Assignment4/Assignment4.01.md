# Assignment4.01 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Added runtime environment configuration for the students API endpoint and verified development startup flow.

## Reason

Lab 4 async thunks require `VITE_STUDENTS_API_URL` to be present; without this value the app shows a missing-env runtime error and cannot execute API CRUD calls.

## Changes

1. Added .env
   - Added `VITE_STUDENTS_API_URL` with MockAPI-style endpoint format.
   - Included a short comment indicating this should be replaced with the real project endpoint when available.

2. Updated HistoryVersions/Assignment4/INDEX.md
   - Advanced canonical chain from `Assignment4.00.md` to `Assignment4.00.md to Assignment4.01.md`.

## Validation

- Ran `npm run dev -- --host 127.0.0.1 --port 4173` successfully.
- Verified Vite startup output reports local URL at `http://127.0.0.1:4173/`.

## Notes

- The current `.env` value uses a placeholder MockAPI domain pattern and may need replacement with the actual course/project endpoint.
