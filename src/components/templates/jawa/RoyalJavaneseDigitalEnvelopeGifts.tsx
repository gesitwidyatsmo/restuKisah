'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScalableOrnateFrame from '@/components/ui/ScalableOrnateFrame';
import { Landmark, Copy, Check, MapPin, ExternalLink, Gift, Send, Sparkles, X, QrCode, CheckCircle2, MessageCircle } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. BANK ACCOUNT & PROP INTERFACES                                          */
/* -------------------------------------------------------------------------- */

export interface BankAccountItem {
	id: string;
	bankName: 'bca' | 'mandiri' | 'bri' | 'bni' | 'bsi' | string;
	bankTitleBadge: string; // e.g. 'Transfer Bank 1'
	accountNumber: string;
	accountHolder: string;
	customLogo?: string;
	qrisImage?: string;
}

export interface RoyalJavaneseDigitalEnvelopeGiftsProps {
	// Section Header
	sectionTitle?: string;
	sectionSubtitle1?: string;
	sectionSubtitle2?: string;
	sectionSubtitle3?: string;
	sectionSubtitle4?: string;

	// Bank Accounts List
	bankAccounts?: BankAccountItem[];

	// Physical Gift Details
	physicalGiftTitle?: string;
	physicalGiftRecipient?: string;
	physicalGiftAddress?: string;
	physicalGiftNotes?: string;
	physicalGiftPhone?: string;
	physicalGiftMapUrl?: string;
	physicalGiftImage?: string;

	// WhatsApp Confirmation Contact
	confirmationWaNumber?: string; // e.g. '6281234567890'
	confirmationWaText?: string;

	// Decorative Assets
	backgroundImage?: string;
	topGarlandLeftImage?: string;
	topGarlandRightImage?: string;
	topCrestImage?: string;
	cardFrameImage?: string;
	plaqueFrameImage?: string;
	dividerGoldImage?: string;
	bottomOrnamentImage?: string;
	cornerCarvingImage?: string;

	className?: string;
}

/* -------------------------------------------------------------------------- */
/* 2. INDONESIAN BANK LOGO CDN (idn-finlogos@2 via jsDelivr) & FALLBACKS     */
/* -------------------------------------------------------------------------- */

export const IDN_FINLOGOS_CDN_BASE = 'https://cdn.jsdelivr.net/npm/idn-finlogos@2/dist/icons';

export const BANK_LOGO_SLUGS: Record<string, string> = {
	bca: 'bca.svg',
	mandiri: 'mandiri.svg',
	bri: 'bri.svg',
	bni: 'bni.svg',
	bsi: 'bsi.svg',
	cimb: 'cimb-niaga.svg',
	'cimb-niaga': 'cimb-niaga.svg',
	permata: 'permata.svg',
	danamon: 'danamon.svg',
	btn: 'btn.svg',
	jago: 'jago.svg',
	seabank: 'seabank.svg',
	jenius: 'jenius.svg',
	'blu-bca': 'blu-bca.svg',
	blu: 'blu-bca.svg',
	'bca-digital': 'bca-digital.svg',
	mega: 'mega.svg',
	'ocbc-nisp': 'ocbc-nisp.svg',
	ocbc: 'ocbc-nisp.svg',
	muamalat: 'muamalat.svg',
	'bank-dki': 'bank-dki.svg',
	'bank-bjb': 'bank-bjb.svg',
	qris: 'qris.svg',
	gopay: 'gopay.svg',
	ovo: 'ovo.svg',
	dana: 'dana.svg',
	shopeepay: 'shopeepay.svg',
	linkaja: 'linkaja.svg',
};

export const BANK_LOCAL_SVGS: Record<string, string> = {
	bca: '/templates/jawa/banks/bca.svg',
	mandiri: '/templates/jawa/banks/mandiri.svg',
	bri: '/templates/jawa/banks/bri.svg',
	bni: '/templates/jawa/banks/bni.svg',
	bsi: '/templates/jawa/banks/bsi.svg',
	cimb: '/templates/jawa/banks/cimb-niaga.svg',
	'cimb-niaga': '/templates/jawa/banks/cimb-niaga.svg',
	permata: '/templates/jawa/banks/permata.svg',
	danamon: '/templates/jawa/banks/danamon.svg',
	btn: '/templates/jawa/banks/btn.svg',
	jago: '/templates/jawa/banks/jago.svg',
	seabank: '/templates/jawa/banks/seabank.svg',
	qris: '/templates/jawa/banks/qris.svg',
};

