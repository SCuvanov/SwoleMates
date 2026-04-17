# Swipe Limits and Retention Rules

## MVP Rule Goals
- avoid swipe abuse
- maintain a healthy discovery pace
- add lightweight retention through streaks

## 1) Soft Swipe Limit (Rolling Cooldown)

### Baseline Policy
- Each user has a swipe quota bucket.
- Example launch defaults (configurable):
  - `maxSwipes`: 80
  - `refillRatePerHour`: 10
  - `refillIntervalMinutes`: 6 (1 swipe)
- Swipes consume quota for both `like` and `pass`.

### Refill Logic
- Quota replenishes continuously based on elapsed time since `lastRefillAt`.
- Bucket never exceeds `maxSwipes`.
- On every swipe request:
  1. recompute available swipes from elapsed refill
  2. reject with cooldown response if available is 0
  3. decrement and persist atomically if available > 0

### User Experience
- Show remaining swipes in deck UI.
- If exhausted, show cooldown message:
  - next swipe availability countdown
  - recommendation to return later
- No paywall messaging in MVP.

### Edge Cases
- **Clock drift:** use server time for authoritative refill math.
- **Duplicate swipe requests:** use idempotency key per gesture event.
- **Offline mode:** queue swipes and enforce quota when syncing; reject overflowed queued actions.

## 2) Streak Rules

### Definition of Daily Activity
A day counts as active if user does at least one of:
- performs at least 1 swipe
- sends at least 1 message to a match

### Streak Update Policy
- Evaluate streak on first qualifying activity each UTC day.
- If activity occurs on consecutive day, increment `currentCount`.
- If one or more full days are missed, reset `currentCount` to 1.
- Update `longestCount` whenever `currentCount` exceeds it.

### UX Behavior
- Show compact streak badge in user profile/home.
- Optional celebratory micro-animation when streak increments.
- No gamified rewards in MVP.

### Edge Cases
- **Timezone consistency:** compute using UTC for deterministic backend behavior.
- **Backfill events:** do not retroactively alter past streak days unless event timestamp is trusted and within same-day ingest tolerance.
- **Spam activity:** cap streak event contribution to one qualifying update per user per day.

## 3) Configuration and Experimentation
- Keep all thresholds as server-side config:
  - max swipes
  - refill rate
  - refill interval
  - streak qualifying actions
- Add feature flag to disable streaks without deploy if needed.

## 4) Monitoring
- Track:
  - average swipes per DAU
  - percentage of users hitting limit
  - cooldown recovery return rate
  - streak adoption rate
  - streak day-7 retention lift vs non-streak users
