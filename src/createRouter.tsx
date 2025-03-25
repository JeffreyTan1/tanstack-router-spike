import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { ErrorMessage } from "./components/common/error-message";
import { NotFound } from "./components/common/not-found";
import { routeTree } from "./routeTree.gen";
import { Loader } from "./components/common/loader";
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
