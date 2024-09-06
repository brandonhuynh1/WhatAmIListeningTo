"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConnectSpotify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get('phoneNumber');

  useEffect(() => {
    const connectSpotify = async () => {
      try {
        const response = await fetch('/api/auth/spotify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber }),
        });
        const data = await response.json();
        if (data.authUrl) {
          window.location.href = data.authUrl;
        } else {
          console.error('Failed to get Spotify authorization URL');
        }
      } catch (error) {
        console.error('Error connecting to Spotify:', error);
      }
    };

    if (phoneNumber) {
      connectSpotify();
    }
  }, [phoneNumber]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sm:p-8 md:p-10 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Connecting to Spotify...</h1>
        <p>Please wait while we redirect you to Spotify for authorization.</p>
      </div>
    </div>
  );
}