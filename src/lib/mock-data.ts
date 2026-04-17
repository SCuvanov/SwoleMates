import type { Profile } from "@/lib/domain";

const NOW = new Date().toISOString();

export const currentUserProfile: Profile = {
  userId: "me",
  displayName: "You",
  age: 28,
  bio: "Mixed-level lifter looking for consistency and a good sense of humor.",
  photos: [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  ],
  location: { latitude: 40.7128, longitude: -74.006, city: "New York" },
  datingPreferences: {
    interestedInGenders: ["women"],
    minAge: 24,
    maxAge: 34,
    maxDistanceKm: 40,
  },
  fitnessProfile: {
    fitnessIdentity: "Balanced training + cardio",
    favoriteActivities: ["Lifting", "Run club"],
  },
  createdAt: NOW,
  updatedAt: NOW,
};

export const discoveryPool: Profile[] = [
  {
    userId: "u_aria",
    displayName: "Aria",
    age: 27,
    bio: "Pilates instructor who loves morning lifts and acai bowls.",
    photos: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    ],
    location: { latitude: 40.7306, longitude: -73.9352, city: "Brooklyn" },
    datingPreferences: {
      interestedInGenders: ["men"],
      minAge: 25,
      maxAge: 35,
      maxDistanceKm: 35,
    },
    fitnessProfile: {
      fitnessIdentity: "Pilates + strength",
      favoriteActivities: ["Pilates", "Strength"],
    },
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    userId: "u_nina",
    displayName: "Nina",
    age: 31,
    bio: "Runner and new powerlifting fan. Sundays are long-run days.",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    ],
    location: { latitude: 40.65, longitude: -73.949, city: "Brooklyn" },
    datingPreferences: {
      interestedInGenders: ["men"],
      minAge: 27,
      maxAge: 38,
      maxDistanceKm: 50,
    },
    fitnessProfile: {
      fitnessIdentity: "Endurance + strength",
      favoriteActivities: ["Running", "Lower body day"],
    },
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    userId: "u_maya",
    displayName: "Maya",
    age: 24,
    bio: "Beginner lifter, yoga regular, and smoothie experimenter.",
    photos: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    ],
    location: { latitude: 40.758, longitude: -73.9855, city: "Manhattan" },
    datingPreferences: {
      interestedInGenders: ["men"],
      minAge: 22,
      maxAge: 30,
      maxDistanceKm: 20,
    },
    fitnessProfile: {
      fitnessIdentity: "Yoga + beginner strength",
      favoriteActivities: ["Yoga", "Leg day"],
    },
    createdAt: NOW,
    updatedAt: NOW,
  },
];

export const likedYou = new Set(["u_aria"]);

export const prompts = [
  "What is your go-to workout split right now?",
  "Morning training or evening sessions?",
  "Pick one first date: lift together, hike, or smoothie run?",
];
