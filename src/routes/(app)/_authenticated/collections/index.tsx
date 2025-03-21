import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_authenticated/collections/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/images/"!</div>;
}
