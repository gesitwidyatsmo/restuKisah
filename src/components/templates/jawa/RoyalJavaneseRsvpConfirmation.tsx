'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, CalendarCheck, Users, MessageSquare, ArrowRight, Check, Sparkles, RotateCcw, Loader2 } from 'lucide-react';

export interface RsvpSubmissionData {
	name: string;
	attendance: 'hadir' | 'tidak_hadir';
	pax: number;
	message?: string;
	submittedAt: string;
}

export interface RoyalJavaneseRsvpConfirmationProps {
	/** Nama tamu default dari undangan */
	guestName?: string;
	/** Judul utama (default: 'Konfirmasi Kehadiran') */
	title?: string;
	/** Subjudul / pengantar (default: 'Mohon kesediaan Anda untuk mengonfirmasi kehadiran pada acara pernikahan kami.') */
	subtitle?: string;
	/** URL gambar bingkai sertifikat berhias melati */
	cardFrameImage?: string;
	/** URL gambar plakat tombol kapsul ukir cokelat emas */
	buttonPlaqueImage?: string;
	/** Background gelap motif batik */
	batikBgImage?: string;
	/** Callback saat form berhasil dikirim */
	onSubmit?: (data: RsvpSubmissionData) => Promise<void> | void;
	/** Custom className untuk section terluar */
	className?: string;
}

/**
 * SECTION 09 — RSVP CONFIRMATION (KONFIRMASI KEHADIRAN)
 *
 * Menggunakan:
 * 1. Card: 'Ornate Jasmine-Crested Gold Certificate Frame.webp'
 *    - Mahkota bunga melati asli di puncak kartu
 *    - Ukiran emas klasik di keempat sudut & penutup bawah
 *    - Teknik 3-slice elastis anti-distorsi
 * 2. Button: 'Ornate Brown Gold Capsule Plaque.webp'
 *    - Plakat kayu ukir emas berbentuk kapsul mewah
 *    - Efek interaktif hover dan tap
 */
