import { db } from "./db";
import { categories } from "../shared/schema";

async function seedCategories() {
  try {
    const existing = await db.select().from(categories);

    if (existing.length > 0) {
      console.log("Categories already exist, skipping");
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
    console.log("Categories added");
  } catch (error) {
    console.error("Error seeding categories:");
    console.error(error);
  } finally {
    process.exit();
  }
}

seedCategories();
