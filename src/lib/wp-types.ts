export interface WPNavLink {
  name: string;
  href: string;
}

export interface WPCertification {
  id?: string;
  name: string;
  detail: string;
}

export interface WPGlobalSettings {
  navLinks: WPNavLink[];
  brandName: string;
  brandSubtitle: string;
  navCtaText: string;
  navMobilePhone: string;
  navMobileCtaText: string;
  
  footerBrandDescription: string;
  footerSystemStatus: string;
  footerQualityIndex: string;
  footerNavInfrastructure: WPNavLink[];
  footerNavSystems: WPNavLink[];
  footerPhone: string;
  footerWhatsappUrl: string;
  footerCtaText: string;
  footerAddress: string;
  footerCopyright: string;
  footerHeritageTagline: string;
  footerCertifications: WPCertification[];

  whatsappUrl: string;
  whatsappTooltip: string;
}

export interface WPHeroData {
  chipText: string;
  headlineLine1: string[];
  headlineLine2: string[];
  subtext: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  videoUrl: string;
  bgImage: string;
  watermark1: string;
  watermark2: string;
}

export interface WPAboutData {
  tag: string;
  title: string;
  description1: string;
  description2: string;
  badgeNumber: string;
  badgeText: string;
  image: string;
}

export interface WPProductItem {
  id: string;
  name: string;
  type: string;
  watermark: string;
  links: string[];
  desc: string;
  image?: string;
}

export interface WPExperienceCenterData {
  tag: string;
  title1: string;
  title2: string;
  description: string;
  stats: { label: string; value: string }[];
  ctaText: string;
  image: string;
  watermark: string;
}

export interface WPTrustSectionData {
  tag: string;
  title1: string;
  title2: string;
  logos: { name: string; detail: string }[];
  certifications: { id: string; name: string; detail: string }[];
  efficiencyMetric: string;
  protocolMetric: string;
}

export interface WPQuoteFormData {
  tag: string;
  titleLine1: string;
  titleLine2: string;
  phone: string;
  address: string;
  responseStatus: string;
  standardStatus: string;
}

export interface WPHomePageData {
  hero: WPHeroData;
  about: WPAboutData;
  experienceCenter: WPExperienceCenterData;
  products: WPProductItem[];
  trustSection: WPTrustSectionData;
  quoteForm: WPQuoteFormData;
  testimonials: { author: string; text: string }[];
  clientsMarquee: { tag: string; clients: string[] };
}

export interface WPAboutPageData {
  hero: {
    title: string;
    subtitle: string;
    bgText: string;
  };
  about: WPAboutData;
  process: { tag: string; steps: { num: string; title: string; desc: string }[] };
  benefits: { tag: string; title: string; items: { title: string; desc: string }[] };
}

export interface WPGalleryItem {
  id: number;
  name: string;
  height: string;
  image: string;
  location: string;
  system: string;
}

export interface WPInfrastructurePageData {
  hero: { title: string; subtitle: string; bgText: string };
  about: WPAboutData;
  process: { tag: string; steps: { num: string; title: string; desc: string }[] };
}

export interface WPGalleryPageData {
  hero: { title: string; subtitle: string; bgText: string };
  gallery: { tag: string; title: string; items: WPGalleryItem[] };
}

export interface WPContactPageData {
  hero: { title: string; subtitle: string; bgText: string };
  quoteForm: WPQuoteFormData;
  about: WPAboutData;
  documentation: { title: string; desc: string };
}

export interface WPClientsPageData {
  hero: { title: string; subtitle: string; bgText: string };
  about: WPAboutData;
  clientsMarquee: { tag: string; clients: string[] };
  testimonials: { author: string; text: string }[];
}

export interface WPProductsPageData {
  hero: { title: string; subtitle: string; bgText: string };
  products: WPProductItem[];
  benefits: { tag: string; title: string; items: { title: string; desc: string }[] };
}
