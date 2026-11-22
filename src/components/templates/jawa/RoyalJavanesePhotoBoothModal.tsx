'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  X,
  Camera,
  Image as ImageIcon,
  Upload,
  Download,
  Share2,
  RotateCw,
  FlipHorizontal,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Sparkles,
  Check,
  Move,
  Heart,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export interface FrameOption {
  id: string;
  name: string;
  subtitle: string;
  webpSrc: string;
  pngSrc: string;
}

export const PHOTO_BOOTH_FRAMES: FrameOption[] = [
  {
    id: 'ceremonial',
    name: 'Batik Keraton',
    subtitle: 'Upacara Adat',
    webpSrc: '/templates/jawa/frame Photo Booth/Javanese Gold Batik Ceremonial Frame.webp',
    pngSrc: '/templates/jawa/frame Photo Booth/Javanese Gold Batik Ceremonial Frame.png',
  },
  {
    id: 'gebyok',
    name: 'Gebyok Klasik',
    subtitle: 'Ukiran Jati Emas',
    webpSrc: '/templates/jawa/frame Photo Booth/Ornate Javanese Gold Batik Photo Frame.webp',
    pngSrc: '/templates/jawa/frame Photo Booth/Ornate Javanese Gold Batik Photo Frame.png',
  },
  {
    id: 'jasmine',
    name: 'Ronce Melati',
    subtitle: 'Bunga Melati & Emas',
    webpSrc: '/templates/jawa/frame Photo Booth/Ornate Javanese Wedding Frame with Jasmine Garlands.webp',
    pngSrc: '/templates/jawa/frame Photo Booth/Ornate Javanese Wedding Frame with Jasmine Garlands.png',
  },
];

interface RoyalJavanesePhotoBoothModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFrameId?: string;
}

