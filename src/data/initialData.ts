import { VideoIdea, ScriptTemplate, Challenge, Achievement, CalendarTask, UserProfile } from '../types';

export const INITIAL_IDEAS: VideoIdea[] = [
  {
    id: 'idea-1',
    category: 'tech_edu',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['dasturlash', 'sun\'iyintellekt', 'foydali'],
    title: {
      uz: 'Har bir talaba bilishi shart bo‘lgan 3 ta bepul AI vositasi',
      ru: '3 бесплатных ИИ-инструмента, о которых должен знать каждый студент',
      en: '3 Free AI Tools Every Student Must Know About',
    },
    hook: {
      uz: 'Ko‘pchilik diplom yoki topshiriq yozishda vaqtini bekorga sarflaydi. Mana bu 3 ta bepul vosita ishingizni 10 barobar tezlashtiradi!',
      ru: 'Большинство тратят часы на курсовые и рефераты. Эти 3 бесплатных инструмента ускорят твою учебу в 10 раз!',
      en: 'Most students waste hours on assignments. These 3 free tools will 10x your study speed!',
    },
    targetAudience: {
      uz: 'O‘quvchilar, universitet talabalari, yosh mutaxassislar',
      ru: 'Школьники, студенты вузов, молодые специалисты',
      en: 'High school & college students, junior learners',
    },
    keyPoints: {
      uz: [
        '1-vosita: Matnlarni tahlil qiluvchi va konspekt tayyorlovchi',
        '2-vosita: Matematik formulalar va masalalarni tushuntirib beruvchi',
        '3-vosita: Prezentatsiyalarni 1 daqiqada tayyorlovchi',
      ],
      ru: [
        'Инструмент 1: Генератор конспектов и кратких выжимок',
        'Инструмент 2: Пошаговый разбор сложных формул и задач',
        'Инструмент 3: Создание стильных презентаций за 1 минуту',
      ],
      en: [
        'Tool 1: Instant textbook summarizer and note maker',
        'Tool 2: Step-by-step math and logic explainer',
        'Tool 3: 60-second aesthetic presentation deck maker',
      ],
    },
  },
  {
    id: 'idea-2',
    category: 'lifestyle',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['motivatsiya', 'vaqt', 'odat'],
    title: {
      uz: 'Ertalab soat 6 da qiynalmasdan uyg‘onish siri (2 daqiqalik qoida)',
      ru: 'Секрет легкого подъема в 6 утра (Правило 2 минут)',
      en: 'How to Wake Up at 6 AM Without Feeling Miserable',
    },
    hook: {
      uz: 'Budilnikni 5 marta kechiktirib turishdan charchadingizmi? Ertalab qanday qilib darhol tetik bo‘lish mumkin?',
      ru: 'Устали переводить будильник по 5 раз каждое утро? Вот как сразу проснуться бодрым!',
      en: 'Tired of hitting snooze 5 times every morning? Here is how to wake up refreshed immediately!',
    },
    targetAudience: {
      uz: 'Ertalab uyg‘onishga qiynaladigan barcha yoshlar',
      ru: 'Все, кто с трудом встает по утрам',
      en: 'Students and night owls wanting a better routine',
    },
    keyPoints: {
      uz: [
        'Telefonni karavotdan kamida 3 metr uzoqqa qo‘yish',
        'Uyg‘oniboq 1 stakan iliq suv ichish',
        'Xonaga darhol tabiiy yorug‘lik kiritish',
      ],
      ru: [
        'Телефон в 3 метрах от кровати с вечера',
        'Стакан теплой воды сразу после звонка',
        'Яркий свет и проветривание в первые 60 секунд',
      ],
      en: [
        'Place phone 10 feet away across the room',
        'Drink a full glass of water immediately',
        'Open curtains to trigger natural cortisol wake signal',
      ],
    },
  },
  {
    id: 'idea-3',
    category: 'tech_edu',
    format: 'longform',
    difficulty: 'intermediate',
    tags: ['python', 'dasturlash', 'kurs'],
    title: {
      uz: '0 dan Python: 1 soatda birinchi dasturingizni yozing',
      ru: 'Python с нуля: создаем первую программу за 1 час',
      en: 'Python for Total Beginners: Build Your First App in 1 Hour',
    },
    hook: {
      uz: 'Dasturlash qiyin deb o‘ylaysizmi? Bugun hech qanday qiyin formulalarsiz o‘zingizning birinchi botingizni yaratasiz!',
      ru: 'Думаете, что программирование — это слишком сложно? За этот час вы с нуля напишете своего первого Telegram-бота!',
      en: 'Think coding is only for math geniuses? By the end of this video, you will have built your first functional bot!',
    },
    targetAudience: {
      uz: 'IT sohasiga endi kirib kelayotgan o‘quvchilar va talabalar',
      ru: 'Начинающие изучать IT и программирование',
      en: 'Curious beginners interested in tech and coding',
    },
    keyPoints: {
      uz: [
        'O‘rnatish: Python va VS Code 5 daqiqada',
        'O‘zgaruvchilar va shartlar oddiy hayotiy misollarda',
        'Haqiqiy loyiha: O‘yin yoki Telegram bot',
      ],
      ru: [
        'Быстрая установка Python и VS Code',
        'Переменные и условия на понятных примерах из жизни',
        'Мини-проект: викторина или Telegram-бот',
      ],
      en: [
        'Zero-friction install: Python + VS Code in 5 mins',
        'Variables and logic using real-world analogies',
        'Hands-on mini-project: interactive quiz bot',
      ],
    },
  },
  {
    id: 'idea-4',
    category: 'shorts_reels',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['reels', 'algoritm', 'kreator'],
    title: {
      uz: 'Reels videongiz 500 ta ko‘rishdan oshmayaptimi? Boshidagi 1 ta xato!',
      ru: 'Твои рилсы не набирают больше 500 просмотров? Вот главная ошибка!',
      en: 'Why Your Reels Are Stuck at 500 Views (And The 1 Fix)',
    },
    hook: {
      uz: 'Videongiz qanchalik sifatli bo‘lmasin, agar birinchi 2 soniyada mana bu xatoni qilsangiz, hech kim ko‘rmaydi!',
      ru: 'Каким бы крутым ни был контент, если в первые 2 секунды ты делаешь это — алгоритм убьет ролик!',
      en: 'No matter how great your editing is, if you do this in the first 2 seconds, the algorithm kills it.',
    },
    targetAudience: {
      uz: 'Instagram va TikTokda yangi kanal ochgan blogerlar',
      ru: 'Новички в Instagram Reels и TikTok',
      en: 'Creators struggling with low view counts',
    },
    keyPoints: {
      uz: [
        'Statik boshlanish o‘rniga vizual harakat (zoom, imo-ishora)',
        'Salomlashish va tanishtirishni butunlay olib tashlash',
        'Ekranga darhol qiziqtiruvchi matn sarlavhasini chiqarish',
      ],
      ru: [
        'Убрать затянутые приветствия — сразу к сути',
        'Добавить визуальное движение в первые 0.5 секунды',
        'Крупный заголовок с интригой прямо по центру',
      ],
      en: [
        'Cut boring greetings—deliver the punchline right away',
        'Add physical motion in the first 0.5 seconds (zoom or cut)',
        'Bold, high-contrast hook text on the thumbnail frame',
      ],
    },
  },
  {
    id: 'idea-5',
    category: 'business',
    format: 'shorts',
    difficulty: 'intermediate',
    tags: ['freelance', 'daromad', 'yoshlar'],
    title: {
      uz: 'Talaba uyda o‘tirib daromad topishi mumkin bo‘lgan 3 ta kasb',
      ru: '3 профессии, на которых студент может зарабатывать удаленно',
      en: '3 Remote Skills Students Can Monetize from Their Bedroom',
    },
    hook: {
      uz: 'Diplom kutmasdan, talabalik davridayoq oyiga 300-500$ topish iloji bormi? Mana 3 ta real soha!',
      ru: 'Можно ли зарабатывать $300-$500 еще учась в вузе? Да, вот 3 навыка с реальным спросом!',
      en: 'Can you make $300-$500/month while still in school? Here are 3 proven skills.',
    },
    targetAudience: {
      uz: 'Mustaqil moliyaviy daromad istovchi talaba va yoshlar',
      ru: 'Студенты, ищущие подработку онлайн',
      en: 'Youth looking to earn freelance income',
    },
    keyPoints: {
      uz: [
        'Qisqa videolar montaji (CapCut / Premiere Pro)',
        'Telegram kanallar uchun dizayn va kontent-menejment',
        'AI promptlar yozish va matn tahriri',
      ],
      ru: [
        'Монтаж вертикальных видео (CapCut/Premiere)',
        'Ведение и оформление Telegram-каналов',
        'Копирайтинг и промпт-инжиниринг с нейросетями',
      ],
      en: [
        'Short-form video editing (CapCut / Premiere)',
        'Content management & design for local businesses',
        'AI copywriting & workflow automation assistance',
      ],
    },
  },
  {
    id: 'idea-6',
    category: 'creative',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['telefon', 'videomontaj', 'sifat'],
    title: {
      uz: 'Oddiy telefon kamerasida kino effekti: 3 ta yashirin sozlama',
      ru: 'Киношная картинка на обычный смартфон: 3 скрытые настройки',
      en: 'Make Cheap Phone Video Look Cinematic: 3 Hidden Settings',
    },
    hook: {
      uz: 'Qimmat kamera shart emas! Telefoningizda mana bu 3 ta sozlamani yoqsangiz, video sifati darhol 2 barobar oshadi.',
      ru: 'Дорогая камера не нужна! Включи эти 3 настройки в своем телефоне, и видео будет выглядеть как фильм.',
      en: 'You do not need a $2000 camera! Toggle these 3 camera settings for an instant cinematic upgrade.',
    },
    targetAudience: {
      uz: 'Telefonda video oluvchi yosh ijodkorlar',
      ru: 'Мобильные видеографы и контент-мейкеры',
      en: 'Mobile creators filming on budget smartphones',
    },
    keyPoints: {
      uz: [
        'Kamera linzasini kiyim bilan emas, mikrofibra bilan tozalash',
        'Ekspozitsiyani biroz pasaytirib qulflash (AE/AF Lock)',
        '4K 24fps yoki 60fps rejimini to‘g‘ri tanlash',
      ],
      ru: [
        'Всегда протирать линзу перед каждым дублем',
        'Блокировка экспозиции со снижением яркости на 15%',
        'Съемка в 24fps для естественного киношного размытия',
      ],
      en: [
        'Wipe camera lens clean every single take',
        'Lock focus & lower exposure by 15% to avoid blown highlights',
        'Shoot at 24fps for natural cinematic motion blur',
      ],
    },
  },
  {
    id: 'idea-7',
    category: 'entertainment',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['psixologiya', 'faktlar', 'qiziqarli'],
    title: {
      uz: 'Miyangiz sizni aldashi: 90% odam bilmaydigan 1 ta psixologik fakt',
      ru: 'Как мозг обманывает тебя: 1 факт, о котором не знают 90% людей',
      en: 'The Brain Trick 90% of People Fall For Every Single Day',
    },
    hook: {
      uz: 'Hozir men sizga beradigan oddiy savolga siz 100% noto‘g‘ri javob berasiz deb garov bog‘layman!',
      ru: 'Спорим, прямо сейчас вы ответите неправильно на этот простейший вопрос?',
      en: 'I bet you will get this seemingly simple question completely wrong within 3 seconds!',
    },
    targetAudience: {
      uz: 'Keng ommaviy auditoriya, qiziqarli faktlar muxlislari',
      ru: 'Широкая аудитория, любители психологии и фактов',
      en: 'Curious mass audience, psychology enthusiasts',
    },
    keyPoints: {
      uz: [
        'Savol orqali tomoshabin diqqatini zudlik bilan jalb qilish',
        'Kutilmagan ilmiy javobni ko‘rsatish',
        'Izohlarda "Siz nima deb o‘yladingiz?" deb bahs uyg‘otish',
      ],
      ru: [
        'Интерактивная загадка с первых секунд',
        'Научное объяснение когнитивной ошибки',
        'Призыв написать свой ответ в комментариях',
      ],
      en: [
        'Interactive riddle right in the opening frame',
        'Explain the cognitive bias in under 20 seconds',
        'Comment bait: Ask viewers if they got fooled',
      ],
    },
  },
  {
    id: 'idea-8',
    category: 'tech_edu',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['ingliztili', 'ta\'lim', 'metod'],
    title: {
      uz: 'Ingliz tilida gapirishdan qo‘rqishni 7 kunda yo‘qotish usuli',
      ru: 'Как перестать бояться говорить на английском за 7 дней',
      en: 'How to Speak Fluent English Confidently in 7 Days',
    },
    hook: {
      uz: 'Qoidalarni bilasiz, ammo chet ellikni ko‘rsangiz tildan qolasizmi? Mana bu usul nutqingizni ochadi!',
      ru: 'Грамматику знаешь, но когда нужно сказать фразу — ступор? Вот метод разрушения языкового барьера!',
      en: 'Know the grammar rules but freeze up when speaking? Here is the shadow speaking technique.',
    },
    targetAudience: {
      uz: 'Ingliz tilini o‘rganayotgan barcha o‘quvchilar',
      ru: 'Все, кто учит иностранные языки',
      en: 'Language learners seeking conversational confidence',
    },
    keyPoints: {
      uz: [
        'Shadowing usuli: film qahramoni orqasidan takrorlash',
        'O‘z ovozini diktofon orqali yozib eshitish',
        'Xato qilishdan uyalmaslik psixologiyasi',
      ],
      ru: [
        'Техника Shadowing: повтор за носителем фраза в фразу',
        'Запись себя на диктофон по 2 минуты в день',
        'Смена фокуса с идеальности на понятность',
      ],
      en: [
        'Shadowing technique: mimic native podcast audio',
        'Record 2-minute voice notes to yourself daily',
        'Focus on communication over grammatical perfection',
      ],
    },
  },
  {
    id: 'idea-9',
    category: 'business',
    format: 'longform',
    difficulty: 'advanced',
    tags: ['youtube', 'monetizatsiya', 'strategiya'],
    title: {
      uz: '0 dan YouTube kanal ochish: To‘liq bosqichma-bosqich qo‘llanma',
      ru: 'YouTube-канал с нуля: полное пошаговое руководство для новичка',
      en: 'Start a YouTube Channel from Zero: Step-by-Step Blueprint',
    },
    hook: {
      uz: '2026-yilda YouTube kanal ochishga kech emasmi? Aksincha, agar mana bu nishani tanlasangiz, 3 oyda 10 000 obunachi to‘plash mumkin!',
      ru: 'Поздно ли начинать на YouTube в 2026 году? Нет, если вы выберете правильную нишу по этой инструкции!',
      en: 'Is it too late to start YouTube in 2026? Not if you follow this niche validation roadmap.',
    },
    targetAudience: {
      uz: 'Jiddiy YouTube loyiha boshlamoqchi bo‘lgan ijodkorlar',
      ru: 'Авторы, планирующие долгосрочный YouTube-проект',
      en: 'Aspiring creators planning serious channel growth',
    },
    keyPoints: {
      uz: [
        'Nisha va auditoriyani to‘g‘ri tanlash',
        'Minimal byudjet bilan uskunalar (mikrofon, yorug‘lik)',
        'Muqova (thumbnail) va sarlavha formulasini tuzish',
      ],
      ru: [
        'Выбор ненасыщенной ниши с высоким спросом',
        'Минимальный сетап: свет за $15 и бюджетный микрофон',
        'Формула кликабельной обложки и завлекающего заголовка',
      ],
      en: [
        'Validating profitable, low-competition niches',
        'Minimum viable gear: $20 clip mic and window light',
        'CTR mastery: Thumbnail concepts before filming',
      ],
    },
  },
  {
    id: 'idea-10',
    category: 'creative',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['dizayn', 'canva', 'fotorasm'],
    title: {
      uz: 'Videongizga bosishlarini ta\'minlovchi 1 ta vizual qoida (CTR 15%+)',
      ru: 'Правило обложки, которое дает CTR выше 15%',
      en: 'The 1 Thumbnail Rule That Guarantees 15%+ CTR',
    },
    hook: {
      uz: 'Sizning videongizni odamlar ko‘rmay o‘tib ketishining 1-raqamli sababi — zerikarli muqovadir. Mana buni o‘zgartiring!',
      ru: 'Главная причина, почему ваши видео пролистывают — тусклая обложка. Вот как ее исправить за 2 минуты!',
      en: 'The number one reason nobody clicks your video is a muddy thumbnail. Fix this today!',
    },
    targetAudience: {
      uz: 'Thumbnail va poster yaratuvchi blogerlar',
      ru: 'Блогеры и дизайнеры обложек',
      en: 'Creators striving for higher click-through rates',
    },
    keyPoints: {
      uz: [
        'Yuzdagi aniq emotsiya (hayrat, tabassum, jiddiylik)',
        '3 tadan ortiq so‘z yozmaslik',
        'Fon va obyekt o‘rtasidagi kuchli rang kontrasti',
      ],
      ru: [
        'Выразительная эмоция на лице крупным планом',
        'Максимум 3 слова на обложке',
        'Высокий цветовой контраст объекта и фона',
      ],
      en: [
        'Exaggerated facial expression (wonder, skepticism)',
        'Strict 3-word rule for overlay copy',
        'Extreme foreground-to-background color separation',
      ],
    },
  },
  {
    id: 'idea-11',
    category: 'tech_edu',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['excel', 'ish', 'lifehack'],
    title: {
      uz: 'Excelda 2 soatlik ishni 5 soniyada qiladigan klaviatura kombinatsiyasi',
      ru: 'Комбинация клавиш в Excel, которая делает 2 часа работы за 5 секунд',
      en: 'The Excel Keyboard Shortcut That Saves 2 Hours of Boring Work',
    },
    hook: {
      uz: 'Qo‘lda minglab qatorlarni ko‘chirib vaqt o‘tkazmang! Mana bu tugmalar kombinatsiyasini bilib oling.',
      ru: 'Хватит вручную перебивать сотни строк! Эта комбинация клавиш спасет твой вечер.',
      en: 'Stop manually retyping thousands of rows! This flash shortcut does it in 5 seconds.',
    },
    targetAudience: {
      uz: 'Ofis xodimlari, talabalar, buxgalterlar',
      ru: 'Студенты и офисные работники',
      en: 'Students and office workers using spreadsheets',
    },
    keyPoints: {
      uz: ['Flash Fill (Ctrl + E) imkoniyatini ko‘rsatish', 'Amaliy misol: Ism va familiyani ajratish'],
      ru: ['Демонстрация функции Flash Fill (Ctrl + E)', 'Практический пример: разделение ФИО'],
      en: ['Demonstrate Flash Fill (Ctrl + E)', 'Real use case: splitting names and emails'],
    },
  },
  {
    id: 'idea-12',
    category: 'lifestyle',
    format: 'longform',
    difficulty: 'intermediate',
    tags: ['kundalik', 'vlog', 'reja'],
    title: {
      uz: 'Talabaning 1 kuni: Darslar, sport, blog va freelance qanday ulguriladi?',
      ru: 'Один день студента: как успевать учебу, спорт, блог и фриланс?',
      en: 'Day in the Life of a Student Creator: Juggling Exams, Gym & YouTube',
    },
    hook: {
      uz: 'Hamma aytadi: "Mening vaqtim yo‘q". Bugun men sizga bir kunda qanday qilib 4 ta sohani birga olib borishimni ko‘rsataman!',
      ru: 'Все жалуются на нехватку времени. В этом влоге я покажу реальную систему планирования на весь день!',
      en: 'Everyone complains about lack of time. Here is the realistic schedule I use to balance everything.',
    },
    targetAudience: {
      uz: 'Vaqt boshqaruvini o‘rganmoqchi bo‘lgan yoshlar',
      ru: 'Молодежь, стремящаяся к балансу и продуктивности',
      en: 'Overwhelmed students seeking productive routine inspiration',
    },
    keyPoints: {
      uz: [
        'Vaqt bloklash (Time-blocking) usuli',
        'Chalg‘ituvchi omillarni (ijtimoiy tarmoqlar) cheklash',
        'Kechki dam olish va ertangi kun rejasi',
      ],
      ru: [
        'Метод тайм-блокинга в Google Календаре',
        'Цифровой детокс во время глубокой работы',
        'Вечерняя подготовка к следующему дню',
      ],
      en: [
        'Time-blocking routine in calendar',
        'Focus modes to silence social media notifications',
        'Evening reset for a stress-free tomorrow',
      ],
    },
  },
  {
    id: 'idea-13',
    category: 'shorts_reels',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['ovoz', 'mikrofon', 'sifat'],
    title: {
      uz: 'Video ovozini professional studiyadek qilish (Bepul usul)',
      ru: 'Как сделать звук как из студии бесплатно за 1 клик',
      en: 'How to Get Studio-Quality Audio on Any Cheap Mic (100% Free)',
    },
    hook: {
      uz: 'Tomoshabin yomon sifatli videoni kechirishi mumkin, ammo yomon ovozli videodan 1 soniyada chiqib ketadi!',
      ru: 'Зритель может простить плохую картинку, но отвратительный звук заставит его закрыть ролик мгновенно!',
      en: 'Viewers will forgive average video quality, but bad audio makes them click off immediately.',
    },
    targetAudience: {
      uz: 'Mikrofonida shovqin ko‘p bo‘lgan yangi blogerlar',
      ru: 'Авторы с фоновым шумом и эхом в видео',
      en: 'Creators struggling with room echo and hiss',
    },
    keyPoints: {
      uz: [
        'Adobe Podcast AI vositasidan foydalanish',
        'Oldin va keyin holatini taqqoslash',
        'Mikrofonni og‘izga to‘g‘ri yaqinlashtirish burchagi',
      ],
      ru: [
        'Использование бесплатного AI-энхансера звука',
        'Наглядное сравнение «До» и «После»',
        'Правильное расстояние микрофона от рта',
      ],
      en: [
        'Free AI speech enhancement showcase',
        'Before vs After audio test comparison',
        'Correct mic capsule distance and wind muff tip',
      ],
    },
  },
  {
    id: 'idea-14',
    category: 'entertainment',
    format: 'shorts',
    difficulty: 'intermediate',
    tags: ['tajriba', 'challenge', 'qiziq'],
    title: {
      uz: 'Men 7 kun davomida faqat suv ichdim (Natijasi hayratlanarli)',
      ru: 'Я пил только воду 7 дней подряд (Вот что произошло)',
      en: 'I Drank 3 Liters of Water Daily for 7 Days (Shocking Results)',
    },
    hook: {
      uz: 'Agar 7 kun davomida barcha gazli ichimliklarni to‘xtatib faqat suv ichsangiz, tanangizda nima o‘zgaradi?',
      ru: 'Что случится с вашим телом и кожей, если на 7 дней полностью отказаться от сладких напитков?',
      en: 'What actually happens to your body and focus if you quit soda and drink 3L water for a week?',
    },
    targetAudience: {
      uz: 'Sog‘lom turmush tarzi va tajribalarga qiziquvchilar',
      ru: 'Любители челленджей и заботы о здоровье',
      en: 'Health experimenters and self-improvement lovers',
    },
    keyPoints: {
      uz: [
        '1-3 kun: Bosh og‘rig‘i va shakar xohishi',
        '4-7 kun: Terining tozalanishi va energiya ko‘payishi',
        'Xulosa va tomoshabinlarga savol',
      ],
      ru: [
        'Дни 1-3: Сахарная ломка и привычка перекусывать',
        'Дни 4-7: Рост энергии и чистая кожа',
        'Вывод и призыв попробовать вместе',
      ],
      en: [
        'Days 1-3: Sugar cravings and hydration adjustments',
        'Days 4-7: Surprising mental clarity and stamina',
        'Key takeaway: Simple habit, massive payoff',
      ],
    },
  },
  {
    id: 'idea-15',
    category: 'business',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['kitob', 'rivojlanish', 'biznes'],
    title: {
      uz: 'Menga 10 ta universitet bera olmagan ilmni bergan 1 ta kitob',
      ru: 'Книга, которая заменила мне 4 года в университете',
      en: 'The 1 Book That Taught Me More Than 4 Years of College',
    },
    hook: {
      uz: 'Agar butun umringiz davomida faqat 1 ta kitob o‘qish imkoniyati berilsa, mana buni tanlang!',
      ru: 'Если бы мне разрешили прочитать за всю жизнь только одну бизнес-книгу, я бы выбрал именно ее!',
      en: 'If you only have time to read one book this entire year, make it this one.',
    },
    targetAudience: {
      uz: 'Shaxsiy rivojlanish va kitobxon yoshlar',
      ru: 'Люди, нацеленные на самообразование и карьеру',
      en: 'Ambitious self-taught learners and entrepreneurs',
    },
    keyPoints: {
      uz: [
        'Kitobdagi eng muhim 3 ta g‘oya',
        'Ushbu qoidani bugun qanday qo‘llash mumkin?',
        'Izohlarda o‘z sevimli kitobingizni yozing',
      ],
      ru: [
        '3 фундаментальные идеи из книги',
        'Как применить главное правило уже сегодня',
        'Вопрос к зрителям: какая книга изменила вас?',
      ],
      en: [
        'Top 3 transformative concepts from the book',
        'One immediate action step to apply today',
        'Call to action: Share your all-time favorite read below',
      ],
    },
  },
  {
    id: 'idea-16',
    category: 'creative',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['hook', 'matn', 'ssenariy'],
    title: {
      uz: 'Har qanday videoni tomosha qildirish uchun 3 ta "Sehrli" so‘z',
      ru: '3 «магических» слова, которые удержат зрителя на вашем видео',
      en: '3 Power Words That Force Viewers to Keep Watching',
    },
    hook: {
      uz: 'Matningizda bu 3 ta so‘z bo‘lsa, odamlar hatto xohlamasa ham oxirigacha eshitishga majbur bo‘ladi!',
      ru: 'Используйте эти три психологических триггера, и удержание вашего видео взлетит до 85%!',
      en: 'Add these 3 psychological trigger words to your opening sentence to skyrocket retention.',
    },
    targetAudience: {
      uz: 'Kopirayterlar, reels mualliflari, blogerlar',
      ru: 'Копирайтеры, авторы рилсов, блогеры',
      en: 'Scriptwriters, content marketers, video creators',
    },
    keyPoints: {
      uz: [
        '1-so‘z: "Chunki..." (sabab-oqibat psixologiyasi)',
        '2-so‘z: "Tasavvur qiling..." (vizualizatsiya)',
        '3-so‘z: "Siri shundaki..." (sir va qiziqish)',
      ],
      ru: [
        'Слово 1: «Потому что...» (триггер обоснованности)',
        'Слово 2: «Представь...» (включение воображения)',
        'Слово 3: «Секрет в том...» (тяга к интриге)',
      ],
      en: [
        'Trigger 1: "Because..." (psychological justification)',
        'Trigger 2: "Imagine..." (active visualization)',
        'Trigger 3: "The truth is..." (revelation hook)',
      ],
    },
  },
  {
    id: 'idea-17',
    category: 'tech_edu',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['xavfsizlik', 'parol', 'kiber'],
    title: {
      uz: 'Telegram va Instagram profilingizni buzib kirishdan saqlaydigan 1 daqiqalik amal',
      ru: 'Защити свой Telegram и Instagram от взлома за 1 минуту',
      en: 'Secure Your Telegram and Instagram Accounts in Under 60 Seconds',
    },
    hook: {
      uz: 'Ertaga ertalab hisobingiz o‘g‘irlanganini ko‘rishni istamasangiz, hoziroq mana bu bitta funksiyani yoqing!',
      ru: 'Не хочешь однажды проснуться и увидеть, что твой аккаунт угнали? Включи это прямо сейчас!',
      en: 'Do not wait until someone hacks your account. Turn on this one privacy shield right now.',
    },
    targetAudience: {
      uz: 'Barcha ijtimoiy tarmoq foydalanuvchilari',
      ru: 'Все активные пользователи мессенджеров',
      en: 'Anyone with social media and messaging apps',
    },
    keyPoints: {
      uz: [
        'Ikki bosqichli autentifikatsiya (2FA) bulutli paroli',
        'Faol seanslarni (Active Sessions) tekshirish va begonalarni o‘chirish',
        'Shubhali havolalarga hech qachon kirmaslik',
      ],
      ru: [
        'Включение двухфакторной аутентификации (2FA)',
        'Проверка списка активных сессий устройств',
        'Как распознать фишинговые ссылки от «друзей»',
      ],
      en: [
        'Enable Two-Factor Authentication with cloud password',
        'Audit active login devices and terminate unrecognized sessions',
        'Recognize deceptive phishing links',
      ],
    },
  },
  {
    id: 'idea-18',
    category: 'lifestyle',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['telefon', 'odamlar', 'vaqt'],
    title: {
      uz: 'Telefon ekraniga kuniga 6 soat sarflayapsizmi? 3 ta oson yechim',
      ru: 'Проводишь в телефоне по 6 часов в день? 3 простых шага к свободе',
      en: 'Screen Time Over 5 Hours? 3 Practical Ways to Break Phone Addiction',
    },
    hook: {
      uz: 'Umringizning uchdan bir qismi telefon ekraniga tikilib o‘tayotganini bilarmidingiz? Mana qanday qilib vaqtingizni qaytarish mumkin.',
      ru: 'Вы знали, что мы отдаем экрану смартфона треть сознательной жизни? Вот как вернуть контроль.',
      en: 'Did you know the average person spends 30% of their waking life staring at screens? Reclaim your hours.',
    },
    targetAudience: {
      uz: 'Doimiy chalg‘iydigan o‘quvchilar va yoshlar',
      ru: 'Люди, страдающие от постоянного думскроллинга',
      en: 'Students battling doom-scrolling and digital fatigue',
    },
    keyPoints: {
      uz: [
        'Ekran rangini qora-oq (Greyscale) rejimiga o‘tkazish',
        'Barcha keraksiz bildirishnomalarni (notification) o‘chirish',
        'Dars yoki ish vaqtida telefonni boshqa xonaga qo‘yish',
      ],
      ru: [
        'Черно-белый режим экрана (снимает дофаминовую тягу)',
        'Отключение всех уведомлений, кроме личных звонков',
        'Правило «Телефон в другой комнате во время учебы»',
      ],
      en: [
        'Switch display to greyscale mode to kill dopamine spikes',
        'Mute all non-essential push notifications',
        'Physical distance: Keep phone in another room during study',
      ],
    },
  },
  {
    id: 'idea-19',
    category: 'creative',
    format: 'shorts',
    difficulty: 'intermediate',
    tags: ['kamera', 'uyalish', 'nutq'],
    title: {
      uz: 'Kamera oldida erkin gapirish siri (Uyalishni yengish mashqi)',
      ru: 'Как перестать бояться камеры: простое упражнение для уверенности',
      en: 'Overcome Camera Shyness: The 3-Minute Mirror Drill',
    },
    hook: {
      uz: 'Kamerani yoqqanda tildan qolib, so‘z topolmay qolasizmi? Men ham shunday edim. Mana bu 1 ta mashq hammasini o‘zgartirdi!',
      ru: 'Включаете запись и моментально забываете слова? Вот упражнение, которое превратит страх в уверенность.',
      en: 'Freeze the moment the red recording light turns on? Here is the exact exercise that helped me speak effortlessly.',
    },
    targetAudience: {
      uz: 'Kamera oldida o‘zini noqulay his qiluvchi boshlovchilar',
      ru: 'Начинающие спикеры и авторы',
      en: 'First-time vloggers struggling with speaking naturally',
    },
    keyPoints: {
      uz: [
        'Kamerani buyum emas, eng yaqin do‘stingiz deb tasavvur qiling',
        'Kuniga 2 daqiqa o‘chirib yuborish sharti bilan video olib mashq qiling',
        'Xatolarga kulib qo‘yish va to‘xtamasdan davom etish',
      ],
      ru: [
        'Смотрите в объектив, представляя лучшего друга',
        'Снимайте по 2 минуты «в корзину» без публикации',
        'Не удаляйте дубли из-за оговорок — улыбнитесь и продолжайте',
      ],
      en: [
        'Look directly into the lens and talk as if chatting with your best friend',
        'Shoot daily 2-minute clips that you promise to delete afterwards',
        'Laugh at fumbles and keep going without stopping the take',
      ],
    },
  },
  {
    id: 'idea-20',
    category: 'tech_edu',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['dasturchi', 'kompyuter', 'maslahat'],
    title: {
      uz: 'Dasturchilar qanday tez kod yozadi? Emmet va snippetlar siri',
      ru: 'Как программисты пишут код так быстро? Секрет сниппетов Emmet',
      en: 'How Developers Code at 200 WPM: The Magic of Emmet',
    },
    hook: {
      uz: 'Agar siz hali ham HTML kodini har bir harfini qo‘lda yozayotgan bo‘lsangiz, vaqtingizni behuda sarflayapsiz!',
      ru: 'Если вы до сих пор вручную набираете каждый HTML-тег, вы теряете 80% времени!',
      en: 'If you are still typing every single HTML tag letter by letter, you are losing 80% of your coding speed.',
    },
    targetAudience: {
      uz: 'Frontend va veb-dasturlash o‘rganayotgan yoshlar',
      ru: 'Начинающие веб-разработчики',
      en: 'Aspiring web developers and frontend learners',
    },
    keyPoints: {
      uz: [
        '! va Tab tugmasi bilan to‘liq sahifa skeletini chiqarish',
        'div.card>ul>li*5 qisqartmasi bilan 10 qator kodni 1 soniyada yozish',
        'Klaviatura yorliqlarini odatga aylantirish',
      ],
      ru: [
        'Создание каркаса страницы через значок ! и Tab',
        'Магия сокращений: div.card>ul>li*5 разворачивается за 1 секунду',
        'Использование горячих клавиш вместо мыши',
      ],
      en: [
        'Type ! and hit Tab for instant boilerplate',
        'Emmet abbreviations: div.card>ul>li*5 generates clean hierarchy',
        'Keyboard-first flow over mouse clicking',
      ],
    },
  },
  {
    id: 'idea-21',
    category: 'entertainment',
    format: 'shorts',
    difficulty: 'beginner',
    tags: ['oyin', 'tarix', 'qiziq'],
    title: {
      uz: 'Minecraft haqida 99% o‘yinchilar bilmaydigan eng g‘alati sir',
      ru: 'Самая странная тайна Minecraft, о которой не знают 99% игроков',
      en: 'The Weirdest Minecraft Secret 99% of Players Still Do Not Know',
    },
    hook: {
      uz: 'Siz bu o‘yinni yillab o‘ynagan bo‘lishingiz mumkin, ammo Creeper qanday paydo bo‘lganini bilasizmi?',
      ru: 'Вы могли наиграть тысячи часов, но знаете ли вы, что крипер появился из-за нелепой ошибки разработчика?',
      en: 'You might have played for years, but do you know the Creeper was created by a coding mistake?',
    },
    targetAudience: {
      uz: 'Geymerlar, maktab o‘quvchilari va o‘yin ixlosmandlari',
      ru: 'Геймеры, школьники и фанаты видеоигр',
      en: 'Gamers, students, and pop-culture fans',
    },
    keyPoints: {
      uz: [
        'Notch cho‘chqa modelini yasashda uzunlik va balandlikni adashtirib qo‘ygan',
        'Xato o‘rniga yangi yirtqich yaratilgan',
        'Savol: O‘yindagi sizning sevimli siringiz qaysi?',
      ],
      ru: [
        'Нотч случайно перепутал высоту и ширину модели свиньи',
        'Баг превратили в самого узнаваемого монстра',
        'Призыв написать в комментариях свой любимый факт',
      ],
      en: [
        'Notch swapped height and length variables while coding a pig model',
        'The developer embraced the glitch and birthed the Creeper',
        'CTA: What is your favorite gaming easter egg?',
      ],
    },
  },
];

