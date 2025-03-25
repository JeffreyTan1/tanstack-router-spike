import {
	createFileRoute,
	Link,
} from "@tanstack/react-router";
import { collectionQueryOptions } from "@/api/queryOptions";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Grid } from "@/components/common/grid";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectableImage } from "./-components/selectableImage";
import { useCollectionStore } from "./-stores/collection.store";
import { collectionsApi } from "@/api/collections.api";
import { queryClient } from "@/queryClient";

export const Route = createFileRoute(
	"/_authed/collections/$collectionId/",
)({
	loader: async ({ context, params }) => {
		return context.queryClient.ensureQueryData(
			collectionQueryOptions(params.collectionId),
		);
	},
	component: Collection,
});

function Collection() {
	const { collectionId } = Route.useParams();

	const { data: collection } = useSuspenseQuery(
		collectionQueryOptions(collectionId),
	);
	const { selectedImageIds, selectImage, unselectImage, clearSelection } =
		useCollectionStore();
	const deleteMutation = useMutation({
		mutationFn: () => {
			return collectionsApi.updateCollection(collectionId, {
				imageUpdates: selectedImageIds.map((imageId) => ({
					imageId,
					delete: true,
				})),
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			clearSelection();
		},
	});

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
					<SelectableImage
						key={image.id}
						image={image}
						selected={selectedImageIds.includes(image.id)}
						onSelect={() => {
							if (selectedImageIds.includes(image.id)) {
								unselectImage(image.id);
							} else {
								selectImage(image.id);
							}
						}}
					/>
				))}
			</Grid>
			{selectedImageIds.length > 0 && (
				<div className="fixed bottom-4 right-4">
					<div className="flex gap-2">
						<Button
							onClick={() => {
								confirm("Are you sure you want to delete these images?") && deleteMutation.mutate();
							}}
							disabled={deleteMutation.isPending}
							variant={"destructive"}
						>
							{deleteMutation.isPending ? "Deleting..." : "Delete"}
						</Button>
						<Button variant={"outline"} onClick={clearSelection}>
							Cancel
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
