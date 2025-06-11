"use server";

import { headers } from "next/headers";

import type { InputType, ReturnType } from "./types";
import { CreateUserSchema } from "./schema";

import { auth } from "@/lib/auth";
import { safeCreateAction } from "@/lib/util/safe-create-action";

const handler = async (input: InputType): Promise<ReturnType> => {
  try {
    const result = await auth.api.signUpEmail({
      returnHeaders: true,
      body: {
        email: input.email,
        name: input.name,
        password: input.password,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    return { data: result.response.user };
  } catch (e) {
    console.log(e);
    return { error: "Error during signup" };
  }
};

const safeHandler = safeCreateAction(CreateUserSchema, handler);

export async function signUpAction(
  prevState: ReturnType | null,
  formData: FormData
): Promise<ReturnType> {
  const input: InputType = {
    email: formData.get("email")?.toString() ?? "",
    name: formData.get("name")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",

    // Optionals
    emailVerified: undefined,
    image: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    id: undefined,
  };

  return safeHandler(input);
}
