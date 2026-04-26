import { SEO_CONFIG } from "@/constants/seo";

export const SchemaOrg = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": SEO_CONFIG.name,
    "description": SEO_CONFIG.description,
    "url": SEO_CONFIG.url,
    "image": `${SEO_CONFIG.url}/images/repetytor-pochatkovyh-klasiv-anna-synytsina-about.jpg`,
    "areaServed": SEO_CONFIG.areaServed.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "sameAs": SEO_CONFIG.socials,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dnipro",
      "addressCountry": "UA"
    },
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
