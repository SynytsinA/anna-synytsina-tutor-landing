export const HERO_CONFIG = {
  startYear: 2014,
  badgeIcon: "📚",
  interactiveWordDelay: 0.05,
  scribbleDelay: "0.5s",
  fadeDelays: {
    badge: 0,
    title: 0.1,
    subtitle: 0.2,
    actions: 0.3,
    quiz: 0.2,
  },
};

export const LANDING_SECTIONS = {
  about: "about",
  subjects: "subjects",
  approach: "approach",
  videoGallery: "video-gallery",
  games: "games",
  contact: "contact",
};

export const GAMES_SECTION_CONFIG = {
  loadingDelay: 800,
  tabs: {
    potter: "potter",
    grinch: "grinch",
  },
};

export const ABOUT_METADATA = {
  profilePhoto: {
    url: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: {
      en: "Anna Synytsina - Professional Tutor",
      ua: "Синиціна Анна Юріївна - професійний репетитор",
    },
    width: 400,
    height: 533,
  },
};

export const APPROACH_METADATA = {
  portraitImage: {
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: {
      en: "Anna Synytsina teaching online",
      ua: "Анна Синиціна під час онлайн-уроку",
    },
    width: 500,
    height: 700,
  },
};

export const VIDEO_GALLERY_METADATA = [
  {
    id: 1,
    src: "https://assets.mixkit.co/videos/preview/mixkit-little-girl-writing-in-a-notebook-42352-large.mp4",
    poster: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    src: "https://assets.mixkit.co/videos/preview/mixkit-mother-reading-a-book-to-her-children-40502-large.mp4",
    poster: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    src: "https://assets.mixkit.co/videos/preview/mixkit-little-girl-learning-colors-42471-large.mp4",
    poster: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

export const SERVICES_CONFIG = {
  grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export const QUIZ_QUESTIONS = {
  ua: [
    {
      q: "Яке слово є іменником? (Хто? Що?)",
      options: ["Бігти", "Веселий", "Школа"],
      correct: 2
    },
    {
      q: "Антонім до слова «День»?",
      options: ["Ранок", "Ніч", "Сонце"],
      correct: 1
    },
    {
      q: "Яке слово означає дію (що робити)?",
      options: ["Стіл", "Спати", "Зелений"],
      correct: 1
    },
    {
      q: "Скільки букв в українській абетці?",
      options: ["33", "32", "26"],
      correct: 0
    },
    {
      q: "Що ставимо в кінці питального речення?",
      options: ["Крапку", "Знак оклику", "Знак питання"],
      correct: 2
    }
  ],
  math: [
    {
      q: "Скільки буде 5 + 3?",
      options: ["7", "8", "9"],
      correct: 1
    },
    {
      q: "Як називається фігура з 3 кутами?",
      options: ["Квадрат", "Трикутник", "Коло"],
      correct: 1
    },
    {
      q: "15 - 6 = ?",
      options: ["9", "8", "10"],
      correct: 0
    },
    {
      q: "Скільки сантиметрів у метрі?",
      options: ["10", "100", "1000"],
      correct: 1
    },
    {
      q: "Яке число парне?",
      options: ["3", "7", "10"],
      correct: 2
    }
  ]
};

export const GLOBAL_CLASSROOM_CONFIG = {
  countries: [
    { name: { en: "Poland", ua: "Польща" }, flag: "🇵🇱", top: "10%", left: "50%" },
    { name: { en: "Australia", ua: "Австралія" }, flag: "🇦🇺", top: "20%", right: "20%" },
    { name: { en: "Ukraine", ua: "Україна" }, flag: "🇺🇦", top: "50%", right: "5%" },
    { name: { en: "Scotland", ua: "Шотландія" }, flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", bottom: "20%", right: "20%" },
    { name: { en: "Germany", ua: "Німеччина" }, flag: "🇩🇪", bottom: "10%", left: "50%" },
    { name: { en: "Spain", ua: "Іспанія" }, flag: "🇪🇸", bottom: "20%", left: "20%" },
    { name: { en: "France", ua: "Франція" }, flag: "🇫🇷", top: "50%", left: "5%" },
    { name: { en: "Denmark", ua: "Данія" }, flag: "🇩🇰", top: "20%", left: "20%" },
    { name: { en: "Turkey", ua: "Туреччина" }, flag: "🇹🇷", top: "35%", right: "10%" },
    { name: { en: "Czech Republic", ua: "Чехія" }, flag: "🇨🇿", bottom: "35%", left: "10%" },
  ],
  stats: {
    countriesCount: 10,
    onlineValue: "100%"
  }
};

export const FAQ_CONFIG = {
  colorClasses: [
    "border-l-[8px] border-l-secondary",
    "border-l-[8px] border-l-primary",
    "border-l-[8px] border-l-accent",
    "border-l-[8px] border-l-green-500"
  ]
};

export const TESTIMONIALS_CONFIG = {
  itemWidth: 320,
  scrollAmount: 320,
};
