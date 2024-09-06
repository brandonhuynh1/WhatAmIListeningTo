// src/app/dashboard/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  UserProfile,
  CurrentlyPlaying,
  Track,
  fetchUserData,
  refreshAccessToken,
} from "@/lib/spotify";
import SpotifyDashboard from "@/components/SpotifyDashboard";
import SpotifyDashboardSkeleton from "@/components/SpotifyDashboardSkeleton";

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentTrack, setCurrentTrack] = useState<CurrentlyPlaying | null>(null);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { uniqueUrl } = useParams();

  const handleFetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/${uniqueUrl}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();

      const { profile, currentTrack, recentTracks } = await fetchUserData(userData.accessToken);
      setProfile(profile);
      setCurrentTrack(currentTrack);
      setRecentTracks(recentTracks);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setIsLoading(false);
    }
  }, [uniqueUrl]);

  useEffect(() => {
    handleFetchUserData();
  }, [handleFetchUserData]);

  useEffect(() => {
    if (!profile) return;

    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch(`/api/spotify-events/${uniqueUrl}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.currentTrack) {
          setCurrentTrack(data.currentTrack);
        }
      } catch (error) {
        console.error("Error fetching current track:", error);
      }
    };

    fetchCurrentTrack();
    const intervalId = setInterval(fetchCurrentTrack, 5000);

    return () => clearInterval(intervalId);
  }, [profile, uniqueUrl]);

  if (isLoading) return <SpotifyDashboardSkeleton />;
  if (!profile || currentTrack === null) return <SpotifyDashboardSkeleton />;

  return (
    <SpotifyDashboard
      profile={profile}
      currentTrack={currentTrack}
      recentTracks={recentTracks}
    />
  );
}
