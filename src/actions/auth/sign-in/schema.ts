import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import { user } from "@/db/schemas/auth";
import { z } from "zod/v4";

const passwordSchema = z
	.string()
	.min(2, { message: "Password must be at least 8 characters" });
// .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
// .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
// .regex(/[0-9]/, { message: "Must contain at least one number" })
// .regex(/[^A-Za-z0-9]/, {
//   message: "Must contain at least one special character",
// });

const emailSchema = z
	.email()
	.min(5, { message: "El email debe tener al menos 5 caracteres" });

const nameSchema = z
	.string()
	.min(2, { message: "El nombre debe tener al menos 2 caracteres" })
	.max(50, { message: "El nombre no puede superar los 50 caracteres" })
	.regex(/^[A-Za-z\s]+$/, {
		message: "El nombre sólo puede contener letras y espacios",
	});

export const SelectUserSchema = createSelectSchema(user).partial({
	emailVerified: true,
	image: true,
	name: true,
	createdAt: true,
	updatedAt: true,
	id: true,
});

export const CreateUserSchema = createInsertSchema(user).extend({
	id: z.string().optional(),
	password: passwordSchema,
	email: emailSchema,
	name: z.string().optional(),
});

export const UpdateUserSchema = createUpdateSchema(user);
