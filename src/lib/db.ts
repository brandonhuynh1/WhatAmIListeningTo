import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(phoneNumber: string, accessToken: string, refreshToken: string) {
  const user = await prisma.user.create({
    data: {
      phoneNumber,
      accessToken,
      refreshToken,
      uniqueUrl: generateUniqueUrl(),
    },
  });
  return user;
}

export async function getUserByPhoneNumber(phoneNumber: string) {
  return prisma.user.findUnique({ where: { phoneNumber } });
}

export async function updateUserTokens(userId: string, accessToken: string, refreshToken: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { accessToken, refreshToken },
  });
}

// TODO: Implement a function to generate a unique URL
function generateUniqueUrl() {
  // Implement a function to generate a unique URL
  return `https://yourdomain.com/u/${Math.random().toString(36).substring(2, 15)}`;
}