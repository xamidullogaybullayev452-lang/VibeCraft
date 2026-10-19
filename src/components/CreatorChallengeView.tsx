import React from 'react';
import { Challenge, Achievement, UserProfile, Language } from '../types';
import { translations } from '../i18n/translations';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Award, 
  Lock, 
  Unlock,
  PenTool,
  Calendar,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface CreatorChallengeViewProps {
  lang: Language;
  challenges: Challenge[];
  achievements: Achievement[];
  profile: UserProfile;
  onCompleteChallenge: (challengeId: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const CreatorChallengeView: React.FC<CreatorChallengeViewProps> = ({
  lang,
  challenges,
  achievements,
  profile,
  onCompleteChallenge,
  showToast,
}) => {
  const t = translations[lang];
  const todayStr = new Date().toISOString().split('T')[0];

  // Calculate Level based on points
  const points = profile.totalPoints;
  let levelTitle = t.challenges.levels.lvl1;
  let nextLevelPoints = 150;
  let progressPercent = Math.min(100, Math.round((points / 150) * 100));

  if (points >= 600) {
    levelTitle = t.challenges.levels.lvl5;
    nextLevelPoints = 600;
    progressPercent = 100;
  } else if (points >= 350) {
    levelTitle = t.challenges.levels.lvl4;
    nextLevelPoints = 600;
    progressPercent = Math.round(((points - 350) / 250) * 100);
  } else if (points >= 200) {
    levelTitle = t.challenges.levels.lvl3;
    nextLevelPoints = 350;
    progressPercent = Math.round(((points - 200) / 150) * 100);
  } else if (points >= 100) {
    levelTitle = t.challenges.levels.lvl2;
    nextLevelPoints = 200;
    progressPercent = Math.round(((points - 100) / 100) * 100);
  }

  // Handle challenge button click with confetti celebration
  const handleTriggerChallenge = (ch: Challenge) => {
    const todayCompletedList = profile.completedChallengesHistory[todayStr] || [];
    if (todayCompletedList.includes(ch.id)) {
      showToast(t.challenges.alreadyCompletedNotice, 'info');
      return;
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7857FF', '#42D9FF', '#10B981'],
      });
    } catch (e) {
      // safe fallback if canvas not available
    }

    onCompleteChallenge(ch.id);
    showToast(`+${ch.points} ${t.common.points}! ${t.challenges.congratulationsToast}`, 'success');
  };

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t.challenges.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          {t.challenges.subtitle}
        </p>
      </div>

      {/* Hero Scoreboard & Level Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7857FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#42D9FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Level & Rank */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#42D9FF] mb-2">
              <Trophy className="w-4 h-4" />
              <span>{t.challenges.rankLevel}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {levelTitle}
            </h2>
            <p className="text-xs text-slate-400">
              Keyingi darajagacha: <span className="font-mono font-bold text-white">{nextLevelPoints - points > 0 ? nextLevelPoints - points : 0}</span> ball
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Daraja rivojlanishi</span>
              <span className="font-mono font-bold tabular-nums text-[#42D9FF]">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
              <div 
                className="h-full bg-gradient-to-r from-[#7857FF] to-[#42D9FF] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Points & Streak Badges */}
          <div className="flex items-center justify-around md:justify-end gap-6 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xs uppercase mb-1">
                <Flame className="w-4 h-4" />
                <span>{t.challenges.dailyStreak}</span>
              </div>
              <div className="text-3xl font-black font-mono tabular-nums text-white">
                {profile.streakDays}
              </div>
              <div className="text-[11px] text-slate-400">{t.common.streak}</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#7857FF] font-bold text-xs uppercase mb-1">
                <Sparkles className="w-4 h-4" />
                <span>{t.challenges.totalScore}</span>
              </div>
              <div className="text-3xl font-black font-mono tabular-nums text-white">
                {profile.totalPoints}
              </div>
              <div className="text-[11px] text-slate-400">{t.common.points}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Challenges List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#7857FF]" />
            <span>{t.challenges.todayChallenges}</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Bugun: {new Date().toLocaleDateString(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((ch) => {
            const todayCompleted = (profile.completedChallengesHistory[todayStr] || []).includes(ch.id);

            return (
              <div
                key={ch.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  todayCompleted
                    ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#7857FF]/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold text-[#7857FF] dark:text-[#42D9FF] uppercase tracking-wider">
                      {ch.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      +{ch.points} {t.common.points}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {ch.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {ch.description[lang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {todayCompleted ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.challenges.completedBadge}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Bajarilmagan
                    </span>
                  )}

                  <button
                    onClick={() => handleTriggerChallenge(ch)}
                    disabled={todayCompleted}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      todayCompleted
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-[#7857FF] text-white hover:bg-[#6844fc] shadow-sm shadow-[#7857FF]/30'
                    }`}
                  >
                    {todayCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Bajarildi</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t.challenges.completeChallengeBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges & Achievements */}
      <section className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>{t.challenges.achievementsTitle}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => {
            const isUnlocked = profile.totalPoints >= ach.pointsRequired;

            return (
              <div
                key={ach.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900/90 border-[#7857FF]/30 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-[#7857FF] to-[#42D9FF] text-white shadow-md shadow-[#7857FF]/25'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {getAchievementIcon(ach.icon)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {ach.title[lang]}
                    </h3>
                    {isUnlocked ? (
                      <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 shrink-0">
                        <Unlock className="w-3 h-3" />
                        <span>Ochilgan</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5 shrink-0">
                        <Lock className="w-3 h-3" />
                        <span>{ach.pointsRequired} ball</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {ach.description[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
