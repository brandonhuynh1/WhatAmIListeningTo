export interface UserProfile {
  display_name: string;
  images: { url: string }[];
  followers: { total: number };
}

export interface Track {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
}

export interface CurrentlyPlaying {
  is_playing: boolean;
  item: Track | null;
}

export async function fetchUserData(token: string) {
  const [profile, currentTrack, recentTracks] = await Promise.all([
    fetchUserProfile(token),
    fetchCurrentlyPlayingTrack(token),
    fetchRecentlyPlayedTracks(token),
  ]);

  return { profile, currentTrack, recentTracks };
}

export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!response.ok) throw new Error("Failed to refresh token");
  const data = await response.json();
  return data.access_token;
}

async function fetchUserProfile(token: string): Promise<UserProfile> {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) throw new Error("Token expired");
  if (!response.ok) throw new Error("Failed to fetch user profile");
  return await response.json();
}

export async function fetchCurrentlyPlayingTrack(token: string): Promise<CurrentlyPlaying> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (response.status === 401) throw new Error("Token expired");
  if (response.status === 204) {
    return { is_playing: false, item: null };
  }
  if (!response.ok) throw new Error("Failed to fetch currently playing track");
  return await response.json();
}

async function fetchRecentlyPlayedTracks(token: string): Promise<Track[]> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=5",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (response.status === 401) throw new Error("Token expired");
  if (!response.ok) throw new Error("Failed to fetch recently played tracks");
  const data = await response.json();
  return data.items.map((item: any) => item.track);
}