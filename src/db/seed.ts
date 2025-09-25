import { config as envConfig } from "dotenv";
import "dotenv/config";
import { admins, categories, posts } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { dummyText, seedCategories, seedPosts } from "@/constants/seedData";

envConfig({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

function randomImage() {
  return `https://picsum.photos/600/400?random=${Math.floor(
    Math.random() * 1000
  )}`;
}

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function seed() {
  for (const cat of seedCategories) {
    const existing = await db
      .select()
      .from(categories)
      .where(eq(categories.name, cat.name));

    if (existing.length === 0) {
      await db.insert(categories).values(cat);
    }
  }

  const allCats = await db.select().from(categories);
  const catMap = Object.fromEntries(allCats.map((c) => [c.name, c.id]));

  const [admin] = await db.select().from(admins).limit(1);
  if (!admin) throw new Error("No admin found");

  for (const post of seedPosts) {
    const slug = makeSlug(post.title);
    const existing = await db.select().from(posts).where(eq(posts.slug, slug));

    if (existing.length === 0) {
      await db.insert(posts).values({
        slug,
        title: post.title,
        content: post.content + dummyText,
        imageUrl: randomImage(),
        categoryId: catMap[post.category],
        authorId: admin.id,
      });
    }
  }

  console.log("Database seeded");
}

seed();
