# System1.01 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Added a formal rule for correcting mis-scoped assignment history files and preserving traceability when assignment numbering was previously recorded in the wrong folder.

## Reason

Lab 2 history had been recorded under Assignment1 numbering. A reusable rule is needed so future corrections follow one consistent, non-destructive process.

## Changes

1. Updated .github/copilot-instructions.md
   - Added `Assignment Scope Correction Rule`.
   - Defined non-destructive correction flow:
     - keep old files,
     - create correct assignment sequence from `.00`,
     - add superseded/redirect note,
     - record process update in `HistorySystem/`.

2. Added HistoryVersions/Assignment1/Assignment1.06.md
   - Added superseded/redirect note for Lab 2 records under Assignment1.
   - Documented mapping from Assignment1.02-Assignment1.05 to Assignment2.00-Assignment2.03.

## Validation

- Verified the new rule section exists in `.github/copilot-instructions.md`.
- Verified `Assignment1.06.md` exists and references the corrected Assignment2 history sequence.
- Verified no existing history files were deleted.

## Notes

- This is a system-level process update and does not change runtime application behavior.
- Future workflow/rule refinements should continue from System1.02.