export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: 'tmpl-viral-hook',
    format: 'Shorts & Reels (30-60s)',
    title: {
      uz: '30-soniyalik Viral Hook (Qisqa video)',
      ru: '30-секундный вирусный хук (Shorts / Reels)',
      en: '30-Second Viral Hook (Shorts & Reels)',
    },
    description: {
      uz: 'Dastlabki 3 soniyada qiziqtiruvchi ziddiyat yoki paradoks, 3 ta tezkor fakt va kuchli chaqiruv.',
      ru: 'Интригующее противоречие в первые 3 секунды, 3 быстрых факта и энергичный призыв.',
      en: 'High-energy paradoxical hook in 3 seconds, 3 punchy points, and high-retention outro.',
    },
    defaultHook: {
      uz: 'Hech kim sizga buni aytmaydi, lekin ko‘pchilik har kuni [Mavzu] bo‘yicha katta xatoga yo‘l qo‘yadi. Buni hoziroq to‘xtating!',
      ru: 'Вам никто об этом не расскажет, но 90% людей совершают эту ошибку в [Тема] каждый день. Вот как это исправить!',
      en: 'Nobody tells you this, but most people are making a massive mistake with [Topic] every single day. Here is what to do instead.',
    },
    defaultBody: {
      uz: 'Birinchidan: ...\nIkkinchidan: ...\nUchinchidan: eng muhimi — ...',
      ru: 'Во-первых: ...\nВо-вторых: ...\nИ в-третьих, самое главное: ...',
      en: 'First: ...\nSecond: ...\nAnd third, the most crucial part: ...',
    },
    defaultCta: {
      uz: 'Agar ushbu maslahat foydali bo‘lsa, keyingi qismni o‘tkazib yubormaslik uchun obuna bo‘ling va videoni saqlab qo‘ying!',
      ru: 'Если было полезно — сохрани ролик в закладки и подпишись, чтобы не пропустить вторую часть!',
      en: 'Save this video before you forget, and follow for part two dropping tomorrow!',
    },
  },
  {
    id: 'tmpl-how-to',
    format: 'Tutorial & How-To (60-120s)',
    title: {
      uz: 'Qadamma-qadam Yo‘riqnoma (How-To)',
      ru: 'Пошаговая инструкция (How-To)',
      en: 'Step-by-Step Tutorial (How-To)',
    },
    description: {
      uz: 'Muammoni aniqlash, 3 ta oson qadamda yechish va natijani ko‘rsatish.',
      ru: 'Формулировка проблемы, решение в 3 простых шага и наглядный результат.',
      en: 'Clear problem identification, 3 friction-free steps, and concrete result preview.',
    },
    defaultHook: {
      uz: '[Muammo]dan charchadingizmi? Men ham shunday edim, to mana bu 3 ta qadamni o‘rganmagunimcha. Keling, 1 daqiqada hal qilamiz!',
      ru: 'Устали бороться с [Проблема]? Я тоже был в тупике, пока не внедрил эти 3 простых шага. Разберем за 1 минуту!',
      en: 'Struggling with [Problem]? I was stuck too until I discovered this 3-step blueprint. Let\'s fix it in 60 seconds.',
    },
    defaultBody: {
      uz: '1-qadam: Dastlab [vosita yoki amal]ni bajaring...\n2-qadam: So‘ng mana bu sozlamani o‘zgartiring...\n3-qadam: Va nihoyat, natijani tekshiring...',
      ru: 'Шаг 1: Сначала откройте [инструмент] и настройте...\nШаг 2: Затем измените следующий параметр...\nШаг 3: Проверьте результат...',
      en: 'Step 1: Open [tool] and set up...\nStep 2: Adjust this key setting...\nStep 3: Test and verify the instant output...',
    },
    defaultCta: {
      uz: 'O‘zingiz sinab ko‘ring va natijangizni izohlarda yozib qoldiring. Savollaringiz bormi?',
      ru: 'Попробуй сам и напиши свой результат в комментариях. Есть вопросы? Отвечу каждому!',
      en: 'Give it a try and drop your result in the comments. Have questions? I reply to everyone!',
    },
  },
  {
    id: 'tmpl-storytelling',
    format: 'Storytelling & Vlog',
    title: {
      uz: 'Shaxsiy hikoya va Tajriba (Storytelling)',
      ru: 'Личная история и опыт (Storytelling)',
      en: 'Personal Story & Transformation',
    },
    description: {
      uz: 'Qiyinchilikdan yutuqqa qadar bo‘lgan samimiy voqea va undan olingan xulosa.',
      ru: 'Искренняя история от поражения к успеху и главный вывод для зрителя.',
      en: 'Authentic failure-to-breakthrough narrative arc and core lesson learned.',
    },
    defaultHook: {
      uz: '1 yil oldin men [Qiyin vaziyat]da edim va hech narsa o‘xshamayotgandek tuyulardi. Ammo bugun hammasi butunlay o‘zgardi.',
      ru: 'Ровно год назад я был в [Сложная ситуация] и казалось, что ничего не получится. Но одно решение изменило всё.',
      en: 'One year ago, I was completely stuck in [Difficult situation]. But one counter-intuitive decision changed everything.',
    },
    defaultBody: {
      uz: 'Barchasi mana bu voqeadan boshlandi... Men duch kelgan asosiy sinov shunday edi... Va men anglagan eng katta saboq...',
      ru: 'Всё началось с того, что... Главная преграда заключалась в... И вот какой фундаментальный урок я вынес...',
      en: 'It all started when... The turning point arrived when... And the lesson that changed my trajectory...',
    },
    defaultCta: {
      uz: 'Sizda ham shunday holat bo‘lganmi? Fikringizni izohlarda kutaman!',
      ru: 'Знакомо такое чувство? Поделись своей историей в комментариях!',
      en: 'Have you ever experienced something similar? Let\'s talk in the comments!',
    },
  },
  {
    id: 'tmpl-myth-busting',
    format: 'Miflar va Haqiqat (Debunking)',
    title: {
      uz: 'Miflar va Haqiqat (Debunking)',
      ru: 'Мифы и Реальность (Разбор заблуждений)',
      en: 'Myth Busters & Reality Check',
    },
    description: {
      uz: 'Ommabop noto‘g‘ri tushunchani fosh qilish va ilmiy/amaliy haqiqatni isbotlash.',
      ru: 'Разоблачение популярного заблуждения и доказательство реального факта.',
      en: 'Shatter a common misconception and deliver empirical proof.',
    },
    defaultHook: {
      uz: 'Internetda sizga aytilayotgan mana bu narsa — 100% yolg‘on! Keling, nima uchunligini isbotlab beraman.',
      ru: 'То, что вам внушают в интернете про [Тема] — абсолютная неправда! Сейчас докажу на фактах.',
      en: 'Almost everything you have heard about [Topic] is completely false. Here is the actual reality.',
    },
    defaultBody: {
      uz: 'Odamlar nima deb o‘ylaydi? "..."\nAslida esa ilmiy tadqiqotlar va tajriba shuni ko‘rsatadiki: ...\nNima uchun bu yolg‘on tarqalgan? Chunki ...',
      ru: 'Что принято считать? «...»\nА что происходит на самом деле: ...\nПочему этот миф так популярен? Потому что ...',
      en: 'What everyone assumes: "..."\nWhat the real data proves: ...\nWhy this myth spread so fast: ...',
    },
    defaultCta: {
      uz: 'Ushbu videoni do‘stingizga yuboring, u ham haqiqatni bilsin!',
      ru: 'Перешли этот ролик другу, который до сих пор верит в этот миф!',
      en: 'Send this to a friend who still believes the myth!',
    },
  },
  {
    id: 'tmpl-top-5',
    format: 'Top Ro‘yxat (Listicle)',
    title: {
      uz: 'Top 5 Tavsiya yoki Xatolar (Listicle)',
      ru: 'Топ-5 Советов или Ошибок (Листикл)',
      en: 'Top 5 Tips / Mistakes (Listicle)',
    },
    description: {
      uz: 'Tomoshabinni oxirigacha ushlab turuvchi 5 ta aniq punkt, oxirgisi eng kutilmagan.',
      ru: '5 четких пунктов с интригой, где последний — самый неожиданный.',
      en: '5 high-value takeaways with the final one being the most surprising.',
    },
    defaultHook: {
      uz: '[Soha]da muvaffaqiyatga erishish uchun ushbu 5 ta narsani bilsangiz kifoya. Ayniqsa 5-bandni ko‘pchilik kutmaydi!',
      ru: '5 главных вещей, которые отделяют любителя от профи в [Сфера]. 5-й пункт вас точно удивит!',
      en: 'The 5 non-negotiables that separate amateurs from pros in [Field]. Number 5 is totally unexpected.',
    },
    defaultBody: {
      uz: '1. ...\n2. ...\n3. ...\n4. ...\n5. Va eng asosiysi: ...',
      ru: '1. ...\n2. ...\n3. ...\n4. ...\n5. И наконец, ключевое правило: ...',
      en: '1. ...\n2. ...\n3. ...\n4. ...\n5. And the grand finale: ...',
    },
    defaultCta: {
      uz: 'Siz uchun eng muhim punkt qaysi biri bo‘ldi? Izohlarda raqamini yozing!',
      ru: 'Какой пункт показался самым ценным? Напиши цифру в комментариях!',
      en: 'Which one resonated most with you? Drop the number in the comments!',
    },
  },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    category: 'creation',
    points: 25,
    isCompleted: false,
    title: {
      uz: 'Bugun 1 ta kuchli Hook yozing',
      ru: 'Напишите 1 цепляющий хук сегодня',
      en: 'Draft 1 Compelling Opening Hook Today',
    },
    description: {
      uz: 'Ssenariy ustaxonasida dastlabki 3 soniyalik savol yoki ziddiyatli jumlani qoralamaga tushiring.',
      ru: 'Сформулируйте интригующую фразу первых трех секунд для своего следующего видео.',
      en: 'Write down a 3-second attention-grabbing opening question in the Script Workshop.',
    },
  },
  {
    id: 'ch-2',
    category: 'growth',
    points: 30,
    isCompleted: false,
    title: {
      uz: 'Raqobatchilardan 3 ta video g‘oyasini tahlil qiling',
      ru: 'Проанализируйте 3 ролика в вашей нише',
      en: 'Analyze 3 Successful Videos in Your Niche',
    },
    description: {
      uz: 'O‘z sohangizdagi eng ko‘p ko‘rilgan 3 ta rolikning nima uchun viral bo‘lganini o‘rganing va 1 ta yangi g‘oya qo‘shing.',
      ru: 'Изучите, почему ролики набрали много просмотров, и запишите инсайты в свои идеи.',
      en: 'Inspect what made them perform well and add your own unique angle to the Ideas Lab.',
    },
  },
  {
    id: 'ch-3',
    category: 'creation',
    points: 35,
    isCompleted: false,
    title: {
      uz: '30 soniyalik test video oling (Qoralama)',
      ru: 'Снимите 30-секундный черновой дубль',
      en: 'Film a 30-Second Practice Take',
    },
    description: {
      uz: 'Hech qayerga yuklamasdan, kameraga qarab 30 soniya erkin gapirib ko‘ring va ovozingizni eshiting.',
      ru: 'Включите камеру и наговорите мысль без публикации — просто для тренировки уверенности.',
      en: 'Turn on the camera and speak freely for 30 seconds just to build camera confidence.',
    },
  },
  {
    id: 'ch-4',
    category: 'consistency',
    points: 20,
    isCompleted: false,
    title: {
      uz: 'Haftalik rejangizga 1 ta yangi vazifa qo‘shing',
      ru: 'Запланируйте 1 задачу в календаре',
      en: 'Schedule 1 Content Item on Your Calendar',
    },
    description: {
      uz: 'Kontent kalendari bo‘limiga kirib, kelgusi haftaning biror kuniga video yoki post rejalashtiring.',
      ru: 'Откройте календарь и поставьте съемку или публикацию на ближайшие дни.',
      en: 'Open the Content Calendar and schedule an upcoming post or video recording slot.',
    },
  },
  {
    id: 'ch-5',
    category: 'learning',
    points: 20,
    isCompleted: false,
    title: {
      uz: 'Videomontaj bo‘yicha 1 ta yangi usulni o‘rganing',
      ru: 'Освойте 1 новый прием видеомонтажа',
      en: 'Learn 1 New Video Editing Technique',
    },
    description: {
      uz: 'J-cut, L-cut, sound effect yoki zoom-in animatsiyasini sinab ko‘ring.',
      ru: 'Попробуйте J-cut, зум или добавление звукового эффекта (SFX) в видео.',
      en: 'Try out a J-cut, subtle zoom-in, or sound design cue in your editing app.',
    },
  },
  {
    id: 'ch-6',
    category: 'growth',
    points: 40,
    isCompleted: false,
    title: {
      uz: 'Auditoriyangizdan 3 ta eng qiziq savolni to‘plang',
      ru: 'Соберите 3 вопроса от вашей аудитории',
      en: 'Gather 3 Questions from Your Community',
    },
    description: {
      uz: 'Do‘stlaringiz yoki obunachilaringiz nima haqida ko‘proq bilmoqchi ekanini so‘rang va buni ssenariyga aylantiring.',
      ru: 'Спросите друзей или подписчиков, о чем им интересно узнать, и добавьте идею.',
      en: 'Ask peers what they are most curious about and turn it into your next script topic.',
    },
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-spark',
    icon: 'Sparkles',
    pointsRequired: 25,
    unlocked: true,
    title: {
      uz: 'Ilk Uchqun',
      ru: 'Первая искра',
      en: 'First Spark',
    },
    description: {
      uz: 'CreatorLab platformasiga ilk qadam qo‘yildi va dastlabki ballar yig‘ildi.',
      ru: 'Сделан первый шаг на платформе CreatorLab и заработаны первые баллы.',
      en: 'Took your first step in CreatorLab and earned initial creator points.',
    },
  },
  {
    id: 'ach-scriptwriter',
    icon: 'PenTool',
    pointsRequired: 75,
    unlocked: false,
    title: {
      uz: 'Ssenariynavis',
      ru: 'Сценарист',
      en: 'Master Scriptwriter',
    },
    description: {
      uz: 'Birinchi to‘liq ssenariyni yozib, studiyangizga saqladingiz.',
      ru: 'Написан и сохранен в студию первый полноценный сценарий.',
      en: 'Wrote and saved a complete structured script to your studio library.',
    },
  },
  {
    id: 'ach-steady-creator',
    icon: 'Flame',
    pointsRequired: 150,
    unlocked: false,
    title: {
      uz: 'Muntazam Ijodkor',
      ru: 'Постоянный автор',
      en: 'Steady Creator',
    },
    description: {
      uz: 'Kunlik vazifalarni bajarib, ketma-ket 3 kunlik faollik seriyasiga erishdingiz.',
      ru: 'Серия активности поддерживается 3 дня подряд.',
      en: 'Maintained an active streak of 3 consecutive creative days.',
    },
  },
  {
    id: 'ach-content-architect',
    icon: 'Calendar',
    pointsRequired: 250,
    unlocked: false,
    title: {
      uz: 'Kontent Arxitektori',
      ru: 'Архитектор контента',
      en: 'Content Architect',
    },
    description: {
      uz: 'Haftalik kalendarda kamida 5 ta video va postni muvaffaqiyatli rejalashtirdingiz.',
      ru: 'В календаре спланировано не менее 5 единиц контента.',
      en: 'Successfully scheduled 5 or more content milestones on your calendar.',
    },
  },
  {
    id: 'ach-viral-mindset',
    icon: 'Zap',
    pointsRequired: 400,
    unlocked: false,
    title: {
      uz: 'Viral Fikrlash',
      ru: 'Вирусное мышление',
      en: 'Viral Mindset',
    },
    description: {
      uz: '400 creator balliga erishib, pro blogerlar safiga qo‘shildingiz.',
      ru: 'Набрано 400 баллов, достигнут продвинутый уровень блогера.',
      en: 'Accumulated 400 points, joining the ranks of elite content strategists.',
    },
  },
  {
    id: 'ach-creator-master',
    icon: 'Award',
    pointsRequired: 600,
    unlocked: false,
    title: {
      uz: 'Creator Master',
      ru: 'Creator Master',
      en: 'Creator Master',
    },
    description: {
      uz: 'Barcha bo‘limlarni mukammal o‘zlashtirgan tajribali kontent ustasi.',
      ru: 'Мастер контента, в совершенстве освоивший все инструменты.',
      en: 'The definitive creative master badge for consistent high-quality creators.',
    },
  },
];

