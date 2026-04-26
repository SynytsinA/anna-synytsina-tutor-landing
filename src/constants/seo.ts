export const SEO_CONFIG = {
  name: "Анна Синиціна",
  description: "Професійний репетитор для учнів 1-4 класів. Інтерактивне навчання, підготовка до школи, математика та українська мова онлайн.",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  socials: [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  ],
  areaServed: ["Ukraine", "Online", "Poland", "Germany", "UK", "France", "Italy", "Spain", "Czech Republic", "Portugal"],
};

export const SOCIAL_LINKS = {
  instagram: SEO_CONFIG.socials[0],
};
