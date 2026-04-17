"use client";

import { useState } from "react";
import { currentUserProfile } from "@/lib/mock-data";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState(currentUserProfile.displayName);
  const [bio, setBio] = useState(currentUserProfile.bio ?? "");
  const [minAge, setMinAge] = useState(currentUserProfile.datingPreferences.minAge);
  const [maxAge, setMaxAge] = useState(currentUserProfile.datingPreferences.maxAge);
  const [distance, setDistance] = useState(currentUserProfile.datingPreferences.maxDistanceKm);
  const [goal, setGoal] = useState(currentUserProfile.fitnessProfile?.fitnessIdentity ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <main className="px-4 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h1 className="text-2xl font-bold">User Settings</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Profile details and discovery filters are compartmentalized here.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h2 className="text-lg font-semibold text-emerald-300">Profile</h2>
          <div className="mt-4 grid gap-4">
            <label className="text-sm">
              <span className="text-zinc-300">Display name</span>
              <input
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
            </label>
            <label className="text-sm">
              <span className="text-zinc-300">Bio</span>
              <textarea
                className="mt-1 h-24 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </label>
            <label className="text-sm">
              <span className="text-zinc-300">Fitness identity</span>
              <input
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h2 className="text-lg font-semibold text-emerald-300">Discovery Filters</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="text-zinc-300">Minimum age</span>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                value={minAge}
                onChange={(event) => setMinAge(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              <span className="text-zinc-300">Maximum age</span>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                value={maxAge}
                onChange={(event) => setMaxAge(Number(event.target.value))}
              />
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span className="text-zinc-300">Distance ({distance}km)</span>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={distance}
              onChange={(event) => setDistance(Number(event.target.value))}
              className="mt-2 w-full accent-emerald-400"
            />
          </label>
          <button
            className="mt-5 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-300"
            onClick={() => setSaved(true)}
          >
            Save Settings
          </button>
          {saved ? <p className="mt-2 text-sm text-emerald-300">Settings saved for this prototype session.</p> : null}
        </section>
      </div>
    </main>
  );
}
