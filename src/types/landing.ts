export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  desc: string;
}

export interface ValueItem {
  title: string;
  desc: string;
}

export interface SubjectCard {
  title: string;
  desc: string;
  list: string[];
  icon: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface CountryNode {
  name: {
    en: string;
    ua: string;
  };
  flag: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface VideoMetadata {
  id: number;
  src: string;
}

export interface TestimonialData {
  id: number;
  image: string;
  username: string;
  time: string;
}
