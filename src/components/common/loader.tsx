import { Loader2 } from "lucide-react";

export function Loader() {
	return (
		<div className="flex justify-center items-center h-full">
			<Loader2 className="size-4 animate-spin" />
		</div>
	);
}
