import {
	createFileRoute,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { userQueryOptions } from "@/api/queryOptions";
import { Navbar } from "./-components/navbar";

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
		return context.queryClient.ensureQueryData(userQueryOptions);
	},
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<div className="mx-auto max-w-7xl py-4 px-2">
			<Navbar />
			<div className="p-4" />
			<Outlet />
		</div>
	);
}
