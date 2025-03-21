import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_authenticated")({
	beforeLoad: async ({ context, location }) => {
		if (!context.auth?.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<div className="p-2">
			<div className="border-b">I'm a pathless layout</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
