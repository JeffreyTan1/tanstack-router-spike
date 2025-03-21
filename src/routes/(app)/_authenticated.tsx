import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_authenticated")({
	beforeLoad: async ({ context }) => {
		if (!context.auth?.isAuthenticated) {
			redirect({ to: "/login" });
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
