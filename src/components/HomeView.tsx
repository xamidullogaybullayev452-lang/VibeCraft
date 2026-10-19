import React from 'react';
import { NavSection, Language, VideoIdea, Script, CalendarTask, UserProfile } from '../types';
import { translations } from '../i18n/translations';
import { 
  Sparkles, 
  ArrowRight, 
  PenTool, 
  Layers, 
  Calendar, 
  Flame, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck,
  ChevronRight,
  TrendingUp,
  Video
} from 'lucide-react';

interface HomeViewProps {
  lang: Language;
  onNavigate: (section: NavSection) => void;
  onOpenTour: () => void;
  ideas: VideoIdea[];
  scripts: Script[];
  tasks: CalendarTask[];
  profile: UserProfile;
  onToggleFavorite: (ideaId: string) => void;
  onTransferToScript: (idea: VideoIdea) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  onNavigate,
  onOpenTour,
  ideas,
  scripts,
  tasks,
  profile,
  onToggleFavorite,
  onTransferToScript,
}) => {
  const t = translations[lang];

  // Stats calculation
  const savedIdeasCount = ideas.filter((i) => i.isSaved).length;
  const publishedTasksCount = tasks.filter((t) => t.status === 'published' || t.completed).length;
  const trendingIdeas = ideas.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl">
        {/* Ambient lighting inside hero */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7857FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#42D9FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px]">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7857FF]/20 border border-[#7857FF]/30 text-[#42D9FF] text-xs font-bold tracking-wide uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CreatorLab 2026 Edition</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6 [text-wrap:balance]">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
                {t.hero.subheadline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => onNavigate('ideas')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7857FF] to-[#633be8] hover:from-[#6b45f5] hover:to-[#572de0] shadow-lg shadow-[#7857FF]/30 transition-all cursor-pointer group"
              >
                <span>{t.hero.exploreIdeasBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('scripts')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all cursor-pointer"
              >
                <PenTool className="w-4 h-4 text-[#42D9FF]" />
                <span>{t.hero.writeScriptBtn}</span>
              </button>

              <button
                onClick={onOpenTour}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>{t.hero.openTourBtn}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Image with Fallback */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <img
              src="/src/assets/images/creatorlab_hero_banner_1792402842795.jpg"
              alt="CreatorLab Creative Studio Station"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Measured Scrim for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:via-transparent lg:to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-md bg-slate-900/80 border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Studiya faolligi</span>
                <span className="text-[#42D9FF] font-mono">Real-time</span>
              </div>
              <div className="text-white font-medium">
                {profile.name} ({profile.handle}) · {profile.streakDays} {t.hero.activeStreak}
              </div>
            </div>
          </div>
        </div>

        {/* 4-KPI Studio Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 border-t border-slate-800 bg-slate-950/70">
          <div className="p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#7857FF]/15 text-[#7857FF] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono tabular-nums text-white">
                {ideas.length}
              </div>
              <div className="text-xs text-slate-400">{t.ideas.title}</div>
            </div>
          </div>

          <div className="p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#42D9FF]/15 text-[#42D9FF] flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono tabular-nums text-white">
                {scripts.length}
              </div>
              <div className="text-xs text-slate-400">{t.hero.scriptsReady}</div>
            </div>
          </div>

          <div className="p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono tabular-nums text-white">
                {tasks.length}
              </div>
              <div className="text-xs text-slate-400">{t.calendar.title}</div>
            </div>
          </div>

          <div className="p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono tabular-nums text-white">
                {profile.totalPoints}
              </div>
              <div className="text-xs text-slate-400">{t.hero.pointsEarned}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Production Workflow (Mechanism-to-Outcome) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#7857FF] mb-1">
              Ishlash tartibi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              G‘oyadan tayyor videoga qadar 3 qadam
            </h2>
          </div>
          <button
            onClick={() => onNavigate('ideas')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7857FF] hover:underline cursor-pointer"
          >
            <span>Laboratoriyaga o‘tish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => onNavigate('ideas')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#7857FF]/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#7857FF]/10 text-[#7857FF] flex items-center justify-center font-mono font-bold text-xs">
                  01
                </span>
                <span className="text-xs text-slate-400 font-medium">G‘oya & Niche</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#7857FF] transition-colors">
                G‘oya topish va tekshirish
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                20 dan ortiq tayyor nishali mavzular yoki o‘z shaxsiy g‘oyangizni algoritm bilan shakllantiring.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#7857FF]">
              <span>G‘oyalarni ko‘rish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onNavigate('scripts')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#42D9FF]/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#42D9FF]/10 text-[#42D9FF] flex items-center justify-center font-mono font-bold text-xs">
                  02
                </span>
                <span className="text-xs text-slate-400 font-medium">Struktura & Matn</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#42D9FF] transition-colors">
                Ssenariy ustaxonasi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                3 soniyalik psixologik Hook, qimmatli asosiy qism va ta\'sirchan Yakun (CTA) bilan professional yozing.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#42D9FF]">
              <span>Muharrirni ochish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onNavigate('calendar')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono font-bold text-xs">
                  03
                </span>
                <span className="text-xs text-slate-400 font-medium">Reja & Intizom</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                Haftalik kalendar & Challenge
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Suratga olish kunlarini belgilang, kunlik ijodiy vazifalarni bajarib ballar va nishonlar yuting.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-500">
              <span>Kalendarga o‘tish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Ideas Spotlight */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#7857FF] mb-1">
              Kreativ tavsiyalar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Bugungi trend g‘oyalar
            </h2>
          </div>
          <button
            onClick={() => onNavigate('ideas')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#7857FF] hover:text-white transition-all cursor-pointer"
          >
            <span>Barcha 20+ g‘oyalar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingIdeas.map((idea) => {
            const isFav = idea.isSaved;
            return (
              <div
                key={idea.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-semibold text-[#7857FF] dark:text-[#42D9FF]">
                      {idea.category.toUpperCase().replace('_', ' / ')}
                    </span>
                    <button
                      onClick={() => onToggleFavorite(idea.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                      title={isFav ? t.ideas.removeFromFavorites : t.ideas.saveToFavorites}
                    >
                      {isFav ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {idea.title[lang]}
                  </h3>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-4 text-xs text-slate-600 dark:text-slate-300 italic">
                    "{idea.hook[lang]}"
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {idea.format === 'shorts' ? 'Shorts / Reels' : 'YouTube Video'}
                  </span>
                  <button
                    onClick={() => onTransferToScript(idea)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#7857FF]/10 text-[#7857FF] hover:bg-[#7857FF] hover:text-white transition-all cursor-pointer"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Ssenariyga</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Challenge Teaser Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#7857FF]/10 via-[#42D9FF]/10 to-transparent border border-[#7857FF]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#7857FF] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#7857FF]/30">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
              Bugungi Creator Challenge: 1 ta yangi hook yozing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Vazifani bajaring va +25 Creator balli hamda kunlik seriya (streak)ga ega bo‘ling!
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('challenges')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#7857FF] hover:bg-[#6642f5] shadow-md transition-all cursor-pointer shrink-0"
        >
          <span>Vazifani ko‘rish</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
