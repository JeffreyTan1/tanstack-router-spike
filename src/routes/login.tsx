import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
	validateSearch: z.object({
		redirect: z.string().optional().catch(""),
	}),
	beforeLoad: async ({ context, search }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: search.redirect || "/collections" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { login } = useAuth();

	const handleLogin = async () => {
		await login();
		window.location.reload();
	};
	return (
		<div className="flex flex-col justify-center items-center h-screen gap-4">
			<p className="max-w-sm text-center">
				You have been navigated here as you attempted to access a protected
				route.
			</p>
			<Button onClick={handleLogin}>Login</Button>
		</div>
	);
}
