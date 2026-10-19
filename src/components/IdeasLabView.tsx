import React, { useState, useMemo } from 'react';
import { 
  VideoIdea, 
  IdeaCategory, 
  IdeaFormat, 
  IdeaDifficulty, 
  Language 
} from '../types';
import { translations } from '../i18n/translations';
import { generateAlgorithmicIdea } from '../utils/ideaGenerator';
import { 
  Search, 
  Plus, 
  Bookmark, 
  BookmarkCheck, 
  PenTool, 
  Trash2, 
  Sparkles, 
  Filter, 
  Check, 
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

interface IdeasLabViewProps {
  lang: Language;
  ideas: VideoIdea[];
  onToggleFavorite: (ideaId: string) => void;
  onAddCustomIdea: (idea: VideoIdea) => void;
  onDeleteIdea: (ideaId: string) => void;
  onTransferToScript: (idea: VideoIdea) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const IdeasLabView: React.FC<IdeasLabViewProps> = ({
  lang,
  ideas,
  onToggleFavorite,
  onAddCustomIdea,
  onDeleteIdea,
  onTransferToScript,
  showToast,
}) => {
  const t = translations[lang];

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);

  // Custom Idea Form State
  const [customTitle, setCustomTitle] = useState('');
  const [customHook, setCustomHook] = useState('');
  const [customCategory, setCustomCategory] = useState<IdeaCategory>('tech_edu');
  const [customFormat, setCustomFormat] = useState<IdeaFormat>('shorts');
  const [customAudience, setCustomAudience] = useState('');
  const [customPointsText, setCustomPointsText] = useState('');

  // Generator State
  const [genTopic, setGenTopic] = useState('');
  const [genCategory, setGenCategory] = useState<IdeaCategory>('tech_edu');
  const [genFormat, setGenFormat] = useState<IdeaFormat>('shorts');
  const [genAngle, setGenAngle] = useState<'educational' | 'dramatic' | 'secrets' | 'mistakes' | 'transformation'>('secrets');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter ideas
  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      // Search in title, hook, tags
      const currentTitle = idea.title[lang] || idea.title['uz'] || '';
      const currentHook = idea.hook[lang] || idea.hook['uz'] || '';
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch = 
        !query || 
        currentTitle.toLowerCase().includes(query) ||
        currentHook.toLowerCase().includes(query) ||
        idea.tags.some(tag => tag.toLowerCase().includes(query));

      const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
      const matchesFormat = selectedFormat === 'all' || idea.format === selectedFormat;
      const matchesFavorites = !onlyFavorites || idea.isSaved;

      return matchesSearch && matchesCategory && matchesFormat && matchesFavorites;
    });
  }, [ideas, searchQuery, selectedCategory, selectedFormat, onlyFavorites, lang]);

  // Handle manual idea creation
  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) {
      showToast('Iltimos, g‘oya sarlavhasini kiriting', 'warning');
      return;
    }

    const pointsArray = customPointsText
      ? customPointsText.split('\n').filter(p => p.trim())
      : ['1-asosiy fikr', '2-amaliy maslahat', '3-natija'];

    const newIdea: VideoIdea = {
      id: `custom-${Date.now()}`,
      category: customCategory,
      format: customFormat,
      difficulty: 'beginner',
      tags: ['shaxsiy', 'creatorlab'],
      isCustom: true,
      createdAt: new Date().toISOString(),
      title: {
        uz: customTitle,
        ru: customTitle,
        en: customTitle,
      },
      hook: {
        uz: customHook || customTitle,
        ru: customHook || customTitle,
        en: customHook || customTitle,
      },
      targetAudience: {
        uz: customAudience || 'Mening maqsadli auditoriyam',
        ru: customAudience || 'Целевая аудитория',
        en: customAudience || 'My core audience',
      },
      keyPoints: {
        uz: pointsArray,
        ru: pointsArray,
        en: pointsArray,
      },
    };

    onAddCustomIdea(newIdea);
    showToast(t.ideas.ideaCreatedSuccess, 'success');
    setIsCreateModalOpen(false);
    // Reset form
    setCustomTitle('');
    setCustomHook('');
    setCustomAudience('');
    setCustomPointsText('');
  };

  // Handle Algorithmic Generation
  const handleGenerate = () => {
    if (!genTopic.trim()) {
      showToast('Iltimos, mavzu yoki kalit so‘zni kiriting', 'warning');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateAlgorithmicIdea({
        topic: genTopic,
        category: genCategory,
        format: genFormat,
        angle: genAngle,
      });

      onAddCustomIdea(generated);
      setIsGenerating(false);
      setIsGeneratorModalOpen(false);
      showToast('Yangi algoritmik g‘oya laboratoriyaga qo‘shildi!', 'success');
      setGenTopic('');
    }, 700); // 700ms realistic settling delay
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header and Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.ideas.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t.ideas.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsGeneratorModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7857FF] to-[#42D9FF] hover:opacity-95 shadow-md shadow-[#7857FF]/25 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.ideas.generateIdeaModalTitle}</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Plus className="w-4 h-4" />
            <span>{t.ideas.createNewIdea}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.ideas.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7857FF]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter: Favorites Toggle */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              onlyFavorites
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t.ideas.filterFavorites}</span>
          </button>
        </div>

        {/* Category Tabs (Segmented controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#7857FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.ideas.allCategories}
          </button>
          <button
            onClick={() => setSelectedCategory('tech_edu')}
            className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'tech_edu'
                ? 'bg-[#7857FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.ideas.catTechEdu}
          </button>
          <button
            onClick={() => setSelectedCategory('lifestyle')}
            className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'lifestyle'
                ? 'bg-[#7857FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.ideas.catLifestyle}
          </button>
          <button
            onClick={() => setSelectedCategory('shorts_reels')}
            className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'shorts_reels'
                ? 'bg-[#7857FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.ideas.catShorts}
          </button>
          <button
            onClick={() => setSelectedCategory('business')}
            className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'business'
                ? 'bg-[#7857FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.ideas.catBusiness}
          </button>
          <button
            onClick={() => setSelectedCategory('creative')}
            className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'creative'
                ? 'bg-[#7857FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.ideas.catCreative}
          </button>
          <button
            onClick={() => setSelectedCategory('entertainment')}
            className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'entertainment'
                ? 'bg-[#7857FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.ideas.catEntertainment}
          </button>
        </div>
      </div>

      {/* Ideas Grid */}
      {filteredIdeas.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
          <Layers className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">
            {t.ideas.noIdeasFound}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Qidiruv so‘zini tozalang yoki o‘zingiz xohlagan yangi video mavzusini qo‘shing.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedFormat('all');
              setOnlyFavorites(false);
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white cursor-pointer"
          >
            Filtrlarni tozalash
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => {
            const isFav = idea.isSaved;
            const currentTitle = idea.title[lang] || idea.title['uz'];
            const currentHook = idea.hook[lang] || idea.hook['uz'];
            const currentAudience = idea.targetAudience[lang] || idea.targetAudience['uz'];
            const currentPoints = idea.keyPoints[lang] || idea.keyPoints['uz'] || [];

            return (
              <div
                key={idea.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Zero-Pill metadata: Clean unboxed text with middle-dots */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-[#7857FF] dark:text-[#42D9FF] font-semibold">
                        {idea.category.toUpperCase().replace('_', ' / ')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {idea.format === 'shorts' ? 'Shorts & Reels' : 'YouTube Long'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onToggleFavorite(idea.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                        title={isFav ? t.ideas.removeFromFavorites : t.ideas.saveToFavorites}
                      >
                        {isFav ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      {idea.isCustom && (
                        <button
                          onClick={() => {
                            onDeleteIdea(idea.id);
                            showToast(t.ideas.ideaDeletedSuccess, 'info');
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title={t.ideas.deleteCustom}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-[#7857FF] transition-colors">
                    {currentTitle}
                  </h3>

                  {/* Hook Box */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 mb-3 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-[#7857FF] dark:text-[#42D9FF] block mb-1">
                      {t.ideas.hookLabel}
                    </span>
                    <p className="italic leading-relaxed">"{currentHook}"</p>
                  </div>

                  {/* Key Points list */}
                  {currentPoints.length > 0 && (
                    <div className="mb-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                        {t.ideas.keyPointsLabel}
                      </span>
                      {currentPoints.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 pl-1">
                          <span className="text-[#42D9FF] shrink-0 font-bold">›</span>
                          <span className="leading-tight">{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action: Transfer to Script Workshop */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                    {currentAudience}
                  </span>

                  <button
                    onClick={() => {
                      onTransferToScript(idea);
                      showToast('G‘oya ssenariy ustaxonasiga ko‘chirildi!', 'success');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#7857FF] bg-[#7857FF]/10 hover:bg-[#7857FF] hover:text-white transition-all cursor-pointer shrink-0"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>{t.ideas.transferToScript}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Creative Idea Generator */}
      {isGeneratorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7857FF]" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.ideas.generateIdeaModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsGeneratorModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mandatory transparent disclaimer */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              <span className="font-bold text-[#7857FF] block mb-0.5">ℹ️ Shaffoflik ma'lumoti:</span>
              {t.ideas.generatorDisclaimer}
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Mavzu yoki nisha (masalan: Dasturlash, Ingliz tili, Sog‘liq, Kitoblar):
                </label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="Mavzuni kiriting..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7857FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Kategoriya:
                  </label>
                  <select
                    value={genCategory}
                    onChange={(e) => setGenCategory(e.target.value as IdeaCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="tech_edu">Ta'lim & Texnologiya</option>
                    <option value="lifestyle">Hayot tarzi & Vlog</option>
                    <option value="shorts_reels">Qisqa videolar</option>
                    <option value="business">Biznes & Karyera</option>
                    <option value="creative">Ijod & Dizayn</option>
                    <option value="entertainment">Ko‘ngilochar</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Psixologik burchak:
                  </label>
                  <select
                    value={genAngle}
                    onChange={(e) => setGenAngle(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="secrets">Yashirin sirlar & Fosh qilish</option>
                    <option value="mistakes">90% qilinadigan xatolar</option>
                    <option value="educational">3 ta oson qadam (How-To)</option>
                    <option value="dramatic">Ziddiyat & Qiziqish</option>
                    <option value="transformation">14 kunlik transformatsiya</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGeneratorModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/30 cursor-pointer disabled:opacity-50"
                >
                  {isGenerating ? t.ideas.generating : t.ideas.generateBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Custom Idea */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.ideas.createNewIdea}
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustom} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  G‘oya sarlavhasi *
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Masalan: Dasturlashda eng ko‘p uchraydigan 3 ta xato"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7857FF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Kirish jumlasi (Hook):
                </label>
                <textarea
                  rows={2}
                  value={customHook}
                  onChange={(e) => setCustomHook(e.target.value)}
                  placeholder="Dastlabki 3 soniyada tomoshabinni ushlab qoluvchi jumla..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7857FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kategoriya:
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as IdeaCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="tech_edu">Ta'lim & Texnologiya</option>
                    <option value="lifestyle">Hayot tarzi & Vlog</option>
                    <option value="shorts_reels">Qisqa videolar</option>
                    <option value="business">Biznes & Karyera</option>
                    <option value="creative">Ijod & Dizayn</option>
                    <option value="entertainment">Ko‘ngilochar</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Format:
                  </label>
                  <select
                    value={customFormat}
                    onChange={(e) => setCustomFormat(e.target.value as IdeaFormat)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="shorts">Shorts & Reels</option>
                    <option value="longform">To‘liq video (YouTube)</option>
                    <option value="series">Seriyali mini-dars</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Asosiy qadamlar / Reja (har bir qatorda 1 tadan):
                </label>
                <textarea
                  rows={3}
                  value={customPointsText}
                  onChange={(e) => setCustomPointsText(e.target.value)}
                  placeholder="1-qadam: ...&#10;2-qadam: ...&#10;3-qadam: ..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7857FF]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/30 cursor-pointer"
                >
                  {t.common.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
