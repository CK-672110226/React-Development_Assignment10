# System1.02 History

Date: 5 May 2026 (5 พฤษภาคม 2569)

## Overview

Added a formal Redux DevTools verification rule and a dedicated AI playbook so Redux-related tasks follow a consistent, auditable workflow.

## Reason

Recent tasks required repeated manual clarification on how AI should validate Redux behavior (state shape, action log, and time-travel checks). A standard guide reduces ambiguity and improves consistency across future tasks.

## Changes

1. Updated .github/copilot-instructions.md
   - Added `Redux DevTools Verification Rule` section.
   - Required use of repository playbook for Redux verification.
   - Added fallback policy when extension panels are unavailable.
   - Added policy for temporary debug dispatch helpers (remove before final delivery unless explicitly requested).

2. Added .github/AI-Redux-DevTools-Playbook.md
   - Added step-by-step guide for Redux checks:
     - start app and open Redux panel,
     - verify initial state shape,
     - verify action log (`@@INIT` and domain actions),
     - verify diff/state isolation,
     - verify time-travel jump,
     - fallback checks when extension is unavailable,
     - standard reporting template.

## Validation

- Verified new rule section exists in `.github/copilot-instructions.md`.
- Verified new playbook file exists and is referenced by the rule.
- Verified this change is system/process-only and does not modify runtime application behavior.

## Notes

- This update is documentation/process guidance for AI operation.
- Future process refinements should continue in `HistorySystem/` as `System1.03.md` and later.
