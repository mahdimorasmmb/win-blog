import React, { type FC, type PropsWithChildren } from "react";

const WarperForm: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-[100dvh]">
			<div className="flex-1 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center">
				<div className="w-full py-12 md:py-24 lg:py-32">
					<div className="container grid lg:grid-cols-2 gap-10 px-4 md:px-6">
						<div className="flex items-center">
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl  ">
								WINaTALENT Blog Admin
							</h1>{" "}
						</div>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WarperForm;
