import Sidebar from "@/components/admin/Sidebar";
import { getSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="w-full sm:w-[calc(100%-200px)] lg:w-[calc(100%-250px)] sm:ml-[200px] lg:ml-[250px] min-h-screen px-6 py-10 max-sm:mt-6">
        <div className="max-w-4xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
