// src/app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export async function POST(request: NextRequest) {
  const { refresh_token } = await request.json();

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      redirect_uri: REDIRECT_URI!,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 400 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}