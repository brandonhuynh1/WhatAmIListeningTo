// src/app/dashboard/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentTrack, setCurrentTrack] = useState<CurrentlyPlaying | null>(
    null
  );
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFetchUserData = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      const { profile, currentTrack, recentTracks } = await fetchUserData(
        token
      );
      setProfile(profile);
      setCurrentTrack(currentTrack);
      setRecentTracks(recentTracks);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error && err.message === "Token expired") {
        await handleRefreshToken();
      } else {
        throw new Error("Failed to fetch user data");
      }
    }
  }, []);

  const handleRefreshToken = async () => {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken!);
      setAccessToken(newAccessToken);
      await handleFetchUserData(newAccessToken);
    } catch (err) {
      throw new Error("Failed to refresh access token");
    }
  };

  useEffect(() => {
    const token = searchParams.get("access_token");
    const refresh = searchParams.get("refresh_token");
    if (token && refresh) {
      setAccessToken(token);
      setRefreshToken(refresh);
      handleFetchUserData(token);
    } else {
      setIsLoading(false);
    }
  }, [searchParams, handleFetchUserData]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch(
          `/api/spotify-events?accessToken=${accessToken}`
        );
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
  }, [accessToken]);

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

// return (
//   <div className="p-6 md:p-8 lg:p-12 flex flex-col items-center">
//     <div className="text-center mb-6">
//       <h1 className="text-2xl font-bold mb-2">
//         Welcome, {profile.display_name}!
//       </h1>
//       {profile.images[0] && (
//         <img
//           src={profile.images[0].url}
//           alt="Profile"
//           className="w-24 h-24 rounded-full mx-auto object-cover"
//         />
//       )}
//       <p className="text-gray-600">Followers: {profile.followers.total}</p>
//     </div>

//     <div className="text-center mb-12 w-full max-w-2xl">
//       <h2 className="text-3xl font-semibold mb-8">Currently Playing</h2>
//       {currentTrack.is_playing && currentTrack.item ? (
//         <div className="flex flex-col items-center">
//           <div className="relative w-64 h-64 mb-8">
//             <img
//               src={currentTrack.item.album.images[0].url}
//               alt="Album Cover"
//               className={`w-64 h-64 rounded-full object-cover shadow-lg ${
//                 currentTrack.is_playing ? "animate-spin-slow" : ""
//               }`}
//             />
//           </div>
//           <p className="text-2xl font-medium mb-2">
//             <strong>{currentTrack.item.name}</strong>
//           </p>
//           <p className="text-xl text-gray-700 mb-2">
//             by{" "}
//             {currentTrack.item.artists
//               .map((artist) => artist.name)
//               .join(", ")}
//           </p>
//           <p className="text-lg text-gray-600">
//             Album: {currentTrack.item.album.name}
//           </p>
//         </div>
//       ) : (
//         <p className="italic text-xl">Not currently playing any track</p>
//       )}
//     </div>

//     <div className="w-full max-w-2xl">
//       <h2 className="text-2xl font-semibold mb-4">Recently Played Tracks</h2>
//       <ul className="list-disc pl-6">
//         {recentTracks.map((track, index) => (
//           <li key={index} className="mb-4">
//             <p className="font-medium">{track.name}</p>
//             <p className="text-sm text-gray-600">
//               by {track.artists.map((artist) => artist.name).join(", ")}
//             </p>
//             <p className="text-sm text-gray-500">Album: {track.album.name}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );
// }
