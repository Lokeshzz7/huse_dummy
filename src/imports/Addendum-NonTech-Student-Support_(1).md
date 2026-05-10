# Addendum: Non-Tech Student Support

**Applies to:** HUSE Phase 1 Developer Handoff  
**Date:** May 2, 2026  
**Priority:** Ship with Phase 1 — not a Phase 2 item

---

## Why This Matters

HUSE is for all college students, not just engineering students. A commerce student who grew a college club from 20 to 200 members, a law student who published a legal analysis, a design student who ran a campus event — all of these represent real, verifiable skills that recruiters hire for. The system must treat non-tech work with the same verification rigor as tech work.

The architecture doesn't change. The metadata-only approach, verification badges, tier system, and rep engine all work as designed. This addendum covers the taxonomy and content updates needed to make the platform inclusive.

---

## 1. Predefined Skill Tags (Complete List)

Replace the current tech-only tag list with this comprehensive list. Students select from these when adding projects. Recruiters filter by these on the Talent Board. Peer review routing matches on these.

### Engineering & Development (20 tags)

```
React, Node.js, Python, JavaScript, TypeScript,
Java, C++, Go, Rust, Swift,
MongoDB, PostgreSQL, AWS, Docker, Kubernetes,
Machine Learning, Data Engineering, DevOps, Cybersecurity, Blockchain
```

### Design (12 tags)

```
UI/UX Design, Graphic Design, Figma, Adobe Creative Suite, Motion Graphics,
3D Modeling, Product Design, Brand Identity, Illustration, Typography,
Design Research, Prototyping
```

### Business & Management (15 tags)

```
Market Research, Business Strategy, Financial Modeling, Operations Management,
Project Management, Supply Chain, Consulting, Entrepreneurship,
Business Development, Product Management, Agile/Scrum, Data Analysis (Excel),
Risk Assessment, Competitive Analysis, Business Plan Writing
```

### Marketing & Content (14 tags)

```
Content Writing, Copywriting, SEO, Social Media Marketing, Email Marketing,
Brand Strategy, Public Relations, Video Editing, Photography, Podcasting,
Community Building, Growth Hacking, Influencer Marketing, Analytics & Reporting
```

### Legal & Policy (6 tags)

```
Legal Research, Contract Drafting, Regulatory Compliance, Policy Analysis,
Intellectual Property, Dispute Resolution
```

### Finance & Economics (8 tags)

```
Financial Analysis, Accounting, Investment Research, Valuation,
Econometrics, Budgeting & Forecasting, Tax Planning, Audit
```

### Communication & Leadership (8 tags)

```
Public Speaking, Event Management, Team Leadership, Negotiation,
Workshop Facilitation, Cross-cultural Communication, Mentoring, Stakeholder Management
```

### Research & Academia (7 tags)

```
Academic Writing, Quantitative Research, Qualitative Research, Survey Design,
Statistical Analysis (SPSS/R), Literature Review, Thesis Writing
```

**Total: 90 tags across 8 categories.**

### Implementation

```typescript
export const SKILL_CATEGORIES = {
  'Engineering & Development': ['React', 'Node.js', 'Python', ...],
  'Design': ['UI/UX Design', 'Graphic Design', 'Figma', ...],
  'Business & Management': ['Market Research', 'Business Strategy', ...],
  'Marketing & Content': ['Content Writing', 'Copywriting', 'SEO', ...],
  'Legal & Policy': ['Legal Research', 'Contract Drafting', ...],
  'Finance & Economics': ['Financial Analysis', 'Accounting', ...],
  'Communication & Leadership': ['Public Speaking', 'Event Management', ...],
  'Research & Academia': ['Academic Writing', 'Quantitative Research', ...]
};
```

The tag selector UI should show categories as collapsible groups, not a flat list of 90 items. Students pick from the relevant category. A student can select tags from multiple categories (a business student who also knows Python).

---

## 2. Link Types (Expanded)

