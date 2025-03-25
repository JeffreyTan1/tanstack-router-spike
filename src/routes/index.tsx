import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="flex flex-col justify-center items-center h-screen gap-4">
			<p>This is the landing page of the app.</p>
			<p>This app is all about collections of images.</p>
			<Button asChild>
				<Link
					to="/collections"
				>
					Get Started with Collections
				</Link>
			</Button>
			
		</div>
	);
}
