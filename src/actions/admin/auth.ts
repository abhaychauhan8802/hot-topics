"use server";

import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/db/drizzle";
import { admins } from "@/db/schema";
import config from "@/lib/config";
import { eq } from "drizzle-orm";

const JWT_SECRET = config.env.jwtSecret;

export async function adminLogin(email: string, password: string) {
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password required",
    };
  }

  try {
    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);

    if (!admin) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const isValid = await compare(password, admin.password);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set HttpOnly cookie
    (await cookies()).set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return { success: true, message: "Login successful" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Login failed",
    };
  }
}
