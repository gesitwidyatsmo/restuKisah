'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScalableOrnateFrame from '@/components/ui/ScalableOrnateFrame';
import BaroqueCartoucheFrame from './BaroqueCartoucheFrame';

export interface RoyalJavaneseQuoteOpeningProps {
	// Content Props
	badgeText?: string;
	arabicText?: string;
	translationText?: string;
	citationText?: string;

	// Framing & Asset Props
	cardFrameImage?: string;
	badgePlaqueImage?: string;
	backgroundImage?: string;
	topGarlandLeftImage?: string;
	topGarlandRightImage?: string;

	// Layout / Mode Props
	frameMode?: 'ornate_card' | 'scalable_frame' | 'vector_baroque';
	className?: string;
}

/**
 * RoyalJavaneseQuoteOpening
 *
 * Section "An Invitation of Love" (Kutipan Ayat Suci & Doa Pembuka) Adat Jawa.
 * Menggantikan file statis/flattened "quote-parchment-frame.webp" dengan susunan
 * aset modular:
 * 1. Latar belakang batik embossed keraton gelap (bg-batik-dark.webp)
 * 2. Background batik keraton dan ornamen islami elegan
 * 3. Kartu piagam bingkai ukir emas transparan (Ornate Golden Parchment Frame.webp)
 * 4. Tipografi responsif (Amiri untuk kaligrafi Arab, Cormorant Garamond untuk terjemahan, Cinzel untuk badge & sitasi)
 */
