"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/spotify");
      const data = await response.json();

      if (data.authUrl) {
        router.push(data.authUrl);
      } else {
        console.error("Failed to get authorization URL");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
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
          Log in with Spotify to start using the app.
        </p>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`py-3 px-8 rounded-full font-semibold text-lg sm:text-xl transition-colors ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-6 w-6 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Connecting to Spotify...
            </span>
          ) : (
            "Login with Spotify"
          )}
        </button>
      </div>
    </div>
  );
}
