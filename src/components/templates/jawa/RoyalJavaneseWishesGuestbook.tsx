'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import ScalableOrnateFrame from '@/components/ui/ScalableOrnateFrame';
import { User, MessageSquare, Send, CalendarDays, CheckCircle2, Sparkles } from 'lucide-react';

export interface WishItem {
	id: string;
	senderName: string;
	message: string;
	timestamp: string;
}

export interface RoyalJavaneseWishesGuestbookProps {
	// Header Titles
	sectionTitle?: string;
	sectionSubtitle1?: string;
	sectionSubtitle2?: string;

	// Initial Wishes
	defaultWishes?: WishItem[];
	onAddWish?: (wish: WishItem) => void;

	// Decorative Assets
	backgroundImage?: string;
	topCrestImage?: string;
	cardFrameImage?: string;
	buttonPlaqueImage?: string;
	dividerGoldImage?: string;
	wishCardBannerImage?: string;
	rosetteImage?: string;
	bottomOrnamentImage?: string;
	cornerCarvingImage?: string;

	className?: string;
}

export default function RoyalJavaneseWishesGuestbook({
	sectionTitle = 'Leave Your Blessings',
	sectionSubtitle1 = 'Share your prayers, warm wishes, and',
	sectionSubtitle2 = 'sweet messages for our new journey together.',

	defaultWishes = [
		{
			id: 'wish-1',
			senderName: 'Rizky Pratama',
			message:
				'Selamat menempuh hidup baru. Semoga selalu diberi keberkahan, kebahagiaan, dan menjadi keluarga sakinah, mawaddah, warahmah.',
			timestamp: '2 menit yang lalu',
		},
		{
			id: 'wish-2',
			senderName: 'Dewi Lestari',
			message:
				'Barakallah untuk kalian berdua. Semoga cinta, kesetiaan, dan kebahagiaan selalu menyertai langkah rumah tangga kalian.',
			timestamp: '10 menit yang lalu',
		},
		{
			id: 'wish-3',
			senderName: 'Andi Saputra',
			message:
				'Happy Wedding! Semoga selalu kompak, saling mendukung, dan tumbuh bersama dalam setiap fase kehidupan.',
			timestamp: '25 menit yang lalu',
		},
	],

	onAddWish,

	backgroundImage = '/templates/jawa/common/bg-cream-embossed.webp',
	topCrestImage = '/templates/jawa/common/crest-wood-gold.webp',
	cardFrameImage = '/templates/jawa/Ornate Golden Parchment Card.webp',
	buttonPlaqueImage = '/templates/jawa/Ornate Brown Gold Capsule Plaque.webp',
	dividerGoldImage = '/templates/jawa/common/divider-gold.webp',
	wishCardBannerImage = '/templates/jawa/Ornate Blank Gold Scroll Banner.webp',
	rosetteImage = '/templates/jawa/story/rosette-node.webp',
	bottomOrnamentImage = '/templates/jawa/Ornate Golden Floral Divider.webp',
	cornerCarvingImage = '/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp',

	className = '',
}: RoyalJavaneseWishesGuestbookProps) {
	// Form inputs
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');

	// Wishes list state
	const [wishes, setWishes] = useState<WishItem[]>(defaultWishes);

	// Notification feedback
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const showToast = (msg: string) => {
		setToastMessage(msg);
		setTimeout(() => {
			setToastMessage(null);
		}, 3000);
	};

	const handleSendBlessing = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !message.trim()) return;

		const newWish: WishItem = {
			id: `wish-${Date.now()}`,
			senderName: name.trim(),
			message: message.trim(),
			timestamp: 'Baru saja',
		};

		setWishes([newWish, ...wishes]);
		setMessage('');

		// Trigger golden celebratory confetti burst
		try {
			confetti({
				particleCount: 50,
				spread: 60,
				origin: { y: 0.75 },
				colors: ['#D4AF37', '#B58A45', '#FFE082', '#FFF8E1'],
			});
		} catch (e) {
			// Ignore if canvas-confetti is not loaded
		}

		showToast('Terima kasih! Doa dan restu Anda berhasil dikirimkan.');

		if (onAddWish) {
			onAddWish(newWish);
		}
	};

	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/50 ring-1 ring-[#B58A45]/30 bg-[#FAF7F0] select-none text-[#2C1810] flex flex-col justify-between py-6 sm:py-8 px-3.5 sm:px-4.5 ${className}`}
			aria-label='Wedding Wishes & Guestbook - Doa & Ucapan Selamat'>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: HERITAGE CREAM EMBOSSED PARCHMENT & WARM VIGNETTE  */}
			{/* ----------------------------------------------------------------- */}
			<img
				src={backgroundImage}
				alt=''
				aria-hidden='true'
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.98] contrast-[1.04]'
			/>

			{/* Royal Keraton Ambient Warm Vignette Overlay */}
			<div className='absolute inset-0 bg-radial from-transparent via-[#2A170E]/5 to-[#1F1009]/20 pointer-events-none z-0' />

			{/* ----------------------------------------------------------------- */}
			{/* 2. FOUR CORNER BAROQUE GOLDEN CARVINGS                            */}
			{/* ----------------------------------------------------------------- */}
			<div className='absolute top-0 left-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-x-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]'
				/>
			</div>

			<div className='absolute top-0 right-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]'
				/>
			</div>

			<div className='absolute bottom-0 left-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-x-[-1] scale-y-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]'
				/>
			</div>

			<div className='absolute bottom-0 right-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-y-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]'
				/>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 3. SECTION HEADER: CREST + "Leave Your Blessings" + SUBTITLES     */}
			{/* ----------------------------------------------------------------- */}
			<header className='relative z-10 w-full flex flex-col items-center justify-center text-center pt-2 pb-2 px-2'>
				{/* Top Golden Wood Floral Crest */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='w-[130px] sm:w-[155px] max-w-[45%] h-auto mb-1 flex items-center justify-center'>
					<img
						src={topCrestImage}
						alt=''
						aria-hidden='true'
						className='w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(90,50,20,0.25)]'
					/>
				</motion.div>

				{/* Section Heading: "Leave Your Blessings" */}
				<motion.h2
					initial={{ opacity: 0, scale: 0.96 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, delay: 0.1 }}
					className='text-[27px] xs:text-[30px] sm:text-[33px] font-normal text-[#2C1810] tracking-wide leading-tight drop-shadow-xs'
					style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
					{sectionTitle}
				</motion.h2>

				{/* Small Golden Rosette Divider */}
				<div className='w-24 sm:w-28 my-1 opacity-80 flex items-center justify-center'>
					<img
						src={dividerGoldImage}
						alt=''
						aria-hidden='true'
						className='w-full h-auto object-contain'
					/>
				</div>

				{/* Subtitle in Two Italic Lines */}
				<motion.div
					initial={{ opacity: 0, y: 6 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.15 }}
					className='text-center space-y-0.5 max-w-[90%] mx-auto'>
					<p
						className='text-[12px] sm:text-[13px] italic text-[#4A2B18] font-normal leading-relaxed'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						{sectionSubtitle1}
					</p>
					<p
						className='text-[12px] sm:text-[13px] italic text-[#4A2B18] font-normal leading-relaxed'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						{sectionSubtitle2}
					</p>
				</motion.div>
			</header>

			{/* ----------------------------------------------------------------- */}
			{/* 4. FORM CARD: YOUR NAME, YOUR MESSAGE, SEND BLESSING BUTTON       */}
			{/* ----------------------------------------------------------------- */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.2 }}
				className='relative z-10 w-full my-2 sm:my-2.5'>
				<ScalableOrnateFrame
					src={cardFrameImage}
					originalWidth={1460}
					originalHeight={767}
					slice={{ top: 140, bottom: 130, isPercentage: false }}
					mode='3-slice'
					overlapPx={1}
					className='w-full filter drop-shadow-[0_8px_20px_rgba(90,50,20,0.18)]'
					contentClassName='px-4 sm:px-6 pt-2 pb-2.5 flex flex-col'>
					<form
						onSubmit={handleSendBlessing}
						className='w-full flex flex-col gap-2.5 sm:gap-3'>
						{/* Field 1: Your Name */}
						<div className='w-full'>
							<label
								htmlFor='wish-name'
								className='flex items-center gap-1.5 text-[13px] sm:text-[14px] font-bold text-[#2C1810] mb-1'
								style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
								<User className='w-3.5 h-3.5 text-[#7D3F1D]' />
								<span>Your Name</span>
							</label>
							<input
								id='wish-name'
								type='text'
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Enter your name'
								className='w-full h-9 sm:h-10 px-3.5 rounded-lg bg-[#FAF6EE]/90 border border-[#D9C4A5] text-[#2C1810] font-serif placeholder:font-serif placeholder:italic placeholder:text-[#9C856E] focus:outline-none focus:border-[#B58A45] focus:ring-1 focus:ring-[#B58A45]/50 shadow-inner text-xs sm:text-[13px] transition-colors'
							/>
						</div>

						{/* Field 2: Your Message */}
						<div className='w-full'>
							<label
								htmlFor='wish-message'
								className='flex items-center gap-1.5 text-[13px] sm:text-[14px] font-bold text-[#2C1810] mb-1'
								style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
								<MessageSquare className='w-3.5 h-3.5 text-[#7D3F1D]' />
								<span>Your Message</span>
							</label>
							<textarea
								id='wish-message'
								rows={3}
								required
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder='Write your blessing and wishes...'
								className='w-full py-2 px-3.5 rounded-lg bg-[#FAF6EE]/90 border border-[#D9C4A5] text-[#2C1810] font-serif placeholder:font-serif placeholder:italic placeholder:text-[#9C856E] focus:outline-none focus:border-[#B58A45] focus:ring-1 focus:ring-[#B58A45]/50 shadow-inner resize-none text-xs sm:text-[13px] transition-colors'
							/>
						</div>

						{/* Submit Button: "Send Blessing" */}
						<div className='w-full flex justify-center mt-1'>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type='submit'
								className='relative w-[190px] sm:w-[215px] aspect-[1991/313] mx-auto flex items-center justify-center cursor-pointer group shadow-sm'>
								<img
									src={buttonPlaqueImage}
									alt=''
									aria-hidden='true'
									className='absolute inset-0 w-full h-full object-contain pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]'
								/>
								<div className='relative z-10 -mt-0.5 flex items-center justify-center gap-1.5 px-3 text-[#FFF6E5]'>
									<Send className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFF6E5] shrink-0 group-hover:translate-x-0.5 transition-transform' />
									<span
										className='font-serif text-[12px] sm:text-[13.5px] font-bold text-[#FFF6E5] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										Send Blessing
									</span>
								</div>
							</motion.button>
						</div>
					</form>
				</ScalableOrnateFrame>
			</motion.div>

			{/* ----------------------------------------------------------------- */}
			{/* 5. ORNAMENTAL DIVIDER BETWEEN FORM & BLESSINGS LIST               */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full flex items-center justify-center my-1.5 sm:my-2'>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='w-36 sm:w-44 h-auto flex items-center justify-center opacity-85'>
					<img
						src={dividerGoldImage}
						alt=''
						aria-hidden='true'
						className='w-full h-auto object-contain filter drop-shadow-xs'
					/>
				</motion.div>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 6. WISHES LIST (GUESTBOOK FEED WITH NOTCHED CARDS & ROSETTES)     */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full flex flex-col gap-2.5 sm:gap-3 my-1'>
				<AnimatePresence initial={false}>
					{wishes.map((wish, index) => (
						<motion.div
							key={wish.id}
							initial={{ opacity: 0, y: -12, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.4, delay: index < 3 ? index * 0.1 : 0 }}
							className='relative w-full'>
							<ScalableOrnateFrame
								src={wishCardBannerImage}
								originalWidth={2172}
								originalHeight={724}
								slice={{ top: 210, bottom: 210, isPercentage: false }}
								mode='3-slice'
								overlapPx={1}
								className='w-full filter drop-shadow-[0_4px_12px_rgba(90,50,20,0.12)]'
								contentClassName='pl-6.5 pr-6 sm:pl-8 sm:pr-7 py-0.5 sm:py-1 flex items-center justify-between gap-2 sm:gap-2.5'>
								{/* Left Column: Golden 8-petal Rosette Node */}
								<div className='w-9 sm:w-11 shrink-0 flex items-center justify-center pl-0.5 sm:pl-1'>
									<img
										src={rosetteImage}
										alt=''
										aria-hidden='true'
										className='w-7 h-7 sm:w-8 sm:h-8 object-contain filter drop-shadow-[0_2px_4px_rgba(90,50,20,0.25)]'
									/>
								</div>

								{/* Right Column: Sender Name, Message, and Timestamp */}
								<div className='flex-1 flex flex-col justify-center text-left pr-1 sm:pr-2'>
									<h4
										className='font-serif font-bold text-[13px] sm:text-[14.5px] text-[#2C1810] tracking-wide leading-tight'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										{wish.senderName}
									</h4>
									<p
										className='font-serif italic text-[11px] sm:text-[12px] text-[#4A2E1D] leading-[1.38] mt-0.5'
										style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
										{wish.message}
									</p>
									<div className='flex items-center gap-1.5 text-[10px] text-[#7D5A38] mt-1'>
										<CalendarDays className='w-3 h-3 text-[#7D5A38] shrink-0' />
										<span className='font-serif italic'>{wish.timestamp}</span>
									</div>
								</div>
							</ScalableOrnateFrame>
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 7. BOTTOM ORNAMENT: GOLDEN BAROQUE DIVIDER                        */}
			{/* ----------------------------------------------------------------- */}
			<footer className='relative z-10 w-full flex items-center justify-center pt-3 pb-1'>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='w-[170px] sm:w-[210px] max-w-[62%] h-auto flex items-center justify-center opacity-90'>
					<img
						src={bottomOrnamentImage}
						alt=''
						aria-hidden='true'
						className='w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(90,50,20,0.25)]'
					/>
				</motion.div>
			</footer>

			{/* ----------------------------------------------------------------- */}
			{/* 8. FLOATING TOAST FEEDBACK NOTIFICATION                           */}
			{/* ----------------------------------------------------------------- */}
			<AnimatePresence>
				{toastMessage && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.9 }}
						transition={{ duration: 0.2 }}
						className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2C1810] text-[#FFF6E5] border border-[#D4AF37] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-medium'>
						<CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
						<span>{toastMessage}</span>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
