import { DUMMY_JWT_TOKEN } from "./user.api";

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

const LOCAL_STORAGE_PERSISTANCE_KEY = 'collections';

const DUMMY_IMAGES: Image[] = [
    {
        id: '1',
        fileName: 'Image 1',
        url: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        fileName: 'Image 2',
        url: 'https://via.placeholder.com/150',
    },
    {
        id: '3',
        fileName: 'Image 3',
        url: 'https://via.placeholder.com/150',
    },
]

const DUMMY_COLLECTIONS: Collection[] = [
    {
        id: '1',
        name: 'Collection 1',
        images: DUMMY_IMAGES,
    },
    {
        id: '2',
        name: 'Collection 2',
        images: DUMMY_IMAGES,
    },
]

const initializeCollections = () => {
    localStorage.setItem(LOCAL_STORAGE_PERSISTANCE_KEY, JSON.stringify(DUMMY_COLLECTIONS));
}

const getCollections = async (jwtToken: string) => {
    if (jwtToken !== DUMMY_JWT_TOKEN) {
        throw new Error('Invalid JWT token');
    }
    if (!localStorage.getItem(LOCAL_STORAGE_PERSISTANCE_KEY)) {
        initializeCollections();
    }
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_PERSISTANCE_KEY) || '[]');
}

const getCollection = async (jwtToken: string, collectionId: string) => {
    if (jwtToken !== DUMMY_JWT_TOKEN) {
        throw new Error('Invalid JWT token');
    }
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_PERSISTANCE_KEY) || '[]').find((collection: Collection) => collection.id === collectionId);
}

interface UpdateImage {
    imageId: string;
    delete: boolean;
}

interface BatchUpdateCollectionRequest {
    collectionId: string;
    imageUpdates: UpdateImage[];
}

const updateCollection = async (jwtToken: string, batchUpdateCollection: BatchUpdateCollectionRequest) => {
    if (jwtToken !== DUMMY_JWT_TOKEN) {
        throw new Error('Invalid JWT token');
    }
    const collections = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PERSISTANCE_KEY) || '[]');
    const collection = collections.find((collection: Collection) => collection.id === batchUpdateCollection.collectionId);
    if (!collection) {
        throw new Error('Collection not found');
    }
    collection.images = collection.images.map((image: Image) => batchUpdateCollection.imageUpdates.find((update: UpdateImage) => update.imageId === image.id) ? null : image).filter((image: Image | null) => image !== null);
    localStorage.setItem(LOCAL_STORAGE_PERSISTANCE_KEY, JSON.stringify(collections));  
}


export const collectionsApi = {
    getCollections,
    getCollection,
    updateCollection,
}
