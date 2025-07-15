import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Viloyatlar
  const regions = [
    'Toshkent',
    'Toshkent viloyati',
    'Andijon',
    'Fargʻona',
    'Namangan',
    'Samarqand',
    'Buxoro',
    'Xorazm',
    'Surxondaryo',
    'Qashqadaryo',
    'Navoiy',
    'Sirdaryo',
    'Jizzax',
    'Qoraqalpogʻiston'
  ];

  for (const name of regions) {
    await prisma.region.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Regions seeded');

  // 2. Super Admin foydalanuvchi
  const email = 'fayzilloummatov22@gmail.com';
  const password = '12345678';
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Super Admin',
      email,
      password: hashedPassword,
      role: Role.super_admin,
    },
  });

  console.log('✅ Super admin foydalanuvchi yaratildi');
}

main()
  .catch((e) => {
    console.error('❌ Seeder error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
