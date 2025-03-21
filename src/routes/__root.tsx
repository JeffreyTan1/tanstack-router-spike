import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type AuthContext } from "../auth";

interface RootContext {
	auth: AuthContext;
}

export const Route = createRootRouteWithContext<RootContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
