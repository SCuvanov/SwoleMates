"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Block, Match, Message, Report, ReportCategory, SwipeAction, SwipeQuota } from "@/lib/domain";
import { currentUserProfile, discoveryPool, likedYou, prompts } from "@/lib/mock-data";

const CURRENT_USER_ID = "me";

function haversineKm(
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number },
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const lat = toRad(b.latitude - a.latitude);
  const lon = toRad(b.longitude - a.longitude);
  const x =
    Math.sin(lat / 2) ** 2 +
    Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * Math.sin(lon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function getRefilledQuota(quota: SwipeQuota): SwipeQuota {
  const now = new Date();
  const last = new Date(quota.lastRefillAt);
  const minutes = Math.floor((now.getTime() - last.getTime()) / 60000);
  if (minutes < quota.refillIntervalMinutes || quota.availableSwipes >= quota.maxSwipes) {
    return quota;
  }
  const refillPerInterval = Math.max(
    1,
    Math.floor((quota.refillRatePerHour / 60) * quota.refillIntervalMinutes),
  );
  const intervals = Math.floor(minutes / quota.refillIntervalMinutes);
  const availableSwipes = Math.min(quota.maxSwipes, quota.availableSwipes + intervals * refillPerInterval);
  return {
    ...quota,
    availableSwipes,
    lastRefillAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}

function buildMatchId(a: string, b: string): string {
  return `match_${[a, b].sort().join("_")}`;
}

export default function DiscoverPage() {
  const [swipes, setSwipes] = useState<SwipeAction[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [draft, setDraft] = useState("");
  const [quota, setQuota] = useState<SwipeQuota>({
    userId: CURRENT_USER_ID,
    availableSwipes: 20,
    maxSwipes: 80,
    refillRatePerHour: 10,
    refillIntervalMinutes: 6,
    lastRefillAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const blockedIds = useMemo(() => new Set(blocks.map((block) => block.blockedUserId)), [blocks]);
  const swipedIds = useMemo(() => new Set(swipes.map((swipe) => swipe.targetId)), [swipes]);

  const filteredDeck = useMemo(() => {
    const { minAge, maxAge, maxDistanceKm } = currentUserProfile.datingPreferences;
    return discoveryPool.filter((profile) => {
      if (blockedIds.has(profile.userId) || swipedIds.has(profile.userId)) {
        return false;
      }
      if (profile.age < minAge || profile.age > maxAge) {
        return false;
      }
      return haversineKm(currentUserProfile.location, profile.location) <= maxDistanceKm;
    });
  }, [blockedIds, swipedIds]);

  const card = filteredDeck[0];
  const selectedMatch = matches.find((item) => item.id === selectedMatchId) ?? null;
  const selectedMessages = selectedMatch ? messages[selectedMatch.id] ?? [] : [];

  const swipe = (action: "like" | "pass") => {
    if (!card) {
      return;
    }
    const nextQuota = getRefilledQuota(quota);
    if (nextQuota.availableSwipes <= 0) {
      setQuota(nextQuota);
      return;
    }
    setQuota({
      ...nextQuota,
      availableSwipes: nextQuota.availableSwipes - 1,
      updatedAt: new Date().toISOString(),
    });

    setSwipes((prev) => [
      ...prev,
      {
        id: `swipe_${Date.now()}`,
        viewerId: CURRENT_USER_ID,
        targetId: card.userId,
        action,
        createdAt: new Date().toISOString(),
      },
    ]);

    if (action === "like" && likedYou.has(card.userId)) {
      const matchId = buildMatchId(CURRENT_USER_ID, card.userId);
      const newMatch: Match = {
        id: matchId,
        userAId: CURRENT_USER_ID,
        userBId: card.userId,
        status: "active",
        matchedAt: new Date().toISOString(),
      };
      setMatches((prev) => (prev.some((m) => m.id === matchId) ? prev : [newMatch, ...prev]));
      setMessages((prev) => ({
        ...prev,
        [matchId]: prev[matchId] ?? [
          {
            id: `msg_${Date.now()}`,
            matchId,
            senderId: card.userId,
            content: `We matched. ${prompts[0]}`,
            createdAt: new Date().toISOString(),
            isSystemPrompt: true,
          },
        ],
      }));
      setSelectedMatchId(matchId);
    }
  };

  const submitReport = (targetUserId: string, category: ReportCategory) => {
    setReports((prev) => [
      {
        id: `report_${Date.now()}`,
        reporterUserId: CURRENT_USER_ID,
        targetUserId,
        category,
        status: "open",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const blockUser = (targetUserId: string) => {
    if (blockedIds.has(targetUserId)) {
      return;
    }
    setBlocks((prev) => [
      {
        id: `block_${Date.now()}`,
        blockerUserId: CURRENT_USER_ID,
        blockedUserId: targetUserId,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setMatches((prev) =>
      prev.map((match) =>
        [match.userAId, match.userBId].includes(targetUserId)
          ? { ...match, status: "blocked" }
          : match,
      ),
    );
    setSelectedMatchId(null);
  };

  const unmatch = () => {
    if (!selectedMatch) {
      return;
    }
    setMatches((prev) => prev.filter((match) => match.id !== selectedMatch.id));
    setSelectedMatchId(null);
  };

  const sendMessage = () => {
    if (!selectedMatch || !draft.trim()) {
      return;
    }
    setMessages((prev) => ({
      ...prev,
      [selectedMatch.id]: [
        ...(prev[selectedMatch.id] ?? []),
        {
          id: `msg_${Date.now()}`,
          matchId: selectedMatch.id,
          senderId: CURRENT_USER_ID,
          content: draft.trim(),
          createdAt: new Date().toISOString(),
          isSystemPrompt: false,
        },
      ],
    }));
    setDraft("");
  };

  return (
    <main className="px-4 py-8 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <h1 className="text-2xl font-bold">Discover</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Using filters from User Settings: ages {currentUserProfile.datingPreferences.minAge}-
            {currentUserProfile.datingPreferences.maxAge},{" "}
            {currentUserProfile.datingPreferences.maxDistanceKm}km radius.
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Swipes left: <span className="text-emerald-300">{quota.availableSwipes}</span>
          </p>
          {card ? (
            <article className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
              <Image src={card.photos[0]} alt={card.displayName} width={900} height={600} className="h-72 w-full object-cover" />
              <div className="space-y-3 p-4">
                <h2 className="text-2xl font-semibold">
                  {card.displayName}, {card.age}
                </h2>
                <p className="text-sm text-zinc-300">{card.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {(card.fitnessProfile?.favoriteActivities ?? []).map((activity) => (
                    <span key={activity} className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                      {activity}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full border border-rose-500/60 px-5 py-2 text-sm hover:bg-rose-500/10" onClick={() => swipe("pass")}>
                    Pass
                  </button>
                  <button className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-300" onClick={() => swipe("like")}>
                    Like
                  </button>
                  <button className="rounded-full border border-zinc-700 px-5 py-2 text-sm hover:bg-zinc-800" onClick={() => submitReport(card.userId, "fake_profile")}>
                    Report
                  </button>
                  <button className="rounded-full border border-zinc-700 px-5 py-2 text-sm hover:bg-zinc-800" onClick={() => blockUser(card.userId)}>
                    Block
                  </button>
                </div>
              </div>
            </article>
          ) : (
            <p className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
              Deck complete. Update preferences in User Settings for more results.
            </p>
          )}
        </section>

        <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <h2 className="text-xl font-semibold">Matches and Chat</h2>
          <div className="space-y-2">
            {matches.length === 0 ? (
              <p className="text-sm text-zinc-400">No matches yet.</p>
            ) : (
              matches.map((match) => {
                const otherId = match.userAId === CURRENT_USER_ID ? match.userBId : match.userAId;
                const other = discoveryPool.find((p) => p.userId === otherId);
                if (!other) {
                  return null;
                }
                return (
                  <button
                    key={match.id}
                    className={`w-full rounded-lg border px-3 py-2 text-left ${
                      selectedMatchId === match.id ? "border-emerald-400 bg-emerald-500/10" : "border-zinc-700 bg-zinc-900"
                    }`}
                    onClick={() => setSelectedMatchId(match.id)}
                  >
                    <p className="font-medium">{other.displayName}</p>
                    <p className="text-xs text-zinc-400">{other.fitnessProfile?.fitnessIdentity}</p>
                  </button>
                );
              })
            )}
          </div>

          {selectedMatch ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                <button className="rounded-full border border-zinc-700 px-3 py-1 text-xs hover:bg-zinc-800" onClick={unmatch}>
                  Unmatch
                </button>
                <button
                  className="rounded-full border border-zinc-700 px-3 py-1 text-xs hover:bg-zinc-800"
                  onClick={() => submitReport(selectedMatch.userBId, "harassment")}
                >
                  Report
                </button>
                <button
                  className="rounded-full border border-zinc-700 px-3 py-1 text-xs hover:bg-zinc-800"
                  onClick={() => blockUser(selectedMatch.userBId)}
                >
                  Block
                </button>
              </div>
              <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-2">
                {selectedMessages.map((message) => (
                  <p
                    key={message.id}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.senderId === CURRENT_USER_ID ? "ml-auto max-w-[90%] bg-emerald-500/20" : "mr-auto max-w-[90%] bg-zinc-800"
                    }`}
                  >
                    {message.content}
                  </p>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button key={prompt} className="rounded-full border border-zinc-700 px-3 py-1 text-xs hover:bg-zinc-800" onClick={() => setDraft(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Send message"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                />
                <button className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          ) : null}

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm">
            <p className="font-medium text-zinc-200">Open reports in this session</p>
            <p className="text-zinc-400">{reports.length}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
