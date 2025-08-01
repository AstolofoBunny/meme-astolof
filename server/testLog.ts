import { db } from "./db";
import { categories } from "../shared/schema";

async function test() {
  try {
    const cats = await db.select().from(categories);
    console.log("Categories count:", cats.length);
  } catch (e) {
    console.error("Error in test:", e);
  } finally {
    process.exit();
  }
}

test();
