import React from 'react';
import { NavSection, Language } from '../types';
import { translations } from '../i18n/translations';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (section: NavSection) => void;
  onOpenTour: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, onOpenTour }) => {
  const t = translations[lang];

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1020] text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7857FF] to-[#42D9FF] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                Creator<span className="text-[#7857FF]">Lab</span>
              </span>
              <p className="text-[11px] text-slate-500">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => onNavigate('ideas')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.ideas}
            </button>
            <button
              onClick={() => onNavigate('scripts')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.scripts}
            </button>
            <button
              onClick={() => onNavigate('calendar')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.calendar}
            </button>
            <button
              onClick={() => onNavigate('challenges')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.challenges}
            </button>
            <button
              onClick={() => onNavigate('studio')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.studio}
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.about}
            </button>
            <button
              onClick={onOpenTour}
              className="text-[#7857FF] dark:text-[#42D9FF] font-semibold hover:underline cursor-pointer"
            >
              {t.nav.tour}
            </button>
          </div>

          {/* Copyright */}
          <div className="text-[11px] text-slate-400 text-center md:text-right">
            <div>© {new Date().getFullYear()} CreatorLab Suite.</div>
            <div className="flex items-center justify-center md:justify-end gap-1 mt-0.5">
              <span>Yosh ijodkorlar uchun yaratildi</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
