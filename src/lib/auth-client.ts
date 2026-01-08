import { createAuthClient } from "better-auth/react";

export const client = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL || undefined,
});

export const { signIn, signUp, signOut, useSession } = client;
