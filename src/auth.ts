import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./server/db";
import Credentials from "next-auth/providers/credentials";
import { SigninSchema } from "./schema/signup";
import { ErrorHandler, handleErrors } from "./lib/handle-error";
import bcrypt from "bcryptjs";

import type { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google"

interface TypeUser {
	id: string;
	username: string;
	email: string;
	password: string;
	isAdmin: boolean;
	profilePicture: string;
	createdAt: string;
	updatedAt: string;
	sub: string;
	iat: number;
	exp: number;
	jti: number;
}

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: TypeUser & DefaultSession["user"];
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
	providers: [
		Credentials({
			async authorize(credentials, request) {
				try {
					const pasrData = SigninSchema.safeParse(credentials);
					if (!pasrData.success) throw new ErrorHandler(pasrData.error.message);

					const validUser = await db.user.findFirst({
						where: {
							email: pasrData.data.email,
						},
					});

					if (!validUser) throw new ErrorHandler("user not found");

					const validPassword = bcrypt.compareSync(
						pasrData.data.password,
						validUser.password,
					);
					if (!validPassword) throw new ErrorHandler("password is incorrect");

					// const token = jwt.sign(
					//     { id: validUser.id },
					//     process.env.JWT_SECRET as string,
					// );

					// cookiesStore.set("access_token", token, {
					//     httpOnly: true,
					// });

					const { password, ...userWithoutPassword } = validUser;

					return validUser as unknown as TypeUser;
				} catch (error) {
					return null;
				}
			},
		}),
    Google({

    })
	],
	callbacks: {
		async jwt({ token, user }) {
			if (token) {
				return {
					...token,
					...user,
				};
			}
			return token;
		},
		async session({ session, token }) {
			// Add user data to the session

			return {
				...session,
				user: {
					...session.user,
					...token,
				},
			};
		},
		// async signIn({ user, account, profile, credentials, email }) {
		//   return true;
		// },
	},
});
