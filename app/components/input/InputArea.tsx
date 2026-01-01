'use client';

import { useState, useCallback, useRef } from 'react';
import {
	Camera,
	Upload,
	Image as ImageIcon,
	RefreshCw,
	CheckCircle2,
	AlertCircle,
	X,
	Layers,
	Eye,
	Scan
} from 'lucide-react';
import { useDropzone, FileRejection } from 'react-dropzone';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';

type InputMode = 'file' | 'camera';
type ViewMode = 'original' | 'mask' | 'heatmap';

const dataURLtoFile = (dataurl: string, filename: string) => {
	const arr = dataurl.split(',');
	const match = arr[0].match(/:(.*?);/);
	const mime = match ? match[1] : 'image/jpeg';
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
};

export default function InputArea() {
	const [mode, setMode] = useState<InputMode>('file');
	const [image, setImage] = useState<string | null>(null);
	const [fileToUpload, setFileToUpload] = useState<File | null>(null);
	const [maskImage, setMaskImage] = useState<string | null>(null);
	const [heatmapImage, setHeatmapImage] = useState<string | null>(null);

	const [isProcessing, setIsProcessing] = useState(false);
	const [result, setResult] = useState<boolean>(false);
	const [activeView, setActiveView] = useState<ViewMode>('original');
	const [notification, setNotification] = useState<string | null>(null);

	const webcamRef = useRef<Webcam>(null);

	const showNotification = (message: string) => {
		setNotification(message);
		setTimeout(() => setNotification(null), 3000);
	};

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (file) {
			setImage(URL.createObjectURL(file));
			setFileToUpload(file);
			setNotification(null);
			setResult(false);
			setActiveView('original');
			setMaskImage(null);
			setHeatmapImage(null);
		}
	}, []);

	const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
		const file = fileRejections[0];
		const error = file.errors[0];

		if (error.code === 'file-too-large') {
			showNotification('File terlalu besar! Maksimal 5MB.');
		} else if (error.code === 'file-invalid-type') {
			showNotification('Format salah! Gunakan JPG atau PNG.');
		} else {
			showNotification(error.message);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDropRejected,
		accept: {
			'image/jpeg': ['.jpeg', '.jpg'],
			'image/png': ['.png']
		},
		maxSize: 5 * 1024 * 1024,
		multiple: false
	});

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot();
		if (imageSrc) {
			setImage(imageSrc);
			const file = dataURLtoFile(imageSrc, 'camera-capture.jpg');
			setFileToUpload(file);
			setNotification(null);
			setResult(false);
			setActiveView('original');
			setMaskImage(null);
			setHeatmapImage(null);
		}
	}, [webcamRef]);

	const handleGenerate = async () => {
		if (!fileToUpload) {
			showNotification('Tidak ada gambar untuk diproses.');
			return;
		}

		setIsProcessing(true);
		setActiveView('original');
		setResult(false);

		const formData = new FormData();
		formData.append('file', fileToUpload);

		try {
			const response = await fetch('http://127.0.0.1:5000/predict', {
				method: 'POST',
				body: formData
			});

			const data = await response.json();

			if (response.ok && data.status === 'success') {
				setMaskImage(data.mask_url);
				setHeatmapImage(data.heatmap_url);
				setResult(true);
				setActiveView('heatmap');
			} else {
				showNotification(data.error || 'Gagal memproses gambar.');
			}
		} catch (error) {
			console.error(error);
			showNotification('Gagal terhubung ke Server Backend.');
		} finally {
			setIsProcessing(false);
		}
	};

	const handleReset = () => {
		setImage(null);
		setFileToUpload(null);
		setMaskImage(null);
		setHeatmapImage(null);
		setResult(false);
		setIsProcessing(false);
		setActiveView('original');
		setNotification(null);
	};

	return (
		<div className="w-full max-w-2xl mx-auto bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20 relative">
			<div className="flex justify-center mb-8">
				<div className="bg-background p-1 rounded-full border border-border flex items-center">
					<button
						onClick={() => {
							setMode('file');
							handleReset();
						}}
						className={clsx(
							'flex items-center cursor-pointer gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
							mode === 'file' ? 'bg-accent text-white shadow-md' : 'text-secondary hover:text-primary'
						)}
					>
						<Upload size={16} /> Upload
					</button>
					<button
						onClick={() => {
							setMode('camera');
							handleReset();
						}}
						className={clsx(
							'flex items-center cursor-pointer gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
							mode === 'camera' ? 'bg-accent text-white shadow-md' : 'text-secondary hover:text-primary'
						)}
					>
						<Camera size={16} /> Camera
					</button>
				</div>
			</div>

			<div
				className={clsx(
					'relative min-h-[300px] flex flex-col items-center justify-center border-2 border-border rounded-xl bg-background/30 transition-colors group overflow-hidden',
					!image && mode === 'file' && 'border-dashed hover:border-accent/50'
				)}
			>
				{image ? (
					<div className="w-full h-full p-4 flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
						<div className="relative w-auto h-auto max-w-full max-h-[500px] rounded-lg overflow-hidden border border-border shadow-2xl flex justify-center items-center bg-black/5">
							<Image
								src={image}
								alt="Original"
								width={0}
								height={0}
								sizes="100vw"
								className="w-auto h-auto max-w-full max-h-[500px] object-contain"
								unoptimized
							/>

							{result && activeView === 'mask' && maskImage && (
								<div className="absolute inset-0 z-10 animate-in fade-in duration-500">
									<Image
										src={maskImage}
										alt="Mask Result"
										fill
										className="object-contain"
										unoptimized
									/>
								</div>
							)}

							{result && activeView === 'heatmap' && heatmapImage && (
								<div className="absolute inset-0 z-10 animate-in fade-in duration-500">
									<Image
										src={heatmapImage}
										alt="Heatmap Result"
										fill
										className="object-contain mix-blend-normal opacity-90"
										unoptimized
									/>
								</div>
							)}
						</div>

						{result && (
							<div className="flex p-1 bg-surface border border-border rounded-lg gap-1">
								<button
									onClick={() => setActiveView('original')}
									className={clsx(
										'px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
										activeView === 'original'
											? 'bg-white text-black shadow-sm'
											: 'text-secondary hover:text-primary'
									)}
								>
									<Eye size={14} /> Original
								</button>
								<button
									onClick={() => setActiveView('mask')}
									className={clsx(
										'px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
										activeView === 'mask'
											? 'bg-white text-black shadow-sm'
											: 'text-secondary hover:text-primary'
									)}
								>
									<Scan size={14} /> Mask
								</button>
								<button
									onClick={() => setActiveView('heatmap')}
									className={clsx(
										'px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
										activeView === 'heatmap'
											? 'bg-white text-black shadow-sm'
											: 'text-secondary hover:text-primary'
									)}
								>
									<Layers size={14} /> Heatmap
								</button>
							</div>
						)}

						{!result ? (
							<div className="flex gap-3">
								<button
									onClick={handleReset}
									className="px-4 py-2 text-sm text-secondary hover:text-primary cursor-pointer"
								>
									Cancel
								</button>
								<button
									onClick={handleGenerate}
									disabled={isProcessing}
									className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-full cursor-pointer hover:bg-[#b0946b] disabled:opacity-50"
								>
									{isProcessing && (
										<RefreshCw
											className="animate-spin"
											size={16}
										/>
									)}
									{isProcessing ? 'Processing...' : 'Generate Heatmap'}
								</button>
							</div>
						) : (
							<div className="flex flex-col items-center gap-2">
								<div className="flex items-center gap-2 text-accent font-bold font-sans mb-2">
									<CheckCircle2 size={18} /> Analysis Complete
								</div>
								<button
									onClick={handleReset}
									className="px-6 py-2 cursor-pointer border border-border rounded-full text-sm text-primary hover:bg-white/5 font-sans"
								>
									Reset / Try Again
								</button>
							</div>
						)}
					</div>
				) : mode === 'file' ? (
					<div
						{...getRootProps()}
						className="text-center p-8 cursor-pointer w-full h-full flex flex-col items-center justify-center outline-none"
					>
						<input {...getInputProps()} />
						<div
							className={clsx(
								'p-5 rounded-full bg-surface border border-border transition-all duration-300 mb-4 shadow-lg',
								isDragActive
									? 'bg-accent text-white scale-110'
									: 'group-hover:scale-110 group-hover:border-accent'
							)}
						>
							<ImageIcon
								className={isDragActive ? 'text-white' : 'text-secondary group-hover:text-accent'}
								size={32}
							/>
						</div>
						<p className="text-primary font-sans font-medium text-lg">
							{isDragActive ? 'Drop image now' : 'Click or drag image here'}
						</p>
						<p className="text-secondary font-sans text-sm mt-2">Supports JPG, PNG (Max 5MB)</p>
					</div>
				) : (
					<div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-black rounded-xl relative overflow-hidden">
						<Webcam
							audio={false}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							className="absolute inset-0 w-full h-full object-cover opacity-80"
						/>
						<div className="absolute bottom-6 z-20 flex flex-col items-center">
							<button
								onClick={capture}
								className="p-1 rounded-full border-4 border-white/30 hover:border-white transition-all cursor-pointer active:scale-95"
							>
								<div className="w-14 h-14 bg-accent rounded-full border-4 border-[#262624]" />
							</button>
						</div>
					</div>
				)}
			</div>

			<AnimatePresence>
				{notification && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						className="absolute bottom-10 left-0 right-0 mx-auto w-max z-50"
					>
						<div className="flex items-center gap-3 px-6 py-3 bg-[#1a1a18]/90 border border-red-500/30 text-red-200 rounded-full shadow-2xl backdrop-blur-md">
							<AlertCircle
								size={18}
								className="text-red-500"
							/>
							<span className="text-sm font-sans font-medium">{notification}</span>
							<button
								onClick={() => setNotification(null)}
								className="ml-2 hover:text-white transition-colors cursor-pointer"
							>
								<X size={14} />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
