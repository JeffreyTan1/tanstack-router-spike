import {  useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../../../api/queryOptions";

export function Navbar() {
    const { data: user } = useSuspenseQuery(userQueryOptions)
	return (
		<div>
			<h1>Navbar</h1>
            {
                JSON.stringify(user)
            }
		</div>
	);
}