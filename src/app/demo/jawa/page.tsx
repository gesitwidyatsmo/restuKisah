'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JavaneseParchmentTemplate from '@/components/templates/JavaneseParchmentTemplate';

function DemoJawaContent() {
  const searchParams = useSearchParams();
  const guest = searchParams.get('to') || 'Yogi dan Ratna';

  return <JavaneseParchmentTemplate guestName={guest} />;
}

export default function DemoJawaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-bold">Memuat Undangan...</div>}>
      <DemoJawaContent />
    </Suspense>
  );
}
