// /components/SpotifyDashboard.tsx
import React from "react";
import { UserProfile, CurrentlyPlaying, Track } from "@/lib/spotify";

const SpotifyDashboard = ({
  profile,
  currentTrack,
  recentTracks,
}: {
  profile: UserProfile;
  currentTrack: CurrentlyPlaying;
  recentTracks: Track[];
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sm:p-8 md:p-10">
      <div className="max-w-[90rem] mx-auto">
        {/* Top Row: User Profile and Now Playing Title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* User Profile Section */}
          <div className="flex items-center mb-4 md:mb-0">
            {profile.images[0] && (
              <img
                src={profile.images[0].url}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mr-6 border-4 border-green-500"
              />
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {profile.display_name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-400">
                Followers: {profile.followers.total}
              </p>
            </div>
          </div>

          {/* Now Playing Title */}

          <h2 className="text-3xl sm:text-4xl font-semibold text-green-500">
            Now Playing
          </h2>
        </div>

        {/* Now Playing Section with Large Album Art */}
        <div className="mb-12">
          {currentTrack.is_playing && currentTrack.item ? (
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center w-full">
              <div className="relative w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] mb-8 lg:mb-0 lg:mr-12">
                <div className="absolute inset-0 bg-black rounded-full shadow-2xl"></div>
                <div
                  className={`absolute inset-2 bg-cover bg-center rounded-full ${
                    currentTrack.is_playing ? "animate-spin-slow" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="text-center lg:text-left lg:flex lg:flex-col lg:justify-center lg:h-[36rem]">
                <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                  {currentTrack.item.name}
                </h3>
                <p className="text-xl sm:text-2xl text-gray-300 mb-4">
                  {currentTrack.item.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                </p>
                <p className="text-lg sm:text-xl text-gray-400">
                  Album: {currentTrack.item.album.name}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xl sm:text-2xl text-gray-400 italic text-center">
              Not currently playing any track
            </p>
          )}
        </div>

        {/* Recently Played Tracks Section */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-green-500">
            Recently Played
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentTracks.slice(0, 4).map((track, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex items-center"
              >
                <img
                  src={track.album.images[0].url}
                  alt="Album Cover"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded mr-6"
                />
                <div className="overflow-hidden flex-grow">
                  <p className="font-bold text-2xl sm:text-3xl truncate mb-2">
                    {track.name}
                  </p>
                  <p className="text-lg sm:text-xl text-gray-300 truncate">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyDashboard;
