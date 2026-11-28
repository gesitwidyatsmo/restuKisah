'use client';

import Header from '@/components/dashboard/Header';
import { useDashboard } from '@/components/dashboard/DashboardContext';
import { AlertCircle, CheckCircle2, Calendar, Receipt } from 'lucide-react';

export default function BudgetPage() {
  const { budgetItems, toggleMilestone, wedding } = useDashboard();
  const targetBudget = Number(wedding.target_budget || 0);

  const toggleMilestonePaid = (itemId: string, milestoneId: string) => {
    void toggleMilestone(itemId, milestoneId);
  };

  const totalActual = budgetItems.reduce((acc, curr) => acc + Number(curr.actual_cost || 0), 0);

  const totalPaid = budgetItems
    .flatMap((b) => b.milestones || [])
    .filter((m) => m.is_paid)
    .reduce((acc, m) => acc + Number(m.amount || 0), 0);

  const totalUnpaid = totalActual - totalPaid;
  const budgetRemaining = targetBudget - totalActual;
  const paidPercent = totalActual > 0 ? Math.round((totalPaid / totalActual) * 100) : 0;

  return (
    <div>
      <Header
        title="Wedding Budget & Termin Tagihan"
        subtitle="Kelola alokasi pengeluaran, termin pembayaran vendor (DP, Termin, Pelunasan), dan bukti transfer."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard">
            <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Target Anggaran
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Rp {(targetBudget / 1000000).toFixed(1)} Jt
            </div>
            <div className="text-[11px] sm:text-xs text-stone-600 mt-1 sm:mt-2 font-medium">
              Batas plafon rencana biaya
            </div>
          </div>

          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard">
            <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Total Realisasi Kontrak
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Rp {(totalActual / 1000000).toFixed(1)} Jt
            </div>
            <div
              className={`text-[11px] sm:text-xs font-bold mt-1 sm:mt-2 flex items-center gap-1 ${
                budgetRemaining >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {budgetRemaining >= 0 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Sisa Plafon Rp {(budgetRemaining / 1000000).toFixed(1)} Jt</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Melebihi Plafon Rp {(Math.abs(budgetRemaining) / 1000000).toFixed(1)} Jt
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard">
            <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Sudah Dibayarkan
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-blue-700">
              Rp {(totalPaid / 1000000).toFixed(1)} Jt
            </div>
            <div className="text-[11px] sm:text-xs text-stone-600 mt-1 sm:mt-2 font-medium">
              {paidPercent}% dari total kontrak
            </div>
          </div>

          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard">
            <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Sisa Wajib Dilunasi
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-rose-700">
              Rp {(totalUnpaid / 1000000).toFixed(1)} Jt
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-rose-700 mt-1 sm:mt-2">
              {totalUnpaid > 0 ? 'Jatuh tempo s/d Hari-H' : 'Belum ada tagihan'}
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard">
          <div className="pb-3 sm:pb-4 mb-4 sm:mb-6 border-b-2 border-stone-200">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
              Jadwal Termin Pembayaran Vendor (DP & Pelunasan)
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Klik status untuk menandai pelunasan termin tagihan vendor.
            </p>
          </div>

          {budgetItems.length === 0 ? (
            <div className="p-8 rounded-2xl border-2 border-dashed border-stone-300 text-center text-xs font-medium text-stone-600">
              Belum ada rincian biaya atau vendor untuk pernikahan ini.
            </div>
          ) : (
            <div className="space-y-4">
              {budgetItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF8F5] border-2 border-[#1C1917] rounded-xl p-3.5 sm:p-4 shadow-hard-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3 pb-2 border-b border-stone-300">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        {item.category.toUpperCase()}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-[#1C1917]">
                        {item.item_name}
                      </h4>
                      <span className="text-xs font-medium text-stone-600">
                        Vendor:{' '}
                        <strong className="text-stone-900">{item.vendor_name || '-'}</strong> •
                        Total:{' '}
                        <strong>Rp {Number(item.actual_cost || 0).toLocaleString('id-ID')}</strong>
                      </span>
                    </div>
                  </div>

                  {!item.milestones || item.milestones.length === 0 ? (
                    <div className="text-xs text-stone-500 italic">
                      Belum ada termin pembayaran untuk item ini.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {item.milestones.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3 rounded-xl border-2 border-[#1C1917] flex flex-col justify-between transition-all ${
                            m.is_paid ? 'bg-emerald-100/70' : 'bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-xs text-[#1C1917]">
                                {m.milestone_title}
                              </span>
                              <span
                                className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1C1917] ${
                                  m.is_paid
                                    ? 'bg-emerald-300 text-emerald-950'
                                    : 'bg-rose-200 text-rose-900'
                                }`}
                              >
                                {m.is_paid ? 'LUNAS' : 'BELUM'}
                              </span>
                            </div>
                            <div className="font-serif font-bold text-sm sm:text-base text-[#1C1917]">
                              Rp {Number(m.amount || 0).toLocaleString('id-ID')}
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-stone-600 mt-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Jatuh Tempo: {m.due_date || 'Hari-H'}</span>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
                            <button
                              onClick={() => toggleMilestonePaid(item.id, m.id)}
                              className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-[#1C1917] shadow-hard-sm btn-pressable min-h-[38px] flex items-center justify-center ${
                                m.is_paid
                                  ? 'bg-stone-200 text-stone-800'
                                  : 'bg-emerald-300 text-emerald-950'
                              }`}
                            >
                              {m.is_paid ? 'Batal Lunas' : 'Tandai Lunas ✓'}
                            </button>

                            <button
                              type="button"
                              disabled
                              title="Segera hadir"
                              className="text-[11px] font-medium text-stone-400 flex items-center gap-1 cursor-not-allowed"
                            >
                              <Receipt className="w-3 h-3" />
                              <span>Kuitansi</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
