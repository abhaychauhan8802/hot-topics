"use client";

import { adminLogin } from "@/actions/admin/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email && !formData.password) {
      toast.error("Email and password required");
    }

    try {
      setLoading(true);
      const result = await adminLogin(formData.email, formData.password);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center">
      <div className="text-primary flex items-center gap-1 justify-center">
        <Flame />
        <h1 className="text-2xl font-bold">HotTopicsHub</h1>
      </div>

      <Card className="w-full max-w-sm max-sm:shadow-none max-sm:border-0 max-sm:bg-background">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  className="input"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <button
            type="submit"
            className="btn-primary w-full"
            onClick={handleLogin}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" size={16} /> Loading...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
