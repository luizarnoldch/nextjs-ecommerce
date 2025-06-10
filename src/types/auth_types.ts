import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { account, session, user, verification } from "@/db/auth";

// Better Auth Tables:
//  1. auth_user
//  2. auth_account
//  3. auth_verification
//  4. auth_session
const userSchema = createSelectSchema(user);
const accountSchema = createSelectSchema(account);
const verificationSchema = createSelectSchema(verification);
const sessionSchema = createSelectSchema(session);

const userInsertSchema = createInsertSchema(user);
const accountInsertSchema = createInsertSchema(account);
const verificationInsertSchema = createInsertSchema(verification);
const sessionInsertSchema = createInsertSchema(session);

const userUpdateSchema = createUpdateSchema(user);
const accountUpdateSchema = createUpdateSchema(account);
const verificationUpdateSchema = createUpdateSchema(verification);
const sessionUpdateSchema = createUpdateSchema(session);
