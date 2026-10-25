# Photos — drop-in guide

Every slot below shows a labelled placeholder until the real file exists.
Nothing breaks while a photo is missing, so add them in any order.

**Filenames must match exactly** (lowercase, `.jpg`).

---

## Essential — the ones that matter most

| File | Where it shows | Best crop | What works |
|---|---|---|---|
| `gallery/hero-portrait.jpg` | Home hero, pinned polaroid | **4:5 portrait** | You, looking up/away or straight at camera. Warm light. This is the first thing anyone sees. |
| `gallery/about-portrait.jpg` | Story page | **4:5 portrait** | Candid, warmer, less posed than the hero. |
| `gallery/india-to-texas.jpg` | Home, story teaser | **4:3 landscape** | Travel, a skyline, an airplane window — anything that reads "two countries". |
| `gallery/speaking.jpg` | Home, small polaroid | **1:1 square** | You at a mic or on a stage. |
| `gallery/building.jpg` | Home, small polaroid | **1:1 square** | Hands on hardware, a laptop, a breadboard, a whiteboard. |

## Project covers

| File | Best crop | What works |
|---|---|---|
| `projects/vakshala-cover.jpg` | **16:10** | App screenshot on a device, or you coaching students. |
| `projects/nirvband-cover.jpg` | **16:10** | Band render, app mockup, or the sensor hardware. |
| `projects/photobioreactor-cover.jpg` | **16:10** | Screenshot of the live digital twin, or a chart from it. |
| `projects/top-the-graph-cover.jpg` | **16:10** | A session photo, or a screenshot of the old app. |
| `projects/cctia-cover.jpg` | **16:10** | The team, a meeting, or the counseling app UI. |

Covers are also used wide (16:8) at the top of each case study, so keep the
subject roughly centred and leave a little headroom.

## Speaking

| File | Best crop | What works |
|---|---|---|
| `speaking/tedx-2026.jpg` | **16:9** | A still or photo from "From Chasing to Choosing". |
| `speaking/tedx-2025.jpg` | **16:9** | A still or photo from "From Shadows to Spotlight". |
| `speaking/stage-1.jpg` | **4:5** | Mid-speech, gesturing. |
| `speaking/stage-2.jpg` | **4:5** | With an audience, a trophy, or a medal. |
| `speaking/stage-3.jpg` | **4:5** | Teaching a workshop or camp. |

---

## Practical notes

- **Size:** roughly 1600px on the long edge is plenty. Anything over ~500KB
  per file is bigger than it needs to be.
- **Format:** `.jpg` for photos. If you only have `.png` or `.heic`, send
  them anyway — they can be converted.
- **Orientation matters more than resolution.** A portrait photo in a
  landscape slot gets cropped at the top and bottom.
- Next.js optimises and resizes these automatically at build time.

## Still needed from you

Nothing outstanding — every slot on the site is filled.

Two optional refinements:

- Which TEDx talk the embedded video belongs to, so it can sit on that
  talk's card instead of standing alone.
- Higher-resolution originals for `speaking/tedx-stage.jpg` (387x387) and
  `speaking/tedx-stage-wide.jpg` (411x302), if they exist in a camera roll.
  They are fine at current size but cannot be enlarged.

The VakShala app URL is set (`VAKSHALA_APP_URL` in `lib/content.ts`).
