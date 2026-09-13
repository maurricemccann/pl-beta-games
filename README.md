# PL Beta Games

35 standalone HTML games. **Each file is self-contained** — its own inline
`<style>`, its own `:root` tokens. There is no shared stylesheet, by design.
The only shared code is `pl-game-data.js` and `pl-points.js` (28 files), plus
p5.js / three.js from CDN.

---

## ⚠ Token names here are INVERTED relative to the house canon. Read this before editing.

In `pl-headless`, `pl-os` and the vault, the house meaning is:

| token | house meaning |
|---|---|
| `--void` | the **dark** ground |
| `--bone` | the **light** foreground |

**In these games it is the other way round.** 22 of the 35 files declare:

```css
:root { --void: #F8F2E4;  /* LIGHT — used as the page background */
        --bone: #0A0A0A;  /* DARK  — used as the text colour     */ }
body  { background: var(--void); color: var(--bone); }
```

**Nothing renders wrong.** Every file is internally consistent, and because no
stylesheet is shared between games, the inverted naming cannot leak from one
file to another. Verified S271·d92a by rendering one game from each family and
reading the computed styles.

**The one way this bites you:** editing a game while assuming the house meaning
— reaching for `--bone` expecting a light value and getting `#0A0A0A`, which
on a light background is invisible black-on-near-black. Read the file's own
`:root` block first. It is always right there at the top.

## The three palette families

| files | `--void` (background) | `--bone` (text) | `--gold` | what it is |
|---|---|---|---|---|
| **13** | `#F8F2E4` cream | `#0A0A0A` | `#B8861C` | the house cream set |
| **9** | `#F0EAF8` lavender | `#0A0A0A` | `#6B3FA8` purple | **a deliberate second theme** — apostle-layer · archive-restoration · fifty-seeds · glyph-decode · law-3-live · long-game · reality-architect · tarot · what-persists |
| **1** | `#050505` | `#F0EAF8` | `#9B6FD8` | `the-void.html` — the only file using the house orientation |
| **12** | — | — | — | no `:root` tokens; hardcoded, or a `#F8F2E4` body background only |

The lavender/purple set is **intentional**, not drift — rendered and confirmed
S271·d92a. Do not "correct" it toward the cream palette.

## If you ever want the names fixed

It is a pure swap — exchange the two values and every `var(--void)` /
`var(--bone)` usage within a file. Zero visual change by construction, so it is
verifiable with a before/after screenshot. **Deliberately not done S271·d92a:**
22 files of churn to fix a smell that renders correctly and cannot leak. The
convention is documented here instead. Revisit only if these games ever gain a
shared stylesheet — that is the change that would make the inversion dangerous.
