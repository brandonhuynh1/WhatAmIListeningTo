// src/app/api/spotify-events/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { fetchCurrentlyPlayingTrack } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('accessToken');

  if (!accessToken) {
    console.error('No access token provided');
    return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
  }

  try {
    const currentTrack = await fetchCurrentlyPlayingTrack(accessToken);
    return NextResponse.json({ currentTrack }, { status: 200 });
  } catch (error) {
    console.error('Error fetching current track:', error);
    return NextResponse.json({ error: 'Failed to fetch current track' }, { status: 500 });
  }
}