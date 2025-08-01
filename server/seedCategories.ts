import { db } from "./db.js";
import { categories } from "../shared/schema.js";

async function seedCategories() {
  const existing = await db.select().from(categories);
  if (existing.length > 0) {
    console.log("Категории уже есть в базе, пропускаем");
    return;
  }

  const defaultCategories = [
    { id: "warcraft-3", name: "Warcraft 3", slug: "warcraft-3" },
    { id: "minecraft", name: "Minecraft", slug: "minecraft" },
    { id: "books", name: "Books", slug: "books" },
    { id: "3d", name: "3D", slug: "3d" },
    { id: "other", name: "Other", slug: "other" },
  ];

  await db.insert(categories).values(defaultCategories);
  console.log("Категории добавлены!");
}

seedCategories()
  .catch(console.error)
  .finally(() => process.exit());
