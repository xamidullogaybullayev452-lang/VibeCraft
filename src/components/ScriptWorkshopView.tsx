import React, { useState, useEffect } from 'react';
import { Script, Language, VideoIdea } from '../types';
import { translations } from '../i18n/translations';
import { SCRIPT_TEMPLATES } from '../data/initialData';
import { 
  PenTool, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  Save, 
  Clock, 
  FileText, 
  Sparkles, 
  Plus, 
  FolderOpen,
  HelpCircle,
  Share2
} from 'lucide-react';

interface ScriptWorkshopViewProps {
  lang: Language;
  scripts: Script[];
  onSaveScript: (script: Script) => void;
  onDeleteScript: (scriptId: string) => void;
  activeScriptDraft: { title: string; hook: string; category: string } | null;
  onClearDraft: () => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ScriptWorkshopView: React.FC<ScriptWorkshopViewProps> = ({
  lang,
  scripts,
  onSaveScript,
  onDeleteScript,
  activeScriptDraft,
  onClearDraft,
  showToast,
}) => {
  const t = translations[lang];

  // Current working script editor state
  const [currentScriptId, setCurrentScriptId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('tech_edu');
  const [hook, setHook] = useState('');
  const [body, setBody] = useState('');
  const [cta, setCta] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // If transferred from IdeasLab, prefill draft
  useEffect(() => {
    if (activeScriptDraft) {
      setTitle(activeScriptDraft.title);
      setHook(activeScriptDraft.hook);
      setCategory(activeScriptDraft.category || 'tech_edu');
      setCurrentScriptId(null);
      onClearDraft();
    }
  }, [activeScriptDraft, onClearDraft]);

  // Calculate live word count & estimated speaking time (average 130 words / minute)
  const fullText = `${title} ${hook} ${body} ${cta}`.trim();
  const wordCount = fullText ? fullText.split(/\s+/).filter(Boolean).length : 0;
  const estimatedSeconds = Math.round((wordCount / 130) * 60);

  const formatDuration = (totalSec: number) => {
    if (totalSec < 60) return `${totalSec}s`;
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs > 0 ? `${secs}s` : ''}`;
  };

  // Apply a template
  const handleApplyTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    if (!templateId) return;

    const tmpl = SCRIPT_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;

    setHook(tmpl.defaultHook[lang] || tmpl.defaultHook['uz']);
    setBody(tmpl.defaultBody[lang] || tmpl.defaultBody['uz']);
    setCta(tmpl.defaultCta[lang] || tmpl.defaultCta['uz']);

    if (!title) {
      setTitle(tmpl.title[lang] || tmpl.title['uz']);
    }

    showToast(`"${tmpl.title[lang]}" shabloni yuklandi!`, 'info');
  };

  // Save current script to localStorage
  const handleSave = () => {
    if (!title.trim()) {
      showToast('Iltimos, ssenariy sarlavhasini kiriting', 'warning');
      return;
    }

    const scriptToSave: Script = {
      id: currentScriptId || `script-${Date.now()}`,
      title,
      category,
      templateId: selectedTemplateId || undefined,
      hook,
      body,
      cta,
      notes,
      targetDurationSec: estimatedSeconds,
      estimatedWords: wordCount,
      updatedAt: new Date().toISOString(),
    };

    onSaveScript(scriptToSave);
    setCurrentScriptId(scriptToSave.id);
    showToast(t.scripts.saveScriptSuccess, 'success');
  };

  // Copy full script to clipboard
  const handleCopyClipboard = () => {
    const scriptContent = `🎬 ${title.toUpperCase()}\n\n` +
      `📌 1. KIRISH (HOOK - 0-15s):\n${hook}\n\n` +
      `📖 2. ASOSIY QISM (BODY):\n${body}\n\n` +
      `🎯 3. YAKUN (CTA):\n${cta}\n\n` +
      (notes ? `📝 SURATGA OLISH ESLATMALARI:\n${notes}\n\n` : '') +
      `⏱ Taxminiy nutq vaqti: ${formatDuration(estimatedSeconds)} (${wordCount} so‘z)`;

    navigator.clipboard.writeText(scriptContent);
    setCopied(true);
    showToast(t.scripts.copySuccess, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Export as TXT file
  const handleExportTxt = () => {
    const scriptContent = `SARLAVHA: ${title}\n` +
      `KATEGORIYA: ${category}\n` +
      `SANASI: ${new Date().toLocaleDateString()}\n\n` +
      `----------------------------------------\n` +
      `1. KIRISH (HOOK - 0-15s):\n${hook}\n\n` +
      `2. ASOSIY QISM (BODY):\n${body}\n\n` +
      `3. YAKUN (CALL TO ACTION):\n${cta}\n\n` +
      `ESLATMALAR:\n${notes}\n\n` +
      `----------------------------------------\n` +
      `SO'ZLAR SONI: ${wordCount} | DAVOMIYLIGI: ${formatDuration(estimatedSeconds)}\n`;

    const blob = new Blob([scriptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.trim() || 'ssenariy'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('TXT fayl yuklab olindi!', 'info');
  };

  // Export as Markdown file
  const handleExportMd = () => {
    const mdContent = `# ${title || 'Ssenariy'}\n\n` +
      `> **Kategoriya:** ${category} | **Nutq davomiyligi:** ~${formatDuration(estimatedSeconds)} (${wordCount} so'z)\n\n` +
      `## 1. Kirish (Hook)\n${hook}\n\n` +
      `## 2. Asosiy Qism (Body)\n${body}\n\n` +
      `## 3. Yakun (Call to Action)\n${cta}\n\n` +
      (notes ? `## Suratga olish eslatmalari\n${notes}\n\n` : '') +
      `---\n*CreatorLab Script Workshop orqali tayyorlandi.*`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.trim() || 'ssenariy'}.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Markdown fayl yuklab olindi!', 'info');
  };

  // Load an existing script
  const handleLoadScript = (s: Script) => {
    setCurrentScriptId(s.id);
    setTitle(s.title);
    setCategory(s.category);
    setHook(s.hook);
    setBody(s.body);
    setCta(s.cta);
    setNotes(s.notes || '');
    setSelectedTemplateId(s.templateId || '');
    showToast(`"${s.title}" tahrirlash uchun yuklandi!`, 'info');
  };

  // Start fresh new script
  const handleStartNew = () => {
    setCurrentScriptId(null);
    setTitle('');
    setCategory('tech_edu');
    setHook('');
    setBody('');
    setCta('');
    setNotes('');
    setSelectedTemplateId('');
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.scripts.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t.scripts.subtitle}
          </p>
        </div>

        {/* Action strip */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleStartNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.scripts.createNewScript}</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/30 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t.scripts.saveScript}</span>
          </button>

          <button
            onClick={handleCopyClipboard}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.common.copied : 'Nusxalash'}</span>
          </button>

