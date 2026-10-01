'use client';

import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import { mockRundown } from '@/lib/mock-data';
import { RundownItem } from '@/types/database';
import { 
  Clock, 
  MapPin, 
  User, 
  Printer, 
  Calendar 
} from 'lucide-react';

export default function RundownPage() {
  const [rundownList] = useState<RundownItem[]>(mockRundown);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Header 
        title="Rundown Hari-H & Run-Sheet" 
        subtitle="Susunan jadwal menit demi menit hari pernikahan, pembagian tugas PIC, dan kontak darurat."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* Top Action Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-[#1C1917] text-xs font-bold text-stone-800 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Hari-H: Sabtu, 19 Desember 2026</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              Jadwal Pelaksanaan Acara (Run-Sheet)
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Dapat dicetak langsung untuk dibagikan ke seluruh koordinator keluarga dan tim Wedding Organizer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="w-full md:w-auto px-5 py-2.5 bg-stone-200 text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-3 sm:space-y-4">
          {rundownList.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-200 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-[#1C1917] shrink-0">
                  {index + 1}
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 border border-[#1C1917] text-[10px] sm:text-[11px] font-bold font-mono text-rose-900 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.time_start} - {item.time_end} WIB</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1C1917]">
                    {item.activity_title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-stone-600 mt-1">
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{item.location}</span>
                      </span>
                    )}
                    {item.pic_name && (
                      <span className="flex items-center gap-1 font-semibold text-stone-800">
                        <User className="w-3.5 h-3.5 text-blue-500" />
                        <span>PIC: {item.pic_name}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200 self-end sm:self-auto">
                <span className="text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 border border-[#1C1917] text-emerald-800">
                  Terjadwal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
