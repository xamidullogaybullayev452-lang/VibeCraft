import React, { useState, useEffect } from 'react';
import { NavSection, Language, Theme, UserProfile } from '../types';
import { translations } from '../i18n/translations';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Flame, 
  HelpCircle, 
  Layers, 
  PenTool, 
  Calendar, 
  Trophy, 
  User, 
  Info,
  Globe
} from 'lucide-react';

interface NavbarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenTour: () => void;
  profile: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  lang,
  onSelectLang,
  theme,
  onToggleTheme,
  onOpenTour,
  profile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[lang];

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setLangDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems: { key: NavSection; label: string; icon: React.ReactNode }[] = [
    { key: 'home', label: t.nav.home, icon: <Sparkles className="w-4 h-4" /> },
    { key: 'ideas', label: t.nav.ideas, icon: <Layers className="w-4 h-4" /> },
    { key: 'scripts', label: t.nav.scripts, icon: <PenTool className="w-4 h-4" /> },
    { key: 'calendar', label: t.nav.calendar, icon: <Calendar className="w-4 h-4" /> },
    { key: 'challenges', label: t.nav.challenges, icon: <Trophy className="w-4 h-4" /> },
    { key: 'studio', label: t.nav.studio, icon: <User className="w-4 h-4" /> },
    { key: 'about', label: t.nav.about, icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (section: NavSection) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-[#0B1020]/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
              aria-label="CreatorLab Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7857FF] to-[#42D9FF] flex items-center justify-center shadow-md shadow-[#7857FF]/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Creator<span className="text-[#7857FF]">Lab</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Studio Suite
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#7857FF]/10 dark:bg-[#7857FF]/20 text-[#7857FF] dark:text-[#42D9FF]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Compact Viewport Menu for Laptops (md to xl) */}
          <div className="hidden md:flex xl:hidden items-center gap-1">
            {navItems.slice(0, 4).map((item) => {
              const isActive = currentSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#7857FF]/15 text-[#7857FF]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Points pill */}
            <div 
              onClick={() => handleNavClick('challenges')} 
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold cursor-pointer hover:bg-amber-500/20 transition-colors"
              title="Creator Points"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="tabular-nums font-mono">{profile.totalPoints}</span>
            </div>

            {/* Tour Button */}
            <button
              onClick={onOpenTour}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-[#7857FF] dark:hover:text-[#42D9FF] rounded-lg transition-colors cursor-pointer"
              title={t.nav.tour}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden xl:inline">{t.nav.tour}</span>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1.5 text-xs font-bold uppercase rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={t.nav.langToggle}
              >
                <Globe className="w-3.5 h-3.5 text-[#7857FF]" />
                <span>{lang}</span>
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setLangDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-40 text-xs">
                    <button
                      onClick={() => {
                        onSelectLang('uz');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 font-medium flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        lang === 'uz' ? 'text-[#7857FF] font-bold' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>O‘zbekcha</span>
                      {lang === 'uz' && <span className="text-[10px] text-[#7857FF]">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        onSelectLang('ru');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 font-medium flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        lang === 'ru' ? 'text-[#7857FF] font-bold' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>Русский</span>
                      {lang === 'ru' && <span className="text-[10px] text-[#7857FF]">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        onSelectLang('en');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 font-medium flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        lang === 'en' ? 'text-[#7857FF] font-bold' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>English</span>
                      {lang === 'en' && <span className="text-[10px] text-[#7857FF]">✓</span>}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={t.nav.themeToggle}
              title={t.nav.themeToggle}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#7857FF]" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full max-w-sm ml-auto h-[calc(100vh-4rem)] bg-white dark:bg-[#0B1020] border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.nav.home} · Menyu
                </span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 text-xs font-bold font-mono">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{profile.totalPoints} {t.common.points}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = currentSection === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleNavClick(item.key)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#7857FF] text-white shadow-md shadow-[#7857FF]/25'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTour();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#7857FF]" />
                <span>{t.nav.tour}</span>
              </button>
              <div className="text-[11px] text-center text-slate-400">
                CreatorLab v1.0 · {profile.handle}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
