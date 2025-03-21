import {  useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/api/queryOptions";
import { Card } from "@/components/ui/card";

export function Navbar() {
    const { data: user } = useSuspenseQuery(userQueryOptions)
	return (
		<Card>
			<h1>Navbar</h1>
            {
                JSON.stringify(user)
            }
		</Card>
	);
}