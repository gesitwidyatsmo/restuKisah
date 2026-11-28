'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import BaroqueCartoucheFrame from './BaroqueCartoucheFrame';
import ScalableOrnateFrame from '@/components/ui/ScalableOrnateFrame';

export interface RoyalJavaneseBrideGroomProfileProps {
	// Header Section
	sectionTitle?: string;
	sectionSubtitle?: string;

	// Bride Information
	brideLabel?: string;
	brideName?: string;
	brideRelation?: string;
	brideFather?: string;
	brideMother?: string;
	brideInstagram?: string;
	brideInstagramUrl?: string;
	brideImage?: string;

	// Groom Information
	groomLabel?: string;
	groomName?: string;
	groomRelation?: string;
	groomFather?: string;
	groomMother?: string;
	groomInstagram?: string;
	groomInstagramUrl?: string;
	groomImage?: string;

	// Layout & Styling Mode
	layoutMode?: 'independent_stacked' | 'zigzag' | 'parallel';
	frameMode?: 'ornate_card' | 'vector_baroque' | 'parchment_image';
	cardFrameImage?: string;
	textFrameImage?: string;
	textFrameHeight?: string;
	backgroundImage?: string;
	bottomOrnamentImage?: string;
	className?: string;
}

interface SingleProfileRoyalCardProps {
	label: string;
	name: string;
	relation: string;
	father: string;
	mother: string;
	instagram?: string;
	instagramUrl?: string;
	image: string;
	cardFrameImage: string;
	onPhotoClick?: () => void;
}

