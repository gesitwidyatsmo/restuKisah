'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface RoyalJavaneseClosingCreditsProps {
	// Main typography
	maturNuwunText?: string;
	thankYouLine1?: string;
	thankYouLine2?: string;
	coupleTitle?: string;

	// Platform credits
	invitationByText?: string;
	platformName?: string;
	platformUrl?: string;
	platformLogoImage?: string;

	// Decorative assets from public directory
	backgroundImage?: string;
	gununganImage?: string;
	cornerFlourishImage?: string;
	dividerFlowerImage?: string;
	jasmineCarvingImage?: string;
	bottomBannerImage?: string;
	bottomCarvingImage?: string;

	className?: string;
}

export default function RoyalJavaneseClosingCredits({
	maturNuwunText = 'Matur Nuwun',
	thankYouLine1 = 'Terima kasih telah menjadi bagian',
	thankYouLine2 = 'dari hari bahagia kami',
	coupleTitle = 'Angela & Miko',

	invitationByText = 'A Digital Wedding Invitation by',
	platformName = 'RestuKisah',
	platformUrl = '/',
	platformLogoImage = '/logo/restukisah-logo-text-below.png',

	backgroundImage = '/templates/jawa/story/bg-batik-dark.webp',
	gununganImage = '/templates/jawa/Golden Javanese Gunungan with Acanthus Scrollwork.webp',
	cornerFlourishImage = '/templates/jawa/story/corner-flourish.webp',
	dividerFlowerImage = '/templates/jawa/hero/divider-gold-flower.webp',
	jasmineCarvingImage = '/templates/jawa/Javanese Gold and Jasmine Carving.webp',
	bottomBannerImage = '/templates/jawa/hero/banner-batik-bottom.webp',
	bottomCarvingImage = '/templates/jawa/cover/carving-bottom.webp',

	className = '',
}: RoyalJavaneseClosingCreditsProps) {
	return (
		<section
			aria-label='Section 12: Closing & Platform Credit'
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/50 ring-1 ring-[#B58A45]/30 bg-[#241209] select-none text-[#FFF6E5] flex flex-col justify-between min-h-[780px] sm:min-h-[850px] ${className}`}>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: DEEP RICH MAHOGANY WOOD & JAVANESE EMBOSSED BATIK */}
			{/* ----------------------------------------------------------------- */}
			<img
				src={backgroundImage}
				alt='Batik Background'
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.78] contrast-[1.12]'
			/>

			{/* Warm Mahogany & Radial Vignette Overlay */}
			<div
				className='absolute inset-0 pointer-events-none z-0'
				style={{
					background: 'radial-gradient(ellipse at 50% 45%, rgba(105, 52, 28, 0.42) 0%, rgba(38, 18, 9, 0.78) 60%, rgba(18, 8, 4, 0.94) 100%)',
				}}
			/>

			{/* Subtle Horizontal Wood Grain Lines Overlay */}
			<div
				className='absolute inset-0 pointer-events-none z-0 opacity-15'
				style={{
					backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.5) 3px, rgba(0, 0, 0, 0.5) 4px)',
				}}
			/>

			{/* Inner Ornate Gold Border Line */}
			<div className='absolute inset-3 sm:inset-4 border border-[#D4AF37]/25 rounded-[28px] sm:rounded-[36px] pointer-events-none z-10' />

			{/* ----------------------------------------------------------------- */}
			{/* 2. TOP CORNER ORNATE GOLDEN BAROQUE CARVING FLOURISHES            */}
			{/* ----------------------------------------------------------------- */}
			<div className='absolute top-2 left-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none z-10 opacity-80'>
				<img
					src={cornerFlourishImage}
					alt='Corner Ornament Top Left'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]'
				/>
			</div>
			<div className='absolute top-2 right-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none z-10 opacity-80 scale-x-[-1]'>
				<img
					src={cornerFlourishImage}
					alt='Corner Ornament Top Right'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]'
				/>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 3. MAIN CARD CONTENT: SACRED GUNUNGAN, TITLES, FLOWERS, CREDITS   */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-20 w-full flex-1 flex flex-col items-center justify-between pt-3.5 sm:pt-5 pb-0 pointer-events-auto'>
				{/* 3A. TOP SECTION: SACRED GOLDEN GUNUNGAN WITH ACANTHUS SCROLLWORK */}
				<motion.div
					initial={{ opacity: 0, y: -16, scale: 0.92 }}
					whileInView={{ opacity: 1, y: 0, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className='flex flex-col items-center justify-center relative w-full pt-1 px-4 sm:px-6 -mb-1'>
					<img
						src={gununganImage}
						alt='Golden Javanese Gunungan with Acanthus Scrollwork'
						className='w-full max-w-[270px] sm:max-w-[310px] md:max-w-[340px] h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.92)] relative z-10'
					/>
				</motion.div>

				{/* 3B. MIDDLE SECTION: MATUR NUWUN & COUPLE NAME WITH GOLDEN DIVIDERS */}
				<div className='flex flex-col items-center text-center w-full px-4 sm:px-6 my-auto py-1'>
					{/* "Matur Nuwun" Heading (Rapat dengan Gunungan) */}
					<motion.h2
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
						className='font-serif italic text-3xl sm:text-4xl md:text-[40px] text-[#F5E6CC] font-normal tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight select-text mt-0.5'>
						{maturNuwunText}
					</motion.h2>

					{/* Divider 1: Delicate Gold Floral Ornament */}
					<motion.div
						initial={{ opacity: 0, scale: 0.85 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.25 }}
						className='flex items-center justify-center gap-2 my-1.5 sm:my-2 w-full max-w-[190px] sm:max-w-[220px]'>
						<span className='h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#D4AF37]' />
						<img
							src={dividerFlowerImage}
							alt='Divider'
							className='h-3.5 sm:h-4 w-auto object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
						/>
						<span className='h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#D4AF37]' />
					</motion.div>

					{/* Subtitle: "Thank You For Being Part of Our Special Day" */}
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
						className='font-serif italic text-[14px] sm:text-[16px] md:text-[17.5px] text-[#EAD8BD] font-normal leading-snug sm:leading-relaxed tracking-wide select-text px-2'>
						<p>{thankYouLine1}</p>
						<p>{thankYouLine2}</p>
					</motion.div>

					{/* Divider 2: Matching Gold Floral Ornament */}
					<motion.div
						initial={{ opacity: 0, scale: 0.85 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.45 }}
						className='flex items-center justify-center gap-2 my-1.5 sm:my-2 w-full max-w-[190px] sm:max-w-[220px]'>
						<span className='h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#D4AF37]' />
						<img
							src={dividerFlowerImage}
							alt='Divider'
							className='h-3.5 sm:h-4 w-auto object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
						/>
						<span className='h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#D4AF37]' />
					</motion.div>

					{/* Couple Title: "Nadia & Arjuna" */}
					<motion.h3
						initial={{ opacity: 0, y: 8 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
						className='font-serif italic text-2xl sm:text-[28px] md:text-[32px] text-[#F3E2C4] font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-text mt-0.5 mb-1.5'>
						{coupleTitle}
					</motion.h3>

					{/* 3C. JAVANESE GOLD AND JASMINE CARVING (WHITE JASMINE BLOSSOMS & TEAK SCROLLWORK) */}
					<motion.div
						initial={{ opacity: 0, scale: 0.94 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
						className='relative flex items-center justify-center w-full max-w-[310px] sm:max-w-[350px] md:max-w-[370px] mt-0.5 mb-0'>
						<img
							src={jasmineCarvingImage}
							alt='Javanese Gold and Jasmine Carving'
							className='w-full h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]'
						/>
					</motion.div>
				</div>

				{/* 3D. BOTTOM PLATFORM CREDIT & FOOTER BANNER GROUP */}
				<div className='relative w-full flex flex-col items-center pointer-events-auto z-20 mt-auto pt-1'>
					{/* Credit Eyebrow & Logo (Jarak Rapat dengan Ornamen Melati di Atasnya) */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: 0.7 }}
						className='relative w-full flex flex-col items-center justify-center px-4 pt-1 sm:pt-2 pb-0.5 z-20'>
						{/* Credit Eyebrow: "A DIGITAL WEDDING INVITATION BY" */}
						<span className='font-sans text-[9.5px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8C1A5] text-center mb-2 sm:mb-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'>
							{invitationByText}
						</span>

						{/* Brand Row with Horizontal Flanking Rules & Large Logo */}
						<div className='flex items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-[320px] sm:max-w-[360px]'>
							{/* Left Flanking Gold Line */}
							<span className='h-[1.5px] flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[75px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-[#D4AF37]' />

							{/* Large Brand Link with Logo (Heart + Text Underneath) */}
							<a
								href={platformUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex flex-col items-center group transition-transform duration-300 hover:scale-105 px-1.5'
								title={`${platformName} — All-in-One Wedding OS & Digital Invitation Platform`}>
								<img
									src={platformLogoImage}
									alt={`${platformName} Logo`}
									className='w-28 sm:w-32 md:w-36 h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
								/>
							</a>

							{/* Right Flanking Gold Line */}
							<span className='h-[1.5px] flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[75px] bg-gradient-to-l from-transparent via-[#D4AF37]/80 to-[#D4AF37]' />
						</div>
					</motion.div>

					{/* Bottom Draped Batik Banner & Carving (Jarak Rapat di Bawah Logo) */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: 0.8 }}
						className='relative w-full flex flex-col items-center justify-end -mb-1 sm:-mb-2 z-10 pointer-events-none mt-0.5 sm:mt-1'>
						{/* Rich Javanese Draped Batik Arch Banner */}
						<img
							src={bottomBannerImage}
							alt='Batik Bottom Arch Banner'
							className='w-full h-auto object-cover opacity-95 filter drop-shadow-[0_-4px_14px_rgba(0,0,0,0.85)]'
						/>

						{/* Bottom Center Floral Carved Finial */}
						<img
							src={bottomCarvingImage}
							alt='Bottom Center Carved Finial'
							className='w-18 sm:w-22 md:w-26 h-auto object-contain absolute bottom-1 sm:bottom-1.5 z-20 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]'
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
