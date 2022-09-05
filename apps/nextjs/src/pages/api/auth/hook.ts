import { prisma } from '@zart/api/src/createContext';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    email,
    name,
    secret,
    phone_number,
  }: { email: string; name: string; secret: string; phone_number: number } =
    req.body;
  // 1
  if (req.method !== 'POST') {
    return res.status(403).json({ message: 'Method not allowed' });
  }

  // 2
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }

  // 3
  if (email) {
    const mailAlreadyExisit = await prisma.users.findUnique({
      where: { phone_number },
    });
    if (mailAlreadyExisit)
      return res.status(200).json({
        message: `User with email: ${email} has been created successfully!`,
      });

    // 4
    await prisma.users.create({
      data: { phone_number },
    });
  }
  return res.status(200).json({
    message: `User with email: ${email} has been created successfully!`,
  });
};

export default handler;
