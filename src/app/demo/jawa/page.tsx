'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JavaneseParchmentTemplate from '@/components/templates/JavaneseParchmentTemplate';
import { ParticleEffectType } from '@/components/effects/FallingParticlesCanvas';
import { BurstEffectType } from '@/components/effects/OpeningBurstEffect';

function DemoJawaContent() {
  const searchParams = useSearchParams();
  const guest = searchParams.get('to') || 'Yogi dan Ratna';
  const coverParam = searchParams.get('cover');
  const coverMode = coverParam === 'classic' ? 'classic_arch' : 'adat_jawa_cover';
  const openParam = searchParams.get('open') === 'true';

  const particleParam = (searchParams.get('particles') as ParticleEffectType) || 'pink_blossoms';
  const burstParam = (searchParams.get('burst') as BurstEffectType) || 'gold_butterflies';

  return (
    <JavaneseParchmentTemplate
      guestName={guest}
      coverMode={coverMode}
      coupleTitle="Miko dan Angela"
      initialOpen={openParam}
      particleEffect={particleParam}
      burstEffect={burstParam}
      showEffectSwitcher={true}
    />
  );
}

export default function DemoJawaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-bold">Memuat Undangan...</div>}>
      <DemoJawaContent />
    </Suspense>
  );
}
