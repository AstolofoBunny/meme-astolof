import { prisma } from './db';
import { categories } from '../shared/constants';

async function main() {
  const existing = await prisma.category.findFirst();
  if (existing) {
    return;
  }

  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
  });

  console.log('Seeded categories.');
}

main().catch((err) => {
  console.error(err.stack || err);
  process.exit(1);
});
