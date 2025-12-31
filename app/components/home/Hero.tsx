export default function Hero() {
	return (
		<div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-in relative z-10">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-accent/20 blur-[80px] -z-10" />

			<h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-primary tracking-tight mb-4">
				Visual Attention <span className="text-accent italic">Generation</span>
			</h2>

			<p className="font-sans text-secondary text-sm sm:text-base max-w-xl mx-auto">
				Deteksi objek fokus utama menggunakan arsitektur U-Net Deep Learning.
			</p>
		</div>
	);
}
