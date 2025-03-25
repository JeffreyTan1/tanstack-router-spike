import type { Image } from "@/api/collections.api";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface SelectableImageProps {
	image: Image;
	selected: boolean;
	onSelect: () => void;
}

export function SelectableImage({
	image,
	selected,
	onSelect,
}: SelectableImageProps) {
	return (
		<div
			onClick={onSelect}
			className={cn(
				"h-64 border rounded-md overflow-hidden relative",
				selected ? "border-blue-500" : "",
			)}
		>
			<div
				className={cn(
					"absolute inset-0 p-4",
					selected ? "bg-blue-500/10" : "opacity-0",
				)}
			>
				<Checkbox checked={selected} onCheckedChange={onSelect} />
			</div>
			<img src={image.url} alt={image.fileName} className="w-full h-full" />
		</div>
	);
}