export const INITIAL_CALENDAR_TASKS: CalendarTask[] = [
  {
    id: 'task-1',
    dayOfWeek: 'mon',
    dateStr: '2026-10-19',
    timeStr: '16:00',
    title: '3 ta bepul AI vositasi haqida Shorts olish',
    platform: 'youtube',
    format: 'reel_short',
    status: 'scripting',
    completed: false,
    notes: 'Telefonda ekran yozib olish va yuzni burchakda ko‘rsatish',
  },
  {
    id: 'task-2',
    dayOfWeek: 'wed',
    dateStr: '2026-10-21',
    timeStr: '18:30',
    title: 'Ertalab oson uyg‘onish siri haqida Reels',
    platform: 'instagram',
    format: 'reel_short',
    status: 'planned',
    completed: false,
    notes: 'Qisqa va dinamik montaj, 25 soniya',
  },
  {
    id: 'task-3',
    dayOfWeek: 'fri',
    dateStr: '2026-10-23',
    timeStr: '20:00',
    title: 'Haftalik foydali materiallar post va fayllar',
    platform: 'telegram',
    format: 'post',
    status: 'planned',
    completed: false,
    notes: 'Foydali promptlar va havolalarni matn qilib chiqarish',
  },
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Azizbek',
  handle: '@aziz_creator',
  bio: 'O‘quvchi, yosh bloger va CreatorLab foydalanuvchisi. Ta\'lim va texnologiya bo‘yicha qisqa videolar yarataman.',
  avatar: '/src/assets/images/creator_avatar_pro_1792402842762.jpg',
  totalPoints: 50,
  streakDays: 1,
  lastActiveDate: '2026-10-19',
  completedChallengesHistory: {
    '2026-10-19': [],
  },
};
