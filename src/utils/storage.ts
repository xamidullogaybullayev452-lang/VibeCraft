import { 
  VideoIdea, 
  Script, 
  CalendarTask, 
  Challenge, 
  Achievement, 
  UserProfile, 
  ContactMessage, 
  Language, 
  Theme 
} from '../types';
import { 
  INITIAL_IDEAS, 
  INITIAL_CHALLENGES, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_CALENDAR_TASKS, 
  INITIAL_PROFILE 
} from '../data/initialData';

const KEYS = {
  LANG: 'creatorlab_lang_v1',
  THEME: 'creatorlab_theme_v1',
  IDEAS: 'creatorlab_ideas_v1',
  SCRIPTS: 'creatorlab_scripts_v1',
  CALENDAR: 'creatorlab_calendar_v1',
  CHALLENGES: 'creatorlab_challenges_v1',
  ACHIEVEMENTS: 'creatorlab_achievements_v1',
  PROFILE: 'creatorlab_profile_v1',
  INBOX: 'creatorlab_inbox_v1',
  ONBOARDING: 'creatorlab_onboarding_seen_v1',
};

// Safe JSON Parse helper with fallback
function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}", using fallback.`, err);
    return fallback;
  }
}

// Safe JSON Set helper
function safeSet<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error saving localStorage key "${key}".`, err);
    return false;
  }
}

export const StorageService = {
  // Language & Theme
  getLanguage: (): Language => {
    const saved = localStorage.getItem(KEYS.LANG) as Language | null;
    if (saved === 'uz' || saved === 'ru' || saved === 'en') return saved;
    return 'uz';
  },
  setLanguage: (lang: Language) => {
    localStorage.setItem(KEYS.LANG, lang);
  },

  getTheme: (): Theme => {
    const saved = localStorage.getItem(KEYS.THEME) as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Default premium SaaS dark mode
  },
  setTheme: (theme: Theme) => {
    localStorage.setItem(KEYS.THEME, theme);
  },

  // Onboarding
  hasSeenOnboarding: (): boolean => {
    return localStorage.getItem(KEYS.ONBOARDING) === 'true';
  },
  setOnboardingSeen: (seen: boolean) => {
    localStorage.setItem(KEYS.ONBOARDING, seen ? 'true' : 'false');
  },

  // Ideas
  getIdeas: (): VideoIdea[] => {
    const saved = safeGet<VideoIdea[] | null>(KEYS.IDEAS, null);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      safeSet(KEYS.IDEAS, INITIAL_IDEAS);
      return INITIAL_IDEAS;
    }
    return saved;
  },
  saveIdeas: (ideas: VideoIdea[]) => {
    safeSet(KEYS.IDEAS, ideas);
  },

  // Scripts
  getScripts: (): Script[] => {
    const saved = safeGet<Script[] | null>(KEYS.SCRIPTS, null);
    if (!saved || !Array.isArray(saved)) {
      // Create a nice sample script so user has initial content to see
      const defaultSample: Script[] = [
        {
          id: 'script-sample-1',
          title: '3 ta bepul AI vositasi haqida Shorts',
          category: 'tech_edu',
          hook: 'Ko‘pchilik topshiriq yozishda vaqtini bekorga sarflaydi. Mana bu 3 ta bepul vosita ishingizni 10 barobar tezlashtiradi!',
          body: 'Birinchidan: matnlarni qisqacha xulosalaydigan vosita.\nIkkinchidan: murakkab formulalarni 30 soniyada tushuntiruvchi sun\'iy intellekt.\nUchinchidan: prezentatsiyalarni tayyor qilib beruvchi vosita.',
          cta: 'Agar bu ro‘yxat yoqqan bo‘lsa, keyingi qism uchun obuna bo‘ling!',
          notes: 'Telefonni vertikal ushlash, fon musiqasini 10% da qo‘yish.',
          targetDurationSec: 45,
          estimatedWords: 52,
          updatedAt: new Date().toISOString(),
        },
      ];
      safeSet(KEYS.SCRIPTS, defaultSample);
      return defaultSample;
    }
    return saved;
  },
  saveScripts: (scripts: Script[]) => {
    safeSet(KEYS.SCRIPTS, scripts);
  },

  // Calendar
  getCalendarTasks: (): CalendarTask[] => {
    const saved = safeGet<CalendarTask[] | null>(KEYS.CALENDAR, null);
    if (!saved || !Array.isArray(saved)) {
      safeSet(KEYS.CALENDAR, INITIAL_CALENDAR_TASKS);
      return INITIAL_CALENDAR_TASKS;
    }
    return saved;
  },
  saveCalendarTasks: (tasks: CalendarTask[]) => {
    safeSet(KEYS.CALENDAR, tasks);
  },

  // Challenges
  getChallenges: (): Challenge[] => {
    const saved = safeGet<Challenge[] | null>(KEYS.CHALLENGES, null);
    if (!saved || !Array.isArray(saved)) {
      safeSet(KEYS.CHALLENGES, INITIAL_CHALLENGES);
      return INITIAL_CHALLENGES;
    }
    return saved;
  },
  saveChallenges: (challenges: Challenge[]) => {
    safeSet(KEYS.CHALLENGES, challenges);
  },

  // Achievements
  getAchievements: (): Achievement[] => {
    const saved = safeGet<Achievement[] | null>(KEYS.ACHIEVEMENTS, null);
    if (!saved || !Array.isArray(saved)) {
      safeSet(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
      return INITIAL_ACHIEVEMENTS;
    }
    return saved;
  },
  saveAchievements: (achievements: Achievement[]) => {
    safeSet(KEYS.ACHIEVEMENTS, achievements);
  },

  // User Profile
  getProfile: (): UserProfile => {
    const saved = safeGet<UserProfile | null>(KEYS.PROFILE, null);
    if (!saved || typeof saved !== 'object') {
      safeSet(KEYS.PROFILE, INITIAL_PROFILE);
      return INITIAL_PROFILE;
    }
    return saved;
  },
  saveProfile: (profile: UserProfile) => {
    safeSet(KEYS.PROFILE, profile);
  },

  // Feedback Messages Inbox (Serverless local simulation)
  getInboxMessages: (): ContactMessage[] => {
    return safeGet<ContactMessage[]>(KEYS.INBOX, []);
  },
  addInboxMessage: (msg: ContactMessage): boolean => {
    const current = StorageService.getInboxMessages();
    return safeSet(KEYS.INBOX, [msg, ...current]);
  },

  // Full Backup Export
  exportAllData: (): string => {
    const data = {
      lang: StorageService.getLanguage(),
      theme: StorageService.getTheme(),
      ideas: StorageService.getIdeas(),
      scripts: StorageService.getScripts(),
      calendar: StorageService.getCalendarTasks(),
      challenges: StorageService.getChallenges(),
      achievements: StorageService.getAchievements(),
      profile: StorageService.getProfile(),
      inbox: StorageService.getInboxMessages(),
      exportDate: new Date().toISOString(),
      appVersion: 'CreatorLab-1.0',
    };
    return JSON.stringify(data, null, 2);
  },

  // Full Backup Import
  importAllData: (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data || typeof data !== 'object') return false;

      if (Array.isArray(data.ideas)) StorageService.saveIdeas(data.ideas);
      if (Array.isArray(data.scripts)) StorageService.saveScripts(data.scripts);
      if (Array.isArray(data.calendar)) StorageService.saveCalendarTasks(data.calendar);
      if (Array.isArray(data.challenges)) StorageService.saveChallenges(data.challenges);
      if (Array.isArray(data.achievements)) StorageService.saveAchievements(data.achievements);
      if (data.profile) StorageService.saveProfile(data.profile);
      if (Array.isArray(data.inbox)) safeSet(KEYS.INBOX, data.inbox);
      if (data.lang) StorageService.setLanguage(data.lang);
      if (data.theme) StorageService.setTheme(data.theme);

      return true;
    } catch (err) {
      console.error('Failed to parse backup JSON:', err);
      return false;
    }
  },

  // Factory Reset
  resetToDefaults: () => {
    safeSet(KEYS.IDEAS, INITIAL_IDEAS);
    safeSet(KEYS.SCRIPTS, []);
    safeSet(KEYS.CALENDAR, INITIAL_CALENDAR_TASKS);
    safeSet(KEYS.CHALLENGES, INITIAL_CHALLENGES);
    safeSet(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    safeSet(KEYS.PROFILE, INITIAL_PROFILE);
    safeSet(KEYS.INBOX, []);
    safeSet(KEYS.ONBOARDING, false);
  },
};
