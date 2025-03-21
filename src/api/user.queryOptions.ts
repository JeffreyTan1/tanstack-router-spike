import { queryOptions } from "@tanstack/react-query";
import { userApi } from "./user.api";

export const userQueryOptions = queryOptions({
    queryKey: ["user"],
    queryFn: () => userApi.getUser()
})
