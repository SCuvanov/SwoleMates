# Safety and Moderation Specification

## MVP Safety Controls
The MVP must support:
- report user or message
- block user
- unmatch user

Moderation is user-report-driven with a best-effort response target.

## 1) Report UX

### Entry Points
- Profile card/menu
- Chat thread menu
- Individual message long-press or overflow menu

### Report Form Fields
- category (required)
  - harassment
  - spam
  - fake profile
  - hate speech
  - nudity
  - other
- optional free-text notes
- optional message context attachment when report originates from chat

### User Confirmation
- show "Report submitted" confirmation
- explain that team will review
- provide immediate option to block as follow-up

## 2) Block UX

### Behavior
- blocked user can no longer:
  - view blocker profile
  - appear in blocker swipe deck
  - message blocker
- existing match status transitions to `blocked`
- chat thread becomes inaccessible to blocker immediately

### UX Requirements
- block action requires a confirmation modal
- unblock is available from settings/manage blocked users (optional for MVP UI, required in admin or account tools)

## 3) Unmatch UX

### Behavior
- unmatch ends the match relationship but does not create a block
- both users lose access to chat history in normal UX
- users should not reappear immediately; can re-enter discovery only after configurable cooldown (default 30 days)

### UX Requirements
- action is confirm-before-destructive
- show clear irreversible warning in MVP

## 4) Internal Moderation Queue

### Queue Inputs
- user reports with metadata:
  - reporter user ID
  - target user ID
  - category
  - optional message ID and match ID
  - timestamps

### Queue Workflow States
- `open`
- `reviewing`
- `actioned`
- `dismissed`

### Moderator Actions
- no action
- warning note (internal)
- suspend account
- permanently disable account

### Auditability
- every moderation action stores:
  - moderator ID
  - action type
  - rationale
  - timestamp

## 5) Operational Policy (MVP)
- SLA: best-effort (no strict response window commitment).
- Prioritize severe categories (hate speech, harassment, explicit sexual content) first.
- Maintain immutable logs for legal/compliance readiness.
- Keep internal tooling access-restricted by role.

## 6) Abuse and Risk Considerations
- Add report submission rate limits to reduce spam reporting abuse.
- Detect repetitive malicious reports from same account for moderator visibility.
- Prevent blocked user resurfacing by enforcing blocklist checks in both query and write paths.
