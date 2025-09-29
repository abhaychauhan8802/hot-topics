import LoginForm from "@/components/admin/forms/LoginForm";
import config from "@/lib/config";
import { Flame } from "lucide-react";
import { notFound } from "next/navigation";

const Login = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const secret = (await searchParams).s;

  if (!secret) {
    return notFound();
  }

  if (secret !== config.env.adminSecret) {
    return notFound();
  }

  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center">
      <div className="text-primary flex items-center gap-1 justify-center">
        <Flame />
        <h1 className="text-2xl font-bold">HotTopicsHub</h1>
      </div>

      <LoginForm />
    </div>
  );
};

export default Login;
