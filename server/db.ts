import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import { categories } from '../shared/schema';

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool });

async function ensureCategories() {
  const existing = await db.select().from(categories);
  if (existing.length === 0) {
    const defaultCategories = [
      { id: 'warcraft-3', name: 'Warcraft 3', slug: 'warcraft-3' },
      { id: 'minecraft', name: 'Minecraft', slug: 'minecraft' },
      { id: 'books', name: 'Books', slug: 'books' },
      { id: '3d', name: '3D', slug: '3d' },
      { id: 'other', name: 'Other', slug: 'other' },
    ];
    await db.insert(categories).values(defaultCategories);
    console.log('Categories inserted');
  }
}

ensureCategories().catch(console.error);
