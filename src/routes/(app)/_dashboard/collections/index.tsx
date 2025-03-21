import { createFileRoute } from "@tanstack/react-router";
import { collectionsQueryOptions } from "@/api/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/(app)/_dashboard/collections/")({
	loader: async ({context}) => {
		return context.queryClient.ensureQueryData(collectionsQueryOptions)
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { data: collections } = useSuspenseQuery(collectionsQueryOptions)
	return <div>{JSON.stringify(collections)}</div>;
}
