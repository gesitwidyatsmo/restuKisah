'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { ParticleEffectType } from '@/components/effects/FallingParticlesCanvas';
import { BurstEffectType } from '@/components/effects/OpeningBurstEffect';
import { mockJavaneseWeddingData } from '@/lib/mock-data-jawa';
import { mockWedding } from '@/lib/mock-data';
import { submitRsvpAction, submitWishAction } from '@/lib/wedding-data-service';

const JavaneseParchmentTemplate = dynamic(
  () => import('@/components/templates/JavaneseParchmentTemplate'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-serif text-[#8C6D46] font-bold">
        Memuat Undangan...
      </div>
    ),
  }
);

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
      invitationData={mockJavaneseWeddingData}
      guestName={guest}
      coverMode={coverMode}
      initialOpen={openParam}
      particleEffect={particleParam}
      burstEffect={burstParam}
      showEffectSwitcher={true}
      onRsvpSubmit={async (data) => {
        await submitRsvpAction(
          mockWedding.id,
          data.name,
          data.attendance === 'hadir' ? 'attending' : 'declined',
          data.pax,
          data.message
        );
      }}
      onAddWish={async (wish) => {
        await submitWishAction(mockWedding.id, wish.senderName, wish.message);
      }}
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
