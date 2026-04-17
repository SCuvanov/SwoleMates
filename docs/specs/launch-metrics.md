# Launch Metrics and Event Instrumentation

## Objective
Define KPI metrics, event names, and dashboard requirements for the first 60 days post-launch.

## 1) KPI Definitions

### Activation
- profile completion rate
- first swipe rate
- time-to-first-swipe

### Match Health
- matches per active user
- match-to-chat-start rate
- time-to-first-message after match

### Conversation Quality
- day-1 reply rate
- day-7 reply rate
- messages per active match

### Safety Baseline
- reports per 1,000 active users
- block rate per 1,000 active users
- unresolved report backlog size

### Retention
- D1 retention
- D7 retention
- streak participation rate

## 2) Canonical Event Taxonomy

Use snake_case event names. Include `event_id`, `user_id`, `session_id`, and `client_timestamp` on all events.

### Account and Onboarding
- `signup_started`
- `verification_sent`
- `verification_completed`
- `profile_completed`
- `discovery_preferences_saved`

### Swipe and Match
- `swipe_performed`
  - properties: `action` (`like` or `pass`), `remaining_swipes`
- `swipe_limit_reached`
  - properties: `available_swipes`, `next_refill_at`
- `match_created`
  - properties: `match_id`

### Messaging
- `chat_opened`
- `message_sent`
  - properties: `match_id`, `message_length`
- `icebreaker_prompt_viewed`
- `icebreaker_prompt_used`

### Safety
- `report_submitted`
  - properties: `category`, `target_type` (`profile` or `message`)
- `block_user`
- `unmatch_performed`
- `moderation_actioned`
  - internal event only

### Retention
- `streak_incremented`
  - properties: `current_count`
- `streak_broken`
  - properties: `previous_count`

## 3) Dashboard Requirements

## Dashboard A: Activation Funnel
- signup_started -> verification_completed -> profile_completed -> swipe_performed(first)
- split by acquisition source and platform.

## Dashboard B: Matching and Messaging
- swipes, like/pass ratio, match creation rate
- match-to-chat conversion
- median time from match to first message

## Dashboard C: Safety Operations
- daily reports by category
- open backlog and trend
- actioned vs dismissed ratio

## Dashboard D: Retention and Streaks
- D1/D7 retention cohorts
- streak participation over time
- retention comparison: streak users vs non-streak users

## 4) Data Quality Rules
- Deduplicate events by `event_id`.
- Reject events older than agreed ingestion window (for example, 72 hours) for core KPI rollups.
- Enforce required properties per event type.
- Maintain event version field (`event_version`) for schema evolution.

## 5) Implementation Priorities
- Instrument activation and match/messaging events first.
- Add safety and streak events before launch hardening.
- Validate dashboards with synthetic test data before production release.
