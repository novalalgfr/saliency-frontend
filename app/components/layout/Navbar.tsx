import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className="w-full flex justify-between items-center pt-8 pb-6 border-b-2 border-border">
			<div className="flex items-center gap-2">
				<h1 className="text-3xl font-serif font-bold tracking-tight text-primary select-none">
					Salient<span className="text-accent italic">Vision.</span>
				</h1>
			</div>

			<div className="flex items-center gap-6">
				<Link
					href="https://github.com/novalalgfr"
					className="font-serif bg-surface border-2 border-border hover:border-accent text-primary px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
				>
					<Github size={18} />
					<span>GitHub</span>
				</Link>
			</div>
		</nav>
	);
}
