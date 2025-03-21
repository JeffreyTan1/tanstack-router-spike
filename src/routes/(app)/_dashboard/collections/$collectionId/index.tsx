import { createFileRoute } from "@tanstack/react-router";
import { collectionQueryOptions } from "../../../../../api/collections.queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute(
	"/(app)/_dashboard/collections/$collectionId/",
)({
	loader: async ({context, params}) => {
		return context.queryClient.ensureQueryData(collectionQueryOptions(params.collectionId))
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { collectionId } = Route.useParams()
	const { data: collection } = useSuspenseQuery(collectionQueryOptions(collectionId))

	return <div>{JSON.stringify(collection)}</div>;
}
