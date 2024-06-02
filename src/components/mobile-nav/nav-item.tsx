"use client";

import React, { type FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SheetTrigger } from "../ui/sheet";

const NavItem: FC<{ label: string; href: string }> = ({ href, label }) => {
    const pathname = usePathname()
    const isActive = pathname === href
    
	return (
		<Button
			className={cn('border-b rounded-none  flex-1 border-gray-800',isActive ? 'bg-gray-700 text-gray-100':'')}
			key={label}
			variant={"ghost"}
			asChild
		>
			<Link href={href} className="" prefetch={false}>
				<SheetTrigger>
                {label}
                </SheetTrigger>
			</Link>
		</Button>
	);
};

export default NavItem;
