'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart } from 'lucide-react';

export interface RoyalJavaneseHeroCountdownProps {
	brideName?: string;
	groomName?: string;
	coupleTitle?: string;
	weddingDateFormatted?: string;
	targetDateISO?: string;
	calendarButtonText?: string;
	countdownLabels?: {
		days: string;
		hours: string;
		minutes: string;
		seconds: string;
	};
	heroImage?: string;
	eventLocation?: string;
	eventTitle?: string;
	eventDescription?: string;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export default function RoyalJavaneseHeroCountdown({
	brideName,
	groomName,
	coupleTitle,
	weddingDateFormatted = 'Selasa, 16 June 2027',
	targetDateISO = '2027-06-16T09:00:00+07:00',
	calendarButtonText = 'Save the Date',
	countdownLabels = {
		days: 'Hari',
		hours: 'Jam',
		minutes: 'Menit',
		seconds: 'Detik',
	},
	heroImage = '/templates/jawa/hero/portrait-couple.webp',
	eventLocation = 'Gedung Sasana Kriya, Taman Mini Indonesia Indah, Jakarta',
	eventTitle,
	eventDescription,
}: RoyalJavaneseHeroCountdownProps) {
	const [hasMounted, setHasMounted] = useState(false);
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 30,
		hours: 12,
		minutes: 45,
		seconds: 20,
	});

	// Calculate dynamic countdown
	useEffect(() => {
		setHasMounted(true);

		const calculateTimeLeft = () => {
			const targetTime = new Date(targetDateISO).getTime();
			const now = new Date().getTime();
			const difference = targetTime - now;

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / (1000 * 60)) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				});
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			}
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(timer);
	}, [targetDateISO]);

	// Determine couple names for uppercase display
	let displayBride = brideName;
	let displayGroom = groomName;

	if (!displayBride || !displayGroom) {
		if (coupleTitle) {
			const parts = coupleTitle.split(/\s+dan\s+|\s+&\s+/i);
			if (parts.length >= 2) {
				displayGroom = displayGroom || parts[0].trim();
				displayBride = displayBride || parts[1].trim();
			} else {
				displayBride = displayBride || 'BRIDE NAME';
				displayGroom = displayGroom || 'GROOM NAME';
			}
		} else {
			displayBride = displayBride || 'BRIDE NAME';
			displayGroom = displayGroom || 'GROOM NAME';
		}
	}

	const coupleHeading = `${displayBride.toUpperCase()} & ${displayGroom.toUpperCase()}`;

	// Google Calendar URL Generator
	const coupleDisplayTitle = eventTitle || `The Wedding of ${displayBride} & ${displayGroom}`;
	const coupleDisplayDesc = eventDescription || `The Royal Wedding of ${displayBride} & ${displayGroom}.`;

	const getGoogleCalendarUrl = () => {
		try {
			const startDate = new Date(targetDateISO);
			const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration

			const formatDate = (date: Date) => {
				return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
			};

			const datesParam = `${formatDate(startDate)}/${formatDate(endDate)}`;
			return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(coupleDisplayTitle)}&dates=${datesParam}&details=${encodeURIComponent(
				coupleDisplayDesc,
			)}&location=${encodeURIComponent(eventLocation)}`;
		} catch {
			return 'https://calendar.google.com';
		}
	};

	const countdownUnits = [
		{ value: hasMounted ? String(timeLeft.days).padStart(2, '0') : '30', label: countdownLabels.days },
		{ value: hasMounted ? String(timeLeft.hours).padStart(2, '0') : '12', label: countdownLabels.hours },
		{ value: hasMounted ? String(timeLeft.minutes).padStart(2, '0') : '45', label: countdownLabels.minutes },
		{ value: hasMounted ? String(timeLeft.seconds).padStart(2, '0') : '20', label: countdownLabels.seconds },
	];

	return (
		<section className='relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border border-[#B58A45]/30 bg-[#FAF7F0] select-none text-[#392319]'>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: EMBOSSED JAVANESE FLORAL CREAM PAPER               */}
			{/* ----------------------------------------------------------------- */}
			<img
				src='/templates/jawa/hero/bg-cream-embossed.webp'
				alt=''
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0'
			/>
			<div className='absolute inset-0 bg-radial from-transparent via-[#FAF7F0]/15 to-[#FAF7F0]/30 pointer-events-none z-0' />

			{/* ----------------------------------------------------------------- */}
			{/* 2. MAIN PORTRAIT: COUPLE, BAROQUE ARCH FRAME & FLORAL ORNAMENTS   */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-20 w-[94%] max-w-[430px] mx-auto mt-3 sm:mt-4 aspect-[1312/1199]'>
				{/* Layer 1: Inner Arch Mask + Warm Studio Bokeh Backdrop + Couple Portrait */}
				<div
					className='absolute z-0 overflow-hidden'
					style={{
						left: '17.8%',
						top: '18.5%',
						width: '64.4%',
						height: '77.5%',
						borderRadius: '50% 50% 2% 2% / 39% 39% 2% 2%',
						background:
							'radial-gradient(circle at 18% 38%, rgba(215, 192, 155, 0.55) 0%, transparent 38%), radial-gradient(circle at 82% 44%, rgba(168, 140, 105, 0.45) 0%, transparent 40%), radial-gradient(circle at 50% 30%, #725D47 0%, #4A3A2C 70%, #3B2D21 100%)',
					}}>
					<img
						src={heroImage}
						alt='Mempelai'
						className='w-full h-full object-cover object-top'
					/>
				</div>

				{/* Layer 2: Ornate Golden Baroque Arch Frame (Clean & Symmetrical) */}
				<img
					src='/templates/jawa/hero/frame-baroque-gold.webp'
					alt=''
					className='absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-md'
				/>

				{/* Layer 3: Clean White Jasmine & Foliage Bouquets at Bottom Corners */}
				<div
					className='absolute pointer-events-none z-20'
					style={{ left: '-1%', bottom: '0.5%', width: '36%' }}>
					<img
						src='/templates/jawa/hero/flower-corner-left.png'
						alt=''
						className='w-full h-auto object-contain filter drop-shadow-xs'
					/>
				</div>
				<div
					className='absolute pointer-events-none z-20'
					style={{ right: '-1%', bottom: '0.5%', width: '36%' }}>
					<img
						src='/templates/jawa/hero/flower-corner-right.png'
						alt=''
						className='w-full h-auto object-contain filter drop-shadow-xs'
					/>
				</div>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 4. COUPLE INFORMATION & TYPOGRAPHY                                */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-20 mt-2 sm:mt-3 px-4 flex flex-col items-center text-center '>
				{/* Intro Label: "The Wedding of" */}
				<p className='font-serif italic text-2xl sm:text-[28px] text-[#543622] leading-tight mb-0.5'>The Wedding of</p>

				{/* Delicate Golden Floral Divider */}
				<div className='w-44 my-4 sm:w-52 h-5 sm:h-6 my-0.5 flex items-center justify-center'>
					<img
						src='/templates/jawa/hero/divider-gold-flower.webp'
						alt=''
						className='w-full h-auto object-contain filter drop-shadow-xs'
					/>
				</div>

				{/* Couple Names in All Caps Serif */}
				<h1 className='font-serif text-xl sm:text-2xl font-medium tracking-[0.14em] sm:tracking-[0.18em] text-[#3D2517] uppercase mt-1 mb-2.5'>{coupleHeading}</h1>

				{/* --------------------------------------------------------------- */}
				{/* PLAKAT TANGGAL: ORNATE GOLDEN FLORAL LABEL                       */}
				{/* --------------------------------------------------------------- */}
				<div className='relative w-full max-w-[320px] sm:max-w-[360px] aspect-[2172/724] flex items-center justify-center my-1.5 sm:my-2'>
					<img
						src='/templates/jawa/hero/ornate-golden-floral-label.webp'
						alt=''
						className='absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-xs'
					/>
					<span className='relative z-10 font-serif text-base sm:text-lg font-semibold tracking-wide text-[#3D2517] px-8 sm:px-10 pb-0.5'>{weddingDateFormatted}</span>
				</div>

				{/* --------------------------------------------------------------- */}
				{/* 5. COUNTDOWN: 4 SCALLOPED ORNATE GOLDEN BOXES                    */}
				{/* --------------------------------------------------------------- */}
				<div className='grid grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-[360px] sm:max-w-[390px] mx-auto mt-3.5 mb-3'>
					{countdownUnits.map((unit, index) => (
						<div
							key={index}
							className='relative aspect-[1156/1360] flex flex-col items-center justify-center p-2'>
							<img
								src='/templates/jawa/hero/countdown-box-frame.webp'
								alt=''
								className='absolute inset-0 w-full h-full object-contain pointer-events-none filter drop-shadow-xs'
							/>
							<span className='relative z-10 font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#392319] leading-none mb-0.5 sm:mb-1'>{unit.value}</span>
							<span className='relative z-10 font-serif text-[10px] sm:text-xs font-semibold text-[#65422F]'>{unit.label}</span>
						</div>
					))}
				</div>

				{/* --------------------------------------------------------------- */}
				{/* 6. TOMBOL SIMPAN TANGGAL: ORNATE ANTIQUE GOLD PLAQUE             */}
				{/* --------------------------------------------------------------- */}
				<motion.a
					href={getGoogleCalendarUrl()}
					target='_blank'
					rel='noopener noreferrer'
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					className='relative z-20 inline-flex items-center justify-center w-[230px] sm:w-[260px] aspect-[2172/724] cursor-pointer my-1 group transition-transform'>
					<img
						src='/templates/jawa/hero/ornate-antique-gold-plaque.webp'
						alt=''
						className='absolute inset-0 w-full h-full object-contain pointer-events-none filter drop-shadow-md group-hover:brightness-105 transition-all'
					/>
					<div className='relative z-10 flex items-center justify-center gap-2 text-[#FFF9F0] pb-0.5 px-6'>
						<CalendarHeart className='w-4 h-4 sm:w-5 sm:h-5 text-[#FFF9F0] drop-shadow-xs' />
						<span className='font-serif text-sm sm:text-base font-bold tracking-wide text-[#FFF9F0] drop-shadow-[0_1px_2px_rgba(40,20,5,0.7)]'>{calendarButtonText}</span>
					</div>
				</motion.a>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 7. BOTTOM DECORATIVE BATIK BANNER & GOLDEN CARVED WOOD CREST      */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative w-full mt-2 flex flex-col items-center justify-end pointer-events-none overflow-hidden'>
				{/* Center Crest overlapping banner */}
				<div className='relative z-10 w-36 sm:w-44 -mb-5 sm:-mb-6'>
					<img
						src='/templates/jawa/hero/crest-wood-gold.webp'
						alt=''
						className='w-full h-auto object-contain filter drop-shadow-md'
					/>
				</div>
				{/* Bottom Batik Banner */}
				<div className='relative z-0 w-full'>
					<img
						src='/templates/jawa/hero/banner-batik-bottom.webp'
						alt=''
						className='w-full h-auto object-cover object-bottom'
					/>
				</div>
			</div>
		</section>
	);
}
