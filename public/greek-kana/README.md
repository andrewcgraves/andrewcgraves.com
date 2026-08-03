# DJT Greek

A static, dependency-free drill app for the Modern Greek alphabet and
digraphs, modeled on DJT Kana. One glyph is shown; you type the romanized
sound. Wrong answers reveal the expected sound and the prompt stays put
until you type it correctly; the item is then re-queued to reappear
within 3 prompts.

**Features**

- 40 drill items: 24 letters + final sigma (ς) = 25 letter items, plus 8
  vowel digraphs and 7 consonant digraphs.
- Case modes — lowercase / UPPERCASE / mixed — via an accessible
  radiogroup (arrow-key navigable). Final sigma never appears as Σ; it has
  no distinct capital, so it always renders lowercase regardless of mode.
- A collapsed-by-default "Character selection" panel that controls the
  live drill pool, grouped as Vowels / Consonants / Vowel digraphs /
  Consonant digraphs, each with per-group Check all / Uncheck all. The
  pool defaults to vowels only.
- Best-effort pronunciation via the browser's SpeechSynthesis API
  (`el-GR`). Browser TTS on an isolated letter often speaks the letter
  **name**, not the phonetic sound — this is a known, disclosed
  limitation, not a bug.
- Live stats (seen / correct / streak / accuracy) and a session reset
  button.
- No persistence of anything (no localStorage/sessionStorage/cookies/
  IndexedDB) — reloading always starts fresh. This is an intentional
  design decision, not a missing feature.
- No network calls after the initial page load; works fully offline.
  No build step, no third-party dependencies.

## How to run

This is plain HTML/CSS/JS (ES modules) — there is nothing to install or
build.

- **Locally**: open `index.html` directly in a browser, or serve the
  folder with any static file server (e.g. `npx serve .` or
  `python3 -m http.server`) if you want module loading over `http://`
  instead of `file://`.
- **Neocities**: upload the contents of this folder as-is (`index.html`,
  `css/`, `js/`) to your Neocities site, preserving the folder structure.
  No build step required.
- **GitHub Pages**: copy this folder into the repo/branch GitHub Pages
  serves from (or point Pages at this directory) and push. No build
  step required.
- **In this repo**: this folder lives under `public/greek-kana/` of the
  Next.js site. Next.js serves everything under `public/` at the site
  root, so it deploys automatically at `/greek-kana/` whenever the site
  is built/deployed — no extra wiring needed.

## Architecture

| File | Responsibility |
| --- | --- |
| `index.html` | App shell. Declares the frozen DOM mount points (`#app`, `#stats-bar`, `#case-mode` with its three radio buttons, `#prompt-glyph`, `#play-sound`, `#answer-form`/`#answer-input`, `#feedback`, `#selection-panel`/`#selection-toggle`/`#selection-grid`) and loads `js/main.js` as a module. |
| `js/data.js` | Canonical dataset (`GREEK_DATA.groups`): `vowels`, `consonants`, `vowel_digraphs`, `consonant_digraphs`. No behavior, just data. |
| `js/engine.js` | Drill state machine (`createSession`). Owns the pool, current prompt, case-mode resolution, miss-requeue scheduling, and stats. No DOM access. |
| `js/ui.js` | All rendering and event wiring (`initUI`) against the mount points from `index.html`. Builds the selection grid, wires the case-mode radiogroup, renders prompt/feedback/stats, and drives the play-sound button. No persistence APIs are touched here (or anywhere in the app). |
| `js/audio.js` | Thin wrapper around the Web Speech `SpeechSynthesis` API (`speak`, `isSupported`). Picks an `el-GR` (or best-available) voice and caches the voice list. |
| `js/main.js` | Bootstrap only: imports data/engine/ui/audio, builds the initial session (vowels, lowercase), and calls `initUI`. No business logic. |
| `css/styles.css` | Mobile-first plain CSS. Design tokens in `:root`, dark mode via `prefers-color-scheme`, ≥44px tap targets, `prefers-reduced-motion` support, and state signaling that never relies on color alone. |

**Frozen module contracts** (changes elsewhere should not need to touch
these shapes):

- **Data item shape**: `{ id, lower, upper, hasDistinctUpper, name, display, answers }`.
  `hasDistinctUpper: false` (only `final_sigma`) means the item is always
  rendered lowercase, in every case mode.
- **Engine API** — `createSession({ items, caseMode })` returns an object
  with getters `current`, `promptGlyph`, `promptForm`, `stats`, and
  methods `submit(input)`, `next()`, `setPool(newItems)`,
  `setCaseMode(newMode)`, `reset()`.
