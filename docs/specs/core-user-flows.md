# Core User Flows Specification

## Scope
This document defines MVP user journeys for:
- signup and onboarding
- swipe and match
- match chat

The flows follow the product decisions in the approved plan: low-friction onboarding, Tinder-like matching, and optional fitness prompts.

## 1) Signup and Onboarding

### Happy Path
1. User opens app and taps `Create account`.
2. User provides email or phone number.
3. System sends verification code/link.
4. User verifies account.
5. User adds required profile fields:
   - display name
   - age
   - at least 2 photos
   - short bio
6. User sets discovery preferences:
   - age range
   - distance radius
7. User lands on swipe deck.

### Guardrails and Validation
- Must be 18+ to proceed.
- Age range must be valid (`minAge <= maxAge`).
- Distance must be within accepted bounds (for example, 1-160 km).
- Photo upload failures should preserve in-progress profile fields.

### Edge Cases
- **Verification timeout:** user can request resend with rate limiting.
- **Interrupted onboarding:** partial state is saved and restored on return.
- **No location permission:** user gets a fallback manual location input prompt.
- **Image moderation unavailable:** allow upload and queue for later review, but retain user-block/report safety controls.

## 2) Swipe and Match Flow

### Happy Path
1. User opens swipe deck.
2. System fetches candidate profile cards based on:
   - distance and age filters
   - blocklist exclusions
   - previously swiped exclusions
3. User swipes right (`like`) or left (`pass`).
4. System records the action in `SwipeAction`.
5. If both users liked each other:
   - create `Match`
   - show match celebration screen
   - offer quick transition to chat

### Edge Cases
- **Deck exhausted:** show empty state and suggest widening age/distance.
- **Offline swipe:** cache locally and retry sync; prevent duplicate writes via idempotency key.
- **Blocked user appears due to stale cache:** immediately hide card and discard action.
- **Target account deleted/suspended mid-session:** card is removed and not replaced from that user.

## 3) Match Chat Flow

### Happy Path
1. User opens Matches list and selects a match.
2. Chat thread loads with chronological messages.
3. User can send unlimited messages.
4. System can suggest optional fitness icebreakers (for example, "What is your favorite workout split?").
5. Match remains active unless either party unmatches or blocks.

### Edge Cases
- **First message delay:** no expiration logic in MVP; thread remains open.
- **Message send failure:** optimistic UI can retry and mark failure state.
- **Unmatch during open chat:** thread closes and becomes inaccessible to both users.
- **Block during open chat:** block action also ends conversation access.

## Error States and UX Requirements
- All network failures show user-friendly toast/banner with retry affordance.
- Safety actions (`Report`, `Block`, `Unmatch`) should remain available even during degraded network states and queue if needed.
- Session expiration should return user to login without data corruption.

## Engineering Notes
- Keep flow logic server-authoritative for match creation and safety actions.
- Use event tracking in every major step (signup start/completion, swipe, match, message send).
- Ensure all actions carry request IDs for support/debugging traceability.
