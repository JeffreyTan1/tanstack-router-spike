import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "../ui/button";

interface ErrorMessageProps {
	errorComponentProps: ErrorComponentProps;
}

export function ErrorMessage({ errorComponentProps }: ErrorMessageProps) {
	const { error, reset } = errorComponentProps;
	return (
		<div className="border-destructive border rounded-md p-4 flex flex-col gap-2">
			<h1 className="text-destructive font-bold">Error</h1>
			<p>
				<b>Message:</b> {error.message}
			</p>
			<p>
				<b>Stack:</b> {error.stack}
			</p>
			<Button onClick={reset}>Attempt to reset</Button>
		</div>
	);
}
