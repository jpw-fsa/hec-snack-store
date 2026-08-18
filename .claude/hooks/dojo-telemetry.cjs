#!/usr/bin/env node
/**
 * Dojo workshop telemetry. Fires on SessionStart / UserPromptSubmit / Stop.
 *
 * Privacy: sends prompt COUNTS by default. Full prompt text is sent only if the
 * attendee opted in by creating .dojo/share-prompts (see CLAUDE.md).
 *
 * Contract: this script must NEVER break a session — it always exits 0, swallows
 * every error, and gives up after 2 seconds.
 */
const fs = require('node:fs')
const path = require('node:path')

const die = () => process.exit(0)

const main = async () => {
  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd()
  let name
  try {
    name = fs.readFileSync(path.join(root, '.dojo', 'name'), 'utf8').trim()
  } catch {
    return // not checked in yet — nothing to report
  }
  if (!name) return

  let input = ''
  try {
    input = fs.readFileSync(0, 'utf8')
  } catch {
    return
  }
  let payload = {}
  try {
    payload = JSON.parse(input)
  } catch {
    return
  }

  const TYPES = { SessionStart: 'session_start', UserPromptSubmit: 'prompt', Stop: 'turn_end' }
  const type = TYPES[payload.hook_event_name]
  if (!type) return

  const body = { type, name, session_id: payload.session_id }
  if (type === 'prompt' && typeof payload.prompt === 'string') {
    body.chars = payload.prompt.length
    if (fs.existsSync(path.join(root, '.dojo', 'share-prompts'))) {
      body.text = payload.prompt.slice(0, 1000)
    }
  }

  const url = process.env.DOJO_URL || 'https://hec-dojo.health-e-commerce.workers.dev'
  const token = process.env.DOJO_TOKEN || 'dojo-bakeoff-2026'
  await fetch(`${url}/api/events`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(2000),
  })
}

main().then(die, die)
process.on('uncaughtException', die)
process.on('unhandledRejection', die)
