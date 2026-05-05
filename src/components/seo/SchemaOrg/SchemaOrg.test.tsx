import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { SEO_CONFIG } from '@/constants/seo';

import { SchemaOrg } from './SchemaOrg';
import type { SchemaData } from './types';

describe('SchemaOrg', () => {
  it('renders correctly and matches SEO_CONFIG data', () => {
    const { container } = render(<SchemaOrg />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeTruthy();
    if (!script) return;

    const schema = JSON.parse(script.innerHTML) as SchemaData;

    // 1. Basic Properties
    expect(schema["@type"]).toBe("ProfessionalService");
    expect(schema.name).toBe(SEO_CONFIG.name);
    expect(schema.url).toBe(SEO_CONFIG.url);
    expect(schema.priceRange).toBe("$$");

    // 2. Address Validation
    expect(schema.address.addressLocality).toBe("Dnipro");
    expect(schema.address.addressCountry).toBe("UA");

    // 3. Area Served Validation
    expect(Array.isArray(schema.areaServed)).toBe(true);
    const hasDnipro = schema.areaServed.some(area => area.name === "Dnipro");
    expect(hasDnipro).toBe(true);

    // Ensure it matches the count from SEO_CONFIG
    expect(schema.areaServed.length).toBe(SEO_CONFIG.areaServed.length);

    // 4. Social Links Validation
    expect(Array.isArray(schema.sameAs)).toBe(true);
    expect(schema.sameAs).toContain(SEO_CONFIG.socials.instagram);

    // 5. Image Validation
    expect(schema.image).toContain(SEO_CONFIG.url);
  });

  it('handles potential missing fields gracefully', () => {
    // This is more of a smoke test to ensure JSON.stringify doesn't fail
    // even if some fields were to be missing (though TS helps prevent this)
    const { container } = render(<SchemaOrg />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(() => JSON.parse(script?.innerHTML || "{}")).not.toThrow();
  });
});
