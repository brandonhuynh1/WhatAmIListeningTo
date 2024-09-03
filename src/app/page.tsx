"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/spotify");
      const data = await response.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        console.error("Failed to get authorization URL");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if there's an error or success message in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    const success = urlParams.get("success");

    if (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show an error message to the user)
    } else if (success) {
      console.log("Login successful");
      // Handle success (e.g., show a welcome message or redirect to a dashboard)
    }
  }, []);

  return (
    <div>
      <h1>Welcome to My Spotify App</h1>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Redirecting..." : "Login with Spotify"}
      </button>
    </div>
  );
}
