import { QuizQuestion, Subject } from "@/types/quiz";

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

export const NAV_STRUCTURE = [
  { id: "about", href: `#${LANDING_SECTIONS.about}` },
  { id: "services", href: `#${LANDING_SECTIONS.subjects}` },
  { id: "approach", href: `#${LANDING_SECTIONS.approach}` },
  { id: "videos", href: `#${LANDING_SECTIONS.videoGallery}` },
  { id: "games", href: `#${LANDING_SECTIONS.games}` },
  { id: "reviews", href: "#reviews" },
  { id: "faq", href: "#faq" },
  { id: "contact", href: `#${LANDING_SECTIONS.contact}` },
];

export const GAMES_SECTION_CONFIG = {
  loadingDelay: 800,
  tabs: {
    potter: "potter",
    grinch: "grinch",
  },
};

export const ABOUT_METADATA = {
  profilePhoto: {
    url: "/images/repetytor-pochatkovyh-klasiv-anna-synytsina-about.jpg",
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
    url: "/images/repetytor-pochatkovyh-klasiv-anna-synytsina-approach.jpg",
    alt: {
      en: "Anna Synytsina teaching online",
      ua: "Анна Синиціна під час онлайн-уроку",
    },
    width: 500,
    height: 700,
  },
};

export const FOOTER_METADATA = {
  image: {
    url: "/images/repetytor-pochatkovyh-klasiv-anna-synytsina-contact.jpg",
    alt: {
      en: "Teacher Anna waiting for students",
      ua: "Вчитель Анна чекає на учнів",
    },
  },
};

export const VIDEO_GALLERY_METADATA = [
  {
    id: 2,
    src: "/videos/navchannya-v-ihrovii-formi-grinch.mp4",
    poster: "/images/posters/navchannya-v-ihrovii-formi-grinch.jpg",
  },
  {
    id: 1,
    src: "/videos/urok-matematyky-online-pochatkovi-klasy-1.mp4",
    poster: "/images/posters/urok-matematyky-online-pochatkovi-klasy-1.jpg",
  },
  {
    id: 11,
    src: "/videos/pidhotovka-do-shkoly-online-pryklad-1.mp4",
    poster: "/images/posters/pidhotovka-do-shkoly-online-pryklad-1.jpg",
  },
  {
    id: 7,
    src: "/videos/urok-ukrainskoi-movy-nush-pochatkova-shkola-1.mp4",
    poster: "/images/posters/urok-ukrainskoi-movy-nush-pochatkova-shkola-1.jpg",
  },
  {
    id: 3,
    src: "/videos/navchannya-v-ihrovii-formi-harry-potter.mp4",
    poster: "/images/posters/navchannya-v-ihrovii-formi-harry-potter.jpg",
  },
  {
    id: 4,
    src: "/videos/urok-matematyky-online-pochatkovi-klasy-2.mp4",
    poster: "/images/posters/urok-matematyky-online-pochatkovi-klasy-2.jpg",
  },
  {
    id: 12,
    src: "/videos/pidhotovka-do-shkoly-online-pryklad-2.mp4",
    poster: "/images/posters/pidhotovka-do-shkoly-online-pryklad-2.jpg",
  },
  {
    id: 8,
    src: "/videos/urok-ukrainskoi-movy-nush-pochatkova-shkola-2.mp4",
    poster: "/images/posters/urok-ukrainskoi-movy-nush-pochatkova-shkola-2.jpg",
  },
  {
    id: 5,
    src: "/videos/urok-matematyky-online-pochatkovi-klasy-3.mp4",
    poster: "/images/posters/urok-matematyky-online-pochatkovi-klasy-3.jpg",
  },
  {
    id: 13,
    src: "/videos/pidhotovka-do-shkoly-online-pryklad-3.mp4",
    poster: "/images/posters/pidhotovka-do-shkoly-online-pryklad-3.jpg",
  },
  {
    id: 9,
    src: "/videos/urok-ukrainskoi-movy-nush-pochatkova-shkola-3.mp4",
    poster: "/images/posters/urok-ukrainskoi-movy-nush-pochatkova-shkola-3.jpg",
  },
  {
    id: 6,
    src: "/videos/urok-matematyky-online-pochatkovi-klasy-4.mp4",
    poster: "/images/posters/urok-matematyky-online-pochatkovi-klasy-4.jpg",
  },
  {
    id: 14,
    src: "/videos/pidhotovka-do-shkoly-online-pryklad-4.mp4",
    poster: "/images/posters/pidhotovka-do-shkoly-online-pryklad-4.jpg",
  },
  {
    id: 10,
    src: "/videos/urok-ukrainskoi-movy-nush-pochatkova-shkola-4.mp4",
    poster: "/images/posters/urok-ukrainskoi-movy-nush-pochatkova-shkola-4.jpg",
  },
];

export const SERVICES_CONFIG = {
  grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export const QUIZ_QUESTIONS: Record<Subject, QuizQuestion[]> = {
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

export const TESTIMONIALS_DATA = [
  { id: 1, image: "/images/vidhuk-pro-navchannya-anna-synytsina-1.jpg", alt: "Відгук про навчання у Анни Синиціної", username: "olena_germany", time: "2h" },
  { id: 2, image: "/images/vidhuk-pro-navchannya-anna-synytsina-2.jpg", alt: "Позитивний відгук про вчителя Анну Синиціну", username: "dmytro_aus", time: "5h" },
  { id: 3, image: "/images/vidhuk-pro-navchannya-anna-synytsina-3.jpg", alt: "Відгук мами про уроки у початковій школі", username: "mari_poland", time: "8h" },
  { id: 4, image: "/images/vidhuk-pro-navchannya-anna-synytsina-4.jpg", alt: "Враження від інтерактивного навчання у Анни", username: "sara_uk_mom", time: "12h" },
  { id: 5, image: "/images/vidhuk-pro-navchannya-anna-synytsina-5.jpg", alt: "Відгук про репетиторство з Анною Синиціною", username: "mama_marichka", time: "15h" },
  { id: 6, image: "/images/vidhuky-batkiv-vchytel-pochatkovyh-klasiv-1.jpg", alt: "Відгук батьків про вчительку початкових класів", username: "vlad_prep", time: "18h" },
  { id: 7, image: "/images/vidhuky-batkiv-vchytel-pochatkovyh-klasiv-2.jpg", alt: "Подяка вчительці за якісну підготовку до школи", username: "natalia_v", time: "20h" },
  { id: 8, image: "/images/vidhuky-batkiv-vchytel-pochatkovyh-klasiv-3.jpg", alt: "Відгук про успіхи дитини у початковій школі", username: "olha_school", time: "21h" },
  { id: 9, image: "/images/vidhuky-batkiv-vchytel-pochatkovyh-klasiv-4.jpg", alt: "Враження батьків від онлайн-занять з репетитором", username: "tetiana_m", time: "22h" },
  { id: 10, image: "/images/vidhuky-batkiv-vchytel-pochatkovyh-klasiv-5.jpg", alt: "Відгук про індивідуальний підхід вчительки Анни Синиціної", username: "viktor_hol", time: "23h" },
  { id: 11, image: "/images/vidhuky-batkiv-vchytel-pochatkovyh-klasiv-6.jpg", alt: "Результати навчання у початкових класах - відгук", username: "anastasia_prep", time: "23h" },
];

export const TESTIMONIALS_CONFIG = {
  itemWidth: 320,
  scrollAmount: 320,
};
