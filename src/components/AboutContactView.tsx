import React, { useState } from 'react';
import { Language, ContactMessage } from '../types';
import { translations } from '../i18n/translations';
import { StorageService } from '../utils/storage';
import { 
  Info, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Inbox, 
  Clock, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface AboutContactViewProps {
  lang: Language;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const AboutContactView: React.FC<AboutContactViewProps> = ({ lang, showToast }) => {
  const t = translations[lang];

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Taklif yoki savol');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inboxMessages, setInboxMessages] = useState<ContactMessage[]>(() => StorageService.getInboxMessages());

  // FAQ accordion state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      newErrors.name = t.about.validationErrors.nameRequired;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = t.about.validationErrors.emailInvalid;
    }
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = t.about.validationErrors.messageShort;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Iltimos, shaklni to‘g‘ri to‘ldiring', 'warning');
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      topic: topic.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    StorageService.addInboxMessage(newMessage);
    setInboxMessages(StorageService.getInboxMessages());
    setIsSubmitted(true);
    showToast(t.about.submissionSuccess, 'success');

    // Reset inputs
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t.about.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          {t.about.subtitle}
        </p>
      </div>

      {/* Mission & Studio Presentation Section */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7857FF]/10 text-[#7857FF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Missiyamiz</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t.about.missionTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.about.missionDesc}
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {t.about.featuresList.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
          <img
            src="/src/assets/images/creator_studio_setup_1792402843717.jpg"
            alt="Creator Production Desk"
            referrerPolicy="no-referrer"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-xs font-semibold text-white">
              CreatorLab Workspace · Reja va Ssenariy
            </span>
          </div>
        </div>
      </div>

      {/* Contact Form & Transparent Feedback Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Validated Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {t.about.contactFormTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.about.contactFormDesc}
            </p>
          </div>

          {/* Transparent serverless notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#7857FF] shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              {t.about.localFeedbackNotice}
            </span>
          </div>

          {isSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{t.about.submissionSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.about.inputName} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingiz..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7857FF] ${
                    errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.name && (
                  <span className="text-[11px] text-rose-500 mt-1 block">{errors.name}</span>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.about.inputEmail} *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="namuna@domain.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7857FF] ${
                    errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.email && (
                  <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>
                )}
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.about.inputTopic}
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
              >
                <option value="Taklif yoki fikr-mulohaza">Yangi g‘oya yoki taklif</option>
                <option value="Xato haqida xabar">Texnik xatolik haqida xabar</option>
                <option value="Hamkorlik">Kreatorlar hamkorligi</option>
                <option value="Boshqa savol">Boshqa savol</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.about.inputMessage} *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Fikr yoki savolingizni batafsil yozing (kamida 10 ta belgi)..."
                className={`w-full p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#7857FF] leading-relaxed ${
                  errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.message && (
                <span className="text-[11px] text-rose-500 mt-1 block">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#7857FF] hover:bg-[#6844fc] shadow-md shadow-[#7857FF]/30 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.about.submitBtn}</span>
            </button>
          </form>
        </div>

        {/* Right Column: FAQ & Local Feedback Inbox */}
        <div className="lg:col-span-5 space-y-6">
          {/* FAQ Accordion */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#7857FF]" />
              <span>{t.about.faqTitle}</span>
            </h3>

            <div className="space-y-3">
              {t.about.faqs.map((faq, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3 text-left font-bold text-xs text-slate-800 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Local Inbox Messages Log (Proof of recording) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
                <Inbox className="w-4 h-4 text-[#42D9FF]" />
                <span>Yuborilgan xabarlar (Lokal Inbox)</span>
              </h3>
              <span className="font-mono text-xs text-slate-500 font-bold">
                {inboxMessages.length} ta
              </span>
            </div>

            {inboxMessages.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">
                Hozircha yuborilgan xabarlar yo‘q.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {inboxMessages.slice(0, 4).map((msg) => (
                  <div
                    key={msg.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{msg.name}</span>
                      <span className="font-mono text-[10px]">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
