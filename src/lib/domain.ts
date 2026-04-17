export type UserStatus = "active" | "suspended" | "deleted";

export type VerificationMethod = "email" | "phone";

export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  verificationMethods: VerificationMethod[];
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
}

export interface DatingPreferences {
  interestedInGenders: string[];
  minAge: number;
  maxAge: number;
  maxDistanceKm: number;
}

export interface FitnessProfile {
  fitnessIdentity?: string;
  favoriteActivities?: string[];
}

export interface Profile {
  userId: string;
  displayName: string;
  age: number;
  bio?: string;
  photos: string[];
  location: {
    latitude: number;
    longitude: number;
    city?: string;
    countryCode?: string;
  };
  datingPreferences: DatingPreferences;
  fitnessProfile?: FitnessProfile;
  createdAt: string;
  updatedAt: string;
}

export type SwipeActionType = "like" | "pass";

export interface SwipeAction {
  id: string;
  viewerId: string;
  targetId: string;
  action: SwipeActionType;
  createdAt: string;
}

export type MatchStatus = "active" | "unmatched" | "blocked";

export interface Match {
  id: string;
  userAId: string;
  userBId: string;
  status: MatchStatus;
  matchedAt: string;
  lastMessageAt?: string;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  createdAt: string;
  editedAt?: string;
  isSystemPrompt: boolean;
}

export type ReportCategory =
  | "harassment"
  | "spam"
  | "fake_profile"
  | "hate_speech"
  | "nudity"
  | "other";

export type ReportStatus = "open" | "reviewing" | "actioned" | "dismissed";

export interface Report {
  id: string;
  reporterUserId: string;
  targetUserId: string;
  matchId?: string;
  messageId?: string;
  category: ReportCategory;
  details?: string;
  status: ReportStatus;
  createdAt: string;
  reviewedAt?: string;
}

export interface Block {
  id: string;
  blockerUserId: string;
  blockedUserId: string;
  createdAt: string;
}

export interface Streak {
  userId: string;
  currentCount: number;
  longestCount: number;
  lastActiveDate: string;
  updatedAt: string;
}

export interface SwipeQuota {
  userId: string;
  availableSwipes: number;
  maxSwipes: number;
  refillRatePerHour: number;
  refillIntervalMinutes: number;
  lastRefillAt: string;
  updatedAt: string;
}
