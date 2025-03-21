import { queryOptions } from "@tanstack/react-query";
import { collectionsApi } from "./collections.api";

export const collectionsQueryOptions = queryOptions({
    queryKey: ["collections"],
    queryFn: () => collectionsApi.getCollections()
})

export const collectionQueryOptions = (collectionId: string) => queryOptions({
    queryKey: ["collections", collectionId],
    queryFn: () => collectionsApi.getCollection(collectionId)
})

