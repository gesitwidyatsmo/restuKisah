'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export interface LoveStoryMilestone {
	id: string;
	step: string;
	title: string;
	description: string;
	image: string;
	framedImage?: string;
	imageAlt?: string;
	layout?: 'badge-left' | 'badge-right';
}

export interface RoyalJavaneseLoveStoryProps {
	sectionTitle?: string;
	sectionSubtitle?: string;
	stories?: LoveStoryMilestone[];
	backgroundImage?: string;
	topCrestImage?: string;
	topGarlandLeftImage?: string;
	topGarlandRightImage?: string;
	headerDividerImage?: string;
	archFrameImage?: string;
	badgeFrameImage?: string;
	rosetteImage?: string;
	bottomGununganImage?: string;
	bottomBorderImage?: string;
	className?: string;
}

export default function RoyalJavaneseLoveStory({
	sectionTitle = 'Our Love Story',
	sectionSubtitle = 'A JOURNEY OF LOVE',
	stories = [
		{
			id: 'first-meeting',
			step: '01',
			title: 'FIRST MEETING',
			description:
				'Segalanya bermula dari sebuah pertemuan sederhana di kampus. Saat itu, kami hanya dua orang asing yang tak menyangka, obrolan singkat hari itu akan menjadi awal dari kisah panjang kami.',
			image: '/adat-jawa-cover/Warm Café Date with Iced Drinks.webp',
			framedImage: '/adat-jawa-cover/story-framed-1.webp',
			imageAlt: 'First Meeting di Kampus',
		},
		{
			id: 'the-proposal',
			step: '02',
			title: 'THE PROPOSAL',
			description:
				'Setelah saling mengenal lebih dalam, kami semakin yakin untuk melangkah bersama. Dengan penuh doa dan restu keluarga, ia datang dengan niat baik, mengikat komitmen untuk masa depan yang sama.',
			image: '/adat-jawa-cover/Warm Lamaran Portrait with Floral Elegance.webp',
			framedImage: '/adat-jawa-cover/story-framed-2.webp',
			imageAlt: 'Momen Lamaran & Komitmen Bersama',
		},
		{
			id: 'the-wedding',
			step: '03',
			title: 'THE WEDDING',
			description:
				'Kini, kami siap memulai babak baru dalam hidup. Bukan lagi dua individu, melainkan satu perjalanan hidup bersama, membangun rumah tangga yang diridhai Allah, penuh cinta, dan saling melengkapi.',
			image: '/adat-jawa-cover/Warm Wedding Portrait in Paes Ageng.webp',
			framedImage: '/adat-jawa-cover/story-framed-3.webp',
			imageAlt: 'Pawiwahan Ageng Pernikahan Adat Jawa',
		},
	],
	backgroundImage = '/adat-jawa-cover/komponen adat jawa/background/Elegant Javanese Batik Embossed Background.webp',
	topCrestImage = '/adat-jawa-cover/cover/3. Ornate Golden Wood Crest.webp',
	topGarlandLeftImage = '/templates/jawa/hero/jasmine-cascade-hanging.webp',
	topGarlandRightImage = '/templates/jawa/hero/jasmine-cascade-hanging.webp',
	headerDividerImage = '/adat-jawa-cover/komponen adat jawa/Ornament Library/Ornate Golden Floral Divider.webp',
	archFrameImage = '/adat-jawa-cover/Ornate Golden Arch Frame with Jasmine Accents.webp',
	badgeFrameImage = '/adat-jawa-cover/Ornate Golden Parchment Badge.webp',
	rosetteImage = '/adat-jawa-cover/Ornate Gold Floral Divider one.webp',
	bottomGununganImage = '/adat-jawa-cover/cover/7. Ornate Golden Javanese Gunungan Ornament.webp',
	bottomBorderImage = '/adat-jawa-cover/komponen adat jawa/Ornate Javanese Batik Gold Border-2.webp',
	className = '',
}: RoyalJavaneseLoveStoryProps) {
	// Lightbox Modal State for photo preview
	const [activePhoto, setActivePhoto] = useState<LoveStoryMilestone | null>(null);

	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/40 ring-1 ring-[#B58A45]/20 bg-[#281309] select-none text-[#FFF6E5] flex flex-col justify-between ${className}`}
			aria-label="Our Love Story Timeline"
		>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: DEEP RICH JAVANESE EMBOSSED BATIK PAPER            */}
			{/* ----------------------------------------------------------------- */}
			<img
				src={backgroundImage}
				alt="Batik Embossed Background"
				className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.88] contrast-[1.05]"
			/>

			{/* Warm Royal Keraton Vignette Overlay */}
			<div className="absolute inset-0 bg-radial from-transparent via-[#1B0C06]/40 to-[#0F0603]/85 pointer-events-none z-0" />

			{/* Outer Golden Border Corner Flourishes */}
			<div className="absolute top-2 left-2 w-14 h-14 pointer-events-none z-10 opacity-70">
				<img
					src="/adat-jawa-cover/komponen adat jawa/Hero & Countdown — Royal Couple Introduction/Golden Baroque Floral Corner Flourish.webp"
					alt="Ornament Pojok Kiri Atas"
					className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
				/>
			</div>
			<div className="absolute top-2 right-2 w-14 h-14 pointer-events-none z-10 opacity-70 scale-x-[-1]">
				<img
					src="/adat-jawa-cover/komponen adat jawa/Hero & Countdown — Royal Couple Introduction/Golden Baroque Floral Corner Flourish.webp"
					alt="Ornament Pojok Kanan Atas"
					className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
				/>
			</div>
			<div className="absolute bottom-2 left-2 w-14 h-14 pointer-events-none z-10 opacity-70 scale-y-[-1]">
				<img
					src="/adat-jawa-cover/komponen adat jawa/Hero & Countdown — Royal Couple Introduction/Golden Baroque Floral Corner Flourish.webp"
					alt="Ornament Pojok Kiri Bawah"
					className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
				/>
			</div>
			<div className="absolute bottom-2 right-2 w-14 h-14 pointer-events-none z-10 opacity-70 scale-x-[-1] scale-y-[-1]">
				<img
					src="/adat-jawa-cover/komponen adat jawa/Hero & Countdown — Royal Couple Introduction/Golden Baroque Floral Corner Flourish.webp"
					alt="Ornament Pojok Kanan Bawah"
					className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
				/>
			</div>

			{/* Top Cascading Jasmine Garlands */}
			<motion.div
				initial={{ opacity: 0, y: -15 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className="absolute top-0 left-3 sm:left-4 w-12 sm:w-14 pointer-events-none z-20"
			>
				<img
					src={topGarlandLeftImage}
					alt="Jasmine Garland Left"
					className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
				/>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -15 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className="absolute top-0 right-3 sm:right-4 w-12 sm:w-14 pointer-events-none z-20 scale-x-[-1]"
			>
				<img
					src={topGarlandRightImage}
					alt="Jasmine Garland Right"
					className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
				/>
			</motion.div>

			{/* ----------------------------------------------------------------- */}
			{/* 2. SECTION HEADER: OUR LOVE STORY & CREST                         */}
			{/* ----------------------------------------------------------------- */}
			<div className="relative z-20 pt-7 sm:pt-9 pb-3 sm:pb-4 px-4 sm:px-6 flex flex-col items-center text-center">
				{/* Top Golden Wood Crest */}
				<motion.div
					initial={{ opacity: 0, scale: 0.85 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					className="w-28 sm:w-36 h-auto mb-1 flex items-center justify-center"
				>
					<img
						src={topCrestImage}
						alt="Golden Wood Crest"
						className="w-full h-auto object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
					/>
				</motion.div>

				{/* Script Title: "Our Love Story" */}
				<motion.h2
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, delay: 0.15 }}
					className="font-script text-[42px] xs:text-[48px] sm:text-[54px] font-normal leading-[1.05] tracking-wide my-0.5 bg-gradient-to-b from-[#FFF7E6] via-[#F3D797] to-[#C99C4B] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
				>
					{sectionTitle}
				</motion.h2>

				{/* Subtitle: "A JOURNEY OF LOVE" */}
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.25 }}
					className="flex items-center justify-center gap-2 mt-1 sm:mt-1.5"
				>
					<span className="w-4 sm:w-6 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
					<p className="font-cinzel text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.28em] text-[#E7C98C] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
						{sectionSubtitle}
					</p>
					<span className="w-4 sm:w-6 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
				</motion.div>

				{/* Header Golden Floral Divider */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="w-28 sm:w-36 h-auto mt-2 flex items-center justify-center opacity-85"
				>
					<img
						src={headerDividerImage}
						alt="Header Golden Floral Divider"
						className="w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
					/>
				</motion.div>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 3. TIMELINE BODY WITH CENTRAL GOLDEN AXIS & ROSETTES              */}
			{/* ----------------------------------------------------------------- */}
			<div className="relative z-20 px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-6 sm:gap-8">
				{/* Central Vertical Golden Timeline Spine (z-0: strictly behind cards and markers) */}
				<motion.div
					initial={{ scaleY: 0, opacity: 0 }}
					whileInView={{ scaleY: 1, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-[2px] pointer-events-none z-0"
					style={{
						originY: 0,
						background:
							'linear-gradient(to bottom, rgba(212, 175, 55, 0.2) 0%, rgba(243, 215, 151, 0.95) 15%, rgba(212, 175, 55, 1) 50%, rgba(243, 215, 151, 0.95) 85%, rgba(212, 175, 55, 0.2) 100%)',
						boxShadow: '0 0 6px rgba(243, 215, 151, 0.6), 0 0 12px rgba(181, 138, 69, 0.3)',
					}}
				/>

				{/* Milestones List */}
				{stories.map((item, index) => {
					// Dynamic alternate layout: even indices have badge on left, odd have badge on right
					const isBadgeLeft = item.layout ? item.layout === 'badge-left' : index % 2 === 0;

					// Render Parchment Badge Card (Number directly inside badge's built-in oval crest, no extra lonjong)
					const renderBadgeCard = () => (
						<div className="relative w-full aspect-[1312/1199] flex items-center justify-center">
							{/* Outer Parchment Badge Frame Image */}
							<img
								src={badgeFrameImage}
								alt="Parchment Badge Frame"
								className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
							/>

							{/* Step Number: Positioned directly inside the badge's built-in oval crest (Dead center vertically and horizontally) */}
							<div className="absolute top-[3.2%] left-1/2 -translate-x-1/2 w-[22%] h-[15.5%] z-20 pointer-events-none flex items-center justify-center">
								<span className="font-cormorant font-bold text-[13px] xs:text-[15px] sm:text-[17px] text-[#F9E2AF] tracking-widest leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
									{item.step}
								</span>
							</div>

							{/* Inner Badge Text Content */}
							<div className="relative z-10 w-[80%] xs:w-[78%] sm:w-[76%] pt-6 xs:pt-7 sm:pt-8 pb-3 sm:pb-4 px-2 flex flex-col items-center text-center justify-center">
								{/* Title: FIRST MEETING / THE PROPOSAL / THE WEDDING */}
								<h3 className="font-cormorant font-bold italic tracking-[0.08em] sm:tracking-[0.1em] text-[10.5px] xs:text-[11.5px] sm:text-[13.5px] text-[#2C1810] leading-tight uppercase mb-1 sm:mb-1.5">
									{item.title}
								</h3>

								{/* Story Narrative Description */}
								<p className="font-cormorant font-medium text-[8px] xs:text-[8.8px] sm:text-[10px] text-[#3B2213] leading-[1.24] xs:leading-[1.28] sm:leading-[1.35] tracking-normal">
									{item.description}
								</p>
							</div>
						</div>
					);

					// Render Framed Photo: 100% pixel-perfect to all lekukan with ZERO leakage
					const renderPhotoCard = () => (
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setActivePhoto(item)}
							className="relative w-full aspect-[1312/1199] group overflow-visible flex items-center justify-center cursor-pointer"
							role="button"
							tabIndex={0}
							aria-label={`Buka foto ${item.title}`}
						>
							{/* Master Pixel-Perfect Framed Photo: Mathematically zero leaking pixels outside lekukan */}
							<img
								src={item.framedImage || archFrameImage}
								alt={item.imageAlt || item.title}
								className="w-full h-full object-contain pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)]"
							/>

							{/* Interactive Zoom Indicator Pill */}
							<div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
								<div className="px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-xs border border-amber-300/40 text-[8px] xs:text-[9px] text-[#F9E2AF] flex items-center gap-1 shadow-md">
									<ZoomIn className="w-2.5 h-2.5" />
									<span className="font-sans font-medium">Perbesar</span>
								</div>
							</div>
						</motion.div>
					);

					return (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 25 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-40px' }}
							transition={{ duration: 0.7, delay: index * 0.15 }}
							className="relative z-20 w-full grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 items-center"
						>
							{/* Center Marker Node with subtle breathing animation & backing disc */}
							<motion.div
								animate={{ scale: [1, 1.08, 1] }}
								transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.8 }}
								className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
							>
								{/* Dark circular backing disc to occlude the vertical line */}
								<div className="absolute w-4 h-4 rounded-full bg-[#281309] -z-10 shadow-xs" />

								<img
									src={rosetteImage}
									alt="Floral Milestone Marker"
									className="w-6 sm:w-7 h-6 sm:h-7 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
								/>
							</motion.div>

							{/* Left Column */}
							<div className="w-full flex items-center justify-center">
								{isBadgeLeft ? renderBadgeCard() : renderPhotoCard()}
							</div>

							{/* Right Column */}
							<div className="w-full flex items-center justify-center">
								{isBadgeLeft ? renderPhotoCard() : renderBadgeCard()}
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 4. BOTTOM ORNAMENT: SACRED GUNUNGAN & GOLDEN WOOD CARVING BORDER  */}
			{/* ----------------------------------------------------------------- */}
			<div className="relative z-20 mt-4 sm:mt-6 pb-2 flex flex-col items-center">
				{/* Center Sacred Golden Gunungan Ornament */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
					className="w-28 sm:w-36 h-auto relative z-20 -mb-5 sm:-mb-6"
				>
					<img
						src={bottomGununganImage}
						alt="Golden Javanese Gunungan Ornament"
						className="w-full h-auto object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)]"
					/>
				</motion.div>

				{/* Bottom Golden Batik Carved Border Frame */}
				<div className="w-full h-12 sm:h-16 relative z-10 overflow-hidden">
					<img
						src={bottomBorderImage}
						alt="Ornate Javanese Batik Gold Border"
						className="w-full h-full object-cover object-top opacity-95 filter drop-shadow-[0_-4px_10px_rgba(0,0,0,0.7)]"
					/>
				</div>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 5. ROYAL JAVANESE PHOTO LIGHTBOX MODAL                            */}
			{/* ----------------------------------------------------------------- */}
			<AnimatePresence>
				{activePhoto && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setActivePhoto(null)}
						className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
					>
						<motion.div
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							onClick={(e) => e.stopPropagation()}
							className="relative max-w-sm sm:max-w-md w-full bg-[#1F0C05] border-2 border-[#D4AF37] rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-col items-center ring-1 ring-amber-400/40"
						>
							{/* Close Button */}
							<button
								onClick={() => setActivePhoto(null)}
								className="absolute -top-3.5 -right-3.5 w-8 h-8 rounded-full bg-[#3B1E0F] border border-[#D4AF37] text-[#F9E2AF] flex items-center justify-center shadow-lg hover:bg-amber-800 transition-colors z-20"
								aria-label="Tutup foto"
							>
								<X className="w-4 h-4" />
							</button>

							{/* Photo Frame Container */}
							<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-inner">
								<img
									src={activePhoto.image}
									alt={activePhoto.imageAlt || activePhoto.title}
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Caption Information */}
							<div className="w-full mt-3 flex flex-col items-center text-center">
								<div className="flex items-center gap-2 mb-1">
									<span className="px-2 py-0.5 rounded-full bg-[#3B1E0F] border border-[#D4AF37] text-[10px] font-cormorant font-bold text-[#F9E2AF]">
										{activePhoto.step}
									</span>
									<span className="font-cinzel text-xs font-bold text-[#F3D797] tracking-wider uppercase">
										{activePhoto.title}
									</span>
								</div>
								<p className="font-cormorant text-xs text-stone-300 leading-relaxed px-2">
									{activePhoto.description}
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
