'use client';

import React, { useState, useEffect } from 'react';

export interface SliceConfig {
	/** Jarak potongan atas (pixel asli gambar atau persentase 0-100) */
	top: number;
	/** Jarak potongan bawah (pixel asli gambar atau persentase 0-100) */
	bottom: number;
	/** Jarak potongan kiri (khusus mode 9-slice, pixel asli atau 0-100) */
	left?: number;
	/** Jarak potongan kanan (khusus mode 9-slice, pixel asli atau 0-100) */
	right?: number;
	/** Jika true, nilai top/bottom/left/right dianggap persentase (0 - 100) */
	isPercentage?: boolean;
}

export interface ScalableOrnateFrameProps {
	/** URL / path gambar bingkai (misal: '/templates/jawa/story/badge-step.webp') */
	src: string;
	/** Konfigurasi titik potong bingkai */
	slice?: SliceConfig;
	/**
	 * Mode pemotongan:
	 * - '3-slice': Memotong Header Atas & Footer Bawah (menjaga ukiran atas/bawah tidak gepeng, badan tengah memanjang bebas). Sangat cocok untuk badge, piagam, dan card vertikal.
	 * - '9-slice': Menggunakan teknik CSS border-image 9-slice (menjaga 4 sudut, memanjangkan sisi & tengah). Cocok untuk bingkai persegi panjang umum.
	 */
	mode?: '3-slice' | '9-slice';
	/** Lebar asli gambar dalam pixel jika diketahui (mencegah layout shift) */
	originalWidth?: number;
	/** Tinggi asli gambar dalam pixel jika diketahui (mencegah layout shift) */
	originalHeight?: number;
	/** Elemen yang ingin diletakkan di atas ukiran mahkota/crest (misal: nomor step '01' atau logo) */
	headerOverlay?: React.ReactNode;
	/** Elemen yang ingin diletakkan di atas ornamen footer */
	footerOverlay?: React.ReactNode;
	/** ClassName untuk container terluar */
	className?: string;
	/** ClassName untuk area konten (teks / isi di dalam bingkai) */
	contentClassName?: string;
	/** Konten di dalam bingkai (tulisan, card, tombol, dll) */
	children?: React.ReactNode;
	/** Tingkat overlap/margin kompensasi antar slice agar sambungan 100% mulus (default: 1px) */
	overlapPx?: number;
}

/**
 * ScalableOrnateFrame
 *
 * Komponen reusable untuk menerapkan teknik 3-Slice & 9-Slice pada GAMBAR BINGKAI APA SAJA.
 * Memungkinkan teks di dalamnya memanjang bebas tanpa merusak atau membuat gepeng
 * ukiran emas/ornamen di sudut-sudut maupun mahkota atas/bawah.
 */
