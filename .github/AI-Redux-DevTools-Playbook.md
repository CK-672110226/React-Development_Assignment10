# AI Redux DevTools Playbook

Date: 5 May 2026 (5 พฤษภาคม 2569)

This guide defines the default Redux verification flow for AI-assisted work in this repository.

## Scope

Use this playbook when a task modifies Redux store setup, slice reducers, dispatch wiring, selectors, or UI behavior that depends on Redux state.

## Step 1 - Start App and Open Redux Panel

1. Run `npm run dev`.
2. Open the app URL from Vite output.
3. Open browser DevTools (`F12`) and go to the `Redux` tab.
4. If the `Redux` tab is missing, install Redux DevTools extension.

## Step 2 - Verify Initial State Tree

In the `State` tab, confirm:

- `students.list` exists and has expected initial count.
- `students.status` is present (for this project: `idle`).
- `students.error` is present (for this project: `null`).
- `courses.list` exists and has expected initial count.
- `grades.list` exists and is an array.

Expected baseline shape for current AcadeMate Lab 2:

```json
{
  "students": { "list": "[5 items]", "status": "idle", "error": null },
  "courses": { "list": "[4 items]" },
  "grades": { "list": [] }
}
```

## Step 3 - Verify Action Log

In the action log, confirm:

- `@@INIT` appears at app startup.
- Domain actions appear after interactions, for example:
  - `students/addStudent`
  - `students/updateStudent`
  - `students/deleteStudent`

## Step 4 - Verify Diff and State Isolation

Click each relevant action and verify:

- `Diff` shows only expected branches changed.
- Unrelated slices remain unchanged.

Examples:

- Add/edit/delete student should affect `students.list`.
- `courses` and `grades` should not change during student-only actions.

## Step 5 - Verify Time-Travel

Use `Jump` (or equivalent controls) to:

1. Move to a state before a student action.
2. Confirm UI reflects that earlier state.
3. Jump forward and confirm UI returns to the newer state.

## Step 6 - Fallback When Redux Panel Is Unavailable

If extension controls are not available in the execution environment:

1. State the limitation explicitly.
2. Verify runtime behavior through UI interactions (add/update/delete).
3. Verify static store shape from code (`store.js` + slices).
4. Run `npm run lint` and `npm run build`.
5. Record that extension-specific checks (Redux tab, @@INIT view, Jump) require manual browser verification.

## Step 7 - Reporting Template

When finishing a Redux-related task, report:

1. What changed in code.
2. Which checks were completed successfully.
3. Which checks were not possible and why.
4. What manual steps remain for the user (if any).

## Notes

- Prefer real UI interactions over synthetic test-only dispatches when verifying behavior.
- Temporary debug controls are allowed only for validation and must be removed before final delivery unless requested by the user.
