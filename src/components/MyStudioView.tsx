import React, { useState, useRef } from 'react';
import { 
  UserProfile, 
  VideoIdea, 
  Script, 
  CalendarTask, 
  Language, 
  NavSection 
} from '../types';
import { translations } from '../i18n/translations';
import { StorageService } from '../utils/storage';
import { 
  User, 
  Layers, 
  PenTool, 
  Calendar, 
  Flame, 
  Trophy, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Trash2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface MyStudioViewProps {
  lang: Language;
  profile: UserProfile;
  ideas: VideoIdea[];
  scripts: Script[];
  tasks: CalendarTask[];
  onUpdateProfile: (profile: UserProfile) => void;
  onNavigate: (section: NavSection) => void;
  onTransferToScript: (idea: VideoIdea) => void;
  onRestoreAllData: () => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const MyStudioView: React.FC<MyStudioViewProps> = ({
  lang,
  profile,
  ideas,
  scripts,
  tasks,
  onUpdateProfile,
  onNavigate,
  onTransferToScript,
  onRestoreAllData,
  showToast,
}) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'stats' | 'savedIdeas' | 'myScripts' | 'scheduled' | 'backup'>('stats');

  // Profile edit state
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio || '');

  // Computed live stats
  const savedIdeas = ideas.filter((i) => i.isSaved);
  const completedTasks = tasks.filter((t) => t.completed || t.status === 'published');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Iltimos, ism kiriting', 'warning');
      return;
    }
    const updated: UserProfile = {
      ...profile,
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      bio,
    };
    onUpdateProfile(updated);
    showToast(t.studio.profileSaved, 'success');
  };

  // Export data as JSON
  const handleExportData = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `creatorlab-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Barcha ma\'lumotlar JSON formatida yuklab olindi!', 'success');
  };

  // Import JSON backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importAllData(content);
      if (success) {
        onRestoreAllData();
        showToast(t.studio.importSuccess, 'success');
      } else {
        showToast(t.studio.importError, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to Factory Defaults
  const handleResetDefaults = () => {
    if (confirm(t.studio.resetConfirm)) {
      StorageService.resetToDefaults();
      onRestoreAllData();
      showToast('CreatorLab standart holatga qaytarildi!', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header and Profile Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="/src/assets/images/creator_avatar_pro_1792402842762.jpg"
              alt="Creator Profile Avatar"
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#7857FF] shadow-md shadow-[#7857FF]/20"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              ✓
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h1>
              <span className="text-xs text-[#7857FF] dark:text-[#42D9FF] font-mono font-semibold">
                {profile.handle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <div className="text-xs font-bold text-amber-500 flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Streak</span>
            </div>
            <div className="text-lg font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {profile.streakDays} kun
            </div>
          </div>

          <div className="px-3 py-2 rounded-xl bg-[#7857FF]/10 border border-[#7857FF]/20 text-center">
            <div className="text-xs font-bold text-[#7857FF] flex items-center justify-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Ballar</span>
            </div>
            <div className="text-lg font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {profile.totalPoints}
            </div>
          </div>
        </div>
      </div>

      {/* Studio Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'stats'
              ? 'bg-[#7857FF] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.studio.tabs.stats}
        </button>
        <button
          onClick={() => setActiveTab('savedIdeas')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'savedIdeas'
              ? 'bg-[#7857FF] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.studio.tabs.savedIdeas} ({savedIdeas.length})
        </button>
        <button
          onClick={() => setActiveTab('myScripts')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'myScripts'
              ? 'bg-[#7857FF] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.studio.tabs.myScripts} ({scripts.length})
        </button>
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'scheduled'
              ? 'bg-[#7857FF] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.studio.tabs.scheduledContent} ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'backup'
              ? 'bg-[#7857FF] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.studio.tabs.dataBackup}
        </button>
      </div>

      {/* TAB 1: Stats & Overview */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                {t.studio.statsCards.totalIdeas}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                {savedIdeas.length} <span className="text-xs font-normal text-slate-400">/ {ideas.length}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                {t.studio.statsCards.totalScripts}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                {scripts.length}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                {t.studio.statsCards.publishedCount}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-500">
                {completedTasks.length}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                {t.studio.statsCards.creatorPoints}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[#7857FF]">
                {profile.totalPoints}
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#7857FF]" />
              <span>{t.studio.profileTitle}</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {t.studio.creatorName}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {t.studio.creatorHandle}
                  </label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Bio / Qisqacha o‘zingiz haqingizda:
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/30 cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{t.studio.saveProfile}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: Saved Ideas */}
      {activeTab === 'savedIdeas' && (
        <div className="space-y-4">
          {savedIdeas.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              Hozircha sevimlilarga saqlangan g‘oyalar yo‘q. G‘oyalar laboratoriyasidan g‘oyalarni belgilang!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#7857FF] uppercase block mb-1">
                      {idea.category} · {idea.format}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                      {idea.title[lang] || idea.title['uz']}
                    </h4>
                    <p className="text-xs text-slate-500 italic mb-4">
                      "{idea.hook[lang] || idea.hook['uz']}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => {
                        onTransferToScript(idea);
                        onNavigate('scripts');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7857FF] bg-[#7857FF]/10 hover:bg-[#7857FF] hover:text-white transition-all cursor-pointer"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Ssenariy ustaxonasiga</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: My Scripts */}
      {activeTab === 'myScripts' && (
        <div className="space-y-4">
          {scripts.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              Hozircha saqlangan ssenariylar yo‘q. Ssenariy ustaxonasida ilk ssenariyingizni yozing!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scripts.map((s) => (
                <div
                  key={s.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{s.category}</span>
                      <span className="font-mono tabular-nums">{s.estimatedWords || 0} so‘z</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {s.title}
                    </h4>
                    <div className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                      {s.hook}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => onNavigate('scripts')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#7857FF] hover:bg-[#6844fc] transition-all cursor-pointer"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Ustaxonada ochish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Scheduled Content */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {task.title}
                  </h4>
                  <div className="text-slate-500 mt-0.5">
                    {task.dayOfWeek.toUpperCase()} · {task.platform.toUpperCase()} · {task.status}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('calendar')}
                  className="text-xs font-semibold text-[#7857FF] hover:underline"
                >
                  Kalendarda ko‘rish
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Data Management & Backup */}
      {activeTab === 'backup' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {t.studio.dataBackupTitle}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
              CreatorLab barcha ma'lumotlarni brauzeringizning mahalliy xotirasida (localStorage) saqlaydi. 
              Boshqa qurilmaga o‘tish yoki zaxira nusxa saqlash uchun JSON faylni yuklab olishingiz mumkin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleExportData}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/25 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.studio.exportDataBtn}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{t.studio.importDataBtn}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.studio.resetDataBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