/**
 * Mendapatkan URL SVG resmi untuk bank Indonesia apa pun (prioritas aset lokal valid XML, fallback ke CDN)
 */
export function getBankLogoUrl(bankKey: string): string {
	const key = bankKey.toLowerCase().trim().replace(/\s+/g, '-');
	if (BANK_LOCAL_SVGS[key]) {
		return BANK_LOCAL_SVGS[key];
	}
	const filename = BANK_LOGO_SLUGS[key] || `${key}.svg`;
	return `${IDN_FINLOGOS_CDN_BASE}/${filename}`;
}

export function BcaLogo({ className = 'h-7 w-auto' }: { className?: string }) {
	return (
		<div className={`flex items-center gap-1.5 select-none ${className}`}>
			{/* BCA Iconic Blue Diamond Emblem with White 4-Leaf Floral Center */}
			<svg
				viewBox='0 0 48 48'
				className='h-7 w-7 aspect-square shrink-0 drop-shadow-xs'
				fill='none'>
				<rect
					width='48'
					height='48'
					rx='10'
					fill='#005DAA'
				/>
				<path
					d='M24 12C21.8 16.5 19.5 19.8 15 19.8C17.2 22 20.5 23.2 24 23.2C27.5 23.2 30.8 22 33 19.8C28.5 19.8 26.2 16.5 24 12Z'
					fill='white'
				/>
				<path
					d='M24 36C26.2 31.5 28.5 28.2 33 28.2C30.8 26 27.5 24.8 24 24.8C20.5 24.8 17.2 26 15 28.2C19.5 28.2 21.8 31.5 24 36Z'
					fill='white'
				/>
				<path
					d='M12 24C16.5 26.2 19.8 28.5 19.8 33C22 30.8 23.2 27.5 23.2 24C23.2 20.5 22 17.2 19.8 15C19.8 19.5 16.5 21.8 12 24Z'
					fill='white'
				/>
				<path
					d='M36 24C31.5 21.8 28.2 19.5 28.2 15C26 17.2 24.8 20.5 24.8 24C24.8 27.5 26 30.8 28.2 33C28.2 28.5 31.5 26.2 36 24Z'
					fill='white'
				/>
				<circle
					cx='24'
					cy='24'
					r='3.4'
					fill='#005DAA'
				/>
				<circle
					cx='24'
					cy='24'
					r='2'
					fill='white'
				/>
			</svg>
			{/* BCA Wordmark in Distinctive Bold Sans */}
			<span className='font-sans font-black text-[#005DAA] text-[22px] sm:text-[25px] tracking-tight italic leading-none'>BCA</span>
		</div>
	);
}

export function MandiriLogo({ className = 'h-7 w-auto' }: { className?: string }) {
	return (
		<div className={`flex flex-col items-center justify-center select-none ${className}`}>
			{/* Mandiri Golden Waves Swoosh */}
			<svg
				viewBox='0 0 68 18'
				className='w-16 h-auto shrink-0 drop-shadow-xs'
				fill='none'>
				<path
					d='M2 13C12 5 22 4 34 10C44 15 56 14 66 7C58 11 46 12 36 7C24 2 12 4 2 13Z'
					fill='#FFB700'
				/>
				<path
					d='M10 16C18 10 26 9 36 14C44 17 52 16 60 11C54 14 44 15 36 11C28 7 18 9 10 16Z'
					fill='#E69100'
				/>
			</svg>
			{/* mandiri lowercase rounded text */}
			<span className='font-sans font-bold text-[#002D62] text-[17px] sm:text-[19px] tracking-tight -mt-0.5 leading-none'>mandiri</span>
		</div>
	);
}

/**
 * Komponen BankLogoImage: Memuat logo dari CDN idn-finlogos dengan fallback otomatis
 */
