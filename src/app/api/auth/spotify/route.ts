// src/app/api/auth/spotify/route.ts
import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const SCOPE = 'user-read-private user-read-email user-read-recently-played user-read-currently-playing'; // Add more scopes as needed

export async function GET() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI!)}&scope=${encodeURIComponent(SCOPE)}`;
  
  return NextResponse.json({ authUrl });
}