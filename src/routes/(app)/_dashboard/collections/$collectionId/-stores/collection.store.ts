import { create } from "zustand";

interface CollectionStore {
	selectedImageIds: string[];
	selectImage: (imageId: string) => void;
	unselectImage: (imageId: string) => void;
	clearSelection: () => void;
}

const EMPTY_IMAGE_IDS: string[] = [];

export const useCollectionStore = create<CollectionStore>((set) => ({
	selectedImageIds: EMPTY_IMAGE_IDS,
	selectImage: (imageId: string) =>
		set((state) => ({
			selectedImageIds: [...state.selectedImageIds, imageId],
		})),
	unselectImage: (imageId: string) =>
		set((state) => ({
			selectedImageIds: state.selectedImageIds.filter((id) => id !== imageId),
		})),
	clearSelection: () => set({ selectedImageIds: EMPTY_IMAGE_IDS }),
}));
