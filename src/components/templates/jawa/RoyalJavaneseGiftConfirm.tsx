'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Upload, Image as ImageIcon, X, CheckCircle2, User, Building2, Coins, FileText, Sparkles } from 'lucide-react';

export interface RoyalJavaneseGiftConfirmProps {
	/** Judul script bersambung (default: 'Gift') */
	titleScript?: string;
	/** Judul teks serif utama (default: 'Confirm') */
	titleMain?: string;
	/** Baris 1 subjudul (default: 'Mohon konfirmasi untuk pengiriman gift') */
	subtitle1?: string;
	/** Baris 2 subjudul (default: 'Terima kasih') */
	subtitle2?: string;
	/** Nomor WhatsApp pengantin untuk menerima konfirmasi (default: '6281234567890') */
	recipientWaNumber?: string;
	/** Nama pasangan pengantin untuk salam pembuka pesan (default: 'Miko & Angela') */
	recipientName?: string;
	/** Nama tamu awal jika diteruskan dari undangan */
	guestName?: string;
	/** Pilihan daftar bank */
	bankOptions?: string[];
	/** Background batik gelap */
	batikBgImage?: string;
	/** Aset ukiran sudut */
	cornerCarvingImage?: string;
	/** Aset pembatas emas bawah */
	bottomOrnamentImage?: string;
	className?: string;
}

