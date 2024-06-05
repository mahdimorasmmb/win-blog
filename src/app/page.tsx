import { auth, signOut } from "@/auth";
import Image from "next/image";

export default async function Home() {
	const session = await auth();
	console.log(session?.user.image);

	return (
		<main className="">
			{JSON.stringify(session?.user)}
			<form
				action={async () => {
					"use server";
					await signOut({redirectTo:'/'});
				}}
			>
				<button type="submit">sign</button>
			</form>
		</main>
	);
}
