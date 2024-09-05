"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  UserProfile,
  CurrentlyPlaying,
  Track,
  fetchUserData,
  refreshAccessToken,
} from "@/lib/spotify";

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
      handleFetchUserData(token);
    }
  }, [searchParams]);

  const handleFetchUserData = async (token: string) => {
    try {
      const { profile, currentTrack, recentTracks } = await fetchUserData(
        token
      );
      setProfile(profile);
      setCurrentTrack(currentTrack);
      setRecentTracks(recentTracks);
    } catch (err) {
      if (err instanceof Error && err.message === "Token expired") {
        await handleRefreshToken();
      } else {
        setError("Failed to fetch user data");
        console.error(err);
      }
    }
  };

  const handleRefreshToken = async () => {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken!);
      setAccessToken(newAccessToken);
      await handleFetchUserData(newAccessToken);
    } catch (err) {
      setError("Failed to refresh access token");
      console.error(err);
      router.push("/"); // Redirect to home page for re-authentication
    }
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
                }`}
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
