# SNACK-101 · Snack of the Day

**Type:** Story · **Priority:** High · **Sprint:** Bake-off · **Reporter:** Merchandising

## Summary

Add a "Snack of the Day" feature to the Snack Store.

## Description

Merchandising wants one featured snack promoted above the grid, rotating daily. They were
vague about the details in refinement, as is tradition.

## Acceptance Criteria

- **AC1** — A hero banner above the grid shows one product as "Snack of the Day"
  (emoji, name, price).
- **AC2** — The featured snack is deterministic per calendar day: everyone who opens the
  app today sees the same snack, and tomorrow it changes.
- **AC3** — The featured snack shows a "-20% today only" price alongside the original price.
- **AC4** — The grid still renders all products; the featured one gets a visible badge on
  its card.

## Stretch goals (any order — fast finishers keep going)

- **S1** — "Add to cart" on each card increments the header cart count (state only, no cart page).
- **S2** — Filter chips above the grid: sweet / salty / healthy.
- **S3** — Make it beautiful. This is judged (🎨 best ui) by your peers.
- **S4** — QA route: instead of (or after) the feature, write a Playwright test that proves
  AC2 — same day, same snack, every render.

## Out of scope

Checkout, persistence, routing, real money, real snacks.

## Definition of Done

App runs locally with the ACs met — then tell Claude: `/submit`.
