'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

export interface WeddingEventItem {
	id: string;
	title: string;
	subtitle: string;
	date: string;
	time: string;
	venueName: string;
	address: string;
	image: string;
	imageAlt?: string;
	calendarUrl?: string;
}

export interface RoyalJavaneseWeddingEventsLocationProps {
	// Section Header
	sectionTitle?: string;
	topCrestImage?: string;
	topGarlandLeftImage?: string;
	topGarlandRightImage?: string;
	headerDividerImage?: string;

	// Events List (Akad Nikah, Resepsi, Unduh Mantu)
	events?: WeddingEventItem[];

	// Location Card
	locationTitle?: string;
	locationVenueName?: string;
	locationAddress?: string;
	locationImage?: string;
	googleMapsUrl?: string;
	googleMapsButtonText?: string;

	// Framing & Assets
	cardFrameImage?: string;
	bottomOrnamentImage?: string;
	backgroundImage?: string;

	// Additional styling
	className?: string;
}

export default function RoyalJavaneseWeddingEventsLocation({
	sectionTitle = 'The Wedding Celebration',
	topCrestImage = '/templates/jawa/common/crest-wood-gold.webp',
	topGarlandLeftImage = '/templates/jawa/common/jasmine-cascade-hanging.webp',
	topGarlandRightImage = '/templates/jawa/common/jasmine-cascade-hanging.webp',
	headerDividerImage = '/templates/jawa/common/divider-gold-floral.webp',

	events = [
		{
			id: 'akad-nikah',
			title: 'Akad Nikah',
			subtitle: 'WEDDING CEREMONY',
			date: 'Sabtu, 21 Juni 2025',
			time: '08.00 – 10.00 WIB',
			venueName: 'Masjid Al-Ikhlas',
			address: 'Jl. Merpati No. 12, Desa Sumberrejo, Kec. Ngemplak, Kab. Sleman',
			image: '/templates/jawa/events/event-akad.webp',
			imageAlt: 'Ornate Islamic Wedding Arch with Quran and Rings',
		},
		{
			id: 'resepsi-pernikahan',
			title: 'Resepsi Pernikahan',
			subtitle: 'WEDDING RECEPTION',
			date: 'Sabtu, 21 Juni 2025',
			time: '11.00 – 14.00 WIB',
			venueName: 'Gedung Graha Kencana',
			address: 'Jl. Melati No. 45, Desa Sumberrejo, Kec. Ngemplak, Kab. Sleman',
			image: '/templates/jawa/events/event-resepsi.webp',
			imageAlt: 'Ornate Golden Wedding Canopy',
		},
		{
			id: 'unduh-mantu',
			title: 'Unduh Mantu',
			subtitle: 'ADDITIONAL RECEPTION',
			date: 'Minggu, 22 Juni 2025',
			time: '10.00 – 13.00 WIB',
			venueName: 'Pendopo Keluarga Besar',
			address: 'Jl. Kenanga No. 8, Desa Wonosari, Kec. Ngemplak, Kab. Sleman',
			image: '/templates/jawa/events/event-unduh-mantu.webp',
			imageAlt: 'Ornate Javanese Pavilion with Jasmine Flowers',
		},
	],

	locationTitle = 'Location',
	locationVenueName = 'Gedung Graha Kencana',
	locationAddress = 'Jl. Melati No. 45, Desa Sumberrejo, Kec. Ngemplak, Kab. Sleman',
	locationImage = '/templates/jawa/events/map-pin.webp',
	googleMapsUrl = 'https://maps.google.com/?q=Gedung+Graha+Kencana+Desa+Sumberrejo+Ngemplak+Sleman',
	googleMapsButtonText = 'Open Google Maps',

	cardFrameImage = '/templates/jawa/events/card-banner.webp',
	bottomOrnamentImage = '/templates/jawa/common/batik-gold-border.webp',
	backgroundImage = '/templates/jawa/common/bg-cream-embossed.webp',

	className = '',
}: RoyalJavaneseWeddingEventsLocationProps) {
	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border border-[#B58A45]/30 bg-[#FAF6EE] select-none text-[#2C1810] flex flex-col justify-between ${className}`}
			aria-label='Acara Pernikahan dan Lokasi'>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: EMBOSSED JAVANESE FLORAL CREAM PAPER               */}
			{/* ----------------------------------------------------------------- */}
			<img
				src={backgroundImage}
				alt='Background Paper Embossed'
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0'
			/>

			{/* Subtle Warm Vignette Overlay for Keraton Royal Feel */}
			<div className='absolute inset-0 bg-radial from-transparent via-[#2A170E]/3 to-[#1F1009]/20 pointer-events-none z-0' />

			{/* ----------------------------------------------------------------- */}
			{/* 2. TOP CORNER DECORATIONS: CASCADING JASMINE GARLANDS             */}
			{/* ----------------------------------------------------------------- */}
			{/* Left Jasmine Garland */}
			<div
				className='absolute pointer-events-none z-20 opacity-95'
				style={{ left: '1.5%', top: '-1%', width: '15%' }}>
				<img
					src={topGarlandLeftImage}
					alt=''
					className='w-full h-auto object-contain filter drop-shadow-xs'
				/>
			</div>

			{/* Right Jasmine Garland (Mirrored) */}
			<div
				className='absolute pointer-events-none z-20 opacity-95 scale-x-[-1]'
				style={{ right: '1.5%', top: '-1%', width: '15%' }}>
				<img
					src={topGarlandRightImage}
					alt=''
					className='w-full h-auto object-contain filter drop-shadow-xs'
				/>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 3. SECTION HEADER: CREST + "The Wedding Celebration" + DIVIDER     */}
			{/* ----------------------------------------------------------------- */}
			<header className='relative z-10 w-full flex flex-col items-center text-center pt-3.5 sm:pt-4.5 px-4'>
				{/* Top Center Floral Wood Crest */}
				<motion.div
					initial={{ opacity: 0, y: -8 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className='w-32 sm:w-40 -mt-1 mb-0.5'>
					<img
						src={topCrestImage}
						alt='Gilded Javanese Floral Wood Crest'
						className='w-full h-auto object-contain filter drop-shadow-xs'
					/>
				</motion.div>

				{/* Title: The Wedding Celebration */}
				<motion.h2
					initial={{ opacity: 0, y: 6 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
					className='font-cormorant italic text-[26px] xs:text-[28px] sm:text-[32px] md:text-[34px] font-semibold text-[#2C1810] tracking-wide leading-tight'>
					{sectionTitle}
				</motion.h2>

				{/* Ornate Gold Floral Divider */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
					className='w-full max-w-[280px] sm:max-w-[340px] mt-1 mb-2.5 flex items-center justify-center'>
					{headerDividerImage ? (
						<img
							src={headerDividerImage}
							alt=''
							className='w-full h-auto max-h-3 sm:max-h-4 object-contain opacity-90'
						/>
					) : (
						<div className='w-full flex items-center justify-center gap-1.5 px-6'>
							<span className='h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C69A5A] to-[#8C6239]' />
							<span className='text-[#8C6239] text-xs'>❖</span>
							<span className='h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C69A5A] to-[#8C6239]' />
						</div>
					)}
				</motion.div>
			</header>

			{/* ----------------------------------------------------------------- */}
			{/* 4. MAIN CARDS CONTAINER: 3 WEDDING EVENTS + 1 LOCATION CARD       */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full flex flex-col gap-0.5 xs:gap-1 sm:gap-1.5 px-2 sm:px-3.5 mb-3'>
				{/* =============================================================== */}
				{/* EVENT CARDS (Akad Nikah, Resepsi Pernikahan, Unduh Mantu)       */}
				{/* =============================================================== */}
				{events.map((event, index) => (
					<motion.article
						key={event.id}
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.55, delay: 0.1 * index, ease: 'easeOut' }}
						className='relative w-full aspect-[1726/911] min-h-[195px] xs:min-h-[210px] sm:min-h-[225px] rounded-2xl flex items-center filter drop-shadow-sm group transition-transform duration-300 hover:scale-[1.01]'>
						{/* The Ornate Ivory Gold Floral Banner Frame */}
						<img
							src={cardFrameImage}
							alt=''
							className='absolute inset-0 w-full h-full object-fill pointer-events-none z-0'
						/>

						{/* Content Container (Padded safely inside the banner's gold borders) */}
						<div className='relative z-10 w-full h-full flex items-center pl-[3.5%] pr-[6.5%] sm:pr-[5.5%] pt-[5.5%] pb-[7.5%]'>
							{/* Left Column: 3D Thematic Architectural/Floral Illustration */}
							<div className='w-[33%] sm:w-[35%] h-full flex items-center justify-center shrink-0 p-1'>
								<img
									src={event.image}
									alt={event.imageAlt || event.title}
									className='w-full max-h-[88%] object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.14)] transition-transform duration-500 group-hover:scale-105'
								/>
							</div>

							{/* Vertical Hairline Divider (clean line without diamond ornament) */}
							<div className='w-[1px] h-[74%] bg-gradient-to-b from-transparent via-[#B58A45]/50 to-transparent self-center mx-1 sm:mx-1.5 shrink-0' />

							{/* Right Column: Event Titles, Date, Time, Venue & Address */}
							<div className='flex-1 flex flex-col justify-center pl-1.5 sm:pl-2.5 text-left min-w-0'>
								{/* Event Name */}
								<h3 className='font-cormorant font-bold text-[19px] xs:text-[21px] sm:text-[24px] text-[#2C1810] leading-none tracking-normal'>{event.title}</h3>

								{/* Subtitle / Ceremony Type */}
								<p className='font-cinzel text-[7.5px] xs:text-[8px] sm:text-[9.5px] tracking-[0.22em] font-bold text-[#8C6D46] uppercase mt-1.5 xs:mt-2 sm:mt-2.5 mb-1.5 sm:mb-2 leading-none'>{event.subtitle}</p>

								{/* Date Row */}
								<div className='flex items-center gap-1.5 text-[#2C1810] mb-0.5'>
									<Calendar className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C6239] shrink-0' />
									<span className='font-sans font-medium text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] leading-tight'>{event.date}</span>
								</div>

								{/* Time Row */}
								<div className='flex items-center gap-1.5 text-[#2C1810] mb-1 sm:mb-1.5'>
									<Clock className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C6239] shrink-0' />
									<span className='font-sans font-medium text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] leading-tight'>{event.time}</span>
								</div>

								{/* Venue & Address Row */}
								<div className='flex items-start gap-1.5'>
									<MapPin className='w-3.5 h-3.5 text-[#8C6239] shrink-0 mt-0.5' />
									<div className='flex flex-col min-w-0'>
										<span className='font-sans font-bold leading-tight text-[10.5px] xs:text-[11.5px] sm:text-[13px] text-[#2C1810]'>{event.venueName}</span>
										<span className='font-sans text-[8.5px] xs:text-[9px] sm:text-[10.5px] text-[#5C4033] leading-snug mt-0.5 max-w-[94%] sm:max-w-full'>{event.address}</span>
									</div>
								</div>
							</div>
						</div>
					</motion.article>
				))}

				{/* =============================================================== */}
				{/* CARD 4: LOCATION & GOOGLE MAPS CALL-TO-ACTION                   */}
				{/* =============================================================== */}
				<motion.article
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.55, delay: 0.35, ease: 'easeOut' }}
					className='relative w-full aspect-[1726/911] min-h-[195px] xs:min-h-[210px] sm:min-h-[225px] rounded-2xl flex items-center filter drop-shadow-sm group transition-transform duration-300 hover:scale-[1.01]'>
					{/* Frame */}
					<img
						src={cardFrameImage}
						alt=''
						className='absolute inset-0 w-full h-full object-fill pointer-events-none z-0'
					/>

					{/* Content Container (Padded safely inside the banner's gold borders) */}
					<div className='relative z-10 w-full h-full flex items-center pl-[3.5%] pr-[6.5%] sm:pr-[5.5%] pt-[5.5%] pb-[7.5%]'>
						{/* Left Column: Folded Map with 3D Red Pin and Flowers */}
						<div className='w-[33%] sm:w-[35%] h-full flex items-center justify-center shrink-0 p-1'>
							<img
								src={locationImage}
								alt='3D Map Location'
								className='w-full max-h-[88%] object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.14)] transition-transform duration-500 group-hover:scale-105'
							/>
						</div>

						{/* Vertical Hairline Divider (clean line without diamond ornament) */}
						<div className='w-[1px] h-[74%] bg-gradient-to-b from-transparent via-[#B58A45]/50 to-transparent self-center mx-1 sm:mx-1.5 shrink-0' />

						{/* Right Column: "Location" Header, Venue Address & Open Google Maps Button */}
						<div className='flex-1 flex flex-col justify-center pl-1.5 sm:pl-2.5 text-left min-w-0'>
							{/* Location Title (aligned to match the other cards) */}
							<div className='flex items-center gap-2 mb-1.5 sm:mb-2'>
								<h3 className='font-cormorant italic font-bold text-[19px] xs:text-[21px] sm:text-[24px] text-[#2C1810] tracking-wide leading-none'>{locationTitle}</h3>
								<span className='h-[1px] w-8 sm:w-14 bg-gradient-to-r from-[#B58A45]/60 to-transparent' />
							</div>

							{/* Venue & Address */}
							<div className='flex items-start gap-1.5 text-left mb-2 sm:mb-2.5 max-w-[96%]'>
								<MapPin className='w-3.5 h-3.5 text-[#8C6239] shrink-0 mt-0.5' />
								<div className='flex flex-col min-w-0'>
									<span className='font-sans font-bold text-[10.5px] xs:text-[11.5px] sm:text-[13px] text-[#2C1810] leading-tight'>{locationVenueName}</span>
									<span className='font-sans text-[8.5px] xs:text-[9px] sm:text-[10.5px] text-[#5C4033] leading-snug mt-0.5 max-w-[94%] sm:max-w-full'>{locationAddress}</span>
								</div>
							</div>

							{/* Button: Open Google Maps (compact & scaled to prevent card overflow) */}
							<motion.a
								href={googleMapsUrl}
								target='_blank'
								rel='noopener noreferrer'
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								className='inline-flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-white font-sans font-semibold text-[9px] xs:text-[10px] sm:text-[11px] shadow-[0_2px_6px_rgba(80,40,10,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-[#DDB065] bg-gradient-to-b from-[#A46726] via-[#854B1A] to-[#60320D] hover:brightness-110 active:brightness-95 transition-all duration-200 cursor-pointer w-fit'>
								<MapPin className='w-3 h-3 text-white shrink-0' />
								<span>{googleMapsButtonText}</span>
								<ExternalLink className='w-3 h-3 text-white/90 shrink-0' />
							</motion.a>
						</div>
					</div>
				</motion.article>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 5. BOTTOM ORNAMENT: ORNATE JAVANESE BATIK GOLD BORDER BASE        */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full pointer-events-none mt-auto'>
				<img
					src={bottomOrnamentImage}
					alt='Ornate Javanese Batik Gold Border'
					className='w-full h-auto object-cover object-bottom filter drop-shadow-sm select-none'
				/>
			</div>
		</section>
	);
}
