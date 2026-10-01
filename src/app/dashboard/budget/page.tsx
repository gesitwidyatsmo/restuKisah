'use client';

import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import { mockBudgetItems, mockWedding } from '@/lib/mock-data';
import { BudgetItem } from '@/types/database';
import { 
  CheckCircle2, 
  Calendar, 
  Receipt
} from 'lucide-react';

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(mockBudgetItems);
  const [targetBudget] = useState<number>(mockWedding.target_budget);

  const toggleMilestonePaid = (itemId: string, milestoneId: string) => {
    setBudgetItems(prev => prev.map(item => {
      if (item.id === itemId && item.milestones) {
        return {
          ...item,
          milestones: item.milestones.map(m => {
            if (m.id === milestoneId) {
              return { ...m, is_paid: !m.is_paid, paid_date: !m.is_paid ? new Date().toISOString().split('T')[0] : undefined };
            }
            return m;
          })
        };
      }
      return item;
    }));
  };

  const totalActual = budgetItems.reduce((acc, curr) => acc + curr.actual_cost, 0);

  const totalPaid = budgetItems.flatMap(b => b.milestones || [])
    .filter(m => m.is_paid)
    .reduce((acc, m) => acc + m.amount, 0);

  const totalUnpaid = totalActual - totalPaid;
  const budgetRemaining = targetBudget - totalActual;

  return (
    <div>
      <Header 
        title="Wedding Budget & Termin Tagihan" 
        subtitle="Kelola alokasi pengeluaran, termin pembayaran vendor (DP, Termin, Pelunasan), dan bukti transfer."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* Top Financial Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Stat 1: Target Budget */}
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

          {/* Stat 2: Total Realisasi */}
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard">
            <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Total Realistis Kontrak
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Rp {(totalActual / 1000000).toFixed(1)} Jt
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-emerald-700 mt-1 sm:mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Hemat Rp {(budgetRemaining / 1000000).toFixed(1)} Jt</span>
            </div>
          </div>

          {/* Stat 3: Total Terbayar */}
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard">
            <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Sudah Dibayarkan (DP)
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-blue-700">
              Rp {(totalPaid / 1000000).toFixed(1)} Jt
            </div>
            <div className="text-[11px] sm:text-xs text-stone-600 mt-1 sm:mt-2 font-medium">
              {Math.round((totalPaid / totalActual) * 100)}% dari total kontrak
            </div>
          </div>

          {/* Stat 4: Sisa Tagihan */}
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard">
            <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Sisa Wajib Dilunasi
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-rose-700">
              Rp {(totalUnpaid / 1000000).toFixed(1)} Jt
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-rose-700 mt-1 sm:mt-2">
              Jatuh tempo s/d H-7
            </div>
          </div>
        </div>

        {/* Payment Milestones Breakdown */}
        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard">
          <div className="pb-3 sm:pb-4 mb-4 sm:mb-6 border-b-2 border-stone-200">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
              Jadwal Termin Pembayaran Vendor (DP & Pelunasan)
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Klik status untuk menandai pelunasan termin tagihan vendor.
            </p>
          </div>

          <div className="space-y-4">
            {budgetItems.map((item) => {
              if (!item.milestones || item.milestones.length === 0) return null;

              return (
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
                        Vendor: <strong className="text-stone-900">{item.vendor_name}</strong> • Total: <strong>Rp {item.actual_cost.toLocaleString('id-ID')}</strong>
                      </span>
                    </div>
                  </div>

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
                            <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1C1917] ${
                              m.is_paid ? 'bg-emerald-300 text-emerald-950' : 'bg-rose-200 text-rose-900'
                            }`}>
                              {m.is_paid ? 'LUNAS' : 'BELUM'}
                            </span>
                          </div>
                          <div className="font-serif font-bold text-sm sm:text-base text-[#1C1917]">
                            Rp {m.amount.toLocaleString('id-ID')}
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

                          <button className="text-[11px] font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1">
                            <Receipt className="w-3 h-3" />
                            <span>Kuitansi</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