The project form currently has GitHub and Live URL fields. Expand to a categorized link system where students pick the link type from a dropdown, then paste the URL.

### Complete Link Type Registry

| Link Type | Example URLs | Metadata Enrichment | Proof Signal |
|-----------|-------------|---------------------|-------------|
| **GitHub Repository** | github.com/user/project | Stars, commits, languages, fork status (API) | Code ownership |
| **Live Deployment** | myproject.vercel.app | HTTP ping: online/offline badge | Working product |
| **Figma / Design File** | figma.com/file/... | URL validation | Design work |
| **Behance / Dribbble** | behance.net/gallery/... | URL validation + OG image | Design portfolio |
| **Demo Video** | youtube.com/watch, loom.com/share | URL validation + OG image | Walkthrough |
| **Presentation** | docs.google.com/presentation, canva.com/design | URL validation | Communication skill |
| **Document / Report** | docs.google.com/document, notion.so/... | URL validation | Research, writing, analysis |
| **Spreadsheet / Data** | docs.google.com/spreadsheets, airtable.com | URL validation | Data analysis, modeling |
| **Published Article** | medium.com/@user, linkedin.com/pulse | URL validation + OG image | Thought leadership |
| **Social Media Page** | instagram.com/page, linkedin.com/company | URL validation | Community building, marketing |
| **Event Page / Recap** | lu.ma/event, eventbrite.com, notion.so recap | URL validation + OG image | Event management |
| **Certificate / Course** | coursera.org/verify, credential.net | URL validation | Verified learning |
| **Research Paper** | arxiv.org, researchgate.net, scholar.google | URL validation | Academic contribution |
| **Podcast / Audio** | open.spotify.com, anchor.fm | URL validation + OG image | Content creation |
| **Other URL** | any valid URL | URL validation only | Supplementary |

### Implementation

```typescript
export const LINK_TYPES = [
  { id: 'github', label: 'GitHub Repository', icon: 'code', category: 'tech' },
  { id: 'live', label: 'Live Deployment', icon: 'globe', category: 'tech' },
  { id: 'figma', label: 'Figma / Design File', icon: 'palette', category: 'design' },
  { id: 'behance', label: 'Behance / Dribbble', icon: 'palette', category: 'design' },
  { id: 'video', label: 'Demo Video', icon: 'video', category: 'media' },
  { id: 'presentation', label: 'Presentation / Slides', icon: 'presentation', category: 'document' },
  { id: 'document', label: 'Document / Report', icon: 'file-text', category: 'document' },
  { id: 'spreadsheet', label: 'Spreadsheet / Data', icon: 'table', category: 'document' },
  { id: 'article', label: 'Published Article', icon: 'book-open', category: 'media' },
  { id: 'social', label: 'Social Media Page', icon: 'users', category: 'media' },
  { id: 'event', label: 'Event Page / Recap', icon: 'calendar', category: 'document' },
  { id: 'certificate', label: 'Certificate / Course', icon: 'award', category: 'credential' },
  { id: 'research', label: 'Research Paper', icon: 'search', category: 'document' },
  { id: 'podcast', label: 'Podcast / Audio', icon: 'headphones', category: 'media' },
  { id: 'other', label: 'Other URL', icon: 'link', category: 'other' }
];
```

### Metadata Enrichment Priority

Phase 1 only enriches: GitHub (API call), Live Deployment (HTTP ping), and all others (OG image fetch + URL validation). No additional APIs needed. Enriching Medium follower counts, Instagram engagement, etc. is Phase 2 — unnecessary complexity now.

### Link Type Proof Weights (for rep calculation context)

Not all links carry equal proof weight. This doesn't affect rep directly (badges do), but it influences how the peer review routing assesses project strength:

| Weight | Link Types |
|--------|-----------|
| Highest | Live Deployment, GitHub with verified ownership |
| High | Published Article, Research Paper, Behance/Dribbble portfolio |
| Medium | Document/Report, Presentation, Video, Event Recap, Certificate |
| Lower | Social Media Page, Spreadsheet, Other URL |

