// DESKTOP

// import React from "react";
// import { UserProfile, CurrentlyPlaying, Track } from "@/lib/spotify";

// const SpotifyDashboard = ({
//   profile,
//   currentTrack,
//   recentTracks,
// }: {
//   profile: UserProfile;
//   currentTrack: CurrentlyPlaying;
//   recentTracks: Track[];
// }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 sm:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* User Profile Section */}
//         <div className="flex items-center mb-8 sm:mb-12">
//           {profile.images[0] && (
//             <img
//               src={profile.images[0].url}
//               alt="Profile"
//               className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mr-4 sm:mr-6 border-2 sm:border-4 border-green-500"
//             />
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">
//               {profile.display_name}
//             </h1>
//             <p className="text-sm sm:text-base text-gray-400">
//               Followers: {profile.followers.total}
//             </p>
//           </div>
//         </div>

//         {/* Currently Playing Section */}
//         <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mb-8 sm:mb-12 shadow-lg">
//           <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-green-500">
//             Now Playing
//           </h2>
//           {currentTrack.is_playing && currentTrack.item ? (
//             <div className="flex flex-col sm:flex-row items-center">
//               <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-6 sm:mb-0 sm:mr-8">
//                 <div className="absolute inset-0 bg-black rounded-full shadow-2xl"></div>
//                 <div
//                   className={`absolute inset-2 bg-cover bg-center rounded-full
//                               ${
//                                 currentTrack.is_playing
//                                   ? "animate-spin-slow"
//                                   : ""
//                               }`}
//                   style={{
//                     backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
//                   }}
//                 ></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-5 h-5 bg-black rounded-full"></div>
//                 </div>
//               </div>
//               <div className="text-center sm:text-left">
//                 <h3 className="text-xl sm:text-2xl font-bold mb-2">
//                   {currentTrack.item.name}
//                 </h3>
//                 <p className="text-lg sm:text-xl text-gray-300 mb-2">
//                   {currentTrack.item.artists
//                     .map((artist) => artist.name)
//                     .join(", ")}
//                 </p>
//                 <p className="text-sm sm:text-base text-gray-400">
//                   Album: {currentTrack.item.album.name}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-lg sm:text-xl text-gray-400 italic">
//               Not currently playing any track
//             </p>
//           )}
//         </div>