export default function RoyalJavaneseGiftConfirm({
	titleScript = 'Gift',
	titleMain = 'Confirm',
	subtitle1 = 'Mohon konfirmasi untuk pengiriman gift',
	subtitle2 = 'Terima kasih',
	recipientWaNumber = '6281234567890',
	recipientName = 'Miko & Angela',
	guestName = '',
	bankOptions = ['BCA', 'Bank Mandiri', 'BSI', 'BRI', 'BNI', 'Bank Jago', 'SeaBank', 'QRIS', 'Lainnya'],
	batikBgImage = '/templates/jawa/story/bg-batik-dark.webp',
	cornerCarvingImage = '/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp',
	bottomOrnamentImage = '/templates/jawa/Ornate Golden Floral Divider.webp',
	className = '',
}: RoyalJavaneseGiftConfirmProps) {
	// Form states (Kosong secara default agar menampilkan placeholder 'Nama' sesuai desain)
	const [senderName, setSenderName] = useState('');
	const [bankName, setBankName] = useState('');
	const [nominal, setNominal] = useState('');
	const [message, setMessage] = useState('');

	// Client-side image attachment states (Zero server storage)
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// Notification toast
	const [toastMessage, setToastMessage] = useState<string | null>(null);


	// Clean up preview object URL
	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	const showToast = (msg: string) => {
		setToastMessage(msg);
		setTimeout(() => {
			setToastMessage(null);
		}, 3500);
	};

	// Format Rupiah on typing
	const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value.replace(/\D/g, '');
		if (!rawValue) {
			setNominal('');
			return;
		}
		const formatted = new Intl.NumberFormat('id-ID').format(Number(rawValue));
		setNominal(`Rp ${formatted}`);
	};

	// File selection handler
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Release old preview
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}

		setSelectedFile(file);
		setPreviewUrl(URL.createObjectURL(file));
	};

	const handleRemoveFile = () => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		setSelectedFile(null);
		setPreviewUrl(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	// --------------------------------------------------------------------------
	// KOMBINASI OPSI A & B: WEB SHARE API (MOBILE) + WA.ME TEMPLATE (DESKTOP)
	// --------------------------------------------------------------------------
	const handleConfirmSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!senderName.trim()) {
			showToast('Mohon isi nama pengirim terlebih dahulu.');
			return;
		}

		const cleanWa = recipientWaNumber.replace(/\D/g, '');

		// Format WhatsApp template message
		const waText = [
			`Halo ${recipientName}, saya ingin mengonfirmasi pengiriman tanda kasih / kado pernikahan:`,
			'',
			`• Nama Pengirim : ${senderName.trim()}`,
			bankName ? `• Bank Tujuan   : ${bankName}` : null,
			nominal ? `• Nominal       : ${nominal}` : null,
			message ? `• Doa & Ucapan  : ${message.trim()}` : null,
			selectedFile ? '\n(Foto bukti transfer dilampirkan)' : '',
			'',
			'Terima kasih banyak!',
		]
			.filter(Boolean)
			.join('\n');

		// OPSI B: Coba Web Share API (Di HP/Mobile bisa kirim teks + lampiran foto langsung tanpa server)
		if (selectedFile && typeof navigator !== 'undefined' && 'canShare' in navigator) {
			try {
				const sharePayload = {
					title: `Konfirmasi Gift - ${senderName}`,
					text: waText,
					files: [selectedFile],
				};

				if (navigator.canShare(sharePayload)) {
					await navigator.share(sharePayload);
					showToast('Berhasil membagikan bukti transfer ke WhatsApp!');
					return;
				}
			} catch (err: any) {
				// Jika pengguna sengaja menutup dialog share, jangan force buka URL
				if (err?.name === 'AbortError') {
					return;
				}
				console.warn('Web Share API error, beralih ke wa.me:', err);
			}
		}

		// OPSI A: Buka wa.me murni (Bekerja 100% di semua browser & desktop)
		const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`;
		window.open(waUrl, '_blank');

		if (selectedFile) {
			showToast('WhatsApp terbuka! Silakan kirim dan lampirkan foto bukti TF Anda di ruang chat.');
		} else {
			showToast('WhatsApp terbuka dengan template pesan!');
		}
	};

	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/50 ring-1 ring-[#B58A45]/30 bg-[#24130B] select-none text-[#FFF6E5] flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 ${className}`}
			aria-label='Gift Confirm - Konfirmasi Pengiriman Hadiah via WhatsApp'>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: DEEP JAVANESE BATIK & WARM KERATON VIGNETTE        */}
			{/* ----------------------------------------------------------------- */}
			<img
				src={batikBgImage}
				alt=''
				aria-hidden='true'
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.78] contrast-[1.12]'
			/>

			{/* Warm Radial Vignette */}
			<div className='absolute inset-0 bg-radial from-transparent via-[#1A0C06]/40 to-[#0F0502]/85 pointer-events-none z-0' />

			{/* ----------------------------------------------------------------- */}
			{/* 2. FOUR CORNER GOLDEN BAROQUE CARVINGS                            */}
			{/* ----------------------------------------------------------------- */}
			<div className='absolute top-0 left-0 w-20 sm:w-24 pointer-events-none z-10 opacity-90 scale-x-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]'
				/>
			</div>

			<div className='absolute top-0 right-0 w-20 sm:w-24 pointer-events-none z-10 opacity-90'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]'
				/>
			</div>

			<div className='absolute bottom-0 left-0 w-20 sm:w-24 pointer-events-none z-10 opacity-90 scale-x-[-1] scale-y-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]'
				/>
			</div>

			<div className='absolute bottom-0 right-0 w-20 sm:w-24 pointer-events-none z-10 opacity-90 scale-y-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]'
				/>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 3. SECTION HEADER: "Gift Confirm" + SUBTITLES                     */}
			{/* ----------------------------------------------------------------- */}
			<header className='relative z-10 w-full flex flex-col items-center justify-center text-center pt-2 pb-3 px-2'>
				{/* Main Title: Calligraphy Script "Gift" + Serif "Confirm" */}
				<motion.div
					initial={{ opacity: 0, y: -8 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='flex items-baseline justify-center gap-1.5 mb-1'>
					<span
						className='text-[38px] sm:text-[46px] font-normal text-[#FFF5E6] tracking-normal leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]'
						style={{ fontFamily: 'var(--font-alex-brush), var(--font-great-vibes), cursive' }}>
						{titleScript}
					</span>
					<span
						className='text-[25px] sm:text-[29px] font-bold text-[#DEC396] tracking-wide leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						{titleMain}
					</span>
				</motion.div>

				{/* Subtitles in 2 Italic Lines */}
				<motion.div
					initial={{ opacity: 0, y: 6 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.15 }}
					className='mt-1 text-center space-y-0.5'>
					<p
						className='text-[12px] sm:text-[13px] italic text-[#DFC191] font-normal leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						{subtitle1}
					</p>
					<p
						className='text-[12px] sm:text-[13px] italic text-[#DFC191] font-normal leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						{subtitle2}
					</p>
				</motion.div>
			</header>

			{/* ----------------------------------------------------------------- */}
			{/* 4. FORM CARD: NAMA, BANK, NOMINAL, UCAPAN, BUKTI TF               */}
			{/* ----------------------------------------------------------------- */}
			<motion.form
				initial={{ opacity: 0, y: 14 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.2 }}
				onSubmit={handleConfirmSubmit}
				className='relative z-10 w-full max-w-[370px] sm:max-w-[400px] mx-auto space-y-3.5 my-2 px-1 sm:px-2'>
				{/* 1. FIELD: NAMA */}
				<div className='w-full'>
					<label
						htmlFor='gift-sender-name'
						className='block text-[12.5px] sm:text-[13.5px] font-semibold text-[#FFF5E6] mb-1'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						Nama :
					</label>
					<div className='relative w-full'>
						<input
							id='gift-sender-name'
							type='text'
							required
							value={senderName}
							onChange={(e) => setSenderName(e.target.value)}
							placeholder='Nama'
							className='w-full h-10 px-3.5 rounded-lg bg-white text-[#2C1810] font-sans text-xs sm:text-[13px] placeholder:text-stone-400 border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none shadow-inner transition-all'
						/>
					</div>
				</div>

				{/* 2. FIELD: NAMA BANK */}
				<div className='w-full'>
					<label
						htmlFor='gift-bank-name'
						className='block text-[12.5px] sm:text-[13.5px] font-semibold text-[#FFF5E6] mb-1'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						Nama Bank :
					</label>
					<div className='relative w-full'>
						<input
							id='gift-bank-name'
							type='text'
							list='bank-suggestions'
							value={bankName}
							onChange={(e) => setBankName(e.target.value)}
							placeholder='Nama Bank'
							className='w-full h-10 px-3.5 rounded-lg bg-white text-[#2C1810] font-sans text-xs sm:text-[13px] placeholder:text-stone-400 border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none shadow-inner transition-all'
						/>
						<datalist id='bank-suggestions'>
							{bankOptions.map((bank) => (
								<option
									key={bank}
									value={bank}
								/>
							))}
						</datalist>
					</div>
				</div>

				{/* 3. FIELD: NOMINAL */}
				<div className='w-full'>
					<label
						htmlFor='gift-nominal'
						className='block text-[12.5px] sm:text-[13.5px] font-semibold text-[#FFF5E6] mb-1'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						Nominal :
					</label>
					<div className='relative w-full'>
						<input
							id='gift-nominal'
							type='text'
							inputMode='numeric'
							value={nominal}
							onChange={handleNominalChange}
							placeholder='Nominal'
							className='w-full h-10 px-3.5 rounded-lg bg-white text-[#2C1810] font-sans text-xs sm:text-[13px] placeholder:text-stone-400 border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none shadow-inner transition-all'
						/>
					</div>
				</div>

				{/* 4. FIELD: UCAPAN */}
				<div className='w-full'>
					<label
						htmlFor='gift-message'
						className='block text-[12.5px] sm:text-[13.5px] font-semibold text-[#FFF5E6] mb-1'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						Ucapan :
					</label>
					<div className='relative w-full'>
						<textarea
							id='gift-message'
							rows={2}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder='Ucapan'
							className='w-full py-2 px-3.5 rounded-lg bg-white text-[#2C1810] font-sans text-xs sm:text-[13px] placeholder:text-stone-400 border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none shadow-inner resize-none transition-all'
						/>
					</div>
				</div>

				{/* 5. FIELD: BUKTI TF (CHOOSE FILE WITH LIVE LOCAL PREVIEW) */}
				<div className='w-full'>
					<label
						className='block text-[12.5px] sm:text-[13.5px] font-semibold text-[#FFF5E6] mb-1'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						Bukti TF :
					</label>

					{/* Hidden native input */}
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleFileSelect}
						className='hidden'
						id='gift-proof-file'
					/>

					{!selectedFile ? (
						<div
							onClick={() => fileInputRef.current?.click()}
							className='w-full h-10 px-3 rounded-lg bg-[#3A2215]/85 hover:bg-[#4A2D1D] border border-dashed border-[#D4AF37]/70 cursor-pointer flex items-center justify-between transition-colors shadow-xs group'>
							<div className='flex items-center gap-2'>
								<span className='px-2.5 py-1 rounded bg-stone-200 text-stone-800 text-[11px] font-semibold shadow-xs group-hover:bg-white transition-colors'>Choose File</span>
								<span className='text-[11.5px] text-[#DEC396] font-serif italic'>No file chosen</span>
							</div>
							<Upload className='w-3.5 h-3.5 text-[#DFC191] group-hover:scale-110 transition-transform' />
						</div>
					) : (
						<div className='w-full p-2.5 rounded-lg bg-[#3A2215]/90 border border-[#D4AF37]/80 flex items-center justify-between gap-2.5 shadow-sm'>
							<div className='flex items-center gap-2.5 overflow-hidden'>
								{previewUrl && (
									<img
										src={previewUrl}
										alt='Pratinjau Bukti'
										className='w-9 h-9 rounded object-cover border border-[#D4AF37]/50 shrink-0'
									/>
								)}
								<div className='flex flex-col text-left overflow-hidden'>
									<span className='text-xs font-semibold text-[#FFF5E6] truncate'>{selectedFile.name}</span>
									<span className='text-[10px] text-[#DFC191]'>{(selectedFile.size / 1024).toFixed(1)} KB • Siap dibagikan</span>
								</div>
							</div>

							<button
								type='button'
								onClick={handleRemoveFile}
								className='p-1 rounded-full hover:bg-black/30 text-stone-300 hover:text-white transition-colors shrink-0'
								title='Hapus file'>
								<X className='w-4 h-4' />
							</button>
						</div>
					)}
				</div>

				{/* 6. SUBMIT BUTTON: "💬 Konfirmasi" */}
				<div className='w-full pt-2'>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						className='w-full py-2.5 px-4 rounded-lg bg-[#3B2213] hover:bg-[#4C2D1A] border-2 border-[#D4AF37]/90 text-[#FFF5E6] shadow-[0_3px_12px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2 group transition-all duration-200'>
						<MessageCircle className='w-4 h-4 text-[#25D366] fill-[#25D366]/20 group-hover:scale-110 transition-transform' />
						<span
							className='font-serif text-[13.5px] sm:text-[15px] font-bold tracking-wide'
							style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
							Konfirmasi
						</span>
					</motion.button>
				</div>
			</motion.form>

			{/* ----------------------------------------------------------------- */}
			{/* 5. BOTTOM ORNAMENT: GOLDEN FLORAL DIVIDER                         */}
			{/* ----------------------------------------------------------------- */}
			<footer className='relative z-10 w-full flex items-center justify-center pt-3 pb-1'>
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='w-[160px] sm:w-[190px] max-w-[60%] h-auto flex items-center justify-center opacity-85'>
					<img
						src={bottomOrnamentImage}
						alt=''
						aria-hidden='true'
						className='w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
					/>
				</motion.div>
			</footer>

			{/* ----------------------------------------------------------------- */}
			{/* 6. FLOATING TOAST FEEDBACK NOTIFICATION                           */}
			{/* ----------------------------------------------------------------- */}
			<AnimatePresence>
				{toastMessage && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.9 }}
						transition={{ duration: 0.2 }}
						className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1F0E07] text-[#FFF6E5] border border-[#D4AF37] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-medium max-w-[90%] text-center'>
						<CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
						<span>{toastMessage}</span>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
