'use client';

import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import { mockAdminDocuments } from '@/lib/mock-data';
import { AdminDocument, AdminDocStatus, AdminDocStage } from '@/types/database';
import { 
  FileText, 
  Upload, 
  Info,
  Calendar,
  Building,
  HeartPulse,
  Stamp
} from 'lucide-react';

const stageLabels: Record<AdminDocStage, { title: string; desc: string; icon: any; color: string }> = {
  rt_rw: {
    title: '1. RT & RW',
    desc: 'Surat pengantar domisili dari ketua RT dan RW calon mempelai.',
    icon: Building,
    color: 'bg-amber-100 text-amber-900',
  },
  kelurahan: {
    title: '2. Kelurahan (N1-N4)',
    desc: 'Penerbitan formulir model N1, N2, dan persetujuan N4.',
    icon: Stamp,
    color: 'bg-blue-100 text-blue-900',
  },
  kesehatan: {
    title: '3. Puskesmas (Elsimil & TT)',
    desc: 'Pemeriksaan fisik, sertifikat Elsimil BKKBN, dan imunisasi vaksin TT.',
    icon: HeartPulse,
    color: 'bg-emerald-100 text-emerald-900',
  },
  kua_disdukcapil: {
    title: '4. KUA & SIMKAH',
    desc: 'Pendaftaran SIMKAH, berkas foto latar biru, dan penentuan jadwal akad.',
    icon: FileText,
    color: 'bg-rose-100 text-rose-900',
  },
};

const statusBadges: Record<AdminDocStatus, { label: string; color: string }> = {
  completed: { label: 'Selesai', color: 'bg-emerald-200 text-emerald-900' },
  ready_to_submit: { label: 'Siap Kirim', color: 'bg-blue-200 text-blue-900' },
  in_progress: { label: 'Proses', color: 'bg-amber-200 text-amber-900' },
  not_started: { label: 'Belum', color: 'bg-stone-200 text-stone-800' },
};

export default function AdministrasiPage() {
  const [documents, setDocuments] = useState<AdminDocument[]>(mockAdminDocuments);
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const toggleStatus = (id: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === id) {
        const nextStatus: Record<AdminDocStatus, AdminDocStatus> = {
          not_started: 'in_progress',
          in_progress: 'ready_to_submit',
          ready_to_submit: 'completed',
          completed: 'not_started',
        };
        return { ...doc, status: nextStatus[doc.status] };
      }
      return doc;
    }));
  };

  const filteredDocs = selectedStage === 'all' 
    ? documents 
    : documents.filter(d => d.stage === selectedStage);

  const completedCount = documents.filter(d => d.status === 'completed').length;
  const progressPercent = Math.round((completedCount / documents.length) * 100);

  return (
    <div>
      <Header 
        title="Administrasi & Berkas KUA" 
        subtitle="Panduan alur birokrasi pernikahan di Indonesia dari RT/RW, Kelurahan, hingga pendaftaran KUA."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* Progress Alert Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-[#1C1917] text-[11px] sm:text-xs font-bold text-blue-800">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Ketentuan KUA: Pendaftaran paling lambat H-10 hari kerja</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              Progres Berkas: {completedCount} dari {documents.length} Tuntas
            </h2>
            <p className="text-xs text-stone-600">
              Sentuh tombol status pada setiap dokumen untuk memperbarui tahapan birokrasi Anda.
            </p>
          </div>

          <div className="w-full md:w-64 shrink-0">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span>Kelengkapan Berkas</span>
              <span className="text-blue-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-100 border border-[#1C1917] h-3.5 sm:h-4 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-blue-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filter Stage Pills (Horizontal Touch Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all btn-pressable shrink-0 min-h-[40px] ${
              selectedStage === 'all'
                ? 'bg-rose-400 border-[#1C1917] shadow-hard-sm text-[#1C1917]'
                : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
            }`}
          >
            Semua Tahap ({documents.length})
          </button>
          <button
            onClick={() => setSelectedStage('rt_rw')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all btn-pressable shrink-0 min-h-[40px] ${
              selectedStage === 'rt_rw'
                ? 'bg-amber-300 border-[#1C1917] shadow-hard-sm text-[#1C1917]'
                : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
            }`}
          >
            1. RT/RW
          </button>
          <button
            onClick={() => setSelectedStage('kelurahan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all btn-pressable shrink-0 min-h-[40px] ${
              selectedStage === 'kelurahan'
                ? 'bg-blue-300 border-[#1C1917] shadow-hard-sm text-[#1C1917]'
                : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
            }`}
          >
            2. Kelurahan (N1-N4)
          </button>
          <button
            onClick={() => setSelectedStage('kesehatan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all btn-pressable shrink-0 min-h-[40px] ${
              selectedStage === 'kesehatan'
                ? 'bg-emerald-300 border-[#1C1917] shadow-hard-sm text-[#1C1917]'
                : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
            }`}
          >
            3. Kesehatan (Elsimil/TT)
          </button>
          <button
            onClick={() => setSelectedStage('kua_disdukcapil')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all btn-pressable shrink-0 min-h-[40px] ${
              selectedStage === 'kua_disdukcapil'
                ? 'bg-rose-300 border-[#1C1917] shadow-hard-sm text-[#1C1917]'
                : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
            }`}
          >
            4. KUA SIMKAH
          </button>
        </div>

        {/* Document List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredDocs.map((doc) => {
            const stageInfo = stageLabels[doc.stage];
            const statusInfo = statusBadges[doc.status];
            const StageIcon = stageInfo.icon;

            return (
              <div
                key={doc.id}
                className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard flex flex-col justify-between hover:shadow-hard-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#1C1917] text-[10px] sm:text-[11px] font-bold ${stageInfo.color}`}>
                      <StageIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{stageInfo.title}</span>
                    </span>

                    <button
                      onClick={() => toggleStatus(doc.id)}
                      className={`px-2.5 py-1 rounded-full border border-[#1C1917] text-[10px] sm:text-[11px] font-bold btn-pressable min-h-[34px] flex items-center gap-1 ${statusInfo.color}`}
                      title="Klik untuk ubah status"
                    >
                      <span>{statusInfo.label}</span>
                      <span>↻</span>
                    </button>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-[#1C1917] mb-2">
                    {doc.document_name}
                  </h3>

                  {doc.notes && (
                    <p className="text-[11px] sm:text-xs text-stone-600 bg-[#FAF8F5] p-2.5 sm:p-3 rounded-xl border border-stone-200 mb-3">
                      💡 {doc.notes}
                    </p>
                  )}

                  {doc.due_date && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Batas Waktu: {doc.due_date}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] text-stone-500 font-medium">
                    Status: <span className="font-bold text-stone-800">{statusInfo.label}</span>
                  </span>

                  <button className="px-3 py-1.5 rounded-xl border border-[#1C1917] bg-[#FAF8F5] text-xs font-bold text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-1.5 shadow-hard-sm btn-pressable min-h-[40px]">
                    <Upload className="w-3 h-3" />
                    <span>Upload Scan</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