- **`submit()` evaluates, `next()` advances** — these are separate steps
  on purpose: `submit(input)` scores the current prompt against
  `current.answers` and updates stats/miss-tracking but does not move
  the drill forward; the caller (`ui.js`) then calls `next()` to advance
  to a new prompt. Repeated `submit()` calls are re-scored until one is
  correct; after a correct submit, further `submit()` calls return the
  same cached result rather than re-scoring. `next()` is a no-op until
  the current prompt has a correct submission, so a wrong answer keeps
  the same prompt on screen until it is passed. Stats score first
  attempts only: `seen` counts prompts first-attempted, `correct` counts
  first-try successes, and `streak`/accuracy are first-try measures —
  retries change nothing.

## Dataset provenance & conventions (`js/data.js`)

The dataset encodes **Modern Greek** pronunciation, not Ancient/Erasmian,
by deliberate choice — this is what makes digraph values like μπ→b,
ντ→d, γκ→g, and iotacism (η/ι/υ/ει/οι/υι all → "i") correct.

Each item has two answer-related fields with different jobs:

- `display` — the single friendly sound shown to the learner in
  feedback and in the selection grid (e.g. `"g"`, `"ch"`, `"av/af"`).
- `answers` — the full array of accepted input strings, matched
  case-insensitively after trimming. This is often a superset of what's
  displayed, e.g.:
  - γ (gamma) displays `"g"` but accepts `g`, `gh`, or `y`.
  - χ (chi) displays `"ch"` but accepts `ch`, `h`, or `kh`.
  - αυ (alpha-upsilon) displays `"av/af"` and accepts both `av` and `af`
    (the sound is voiced/unvoiced depending on what follows in real
    Greek text, which isn't modeled here — either answer is accepted).

Final sigma (`ς`, id `final_sigma`) has `hasDistinctUpper: false` and
shares its `upper` value (`Σ`) with regular sigma purely for data
completeness; the engine never actually renders it uppercase.

## Extending (post-MVP hooks)

- **Classical/Erasmian pronunciation mode** — a data-only change. Swap
  or extend `answers` per item in `js/data.js` (e.g. β→`b`, η→`ē`,
  αι→`ai`), most naturally by adding a `variants` field (e.g.
  `variants: { classical: { display, answers } }`) and a mode toggle in
  `js/ui.js`/`js/main.js` that picks which variant the engine reads.
  `js/engine.js` would only need to accept "which variant" as part of
  session config.
- **Recorded audio clips** to replace best-effort TTS — swap the
  implementation inside `js/audio.js` (e.g. `speak()` tries an
  `<audio>` clip keyed by item id first, falling back to
  `SpeechSynthesis`). No changes needed to `ui.js`'s call site.
- **Letter-name answer mode** (drill the Greek letter's name instead of
  its sound) — `js/data.js` already carries `name` per item; this is
  mostly an `engine.js`/`ui.js` change to score against `name` instead
  of/alongside `answers`.
- **Polytonic accents group** — add a new group to
  `GREEK_DATA.groups` in `js/data.js` (e.g. accented vowel items); the
  selection panel and engine pick up new groups automatically since
  `ui.js` iterates `data.groups` generically.
- **Font toggle** (e.g. serif vs. a dedicated Greek webfont) — purely
  `css/styles.css`, via the `--font-glyph` custom property.
- **Real SRS scheduling** — `js/engine.js`'s `missDeadlines` map is a
  minimal "reappear within 3 prompts" mechanism; a real spaced-repetition
  scheduler would replace `pickItem`/`missDeadlines` internals while
  keeping the same public session API so `ui.js` doesn't need to change.

## Design constraints kept on purpose

- **No storage** — no localStorage, sessionStorage, cookies, or
  IndexedDB anywhere in the app; every reload is a clean session.
- **No analytics, no third-party dependencies, no build step** — plain
  ES modules and plain CSS only.
- **No teaching panel** — the app drills; it doesn't explain grammar or
  provide reference material beyond the sound shown per item.
- **Mobile-first, ≥44px tap targets** — all interactive elements
  (`.case-btn`, `#play-sound`, `#answer-input`, `.sel-item`,
  `.group-btn`, `#reset-btn`) respect `--tap-min: 44px`.
- **Accessibility**:
  - `#feedback` is `aria-live="polite"` so correctness feedback is
    announced without stealing focus.
  - `#case-mode` is a proper `role="radiogroup"` with `role="radio"`
    buttons, `aria-checked`, roving `tabindex`, and arrow-key
    navigation.
  - Every state (correct/incorrect, selected/unselected) is signaled by
    more than color alone (border style/weight, a ✓/✗ glyph or prefix,
    opacity).
  - The whole app is keyboard-operable: form submission via Enter,
    arrow-key case-mode switching, and standard tab/click semantics
    everywhere else.
