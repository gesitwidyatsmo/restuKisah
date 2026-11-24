'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CameraOff, Smartphone, HeartHandshake, Trash2, Check, Copy, Sparkles, Info, Shirt, Users, MapPin } from 'lucide-react';
import BaroqueCartoucheFrame from './BaroqueCartoucheFrame';
import ScalableOrnateFrame from '@/components/ui/ScalableOrnateFrame';

export interface ColorSwatchItem {
	id: string;
	name: string;
	alias: string;
	hex: string;
	border?: string;
	textDark?: boolean;
	recommendation?: string;
}

export interface EtiquetteGuideItem {
	id: string;
	icon: 'clock' | 'camera-off' | 'phone-off' | 'handshake' | 'trash' | 'shirt' | 'users' | 'map-pin';
	title: string;
	shortDesc: string;
	detailDesc?: string;
}

export interface FamilyMemberGroup {
	label: string;
	father?: string;
	mother?: string;
	note?: string;
	members?: string[];
}

export interface RoyalJavaneseGuestGuideFamilyProps {
	// Section Header
	sectionTitle?: string;
	sectionSubtitle?: string;

	// Dresscode Props
	dresscodeFrameImage?: string;
	dresscodeBadge?: string;
	dresscodeHeading?: string;
	dresscodeDescription?: string;
	coupleIllustration?: string;
	swatches?: ColorSwatchItem[];

	// Etiquette / Panduan Acara Props
	etiquetteFrameImage?: string;
	etiquetteBadge?: string;
	etiquetteSubtitle?: string;
	etiquettes?: EtiquetteGuideItem[];

	// Turut Mengundang Props
	familyFrameImage?: string;
	familyBadge?: string;
	familySubtitle?: string;
	familyCardFrameImage?: string;
	brideFamily?: FamilyMemberGroup;
	groomFamily?: FamilyMemberGroup;

	className?: string;
}