---

## 3. Daily Drop Prompt Bank Guidelines

The prompt bank should contain at least 90 prompts (3 months). Minimum 40% should be non-tech or skill-neutral.

### Prompt Categories

**Skill-neutral (anyone can answer):**
- "Describe a problem you noticed on campus this week and how you'd solve it"
- "What's one thing you organized this semester? What did you learn?"
- "Share a skill you taught someone else recently"
- "Your best negotiation or persuasion moment this year"
- "What's the most underrated skill in your field? Why?"
- "Pitch a campus improvement idea in 3 sentences"
- "What did you fail at recently and what did it teach you?"
- "Describe your ideal internship — what would you do on day one?"
- "What's one industry trend that excites you? Why?"
- "Share a collaboration that went well — what made it work?"

**Business / Management:**
- "Pitch a business idea that solves a problem for college students"
- "You have Rs. 10,000 to start something on campus — what do you build?"
- "Share a case study of a brand you admire. What makes them different?"
- "Design a go-to-market strategy for a student-made product"
- "What's one metric every student startup should track?"

**Design / Creative:**
- "Redesign one thing about your college's website. What would you change and why?"
- "Share a design principle that changed how you think"
- "What makes a great user experience? Give one example from your life"
- "Critique a popular app's design — one thing it does well, one thing it doesn't"

**Tech / Engineering:**
- "What's the most interesting technical problem you've solved recently?"
- "Explain a complex concept from your field in 3 sentences that anyone can understand"
- "What technology will be irrelevant in 5 years? What replaces it?"
- "Share a debugging story — what went wrong and how you fixed it"

**Research / Academia:**
- "What research question keeps you up at night?"
- "Summarize a paper you read recently in 3 sentences"
- "What's one thing your field gets wrong? What does the data actually say?"

### Distribution Rule

When building the prompt bank, ensure no more than 3 consecutive prompts are from the same category. Alternate between skill-neutral, business, design, tech, and research prompts to keep all students engaged daily.

---

## 4. Talent Board — Category Filter

Add a top-level category filter above the college filter pills on the Talent Board.

### Filter Options

```
All Students | Engineering | Design | Business | Content & Media | Research
```

These map to the skill tag categories:

| Talent Board Filter | Matches Students With Tags From |
|--------------------|-------------------------------|
| All Students | (no filter) |
| Engineering | Engineering & Development |
| Design | Design |
| Business | Business & Management, Finance & Economics, Legal & Policy |
| Content & Media | Marketing & Content, Communication & Leadership |
| Research | Research & Academia |

A student with tags from multiple categories appears in all matching filters.

### Implementation

Add this filter bar above the existing college pills on `TalentBoard.tsx`. It's a simple toggle group — selecting a category filters the student grid to show only students whose skill tags fall within that category. "All Students" shows everyone.

### Updated SEO / Info Banner Text

**Current (tech-biased):**
> "Public page · No login wall · Recruiters land directly from Google for 'IIT Madras React developers'"

**Updated (inclusive):**
> "Public page · No login wall · Recruiters discover verified student talent across engineering, design, business, and more"

The URL slug display can still show college-specific paths: `huse.circle/talent/iit-madras`

---

## 5. UI Copy Updates

Scan and update any UI copy that implies HUSE is tech-only:

| Current Copy | Updated Copy | Location |
|-------------|-------------|----------|
| "View Project on GitHub" | "View Project" (with link type icon) | Feed post cards |
| "GitHub stars", "Commits" | Show only when link type is GitHub | Project cards |
| "Technologies" label in project form | "Skills & Tools" | AddProjectModal |
| "Tech Stack" on project cards | "Skills" | Portfolio, Talent Board cards |
| "IIT Madras React developers" | "verified student talent" | Talent Board banner |
| "Code" button on project cards | Show only when GitHub link exists | Portfolio project cards |
| "View Live" button | Show only when live deployment link exists | Portfolio project cards |
| Generic project card actions | Show contextual buttons based on link types: "View Report", "View Design", "Watch Demo", "View Live", "View Code" | Portfolio project cards |

