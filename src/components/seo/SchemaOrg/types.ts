export interface SchemaArea {
  "@type": string;
  name: string;
}

export interface SchemaAddress {
  "@type": string;
  addressLocality: string;
  addressCountry: string;
}

export interface SchemaData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  image: string;
  areaServed: SchemaArea[];
  sameAs: string[];
  address: SchemaAddress;
  priceRange: string;
}
