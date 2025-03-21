import { queryOptions } from "@tanstack/react-query";
import { userApi } from "./user.api";
import { collectionsApi, type BatchUpdateCollectionRequest } from "./collections.api";

export const userQueryOptions = queryOptions({
    queryKey: ["user"],
    queryFn: () => userApi.getUser()
})

export const collectionsQueryOptions = queryOptions({
    queryKey: ["collections"],
    queryFn: () => collectionsApi.getCollections()
})

export const collectionQueryOptions = (collectionId: string) => queryOptions({
    queryKey: ["collections", collectionId],
    queryFn: () => collectionsApi.getCollection(collectionId)
})

export const updateCollectionQueryOptions = (collectionId: string, batchUpdateCollection: BatchUpdateCollectionRequest) => queryOptions({
    queryKey: ["collections", collectionId],
    queryFn: () => collectionsApi.updateCollection(collectionId, batchUpdateCollection)
})


