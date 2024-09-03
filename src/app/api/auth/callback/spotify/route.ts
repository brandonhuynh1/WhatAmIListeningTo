import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/callback/spotify`;

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
          redirect_uri: REDIRECT_URI,
        }),
      });

      const tokenData = await tokenResponse.json();

      // Here, you would typically save the token data and create a session
      // For this example, we'll just redirect to a success page
      return NextResponse.redirect(new URL('/login-success', request.url));
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return NextResponse.redirect(new URL('/login-error', request.url));
    }
  } else {
    return NextResponse.redirect(new URL('/login-error', request.url));
  }
}