//         {/* Recently Played Tracks Section */}
//         <div>
//           <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-500">
//             Recently Played
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {recentTracks.slice(0, 4).map((track, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-800 rounded-lg p-4 flex items-center"
//               >
//                 <img
//                   src={track.album.images[0].url}
//                   alt="Album Cover"
//                   className="w-12 h-12 sm:w-16 sm:h-16 rounded mr-4"
//                 />
//                 <div>
//                   <p className="font-medium text-sm sm:text-base">
//                     {track.name}
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-400">
//                     {track.artists.map((artist) => artist.name).join(", ")}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpotifyDashboard;

//MOBILE
// import React from "react";
// import { UserProfile, CurrentlyPlaying, Track } from "@/lib/spotify";

// const SpotifyDashboard = ({
//   profile,
//   currentTrack,
//   recentTracks,
// }: {
//   profile: UserProfile;
//   currentTrack: CurrentlyPlaying;
//   recentTracks: Track[];
// }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 sm:p-8">
//       <div className="max-w-lg mx-auto">
//         {/* User Profile Section */}
//         <div className="flex flex-col sm:flex-row items-center mb-8 sm:mb-12">
//           {profile.images[0] && (
//             <img
//               src={profile.images[0].url}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6 border-2 sm:border-4 border-green-500"
//             />
//           )}
//           <div className="text-center sm:text-left">
//             <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
//               {profile.display_name}
//             </h1>
//             <p className="text-sm sm:text-base text-gray-400">
//               Followers: {profile.followers.total}
//             </p>
//           </div>
//         </div>

//         {/* Currently Playing Section */}
//         <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg text-center">
//           <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-green-500">
//             Now Playing
//           </h2>
//           {currentTrack.is_playing && currentTrack.item ? (
//             <div className="flex flex-col items-center">
//               <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-6">
//                 <div className="absolute inset-0 bg-black rounded-full shadow-2xl"></div>
//                 <div
//                   className={`absolute inset-2 bg-cover bg-center rounded-full
//                               ${
//                                 currentTrack.is_playing
//                                   ? "animate-spin-slow"
//                                   : ""
//                               }`}
//                   style={{
//                     backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
//                   }}
//                 ></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-5 h-5 bg-black rounded-full"></div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl sm:text-2xl font-bold mb-2">
//                   {currentTrack.item.name}
//                 </h3>
//                 <p className="text-lg text-gray-300 mb-2">
//                   {currentTrack.item.artists
//                     .map((artist) => artist.name)
//                     .join(", ")}
//                 </p>
//                 <p className="text-sm sm:text-base text-gray-400">
//                   Album: {currentTrack.item.album.name}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-lg sm:text-xl text-gray-400 italic">
//               Not currently playing any track
//             </p>
//           )}
//         </div>

//         {/* Recently Played Tracks Section */}
//         <div>
//           <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-500 text-center">
//             Recently Played
//           </h2>
//           <div className="grid grid-cols-1 gap-4">
//             {recentTracks.slice(0, 4).map((track, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-800 rounded-lg p-4 flex items-center"
//               >
//                 <img
//                   src={track.album.images[0].url}
//                   alt="Album Cover"
//                   className="w-16 h-16 rounded mr-4"
//                 />
//                 <div>
//                   <p className="font-medium text-sm sm:text-base">
//                     {track.name}
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-400">
//                     {track.artists.map((artist) => artist.name).join(", ")}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpotifyDashboard;

//RESPONSSIVE
// import React from "react";
// import { UserProfile, CurrentlyPlaying, Track } from "@/lib/spotify";

// const SpotifyDashboard = ({
//   profile,
//   currentTrack,
//   recentTracks,
// }: {
//   profile: UserProfile;
//   currentTrack: CurrentlyPlaying;
//   recentTracks: Track[];
// }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 sm:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* User Profile Section */}
//         <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between mb-8">
//           <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
//             {profile.images[0] && (
//               <img
//                 src={profile.images[0].url}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6 border-2 sm:border-4 border-green-500"
//               />
//             )}
//             <div className="text-center sm:text-left">
//               <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">
//                 {profile.display_name}
//               </h1>
//               <p className="text-sm sm:text-base text-gray-400">
//                 Followers: {profile.followers.total}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Currently Playing Section */}
//         <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mb-8 shadow-lg">
//           <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-green-500 text-center sm:text-left">
//             Now Playing
//           </h2>
//           {currentTrack.is_playing && currentTrack.item ? (
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center h-full">
//               <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto sm:mx-0 sm:mr-8 mb-6 sm:mb-0">
//                 <div className="absolute inset-0 bg-black rounded-full shadow-2xl"></div>
//                 <div
//                   className={`absolute inset-2 bg-cover bg-center rounded-full
//                               ${
//                                 currentTrack.is_playing
//                                   ? "animate-spin-slow"
//                                   : ""
//                               }`}
//                   style={{
//                     backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
//                   }}
//                 ></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-5 h-5 bg-black rounded-full"></div>
//                 </div>
//               </div>
//               <div className="text-center sm:text-left flex-1">
//                 <h3 className="text-xl sm:text-2xl font-bold mb-2">
//                   {currentTrack.item.name}
//                 </h3>
//                 <p className="text-lg sm:text-xl text-gray-300 mb-2">
//                   {currentTrack.item.artists
//                     .map((artist) => artist.name)
//                     .join(", ")}
//                 </p>
//                 <p className="text-sm sm:text-base text-gray-400">
//                   Album: {currentTrack.item.album.name}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-lg sm:text-xl text-gray-400 italic text-center sm:text-left">
//               Not currently playing any track
//             </p>
//           )}
//         </div>

//         {/* Recently Played Tracks Section */}
//         <div>
//           <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-500 text-center sm:text-left">
//             Recently Played
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {recentTracks.slice(0, 4).map((track, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-800 rounded-lg p-4 flex items-center"
//               >
//                 <img
//                   src={track.album.images[0].url}
//                   alt="Album Cover"
//                   className="w-16 h-16 rounded mr-4"
//                 />
//                 <div>
//                   <p className="font-medium text-sm sm:text-base">
//                     {track.name}
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-400">
//                     {track.artists.map((artist) => artist.name).join(", ")}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpotifyDashboard;

//RESPONSIVE2

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* User Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between mb-8">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            {profile.images[0] && (
              <img
                src={profile.images[0].url}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6 border-2 sm:border-4 border-green-500"
              />
            )}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">
                {profile.display_name}
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                Followers: {profile.followers.total}
              </p>
            </div>
          </div>
        </div>

        {/* Currently Playing Section */}
        <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mb-8 shadow-lg">
          <div className="max-w-4xl mx-auto px-4">
            {/* Inner container for centering content */}
            <div className="relative">
              {/* Header Section */}
              <div className="absolute top-0 left-0 right-0">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-green-500 text-left">
                  Now Playing
                </h2>
              </div>

              {/* Main Content Section */}
              <div className="pt-16">
                {" "}
                {/* Padding top to make space for the header */}
                {currentTrack.is_playing && currentTrack.item ? (
                  <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-center">
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-6 sm:mb-0 sm:mr-8">
                      <div className="absolute inset-0 bg-black rounded-full shadow-2xl"></div>
                      <div
                        className={`absolute inset-2 bg-cover bg-center rounded-full 
                          ${
                            currentTrack.is_playing ? "animate-spin-slow" : ""
                          }`}
                        style={{
                          backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 bg-black rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">
                        {currentTrack.item.name}
                      </h3>
                      <p className="text-lg sm:text-xl text-gray-300 mb-2">
                        {currentTrack.item.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                      <p className="text-sm sm:text-base text-gray-400">
                        Album: {currentTrack.item.album.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-lg sm:text-xl text-gray-400 italic text-center">
                    Not currently playing any track
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recently Played Tracks Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-green-500 text-left">
            Recently Played
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentTracks.slice(0, 4).map((track, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 flex items-center"
              >
                <img
                  src={track.album.images[0].url}
                  alt="Album Cover"
                  className="w-16 h-16 rounded mr-4"
                />
                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {track.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
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
