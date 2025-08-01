import { storage } from "./path/to/storage"; // поправь путь, где у тебя storage.ts

async function addCustomCategories() {
  const existingCategories = await storage.getCategories();
  const existingSlugs = existingCategories.map(cat => cat.slug);

  const categories = [
    { slug: "minecraft", name: "Minecraft" },
    { slug: "warcraft-3", name: "Warcraft 3" },
    { slug: "3d-models", name: "3D Models" },
    { slug: "concept-art", name: "Concept Art" },
    { slug: "reference", name: "Reference" },
    { slug: "miscellaneous", name: "Miscellaneous" },
  ];

  for (const category of categories) {
    if (!existingSlugs.includes(category.slug)) {
      await storage.createCategory(category);
      console.log(`Category created: ${category.name}`);
    } else {
      console.log(`Category already exists: ${category.name}`);
    }
  }

  console.log("All categories processed");
}

addCustomCategories()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
