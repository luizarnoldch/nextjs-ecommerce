"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { InputType, ReturnType } from "./types";
import { safeCreateAction } from "@/lib/util/safe-create-action";
import { CreateUserSchema } from "./schema";

const handler = async (input: InputType): Promise<ReturnType> => {
	try {
		const result = await auth.api.signInEmail({
			body: {
				email: input.email,
				password: input.password,
				callbackURL: "/dashboard",
				rememberMe: true,
			},
			headers: await headers(),
		});

		return { data: result.user };
	} catch (e) {
		console.log(e);
		return { error: "Error during signup" };
	}
};

const safeHandler = safeCreateAction(CreateUserSchema, handler);

export async function signInAction(
	prevState: any,
	formData: FormData,
): Promise<ReturnType> {
	const data = Object.fromEntries(formData.entries()) as Record<
		"email" | "password",
		string
	>;
	const input: InputType = {
		email: data.email,
		password: data.password,
		name: undefined,

		// Optionals
		emailVerified: undefined,
		image: undefined,
		createdAt: undefined,
		updatedAt: undefined,
		id: undefined,
	};

	return safeHandler(input);
}
