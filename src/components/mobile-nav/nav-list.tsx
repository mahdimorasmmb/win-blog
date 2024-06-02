import React, { type FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import Logo from "../logo";
import NavItem from "./nav-item";

const NavList: FC<{
	list: {
		label: string;
		href: string;
	}[];
}> = ({ list }) => {


	return (
		<Sheet  >
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="lg:hidden">
					<MenuIcon className="h-6 w-6" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="px-0" side="left">
				<div className="flex h-full flex-col items-center  gap-5 py-4">
					<Logo />
					<nav className="  grid  w-full">
						{list.map((item) => (
							<NavItem key={item.label} href={item.href} label={item.label} />
						))}
					</nav>

					<div className="flex  w-full items-center">
						<Button className=" flex-1 mx-4">Sign In</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default NavList;
