import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, code } = req.body;

    try {
      const verification = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
        .verificationChecks.create({ to: phoneNumber, code });

      if (verification.status === 'approved') {
        res.status(200).json({ verified: true });
      } else {
        res.status(400).json({ verified: false, message: 'Invalid verification code' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify phone number' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}