# PL Beta Games

33 browser games from Psyched Luxuries, each one self-contained HTML file, plus a hub
page that lists them. Built with p5.js and three.js. No build step, no bundler: open a
file and it runs.

The games turn the house's philosophy, the Three Truths, into play: reaction drills,
memory and sorting games, puzzles built from real archive images, and 3D spaces.

## The games

| Game | File | Engine | What you do |
|---|---|---|---|
| Preparation | `preparation.html` | p5.js | Click the instant the circle flashes. Five timed rounds. |
| The Archive Circles | `living-archive.html` | p5.js | A circle flashes across the archive years. Click as it flares. |
| Restore the Archive | `restore-the-archive.html` | p5.js | A 4x4 sliding puzzle built from an archive image. |
| Archive Restoration | `archive-restoration.html` | p5.js | Collect fragments of an archive piece across sessions. |
| The Practice | `the-practice.html` | p5.js | An endless runner. |
| The Curve | `the-curve.html` | p5.js | Trace a shown Bezier path. Five rounds, scored on precision. |
| Glyph Decode | `glyph-decode.html` | p5.js | Memory match: pair each glyph with its meaning. |
| The Return | `the-return.html` | p5.js | A glyph sequence plays. Repeat it back; each round adds one. |
| Resonance | `resonance.html` | p5.js | A 7x7 match-3 board of glyph gems. |
| The Lexicon | `the-lexicon.html` | p5.js | Words fall. Sort each into its glyph before it is lost. |
| The Signal | `the-signal.html` | p5.js | Catch the falling words that belong to your lens. |
| The Signal, Descrambled | `the-signal-descrambled.html` | p5.js | Put a scrambled seed phrase back in order against the clock. |
| The Seeds | `the-seeds.html` | p5.js | Rebuild a seed phrase from a word bank against the clock. |
| What Persists | `what-persists.html` | p5.js | A phrase appears, then vanishes. Rebuild it from memory. |
| Compound | `compound.html` | p5.js | A merge game whose tiles run from Day 1 to Year 7. |
| The Void | `the-void.html` | p5.js | Hold an intention for 30 seconds, uninterrupted. |
| Reality Architect | `reality-architect.html` | p5.js | State an intention across self, wealth and world. |
| Identity Install | `identity-install.html` | p5.js | Receive three anchors, then navigate a space that answers them. |
| Watch This Moment | `watch-this-moment.html` | p5.js | No instructions, no visible objective. Find what responds. |
| The Transmission Engine | `transmission-engine.html` | p5.js | Write a thought; it returns through all Three Truths in turn. |
| The Oracle Game | `oracle-game.html` | p5.js | Ask a question; the Oracle answers with a seed. |
| Psyched Luxuries Tarot | `tarot.html` | p5.js | Draw three of 22 cards. Every reading ends "Watch this." |
| The Long Game | `long-game.html` | p5.js | Plant a seed on day one and tend it daily for a year. |
| Truth 3 Live | `law-3-live.html` | p5.js | Hold one intention for 30 days. |
| The Congregation Map | `congregation-map.html` | p5.js | Players appear as a constellation grouped by philosophy. |
| The Congregation Engine | `congregation-engine.html` | p5.js | A shared space where players are sorted by doctrine. |
| The Apostle Layer | `apostle-layer.html` | p5.js | Unlocks after three other games are completed. |
| The 50 Seeds | `fifty-seeds.html` | p5.js | Find 50 seeds hidden across the other games. |
| Living Archive 3D | `living-archive-3d.html` | three.js | Fly through the archive as particles in 3D. |
| The Origin Well | `origin-well.html` | three.js | Descend through the archive one year per layer. |
| The Three Truths Room | `three-laws-room.html` | three.js | Three connected 3D chambers, one per Truth. |
| The Curve Field | `curve-field.html` | three.js | Move across a dark plane as curve formations rise. |
| Sanctuary Preview | `sanctuary-preview.html` | three.js | Walk a 3D space and find seeds placed in it. |

`index.html` is the hub. `games.html` redirects to it.

## Run it

Any static file server works. From the repo root:

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

Serve over HTTP rather than opening files directly: the shared scripts make network
requests.

## How it is built

- **One file per game.** Each HTML file carries its own inline `<style>`, its own
  `:root` tokens and its own script. There is no shared stylesheet, by design.
- **Libraries from CDN.** p5.js 1.9.3 from cdnjs and three.js 0.158.0 from unpkg.
- **Two shared scripts**, loaded by 34 of the 35 HTML files:
  - `pl-game-data.js` gives games real data: archive pieces, seed phrases, Oracle
    answers, and saved progress for signed-in members, with a `localStorage` fallback
    when signed out or offline.
  - `pl-points.js` reports one play per game per day after 20 seconds of visible play,
    only when the game was launched from a member account (`?ptk=`). The server enforces
    the points rules. Without a token, games play free and report nothing.
- **The house handwriting font** in `fonts/` is loaded by 34 files. It is proprietary;
  see [LICENSE](LICENSE).
- **Installable.** The hub carries a web app definition and the icons in `icons/`, so it
  installs as a home-screen app.
- **Deploy.** `.github/workflows/deploy.yml` publishes the repo root to Cloudflare Pages
  on every push to `master`.

## Editing a game: token names are inverted

In the rest of the Psyched Luxuries codebase, `--void` is the dark ground and `--bone`
is the light foreground. **In these games it is the other way round.** 22 of the 35
HTML files declare:

```css
:root { --void: #F8F2E4;  /* LIGHT, used as the page background */
        --bone: #0A0A0A;  /* DARK, used as the text colour       */ }
body  { background: var(--void); color: var(--bone); }
```

Nothing renders wrong. Every file is internally consistent, and because no stylesheet
is shared, the naming cannot leak from one file to another.

The one way it bites: editing a game while assuming the house meaning, reaching for
`--bone` expecting a light value and getting `#0A0A0A`, which is invisible on a dark
ground. Read the file's own `:root` block first. It is always at the top.

### The palette families

| Files | `--void` (background) | `--bone` (text) | `--gold` | What it is |
|---|---|---|---|---|
| 13 | `#F8F2E4` cream | `#0A0A0A` | `#B8861C` | the house cream set |
| 9 | `#F0EAF8` lavender | `#0A0A0A` | `#6B3FA8` purple | a deliberate second theme: apostle-layer, archive-restoration, fifty-seeds, glyph-decode, law-3-live, long-game, reality-architect, tarot, what-persists |
| 1 | `#050505` | `#F0EAF8` | `#9B6FD8` | `the-void.html`, the only file using the house orientation |
| 12 | none | none | none | no `:root` tokens; hardcoded colours, or a `#F8F2E4` body background only |

The lavender and purple set is intentional. Do not "correct" it toward the cream palette.

### If the names are ever swapped

It is a pure swap: exchange the two values and every `var(--void)` / `var(--bone)` use
within a file. There is zero visual change by construction, so a before and after
screenshot verifies it. It has not been done because it is 22 files of churn for a
naming smell that renders correctly and cannot leak. Revisit it if the games ever gain
a shared stylesheet, the one change that would make the inversion dangerous.

## License

All rights reserved, and the handwriting font is proprietary. See [LICENSE](LICENSE).
Third-party fonts and libraries keep their own licences.

Made by [Psyched Luxuries](https://psychedluxuries.com).
