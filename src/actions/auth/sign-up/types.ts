import { z } from "zod/v4";
import { ActionState } from "@/lib/util/safe-create-action";
import { CreateUserSchema, SelectUserSchema } from "./schema";

// Make sure CreateUserSchema is a Zod schema, not a Drizzle schema.
// If it's not, import the correct Zod schema here.
export type InputType = z.infer<typeof CreateUserSchema>;

export type UserType = Omit<z.infer<typeof SelectUserSchema>, "image"> & {
  image: string | null | undefined;
};

export type ReturnType = ActionState<InputType, UserType>;