export default function RoyalJavanesePhotoBoothModal({
  isOpen,
  onClose,
  initialFrameId = 'gebyok',
}: RoyalJavanesePhotoBoothModalProps) {
  // Step state: 'select' (choose frame & photo) -> 'edit' (pan & zoom) -> 'preview' (download & share)
  const [step, setStep] = useState<'select' | 'edit' | 'preview'>('select');
  const [selectedFrameId, setSelectedFrameId] = useState<string>(initialFrameId);

  // Photo state
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const [userImageElement, setUserImageElement] = useState<HTMLImageElement | null>(null);

  // Transform states
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Interaction dragging states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStartDistRef = useRef<number | null>(null);
  const zoomStartRef = useRef<number>(1.0);

  // Processing & Export
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [exportedImageBlob, setExportedImageBlob] = useState<Blob | null>(null);
  const [exportedImageUrl, setExportedImageUrl] = useState<string | null>(null);
  const [copiedShareText, setCopiedShareText] = useState<boolean>(false);

  // DOM Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement>(null);

  const selectedFrame = PHOTO_BOOTH_FRAMES.find((f) => f.id === selectedFrameId) || PHOTO_BOOTH_FRAMES[0];

  // Reset transforms when user picks a new photo
  const resetTransforms = useCallback(() => {
    setPan({ x: 0, y: 0 });
    setZoom(1.0);
    setRotation(0);
    setIsFlipped(false);
  }, []);

  // Handle file select (from gallery or camera)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setUserImageSrc(src);

      const img = new Image();
      img.onload = () => {
        setUserImageElement(img);
        resetTransforms();
        setStep('edit');
      };
      img.src = src;
    };
    reader.readAsDataURL(file);

    // Reset input value so re-selecting same file triggers change
    e.target.value = '';
  };

  // Dragging handlers (Mouse & Touch)
  const handlePointerDown = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = { x: clientX, y: clientY };
    panStartRef.current = { ...pan };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    pinchStartDistRef.current = null;
  };

  // Touch specific for pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartDistRef.current = dist;
      zoomStartRef.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / pinchStartDistRef.current;
      const newZoom = Math.max(0.6, Math.min(3.5, zoomStartRef.current * ratio));
      setZoom(newZoom);
    }
  };

  // Canvas composite & export
  const generatePhotoResult = async (): Promise<{ blob: Blob; url: string }> => {
    if (!userImageElement || !viewportRef.current) {
      throw new Error('Image or viewport missing');
    }

    const canvas = offscreenCanvasRef.current || document.createElement('canvas');
    // Export at Full HD 9:16 Instagram Story resolution
    const targetW = 1080;
    const targetH = 1920;
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Smooth rendering quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Warm traditional background fill
    ctx.fillStyle = '#1F0F08';
    ctx.fillRect(0, 0, targetW, targetH);

    // 2. Measure viewport to map UI coordinates to canvas
    const vpRect = viewportRef.current.getBoundingClientRect();
    const vpW = vpRect.width;
    const vpH = vpRect.height;
    const scaleFactor = targetW / vpW;

    // 3. Draw User Image with transforms
    const imgW = userImageElement.naturalWidth;
    const imgH = userImageElement.naturalHeight;

    // Cover scale inside viewport
    const baseScale = Math.max(vpW / imgW, vpH / imgH);
    const canvasDrawW = imgW * baseScale * zoom * scaleFactor;
    const canvasDrawH = imgH * baseScale * zoom * scaleFactor;

    ctx.save();
    // Center of canvas + user pan
    ctx.translate(targetW / 2 + pan.x * scaleFactor, targetH / 2 + pan.y * scaleFactor);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(isFlipped ? -1 : 1, 1);
    ctx.drawImage(userImageElement, -canvasDrawW / 2, -canvasDrawH / 2, canvasDrawW, canvasDrawH);
    ctx.restore();

    // 4. Load & draw selected frame overlay
    const frameImg = new Image();
    frameImg.crossOrigin = 'anonymous';
    // Use WebP for fast load; fallback to PNG if needed
    frameImg.src = selectedFrame.webpSrc;
    await new Promise((resolve, reject) => {
      frameImg.onload = resolve;
      frameImg.onerror = () => {
        // Fallback to PNG
        frameImg.src = selectedFrame.pngSrc;
        frameImg.onload = resolve;
        frameImg.onerror = reject;
      };
    });

    ctx.drawImage(frameImg, 0, 0, targetW, targetH);

    // 5. Convert to Blob & Object URL
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create image blob'));
            return;
          }
          const url = URL.createObjectURL(blob);
          resolve({ blob, url });
        },
        'image/jpeg',
        0.95
      );
    });
  };

  // Handle "Selesai / Proses Foto"
  const handleProceedToPreview = async () => {
    setIsProcessing(true);
    try {
      const { blob, url } = await generatePhotoResult();
      setExportedImageBlob(blob);
      setExportedImageUrl(url);
      setStep('preview');

      // Trigger royal golden confetti celebration
      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF6E5', '#B58A45', '#7D3F1D', '#F4D03F'],
        });
      } catch {
        // ignore if confetti blocked
      }
    } catch (err) {
      console.error('Error generating photo booth result:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Download directly to device
  const handleDownload = () => {
    if (!exportedImageUrl) return;
    const a = document.createElement('a');
    a.href = exportedImageUrl;
    a.download = `Wedding-PhotoBooth-RestuKisah-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Native Web Share API or copy text
  const handleShare = async () => {
    const shareText = 'Selamat berbahagia untuk kedua mempelai! Momen indah pernikahan adat Jawa ✨👰🤵 #RestuKisah2025 #WeddingRestu';
    
    if (exportedImageBlob && navigator.canShare) {
      try {
        const file = new File([exportedImageBlob], 'Wedding-PhotoBooth-RestuKisah.jpg', {
          type: 'image/jpeg',
        });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Wedding Photo Booth - Restu & Kisah',
            text: shareText,
          });
          return;
        }
      } catch (e) {
        // Fall back to text share or clipboard
        console.log('File share dismissed or not supported:', e);
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wedding Photo Booth - Restu & Kisah',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // dismiss
      }
    }

    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(shareText);
    setCopiedShareText(true);
    setTimeout(() => setCopiedShareText(false), 2500);
  };

  // Reset entire modal state when closed
  const handleCloseModal = () => {
    onClose();
    setTimeout(() => {
      setStep('select');
      setUserImageSrc(null);
      setUserImageElement(null);
      setExportedImageBlob(null);
      setExportedImageUrl(null);
      resetTransforms();
    }, 300);
  };

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (exportedImageUrl) {
        URL.revokeObjectURL(exportedImageUrl);
      }
    };
  }, [exportedImageUrl]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Wedding Photo Booth"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative w-full max-w-md my-auto rounded-[28px] sm:rounded-[32px] bg-[#FAF6EE] text-[#2C1810] border-2 border-[#D4AF37] shadow-[0_16px_40px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Subtle Javanese Batik Accent Header Strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#B58A45] via-[#D4AF37] to-[#7D3F1D]" />

          {/* Top Bar with Navigation & Close */}
          <div className="relative px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-[#E8DEC8]">
            <div className="flex items-center gap-2">
              {step !== 'select' && (
                <button
                  onClick={() => setStep(step === 'preview' ? 'edit' : 'select')}
                  className="p-1.5 rounded-full bg-amber-100/80 hover:bg-amber-200 text-[#54240A] transition-colors"
                  title="Kembali"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <h3 
                  className="text-lg sm:text-xl font-bold text-[#422211] leading-tight flex items-center gap-1.5"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  <Sparkles className="w-4 h-4 text-[#B58A45]" />
                  <span>Wedding Photo Booth</span>
                </h3>
                <p className="text-[10.5px] text-[#7A5A43]">
                  {step === 'select' && 'Pilih bingkai Jawa & unggah foto'}
                  {step === 'edit' && 'Sesuaikan posisi foto di dalam bingkai'}
                  {step === 'preview' && 'Foto Anda siap diunduh & dibagikan!'}
                </p>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="p-2 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Hidden File & Camera Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Modal Body Container with Scroll */}
          <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center">
            {/* ----------------------------------------------------------------- */}
            {/* STEP 1: SELECT FRAME & CHOOSE PHOTO SOURCE                        */}
            {/* ----------------------------------------------------------------- */}
            {step === 'select' && (
              <div className="w-full flex flex-col items-center gap-4">
                {/* Frame Preview Card with 3 Choices */}
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7D3F1D] flex items-center gap-1">
                      <span>1. Pilih Desain Bingkai Jawa</span>
                    </span>
                    <span className="text-[11px] text-[#A57850] italic font-serif">
                      Format 9:16 Story
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {PHOTO_BOOTH_FRAMES.map((frame) => {
                      const isSelected = frame.id === selectedFrameId;
                      return (
                        <button
                          key={frame.id}
                          onClick={() => setSelectedFrameId(frame.id)}
                          className={`relative rounded-2xl p-1.5 transition-all flex flex-col items-center text-center group ${
                            isSelected
                              ? 'bg-[#F4E6CF] border-2 border-[#B58A45] ring-2 ring-[#B58A45]/30 shadow-md'
                              : 'bg-white border border-[#E3D6C1] hover:border-[#B58A45]/60 hover:bg-stone-50'
                          }`}
                        >
                          {/* Frame Thumbnail Preview */}
                          <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#241108] mb-1.5 shadow-inner flex items-center justify-center">
                            <img
                              src={frame.webpSrc}
                              alt={frame.name}
                              className="w-full h-full object-contain filter drop-shadow-xs"
                            />
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B58A45] text-white flex items-center justify-center shadow-xs">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <span className="text-[11px] font-bold text-[#3D2213] leading-tight">
                            {frame.name}
                          </span>
                          <span className="text-[9px] text-[#8C6239] leading-tight">
                            {frame.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Photo Input Trigger Area */}
                <div className="w-full pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#7D3F1D] mb-2.5">
                    2. Masukkan Foto Anda
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Option A: Take Selfie Camera */}
                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="py-3 px-3 rounded-2xl bg-gradient-to-b from-white to-[#F5EAD7] border-2 border-[#D4AF37]/70 hover:border-[#B58A45] shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-1.5 text-center group transition-all"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7D3F1D] to-[#54240A] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <Camera className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-xs font-bold text-[#422211]">
                        Ambil Foto
                      </span>
                      <span className="text-[9.5px] text-[#8C6239] leading-tight">
                        Kamera Langsung
                      </span>
                    </button>

                    {/* Option B: Upload from Gallery */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="py-3 px-3 rounded-2xl bg-gradient-to-b from-white to-[#F5EAD7] border-2 border-[#D4AF37]/70 hover:border-[#B58A45] shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-1.5 text-center group transition-all"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7D3F1D] to-[#54240A] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <Upload className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-xs font-bold text-[#422211]">
                        Pilih dari Galeri
                      </span>
                      <span className="text-[9.5px] text-[#8C6239] leading-tight">
                        File Foto Tersimpan
                      </span>
                    </button>
                  </div>
                </div>

                {/* Privacy & Feature Notes */}
                <div className="w-full p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[10.5px] text-[#6E4E2C] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B58A45] shrink-0" />
                  <span>Foto Anda diproses langsung di browser secara aman tanpa diunggah ke server publik.</span>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* STEP 2: INTERACTIVE PHOTO ADJUSTER (PAN & ZOOM)                   */}
            {/* ----------------------------------------------------------------- */}
            {step === 'edit' && userImageSrc && (
              <div className="w-full flex flex-col items-center">
                {/* Drag Hint Banner */}
                <div className="mb-2 px-3 py-1 rounded-full bg-amber-100/90 text-[#54240A] text-[10.5px] font-semibold flex items-center gap-1.5 shadow-xs">
                  <Move className="w-3 h-3" />
                  <span>Geser foto untuk menyesuaikan wajah ke jendela bingkai</span>
                </div>

                {/* Interactive Frame Viewport (9:16 Aspect Ratio) */}
                <div
                  ref={viewportRef}
                  onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
                  onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
                  onMouseUp={handlePointerUp}
                  onMouseLeave={handlePointerUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handlePointerUp}
                  style={{ touchAction: 'none' }}
                  className="relative w-[240px] sm:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#1E0E07] border-2 border-[#D4AF37] shadow-xl cursor-grab active:cursor-grabbing select-none"
                >
                  {/* Layer 1: Background User Photo with interactive transform */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none origin-center"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg) scaleX(${isFlipped ? -1 : 1})`,
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    }}
                  >
                    <img
                      src={userImageSrc}
                      alt="Foto Tamu"
                      className="max-w-none w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Layer 2: Foreground Golden Frame Overlay (Transparent Cutout Center) */}
                  <img
                    src={selectedFrame.webpSrc}
                    alt={selectedFrame.name}
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 filter drop-shadow-sm"
                    draggable={false}
                  />

                  {/* Floating Frame Tag Badge */}
                  <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] text-[#F5E6CC] font-serif border border-[#D4AF37]/50 pointer-events-none">
                    {selectedFrame.name}
                  </div>
                </div>

                {/* Adjustment Controls Toolbar */}
                <div className="w-full max-w-[290px] mt-3 flex flex-col gap-2">
                  {/* Zoom Slider */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E3D6C1] shadow-xs">
                    <button
                      onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
                      className="p-1 text-[#54240A] hover:bg-stone-100 rounded-lg transition-colors"
                      title="Perkecil"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="range"
                      min="0.6"
                      max="3.0"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full accent-[#7D3F1D] cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                    />
                    <button
                      onClick={() => setZoom((z) => Math.min(3.0, z + 0.15))}
                      className="p-1 text-[#54240A] hover:bg-stone-100 rounded-lg transition-colors"
                      title="Perbesar"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Action Buttons: Rotate, Mirror, Reset, Change Photo */}
                  <div className="grid grid-cols-4 gap-1.5 text-[10px]">
                    <button
                      onClick={() => setRotation((r) => (r + 90) % 360)}
                      className="py-1.5 px-1 rounded-xl bg-white border border-[#E3D6C1] hover:bg-stone-50 flex flex-col items-center justify-center gap-0.5 text-[#422211] font-semibold"
                      title="Putar 90 derajat"
                    >
                      <RotateCw className="w-3 h-3 text-[#7D3F1D]" />
                      <span>Putar</span>
                    </button>

                    <button
                      onClick={() => setIsFlipped((f) => !f)}
                      className="py-1.5 px-1 rounded-xl bg-white border border-[#E3D6C1] hover:bg-stone-50 flex flex-col items-center justify-center gap-0.5 text-[#422211] font-semibold"
                      title="Cermin / Flip selfie"
                    >
                      <FlipHorizontal className="w-3 h-3 text-[#7D3F1D]" />
                      <span>Cermin</span>
                    </button>

                    <button
                      onClick={resetTransforms}
                      className="py-1.5 px-1 rounded-xl bg-white border border-[#E3D6C1] hover:bg-stone-50 flex flex-col items-center justify-center gap-0.5 text-[#422211] font-semibold"
                      title="Kembalikan posisi tengah"
                    >
                      <RefreshCw className="w-3 h-3 text-[#7D3F1D]" />
                      <span>Reset</span>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="py-1.5 px-1 rounded-xl bg-white border border-[#E3D6C1] hover:bg-stone-50 flex flex-col items-center justify-center gap-0.5 text-[#422211] font-semibold"
                      title="Ganti foto baru"
                    >
                      <ImageIcon className="w-3 h-3 text-[#7D3F1D]" />
                      <span>Ganti</span>
                    </button>
                  </div>

                  {/* Instant Frame Switcher in Editor */}
                  <div className="flex items-center justify-center gap-2 pt-1 border-t border-[#E8DEC8]">
                    <span className="text-[10px] text-[#7A5A43] font-medium">Ganti Bingkai:</span>
                    <div className="flex gap-1.5">
                      {PHOTO_BOOTH_FRAMES.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFrameId(f.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                            selectedFrameId === f.id
                              ? 'bg-[#7D3F1D] text-white shadow-xs'
                              : 'bg-white border border-[#D5C2A5] text-[#54240A] hover:bg-amber-50'
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Button: Proceed / Generate Canvas */}
                  <button
                    disabled={isProcessing}
                    onClick={handleProceedToPreview}
                    className="w-full mt-2 py-2.5 rounded-full bg-gradient-to-r from-[#7D3F1D] via-[#54240A] to-[#7D3F1D] border border-[#D4AF37] text-white font-bold text-xs tracking-wider shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Memproses Foto...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Selesai &amp; Siapkan Unduh</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* STEP 3: PREVIEW & DOWNLOAD / SHARE                                */}
            {/* ----------------------------------------------------------------- */}
            {step === 'preview' && exportedImageUrl && (
              <div className="w-full flex flex-col items-center">
                {/* Success Heading */}
                <div className="mb-2 text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-bold border border-emerald-300 shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Foto Berhasil Dibuat!</span>
                  </span>
                </div>

                {/* Rendered Image Card */}
                <div className="relative w-[215px] sm:w-[235px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] bg-black">
                  <img
                    src={exportedImageUrl}
                    alt="Hasil Foto Booth"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Download and Share CTAs */}
                <div className="w-full max-w-[280px] mt-3.5 flex flex-col gap-2">
                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#7D3F1D] via-[#54240A] to-[#7D3F1D] border border-[#D4AF37] text-white font-bold text-xs tracking-wide shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Unduh Foto (Format Story)</span>
                  </button>

                  {/* Share to Instagram Story / WhatsApp */}
                  <button
                    onClick={handleShare}
                    className="w-full py-2.5 rounded-full bg-white hover:bg-stone-50 border border-[#B58A45] text-[#422211] font-bold text-xs tracking-wide shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4 text-[#7D3F1D]" />
                    <span>
                      {copiedShareText ? 'Ucapan Disalin ke Clipboard!' : 'Bagikan ke Instagram / WhatsApp'}
                    </span>
                  </button>

                  {/* Edit Again / Try Another Frame */}
                  <button
                    onClick={() => setStep('edit')}
                    className="w-full py-1.5 text-center text-[11px] font-semibold text-[#8C6239] hover:text-[#54240A] transition-colors"
                  >
                    Atur Ulang Foto atau Ganti Bingkai
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Offscreen Canvas for Export Rendering */}
          <canvas ref={offscreenCanvasRef} className="hidden" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
