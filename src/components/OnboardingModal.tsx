import React, { useEffect, useState } from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import { Lightbulb, PenTool, Calendar, ArrowRight, ArrowLeft, Check, Sparkles, X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, lang }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const t = translations[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: '01',
      icon: <Lightbulb className="w-8 h-8 text-[#42D9FF]" />,
      title: t.tour.step1Title,
      description: t.tour.step1Desc,
      tag: 'G‘oyalar laboratoriyasi',
    },
    {
      stepNumber: '02',
      icon: <PenTool className="w-8 h-8 text-[#7857FF]" />,
      title: t.tour.step2Title,
      description: t.tour.step2Desc,
      tag: 'Ssenariy ustaxonasi',
    },
    {
      stepNumber: '03',
      icon: <Calendar className="w-8 h-8 text-emerald-400" />,
      title: t.tour.step3Title,
      description: t.tour.step3Desc,
      tag: 'Kalendar & Challenge',
    },
  ];

  const current = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#7857FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#42D9FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#7857FF]/10 dark:bg-[#7857FF]/20 text-[#7857FF]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.brand} · {current.stepNumber} / 03
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Icon and Content */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 flex items-center justify-center mb-5 shadow-sm">
            {current.icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {current.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Step Progress Indicators */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-8 bg-[#7857FF]'
                  : idx < currentStep
                  ? 'w-3 bg-[#42D9FF]'
                  : 'w-3 bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.tour.prevBtn}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              {t.tour.skipBtn}
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/25 transition-all cursor-pointer"
            >
              {t.tour.nextBtn}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7857FF] to-[#42D9FF] hover:opacity-95 shadow-lg shadow-[#7857FF]/30 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              {t.tour.finishBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
