import type { Metadata, Viewport } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair',
	weight: ['400', '700'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: {
		template: '%s | SalientVision',
		default: 'SalientVision - Visual Attention Heatmap Generator'
	},
	description: 'Penerapan Arsitektur U-Net untuk Salient Object Detection dan Pembangkitan Visual Attention Heatmap.',
	keywords: ['Deep Learning', 'U-Net', 'Saliency Detection', 'Computer Vision', 'Skripsi', 'Heatmap'],
	authors: [{ name: 'Ahmad Noval Algifari', url: 'https://github.com/novalalgfr' }],
	creator: 'Ahmad Noval Algifari',
	openGraph: {
		title: 'SalientVision - AI Attention Heatmap',
		description: 'Generate visual attention heatmaps using Deep Learning.',
		url: 'https://your-deployment-url.com',
		siteName: 'SalientVision',
		locale: 'id_ID',
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'SalientVision',
		description: 'AI-Powered Visual Attention Analysis'
	}
};

export const viewport: Viewport = {
	themeColor: '#262624'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${playfair.variable} font-serif bg-background text-primary antialiased selection:bg-accent selection:text-background`}
			>
				<div className="mx-auto min-h-screen max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col">{children}</div>
			</body>
		</html>
	);
}
