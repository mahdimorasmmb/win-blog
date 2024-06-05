"use client";
import React from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import GoogleButton from "./google-button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SigninSchema, type TypeSignin } from "@/schema/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { signinAction } from "@/server/actions/signin";
import { useRouter } from "next/navigation";

const SigninForm = () => {
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationFn: signinAction,
		mutationKey: ["signup"],
		onSuccess: (data) => {
			console.log(data);

			// if (!data.status) {
			// 	toast({
			// 		variant: "destructive",
			// 		description: <>{data.message}</>,
			// 	});
			// 	return;
			// }
			// toast({
			// 	description: <>{data.message}</>,
			// });
			router.push("/");

			// if (data.status) {
			// 	toast({
			// 		description: <>{data.message}</>,
			// 	});
			// 	router.push("/signin");
			// } else {
			// 	toast({
			// 		variant: "destructive",
			// 		description: <>{data.message}</>,
			// 	});
			// }
		},
		onMutate(variables) {
			console.log("redner");
		},
	});

	const form = useForm<TypeSignin>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(SigninSchema),
	});

	// console.log(form.control);

	const onSubmit = (data: TypeSignin) => {
		mutate(data);
	};
	return (
		<div className="flex flex-col gap-5">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Your Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="m@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Your Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="jdoe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} type="submit" className="w-full">
						Sign In
					</Button>
				</form>
			</Form>

			<GoogleButton />
			<p className="text-gray-600">
				Dont Have an account?
				<Button asChild variant={"link"}>
					<Link href={"/signup"}>Sign up</Link>
				</Button>
			</p>
		</div>
	);
};

export default SigninForm;
