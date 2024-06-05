"use server";

import {
	ErrorHandler,
	handleErrors,
	responseSeverAction,
} from "@/lib/handle-error";
import { SigninSchema, type TypeSignin } from "@/schema/signup";
import { db } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { signIn } from "@/auth";

export const signinAction = async (formData: TypeSignin) => {
 const user =  await	signIn("credentials", {
		email: formData.email,
		password: formData.password,
		redirect: false,
	});
    console.log(user);
    
	// try {
	// 	const cookiesStore = cookies();
	// 	const pasrData = SigninSchema.safeParse(formData);
	// 	if (!pasrData.success) throw new ErrorHandler(pasrData.error.message);

	// 	const validUser = await db.user.findFirst({
	// 		where: {
	// 			email: pasrData.data.email,
	// 		},
	// 	});

	// 	if (!validUser) throw new ErrorHandler("user not found");

	// 	const validPassword = bcrypt.compareSync(
	// 		pasrData.data.password,
	// 		validUser.password,
	// 	);
	// 	if (!validPassword) throw new ErrorHandler("password is incorrect");

	// 	const token = jwt.sign(
	// 		{ id: validUser.id },
	// 		process.env.JWT_SECRET as string,
	// 	);

	// 	cookiesStore.set("access_token", token, {
	// 		httpOnly: true,
	// 	});

	// 	const { password, ...userWithoutPassword } = validUser;

	// 	return responseSeverAction(userWithoutPassword, "Signin Successful");
	// } catch (error) {
	// 	return handleErrors(error);
	// }
};
