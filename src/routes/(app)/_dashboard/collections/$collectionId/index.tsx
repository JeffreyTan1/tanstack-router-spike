import { createFileRoute, Link } from "@tanstack/react-router";
import { collectionQueryOptions } from "@/api/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Grid } from "@/components/common/grid";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
		<>
			<div>
				<Button variant={"ghost"} asChild>
					<Link to="/collections">
						<ArrowLeft /> Back
					</Link>
				</Button>
				<h1 className="text-2xl font-bold">{collection.name}</h1>
			</div>

			<div className="p-2.5" />

			<Grid>
				{collection.images.map((image) => (
					<div
						key={image.id}
						className="h-64 border rounded-md overflow-hidden"
					>
						<img
							src={image.url}
							alt={image.fileName}
							className="w-full h-full"
						/>
					</div>
				))}
			</Grid>
		</>
	);
}
