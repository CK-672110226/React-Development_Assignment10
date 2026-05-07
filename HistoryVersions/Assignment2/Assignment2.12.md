# Assignment2.12 History

Date: 7 May 2026 (7 พฤษภาคม 2569)

## Overview

Standardized Assignment2 internal folder organization to align with a full `HistoryVersions` cleanup approach and consistent legacy naming.

## Reason

The user requested organization at the `HistoryVersions/` level, not only by assignment roots. Assignment2 legacy paths were renamed to a uniform `Legacy/<source>/` format.

## Changes

1. Renamed legacy archive folders under Assignment2
   - `HistoryVersions/Assignment2/LegacyFromAssignment1/`
     -> `HistoryVersions/Assignment2/Legacy/FromAssignment1/`
   - `HistoryVersions/Assignment2/LegacyFromAssignment2MisScopedLab3/`
     -> `HistoryVersions/Assignment2/Legacy/FromMisScopedLab3/`

2. Preserved canonical files in Assignment2 root
   - No changes to canonical Lab 2 sequence (`Assignment2.00.md` to `Assignment2.05.md`).
   - Existing redirect notes remain in root.

## Validation

- Verified new legacy directories exist under `HistoryVersions/Assignment2/Legacy/`.
- Verified all archived files are still present after path normalization.

## Notes

- This is a structure-only update; runtime code and Lab behavior are unchanged.
