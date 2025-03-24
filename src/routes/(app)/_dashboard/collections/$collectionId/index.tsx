import { createFileRoute } from "@tanstack/react-router";
import { collectionQueryOptions } from "@/api/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute(
	"/(app)/_dashboard/collections/$collectionId/",
)({
	loader: async ({ context, params }) => {
		return context.queryClient.ensureQueryData(
			collectionQueryOptions(params.collectionId),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { collectionId } = Route.useParams();
	const { data: collection } = useSuspenseQuery(
		collectionQueryOptions(collectionId),
	);

	return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{
			collection.images.map((image) => (
				<div key={image.id}>
					<img src={image.url} alt={image.fileName} />
				</div>
			))
		}
	</div>;
}