export default function RoyalJavaneseRsvpConfirmation({
	guestName = '',
	title = 'Konfirmasi Kehadiran',
	subtitle = 'Mohon kesediaan Anda untuk mengonfirmasi kehadiran pada acara pernikahan kami.',
	cardFrameImage = '/templates/jawa/Ornate Jasmine-Crested Gold Certificate Frame.webp',
	buttonPlaqueImage = '/templates/jawa/Ornate Brown Gold Capsule Plaque.webp',
	batikBgImage = '/templates/jawa/story/bg-batik-dark.webp',
	onSubmit,
	className = '',
}: RoyalJavaneseRsvpConfirmationProps) {
	// Form states
	const [name, setName] = useState(guestName);
	const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
	const [paxCount, setPaxCount] = useState<number>(1);
	const [message, setMessage] = useState<string>('');

	// Submission states
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [lastSubmission, setLastSubmission] = useState<RsvpSubmissionData | null>(null);

	// Stepper handlers
	const handleDecrementPax = () => {
		if (paxCount > 1) {
			setPaxCount((prev) => prev - 1);
		}
	};

	const handleIncrementPax = () => {
		if (paxCount < 5) {
			setPaxCount((prev) => prev + 1);
		}
	};

	// Form submit handler
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;

		setIsSubmitting(true);

		const submissionData: RsvpSubmissionData = {
			name: name.trim(),
			attendance,
			pax: attendance === 'hadir' ? paxCount : 0,
			message: message.trim() || undefined,
			submittedAt: new Date().toISOString(),
		};

		try {
			if (onSubmit) {
				await onSubmit(submissionData);
			} else {
				// Simulasi delay pengiriman jika tanpa handler eksternal
				await new Promise((resolve) => setTimeout(resolve, 800));
			}

			setLastSubmission(submissionData);
			setIsSubmitted(true);
		} catch (error) {
			console.error('Gagal mengirim RSVP:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResetForm = () => {
		setIsSubmitted(false);
	};

	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/50 ring-1 ring-[#B58A45]/30 bg-[#241108] select-none text-[#FFF6E5] flex flex-col justify-between py-5 sm:py-7 px-2 sm:px-3 ${className}`}
			aria-label='Section 09 — Konfirmasi Kehadiran'>
			{/* ------------------------------------------------------------- */}
			{/* 1. BACKGROUND: DEEP RICH JAVANESE EMBOSSED BATIK & VIGNETTE   */}
			{/* ------------------------------------------------------------- */}
			<img
				src={batikBgImage}
				alt=''
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.78] contrast-[1.15]'
			/>

			{/* Royal Keraton Ambient Warm Radial Vignette */}
			<div className='absolute inset-0 bg-radial from-transparent via-[#1B0C06]/40 to-[#0F0603]/85 pointer-events-none z-0' />

			{/* ------------------------------------------------------------- */}
			{/* 2. CARD CONTAINER WITH 3-SLICE JASMINE CERTIFICATE FRAME      */}
			{/* ------------------------------------------------------------- */}
			<div className='relative z-10 w-full mx-auto filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]'>
				{/* 3-SLICE FRAME BACKGROUND */}
				<div className='absolute inset-0 pointer-events-none z-0 flex flex-col'>
					{/* Top Cap: Jasmine Bouquet Crest & Top-Left/Right Corner Carvings */}
					<div
						className='w-full shrink-0 overflow-hidden'
						style={{ aspectRatio: '1122 / 380' }}>
						<svg
							viewBox='0 0 1122 380'
							className='w-full h-full block'
							preserveAspectRatio='none'>
							<image
								href={encodeURI(cardFrameImage)}
								width='1122'
								height='1402'
								x='0'
								y='0'
							/>
						</svg>
					</div>

					{/* Middle Stretching Body: Continuous Golden Side Borders & Parchment Fill */}
					<div
						className='w-full flex-1 overflow-hidden'
						style={{ marginTop: '-1px', marginBottom: '-1px' }}>
						<svg
							viewBox='0 380 1122 642'
							className='w-full h-full block'
							preserveAspectRatio='none'>
							<image
								href={encodeURI(cardFrameImage)}
								width='1122'
								height='1402'
								x='0'
								y='0'
							/>
						</svg>
					</div>

					{/* Bottom Cap: Symmetrical Lotus/Jasmine Bottom Carving & Bottom Corners */}
					<div
						className='w-full shrink-0 overflow-hidden'
						style={{ aspectRatio: '1122 / 380' }}>
						<svg
							viewBox='0 1022 1122 380'
							className='w-full h-full block'
							preserveAspectRatio='none'>
							<image
								href={encodeURI(cardFrameImage)}
								width='1122'
								height='1402'
								x='0'
								y='0'
							/>
						</svg>
					</div>
				</div>

				{/* ----------------------------------------------------------- */}
				{/* 3. CARD CONTENT LAYER (Framed Inside the Jasmine Borders)  */}
				{/* ----------------------------------------------------------- */}
				<div className='relative z-10 w-full pt-[22%] sm:pt-[23%] pb-[18%] sm:pb-[20%] px-[12%] sm:px-[12.5%] flex flex-col'>
					{/* Header Title: "Konfirmasi Kehadiran" */}
					<div className='text-center w-full mb-1'>
						<h2 className='font-serif italic font-bold text-xl sm:text-[24px] text-[#341B0D] tracking-tight leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]'>{title}</h2>

						{/* Classical Golden Floral Center Divider */}
						<div className='flex items-center justify-center my-1.5 sm:my-2 w-full max-w-[260px] mx-auto'>
							<svg
								viewBox='0 0 200 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='w-44 sm:w-52 h-3.5 text-[#B58A45]'
								aria-hidden='true'>
								{/* Left tapering line */}
								<path
									d='M10 8 L76 8'
									stroke='url(#goldDividerLeft)'
									strokeWidth='1.1'
									strokeLinecap='round'
								/>
								{/* Right tapering line */}
								<path
									d='M124 8 L190 8'
									stroke='url(#goldDividerRight)'
									strokeWidth='1.1'
									strokeLinecap='round'
								/>
								{/* Center 4-petal floral diamond crest */}
								<path
									d='M100 2 L103.5 7 L108.5 8 L103.5 9 L100 14 L96.5 9 L91.5 8 L96.5 7 Z'
									fill='#B58A45'
								/>
								<path
									d='M86 8 Q92 4 96 8 Q92 12 86 8 Z'
									fill='#C29D59'
								/>
								<path
									d='M114 8 Q108 4 104 8 Q108 12 114 8 Z'
									fill='#C29D59'
								/>
								<circle
									cx='100'
									cy='8'
									r='1.5'
									fill='#FEF3C7'
								/>
								<defs>
									<linearGradient
										id='goldDividerLeft'
										x1='10'
										y1='8'
										x2='76'
										y2='8'
										gradientUnits='userSpaceOnUse'>
										<stop
											stopColor='#B58A45'
											stopOpacity='0'
										/>
										<stop
											offset='0.65'
											stopColor='#B58A45'
											stopOpacity='0.85'
										/>
										<stop
											offset='1'
											stopColor='#B58A45'
										/>
									</linearGradient>
									<linearGradient
										id='goldDividerRight'
										x1='124'
										y1='8'
										x2='190'
										y2='8'
										gradientUnits='userSpaceOnUse'>
										<stop stopColor='#B58A45' />
										<stop
											offset='0.35'
											stopColor='#B58A45'
											stopOpacity='0.85'
										/>
										<stop
											offset='1'
											stopColor='#B58A45'
											stopOpacity='0'
										/>
									</linearGradient>
								</defs>
							</svg>
						</div>

						{/* Subtitle / Description */}
						<p className='font-serif italic text-xs sm:text-[13px] text-[#553621] leading-relaxed max-w-[270px] sm:max-w-[290px] mx-auto text-center px-1'>{subtitle}</p>
					</div>

					{/* Form Content / Success Screen */}
					<AnimatePresence mode='wait'>
						{!isSubmitted ? (
							<motion.form
								key='rsvp-form'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								onSubmit={handleSubmit}
								className='w-full mt-4 sm:mt-5 space-y-4 sm:space-y-4.5'>
								{/* --------------------------------------------------- */}
								{/* FIELD 1: NAMA TAMU                                  */}
								{/* --------------------------------------------------- */}
								<div className='w-full'>
									<label
										htmlFor='rsvp-name'
										className='flex items-center gap-1.5 font-serif font-bold text-xs sm:text-sm text-[#2C1810] mb-1.5'>
										<User
											className='w-4 h-4 text-[#3E2312] shrink-0'
											strokeWidth={1.9}
										/>
										<span>Nama Tamu</span>
									</label>
									<input
										id='rsvp-name'
										type='text'
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder='Masukkan nama lengkap Anda'
										className='w-full h-10 sm:h-11 px-3.5 rounded-xl border border-[#A8885B]/65 bg-[#FAF3E8]/75 hover:bg-[#FAF3E8]/95 focus:bg-[#FFFDF9] focus:border-[#8C6430] focus:ring-1 focus:ring-[#B58A45]/40 text-[#2C1810] font-serif placeholder:font-serif placeholder:italic placeholder:text-[#8C7764] text-xs sm:text-sm transition-all duration-200 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]'
									/>
								</div>

								{/* --------------------------------------------------- */}
								{/* FIELD 2: KEHADIRAN (HADIR / TIDAK HADIR)           */}
								{/* --------------------------------------------------- */}
								<div className='w-full'>
									<label className='flex items-center gap-1.5 font-serif font-bold text-xs sm:text-sm text-[#2C1810] mb-1.5'>
										<CalendarCheck
											className='w-4 h-4 text-[#3E2312] shrink-0'
											strokeWidth={1.9}
										/>
										<span>Kehadiran</span>
									</label>
									<div className='grid grid-cols-2 gap-2.5 sm:gap-3'>
										{/* Option 1: Hadir */}
										<button
											type='button'
											onClick={() => setAttendance('hadir')}
											className={`h-10 sm:h-11 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
												attendance === 'hadir'
													? 'bg-[#EED9B3] border-[#A8885B] shadow-[inset_0_1px_2px_rgba(181,138,69,0.25)] text-[#2C1810]'
													: 'bg-[#FAF3E8]/40 border-[#A8885B]/60 text-[#4A3222] hover:bg-[#FAF3E8]/80'
											}`}>
											{/* Radio indicator */}
											<span className='w-4.5 h-4.5 rounded-full border-[1.5px] border-[#3E2312] flex items-center justify-center shrink-0 bg-transparent'>
												{attendance === 'hadir' && <span className='w-2.5 h-2.5 rounded-full bg-[#3E2312]' />}
											</span>
											<span className='font-serif font-semibold text-xs sm:text-sm'>Hadir</span>
										</button>

										{/* Option 2: Tidak Hadir */}
										<button
											type='button'
											onClick={() => setAttendance('tidak_hadir')}
											className={`h-10 sm:h-11 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
												attendance === 'tidak_hadir'
													? 'bg-[#EED9B3] border-[#A8885B] shadow-[inset_0_1px_2px_rgba(181,138,69,0.25)] text-[#2C1810]'
													: 'bg-[#FAF3E8]/40 border-[#A8885B]/60 text-[#4A3222] hover:bg-[#FAF3E8]/80'
											}`}>
											{/* Radio indicator */}
											<span className='w-4.5 h-4.5 rounded-full border-[1.5px] border-[#8C7764] flex items-center justify-center shrink-0 bg-transparent'>
												{attendance === 'tidak_hadir' && <span className='w-2.5 h-2.5 rounded-full bg-[#3E2312]' />}
											</span>
											<span className='font-serif font-semibold text-xs sm:text-sm'>Tidak Hadir</span>
										</button>
									</div>
								</div>

								{/* --------------------------------------------------- */}
								{/* FIELD 3: JUMLAH TAMU (STEPPER)                     */}
								{/* --------------------------------------------------- */}
								<div className='w-full'>
									<label className='flex items-center gap-1.5 font-serif font-bold text-xs sm:text-sm text-[#2C1810] mb-1.5'>
										<Users
											className='w-4 h-4 text-[#3E2312] shrink-0'
											strokeWidth={1.9}
										/>
										<span>Jumlah Tamu</span>
									</label>
									<div className='w-[46%] min-w-[140px] max-w-[170px] h-10 sm:h-11 rounded-xl border border-[#A8885B]/65 bg-[#FAF3E8]/75 flex items-center justify-between divide-x divide-[#A8885B]/40 overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]'>
										{/* Minus button */}
										<button
											type='button'
											onClick={handleDecrementPax}
											disabled={paxCount <= 1 || attendance === 'tidak_hadir'}
											aria-label='Kurangi jumlah tamu'
											className='w-10 sm:w-11 h-full flex items-center justify-center text-[#2C1810] hover:bg-[#EED9B3]/70 active:bg-[#E2C799] disabled:opacity-35 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed font-serif text-lg font-bold'>
											—
										</button>

										{/* Number display */}
										<span className='flex-1 h-full flex items-center justify-center text-center font-serif font-bold text-sm sm:text-base text-[#2C1810] select-none'>
											{attendance === 'tidak_hadir' ? 0 : paxCount}
										</span>

										{/* Plus button */}
										<button
											type='button'
											onClick={handleIncrementPax}
											disabled={paxCount >= 5 || attendance === 'tidak_hadir'}
											aria-label='Tambah jumlah tamu'
											className='w-10 sm:w-11 h-full flex items-center justify-center text-[#2C1810] hover:bg-[#EED9B3]/70 active:bg-[#E2C799] disabled:opacity-35 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed font-serif text-lg font-bold'>
											+
										</button>
									</div>
								</div>

								{/* --------------------------------------------------- */}
								{/* FIELD 4: UCAPAN / PESAN (OPSIONAL)                  */}
								{/* --------------------------------------------------- */}
								<div className='w-full'>
									<label
										htmlFor='rsvp-message'
										className='flex items-center gap-1.5 font-serif font-bold text-xs sm:text-sm text-[#2C1810] mb-1.5'>
										<MessageSquare
											className='w-4 h-4 text-[#3E2312] shrink-0'
											strokeWidth={1.9}
										/>
										<span>Ucapan / Pesan</span>
										<span className='font-serif font-normal text-xs text-[#6B4B32]'>(Opsional)</span>
									</label>
									<div className='relative w-full'>
										<textarea
											id='rsvp-message'
											rows={3}
											value={message}
											onChange={(e) => setMessage(e.target.value)}
											placeholder='Tulis ucapan atau doa untuk kami...'
											className='w-full h-26 sm:h-28 p-3 rounded-xl border border-[#A8885B]/65 bg-[#FAF3E8]/75 hover:bg-[#FAF3E8]/95 focus:bg-[#FFFDF9] focus:border-[#8C6430] focus:ring-1 focus:ring-[#B58A45]/40 text-[#2C1810] font-serif placeholder:font-serif placeholder:italic placeholder:text-[#8C7764] text-xs sm:text-sm transition-all duration-200 outline-none resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]'
										/>
										{/* Bottom-right decorative corner hatch marks (from mock) */}
										<div className='absolute right-2.5 bottom-2.5 pointer-events-none opacity-40'>
											<svg
												width='8'
												height='8'
												viewBox='0 0 8 8'
												fill='none'>
												<line
													x1='1'
													y1='7'
													x2='7'
													y2='1'
													stroke='#3E2312'
													strokeWidth='1'
												/>
												<line
													x1='4'
													y1='7'
													x2='7'
													y2='4'
													stroke='#3E2312'
													strokeWidth='1'
												/>
											</svg>
										</div>
									</div>
								</div>

								{/* --------------------------------------------------- */}
								{/* 5. SUBMIT BUTTON (ORNATE BROWN GOLD CAPSULE PLAQUE) */}
								{/* --------------------------------------------------- */}
								<div className='w-full pt-3 sm:pt-3.5 flex justify-center'>
									<motion.button
										whileHover={{ scale: 1.025 }}
										whileTap={{ scale: 0.975 }}
										type='submit'
										disabled={isSubmitting}
										className='relative w-full max-w-[250px] sm:max-w-[270px] aspect-[1991/313] flex items-center justify-center cursor-pointer group select-none disabled:opacity-60 disabled:cursor-not-allowed'>
										{/* Plaque Background Image Asset */}
										<img
											src={encodeURI(buttonPlaqueImage)}
											alt=''
											className='absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_12px_rgba(36,17,8,0.45)] group-hover:brightness-110 group-hover:drop-shadow-[0_6px_16px_rgba(181,138,69,0.4)] transition-all duration-300'
										/>

										{/* Button Text & Arrow */}
										<span className='relative z-10 flex items-center justify-center gap-2 text-[#FFFDF8] group-hover:text-[#FEF3C7] font-serif font-medium text-xs sm:text-[13.5px] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]'>
											{isSubmitting ? (
												<>
													<Loader2 className='w-3.5 h-3.5 animate-spin text-amber-200' />
													<span>Mengirimkan...</span>
												</>
											) : (
												<>
													<span>Kirim Konfirmasi</span>
													<span className='text-sm sm:text-base font-serif transition-transform group-hover:translate-x-1 inline-block leading-none'>→</span>
												</>
											)}
										</span>
									</motion.button>
								</div>
							</motion.form>
						) : (
							/* ===================================================== */
							/* SUCCESS CONFIRMATION STATE                            */
							/* ===================================================== */
							<motion.div
								key='rsvp-success'
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.4 }}
								className='w-full mt-3 sm:mt-4 py-4 px-3 text-center flex flex-col items-center'>
								{/* Gold Crest Badge with Checkmark */}
								<div className='w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-[#8C6430] shadow-md flex items-center justify-center mb-2.5'>
									<Check
										className='w-6 h-6 text-[#2C1810]'
										strokeWidth={2.5}
									/>
								</div>

								<span className='text-[10px] font-serif tracking-[0.2em] uppercase font-bold text-[#8C6430] block mb-0.5'>✦ MATUR NUWUN ✦</span>
								<h3 className='font-serif italic font-bold text-lg sm:text-xl text-[#2C1810] mb-1'>Konfirmasi Anda Telah Diterima!</h3>
								<p className='font-serif italic text-xs text-[#553621] leading-relaxed max-w-[260px] mb-3'>
									{lastSubmission?.attendance === 'hadir'
										? `Terima kasih banyak ${lastSubmission.name}. Kami sangat menantikan kehadiran Anda (${lastSubmission.pax} Orang).`
										: `Terima kasih atas konfirmasinya, ${lastSubmission?.name}. Doa dan restu Anda tetap menjadi berkah terindah bagi kami.`}
								</p>

								{/* Display submitted wish if any */}
								{lastSubmission?.message && (
									<div className='w-full p-2.5 rounded-xl border border-[#A8885B]/50 bg-[#FAF3E8]/80 text-left mb-3'>
										<span className='text-[10px] font-serif font-bold text-[#8C6430] block mb-0.5'>Pesan / Doa Anda:</span>
										<p className='font-serif italic text-xs text-[#2C1810]'>&ldquo;{lastSubmission.message}&rdquo;</p>
									</div>
								)}

								{/* Edit / Change Response Button */}
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
									type='button'
									onClick={handleResetForm}
									className='inline-flex items-center gap-1.5 px-4 py-2 text-xs font-serif font-semibold text-[#65422F] hover:text-[#2C1810] bg-[#FAF3E8] border border-[#A8885B]/60 rounded-full shadow-xs transition-colors cursor-pointer'>
									<RotateCcw className='w-3 h-3' />
									<span>Ubah Konfirmasi</span>
								</motion.button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
