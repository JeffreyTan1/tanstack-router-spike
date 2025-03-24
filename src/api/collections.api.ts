import { FAKE_API_DELAY } from "./constants";

export interface Collection {
	id: string;
	name: string;
	images: Image[];
}

export interface Image {
	id: string;
	fileName: string;
	url: string;
}

const LOCAL_STORAGE_PERSISTANCE_KEY = "collections";

const DUMMY_IMAGES: Image[] = [
	{
		id: "1",
		fileName: "Image 1",
		url: "https://picsum.photos/300/200",
	},
	{
		id: "2",
		fileName: "Image 2",
		url: "https://picsum.photos/300/200",
	},
	{
		id: "3",
		fileName: "Image 3",
		url: "https://picsum.photos/300/200",
	},
];

const DUMMY_COLLECTIONS: Collection[] = [
	{
		id: "1",
		name: "Collection 1",
		images: DUMMY_IMAGES,
	},
	{
		id: "2",
		name: "Collection 2",
		images: DUMMY_IMAGES,
	},
];

const initializeCollections = () => {
	localStorage.setItem(
		LOCAL_STORAGE_PERSISTANCE_KEY,
		JSON.stringify(DUMMY_COLLECTIONS),
	);
};

const getCollections = async () => {
	await new Promise((resolve) => setTimeout(resolve, FAKE_API_DELAY));

	if (!localStorage.getItem(LOCAL_STORAGE_PERSISTANCE_KEY)) {
		initializeCollections();
	}
	return JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_PERSISTANCE_KEY) || "[]",
	) as Collection[];
};

const getCollection = async (collectionId: string) => {
	await new Promise((resolve) => setTimeout(resolve, FAKE_API_DELAY));

	return JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_PERSISTANCE_KEY) || "[]",
	).find(
		(collection: Collection) => collection.id === collectionId,
	) as Collection;
};

export interface UpdateImage {
	imageId: string;
	delete: boolean;
}

export interface BatchUpdateCollectionRequest {
	imageUpdates: UpdateImage[];
}

const updateCollection = async (
	collectionId: string,
	batchUpdateCollection: BatchUpdateCollectionRequest,
) => {
	await new Promise((resolve) => setTimeout(resolve, FAKE_API_DELAY));

	const collections = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_PERSISTANCE_KEY) || "[]",
	);
	const collection = collections.find(
		(collection: Collection) => collection.id === collectionId,
	);
	if (!collection) {
		throw new Error("Collection not found");
	}
	collection.images = collection.images
		.map((image: Image) =>
			batchUpdateCollection.imageUpdates.find(
				(update: UpdateImage) => update.imageId === image.id,
			)
				? null
				: image,
		)
		.filter((image: Image | null) => image !== null);
	localStorage.setItem(
		LOCAL_STORAGE_PERSISTANCE_KEY,
		JSON.stringify(collections),
	);
};

export const collectionsApi = {
	getCollections,
	getCollection,
	updateCollection,
};
