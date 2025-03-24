import {  useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/api/queryOptions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth";

export function Navbar() {
    const { data: user } = useSuspenseQuery(userQueryOptions)
    const { logout } = useAuth()

	return (
		<Card >
            <div className="flex justify-between items-center px-4"  >

			<h1>Hi {user.name}</h1>
            <Button variant="outline" onClick={() => {
                logout()
            }}>Logout</Button>
            </div>
         
		</Card>
	);
}