"use server";

import { SignupSchema, type TypeSignup } from "@/schema/signup";
import { db } from "../db";
import bcrypt from "bcryptjs";
import { ErrorHandler, handleErrors, responseSeverAction } from "@/lib/handle-error";

const signup = async (formData: TypeSignup) => {
	try {
		console.log("redner");

	const pasrData = SignupSchema.safeParse(formData);

	if (!pasrData.success) throw new ErrorHandler('alredy')
		
	const { email, password, username } = pasrData.data;
	const isFindUser = await db.user.findFirst({
		where: {
			OR: [
				{
					email,
				},
				{
					username,
				},
			],
		},
	});



	if (isFindUser) {
		throw new ErrorHandler("User already exists");
	}

	const hashedPassword =  bcrypt.hashSync(password, 10);

	const user = await db.user.create({
		data: {
			email,
			password:hashedPassword,
			username,
		},
	});
	return  responseSeverAction(user,'user Created ')
	} catch (error) {
		return handleErrors(error);
	}
};

export default signup;
