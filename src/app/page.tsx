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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
          What Am I Listening To?
        </h1>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Share what you're listening to with your friends.
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Log in with Spotify to start using the app.
        </p>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v7l3 3m-3-3a8 8 0 11-8 8 8 8 0 018-8z"
                />
              </svg>
              Redirecting...
            </span>
          ) : (
            "Login with Spotify"
          )}
        </button>
      </div>
    </div>
  );
}
