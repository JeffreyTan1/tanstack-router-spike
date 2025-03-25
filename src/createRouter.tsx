import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { ErrorMessage } from "./components/common/ErrorMessage";
import { NotFound } from "./components/common/NotFound";
import { routeTree } from "./routeTree.gen";
import { Loader } from "./components/common/Loader";
import type { QueryClient } from "@tanstack/react-query";

export const createRouter = (queryClient: QueryClient) => {
	return createTanstackRouter({
		routeTree,
		context: {
			auth: undefined!,
			queryClient,
		},
		defaultPreload: "intent",
		scrollRestoration: true,
		defaultStructuralSharing: true,
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: (errorComponentProps) => {
			return <ErrorMessage errorComponentProps={errorComponentProps} />;
		},
		defaultPendingComponent: () => {
			return <Loader />;
		},
		defaultNotFoundComponent: () => {
			return <NotFound />;
		},
	});
};
