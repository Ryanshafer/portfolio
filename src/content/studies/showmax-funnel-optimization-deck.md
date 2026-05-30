# Showmax Funnel Optimization — Case Study Deck

## Ryan Shafer — Head of UX · Showmax

---

## Slide 1 — Title

### Fixing the Invisible Problems

**My Role**
Head of UX — joined after a newly shipped funnel redesign failed to move conversion.

**The Problem**
A redesigned funnel had just shipped. Trial conversion stayed flat. The team had no clear explanation.

**The Result**
Reframing the problem as a full user journey uncovered two root causes the team had missed — and both were fixable.

- ↓ 99% homepage load time (25 seconds → milliseconds)
- ↑ 3.6× trial conversion rate (2.5% → 9%)
- A stable homepage that allowed our team to experiment with A/B tests
- Validated, ready-to-ship recommendation priming concept delivered

**Image:** `promowide-showmax-funnel.webp`

---

## Slide 2 — The Problem

### The funnel was rebuilt. The numbers didn't move.

Before arriving, Showmax had invested in a significant redesign of the sign-up flow. Despite the effort, trial conversion remained flat. The team was confident in the form itself and stuck on what to try next.

- The team was treating the funnel as a form problem — optimizing steps and UI within the sign-up experience itself
- No one had mapped what users were experiencing *before* and *after* the form
- Without a journey-level view, the root causes of low conversion were entirely invisible

The question the team kept asking was: *what's wrong with the form?* The real question was: *why aren't users reaching it?*

**Image:** `showmax-signup-funnel.webp`

---

## Slide 3 — Reframing the Problem

### The funnel wasn't broken. The lens was.

I started by mapping the full user journey — from first visit to trial value. That shift in scope changed everything.

- The team had only ever looked at the form itself — the steps, the UI, the drop-off rates within sign-up
- Journey mapping extended the view in both directions: what happened before users reached the form, and what happened after they completed it
- Both ends of the funnel were blind spots — problems hiding in plain sight outside the team's working frame

Two failures surrounded the form — one at entry, one at conversion — neither visible from inside it.

---

## Slide 4 — Diagnosis: The Homepage

### 25 seconds to load. Most users never got past that.

Using Amplitude analytics, heuristic analysis, and Lighthouse audits, I diagnosed the homepage as the primary driver of bounce.

- At mobile speeds, the homepage took ~25 seconds to load — competitors loaded in milliseconds
- Root cause: the full React sign-up app was loading on the homepage, serving no purpose there
- Engineering confirmed it was unnecessary and fixable

This wasn't a design problem. It was a performance problem wearing a design mask — and it was killing conversion before users ever saw the product.

**Image:** `showmax-slow-load-time.webp`

---

## Slide 5 — Fix One: Performance as UX

### We re-architected the homepage. Load times dropped 99%.

I partnered with engineering to treat homepage performance as a first-class UX problem — not a backend concern to handle later.

- Re-architected the homepage as a lightweight entry point, decoupled from the React sign-up app
- Load time dropped from ~25 seconds to milliseconds across all devices
- Established a shared performance budget — engineering and design aligned on a single standard, no regression without accountability

This wasn't a one-time fix. The performance budget gave us a durable mechanism to prevent the same problem from returning.

**Image:** `showmax-perf-budget-future.webp`

---

## Slide 6 — The Homepage as a Conversion Asset

### Speed gave us something more valuable — a homepage worth testing

Every change to the homepage was now a real business decision — and we needed a principled way to make those calls.

When Showmax launched *Saturday Night Live* in Poland, marketing wanted it above the fold. Design flagged the conversion risk. Rather than letting either side win by force, I negotiated a data guardrail: run an A/B test with an agreed –10% conversion tolerance.

The version marketing wanted landed at **–8.32%** — within tolerance. Marketing got the placement, but we got the precedent: homepage decisions would be settled with data, not opinion.

**Image:** `showmax-live-ab.webp`

---

## Slide 7 — Diagnosis: The Trial

### Trial users weren't seeing relevant content. So they left.

With the homepage addressed, I turned to the second failure: users who signed up weren't converting to paid. I dug into the onboarding and trial experience.

- Trial users were watching *less* video than paid subscribers — the inverse of what should be true
- User testing confirmed it: the homepage looked identical on day one and day fourteen — no recommendations ever surfaced
- The recommendation engine needed 30 days of data to personalize; the trial window was 14

Users were being handed a static experience and asked to find value through exploration. Most didn't.

---

## Slide 8 — Fix Two: Priming the Recommendation Engine

### Give the engine a head start. Deliver relevance from day one.

Working with the recommendations tech lead, we designed a lightweight fix that didn't require waiting for behavioral usage data.

- A short post-sign-up step: users select a few shows or genres they already like
- This primes the engine with structured starter data — delivering relevant content from session one, not day thirty
- Concept tested positively with users and confirmed technically viable by engineering

Product priorities shifted before launch, but the prototype was validated and ready to ship.

**Image:** `showmax-recomendation-priming.webp`

---

## Slide 9 — Results

### 3.6× conversion — from fixing what nobody was looking at

↑ 3.6× trial conversion rate — from 2.5% to 9%  
↓ 99% homepage load time — ~25 seconds to milliseconds  
↑ Data-driven homepage governance — A/B testing with agreed tolerances replaced opinion-based decisions  
↑ Validated priming concept — ready to ship, staged for next product cycle

Both root causes were fixable. The conversion lift came from the first. The A/B framework and priming concept left the team better equipped for what came next.

**Image:** `showmax-conversion-rate.webp`

---

*Images from: `/assets/studies/optimizing-showmax-funnel/content/`*  
*Source: `showmax-funnel-optimization.mdx`*
