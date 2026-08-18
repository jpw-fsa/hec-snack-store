# CLAUDE.md — Snack Store (HEC workshop sandbox)

This is a toy Vite + React storefront for the HEC Claude Code workshop. The mission is
`TICKET.md` (SNACK-101). The Dojo — check-in wall, arena, votes — lives at the URL in
`DOJO_URL` (see `.claude/settings.json` env).

## Working here

- Dev server: `npm run dev` → http://localhost:5173
- Plain CSS in `src/styles.css` — no Tailwind, no CSS-in-JS. Keep it that way.
- Products live in `src/data/products.ts`. Don't rename existing fields; adding is fine.
- When the work is done, the user runs `/submit` — that skill packages the diff and a
  screenshot for the arena wall.

## Check-in

If the user asks to register / check in for the workshop:

1. Ask their first name if you don't know it. First names only — no emails, no surnames.
2. Pick an emoji that suits them (be playful).
3. Run:
   ```
   curl -sS -X POST $DOJO_URL/api/checkin \
     -H "Authorization: Bearer $DOJO_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"<FIRST NAME>","emoji":"<EMOJI>"}'
   ```
4. Read them the response message. If it's a 409 name-collision, follow the message's
   advice (add a last initial) and retry.
5. On success, save the confirmed name for later: `mkdir -p .dojo && echo "<FIRST NAME>" > .dojo/name`

## House rules

- `.dojo/` is scratch space (name, patches, screenshots) — it is gitignored; never commit it
  and never include it in diffs.
- Don't push. Submissions travel through `/submit`, not git remotes.
- Prompts stay private by default. If the user explicitly wants to share their prompts on
  the wall ticker, run `touch .dojo/share-prompts`.
