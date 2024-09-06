import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import twilio from 'twilio';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function formatPhoneNumber(phoneNumber: string): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  if (digitsOnly.length === 10) {
    return `+1${digitsOnly}`;
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+${digitsOnly}`;
  } else {
    throw new Error('Invalid phone number format');
  }
}

export async function POST(request: NextRequest) {
  const { phoneNumber, verificationCode } = await request.json();

  try {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    // Verify the phone number
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to: formattedPhoneNumber, code: verificationCode });

    if (verification.status !== 'approved') {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // Check if a user with this phone number already exists
    let user = await prisma.user.findUnique({
      where: { phoneNumber: formattedPhoneNumber },
    });

    if (!user) {
      // If user doesn't exist, create a new one
      user = await prisma.user.create({
        data: {
          phoneNumber: formattedPhoneNumber,
          uniqueUrl: nanoid(10),
        },
      });
    }

    return NextResponse.json({ success: true, uniqueUrl: user.uniqueUrl }, { status: 200 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}