"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UserProfile {
  display_name: string;
  images: { url: string }[];
  followers: { total: number };
}

interface Track {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
}

interface CurrentlyPlaying {
  is_playing: boolean;
  item: Track | null;
}

export default function Dashboard() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentTrack, setCurrentTrack] = useState<CurrentlyPlaying | null>(
    null
  );
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("access_token");
    const refresh = searchParams.get("refresh_token");
    if (token && refresh) {
      setAccessToken(token);
      setRefreshToken(refresh);
      fetchUserData(token);
    }
  }, [searchParams]);

  const fetchUserData = async (token: string) => {
    try {
      await fetchUserProfile(token);
      await fetchCurrentlyPlayingTrack(token);
      await fetchRecentlyPlayedTracks(token);
    } catch (err) {
      if (err instanceof Error && err.message === "Token expired") {
        await refreshAccessToken();
      } else {
        setError("Failed to fetch user data");
        console.error(err);
      }
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (!response.ok) throw new Error("Failed to refresh token");
      const data = await response.json();
      setAccessToken(data.access_token);
      fetchUserData(data.access_token);
    } catch (err) {
      setError("Failed to refresh access token");
      console.error(err);
      router.push("/"); // Redirect to home page for re-authentication
    }
  };

  const fetchUserProfile = async (token: string) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 401) throw new Error("Token expired");
    if (!response.ok) throw new Error("Failed to fetch user profile");
    const data: UserProfile = await response.json();
    setProfile(data);
  };

  const fetchCurrentlyPlayingTrack = async (token: string) => {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 401) throw new Error("Token expired");
    if (response.status === 204) {
      setCurrentTrack({ is_playing: false, item: null });
    } else if (response.ok) {
      const data: CurrentlyPlaying = await response.json();
      setCurrentTrack(data);
    } else {
      throw new Error("Failed to fetch currently playing track");
    }
  };

  const fetchRecentlyPlayedTracks = async (token: string) => {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 401) throw new Error("Token expired");
    if (!response.ok) throw new Error("Failed to fetch recently played tracks");
    const data = await response.json();
    setRecentTracks(data.items.map((item: any) => item.track));
  };

  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!profile || currentTrack === null)
    return <div className="text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-8 lg:p-12">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome, {profile.display_name}!
        </h1>
        {profile.images[0] && (
          <img
            src={profile.images[0].url}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
        )}
        <p className="text-gray-600">Followers: {profile.followers.total}</p>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">Currently Playing</h2>
        {currentTrack.is_playing && currentTrack.item ? (
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <img
                src={currentTrack.item.album.images[0].url}
                alt="Album Cover"
                className={`w-48 h-48 rounded-full object-cover ${
                  currentTrack.is_playing ? "animate-spin-slow" : ""
                }`} // Apply spin animation conditionally
              />
            </div>
            <p className="mt-4 text-lg font-medium">
              <strong>{currentTrack.item.name}</strong> by{" "}
              {currentTrack.item.artists
                .map((artist) => artist.name)
                .join(", ")}
              <br />
              Album: {currentTrack.item.album.name}
            </p>
          </div>
        ) : (
          <p className="italic">Not currently playing any track</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recently Played Tracks</h2>
        <ul className="list-disc pl-6">
          {recentTracks.map((track, index) => (
            <li key={index} className="mb-2">
              <strong>{track.name}</strong> by{" "}
              {track.artists.map((artist) => artist.name).join(", ")}
              <br />
              Album: {track.album.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
