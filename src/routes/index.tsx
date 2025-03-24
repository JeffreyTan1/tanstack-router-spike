import { createFileRoute , Link} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="text-center">
			<Link to="/collections">Collections</Link>
		</div>
	);
}
