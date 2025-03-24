import { createFileRoute } from "@tanstack/react-router";
import { collectionQueryOptions } from "@/api/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Grid } from "@/components/common/grid";

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

	return (
		<Grid>
			{collection.images.map((image) => (
				<div
					key={image.id}
					className="h-64 border-4 rounded-lg overflow-hidden"
				>
					<img src={image.url} alt={image.fileName} className="w-full h-full" />
				</div>
			))}
		</Grid>
	);
}
