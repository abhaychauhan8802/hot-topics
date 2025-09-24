import { config as envConfig } from "dotenv";
import "dotenv/config";
import { categories } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

envConfig({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

async function seed() {
  const defaultCategories = [
    { name: "news" },
    { name: "business" },
    { name: "defence" },
    { name: "health" },
    { name: "lifestyle" },
    { name: "environment" },
    { name: "religion" },
    { name: "eduction" },
    { name: "realstate" },
  ];

  for (const cat of defaultCategories) {
    await db
      .insert(categories)
      .values({
        ...cat,
      })
      .onConflictDoNothing();
  }

  console.log("✅ Default categories seeded");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
