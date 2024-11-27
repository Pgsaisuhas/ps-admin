import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useLocation } from 'react-router-dom';

function ModeToggleWrapper() {
	const location = useLocation();
	const isDetailedPage = location.pathname.startsWith('/detailed');

	return (
		<div className={`absolute top-5 left-5 ${isDetailedPage ? 'hidden' : ''}`}>
			<ModeToggle disabled={isDetailedPage} />
		</div>
	);
}

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{["light", "dark", "system"].map((theme) => (
					<DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
						{theme.charAt(0).toUpperCase() + theme.slice(1)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { ModeToggleWrapper };
