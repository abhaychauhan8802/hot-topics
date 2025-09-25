"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import config from "@/lib/config";

const JWT_SECRET = config.env.jwtSecret;

export async function getSession() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) return null;

    const { id, email, name } = decoded as Record<string, string>;

    return {
      id,
      email,
      name,
    };
  } catch {
    return null;
  }
}

export const logout = async () => {
  try {
    (await cookies()).delete("token");
  } catch {
    return null;
  }
};
