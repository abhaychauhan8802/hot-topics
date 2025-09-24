import { getSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (session) {
    redirect("/admin");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
