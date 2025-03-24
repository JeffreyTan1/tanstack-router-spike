import { createFileRoute, Link } from "@tanstack/react-router";
import { collectionsQueryOptions } from "@/api/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "@/components/common/grid";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/(app)/_dashboard/collections/")({
	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(collectionsQueryOptions);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { data: collections } = useSuspenseQuery(collectionsQueryOptions);
	return (
		<Grid>
			{collections.map((collection) => (
				<Card key={collection.id}>
					<CardHeader>
						<CardTitle>{collection.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between items-center gap-2">
							<p>{collection.images.length} images</p>
							<Link
								to="/collections/$collectionId"
								params={{ collectionId: collection.id }}
								className={buttonVariants({ variant: "default" })}
							>
								View <ArrowRight className="size-4" />
							</Link>
						</div>
					</CardContent>
				</Card>
			))}
		</Grid>
	);
}
