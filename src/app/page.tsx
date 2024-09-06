"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectSpotify = () => {
    setIsLoading(true);
    router.push('/phone-verification');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sm:p-8 md:p-10 flex items-center justify-center">
      <div className="max-w-[90rem] mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-green-500">
          What Am I Listening To?
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-300">
          Share what you're listening to with your friends.
        </h2>

        <p className="text-xl sm:text-2xl text-gray-400 mb-12">
          Connect your Spotify account to get started.
        </p>

        <button
          onClick={handleConnectSpotify}
          disabled={isLoading}
          className="relative bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300"
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            "Connect Spotify"
          )}
        </button>
      </div>
    </div>
  );
}
