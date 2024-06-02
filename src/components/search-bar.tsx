import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const SearchBar: FC<{ className?: string }> = ({ className }) => {
	return (
		<form className={cn(" h- flex  items-center flex-col gap-4 relative  max-w-md", className)}>
			<SearchIcon className="absolute hidden md:block left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
			<Input
				type="search"
				placeholder="Search..."
				className=" pl-9 pr-4 h-9 w-full rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:focus:ring-gray-300"
			/>
			<Button variant={'secondary'} size={'sm'} className="md:hidden w-44 gap-4"><SearchIcon size={20}/> Serach</Button>
		</form>
	);
};

export default SearchBar;
