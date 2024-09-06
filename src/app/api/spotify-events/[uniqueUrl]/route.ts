import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { fetchCurrentlyPlayingTrack } from '@/lib/spotify';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { uniqueUrl: string } }) {
  const { uniqueUrl } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { uniqueUrl },
      select: { accessToken: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentTrack = await fetchCurrentlyPlayingTrack(user.accessToken);
    return NextResponse.json({ currentTrack }, { status: 200 });
  } catch (error) {
    console.error('Error fetching current track:', error);
    return NextResponse.json({ error: 'Failed to fetch current track' }, { status: 500 });
  }
}