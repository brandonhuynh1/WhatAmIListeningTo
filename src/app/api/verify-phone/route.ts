import { NextResponse, NextRequest } from 'next/server';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Ensure the number starts with the country code (assuming US, +1)
  if (digitsOnly.length === 10) {
    return `+1${digitsOnly}`;
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+${digitsOnly}`;
  } else {
    throw new Error('Invalid phone number format');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({ to: formattedPhoneNumber, channel: 'sms' });

    return NextResponse.json({ success: true, status: verification.status });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500 });
  }
}