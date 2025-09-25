import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const topCategories = await db
    .select({ name: categories.name })
    .from(categories)
    .orderBy(asc(categories.name))
    .limit(8);

  return (
    <>
      <Navbar categories={topCategories} />
      <main className="max-w-6xl mx-auto w-full px-4">
        <div className="pb-10">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
