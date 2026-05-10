# Tier System Redesign — Final Specification

**Date:** May 2, 2026  
**Status:** Final — ship with these numbers, calibrate from real data in Q1

---

## Updated Tier Thresholds

```typescript
export const TIER_THRESHOLDS = {
  Bronze:         { min: 0,      max: 499 },
  Silver:         { min: 500,    max: 1999 },
  Gold:           { min: 2000,   max: 7999 },
  Platinum:       { min: 8000,   max: 24999 },
  Contributor:    { min: 25000,  max: 99999 },
  'Business Owner': { min: 100000, max: Infinity }
};
```

### Why These Numbers

| Tier | Rep Required | Realistic Timeline | What It Means |
|------|-------------|-------------------|---------------|
| Bronze | 0–499 | Weeks 1–2 | Onboarding. Learning the platform. Posting first project. |
| Silver | 500–1,999 | Month 1–2 | Active participant. Getting peer reviews. Submitting Daily Drops. |
| Gold | 2,000–7,999 | Month 3–5 | One semester of real work. First verification badges earned. Visible to recruiters on Talent Board. |
| Platinum | 8,000–24,999 | Month 6–12 | Full year of proven, verified work. Public portfolio URL. Full Talent Board card with badges. |
| Contributor | 25,000+ | Year 2+ or graduation | Graduated to Dofracto. Paid work. Mentoring students. |
| Business Owner | 100,000+ | Established builder | Running a real business on the ecosystem. |

Anchored to the academic calendar: a student who joins in Year 2 and stays active should hit Platinum before they graduate.

---

## Reputation Earning Sources (Complete List)

### Project & Portfolio Actions

| Action | Rep | Condition | Why This Amount |
|--------|-----|-----------|----------------|
| Post a project (base) | +50 | Any tier | Low base — posting alone shouldn't be the main earner |
| Earn Peer Reviewed badge | +200 | 5 peers validated the project | Meaningful peer consensus |
| Earn Client Rated badge | +300 | A paying client rated the work | External real-world validation |
| Earn Blind Verified badge | +150 | Top 50% in anonymous voting | Community quality signal without bias |
| Earn Recruiter Endorsed badge | +500 | A verified recruiter endorsed | Highest-value signal — recruiter put their name on it |
| Earn Mentor Confirmed badge | +250 | A mentor verified learning | Skill growth confirmed by senior |
| Project goes live (live URL verified) | +25 | System detects live deployment | Rewards deployment, not just code |

### Verification & Review Actions

| Action | Rep | Condition | Why This Amount |
|--------|-----|-----------|----------------|
| Complete a peer review | +50 | Submitted rating + feedback in Review Queue | Core ecosystem contribution — makes the whole system work |
| Complete a mentor review | +75 | Mentor role, reviewed a mentee's project | Higher responsibility = higher reward |
| Skip/decline a review | 0 | Chose "Skip · reroute" | No penalty, but no reward either |

### Daily Drop & Feed Actions