### Contextual Action Buttons on Project Cards

Instead of always showing "Code" and "View Live", show buttons based on which link types the project has:

```typescript
const LINK_TYPE_BUTTONS = {
  github: { label: 'Code', icon: 'code' },
  live: { label: 'View Live', icon: 'external-link' },
  figma: { label: 'View Design', icon: 'palette' },
  video: { label: 'Watch Demo', icon: 'play' },
  document: { label: 'View Report', icon: 'file-text' },
  presentation: { label: 'View Slides', icon: 'presentation' },
  article: { label: 'Read Article', icon: 'book-open' },
  research: { label: 'Read Paper', icon: 'search' },
  event: { label: 'Event Details', icon: 'calendar' },
  certificate: { label: 'View Certificate', icon: 'award' },
  // For all other types:
  default: { label: 'View', icon: 'external-link' }
};
```

Show up to 2 buttons on the project card. If the project has more than 2 link types, show the 2 highest-weight links as buttons and the rest as a "more links" dropdown.

---

## 6. Verification System — No Changes Needed

The verification badge system is inherently discipline-agnostic:

- **Peer Reviewed:** Peers with matching skill tags review the work. A marketing student's brand strategy gets reviewed by other marketing students, not by React developers. The routing algorithm matches on skill tags — as long as the tag list includes non-tech skills (which it now does), routing works correctly.

- **Client Rated:** A client who hired a student for social media management rates them the same way a client who hired for web development does. The rating form is the same: 1-5 stars + optional testimonial.

- **Blind Verified:** Anonymous community voting. A business plan competes anonymously against other business plans (within the same Daily Drop prompt). The voting doesn't know or care if the submission is code or prose.

- **Recruiter Endorsed:** HR recruiters endorse business students. Tech recruiters endorse engineering students. The endorsement button works the same regardless of discipline.

- **Mentor Confirmed:** Mentors matched by skill tags. A finance mentor reviews a finance student's work. Same system, different tags.

No code changes needed to the verification pipeline. It just works — as long as the skill tags and link types are inclusive, which this addendum ensures.

---

## 7. Files to Update (In Addition to Main Handoff)

| File | Change |
|------|--------|
| `tierSystem.ts` or new `skillTags.ts` | Add `SKILL_CATEGORIES` and `LINK_TYPES` constants |
| `HuseCircleModals.tsx` (AddProjectModal) | Replace tech stack input with categorized skill tag selector; replace GitHub/Live URL fields with link type dropdown + URL input |
| `TalentBoard.tsx` | Add category filter bar above college pills |
| `HuseCirclePlatform.tsx` (StudentPortfolio) | Update project card action buttons to be contextual based on link types |
| `RecruiterDashboard.tsx` | Update skill filter list to include all 90 tags grouped by category |
| `studentsData.ts` | Add non-tech mock students (business, design, law, etc.) |
| All UI copy | Audit and replace "tech stack" → "skills", "GitHub" → contextual, etc. |

---

## Summary

The architecture is sound. No structural changes. The updates are:

1. **90 skill tags across 8 categories** (was ~15 tech-only tags)
2. **15 link types across 5 categories** (was 2: GitHub + live URL)
3. **Prompt bank with 40%+ non-tech prompts** (was implicitly tech-focused)
4. **Talent Board category filter** (Engineering / Design / Business / Content / Research)
5. **Contextual project card buttons** (show "View Report" not "View Code" for a business student)
6. **UI copy audit** (remove tech-only language)

Zero additional backend cost. Zero architecture changes. The metadata-only model actually works better for non-tech students since they were never going to have GitHub repos anyway — a Google Doc link and verification badges are exactly the right proof for their work.

---

*This addendum is part of the HUSE Phase 1 Developer Handoff. Apply alongside the main document and tier system redesign.*
