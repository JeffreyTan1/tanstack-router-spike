import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { userQueryOptions } from "@/api/queryOptions";
import { Navbar } from "./_authed/-components/navbar";

export const Route = createFileRoute("/_authed")({
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
		return context.queryClient.ensureQueryData(userQueryOptions);
	},
	component: AppLayout,
});

function AppLayout() {
	return (
		<div className="mx-auto max-w-7xl py-4 px-2">
			<Navbar />
			<div className="p-2.5" />
			<Outlet />
		</div>
	);
}
