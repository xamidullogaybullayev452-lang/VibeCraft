import { VideoIdea, IdeaCategory, IdeaFormat, Language } from '../types';

interface GenerationInput {
  topic: string;
  category: IdeaCategory;
  format: IdeaFormat;
  angle: 'educational' | 'dramatic' | 'secrets' | 'mistakes' | 'transformation';
}

const HOOK_PATTERNS = {
  educational: {
    uz: 'Agar siz [mavzu]ni oson va tez o‘rganmoqchi bo‘lsangiz, ko‘pchilik bilmaydigan mana bu 3 ta asosiy qoidani bilib oling.',
    ru: 'Если вы хотите легко и быстро освоить [mavzu], запомните эти 3 фундаментальных правила, о которых мало кто знает.',
    en: 'If you want to master [mavzu] effortlessly, here are the 3 non-negotiable rules most people overlook.',
  },
  dramatic: {
    uz: 'Hech kim bu haqda ochiq gapirmaydi, lekin [mavzu] bo‘yicha noto‘g‘ri yondashuv oylar davomida vaqtingizni o‘g‘irlaydi!',
    ru: 'Никто не говорит об этом вслух, но ошибка в [mavzu] будет стоить вам месяцев потраченного времени!',
    en: 'Nobody wants to admit this out loud, but your current approach to [mavzu] is quietly sabotaging your results.',
  },
  secrets: {
    uz: 'Tajribali mutaxassislar [mavzu] bo‘yicha nimalarni yashirishadi? Bugun men bu sirni fosh qilaman.',
    ru: 'Что скрывают профессионалы о [mavzu]? Сегодня я раскрою этот закулисный секрет.',
    en: 'What do top practitioners secretly know about [mavzu]? I am revealing the exact framework today.',
  },
  mistakes: {
    uz: '[mavzu] bilan shug‘ullanuvchi 95% odamlar bir xil xatoni takrorlaydi. Buni darhol to‘xtating!',
    ru: '95% людей, пробующих [mavzu], совершают одну и ту же грубейшую ошибку. Прекратите это делать!',
    en: '95% of people trying [mavzu] make this exact critical blunder. Stop doing this right now.',
  },
  transformation: {
    uz: 'Qanday qilib [mavzu] yordamida bor-yo‘g‘i 14 kunda aqlbovar qilmas natijaga erishish mumkin?',
    ru: 'Как с помощью [mavzu] выйти на совершенно новый уровень всего за 14 дней? Вот алгоритм.',
    en: 'How to achieve a dramatic breakthrough in [mavzu] in just 14 days without burning out.',
  },
};

export function generateAlgorithmicIdea(input: GenerationInput): VideoIdea {
  const cleanTopic = input.topic.trim() || 'zamonaviy kontent yaratish';
  const hookTemplate = HOOK_PATTERNS[input.angle] || HOOK_PATTERNS.educational;

  const id = `generated-${Date.now()}`;

  const titleUz = `${cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1)}: 3 ta eng muhim qoida va natija`;
  const titleRu = `${cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1)}: 3 ключевых правила и результат`;
  const titleEn = `${cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1)}: The 3 Core Rules That Deliver Results`;

  const hookUz = hookTemplate.uz.replace('[mavzu]', cleanTopic);
  const hookRu = hookTemplate.ru.replace('[mavzu]', cleanTopic);
  const hookEn = hookTemplate.en.replace('[mavzu]', cleanTopic);

  return {
    id,
    category: input.category,
    format: input.format,
    difficulty: 'beginner',
    tags: [cleanTopic.toLowerCase().replace(/\s+/g, ''), 'creatorlab', 'generator'],
    isCustom: true,
    createdAt: new Date().toISOString(),
    title: {
      uz: titleUz,
      ru: titleRu,
      en: titleEn,
    },
    hook: {
      uz: hookUz,
      ru: hookRu,
      en: hookEn,
    },
    targetAudience: {
      uz: 'Ushbu yo‘nalishda tez natijaga erishmoqchi bo‘lgan yoshlar va blogerlar',
      ru: 'Аудитория, нацеленная на быстрый и качественный результат в этой теме',
      en: 'Ambitious learners aiming for tangible progress in this area',
    },
    keyPoints: {
      uz: [
        '1-nuqta: Asosiy muammoni to‘g‘ri aniqlash va xatoni to‘xtatish',
        '2-nuqta: Amaliy qadamlar va foydali vositalarni ko‘rsatish',
        '3-nuqta: Yakuniy natija va tomoshabinlarga aniq chaqiruv',
      ],
      ru: [
        'Пункт 1: Четкое определение главной проблемы и ее устранение',
        'Пункт 2: Пошаговый практический разбор с показом инструментов',
        'Пункт 3: Наглядный результат и призыв к действию для зрителей',
      ],
      en: [
        'Point 1: Isolate the core friction point and stop bad habits',
        'Point 2: Step-by-step breakdown with actionable tools',
        'Point 3: Demonstration of outcome and high-impact CTA',
      ],
    },
  };
}
