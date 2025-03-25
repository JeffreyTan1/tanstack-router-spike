import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export function NotFound() {
	return (
		<div className="flex flex-col justify-center items-center h-full gap-4">
			<h1 className="text-2xl font-bold">Not Found</h1>
			<p>The page you are looking for does not exist.</p>

			<Button variant="outline" asChild>
				<Link to="/">Go to home</Link>
			</Button>
		</div>
	);
}
