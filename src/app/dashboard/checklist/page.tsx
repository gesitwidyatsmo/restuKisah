'use client';

import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import { useDashboard } from '@/components/dashboard/DashboardContext';
import { Plus, Calendar, Tag, CheckCircle2, Clock, Filter } from 'lucide-react';

const STANDARD_TIMEFRAMES = [
  'all',
  'H-12 Bulan',
  'H-10 Bulan',
  'H-8 Bulan',
  'H-6 Bulan',
  'H-4 Bulan',
  'H-3 Bulan',
  'H-2 Bulan',
  'H-1 Bulan',
  'H-2 Minggu',
  'Hari-H',
];

export default function ChecklistPage() {
  const { checklists: tasks, toggleChecklist, addChecklist } = useDashboard();
  const [filterTimeframe, setFilterTimeframe] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Venue & Dekorasi');
  const [newTaskTimeframe, setNewTaskTimeframe] = useState('H-3 Bulan');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');

  const handleToggleTask = (id: string) => {
    void toggleChecklist(id);
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    await addChecklist({
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      timeframe: newTaskTimeframe,
      status: 'todo',
      deadline: newTaskDeadline || undefined,
      notes: 'Ditambahkan dari checklist dashboard.',
    });

    setNewTaskTitle('');
    setNewTaskDeadline('');
    setShowAddModal(false);
  };

  const filteredTasks =
    filterTimeframe === 'all'
      ? tasks
      : tasks.filter((t) => t.timeframe === filterTimeframe);

  const completedCount = tasks.filter((t) => t.status === 'done').length;
  const progressPercent =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const availableTimeframes = STANDARD_TIMEFRAMES.filter(
    (tf) => tf === 'all' || tasks.some((t) => t.timeframe === tf)
  );

  return (
    <div>
      <Header
        title="Wedding Checklist & Timeline"
        subtitle="Daftar persiapan pernikahan terstruktur dari H-12 bulan hingga hari pernikahan."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-[#1C1917] text-xs font-bold text-emerald-800 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {completedCount} dari {tasks.length} Tugas Telah Selesai
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              Checklist Persiapan Menuju Hari-H
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Sentuh tugas yang sudah beres untuk memperbarui persentase kesiapan acara.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="w-full sm:w-40">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Progress</span>
                <span className="text-emerald-700">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-100 border border-[#1C1917] h-3.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-rose-400 text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-1.5 shrink-0 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tugas</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Milestone:
          </span>
          {availableTimeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setFilterTimeframe(tf)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all shrink-0 min-h-[38px] btn-pressable ${
                filterTimeframe === tf
                  ? 'bg-rose-300 border-[#1C1917] shadow-hard-sm text-[#1C1917]'
                  : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
              }`}
            >
              {tf === 'all' ? `Semua (${tasks.length})` : tf}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-8 text-center text-xs font-medium text-stone-600 shadow-hard">
              Belum ada tugas pada milestone ini. Klik &ldquo;Tambah Tugas&rdquo; untuk membuat tugas baru.
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isDone = task.status === 'done';

              return (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-4 rounded-2xl border-2 border-[#1C1917] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                    isDone
                      ? 'bg-emerald-50/70 shadow-hard-sm opacity-80'
                      : 'bg-white shadow-hard hover:shadow-hard-lg'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="pt-0.5">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleToggleTask(task.id)}
                        className="w-5 h-5 rounded-md border-2 border-[#1C1917] text-emerald-500 focus:ring-0 cursor-pointer shrink-0"
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-sm sm:text-base text-[#1C1917] ${
                          isDone ? 'line-through text-stone-500' : ''
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.notes && (
                        <p className="text-xs text-stone-600 mt-0.5">{task.notes}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 border border-[#1C1917] text-stone-700">
                          <Tag className="w-3 h-3" />
                          {task.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 border border-[#1C1917] text-amber-800">
                          <Clock className="w-3 h-3" />
                          {task.timeframe}
                        </span>
                        {task.deadline && (
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-stone-500">
                            <Calendar className="w-3 h-3" />
                            Batas: {task.deadline}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border border-[#1C1917] ${
                        isDone
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      {isDone ? '✓ Selesai' : 'Belum Selesai'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border-3 border-[#1C1917] rounded-3xl p-5 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-hard-xl">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-1">
                Tambah Tugas Persiapan
              </h3>
              <p className="text-xs text-stone-600 mb-4">
                Catat hal baru yang perlu disiapkan bersama pasangan atau WO.
              </p>

              <form onSubmit={(e) => void handleAddTask(e)} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Judul Tugas
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Booking Mobil Pengantin"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Kategori
                    </label>
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl focus:outline-none bg-white min-h-[44px]"
                    >
                      <option>Venue & Dekorasi</option>
                      <option>Catering & Kue</option>
                      <option>MUA & Busana</option>
                      <option>Dokumentasi</option>
                      <option>Undangan & Tamu</option>
                      <option>Logistik & Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Target Waktu
                    </label>
                    <select
                      value={newTaskTimeframe}
                      onChange={(e) => setNewTaskTimeframe(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl focus:outline-none bg-white min-h-[44px]"
                    >
                      <option>H-12 Bulan</option>
                      <option>H-10 Bulan</option>
                      <option>H-8 Bulan</option>
                      <option>H-6 Bulan</option>
                      <option>H-4 Bulan</option>
                      <option>H-3 Bulan</option>
                      <option>H-2 Bulan</option>
                      <option>H-1 Bulan</option>
                      <option>H-2 Minggu</option>
                      <option>Hari-H</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Batas Tanggal (Opsional)
                  </label>
                  <input
                    type="date"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-white hover:bg-stone-50 min-h-[44px]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-rose-400 shadow-hard-sm btn-pressable min-h-[44px]"
                  >
                    Simpan Tugas
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