export default function RoyalJavaneseQuoteOpening({
	badgeText = 'AN INVITATION OF LOVE',
	arabicText = 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
	translationText = '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”',
	citationText = '(QS. Ar-Rum: 21)',
	cardFrameImage = '/templates/jawa/quote/Ornate Golden Parchment Frame.webp',
	badgePlaqueImage = '/templates/jawa/Ornate Brown Gold Capsule Plaque.webp',
	backgroundImage = '/templates/jawa/story/bg-batik-dark.webp',
	topGarlandLeftImage,
	topGarlandRightImage,
	frameMode = 'scalable_frame',
	className = '',
}: RoyalJavaneseQuoteOpeningProps) {
	// Komponen konten teks kutipan doa & ayat
	const renderQuoteContent = (isFixedAspect: boolean = false) => (
		<div className={`w-full flex flex-col items-center ${isFixedAspect ? 'h-full justify-between' : 'justify-center space-y-3 sm:space-y-4'}`}>
			{/* 1. BADGE: "AN INVITATION OF LOVE" DI DALAM ORNATE BROWN GOLD CAPSULE PLAQUE */}
			<motion.div
				initial={{ opacity: 0, y: -6 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='w-full flex items-center justify-center px-2'>
				<div className='relative w-[180px] xs:w-[195px] sm:w-[215px] aspect-[1991/313] flex items-center justify-center select-none filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]'>
					{/* Plaque Asset */}
					<img
						src={encodeURI(badgePlaqueImage)}
						alt=''
						aria-hidden='true'
						className='absolute inset-0 w-full h-full object-contain pointer-events-none'
					/>
					{/* Badge Text */}
					<span className='relative z-10 -mt-0.8 font-cinzel text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] md:text-[11.5px] font-bold tracking-[0.1em] sm:tracking-[0.1em] text-[#FFF6E5] uppercase select-text antialiased drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'>
						{badgeText}
					</span>
				</div>
			</motion.div>

			{/* 2. ARABIC VERSE: QS. AR-RUM: 21 */}
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
				className={`w-full flex flex-col items-center justify-center text-center ${isFixedAspect ? 'my-auto' : 'my-1 sm:my-2'}`}>
				<p
					dir='rtl'
					className='font-amiri font-bold text-[17.5px] xs:text-[19.5px] sm:text-[22px] md:text-[23.5px] leading-[1.85] sm:leading-[1.95] text-[#2C1810] text-center antialiased drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] select-text'>
					{arabicText}
				</p>

				{/* Golden Floral Motif Divider */}
				<div className='flex items-center justify-center gap-1.5 my-2 sm:my-2.5'>
					<span className='h-[0.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#B58A45]/70' />
					<span className='text-[#B58A45] text-[8.5px] sm:text-[9.5px]'>❖</span>
					<span className='h-[0.5px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#B58A45]/70' />
				</div>
			</motion.div>

			{/* 3. INDONESIAN TRANSLATION & CITATION */}
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
				className={`w-full flex flex-col items-center justify-center text-center ${isFixedAspect ? 'mt-auto' : ''}`}>
				<p className='font-serif italic text-[12.5px] xs:text-[13px] sm:text-[14px] md:text-[14.5px] leading-relaxed sm:leading-[1.7] text-[#3D2517] font-normal text-center select-text antialiased'>
					{translationText}
				</p>

				{/* Surah Citation */}
				<div className='mt-2.5 sm:mt-3'>
					<span className='font-cinzel text-[10px] xs:text-[11px] sm:text-[12px] font-bold tracking-wide text-[#65422F] uppercase select-text antialiased'>{citationText}</span>
				</div>
			</motion.div>
		</div>
	);

	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/40 ring-1 ring-[#B58A45]/20 bg-[#281309] select-none text-[#FFF6E5] flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 sm:px-1.5 ${className}`}
			aria-label='An Invitation of Love - Quote & Opening Prayer'>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: DEEP RICH JAVANESE EMBOSSED BATIK PAPER            */}
			{/* ----------------------------------------------------------------- */}
			<img
				src={backgroundImage}
				alt='Latar Belakang Batik Keraton Jawa'
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.88] contrast-[1.05]'
			/>

			{/* Warm Ambient Vignette for Keraton Royal Feel */}
			<div className='absolute inset-0 bg-radial from-transparent via-[#1B0C06]/40 to-[#0F0603]/85 pointer-events-none z-0' />

			{/* ----------------------------------------------------------------- */}
			{/* 2. CENTER CARD FRAME (MODULAR / ELASTIS / CRISP VEKTOR)           */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full flex flex-col items-center justify-center'>
				{frameMode === 'vector_baroque' ? (
					<BaroqueCartoucheFrame className='w-full max-w-[432px] sm:max-w-[470px] mx-auto py-4 sm:py-5 px-8 sm:px-10 flex flex-col items-center justify-center text-center filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]'>
						{renderQuoteContent(false)}
					</BaroqueCartoucheFrame>
				) : frameMode === 'ornate_card' ? (
					/* Mode: Ornate Golden Parchment Frame Card (Ramping & Proporsional dengan Margin Seimbang) */
					<div className='relative w-full aspect-[1086/1520] max-w-[432px] sm:max-w-[470px] mx-auto filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)] select-none'>
						{/* Transparent Parchment Frame Asset */}
						<img
							src={cardFrameImage}
							alt='Bingkai Piagam Emas Jawa'
							className='absolute inset-0 w-full h-full object-fill pointer-events-none z-0'
						/>

						{/* Content Container positioned precisely within the ivory parchment area with safe padding from all borders */}
						<div
							className='relative z-10 w-full h-full flex flex-col items-center justify-between text-center pointer-events-auto'
							style={{
								paddingTop: '18%',
								paddingBottom: '18%',
								paddingLeft: '11.5%',
								paddingRight: '11.5%',
							}}>
							{renderQuoteContent(true)}
						</div>
					</div>
				) : (
					/* Default: Scalable 3-Slice Ornate Frame (Margin Ringkas & Padding Teks Optimal) */
					<ScalableOrnateFrame
						src={cardFrameImage}
						originalWidth={1086}
						originalHeight={1448}
						slice={{ top: 355, bottom: 350, isPercentage: false }}
						mode='3-slice'
						overlapPx={1}
						className='w-full max-w-[432px] sm:max-w-[470px] mx-auto filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]'
						contentClassName='w-full px-[9.5%] xs:px-[10.5%] sm:px-[11.5%] py-1.5 sm:py-2.5 flex flex-col items-center justify-center text-center'>
						{renderQuoteContent(false)}
					</ScalableOrnateFrame>
				)}
			</div>
		</section>
	);
}
