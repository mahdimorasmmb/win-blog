"use client";

import React from "react";

import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SignupSchema, type TypeSignup } from "@/schema/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import signup from "@/server/actions/signup";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import GoogleButton from "./google-button";
import Link from "next/link";

const SignupForm = () => {
	const router = useRouter();
	const form = useForm<TypeSignup>({
		defaultValues: {
			email: "",
			username: "",
			password: "",
		},
		resolver: zodResolver(SignupSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: signup,
		mutationKey: ["signup"],
		onSuccess: (data) => {
			if (data.status) {
				toast({
					description: <>{data.message}</>,
				});
				router.push("/signin");
			} else {
				toast({
					variant: "destructive",
					description: <>{data.message}</>,
				});
			}
		},
		// onMutate(variables) {
		// 	console.log("redner");
		// },
	});
	const onSubmit = (data: TypeSignup) => {
		mutate(data);
	};
	return (
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
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your Username</FormLabel>
							<FormControl>
								<Input placeholder="jdoe" {...field} />
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
					Create an account
				</Button>
				<GoogleButton />
				<p className="text-gray-600">
					Have an account?
					<Button asChild variant={"link"}>
						<Link href={"/signin"}>Sign in</Link>
					</Button>
				</p>
			</form>
		</Form>
	);
};

export default SignupForm;
