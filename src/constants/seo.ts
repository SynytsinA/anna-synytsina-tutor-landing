export const SEO_CONFIG = {
  name: "Анна Синиціна",
  description: "Професійний репетитор для учнів 1-4 класів. Інтерактивне навчання, підготовка до школи, математика та українська мова онлайн.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tutor.com.ua",
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com",
  },
  areaServed: ["Online", "Dnipro", "Ukraine", "Poland", "Germany", "UK", "France", "Italy", "Spain", "Czech Republic"],
};

export const SOCIAL_LINKS = {
  instagram: SEO_CONFIG.socials.instagram,
};
