import React from "react";

const SpotifyDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sm:p-8 md:p-10">
      <div className="max-w-[90rem] mx-auto">
        {/* Top Row: User Profile and Now Playing Title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* User Profile Section */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mr-6 bg-gray-700 animate-pulse"></div>
            <div>
              <div className="h-8 w-48 bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Now Playing Title */}
          <div className="h-10 w-48 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Now Playing Section with Large Album Art */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center w-full">
            <div className="relative w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] mb-8 lg:mb-0 lg:mr-12">
              <div className="absolute inset-0 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            <div className="text-center lg:text-left lg:flex lg:flex-col lg:justify-center lg:h-[36rem] w-full lg:w-1/3">
              <div className="h-10 w-3/4 bg-gray-700 rounded animate-pulse mb-4 mx-auto lg:mx-0"></div>
              <div className="h-8 w-2/3 bg-gray-700 rounded animate-pulse mb-4 mx-auto lg:mx-0"></div>
              <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse mx-auto lg:mx-0"></div>
            </div>
          </div>
        </div>

        {/* Recently Played Tracks Section */}
        <div>
          <div className="h-10 w-64 bg-gray-700 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex items-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded mr-6 bg-gray-700 animate-pulse"></div>
                <div className="flex-grow">
                  <div className="h-8 w-3/4 bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyDashboardSkeleton;