export default function ScalableOrnateFrame({
	src,
	slice = { top: 22, bottom: 21, isPercentage: true },
	mode = '3-slice',
	originalWidth,
	originalHeight,
	headerOverlay,
	footerOverlay,
	className = '',
	contentClassName = 'px-6 py-2',
	children,
	overlapPx = 1,
}: ScalableOrnateFrameProps) {
	// State dimensi asli gambar jika tidak di-pass via props
	const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
		width: originalWidth || 1312,
		height: originalHeight || 1199,
	});

	// Otomatis membaca dimensi alami gambar jika belum ditentukan
	useEffect(() => {
		if (originalWidth && originalHeight) return;

		const img = new Image();
		img.src = src;
		img.onload = () => {
			if (img.naturalWidth && img.naturalHeight) {
				setDimensions({
					width: img.naturalWidth,
					height: img.naturalHeight,
				});
			}
		};
	}, [src, originalWidth, originalHeight]);

	const origW = dimensions.width;
	const origH = dimensions.height;

	// Hitung koordinat potongan dalam pixel asli gambar
	const topSlicePx = slice.isPercentage
		? Math.round((slice.top / 100) * origH)
		: slice.top;
	const bottomSlicePx = slice.isPercentage
		? Math.round((slice.bottom / 100) * origH)
		: slice.bottom;
	const leftSlicePx = slice.left
		? slice.isPercentage
			? Math.round((slice.left / 100) * origW)
			: slice.left
		: Math.round(origW * 0.15);
	const rightSlicePx = slice.right
		? slice.isPercentage
			? Math.round((slice.right / 100) * origW)
			: slice.right
		: Math.round(origW * 0.15);

	const midSlicePx = Math.max(1, origH - topSlicePx - bottomSlicePx);

	// --------------------------------------------------------------------------
	// MODE 1: 9-SLICE VIA CSS BORDER-IMAGE
	// --------------------------------------------------------------------------
	if (mode === '9-slice') {
		return (
			<div
				className={`relative w-full ${className}`}
				style={{
					borderStyle: 'solid',
					borderWidth: `${topSlicePx / 4}px ${rightSlicePx / 4}px ${bottomSlicePx / 4}px ${leftSlicePx / 4}px`,
					borderImageSource: `url('${src}')`,
					borderImageSlice: `${topSlicePx} ${rightSlicePx} ${bottomSlicePx} ${leftSlicePx} fill`,
					borderImageRepeat: 'stretch',
				}}
			>
				{headerOverlay && (
					<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
						{headerOverlay}
					</div>
				)}
				<div className={`relative z-10 w-full ${contentClassName}`}>{children}</div>
				{footerOverlay && (
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none">
						{footerOverlay}
					</div>
				)}
			</div>
		);
	}

	// --------------------------------------------------------------------------
	// MODE 2: 3-SLICE VERTICAL (PRESERVED TOP & BOTTOM CAPS)
	// Sangat ideal untuk bingkai berpuncak mahkota/crest dan berpenutup ukiran bawah
	// --------------------------------------------------------------------------
	return (
		<div className={`relative w-full flex flex-col items-center justify-start ${className}`}>
			{/* 1. TOP HEADER CAP (Aspect-Ratio Terkunci, Ornamen Atas 100% Tajam Tanpa Gepeng) */}
			<div
				className="relative w-full overflow-hidden shrink-0 select-none pointer-events-none"
				style={{
					aspectRatio: `${origW} / ${topSlicePx}`,
					marginBottom: `-${overlapPx}px`, // Overlap 1px mikro untuk sambungan anti-seam
				}}
			>
				<svg
					viewBox={`0 0 ${origW} ${topSlicePx}`}
					preserveAspectRatio="xMidYMin slice"
					className="w-full h-full block"
				>
					<image href={src} width={origW} height={origH} x="0" y="0" />
				</svg>

				{/* Slot Overlay Header (Misal Step Number '01' di mahkota/crest) */}
				{headerOverlay && (
					<div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
						{headerOverlay}
					</div>
				)}
			</div>

			{/* 2. MIDDLE BODY (Elastis memanjang mengikuti panjang teks/konten) */}
			<div className="relative w-full flex-1 flex flex-col justify-center items-center">
				{/* Background SVG yang memanjangkan potongan badan tengah secara vertikal */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
					<svg
						viewBox={`0 ${topSlicePx} ${origW} ${midSlicePx}`}
						preserveAspectRatio="none"
						className="w-full h-full block"
					>
						<image href={src} width={origW} height={origH} x="0" y="0" />
					</svg>
				</div>

				{/* Area Konten Utama (Teks, Judul, Form, dll) */}
				<div className={`relative z-10 w-full ${contentClassName}`}>{children}</div>
			</div>

			{/* 3. BOTTOM FOOTER CAP (Aspect-Ratio Terkunci, Ornamen Bawah Selalu Pas Menutup Kartu) */}
			<div
				className="relative w-full overflow-hidden shrink-0 select-none pointer-events-none"
				style={{
					aspectRatio: `${origW} / ${bottomSlicePx}`,
					marginTop: `-${overlapPx}px`, // Overlap 1px mikro
				}}
			>
				<svg
					viewBox={`0 ${origH - bottomSlicePx} ${origW} ${bottomSlicePx}`}
					preserveAspectRatio="xMidYMax slice"
					className="w-full h-full block"
				>
					<image href={src} width={origW} height={origH} x="0" y="0" />
				</svg>

				{/* Slot Overlay Footer */}
				{footerOverlay && (
					<div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
						{footerOverlay}
					</div>
				)}
			</div>
		</div>
	);
}