export default function RoyalJavaneseGuestGuideFamily({
	sectionTitle = 'Panduan Tamu',
	sectionSubtitle = 'WEDDING GUEST GUIDE',

	dresscodeFrameImage = '/templates/jawa/Ornate Golden Parchment Frame.webp',
	dresscodeBadge = 'Dresscode',
	dresscodeHeading = 'Attire for Our Special Day',
	dresscodeDescription = 'Kami menghimbau tamu undangan untuk mengenakan busana formal dengan nuansa warna:',
	coupleIllustration = '/templates/jawa/Javanese Wedding Couple in Traditional Attire (2).webp',
	swatches = [
		{
			id: 'ivory',
			name: 'Ivory',
			alias: 'Gading',
			hex: '#F2DDC0',
			border: '#CDB596',
			textDark: true,
			recommendation: 'Pilihan anggun untuk atasan kebaya, kemeja formal, maupun gaun pesta.',
		},
		{
			id: 'champagne',
			name: 'Champagne',
			alias: 'Emas Muda',
			hex: '#D3AB77',
			border: '#AC8552',
			textDark: true,
			recommendation: 'Nuansa mewah berpadu elegan dengan ornamen selendang atau kain batik prada.',
		},
		{
			id: 'earth-brown',
			name: 'Earth Brown',
			alias: 'Cokelat Tanah',
			hex: '#5E3E25',
			border: '#3B2312',
			textDark: false,
			recommendation: 'Warna klasik berwibawa untuk beskap keraton, jas, dan kain jarik motif sogan.',
		},
		{
			id: 'sage-green',
			name: 'Sage Green',
			alias: 'Hijau Pastel',
			hex: '#6F7050',
			border: '#505338',
			textDark: false,
			recommendation: 'Sentuhan sejuk & lembut untuk seragam kerabat maupun busana modern kontemporer.',
		},
	],

	etiquetteFrameImage = '/templates/jawa/Elegant Parchment Frame with Golden Leaf Corners.webp',
	etiquetteBadge = 'Panduan Acara',
	etiquetteSubtitle = 'Guest Information & Etiquette',
	etiquettes = [
		{
			id: 'waktu',
			icon: 'clock',
			title: 'Datang Tepat Waktu',
			shortDesc: 'Datang tepat waktu sesuai jadwal acara.',
			detailDesc: 'Silakan hadir 15 menit sebelum prosesi dimulai agar dapat mengikuti acara dengan khidmat.',
		},
		{
			id: 'kamera',
			icon: 'camera-off',
			title: 'Tertib Mengambil Foto',
			shortDesc: 'Mohon tidak menggunakan flash saat prosesi.',
			detailDesc: 'Hindari menyalakan lampu kilat (flash) kamera/ponsel dan menghalangi fotografer resmi.',
		},
		{
			id: 'ponsel',
			icon: 'phone-off',
			title: 'Senyapkan Ponsel',
			shortDesc: 'Jaga ketenangan dan matikan / senyapkan ponsel.',
			detailDesc: 'Mohon mengaktifkan mode hening (silent) selama ijab kabul & prosesi adat berlangsung.',
		},
		{
			id: 'doa',
			icon: 'handshake',
			title: 'Ucapan & Doa Restu',
			shortDesc: 'Sampaikan ucapan dan doa terbaik untuk kedua mempelai.',
			detailDesc: 'Sampaikan doa restu dengan tertib saat sesi ramah tamah bersama kedua mempelai.',
		},
		{
			id: 'kebersihan',
			icon: 'trash',
			title: 'Jaga Kebersihan',
			shortDesc: 'Jaga kebersihan dan buang sampah pada tempatnya.',
			detailDesc: 'Menjaga kebersihan area gedung demi kenyamanan seluruh tamu dan keluarga besar.',
		},
	],

	familyFrameImage = '/templates/jawa/Elegant Parchment Frame with Golden Leaf Corners.original.webp',
	familyBadge = 'Turut Mengundang',
	familySubtitle = 'With The Blessings of Our Families',
	familyCardFrameImage = '/templates/jawa/Ornate Gold Cream Label Frame.webp',
	brideFamily = {
		label: "THE BRIDE'S FAMILY",
		father: 'Bpk. Raden Wiryadiningrat, S.E.',
		mother: 'Ibu R.A. Suryaningrum, M.H.',
		note: 'beserta seluruh keluarga besar',
	},
	groomFamily = {
		label: "THE GROOM\'S FAMILY",
		father: 'Bpk. K.R.T. Sastrohadiningrat, S.H.',
		mother: 'Ibu R.A. Kusumawardhani, M.M.',
		note: 'beserta seluruh keluarga besar',
	},

	className = '',
}: RoyalJavaneseGuestGuideFamilyProps) {
	// State for active swatch interactivity
	const [activeSwatch, setActiveSwatch] = useState<ColorSwatchItem | null>(null);
	const [copiedHex, setCopiedHex] = useState<string | null>(null);

	const handleCopyColor = (swatch: ColorSwatchItem) => {
		setActiveSwatch(swatch);
		navigator.clipboard.writeText(swatch.hex);
		setCopiedHex(swatch.hex);
		setTimeout(() => {
			setCopiedHex(null);
		}, 2200);
	};

	const renderIcon = (type: EtiquetteGuideItem['icon']) => {
		const iconClass = 'w-4 h-4 sm:w-5 sm:h-5 text-[#8C6D46]';
		switch (type) {
			case 'clock':
				return (
					<Clock
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
			case 'camera-off':
				return (
					<CameraOff
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
			case 'phone-off':
				return (
					<Smartphone
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
			case 'handshake':
				return (
					<HeartHandshake
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
			case 'trash':
				return (
					<Trash2
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
			case 'shirt':
				return (
					<Shirt
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
			case 'users':
				return (
					<Users
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
			case 'map-pin':
				return (
					<MapPin
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
			default:
				return (
					<Info
						className={iconClass}
						strokeWidth={2.1}
					/>
				);
		}
	};

	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/50 ring-1 ring-[#B58A45]/30 bg-[#FAF7F2] select-none text-[#2C1810] flex flex-col justify-between py-6 sm:py-8 px-3.5 sm:px-5 ${className}`}
			aria-label='Wedding Guest Guide & Family Blessings'>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND TEXTURE: EMBOSSED CREAM PARCHMENT                    */}
			{/* ----------------------------------------------------------------- */}
			<img
				src='/templates/jawa/common/bg-cream-embossed.webp'
				alt=''
				aria-hidden='true'
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-80 mix-blend-multiply'
			/>

			{/* Warm Ambient Vignette */}
			<div
				className='absolute inset-0 pointer-events-none z-0'
				style={{
					background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(245,236,224,0.65) 75%, rgba(228,212,192,0.85) 100%)',
				}}
			/>

			{/* ----------------------------------------------------------------- */}
			{/* 2. CORNER ORNAMENTS: JASMINE CLUSTERS & GOLD BAROQUE CARVINGS     */}
			{/* ----------------------------------------------------------------- */}
			{/* Top Left Jasmine Blossom */}
			<div className='absolute top-1 left-1 w-20 sm:w-24 pointer-events-none z-10 opacity-90'>
				<img
					src='/templates/jawa/profile/jasmine-cluster-left.webp'
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(44,24,16,0.15)]'
				/>
			</div>

			{/* Top Right Jasmine Blossom */}
			<div className='absolute top-1 right-1 w-20 sm:w-24 pointer-events-none z-10 opacity-90'>
				<img
					src='/templates/jawa/profile/jasmine-cluster.webp'
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(44,24,16,0.15)]'
				/>
			</div>

			{/* Top Left Baroque Corner Filigree */}
			<div className='absolute top-0 left-0 w-16 sm:w-20 pointer-events-none z-10 opacity-60 scale-x-[-1]'>
				<img
					src='/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp'
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(44,24,16,0.2)]'
				/>
			</div>

			{/* Top Right Baroque Corner Filigree */}
			<div className='absolute top-0 right-0 w-16 sm:w-20 pointer-events-none z-10 opacity-60'>
				<img
					src='/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp'
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(44,24,16,0.2)]'
				/>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 3. SECTION HEADER: PANDUAN TAMU / WEDDING GUEST GUIDE              */}
			{/* ----------------------------------------------------------------- */}
			<motion.header
				initial={{ opacity: 0, y: -12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className='relative z-10 text-center pt-3 sm:pt-4 pb-2 px-4'>
				<h2
					className='font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#2C1810] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]'
					style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
					{sectionTitle}
				</h2>
				<p className='font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-[#8C6D46] uppercase mt-0.5'>{sectionSubtitle}</p>

				{/* Delicate Golden Header Floral Divider */}
				<div className='w-44 sm:w-52 h-4 mx-auto relative my-1.5 flex items-center justify-center'>
					<img
						src='/templates/jawa/Ornate Golden Floral Divider.webp'
						alt=''
						aria-hidden='true'
						className='w-full h-full object-contain opacity-85'
					/>
				</div>
			</motion.header>

			{/* ----------------------------------------------------------------- */}
			{/* 4. CARD 01: DRESSCODE & ATTIRE PALETTE (HERITAGE HORIZONTAL CARD) */}
			{/* ----------------------------------------------------------------- */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.65, delay: 0.15 }}
				className='relative z-10 w-full mt-2 mb-3'>
				{/* Aspect Ratio Container matching Ornate Golden Parchment Frame (1774 x 887 = ~2:1) */}
				<div className='relative w-full aspect-[1774/887] select-none overflow-hidden'>
					{/* Card Frame Image: Ornate Golden Parchment Frame */}
					<img
						src={dresscodeFrameImage}
						alt=''
						aria-hidden='true'
						className='absolute inset-0 w-full h-full object-fill pointer-events-none z-0 filter drop-shadow-[0_4px_12px_rgba(44,24,16,0.18)]'
					/>

					{/* 1. Header Plaque Text: Placed precisely inside the frame's top cartouche plaque */}
					<div className='absolute top-[16%] sm:top-[16.5%] h-[9.5%] sm:h-[10%] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center'>
						<span
							className='font-serif text-[11px] sm:text-[13px] font-bold text-[#FFF6E5] tracking-[0.2em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]'
							style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
							{dresscodeBadge}
						</span>
					</div>

					{/* 2. Left Side: Majestic Javanese Couple Illustration (Standing tall from bottom border) */}
					<div className='absolute bottom-[8%] sm:bottom-[8.5%] top-[12%] w-[39%] sm:w-[40%] z-10 flex items-end justify-center pointer-events-none'>
						<img
							src={coupleIllustration}
							alt='Ilustrasi Busana Tamu Tradisional Jawa'
							className='w-full h-full object-contain object-bottom filter drop-shadow-[0_4px_8px_rgba(44,24,16,0.25)]'
						/>
					</div>

					{/* 3. Right Side: Text Description & 4 Color Swatches (Safely bounded between cartouche and batik band) */}
					<div className='absolute right-[4.5%] sm:right-[7%] top-[28.5%] sm:top-[32%] bottom-[19%] sm:bottom-[18.5%] w-[60%] sm:w-[61%] z-10 flex flex-col justify-between py-0.5'>
						{/* Introductory Text */}
						<p
							className='font-serif italic text-[9.5px] sm:text-[11px] text-[#3D2214] text-center leading-[1.25] font-medium px-0.5'
							style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
							{dresscodeDescription}
						</p>

						{/* 4 Color Swatches in ONE Horizontal Row */}
						<div className='w-full flex items-start justify-between gap-1 sm:gap-1.5 px-0.5'>
							{swatches.map((swatch) => {
								const isActive = activeSwatch?.id === swatch.id;
								const isCopied = copiedHex === swatch.hex;

								return (
									<motion.div
										key={swatch.id}
										whileHover={{ scale: 1.08 }}
										whileTap={{ scale: 0.94 }}
										onClick={() => handleCopyColor(swatch)}
										className='flex-1 flex flex-col items-center text-center cursor-pointer group'
										title={`Klik untuk menyalin kode warna ${swatch.name} (${swatch.hex})`}>
										{/* Circle Swatch */}
										<div
											className={`relative w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-full shadow-md flex items-center justify-center transition-all ${
												isActive ? 'ring-2 ring-[#B58A45] ring-offset-1 ring-offset-amber-50' : ''
											}`}
											style={{
												backgroundColor: swatch.hex,
												border: `1.5px solid ${swatch.border || '#C29D59'}`,
												boxShadow: '0 2px 4px rgba(44,24,16,0.18), inset 0 2px 3px rgba(255,255,255,0.4)',
											}}>
											{/* Metallic highlight */}
											<div className='absolute inset-0.5 rounded-full border border-white/35 pointer-events-none' />

											{/* Copied checkmark overlay */}
											{isCopied && (
												<motion.div
													initial={{ scale: 0.5, opacity: 0 }}
													animate={{ scale: 1, opacity: 1 }}
													className='w-3.5 h-3.5 rounded-full bg-black/60 flex items-center justify-center text-white'>
													<Check
														className='w-2.5 h-2.5 text-white'
														strokeWidth={3}
													/>
												</motion.div>
											)}
										</div>

										{/* Color Name */}
										<span
											className='font-serif text-[8.5px] sm:text-[10px] font-bold text-[#2C1810] mt-0.5 sm:mt-1 leading-tight tracking-wide'
											style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
											{swatch.name}
										</span>

										{/* Color Alias (Indonesian) */}
										<span className='font-serif italic text-[7px] sm:text-[8.5px] text-[#7A5B3D] leading-none mt-0.5'>({swatch.alias})</span>
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Floating feedback toast below the card when a color is copied */}
				<AnimatePresence>
					{copiedHex && (
						<motion.div
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -4 }}
							className='mt-1.5 mx-auto max-w-xs text-center text-[10px] font-medium text-amber-950 bg-amber-100/90 border border-amber-300 rounded-full py-0.5 px-3 flex items-center justify-center gap-1.5 shadow-sm'>
							<Sparkles className='w-3 h-3 text-amber-600' />
							<span>Kode warna {copiedHex} disalin ke clipboard!</span>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* ----------------------------------------------------------------- */}
			{/* 6. CARD 02: PANDUAN ACARA (ELEGANT PARCHMENT FRAME WITH GOLDEN LEAF) */}
			{/* ----------------------------------------------------------------- */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.65, delay: 0.25 }}
				className='relative z-10 w-full mb-3'>
				{/* Aspect Ratio Container matching Elegant Parchment Frame (2170 x 725 = ~3:1) */}
				<div className='relative w-full aspect-[2170/725] select-none overflow-hidden'>
					{/* Card Frame Image: Elegant Parchment Frame with Golden Leaf Corners */}
					<img
						src={etiquetteFrameImage}
						alt=''
						aria-hidden='true'
						className='absolute inset-0 w-full h-full object-fill pointer-events-none z-0 filter drop-shadow-[0_4px_12px_rgba(44,24,16,0.18)]'
					/>

					{/* 1. Header Plaque Text: Placed precisely inside the top cartouche plaque */}
					<div className='absolute top-[10.5%] sm:top-[11%] h-[10.5%] sm:h-[11%] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center'>
						<span
							className='font-serif text-[11px] sm:text-[13px] font-bold text-[#FFF6E5]  uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]'
							style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
							{etiquetteBadge}
						</span>
					</div>

					{/* 2. 5 Columns Etiquette Grid: Safely bounded within inner parchment */}
					<div className='absolute left-[4.5%] sm:left-[5%] right-[4.5%] sm:right-[5%] top-[27%] bottom-[10%] z-10 grid grid-cols-5 items-start'>
						{etiquettes.map((item, idx) => (
							<div
								key={item.id}
								className={`h-full flex flex-col items-center justify-start text-center px-0.5 sm:px-1.5 ${idx < etiquettes.length - 1 ? 'border-r border-[#C29D59]/35' : ''}`}>
								{/* Circular Gold Icon Badge */}
								<div className='w-6 h-6 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF4E8] to-[#EEDDC4] border border-[#C29D59] shadow-xs flex items-center justify-center mb-1 sm:mb-1.5 shrink-0 transition-transform hover:scale-110'>
									{renderIcon(item.icon)}
								</div>

								{/* Protocol Text Description */}
								<p
									className='font-serif text-[7px] sm:text-[8.5px] text-[#3D2214] font-bold leading-[1.25] max-w-[95%] line-clamp-4'
									style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
									title={item.detailDesc || item.shortDesc}>
									{item.shortDesc}
								</p>
							</div>
						))}
					</div>
				</div>
			</motion.div>

			{/* ----------------------------------------------------------------- */}
			{/* 8. CARD 03: TURUT MENGUNDANG (SCALABLE ORNATE FRAME - EXPANDS DOWNWARD) */}
			{/* ----------------------------------------------------------------- */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.65, delay: 0.35 }}
				className='relative z-10 w-full mb-3'>
				<ScalableOrnateFrame
					src={familyFrameImage}
					originalWidth={2170}
					originalHeight={725}
					slice={{ top: 210, bottom: 145, isPercentage: false }}
					mode='3-slice'
					overlapPx={1}
					className='w-full filter drop-shadow-[0_4px_12px_rgba(44,24,16,0.18)]'
					contentClassName='px-5 sm:px-8 py-1.5 sm:py-2.5'
					headerOverlay={
						<div className='flex items-center justify-center pt-1.5 sm:pt-2 pointer-events-none'>
							<span
								className='font-serif text-[11px] sm:text-[13px] font-bold text-[#FFF6E5] tracking-[-0.09em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]'
								style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
								{familyBadge}
							</span>
						</div>
					}>
					{/* Subtitle if provided */}
					{familySubtitle && (
						<p
							className='font-serif italic text-[8.5px] sm:text-[10.5px] text-[#7A5B3D] text-center mb-1.5 sm:mb-2 tracking-wide'
							style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
							{familySubtitle}
						</p>
					)}

					{/* 2 Family Columns with Ornate Gold Cream Label Frames */}
					<div className='w-full grid grid-cols-2 gap-2 sm:gap-3.5 relative items-start py-1 sm:py-2'>
						{/* Left Column: Keluarga Besar Mempelai Wanita */}
						<ScalableOrnateFrame
							src={familyCardFrameImage}
							originalWidth={1420}
							originalHeight={812}
							slice={{ top: 310, bottom: 48, isPercentage: false }}
							mode='3-slice'
							overlapPx={1}
							className='w-full filter drop-shadow-[0_2px_6px_rgba(44,24,16,0.12)]'
							contentClassName='px-2 sm:px-3 py-1 sm:py-1.5'
							headerOverlay={
								<div className='absolute top-[50%] bottom-[12%] left-[20%] right-[20%] flex items-center justify-center text-center px-1 pointer-events-none'>
									<span
										className='font-serif text-[6px] sm:text-[8.5px] font-bold text-[#6D4C2B] tracking-wider uppercase leading-tight line-clamp-2'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										{brideFamily.label}
									</span>
								</div>
							}>
							<div className='flex flex-col items-center justify-center text-center px-0.5 sm:px-1'>
								{brideFamily.father && (
									<h4
										className='font-serif text-[8.5px] sm:text-[11px] font-bold text-[#2C1810] leading-snug mt-0.5'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										{brideFamily.father}
									</h4>
								)}
								{brideFamily.mother && (
									<h4
										className='font-serif text-[8.5px] sm:text-[11px] font-bold text-[#2C1810] leading-snug'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										& {brideFamily.mother}
									</h4>
								)}
								{brideFamily.members &&
									brideFamily.members.map((name, idx) => (
										<h4
											key={idx}
											className='font-serif text-[8.5px] sm:text-[11px] font-bold text-[#2C1810] leading-snug'
											style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
											{name}
										</h4>
									))}

								{brideFamily.note && (
									<p
										className='font-serif italic text-[7px] sm:text-[9px] text-[#7A5B3D] leading-none mt-1'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										{brideFamily.note}
									</p>
								)}
							</div>
						</ScalableOrnateFrame>

						{/* Center Vertical Divider Accent with rosette */}
						<div className='absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#C29D59]/50 to-transparent flex items-center justify-center pointer-events-none z-20'>
							<span className='text-[#C29D59] text-[7px] sm:text-[8px] bg-[#FAF6EE] px-0.5 shadow-xs rounded-full'>❖</span>
						</div>

						{/* Right Column: Keluarga Besar Mempelai Pria */}
						<ScalableOrnateFrame
							src={familyCardFrameImage}
							originalWidth={1420}
							originalHeight={812}
							slice={{ top: 310, bottom: 48, isPercentage: false }}
							mode='3-slice'
							overlapPx={1}
							className='w-full filter drop-shadow-[0_2px_6px_rgba(44,24,16,0.12)]'
							contentClassName='px-2 sm:px-3 py-1 sm:py-1.5'
							headerOverlay={
								<div className='absolute top-[50%] bottom-[12%] left-[20%] right-[20%] flex items-center justify-center text-center px-1 pointer-events-none'>
									<span
										className='font-serif text-[6px] sm:text-[8.5px] font-bold text-[#6D4C2B] tracking-wider uppercase leading-tight line-clamp-2'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										{groomFamily.label}
									</span>
								</div>
							}>
							<div className='flex flex-col items-center justify-center text-center px-0.5 sm:px-1'>
								{groomFamily.father && (
									<h4
										className='font-serif text-[8.5px] sm:text-[11px] font-bold text-[#2C1810] leading-snug mt-0.5'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										{groomFamily.father}
									</h4>
								)}
								{groomFamily.mother && (
									<h4
										className='font-serif text-[8.5px] sm:text-[11px] font-bold text-[#2C1810] leading-snug'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										& {groomFamily.mother}
									</h4>
								)}
								{groomFamily.members &&
									groomFamily.members.map((name, idx) => (
										<h4
											key={idx}
											className='font-serif text-[8.5px] sm:text-[11px] font-bold text-[#2C1810] leading-snug'
											style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
											{name}
										</h4>
									))}

								{groomFamily.note && (
									<p
										className='font-serif italic text-[7px] sm:text-[9px] text-[#7A5B3D] leading-none mt-1'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										{groomFamily.note}
									</p>
								)}
							</div>
						</ScalableOrnateFrame>
					</div>
				</ScalableOrnateFrame>
			</motion.div>

			{/* ----------------------------------------------------------------- */}
			{/* 9. BOTTOM SACRED EMBLEM: GOLDEN INFINITY RELIEF & JASMINE BLOSSOM */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full mt-2 pt-1 flex flex-col items-center justify-center'>
				{/* Sacred Golden Floral Carving Ornament */}
				<div className='relative w-52 sm:w-64 h-auto aspect-[2172/724] flex items-center justify-center'>
					<img
						src='/templates/jawa/Golden Floral Infinity Ornament.webp'
						alt=''
						aria-hidden='true'
						className='w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(44,24,16,0.2)]'
					/>

					{/* Center Jasmine Flower Accent over the carving */}
					<div className='absolute top-1/2 -translate-y-1/2 w-16 sm:w-20 pointer-events-none opacity-95'>
						<img
							src='/templates/jawa/profile/jasmine-cluster.webp'
							alt=''
							aria-hidden='true'
							className='w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(44,24,16,0.15)]'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
