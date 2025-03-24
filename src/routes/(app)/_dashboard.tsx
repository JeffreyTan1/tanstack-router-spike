import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { userQueryOptions } from "@/api/queryOptions";
import { Navbar } from "./-components/Navbar";

export const Route = createFileRoute("/(app)/_dashboard")({
	beforeLoad: async ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(userQueryOptions)
	},
	pendingComponent: () => {
		return <div>Loading...</div>;
	},
	component: LayoutComponent,
	errorComponent: () => {
		return <div>Error</div>;
	},
});

function LayoutComponent() {
	return (
		<div className="mx-auto max-w-7xl py-4 px-2">
			<Navbar />
			<Outlet />
		</div>
	);
}
