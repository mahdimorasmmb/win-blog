export class ErrorHandler extends Error {
	public status: boolean;
	constructor(public message: string) {
		super();
		// biome-ignore lint/correctness/noConstructorReturn: <explanation>
		this.status = false;
		this.message = message;
	}
}

export const responseSeverAction = <T>(
	data?: T,
	message = "",
): { status: boolean; data: T; message: string } => {
	return {
		status: true,
		data: data as T,
		message,
	};
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const handleErrors = (error: any) => {
	if (error instanceof ErrorHandler) {
		return {
			status: error.status,
			message: error.message,
			data: null,
		};
	}

	throw error;
};
