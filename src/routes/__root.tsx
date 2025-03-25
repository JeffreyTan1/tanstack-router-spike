import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type AuthContext } from "@/contexts/AuthContext";
import type { QueryClient } from "@tanstack/react-query";

interface RootContext {
	auth: AuthContext;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
	component: () => {
		return (
			<>
				<Outlet />
				<TanStackRouterDevtools />
			</>
		);
	},
});
