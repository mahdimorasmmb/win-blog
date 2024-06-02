/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Dhw9NySLEOf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon, MountainIcon, SearchIcon, SunMoonIcon } from "lucide-react";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import SearchBar from "./search-bar";
import NavList from "./mobile-nav/nav-list";

const listLink = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/about",
		label: "About",
	},
	{
		href: "/projects",
		label: "Projects",
	},
];

export default function Header() {
	return (
		<header className="w-full bg-white dark:bg-gray-950 shadow-sm">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
				<div className="flex items-center gap-4">
					<Logo />
					<SearchBar className="hidden md:block" />
				</div>

				<div className="flex items-center gap-7">
					<nav className="hidden md:flex items-center gap-8">
						{listLink.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
								prefetch={false}
							>
								{item.label}
							</Link>
						))}
					</nav>
					<div className="flex items-center gap-2">
						<Button className="hidden sm:inline-flex">Sign In</Button>
						<Button variant="ghost" size="icon" className="rounded-full">
							<SunMoonIcon className="h-5 w-5" />
							<span className="sr-only">Toggle dark mode</span>
						</Button>
					</div>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="lg:hidden">
								<SearchIcon />
							</Button>
						</SheetTrigger>
						<SheetContent side="left">
							<div className="flex h-full justify-center flex-col gap-4 p-4">
								<SearchBar />
							</div>
						</SheetContent>
					</Sheet>
					<NavList list={listLink} />
				</div>
			</div>
		</header>
	);
}
