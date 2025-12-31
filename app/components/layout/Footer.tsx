export default function Footer() {
	return (
		<footer className="w-full mt-auto pt-8 pb-8 text-center border-t border-border/40">
			<p className="text-secondary text-sm">
				&copy; {new Date().getFullYear()} Salient Object Detection System.
				<br className="sm:hidden" />
				Built with <span className="text-accent">TensorFlow</span> & Next.js.
			</p>
		</footer>
	);
}
