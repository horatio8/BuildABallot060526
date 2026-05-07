export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup extends NavLink {
  children?: NavLink[];
}

export interface StepItem {
  step: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
}

export interface ColumnCard {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "dark" | "green" | "purple";
}