          <button
            onClick={handleExportTxt}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={t.scripts.exportTxt}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Script Editor Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Template Selection Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Ssenariy sarlavhasi
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.scripts.scriptTitlePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#7857FF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {t.scripts.selectTemplate}
                </label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => handleApplyTemplate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="">-- {t.scripts.customTemplate} --</option>
                  {SCRIPT_TEMPLATES.map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      {tmpl.title[lang]} ({tmpl.format})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Kategoriya
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="tech_edu">Ta'lim & Texnologiya</option>
                  <option value="lifestyle">Hayot tarzi & Vlog</option>
                  <option value="shorts_reels">Qisqa videolar</option>
                  <option value="business">Biznes & Karyera</option>
                  <option value="creative">Ijod & Dizayn</option>
                  <option value="entertainment">Ko‘ngilochar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 1: Hook */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#7857FF]/15 text-[#7857FF] flex items-center justify-center font-bold font-mono text-xs">
                  01
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.scripts.hookSectionTitle}
                </h3>
              </div>
              <span className="text-[11px] text-[#7857FF] dark:text-[#42D9FF] font-medium">
                Eng muhim qism
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              {t.scripts.hookSectionDesc}
            </p>
            <textarea
              rows={3}
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="Tomoshabinni videoni ko‘rishga majbur qiluvchi qiziqarli savol yoki ziddiyatli jumla..."
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7857FF] leading-relaxed"
            />
          </div>

          {/* Section 2: Body */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#42D9FF]/15 text-[#42D9FF] flex items-center justify-center font-bold font-mono text-xs">
                  02
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.scripts.bodySectionTitle}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Asosiy qiymat
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              {t.scripts.bodySectionDesc}
            </p>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="1. Birinchi qadam yoki fakt...&#10;2. Ikkinchi qadam...&#10;3. Uchinchi eng qiziqarli jihat..."
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7857FF] leading-relaxed font-normal"
            />
          </div>

          {/* Section 3: Call to Action (Outro) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold font-mono text-xs">
                  03
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.scripts.ctaSectionTitle}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Konversiya
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              {t.scripts.ctaSectionDesc}
            </p>
            <textarea
              rows={3}
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="Foydali bo‘lgan bo‘lsa obuna bo‘ling, videoni saqlab qo‘ying va o‘z fikringizni yozing..."
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7857FF] leading-relaxed"
            />
          </div>

          {/* Production Notes */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              {t.scripts.notesTitle}
            </h3>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Masalan: 0-5s da telefon ekranini ko‘rsatish, fon musiqasi past tovushda, B-roll kadrlar..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7857FF]"
            />
          </div>
        </div>

        {/* Right Sidebar: Real-Time Telemetry & Saved Scripts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Timing & Word Calculator (Single-elevation, tabular nums) */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Nutq va Vaqt Tahlili
              </span>
              <Clock className="w-4 h-4 text-[#42D9FF]" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-white">
                  {formatDuration(estimatedSeconds)}
                </div>
                <div className="text-xs text-[#42D9FF] font-medium mt-0.5">
                  {t.scripts.statsEstimatedTime}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {t.scripts.speedNotice}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">{t.scripts.statsWords}:</span>
                <span className="text-base font-bold font-mono tabular-nums text-white">
                  {wordCount}
                </span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleSave}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.scripts.saveScript}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleExportTxt}
                    className="py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer text-center"
                  >
                    TXT
                  </button>
                  <button
                    onClick={handleExportMd}
                    className="py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer text-center"
                  >
                    Markdown
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Scripts Drawer */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#7857FF]" />
                <span>{t.scripts.savedScriptsTitle}</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-500">
                {scripts.length}
              </span>
            </div>

            {scripts.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-4 text-center leading-relaxed">
                {t.scripts.noSavedScripts}
              </p>
            ) : (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {scripts.map((s) => {
                  const isCurrent = s.id === currentScriptId;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleLoadScript(s)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2 group ${
                        isCurrent
                          ? 'border-[#7857FF] bg-[#7857FF]/10 dark:bg-[#7857FF]/15'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-[#7857FF]">
                          {s.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                          <span className="font-mono tabular-nums">{s.estimatedWords || 0} so‘z</span>
                          <span>·</span>
                          <span>{s.category}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(t.scripts.deleteConfirm)) {
                            onDeleteScript(s.id);
                            if (currentScriptId === s.id) {
                              handleStartNew();
                            }
                            showToast('Ssenariy o‘chirildi', 'info');
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors opacity-60 group-hover:opacity-100"
                        title={t.scripts.deleteScript}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
