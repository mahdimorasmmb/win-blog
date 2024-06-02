import Image from "next/image";
import logoSrc from "@/asset/win-log.png";
import Link from "next/link";
import type { FC } from "react";
import { cn } from "@/lib/utils";

const Logo: FC<{ className?: string }> = ({ className }) => {
	return (
		<Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
			<Image
				className={cn("w-32  md:w-52", className)}
				src={logoSrc}
				width={200}
				height={100}
				alt="logo"
			/>
		</Link>
	);
};

export default Logo;
