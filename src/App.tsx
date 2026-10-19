/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  NavSection, 
  Language, 
  Theme, 
  VideoIdea, 
  Script, 
  CalendarTask, 
  Challenge, 
  Achievement, 
  UserProfile, 
  ToastNotification 
} from './types';
import { StorageService } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { IdeasLabView } from './components/IdeasLabView';
import { ScriptWorkshopView } from './components/ScriptWorkshopView';
import { ContentCalendarView } from './components/ContentCalendarView';
import { CreatorChallengeView } from './components/CreatorChallengeView';
import { MyStudioView } from './components/MyStudioView';
import { AboutContactView } from './components/AboutContactView';
import { OnboardingModal } from './components/OnboardingModal';
import { ToastContainer } from './components/Toast';

export default function App() {
  // Navigation & Preferences
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [lang, setLang] = useState<Language>(() => StorageService.getLanguage());
  const [theme, setTheme] = useState<Theme>(() => StorageService.getTheme());
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Core Data States
  const [ideas, setIdeas] = useState<VideoIdea[]>(() => StorageService.getIdeas());
  const [scripts, setScripts] = useState<Script[]>(() => StorageService.getScripts());
  const [tasks, setTasks] = useState<CalendarTask[]>(() => StorageService.getCalendarTasks());
  const [challenges, setChallenges] = useState<Challenge[]>(() => StorageService.getChallenges());
  const [achievements, setAchievements] = useState<Achievement[]>(() => StorageService.getAchievements());
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.getProfile());

  // Interactive Bridge: send idea straight to script editor
  const [activeScriptDraft, setActiveScriptDraft] = useState<{ title: string; hook: string; category: string } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync Theme with HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    StorageService.setTheme(theme);
  }, [theme]);

  // Sync Language
  const handleSelectLang = (newLang: Language) => {
    setLang(newLang);
    StorageService.setLanguage(newLang);
    showToast(newLang === 'uz' ? 'Til: O‘zbekcha' : newLang === 'ru' ? 'Язык: Русский' : 'Language: English', 'info');
  };

  // Toggle Theme
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Check Onboarding on first load
  useEffect(() => {
    if (!StorageService.hasSeenOnboarding()) {
      setIsOnboardingOpen(true);
      StorageService.setOnboardingSeen(true);
    }
  }, []);

  // Scroll to top on section switch
  const handleNavigate = (section: NavSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Handlers: Ideas ---
  const handleToggleFavorite = (ideaId: string) => {
    const updated = ideas.map((idea) => {
      if (idea.id === ideaId) {
        const nextState = !idea.isSaved;
        showToast(nextState ? 'G‘oya sevimlilarga saqlandi' : 'G‘oya sevimlilardan olindi', 'info');
        return { ...idea, isSaved: nextState };
      }
      return idea;
    });
    setIdeas(updated);
    StorageService.saveIdeas(updated);
  };

  const handleAddCustomIdea = (newIdea: VideoIdea) => {
    const updated = [newIdea, ...ideas];
    setIdeas(updated);
    StorageService.saveIdeas(updated);
  };

  const handleDeleteIdea = (ideaId: string) => {
    const updated = ideas.filter((i) => i.id !== ideaId);
    setIdeas(updated);
    StorageService.saveIdeas(updated);
  };

  const handleTransferToScript = (idea: VideoIdea) => {
    const title = idea.title[lang] || idea.title['uz'];
    const hook = idea.hook[lang] || idea.hook['uz'];
    setActiveScriptDraft({
      title,
      hook,
      category: idea.category,
    });
    setCurrentSection('scripts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Handlers: Scripts ---
  const handleSaveScript = (script: Script) => {
    const index = scripts.findIndex((s) => s.id === script.id);
    let updated: Script[];
    if (index >= 0) {
      updated = [...scripts];
      updated[index] = script;
    } else {
      updated = [script, ...scripts];
      // Reward +20 points for saving a complete new script!
      handleAwardPoints(20, 'Yangi ssenariy yaratildi');
    }
    setScripts(updated);
    StorageService.saveScripts(updated);
  };

  const handleDeleteScript = (scriptId: string) => {
    const updated = scripts.filter((s) => s.id !== scriptId);
    setScripts(updated);
    StorageService.saveScripts(updated);
  };

  // --- Handlers: Calendar ---
  const handleAddTask = (task: CalendarTask) => {
    const updated = [...tasks, task];
    setTasks(updated);
    StorageService.saveCalendarTasks(updated);
  };

  const handleUpdateTask = (task: CalendarTask) => {
    const updated = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(updated);
    StorageService.saveCalendarTasks(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    setTasks(updated);
    StorageService.saveCalendarTasks(updated);
  };

  const handleToggleTaskComplete = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        if (nextState) {
          handleAwardPoints(10, 'Kalendar vazifasi bajarildi');
          showToast('+10 Creator balli qo‘shildi! Ajoyib!', 'success');
        }
        return {
          ...t,
          completed: nextState,
          status: nextState ? ('published' as const) : t.status,
        };
      }
      return t;
    });
    setTasks(updated);
    StorageService.saveCalendarTasks(updated);
  };

  // --- Handlers: Creator Challenge & Points ---
  const handleAwardPoints = (pointsToAdd: number, reason?: string) => {
    setProfile((prev) => {
      const newTotal = prev.totalPoints + pointsToAdd;
      const updated = { ...prev, totalPoints: newTotal };
      StorageService.saveProfile(updated);
      return updated;
    });
  };

  const handleCompleteChallenge = (challengeId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const targetChallenge = challenges.find((c) => c.id === challengeId);
    if (!targetChallenge) return;

    // Check anti-cheat
    const history = profile.completedChallengesHistory || {};
    const todayList = history[todayStr] || [];
    if (todayList.includes(challengeId)) {
      showToast('Ushbu vazifa bugun bajarilgan!', 'info');
      return;
    }

    // Update profile with anti-cheat record
    const updatedHistory = {
      ...history,
      [todayStr]: [...todayList, challengeId],
    };

    // Calculate streak
    let newStreak = profile.streakDays;
    if (profile.lastActiveDate !== todayStr) {
      newStreak = profile.streakDays + 1;
    }

    const updatedProfile: UserProfile = {
      ...profile,
      totalPoints: profile.totalPoints + targetChallenge.points,
      streakDays: newStreak,
      lastActiveDate: todayStr,
      completedChallengesHistory: updatedHistory,
    };

    setProfile(updatedProfile);
    StorageService.saveProfile(updatedProfile);

    // Update challenges state
    const updatedChallenges = challenges.map((ch) =>
      ch.id === challengeId ? { ...ch, isCompleted: true, completedDate: todayStr } : ch
    );
    setChallenges(updatedChallenges);
    StorageService.saveChallenges(updatedChallenges);
  };

  // --- Handlers: Profile & Full Data Reload ---
  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    StorageService.saveProfile(newProfile);
  };

  const handleRestoreAllData = () => {
    setLang(StorageService.getLanguage());
    setTheme(StorageService.getTheme());
    setIdeas(StorageService.getIdeas());
    setScripts(StorageService.getScripts());
    setTasks(StorageService.getCalendarTasks());
    setChallenges(StorageService.getChallenges());
    setAchievements(StorageService.getAchievements());
    setProfile(StorageService.getProfile());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1020] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Subtle ambient lighting orbs (respecting prefers-reduced-motion) */}
      <div 
        aria-hidden="true" 
        className="fixed top-[-100px] left-1/4 w-[500px] h-[500px] bg-[#7857FF]/8 dark:bg-[#7857FF]/12 rounded-full blur-[140px] pointer-events-none animate-ambient-glow" 
      />
      <div 
        aria-hidden="true" 
        className="fixed bottom-[-100px] right-1/4 w-[500px] h-[500px] bg-[#42D9FF]/8 dark:bg-[#42D9FF]/10 rounded-full blur-[140px] pointer-events-none animate-ambient-glow" 
      />

      {/* Top Bar Navigation */}
      <Navbar
        currentSection={currentSection}
        onSelectSection={handleNavigate}
        lang={lang}
        onSelectLang={handleSelectLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenTour={() => setIsOnboardingOpen(true)}
        profile={profile}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentSection === 'home' && (
          <HomeView
            lang={lang}
            onNavigate={handleNavigate}
            onOpenTour={() => setIsOnboardingOpen(true)}
            ideas={ideas}
            scripts={scripts}
            tasks={tasks}
            profile={profile}
            onToggleFavorite={handleToggleFavorite}
            onTransferToScript={handleTransferToScript}
          />
        )}

        {currentSection === 'ideas' && (
          <IdeasLabView
            lang={lang}
            ideas={ideas}
            onToggleFavorite={handleToggleFavorite}
            onAddCustomIdea={handleAddCustomIdea}
            onDeleteIdea={handleDeleteIdea}
            onTransferToScript={handleTransferToScript}
            showToast={showToast}
          />
        )}

        {currentSection === 'scripts' && (
          <ScriptWorkshopView
            lang={lang}
            scripts={scripts}
            onSaveScript={handleSaveScript}
            onDeleteScript={handleDeleteScript}
            activeScriptDraft={activeScriptDraft}
            onClearDraft={() => setActiveScriptDraft(null)}
            showToast={showToast}
          />
        )}

        {currentSection === 'calendar' && (
          <ContentCalendarView
            lang={lang}
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleTaskComplete}
            showToast={showToast}
          />
        )}

        {currentSection === 'challenges' && (
          <CreatorChallengeView
            lang={lang}
            challenges={challenges}
            achievements={achievements}
            profile={profile}
            onCompleteChallenge={handleCompleteChallenge}
            showToast={showToast}
          />
        )}

        {currentSection === 'studio' && (
          <MyStudioView
            lang={lang}
            profile={profile}
            ideas={ideas}
            scripts={scripts}
            tasks={tasks}
            onUpdateProfile={handleUpdateProfile}
            onNavigate={handleNavigate}
            onTransferToScript={handleTransferToScript}
            onRestoreAllData={handleRestoreAllData}
            showToast={showToast}
          />
        )}

        {currentSection === 'about' && (
          <AboutContactView
            lang={lang}
            showToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
        onOpenTour={() => setIsOnboardingOpen(true)}
      />

      {/* 3-Step Interactive Walkthrough Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        lang={lang}
      />

      {/* Accessible Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </div>
  );
}