function SingleProfileRoyalCard({ label, name, relation, father, mother, instagram, instagramUrl, image, cardFrameImage, onPhotoClick }: SingleProfileRoyalCardProps) {
	return (
		<ScalableOrnateFrame
			src={cardFrameImage}
			originalWidth={1460}
			originalHeight={767}
			slice={{ top: 140, bottom: 130, isPercentage: false }}
			mode='3-slice'
			overlapPx={1}
			className='w-full filter drop-shadow-[0_8px_20px_rgba(90,50,20,0.18)]'
			contentClassName='w-full px-4 sm:px-6 pt-1 pb-3.5 flex flex-col items-center text-center'>
			{/* 1. Large Baroque Gold Photo Frame with Jasmine Flowers & Zoom Trigger */}
			<div
				onClick={onPhotoClick}
				className='relative z-10 shrink-0 w-[150px] xs:w-[165px] sm:w-[185px] aspect-[1312/1199] mx-auto mt-1 mb-2 sm:mb-2.5 cursor-pointer group select-none transition-transform active:scale-98'
				title={`Klik untuk memperbesar foto ${name}`}>
				{/* Layer 1: Arched Mask with Warm Bokeh Gradient & Portrait Photo */}
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
						src={image}
						alt={`Foto Profil ${name}`}
						className='w-full h-full object-cover object-[center_12%] group-hover:scale-108 transition-transform duration-500'
					/>
					{/* Subtle Hover Zoom Overlay */}
					<div className='absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
						<div className='p-1.5 rounded-full bg-black/60 text-[#D8AB52] border border-[#D8AB52]/50 shadow-lg'>
							<ZoomIn className='w-4 h-4' />
						</div>
					</div>
				</div>

				{/* Layer 2: Ornate Golden Baroque Frame (Master File: 1312x1199) */}
				<img
					src='/templates/jawa/hero/frame-baroque-gold.webp'
					alt=''
					className='absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300'
				/>

				{/* Layer 3: Detailed White Jasmine Flower Clusters at Bottom Corners */}
				<div
					className='absolute pointer-events-none z-20'
					style={{ left: '-6%', bottom: '-4%', width: '38%' }}>
					<img
						src='/templates/jawa/profile/jasmine-cluster-left.webp'
						alt=''
						className='w-full h-auto object-contain filter drop-shadow-xs'
					/>
				</div>
				<div
					className='absolute pointer-events-none z-20'
					style={{ right: '-6%', bottom: '-4%', width: '38%' }}>
					<img
						src='/templates/jawa/profile/jasmine-cluster.webp'
						alt=''
						className='w-full h-auto object-contain filter drop-shadow-xs'
					/>
				</div>

				{/* Micro "Perbesar" Badge */}
				<div className='absolute top-1.5 right-1.5 z-25 opacity-80 group-hover:opacity-100 transition-opacity bg-black/60 text-[#FAF6EE] text-[8.5px] px-1.5 py-0.5 rounded-full border border-[#D4AF37]/50 flex items-center gap-0.5 pointer-events-none backdrop-blur-xs shadow-xs'>
					<ZoomIn className='w-2.5 h-2.5 text-[#D4AF37]' />
					<span>Perbesar</span>
				</div>
			</div>

			{/* 2. Label: — THE BRIDE / THE GROOM — */}
			<div className='flex items-center justify-center gap-1.5 mb-1 w-full'>
				<span className='h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#B58A45]/80' />
				<span className='font-cinzel text-[9.5px] xs:text-[10.5px] sm:text-[12px] font-bold tracking-[0.2em] text-[#5C4033] uppercase'>{label}</span>
				<span className='h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#B58A45]/80' />
			</div>

			{/* 3. Full Name */}
			<h3 className='font-cormorant font-bold text-[19px] xs:text-[21px] sm:text-[24px] text-[#2C1810] tracking-wide leading-tight px-1 text-center'>{name}</h3>

			{/* 4. Golden Floral Motif Divider */}
			<div className='flex items-center justify-center gap-1.5 my-1 sm:my-1.5'>
				<span className='h-[0.5px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#B58A45]/70' />
				<span className='text-[#B58A45] text-[10px] sm:text-[11px]'>✦ ❖ ✦</span>
				<span className='h-[0.5px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#B58A45]/70' />
			</div>

			{/* 5. Parentage */}
			<p className='font-cormorant italic text-[11px] xs:text-[12px] sm:text-[13.5px] text-[#5C4033] leading-snug'>{relation}</p>
			<p className='font-cormorant font-bold text-[12px] xs:text-[13px] sm:text-[14.5px] text-[#2C1810] leading-snug'>{father}</p>
			<p className='font-cormorant font-bold text-[12px] xs:text-[13px] sm:text-[14.5px] text-[#2C1810] leading-snug'>& {mother}</p>

			{/* 6. Instagram Handle Link */}
			{instagram && (
				<a
					href={instagramUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B58A45]/10 hover:bg-[#B58A45]/20 border border-[#B58A45]/30 text-[10.5px] sm:text-[12px] font-medium text-[#2C1810] hover:text-[#B58A45] transition-all duration-200 group shadow-xs'
					title={`Instagram ${name}`}>
					<svg
						className='w-3.5 h-3.5 text-[#5C4033] group-hover:text-[#B58A45] transition-colors shrink-0'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='1.8'
						strokeLinecap='round'
						strokeLinejoin='round'
						aria-hidden='true'>
						<rect
							width='20'
							height='20'
							x='2'
							y='2'
							rx='5'
							ry='5'
						/>
						<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
						<line
							x1='17.5'
							x2='17.51'
							y1='6.5'
							y2='6.5'
						/>
					</svg>
					<span className='font-sans tracking-tight'>{instagram}</span>
				</a>
			)}
		</ScalableOrnateFrame>
	);
}

interface ProfileInfoPanelProps {
	label: string;
	name: string;
	relation: string;
	father: string;
	mother: string;
	instagram?: string;
	instagramUrl?: string;
	frameMode?: 'ornate_card' | 'vector_baroque' | 'parchment_image';
	cardFrameImage?: string;
	textFrameImage?: string;
	textFrameHeight?: string;
	align?: 'left' | 'right';
}

function ProfileInfoPanel({
	label,
	name,
	relation,
	father,
	mother,
	instagram,
	instagramUrl,
	frameMode = 'ornate_card',
	cardFrameImage = '/templates/jawa/Ornate Golden Parchment Card.webp',
	textFrameImage = '/templates/jawa/Ornate Golden Parchment Card.webp',
	textFrameHeight,
	align = 'right',
}: ProfileInfoPanelProps) {
	const isCardOnLeft = align === 'left';

	const content = (
		<div className='relative z-10 w-full flex flex-col items-center justify-center'>
			{/* Label: — THE BRIDE / THE GROOM — */}
			<div className='flex items-center justify-center gap-1.5 mb-0.5 sm:mb-1 w-full'>
				<span className='h-[1px] w-4 sm:w-6 bg-gradient-to-r from-transparent to-[#B58A45]/80' />
				<span className='font-cinzel text-[8px] xs:text-[9px] sm:text-[10.5px] font-bold tracking-[0.18em] sm:tracking-[0.22em] text-[#5C4033] uppercase'>{label}</span>
				<span className='h-[1px] w-4 sm:w-6 bg-gradient-to-l from-transparent to-[#B58A45]/80' />
			</div>

			{/* Full Name */}
			<h3 className='font-cormorant font-bold text-[13.5px] xs:text-[15px] sm:text-[17.5px] md:text-[19.5px] text-[#2C1810] tracking-wide leading-tight px-0.5 text-center'>{name}</h3>

			{/* Golden Floral Motif Divider */}
			<div className='flex items-center justify-center gap-1 my-0.5 sm:my-1'>
				<span className='h-[0.5px] w-5 sm:w-8 bg-gradient-to-r from-transparent to-[#B58A45]/70' />
				<span className='text-[#B58A45] text-[8.5px] sm:text-[9.5px]'>❖</span>
				<span className='h-[0.5px] w-5 sm:w-8 bg-gradient-to-l from-transparent to-[#B58A45]/70' />
			</div>

			{/* Parentage */}
			<p className='font-cormorant italic text-[9px] sm:text-[11px] text-[#5C4033] leading-snug'>{relation}</p>
			<p className='font-cormorant font-semibold text-[9.5px] sm:text-[11.5px] text-[#2C1810] leading-snug'>{father}</p>
			<p className='font-cormorant font-semibold text-[9.5px] sm:text-[11.5px] text-[#2C1810] leading-snug'>& {mother}</p>

			{/* Instagram Handle Link */}
			{instagram && (
				<a
					href={instagramUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='mt-0.5 sm:mt-1 inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 text-[9px] sm:text-[10.5px] font-medium text-[#3D2517] hover:text-[#B58A45] transition-colors duration-200 group'
					title={`Instagram ${name}`}>
					<svg
						className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#5C4033] group-hover:text-[#B58A45] transition-colors shrink-0'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='1.8'
						strokeLinecap='round'
						strokeLinejoin='round'
						aria-hidden='true'>
						<rect
							width='20'
							height='20'
							x='2'
							y='2'
							rx='5'
							ry='5'
						/>
						<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
						<line
							x1='17.5'
							x2='17.51'
							y1='6.5'
							y2='6.5'
						/>
					</svg>
					<span className='font-sans text-[9px] sm:text-[10.5px] tracking-tight truncate max-w-[130px] sm:max-w-none'>{instagram}</span>
				</a>
			)}
		</div>
	);

	return (
		<div className={`relative z-10 flex-1 min-w-0 ${isCardOnLeft ? '-mr-[7%] sm:-mr-[8%]' : '-ml-[7%] sm:-ml-[8%]'}`}>
			{frameMode === 'vector_baroque' ? (
				<BaroqueCartoucheFrame className={`w-full py-2.5 sm:py-3 flex flex-col items-center justify-center text-center ${isCardOnLeft ? 'pr-5 sm:pr-6 pl-2 sm:pl-3' : 'pl-5 sm:pl-6 pr-2 sm:pr-3'}`}>
					{content}
				</BaroqueCartoucheFrame>
			) : frameMode === 'parchment_image' ? (
				<div className={`relative w-full py-2.5 sm:py-3 flex flex-col items-center justify-center text-center ${isCardOnLeft ? 'pr-5 sm:pr-6 pl-2 sm:pl-3' : 'pl-5 sm:pl-6 pr-2 sm:pr-3'}`}>
					<img
						src={textFrameImage}
						alt='Parchment Frame'
						className='absolute inset-0 w-full h-full object-fill pointer-events-none z-0 filter drop-shadow-xs'
					/>
					{content}
				</div>
			) : (
				<ScalableOrnateFrame
					src={cardFrameImage || textFrameImage || '/templates/jawa/Ornate Golden Parchment Card.webp'}
					originalWidth={1460}
					originalHeight={767}
					slice={{ top: 140, bottom: 130, isPercentage: false }}
					mode='3-slice'
					overlapPx={1}
					className='w-full filter drop-shadow-[0_4px_14px_rgba(90,50,20,0.18)]'
					contentClassName={`w-full py-1 sm:py-1.5 flex flex-col items-center justify-center text-center ${isCardOnLeft ? 'pr-4.5 sm:pr-6 pl-2 sm:pl-3' : 'pl-4.5 sm:pl-6 pr-2 sm:pr-3'}`}>
					{content}
				</ScalableOrnateFrame>
			)}
		</div>
	);
}

/**
 * SECTION 03 — BRIDE & GROOM PROFILES
 * Disusun secara murni dari file aset master asli proyek (100% tanpa crop gambar contoh).
 * Bingkai teks dibuat menggunakan CSS + SVG Baroque Cartouche (vector, super tajam, bebas dibesarkan ke bawah).
 */
export default function RoyalJavaneseBrideGroomProfile({
	sectionTitle = 'The Bride & The Groom',
	sectionSubtitle = 'TWO SOULS, ONE STORY',

	brideLabel = 'THE BRIDE',
	brideName = 'Angelia Rahma, S.T.',
	brideRelation = 'Putri dari',
	brideFather = 'Bapak Budi Setiawan, M.M.',
	brideMother = 'Ibu Ratna Dewi, S.E.',
	brideInstagram = '@angeliarahma',
	brideInstagramUrl = 'https://instagram.com/angeliarahma________',
	brideImage = '/templates/jawa/profile/bride-portrait.webp',

	groomLabel = 'THE GROOM',
	groomName = 'Miko Ardiansyah, S.T.',
	groomRelation = 'Putra dari',
	groomFather = 'Bapak Haryono Wicaksono, M.T.',
	groomMother = 'Ibu Sri Lestari, S.Pd.',
	groomInstagram = '@mikoardiansyah',
	groomInstagramUrl = 'https://instagram.com/mikoardiansyah____',
	groomImage = '/templates/jawa/profile/groom-portrait.webp',

	layoutMode = 'independent_stacked',
	frameMode = 'ornate_card',
	cardFrameImage = '/templates/jawa/Ornate Golden Parchment Card.webp',
	textFrameImage = '/templates/jawa/Ornate Golden Parchment Card.webp',
	textFrameHeight = '98%',
	backgroundImage = '/templates/jawa/hero/bg-cream-embossed.webp',
	bottomOrnamentImage = '/templates/jawa/common/batik-gold-border.webp',
	className = '',
}: RoyalJavaneseBrideGroomProfileProps) {
	// Zoom Lightbox State for Bride & Groom Photos
	const [activeZoomPhoto, setActiveZoomPhoto] = useState<{
		image: string;
		name: string;
		label: string;
		relation: string;
		father: string;
		mother: string;
	} | null>(null);

	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border border-[#B58A45]/30 bg-[#FAF6EE] select-none text-[#2C1810] flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-5.5 ${className}`}
			aria-label='Profil Pengantin Pria dan Wanita'>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: EMBOSSED JAVANESE FLORAL CREAM PAPER (MASTER FILE)  */}
			{/* ----------------------------------------------------------------- */}
			<img
				src={backgroundImage}
				alt='Background Ivory Heritage Embossed Javanese Floral Cream Paper'
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0'
			/>

			{/* Warm Ambient Vignette for Keraton Royal Feel */}
			<div className='absolute inset-0 bg-radial from-transparent via-[#2A170E]/3 to-[#1F1009]/20 pointer-events-none z-0' />

			{/* ----------------------------------------------------------------- */}
			{/* 3. SECTION HEADER: "The Bride & The Groom" + ORNAMENT + SUBTITLE */}
			{/* ----------------------------------------------------------------- */}
			<header className='relative z-10 w-full flex flex-col items-center text-center pt-[2%] px-4'>
				<h2 className='font-cormorant italic text-[24px] sm:text-[28px] md:text-[30px] font-semibold text-[#2C1810] tracking-wide leading-tight'>{sectionTitle}</h2>

				{/* Small Golden Floral Crest Divider */}
				<div className='flex items-center justify-center gap-1.5 my-0.5'>
					<span className='h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#B58A45]' />
					<span className='text-[#B58A45] text-xs'>✦ ❖ ✦</span>
					<span className='h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#B58A45]' />
				</div>

				<p className='font-cinzel text-[10px] sm:text-[11.5px] font-bold tracking-[0.24em] text-[#5C4033] uppercase'>{sectionSubtitle}</p>
			</header>

			{/* ----------------------------------------------------------------- */}
			{/* 4. MAIN PROFILES CONTAINER                                        */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full flex-1 flex flex-col justify-center px-3 sm:px-4.5 mt-4 sm:mt-5 space-y-4 sm:space-y-5'>
				{layoutMode === 'independent_stacked' ? (
					<>
						{/* A. THE BRIDE INDEPENDENT ROYAL CARD */}
						<article className='relative w-full'>
							<SingleProfileRoyalCard
								label={brideLabel}
								name={brideName}
								relation={brideRelation}
								father={brideFather}
								mother={brideMother}
								instagram={brideInstagram}
								instagramUrl={brideInstagramUrl}
								image={brideImage}
								cardFrameImage={cardFrameImage}
								onPhotoClick={() =>
									setActiveZoomPhoto({
										image: brideImage,
										name: brideName,
										label: brideLabel,
										relation: brideRelation,
										father: brideFather,
										mother: brideMother,
									})
								}
							/>
						</article>

						{/* B. GUNUNGAN CENTER DIVIDER (SACRED KAYON + BAROQUE VINES) */}
						{/* <div className='relative w-[75%] sm:w-[70%] mx-auto my-1 sm:my-2 z-20 pointer-events-none flex items-center justify-center'>
							<img
								src='/templates/jawa/common/divider-gold.webp'
								alt=''
								className='w-full h-auto object-contain filter drop-shadow-xs opacity-85'
							/>
							<div className='absolute inset-0 flex items-center justify-center'>
								<img
									src='/templates/jawa/profile/gunungan-emblem.webp'
									alt='Gunungan Wayang Emas'
									className='w-12 sm:w-14 h-auto object-contain filter drop-shadow-sm'
								/>
							</div>
						</div> */}

						{/* C. THE GROOM INDEPENDENT ROYAL CARD */}
						<article className='relative w-full'>
							<SingleProfileRoyalCard
								label={groomLabel}
								name={groomName}
								relation={groomRelation}
								father={groomFather}
								mother={groomMother}
								instagram={groomInstagram}
								instagramUrl={groomInstagramUrl}
								image={groomImage}
								cardFrameImage={cardFrameImage}
								onPhotoClick={() =>
									setActiveZoomPhoto({
										image: groomImage,
										name: groomName,
										label: groomLabel,
										relation: groomRelation,
										father: groomFather,
										mother: groomMother,
									})
								}
							/>
						</article>
					</>
				) : (
					<>
						{/* A. THE BRIDE PROFILE ROW: Photo (Left) + Card (Right) */}
						<article className='relative w-full flex items-center'>
							<div
								onClick={() =>
									setActiveZoomPhoto({
										image: brideImage,
										name: brideName,
										label: brideLabel,
										relation: brideRelation,
										father: brideFather,
										mother: brideMother,
									})
								}
								className='relative z-20 shrink-0 cursor-pointer group select-none'
								style={{ width: '44%', aspectRatio: '1312/1199' }}
								title={`Klik untuk memperbesar foto ${brideName}`}>
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
										src={brideImage}
										alt={`Foto Profil ${brideName}`}
										className='w-full h-full object-cover object-[center_12%] group-hover:scale-108 transition-transform duration-500'
									/>
									{/* Subtle Zoom Badge overlay on hover */}
									<div className='absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
										<div className='p-1.5 rounded-full bg-black/60 text-[#D8AB52] border border-[#D8AB52]/50 shadow-lg'>
											<ZoomIn className='w-4 h-4' />
										</div>
									</div>
								</div>
								<img
									src='/templates/jawa/hero/frame-baroque-gold.webp'
									alt=''
									className='absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300'
								/>
								<div
									className='absolute pointer-events-none z-20'
									style={{ left: '-6%', bottom: '-4%', width: '38%' }}>
									<img
										src='/templates/jawa/profile/jasmine-cluster-left.webp'
										alt=''
										className='w-full h-auto object-contain filter drop-shadow-xs'
									/>
								</div>
								<div
									className='absolute pointer-events-none z-20'
									style={{ right: '-6%', bottom: '-4%', width: '38%' }}>
									<img
										src='/templates/jawa/profile/jasmine-cluster.webp'
										alt=''
										className='w-full h-auto object-contain filter drop-shadow-xs'
									/>
								</div>
								{/* Micro "Perbesar" Badge */}
								<div className='absolute top-1.5 right-1.5 z-25 opacity-80 group-hover:opacity-100 transition-opacity bg-black/60 text-[#FAF6EE] text-[8.5px] px-1.5 py-0.5 rounded-full border border-[#D4AF37]/50 flex items-center gap-0.5 pointer-events-none backdrop-blur-xs shadow-xs'>
									<ZoomIn className='w-2.5 h-2.5 text-[#D4AF37]' />
									<span>Perbesar</span>
								</div>
							</div>

							<ProfileInfoPanel
								label={brideLabel}
								name={brideName}
								relation={brideRelation}
								father={brideFather}
								mother={brideMother}
								instagram={brideInstagram}
								instagramUrl={brideInstagramUrl}
								frameMode={frameMode}
								cardFrameImage={cardFrameImage}
								textFrameImage={textFrameImage}
								textFrameHeight={textFrameHeight}
								align='right'
							/>
						</article>

						{/* B. GUNUNGAN CENTER DIVIDER */}
						<div className='relative w-[70%] sm:w-[65%] mx-auto my-[-1.5%] z-20 pointer-events-none flex items-center justify-center'>
							<img
								src='/templates/jawa/common/divider-gold.webp'
								alt=''
								className='w-full h-auto object-contain filter drop-shadow-xs opacity-80'
							/>
							<div className='absolute inset-0 flex items-center justify-center'>
								<img
									src='/templates/jawa/profile/gunungan-emblem.webp'
									alt='Gunungan Wayang Emas'
									className='w-12 sm:w-14 h-auto object-contain filter drop-shadow-sm'
								/>
							</div>
						</div>

						{/* C. THE GROOM PROFILE ROW */}
						<article className='relative w-full flex items-center'>
							<ProfileInfoPanel
								label={groomLabel}
								name={groomName}
								relation={groomRelation}
								father={groomFather}
								mother={groomMother}
								instagram={groomInstagram}
								instagramUrl={groomInstagramUrl}
								frameMode={frameMode}
								cardFrameImage={cardFrameImage}
								textFrameImage={textFrameImage}
								textFrameHeight={textFrameHeight}
								align={layoutMode === 'zigzag' ? 'left' : 'right'}
							/>

							<div
								onClick={() =>
									setActiveZoomPhoto({
										image: groomImage,
										name: groomName,
										label: groomLabel,
										relation: groomRelation,
										father: groomFather,
										mother: groomMother,
									})
								}
								className='relative z-20 shrink-0 cursor-pointer group select-none'
								style={{ width: '44%', aspectRatio: '1312/1199' }}
								title={`Klik untuk memperbesar foto ${groomName}`}>
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
										src={groomImage}
										alt={`Foto Profil ${groomName}`}
										className='w-full h-full object-cover object-[center_12%] group-hover:scale-108 transition-transform duration-500'
									/>
									{/* Subtle Zoom Badge overlay on hover */}
									<div className='absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
										<div className='p-1.5 rounded-full bg-black/60 text-[#D8AB52] border border-[#D8AB52]/50 shadow-lg'>
											<ZoomIn className='w-4 h-4' />
										</div>
									</div>
								</div>
								<img
									src='/templates/jawa/hero/frame-baroque-gold.webp'
									alt=''
									className='absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300'
								/>
								<div
									className='absolute pointer-events-none z-20'
									style={{ left: '-6%', bottom: '-4%', width: '38%' }}>
									<img
										src='/templates/jawa/profile/jasmine-cluster-left.webp'
										alt=''
										className='w-full h-auto object-contain filter drop-shadow-xs'
									/>
								</div>
								<div
									className='absolute pointer-events-none z-20'
									style={{ right: '-6%', bottom: '-4%', width: '38%' }}>
									<img
										src='/templates/jawa/profile/jasmine-cluster.webp'
										alt=''
										className='w-full h-auto object-contain filter drop-shadow-xs'
									/>
								</div>
								{/* Micro "Perbesar" Badge */}
								<div className='absolute top-1.5 right-1.5 z-25 opacity-80 group-hover:opacity-100 transition-opacity bg-black/60 text-[#FAF6EE] text-[8.5px] px-1.5 py-0.5 rounded-full border border-[#D4AF37]/50 flex items-center gap-0.5 pointer-events-none backdrop-blur-xs shadow-xs'>
									<ZoomIn className='w-2.5 h-2.5 text-[#D4AF37]' />
									<span>Perbesar</span>
								</div>
							</div>
						</article>
					</>
				)}
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 5. BOTTOM ORNAMENT: ORNATE JAVANESE BATIK GOLD BORDER BASE        */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 pointer-events-none mt-auto pt-4 sm:pt-6 -mx-4 sm:-mx-5.5 -mb-6 sm:-mb-8 w-[calc(100%+2rem)] sm:w-[calc(100%+2.75rem)]'>
				<img
					src={bottomOrnamentImage}
					alt='Ornate Javanese Batik Gold Border'
					className='w-full h-auto object-cover object-bottom filter drop-shadow-sm select-none block -mb-0.5'
				/>
			</div>

			{/* =============================================================== */}
			{/* 6. LIGHTBOX / ZOOM MODAL UNTUK FOTO MEMPELAI (INTERACTIVE)      */}
			{/* =============================================================== */}
			<AnimatePresence>
				{activeZoomPhoto && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6'
						onClick={() => setActiveZoomPhoto(null)}>
						<motion.div
							initial={{ scale: 0.85, opacity: 0, y: 15 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.85, opacity: 0, y: 15 }}
							transition={{ type: 'spring', damping: 25, stiffness: 280 }}
							className='relative max-w-sm sm:max-w-md w-full bg-[#FAF7F0] border-2 border-[#D4AF37] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center p-5 sm:p-7 text-center select-none'
							onClick={(e) => e.stopPropagation()}>
							{/* Close Button */}
							<button
								onClick={() => setActiveZoomPhoto(null)}
								className='absolute top-3.5 right-3.5 p-2 rounded-full bg-black/10 hover:bg-black/20 text-[#5C4033] hover:text-[#2C1810] border border-[#B58A45]/30 transition-all cursor-pointer z-30'
								aria-label='Tutup Foto'>
								<X className='w-4 h-4 sm:w-5 sm:h-5' />
							</button>

							{/* Royal Label */}
							<div className='flex items-center justify-center gap-1.5 mb-1.5 w-full'>
								<span className='h-[1px] w-8 bg-gradient-to-r from-transparent to-[#B58A45]' />
								<span className='font-cinzel text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-[#5C4033] uppercase'>{activeZoomPhoto.label}</span>
								<span className='h-[1px] w-8 bg-gradient-to-l from-transparent to-[#B58A45]' />
							</div>

							{/* Large Grand Portrait Frame */}
							<div className='relative z-10 w-[210px] xs:w-[240px] sm:w-[270px] aspect-[1312/1199] my-2'>
								{/* Photo with Arched Mask */}
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
										src={activeZoomPhoto.image}
										alt={activeZoomPhoto.name}
										className='w-full h-full object-cover object-[center_12%]'
									/>
								</div>

								{/* Baroque Gold Frame */}
								<img
									src='/templates/jawa/hero/frame-baroque-gold.webp'
									alt=''
									className='absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-md'
								/>

								{/* White Jasmine Garland Flowers */}
								<div
									className='absolute pointer-events-none z-20'
									style={{ left: '-6%', bottom: '-4%', width: '38%' }}>
									<img
										src='/templates/jawa/profile/jasmine-cluster-left.webp'
										alt=''
										className='w-full h-auto object-contain filter drop-shadow-xs'
									/>
								</div>
								<div
									className='absolute pointer-events-none z-20'
									style={{ right: '-6%', bottom: '-4%', width: '38%' }}>
									<img
										src='/templates/jawa/profile/jasmine-cluster.webp'
										alt=''
										className='w-full h-auto object-contain filter drop-shadow-xs'
									/>
								</div>
							</div>

							{/* Full Name */}
							<h3 className='font-cormorant font-bold text-[22px] sm:text-[26px] text-[#2C1810] tracking-wide leading-tight mt-1'>{activeZoomPhoto.name}</h3>

							{/* Gold divider */}
							<div className='flex items-center justify-center gap-1.5 my-1.5'>
								<span className='h-[0.5px] w-10 bg-gradient-to-r from-transparent to-[#B58A45]/70' />
								<span className='text-[#B58A45] text-xs'>✦ ❖ ✦</span>
								<span className='h-[0.5px] w-10 bg-gradient-to-l from-transparent to-[#B58A45]/70' />
							</div>

							{/* Parentage */}
							<p className='font-cormorant italic text-[12px] sm:text-[13.5px] text-[#5C4033] leading-snug'>{activeZoomPhoto.relation}</p>
							<p className='font-cormorant font-bold text-[13px] sm:text-[15px] text-[#2C1810] leading-snug'>
								{activeZoomPhoto.father} & {activeZoomPhoto.mother}
							</p>

							{/* Close hint */}
							<p className='text-[10px] text-[#8C6D46] mt-3 tracking-wide'>Ketuk di luar untuk menutup</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
