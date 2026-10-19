import React, { useState } from 'react';
import { CalendarTask, Language, Platform, ContentFormat, TaskStatus } from '../types';
import { translations } from '../i18n/translations';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Trash2, 
  Edit3, 
  Filter, 
  Check, 
  X,
  Youtube,
  Instagram,
  Send,
  Video,
  Flame
} from 'lucide-react';

interface ContentCalendarViewProps {
  lang: Language;
  tasks: CalendarTask[];
  onAddTask: (task: CalendarTask) => void;
  onUpdateTask: (task: CalendarTask) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const DAYS_ORDER: Array<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'> = [
  'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'
];

export const ContentCalendarView: React.FC<ContentCalendarViewProps> = ({
  lang,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  showToast,
}) => {
  const t = translations[lang];

  // Filters
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>('mon');
  const [timeStr, setTimeStr] = useState('18:00');
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [format, setFormat] = useState<ContentFormat>('reel_short');
  const [status, setStatus] = useState<TaskStatus>('planned');
  const [notes, setNotes] = useState('');

  const openCreateModal = (targetDay?: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => {
    setEditingTaskId(null);
    setTitle('');
    setDayOfWeek(targetDay || 'mon');
    setTimeStr('18:00');
    setPlatform('youtube');
    setFormat('reel_short');
    setStatus('planned');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (task: CalendarTask) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDayOfWeek(task.dayOfWeek);
    setTimeStr(task.timeStr || '18:00');
    setPlatform(task.platform);
    setFormat(task.format);
    setStatus(task.status);
    setNotes(task.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Iltimos, kontent mavzusini kiriting', 'warning');
      return;
    }

    if (editingTaskId) {
      const existing = tasks.find((t) => t.id === editingTaskId);
      if (existing) {
        onUpdateTask({
          ...existing,
          title,
          dayOfWeek,
          timeStr,
          platform,
          format,
          status,
          notes,
        });
        showToast('Reja yangilandi!', 'success');
      }
    } else {
      const newTask: CalendarTask = {
        id: `task-${Date.now()}`,
        title,
        dayOfWeek,
        dateStr: new Date().toISOString().split('T')[0],
        timeStr,
        platform,
        format,
        status,
        completed: false,
        notes,
      };
      onAddTask(newTask);
      showToast(t.calendar.taskAddedSuccess, 'success');
    }

    setIsModalOpen(false);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesPlatform = platformFilter === 'all' || task.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesPlatform && matchesStatus;
  });

  const getPlatformIcon = (p: Platform) => {
    switch (p) {
      case 'youtube': return <Youtube className="w-3.5 h-3.5 text-red-500" />;
      case 'instagram': return <Instagram className="w-3.5 h-3.5 text-pink-500" />;
      case 'telegram': return <Send className="w-3.5 h-3.5 text-sky-400" />;
      case 'tiktok': return <Video className="w-3.5 h-3.5 text-cyan-400" />;
      default: return <Video className="w-3.5 h-3.5 text-[#7857FF]" />;
    }
  };

  const getStatusBadge = (s: TaskStatus) => {
    switch (s) {
      case 'planned': return <span className="text-slate-500 font-medium">Rejada</span>;
      case 'scripting': return <span className="text-[#7857FF] font-medium">Ssenariy</span>;
      case 'recording': return <span className="text-amber-500 font-medium">Suratga olish</span>;
      case 'editing': return <span className="text-purple-400 font-medium">Montaj</span>;
      case 'published': return <span className="text-emerald-500 font-medium">Nashr etildi</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.calendar.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t.calendar.subtitle}
          </p>
        </div>

        <button
          onClick={() => openCreateModal()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/30 transition-all cursor-pointer self-start lg:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.calendar.addTask}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-semibold flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Platforma:</span>
          </span>
          {['all', 'youtube', 'instagram', 'tiktok', 'telegram'].map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-2.5 py-1 rounded-lg uppercase text-[11px] font-bold cursor-pointer transition-colors ${
                platformFilter === p
                  ? 'bg-[#7857FF] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold">Holat:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
          >
            <option value="all">{t.calendar.filterAllStatuses}</option>
            <option value="planned">{t.calendar.statusPlanned}</option>
            <option value="scripting">{t.calendar.statusScripting}</option>
            <option value="recording">{t.calendar.statusRecording}</option>
            <option value="editing">{t.calendar.statusEditing}</option>
            <option value="published">{t.calendar.statusPublished}</option>
          </select>
        </div>
      </div>

      {/* 7-Day Weekly Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4">
        {DAYS_ORDER.map((dayKey) => {
          const dayTasks = filteredTasks.filter((task) => task.dayOfWeek === dayKey);
          const dayName = t.calendar.days[dayKey];

          return (
            <div
              key={dayKey}
              className="flex flex-col rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm p-4 min-h-[220px]"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  {dayName}
                </span>
                <button
                  onClick={() => openCreateModal(dayKey)}
                  className="p-1 rounded-md text-slate-400 hover:text-[#7857FF] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Ushbu kunga reja qo‘shish"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tasks List for Day */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {dayTasks.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center py-6 text-slate-400 text-[11px]">
                    Rejalar yo‘q
                  </div>
                ) : (
                  dayTasks.map((task) => {
                    const isDone = task.completed;
                    return (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl border text-xs transition-all ${
                          isDone
                            ? 'bg-emerald-500/5 border-emerald-500/20 opacity-80'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5 mb-1.5">
                          <div className="flex items-center gap-1.5 truncate">
                            {getPlatformIcon(task.platform)}
                            <span className="font-semibold text-slate-800 dark:text-white truncate">
                              {task.title}
                            </span>
                          </div>

                          <button
                            onClick={() => onToggleComplete(task.id)}
                            className="text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer shrink-0"
                            title={isDone ? t.calendar.markIncomplete : t.calendar.markComplete}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Metadata row with dots */}
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{task.timeStr || '18:00'}</span>
                          </span>
                          <span>·</span>
                          <span>{getStatusBadge(task.status)}</span>
                        </div>

                        {task.notes && (
                          <p className="text-[10px] text-slate-400 italic line-clamp-2 mb-2">
                            {task.notes}
                          </p>
                        )}

                        <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10px]">
                          <button
                            onClick={() => openEditModal(task)}
                            className="text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Tahrir</span>
                          </button>

                          <button
                            onClick={() => {
                              onDeleteTask(task.id);
                              showToast(t.calendar.taskDeletedSuccess, 'info');
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                            title={t.calendar.deleteTask}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Add/Edit Calendar Task */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingTaskId ? 'Rejani tahrirlash' : t.calendar.addTask}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Kontent mavzusi *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masalan: 3 ta bepul AI vositasi haqida video"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7857FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Hafta kuni:
                  </label>
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {DAYS_ORDER.map((d) => (
                      <option key={d} value={d}>
                        {t.calendar.days[d]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Rejalashtirilgan vaqt:
                  </label>
                  <input
                    type="time"
                    value={timeStr}
                    onChange={(e) => setTimeStr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Platforma:
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="telegram">Telegram</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Holat:
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="planned">Rejada</option>
                    <option value="scripting">Ssenariy yozilmoqda</option>
                    <option value="recording">Suratga olinmoqda</option>
                    <option value="editing">Montaj qilinmoqda</option>
                    <option value="published">Nashr etildi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Eslatmalar (lokatsiya, rekvizit):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Eslatma matni..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7857FF]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/30 cursor-pointer"
                >
                  {editingTaskId ? 'Saqlash' : 'Kalendarga qo‘shish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
