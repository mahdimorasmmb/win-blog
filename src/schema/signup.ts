import { z } from "zod";

export const email = z
	.string()
	.email()
	.transform((str) => str.toLowerCase().trim());

export const password = z
	.string()
	.min(8)
	.max(100)
	.transform((str) => str.trim());

export const username = z.string().min(3).max(10);

export const SignupSchema = z.object({
	email,
	password,
	username,
});

export const SigninSchema = z.object({
	email,
	password,
});

export type TypeSignin = z.infer<typeof SigninSchema>;

export type TypeSignup = z.infer<typeof SignupSchema>;
