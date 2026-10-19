export type Language = 'uz' | 'ru' | 'en';
export type Theme = 'dark' | 'light';

export type NavSection = 
  | 'home' 
  | 'ideas' 
  | 'scripts' 
  | 'calendar' 
  | 'challenges' 
  | 'studio' 
  | 'about';

export type IdeaCategory = 
  | 'tech_edu' 
  | 'lifestyle' 
  | 'shorts_reels' 
  | 'business' 
  | 'creative' 
  | 'entertainment';

export type IdeaFormat = 'shorts' | 'longform' | 'series';
export type IdeaDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface VideoIdea {
  id: string;
  title: Record<Language, string>;
  hook: Record<Language, string>;
  category: IdeaCategory;
  format: IdeaFormat;
  difficulty: IdeaDifficulty;
  targetAudience: Record<Language, string>;
  keyPoints: Record<Language, string[]>;
  tags: string[];
  isSaved?: boolean;
  isCustom?: boolean;
  createdAt?: string;
}

export interface Script {
  id: string;
  title: string;
  category: string;
  templateId?: string;
  hook: string; // Kirish (0-15s)
  body: string; // Asosiy qism
  cta: string; // Yakun / Call to action
  notes?: string;
  targetDurationSec: number;
  estimatedWords: number;
  updatedAt: string;
}

export interface ScriptTemplate {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  format: string;
  defaultHook: Record<Language, string>;
  defaultBody: Record<Language, string>;
  defaultCta: Record<Language, string>;
}

export type Platform = 'youtube' | 'instagram' | 'tiktok' | 'telegram' | 'linkedin';
export type ContentFormat = 'reel_short' | 'video' | 'post' | 'story' | 'live';
export type TaskStatus = 'planned' | 'scripting' | 'recording' | 'editing' | 'published';

export interface CalendarTask {
  id: string;
  title: string;
  dayOfWeek: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  dateStr: string; // YYYY-MM-DD
  timeStr?: string; // HH:mm
  platform: Platform;
  format: ContentFormat;
  status: TaskStatus;
  completed: boolean;
  associatedScriptId?: string;
  notes?: string;
}

export interface Challenge {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  points: number;
  category: 'creation' | 'learning' | 'growth' | 'consistency';
  completedDate?: string; // YYYY-MM-DD
  isCompleted: boolean;
}

export interface Achievement {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  pointsRequired: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  totalPoints: number;
  streakDays: number;
  lastActiveDate: string;
  completedChallengesHistory: { [dateStr: string]: string[] }; // date -> challengeId[]
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