export function BankLogoImage({
	bankName,
	customLogo,
	className = 'max-h-7 sm:max-h-8 max-w-[105px] sm:max-w-[120px] w-auto object-contain filter drop-shadow-xs',
}: {
	bankName: string;
	customLogo?: string;
	className?: string;
}) {
	const [hasError, setHasError] = useState(false);
	const logoUrl = customLogo || getBankLogoUrl(bankName);

	if (hasError) {
		return (
			<div className='flex items-center gap-1.5 font-bold text-sm text-[#2C1810] uppercase'>
				<Landmark className='w-4 h-4 text-[#7D3F1D]' />
				<span>{bankName}</span>
			</div>
		);
	}

	return (
		<img
			src={logoUrl}
			alt={`Logo ${bankName}`}
			className={className}
			onError={() => setHasError(true)}
		/>
	);
}

/* -------------------------------------------------------------------------- */
/* 3. MAIN COMPONENT: ROYAL JAVANESE DIGITAL ENVELOPE & WEDDING GIFTS         */
/* -------------------------------------------------------------------------- */

export default function RoyalJavaneseDigitalEnvelopeGifts({
	sectionTitle = 'A Gift of Blessings',
	sectionSubtitle1 = 'Doa dan kehadiran Bapak/Ibu/Saudara/i',
	sectionSubtitle2 = 'merupakan anugerah terindah bagi kami.',
	sectionSubtitle3 = 'Bagi yang berkenan memberikan tanda kasih,',
	sectionSubtitle4 = 'berikut beberapa pilihan yang dapat digunakan:',

	bankAccounts = [
		{
			id: 'bank-bca',
			bankName: 'bca',
			bankTitleBadge: 'Transfer Bank 1',
			accountNumber: '1234 5678 9012',
			accountHolder: 'a.n. Raden Bramantyo',
		},
		{
			id: 'bank-mandiri',
			bankName: 'mandiri',
			bankTitleBadge: 'Transfer Bank 2',
			accountNumber: '9876 5432 1098',
			accountHolder: 'a.n. Raden Bramantyo',
		},
	],

	physicalGiftTitle = 'Kirim Hadiah Fisik',
	physicalGiftRecipient = 'Raden Bramantyo & Putri Sekar Ayu',
	physicalGiftAddress = 'Jl. Prawirotaman No. 27, Kraton, Yogyakarta 55133',
	physicalGiftNotes = 'Mohon sertakan nama pengirim pada paket hadiah fisik.',
	physicalGiftPhone = '+62 812-3456-7890',
	physicalGiftMapUrl = 'https://maps.google.com/?q=Jl.+Prawirotaman+No.+27,+Kraton,+Yogyakarta+55133',
	physicalGiftImage = '/templates/jawa/Batik Gift Box with Jasmine Accents.webp',

	confirmationWaNumber = '6281234567890',
	confirmationWaText = 'Halo Raden Bramantyo & Putri Sekar Ayu, saya berkenan memberikan tanda kasih untuk pernikahan kalian...',

	backgroundImage = '/templates/jawa/common/bg-cream-embossed.webp',
	topGarlandLeftImage = '/templates/jawa/common/jasmine-cascade-hanging.webp',
	topGarlandRightImage = '/templates/jawa/common/jasmine-cascade-hanging.webp',
	topCrestImage = '/templates/jawa/common/crest-wood-gold.webp',
	cardFrameImage = '/templates/jawa/Ornate Golden Parchment Card.webp',
	plaqueFrameImage = '/templates/jawa/Ornate Brown Gold Capsule Plaque.webp',
	dividerGoldImage = '/templates/jawa/common/divider-gold.webp',
	bottomOrnamentImage = '/templates/jawa/Ornate Golden Floral Divider.webp',
	cornerCarvingImage = '/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp',

	className = '',
}: RoyalJavaneseDigitalEnvelopeGiftsProps) {
	// Copied state tracking per account or address
	const [copiedKey, setCopiedKey] = useState<string | null>(null);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	// Modals state
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

	const showToast = (message: string) => {
		setToastMessage(message);
		setTimeout(() => {
			setToastMessage(null);
		}, 2600);
	};

	const handleCopy = (text: string, key: string, label: string) => {
		navigator.clipboard.writeText(text.replace(/\s+/g, ' '));
		setCopiedKey(key);
		showToast(`${label} berhasil disalin!`);
		setTimeout(() => {
			setCopiedKey((prev) => (prev === key ? null : prev));
		}, 2500);
	};

	const handleOpenWhatsApp = () => {
		const url = `https://wa.me/${confirmationWaNumber}?text=${encodeURIComponent(confirmationWaText)}`;
		window.open(url, '_blank');
	};

	return (
		<section
			className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/50 ring-1 ring-[#B58A45]/30 bg-[#FAF7F0] select-none text-[#2C1810] flex flex-col justify-between py-6 sm:py-8 px-3.5 sm:px-4.5 ${className}`}
			aria-label='Digital Envelope & Wedding Gifts - Tanda Kasih & Kado Pernikahan'>
			{/* ----------------------------------------------------------------- */}
			{/* 1. BACKGROUND: HERITAGE CREAM EMBOSSED PARCHMENT & WARM VIGNETTE  */}
			{/* ----------------------------------------------------------------- */}
			<img
				src={backgroundImage}
				alt='Royal Javanese Parchment Background'
				className='absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.98] contrast-[1.04]'
			/>

			{/* Royal Keraton Ambient Warm Vignette Overlay */}
			<div className='absolute inset-0 bg-radial from-transparent via-[#2A170E]/5 to-[#1F1009]/20 pointer-events-none z-0' />

			{/* ----------------------------------------------------------------- */}
			{/* 2. FOUR CORNER BAROQUE GOLDEN CARVINGS                            */}
			{/* ----------------------------------------------------------------- */}
			{/* Top Left: Flipped horizontally */}
			<div className='absolute top-0 left-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-x-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]'
				/>
			</div>

			{/* Top Right: Original orientation */}
			<div className='absolute top-0 right-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]'
				/>
			</div>

			{/* Bottom Left: Flipped horizontally & vertically */}
			<div className='absolute bottom-0 left-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-x-[-1] scale-y-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]'
				/>
			</div>

			{/* Bottom Right: Flipped vertically */}
			<div className='absolute bottom-0 right-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-y-[-1]'>
				<img
					src={cornerCarvingImage}
					alt=''
					aria-hidden='true'
					className='w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]'
				/>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 3. CASCADING JASMINE GARLANDS AT TOP CORNERS                      */}
			{/* ----------------------------------------------------------------- */}
			{/* Left Hanging Jasmine Cascade */}
			<div
				className='absolute pointer-events-none z-20 opacity-95'
				style={{ left: '1.5%', top: '-0.5%', width: '15%' }}>
				<img
					src={topGarlandLeftImage}
					alt=''
					aria-hidden='true'
					className='w-full h-auto object-contain filter drop-shadow-xs'
				/>
			</div>

			{/* Right Hanging Jasmine Cascade (Mirrored) */}
			<div
				className='absolute pointer-events-none z-20 opacity-95 scale-x-[-1]'
				style={{ right: '1.5%', top: '-0.5%', width: '15%' }}>
				<img
					src={topGarlandRightImage}
					alt=''
					aria-hidden='true'
					className='w-full h-auto object-contain filter drop-shadow-xs'
				/>
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 4. SECTION HEADER: CREST + "A Gift of Blessings" + SUBTITLES      */}
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

				{/* Section Heading: "A Gift of Blessings" */}
				<motion.h2
					initial={{ opacity: 0, scale: 0.96 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, delay: 0.1 }}
					className='text-[27px] xs:text-[30px] sm:text-[33px] font-normal text-[#2C1810] tracking-wide leading-tight drop-shadow-xs'
					style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
					A Gift <span className='italic font-normal text-[#4A2B18]'>of</span> Blessings
				</motion.h2>

				{/* Subtitle in 4 Italic Lines */}
				<motion.div
					initial={{ opacity: 0, y: 6 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='mt-2 text-center max-w-[90%] mx-auto space-y-0.5'>
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
					<p
						className='text-[12px] sm:text-[13px] italic text-[#4A2B18] font-normal leading-relaxed'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						{sectionSubtitle3}
					</p>
					<p
						className='text-[12px] sm:text-[13px] italic text-[#4A2B18] font-normal leading-relaxed'
						style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
						{sectionSubtitle4}
					</p>
				</motion.div>
			</header>

			{/* ----------------------------------------------------------------- */}
			{/* 5. BANK TRANSFER CARDS (USING ScalableOrnateFrame)                */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full flex flex-col gap-3 sm:gap-3.5 my-2'>
				{bankAccounts.map((account, index) => {
					const isCopied = copiedKey === account.id;

					return (
						<motion.div
							key={account.id}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
							className='relative w-full pt-3 sm:pt-3.5'>
							<ScalableOrnateFrame
								src={cardFrameImage}
								originalWidth={1460}
								originalHeight={767}
								slice={{ top: 140, bottom: 130, isPercentage: false }}
								mode='3-slice'
								overlapPx={1}
								className='w-full filter drop-shadow-[0_8px_18px_rgba(90,50,20,0.18)]'
								contentClassName='px-4 sm:px-5 pt-0 pb-1.5 flex flex-col items-center'>
								{/* Header Plaque: Capsule Plaque with Landmark Icon & Title */}
								<div className='relative w-[180px] sm:w-[205px] aspect-[1991/313] mx-auto flex items-center justify-center -mt-6 sm:-mt-7 mb-1'>
									<img
										src={plaqueFrameImage}
										alt=''
										aria-hidden='true'
										className='absolute inset-0 w-full h-full object-contain pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]'
									/>
									<div className='relative z-10 -mt-0.5 flex items-center justify-center gap-1.5 px-3 text-[#FFF6E5]'>
										<Landmark
											className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFF6E5] shrink-0 drop-shadow-xs'
											strokeWidth={2.2}
										/>
										<span
											className='font-serif text-[12px] sm:text-[13.5px] font-bold text-[#FFF6E5] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
											style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
											{account.bankTitleBadge}
										</span>
									</div>
								</div>

								{/* Card Content: Left Column (Bank Logo) | Vertical Divider | Right Column (Account Info & Button) */}
								<div className='w-full flex items-center justify-between gap-2.5 sm:gap-3.5 my-1'>
									{/* Left Column: Bank Logo (via idn-finlogos CDN with fallback) */}
									<div className='w-[34%] sm:w-[36%] shrink-0 flex items-center justify-center py-2 px-1'>
										<BankLogoImage
											bankName={account.bankName}
											customLogo={account.customLogo}
										/>
									</div>

									{/* Vertical Subtle Separator Divider */}
									<div className='w-[1px] h-20 sm:h-22 bg-gradient-to-b from-transparent via-[#C5A880]/70 to-transparent shrink-0' />

									{/* Right Column: Recipient Name, Account Number Box, and Copy Button */}
									<div className='w-[64%] sm:w-[62%] flex flex-col justify-center text-left text-[#3D2213] pl-1'>
										{/* Account Holder Name */}
										<div
											className='text-[12.5px] sm:text-[13.5px] font-semibold text-[#3D2213] leading-tight mb-1 tracking-wide'
											style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
											{account.accountHolder}
										</div>

										{/* Account Number Box with Quick Copy Icon */}
										<div className='w-full rounded-xl sm:rounded-2xl bg-[#F7EEDD]/90 border border-[#D9BE9B] px-3 py-1.5 sm:py-2 flex items-center justify-between shadow-xs mb-2 transition-all hover:border-[#B58A45]'>
											<span className='font-mono text-[13px] sm:text-[15px] font-bold text-[#2C1810] tracking-wider select-text'>{account.accountNumber}</span>
											<button
												onClick={() => handleCopy(account.accountNumber, account.id, 'Nomor Rekening')}
												className='p-1 rounded-md hover:bg-[#EBDDC5] text-[#7D3F1D] transition-colors shrink-0'
												title='Salin nomor rekening'
												aria-label='Salin nomor rekening'>
												{isCopied ? <Check className='w-4 h-4 text-emerald-600 stroke-[2.5]' /> : <Copy className='w-4 h-4 text-[#7D3F1D] stroke-[2.2]' />}
											</button>
										</div>

										{/* Action Button: "Salin Nomor Rekening" */}
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => handleCopy(account.accountNumber, account.id, 'Nomor Rekening')}
											className='w-full py-1.5 sm:py-2 px-3 rounded-full bg-gradient-to-r from-[#7D3F1D] via-[#54240A] to-[#7D3F1D] border border-[#D4AF37]/90 shadow-[0_2px_8px_rgba(84,36,10,0.3)] flex items-center justify-center gap-1.5 group transition-all duration-200'>
											{isCopied ? (
												<>
													<Check className='w-3.5 h-3.5 text-emerald-300 stroke-[2.5]' />
													<span
														className='font-serif text-[11px] sm:text-[12px] font-bold text-[#FFF7E8] tracking-wider'
														style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
														Nomor Rekening Tersalin!
													</span>
												</>
											) : (
												<>
													<Copy className='w-3.5 h-3.5 text-[#FFF6E5] stroke-[2.2] group-hover:scale-110 transition-transform' />
													<span
														className='font-serif text-[11px] sm:text-[12px] font-bold text-[#FFF7E8] tracking-wider'
														style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
														Salin Nomor Rekening
													</span>
												</>
											)}
										</motion.button>
									</div>
								</div>
							</ScalableOrnateFrame>
						</motion.div>
					);
				})}
			</div>

			{/* ----------------------------------------------------------------- */}
			{/* 6. ORNAMENTAL GOLDEN DIVIDER BETWEEN BANKS & PHYSICAL GIFTS       */}
			{/* ----------------------------------------------------------------- */}
			<div className='relative z-10 w-full flex items-center justify-center my-1 sm:my-1.5'>
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
			{/* 7. CARD 03: PHYSICAL WEDDING GIFTS (KIRIM HADIAH FISIK)           */}
			{/* ----------------------------------------------------------------- */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.4 }}
				className='relative z-10 w-full my-1 sm:my-1.5'>
				<ScalableOrnateFrame
					src={cardFrameImage}
					originalWidth={1460}
					originalHeight={767}
					slice={{ top: 140, bottom: 130, isPercentage: false }}
					mode='3-slice'
					overlapPx={1}
					className='w-full filter drop-shadow-[0_8px_18px_rgba(90,50,20,0.18)]'
					contentClassName='px-4 sm:px-5 py-2 sm:py-2.5 flex flex-col items-center'>
					<div className='w-full flex items-center justify-between gap-3'>
						{/* Left Column: 3D Batik Gift Box with Golden Silk Ribbon & Jasmine Flowers */}
						<div
							onClick={() => setIsAddressModalOpen(true)}
							className='w-[38%] sm:w-[40%] shrink-0 relative cursor-pointer group'
							title='Klik untuk melihat detail alamat pengiriman hadiah'>
							<div className='relative w-full aspect-[1536/1024] flex items-center justify-center'>
								<img
									src={physicalGiftImage}
									alt='Kado Pernikahan Batik Tradisional Jawa Berhias Melati'
									className='w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(90,50,20,0.25)] group-hover:scale-105 transition-transform duration-300'
								/>
								<div className='absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity'>
									<Sparkles className='w-4 h-4 text-amber-500 animate-spin' />
								</div>
							</div>
						</div>

						{/* Right Column: Physical Gift Address & Map Action */}
						<div className='w-[62%] sm:w-[60%] flex flex-col justify-center text-left text-[#3D2213] pl-1'>
							{/* Header Title with MapPin */}
							<div className='flex items-center gap-1.5 text-[#2C1810] mb-1'>
								<MapPin
									className='w-4 h-4 text-[#7D3F1D] shrink-0'
									strokeWidth={2.4}
								/>
								<h3
									className='font-serif text-[14px] sm:text-[15.5px] font-bold tracking-wide'
									style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
									{physicalGiftTitle}
								</h3>
							</div>

							{/* Postal Address Description */}
							<p
								className='text-[11px] sm:text-[12px] text-[#4A2B18] font-medium leading-[1.42] mb-2 sm:mb-2.5'
								style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
								{physicalGiftAddress}
							</p>

							{/* Actions: "Lihat Peta" Button & "Salin Alamat" Button */}
							<div className='flex items-center gap-2'>
								<a
									href={physicalGiftMapUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3E7D3] hover:bg-[#EBDBC2] border border-[#B89255]/80 text-[#4A2612] text-[10.5px] sm:text-[11.5px] font-bold shadow-xs transition-colors group'>
									<MapPin className='w-3.5 h-3.5 text-[#7D3F1D] shrink-0 group-hover:scale-110 transition-transform' />
									<span>Lihat Peta</span>
								</a>

								<button
									onClick={() => handleCopy(physicalGiftAddress, 'address', 'Alamat Pengiriman')}
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#C5A880]/80 text-[#54240A] text-[10.5px] sm:text-[11.5px] font-semibold transition-colors'
									title='Salin alamat pengiriman'>
									{copiedKey === 'address' ? (
										<>
											<Check className='w-3 h-3 text-emerald-600' />
											<span>Tersalin</span>
										</>
									) : (
										<>
											<Copy className='w-3 h-3 text-[#7D3F1D]' />
											<span>Salin Alamat</span>
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				</ScalableOrnateFrame>
			</motion.div>

			{/* ----------------------------------------------------------------- */}
			{/* 9. BOTTOM ORNAMENT: GOLDEN BAROQUE / FLORAL DIVIDER               */}
			{/* ----------------------------------------------------------------- */}
			<footer className='relative z-10 w-full flex items-center justify-center pt-2 pb-1'>
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
			{/* 10. FLOATING TOAST FEEDBACK NOTIFICATION                          */}
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

			{/* ----------------------------------------------------------------- */}
			{/* 11. MODAL: FULL ADDRESS & DELIVERY INSTRUCTIONS                   */}
			{/* ----------------------------------------------------------------- */}
			<AnimatePresence>
				{isAddressModalOpen && (
					<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs'>
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.92, y: 20 }}
							transition={{ duration: 0.25 }}
							className='relative w-full max-w-sm rounded-3xl bg-[#FAF6EE] text-[#2C1810] border-2 border-[#D4AF37] shadow-2xl p-5 overflow-hidden'>
							{/* Close Button */}
							<button
								onClick={() => setIsAddressModalOpen(false)}
								className='absolute top-3.5 right-3.5 p-1.5 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors'
								aria-label='Tutup modal'>
								<X className='w-4 h-4' />
							</button>

							<div className='text-center mb-3 pt-1'>
								<span className='inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] uppercase tracking-wider mb-1.5 border border-amber-200'>
									<Gift className='w-3 h-3 text-[#7D3F1D]' />
									Kirim Hadiah Fisik
								</span>
								<h3
									className='text-xl font-bold text-[#422211]'
									style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
									Alamat Pengiriman Kado
								</h3>
							</div>

							<div className='bg-white rounded-2xl p-4 border border-stone-200 shadow-xs mb-3.5 text-xs text-stone-700 space-y-2'>
								<div>
									<span className='text-[10px] uppercase font-bold text-stone-500 block'>Penerima:</span>
									<span className='font-bold text-[#2C1810] text-sm'>{physicalGiftRecipient}</span>
								</div>
								<div>
									<span className='text-[10px] uppercase font-bold text-stone-500 block'>Alamat Lengkap:</span>
									<span className='leading-relaxed block select-text'>{physicalGiftAddress}</span>
								</div>
								<div>
									<span className='text-[10px] uppercase font-bold text-stone-500 block'>Nomor Telepon:</span>
									<span className='font-mono font-semibold'>{physicalGiftPhone}</span>
								</div>
								{physicalGiftNotes && <div className='pt-1 border-t border-stone-100 text-[11px] text-stone-500 italic'>{physicalGiftNotes}</div>}
							</div>

							<div className='flex items-center gap-2'>
								<button
									onClick={() => {
										handleCopy(`${physicalGiftRecipient}\n${physicalGiftAddress}\nTelp: ${physicalGiftPhone}`, 'full-address', 'Alamat lengkap');
										setIsAddressModalOpen(false);
									}}
									className='flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#7D3F1D] to-[#54240A] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 hover:brightness-110 transition-all'>
									<Copy className='w-3.5 h-3.5' />
									<span>Salin Lengkap</span>
								</button>
								<a
									href={physicalGiftMapUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='py-2 px-3.5 rounded-xl bg-[#FAF0DC] text-[#4A2612] border border-[#B89255]/70 font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#F5E5C9] transition-colors'>
									<MapPin className='w-3.5 h-3.5 text-[#7D3F1D]' />
									<span>Google Maps</span>
								</a>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</section>
	);
}
