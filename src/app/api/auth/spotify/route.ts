// src/app/api/auth/spotify/route.ts
import { NextResponse, NextRequest } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const SCOPE = 'user-read-private user-read-email user-read-recently-played user-read-currently-playing';

export async function POST(request: NextRequest) {
  const { phoneNumber } = await request.json();
  const state = Buffer.from(JSON.stringify({ phoneNumber })).toString('base64');

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI!)}&scope=${encodeURIComponent(SCOPE)}&state=${state}`;
  
  return NextResponse.json({ authUrl });
}