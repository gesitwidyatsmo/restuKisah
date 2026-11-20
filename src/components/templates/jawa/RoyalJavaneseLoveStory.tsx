'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface LoveStoryMilestone {
	id: string;
	step: string;
	title: string;
	description: string;
	image: string;
	imageAlt?: string;
	layout: 'badge-left' | 'badge-right';
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
			imageAlt: 'First Meeting di Kampus',
			layout: 'badge-left',
		},
		{
			id: 'the-proposal',
			step: '02',
			title: 'THE PROPOSAL',
			description:
				'Setelah saling mengenal lebih dalam, kami semakin yakin untuk melangkah bersama. Dengan penuh doa dan restu keluarga, ia datang dengan niat baik, mengikat komitmen untuk masa depan yang sama.',
			image: '/adat-jawa-cover/Warm Lamaran Portrait with Floral Elegance.webp',
			imageAlt: 'Momen Lamaran & Komitmen Bersama',
			layout: 'badge-right',
		},
		{
			id: 'the-wedding',
			step: '03',
			title: 'THE WEDDING',
			description:
				'Kini, kami siap memulai babak baru dalam hidup. Bukan lagi dua individu, melainkan satu perjalanan hidup bersama, membangun rumah tangga yang diridhai Allah, penuh cinta, dan saling melengkapi.',
			image: '/adat-jawa-cover/Warm Wedding Portrait in Paes Ageng.webp',
			imageAlt: 'Pawiwahan Ageng Pernikahan Adat Jawa',
			layout: 'badge-left',
		},
	],
	backgroundImage = '/adat-jawa-cover/komponen adat jawa/background/Elegant Javanese Batik Embossed Background.webp',
	topCrestImage = '/adat-jawa-cover/cover/3. Ornate Golden Wood Crest.webp',
	topGarlandLeftImage = '/templates/jawa/hero/jasmine-cascade-hanging.webp',
	topGarlandRightImage = '/templates/jawa/hero/jasmine-cascade-hanging.webp',
	headerDividerImage = '/adat-jawa-cover/komponen adat jawa/Ornament Library/Ornate Golden Floral Divider.webp',
	archFrameImage = '/adat-jawa-cover/Ornate Golden Arch Frame with Jasmine Accents.webp',
	badgeFrameImage = '/adat-jawa-cover/Ornate Golden Parchment Badge.webp',
	rosetteImage = '/adat-jawa-cover/golden_rosette_node.webp',
	bottomGununganImage = '/adat-jawa-cover/cover/7. Ornate Golden Javanese Gunungan Ornament.webp',
	bottomBorderImage = '/adat-jawa-cover/komponen adat jawa/Ornate Javanese Batik Gold Border-2.webp',
	className = '',
}: RoyalJavaneseLoveStoryProps) {
	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/40 ring-1 ring-[#B58A45]/20 bg-[#281309] select-none text-[#FFF6E5] flex flex-col justify-between ${className}`}
			aria-label="Our Love Story Timeline"
		>
			{/* SVG Definition for Perfect Arch Photo Clipping */}
			<svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
				<defs>
					<clipPath id="javanese-arch-frame-clip" clipPathUnits="objectBoundingBox">
						<path d="M 0.0953 0.2302 L 0.0724 0.2886 L 0.0739 0.7256 L 0.1052 0.7815 L 0.1494 0.8040 L 0.1578 0.8382 L 0.1883 0.8457 L 0.2149 0.8782 L 0.7630 0.8849 L 0.8110 0.8457 L 0.8346 0.8457 L 0.8491 0.8048 L 0.8880 0.7873 L 0.9146 0.7548 L 0.9276 0.7064 L 0.9245 0.2752 L 0.9040 0.2302 L 0.8483 0.1952 L 0.8323 0.1568 L 0.8064 0.1551 L 0.7736 0.1043 L 0.7325 0.0909 L 0.5877 0.0901 L 0.5305 0.0592 L 0.5000 0.0792 L 0.4688 0.0592 L 0.3956 0.0926 L 0.2591 0.0917 L 0.2233 0.1059 L 0.1928 0.1551 L 0.1669 0.1568 L 0.1509 0.1952 Z" />
					</clipPath>
				</defs>
			</svg>
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
				{/* Central Vertical Golden Timeline Spine */}
				<div
					className="absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-[2px] pointer-events-none z-10"
					style={{
						background:
							'linear-gradient(to bottom, rgba(212, 175, 55, 0.2) 0%, rgba(243, 215, 151, 0.95) 15%, rgba(212, 175, 55, 1) 50%, rgba(243, 215, 151, 0.95) 85%, rgba(212, 175, 55, 0.2) 100%)',
						boxShadow: '0 0 6px rgba(243, 215, 151, 0.6), 0 0 12px rgba(181, 138, 69, 0.3)',
					}}
				/>

				{/* Top Rosette Node on Spine */}
				<div className="absolute left-1/2 -translate-x-1/2 -top-0.5 z-20 pointer-events-none">
					<img
						src={rosetteImage}
						alt="Rosette Node"
						className="w-4 sm:w-5 h-4 sm:h-5 object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
					/>
				</div>

				{/* Milestones List */}
				{stories.map((item, index) => {
					const isBadgeLeft = item.layout === 'badge-left';

					// Render Parchment Badge Card
					const renderBadgeCard = () => (
						<div className="relative w-full aspect-[1312/1199] flex items-center justify-center">
							{/* Outer Parchment Badge Frame Image */}
							<img
								src={badgeFrameImage}
								alt="Parchment Badge Frame"
								className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
							/>

							{/* Step Pill: "01", "02", "03" Overlapping Top Center */}
							<div className="absolute top-[2%] xs:top-[2.5%] sm:top-[3%] left-1/2 -translate-x-1/2 z-20">
								<div className="relative px-2 xs:px-2.5 sm:px-3 py-0.5 rounded-full bg-[#3B1E0F] border-[1.2px] sm:border-[1.5px] border-[#D4AF37] shadow-[0_2px_5px_rgba(0,0,0,0.7)] ring-1 ring-amber-300/40 flex items-center justify-center">
									<span className="font-cormorant font-bold text-[9.5px] xs:text-[10.5px] sm:text-[12px] text-[#F9E2AF] tracking-widest leading-none">
										{item.step}
									</span>
								</div>
							</div>

							{/* Inner Badge Text Content */}
							<div className="relative z-10 w-[84%] xs:w-[82%] sm:w-[80%] pt-3 xs:pt-3.5 sm:pt-4 pb-1 sm:pb-1.5 px-1 flex flex-col items-center text-center justify-center">
								{/* Title: FIRST MEETING / THE PROPOSAL / THE WEDDING */}
								<h3 className="font-cormorant font-bold italic tracking-[0.08em] sm:tracking-[0.1em] text-[10.5px] xs:text-[11.5px] sm:text-[13.5px] text-[#2C1810] leading-tight uppercase">
									{item.title}
								</h3>

								{/* Small Floral Divider */}
								<div className="flex items-center justify-center gap-1 my-0.5 opacity-80">
									<span className="h-[0.5px] w-3.5 sm:w-5 bg-gradient-to-r from-transparent to-[#B58A45]" />
									<span className="text-[#966B24] text-[7px] xs:text-[8px] sm:text-[9px]">❖</span>
									<span className="h-[0.5px] w-3.5 sm:w-5 bg-gradient-to-l from-transparent to-[#B58A45]" />
								</div>

								{/* Story Narrative Description */}
								<p className="font-cormorant font-medium text-[7.8px] xs:text-[8.5px] sm:text-[9.8px] text-[#3B2213] leading-[1.22] xs:leading-[1.28] sm:leading-[1.34] tracking-normal">
									{item.description}
								</p>
							</div>
						</div>
					);

					// Render Framed Photo with Jasmine Accents
					const renderPhotoCard = () => (
						<div className="relative w-full aspect-[1312/1199] group overflow-visible flex items-center justify-center">
							{/* Photo container automatically clipped by exact arch contour */}
							<div
								className="relative w-full h-full overflow-hidden"
								style={{
									clipPath: 'url(#javanese-arch-frame-clip)',
									WebkitClipPath: 'url(#javanese-arch-frame-clip)',
									maskImage: 'url(/adat-jawa-cover/arch-inner-mask.webp)',
									WebkitMaskImage: 'url(/adat-jawa-cover/arch-inner-mask.webp)',
									maskSize: 'contain',
									WebkitMaskSize: 'contain',
									maskRepeat: 'no-repeat',
									WebkitMaskRepeat: 'no-repeat',
									maskPosition: 'center',
									WebkitMaskPosition: 'center',
								}}
							>
								<motion.img
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.5, ease: 'easeOut' }}
									src={item.image}
									alt={item.imageAlt || item.title}
									className="w-full h-full object-cover object-center transform-gpu"
								/>
							</div>

							{/* Golden Arch Frame Overlay with Jasmine Flowers on corner */}
							<img
								src={archFrameImage}
								alt="Ornate Golden Arch Frame"
								className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)]"
							/>
						</div>
					);

					return (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 25 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-40px' }}
							transition={{ duration: 0.7, delay: index * 0.15 }}
							className="relative w-full grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 items-center"
						>
							{/* Center Rosette Node for this Milestone */}
							<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
								<img
									src={rosetteImage}
									alt="Rosette Milestone Node"
									className="w-5 sm:w-6 h-5 sm:h-6 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
								/>
							</div>

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
				{/* Bottom Center Golden Rosette before Gunungan */}
				<div className="w-4 sm:w-5 h-4 sm:h-5 -mb-2 z-20 pointer-events-none">
					<img
						src={rosetteImage}
						alt="Rosette Bottom Node"
						className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
					/>
				</div>

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
		</section>
	);
}
