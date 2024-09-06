// src/app/api/auth/callback/spotify/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (code && state) {
    try {
      const { phoneNumber } = JSON.parse(Buffer.from(state, 'base64').toString());

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

      // Update the user with Spotify tokens
      const user = await prisma.user.update({
        where: { phoneNumber },
        data: {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Redirect to dashboard with the unique URL
      return NextResponse.redirect(new URL(`/dashboard/${user.uniqueUrl}`, request.url));
    } catch (error) {
      console.error('Error during authentication:', error);
      return NextResponse.redirect(new URL('/login?error=authentication_failed', request.url));
    }
  } else {
    return NextResponse.redirect(new URL('/login?error=no_code_or_state', request.url));
  }
}