| Action | Rep | Condition | Why This Amount |
|--------|-----|-----------|----------------|
| Submit a Daily Drop | +25 | One per day max | Participation reward — shows up and contributes |
| Win Daily Drop (top 10 in house) | +200 | Voted top 10 after reveal | Quality recognized by community |
| Win Daily Drop (house #1) | +500 | Best in house for the day | Major achievement, drives competition |
| Receive an upvote (on post or project) | +2 | Per unique upvote | Small but compounds — 100 upvotes = +200 |
| Give structured feedback on a project | +15 | One per project, max 280 chars | Encourages thoughtful engagement |

### Engagement & Streak Actions

| Action | Rep | Condition | Why This Amount |
|--------|-----|-----------|----------------|
| 7-day login streak | +25 | 7 consecutive days | Builds the daily habit |
| 30-day active streak | +100 | 30 consecutive days active | Sustained engagement reward |
| Complete a challenge | +50–200 | Varies by challenge difficulty | Existing system, keep as-is |
| Get recruited through platform | +500 | Confirmed by recruiter | Ultimate outcome — the system worked |

### Marketplace & Gig Actions

| Action | Rep | Condition | Why This Amount |
|--------|-----|-----------|----------------|
| Complete a gig successfully | +100 | Gig marked complete by poster | Real work delivered |
| Successful marketplace transaction | +10 | Both parties confirmed | Minor but encourages activity |
| Get a 5-star client review on gig | +50 | Client rated 5/5 | Quality bonus on top of completion |

---

## Monthly Earning Simulation

### Casual student (logs in 3x/week, posts occasionally)

| Action | Frequency/month | Rep earned |
|--------|----------------|-----------|
| Daily Drop submissions | 10 | 250 |
| Login streaks (partial) | 2 weeks | 0 (doesn't complete 7-day) |
| Upvotes received | 15 | 30 |
| Give feedback | 2 | 30 |
| Post a project | 0-1 | 0-50 |
| **Monthly total** | | **~310-360 rep** |

Timeline: Bronze → Silver in ~6 weeks. Silver → Gold in ~5 months. This student probably doesn't reach Gold in one semester. That's correct — casual usage shouldn't unlock premium features quickly.

### Active student (daily user, posts projects, reviews peers)

| Action | Frequency/month | Rep earned |
|--------|----------------|-----------|
| Daily Drop submissions | 20 | 500 |
| Daily Drop wins (1-2 top 10) | 1.5 | 300 |
| Post projects | 1 | 50 |
| Earn badges on projects | 2 badges avg | 350 |
| Complete peer reviews | 8 | 400 |
| Give feedback | 5 | 75 |
| Upvotes received | 40 | 80 |
| Login streaks | 4 weeks | 100 |
| Complete challenges | 2 | 200 |
| **Monthly total** | | **~2,055 rep** |

Timeline: Bronze → Silver in ~1 week. Silver → Gold in ~1 month. Gold → Platinum in ~3 months. **Platinum by month 4-5.** This is an active, engaged student doing real work. They deserve Platinum by mid-semester.

### Power user (top student, builds real projects, wins drops, reviews heavily)

| Action | Frequency/month | Rep earned |
|--------|----------------|-----------|
| Daily Drop submissions | 25 | 625 |
| Daily Drop wins (top 10 + house #1s) | 4 | 1,300 |
| Post projects | 2 | 100 |
| Earn badges (3-4 per project) | 7 badges total | 1,800 |
| Complete peer reviews | 15 | 750 |
| Complete mentor reviews | 3 | 225 |
| Give feedback | 10 | 150 |
| Upvotes received | 100 | 200 |
| Login streaks | 4 weeks + 30-day | 200 |
| Complete challenges | 4 | 500 |
| Gigs completed | 1 | 100 |
| **Monthly total** | | **~5,950 rep** |

Timeline: Platinum by month 2. Contributor by month 5-6. This is the top 1% — future Dofracto contributors and startup builders. They're earning rep through verified, validated, real work. Nobody can fake this because the biggest earners require other people's endorsement.

---

## Rep Decay (Soft Decay Model)

Rep earned more than 6 months ago counts at 50% for tier calculation.

```
effective_rep = (rep_last_6_months * 1.0) + (rep_older_than_6_months * 0.5)
```

**Lifetime rep** is displayed separately as a career total and never decays. It's a badge of honor. But **tier calculation** uses effective_rep only.

This prevents stagnant profiles from occupying Talent Board slots. A student who was Gold-active last year but hasn't logged in for 8 months will naturally drop to Silver visibility, making room for currently active students.

### Implementation

Store `rep_earned_at` timestamp with every rep event. Calculate effective_rep as a materialized view or computed column, refreshed daily.

```sql
-- Materialized view refreshed daily
CREATE MATERIALIZED VIEW effective_reputation AS
SELECT 
  user_id,
  SUM(CASE 
    WHEN earned_at > NOW() - INTERVAL '6 months' THEN amount
    ELSE amount * 0.5
  END) as effective_rep,
  SUM(amount) as lifetime_rep
FROM reputation_events
GROUP BY user_id;
```

---

## Tier Features (Updated for New Thresholds)

| Feature | Bronze (0-499) | Silver (500-1,999) | Gold (2K-7,999) | Platinum (8K-24,999) | Contributor (25K+) |
|---------|---------------|-------------------|-----------------|---------------------|-------------------|
| Feed access | Yes | Yes | Yes | Yes | Yes |
| Post projects | 2 max | 5 max | 10 max | Unlimited | Unlimited |
| Links per project | 1 | 3 | 5 | Unlimited | Unlimited |
| Daily Drop submissions | 1/day | 1/day | 2/day | 3/day | Unlimited |
| Give feedback | Yes | Yes | Yes (2x weight) | Yes (3x weight) | Yes (5x weight) |
| Peer reviewer role | No | Yes | Yes | Yes | Yes |
| Mentor role | No | No | No | Yes | Yes |
| GitHub metadata | None | Basic | Full | Full + history | Full + analytics |
| OG image thumbnails | No | No | Yes | Yes | Yes |
| Talent Board visibility | Not listed | Not listed | Listed (basic) | Listed (full + badges) | Featured |
| Public portfolio URL | No | No | No | Yes | Yes + custom slug |
| Portfolio PDF export | No | No | No | Yes | Yes + branded |
| Messaging | No | No | Recruiter only | Full | Full |
| Verification badges/project | 1 type | 2 types | 3 types | All 5 types | All + priority |
| Viewer analytics | None | None | Count only | Recruiter names | Full analytics |

---

## What Makes This System Work

**You can't game it.** The biggest rep earners (badges: +200 to +500) require other humans to validate your work. You can't give yourself a Peer Reviewed badge. You can't fake a Client Rated badge. You can't buy a Recruiter Endorsed badge. The system is inherently anti-gaming because the verification layer sits between activity and reward.

**It maps to real skill growth.** A Bronze student is learning. A Silver student is participating. A Gold student has verified work. A Platinum student has a year of proven, multi-source validated output. The tier label actually means something to recruiters because each level requires increasingly external validation.

**Decay keeps it honest.** You can't coast on last year's work. The Talent Board shows currently active, currently verified students — not historical achievers. This is what recruiters want: who's good *right now*.

**The numbers are configurable.** Every threshold and rep amount is a constant in `tierSystem.ts`. If real usage data shows the curve is too steep or too flat, changing `2000` to `2500` is a one-line update. Ship these numbers, measure for 3 months, adjust.

---

## Files to Update

| File | Change |
|------|--------|
| `tierSystem.ts` | Update `TIER_THRESHOLDS` to new values, add `TIER_REP_SOURCES` constant |
| `tierPermissions.ts` | Update `getMinimumRepForTier` to match new thresholds |
| `ReputationGuide.tsx` | Update displayed rep sources and tier ranges |
| `ProgressionBar.tsx` | Update threshold references |
| `HuseCirclePlatform.tsx` | Update `getTierProgress()` function |
| `DemoCredentials.tsx` | Adjust demo user rep values to match new tiers |
| `AuthContext.tsx` | Update `calculateTier()` function |
| `studentsData.ts` | Adjust mock student rep values |

---

*Ship these numbers. Measure. Adjust in Q1 if needed. The structure is right — only the constants might change.*
