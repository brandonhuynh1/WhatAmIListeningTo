// src/app/api/auth/callback/spotify/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (code) {
    try {
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI!,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const tokenData = await tokenResponse.json();

      // Redirect to dashboard with both access and refresh tokens
      return NextResponse.redirect(new URL(`/dashboard?access_token=${tokenData.access_token}&refresh_token=${tokenData.refresh_token}`, request.url));
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return NextResponse.redirect(new URL('/login?error=token_exchange_failed', request.url));
    }
  } else {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }
}