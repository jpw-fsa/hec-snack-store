---
name: submit
description: Submit your bake-off work to the Dojo arena wall — packages your git diff, takes a screenshot of the running app, and posts both. Trigger when the user says /submit, "submit my work", "put me on the wall", or "I'm done".
---

# /submit — put your work on the arena wall

Run these steps in order. Steps 4 is allowed to fail — never let a missing screenshot
block a submission.

## 1. Identity

Read the participant name from `.dojo/name`. If the file is missing, ask the user for
their first name and write it there (`mkdir -p .dojo` first). First names only.

## 2. Commit the work

If `git status` shows uncommitted changes, commit everything with a short message
describing the work (never include `.dojo/` — it is gitignored).

## 3. Build the diff

```bash
BASE=$(git merge-base origin/main HEAD 2>/dev/null || git rev-list --max-parents=0 HEAD | tail -1)
git diff "$BASE"...HEAD > .dojo/submission.patch
git diff --shortstat "$BASE"...HEAD     # keep this output — it's the diff_stat field
git branch --show-current               # keep — it's the branch field
```

## 4. Screenshot (best effort)

Only if the dev server responds (`curl -sf -o /dev/null http://localhost:5173`):

```bash
npx playwright screenshot --viewport-size=1280,800 http://localhost:5173 .dojo/shot.png
```

If the server isn't running, ask the user once whether to start it (`npm run dev` in the
background, wait ~3s, retry). If the screenshot still fails for any reason, continue
without it and mention that in the notes.

## 5. Write the notes

Compose ONE sentence (max ~120 chars) summarizing what was built — plain language,
mention stretch goals if any were done. This goes on the public wall next to their name.

## 6. Post it

```bash
curl -sS -X POST "$DOJO_URL/api/submissions" \
  -H "Authorization: Bearer $DOJO_TOKEN" \
  -F "participant=$(cat .dojo/name)" \
  -F "branch=<branch from step 3>" \
  -F "notes=<notes from step 5>" \
  -F "diff_stat=<shortstat from step 3>" \
  -F "diff=@.dojo/submission.patch;type=text/x-diff" \
  -F "screenshot=@.dojo/shot.png;type=image/png"
```

Omit the screenshot `-F` line entirely if there is no `.dojo/shot.png`.

## 7. Relay the result

Read the user the `message` from the JSON response (it includes their arena URL). If the
API returns an error message, relay it verbatim and help them fix it — the messages are
written to be actionable. A 429 means slow down: wait a minute before retrying.
