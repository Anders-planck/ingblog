import prisma from '@/lib/prisma';

describe('Prisma', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('connects to the database', async () => {
    const users = await prisma.users.findMany();
    expect(users).toBeDefined();
  });
});
