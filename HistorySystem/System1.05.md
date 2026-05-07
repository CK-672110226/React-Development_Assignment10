# System1.05 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Added a strict new-lab initialization rule to prevent AI from continuing history updates in the wrong assignment folder when a new lab begins.

## Reason

A recent scope mismatch showed that Lab 3 updates were recorded under Assignment2 before correction. A direct preventive rule is needed so new lab work always starts in a new assignment scope at `.00`.

## Changes

1. Updated .github/copilot-instructions.md
   - Added `New Lab Initialization Rule` section.
   - Defined required behavior:
     - create `HistoryVersions/AssignmentX/` immediately when a new lab starts
     - start with `AssignmentX.00.md`
     - do not append new-lab history to the previous assignment folder
     - ask for confirmation if lab identity is unclear

2. Added HistorySystem/System1.05.md
   - Recorded this rule/process improvement as a system-level history update.

## Validation

- Verified `.github/copilot-instructions.md` now includes `New Lab Initialization Rule`.
- Verified system history incremented from `System1.04.md` to `System1.05.md`.

## Notes

- This update is process-only and does not change runtime application behavior.
