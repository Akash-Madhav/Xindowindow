// Shared Types for WordPress Integration
 
export interface WPNavMenuLink {
  name: string;
  href: string;
}
 
export interface WPGlobalSettings {
  navLinks: WPNavMenuLink[];
  brandName: string;
  brandSubtitle: string;
  navCtaText: string;
  navMobilePhone: string;
  navMobileCtaText: string;
  
  footerBrandDescription: string;
  footerSystemStatus: string;
  footerQualityIndex: string;
  footerNavInfrastructure: WPNavMenuLink[];
  footerNavSystems: WPNavMenuLink[];
  footerPhone: string;
  footerWhatsappUrl: string;
  footerCtaText: string;
  footerAddress: string;
  footerCopyright: string;
  footerHeritageTagline: string;
  footerCertifications: { id: string; name: string; detail: string }[];
 
  whatsappUrl: string;
  whatsappTooltip: string;
  navDirectoryLabel: string;
  navTechnicalDeskLabel: string;
  brandWatermark: string;
  footerInfrastructureLabel: string;
  footerSystemsLabel: string;
  footerOperationsLabel: string;
  footerHqLabel: string;
  preloaderSteps: string[];
  preloaderSystemLabel: string;
  preloaderGridLabel: string;
  whatsappAriaLabel: string;
  whatsappDefaultMessage: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage: string;
  favicon: string;
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
  badgeStatusLabel?: string;
  ctaLabel?: string;
  stats?: { id: string; label: string; value: string; detail: string }[];
}
 
export interface WPExperienceCenterData {
  tag: string;
  title1: string;
  title2: string;
  description: string;
  image: string;
  watermark: string;
  ambientLabel: string;
  ctaText?: string;
  stats?: { id: string; label: string; value: string; detail?: string }[];
}
 
export interface WPBenefitsData {
  tag: string;
  title: string;
  items: { 
    id: string; 
    label: string; 
    value: string; 
    detail: string; 
  }[];
}
 
export interface WPTrustSectionData {
  tag: string;
  title1: string;
  title2: string;
  logos: { name: string; detail: string }[];
  certifications: { id: string; name: string; detail: string }[];
  efficiencyMetric: string;
  protocolMetric: string;
  validationTag?: string;
  uptimeLabel?: string;
  protocolLabel?: string;
}
 
export interface WPQuoteFormData {
  tag: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  watermark: string;
  submitText: string;
  successTitle: string;
  successMessage: string;
  phone: string;
  address: string;
  responseStatus: string;
  standardStatus: string;
  formLabels: {
    name: string;
    email: string;
    phone: string;
    project: string;
    type: string;
    message: string;
    submit: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderPhone: string;
    placeholderProject: string;
    placeholderType: string;
    placeholderMessage: string;
  };
}
 
export type WPProductRegistry = Record<string, string[]>;
export type WPTestimonialItem = { author: string; text: string };
export type WPProductItem = {
  id: string;
  title: string;
  description: string;
  type: string;
  watermark: string;
  image: string;
  specs: string[];
};

export interface WPClientsMarqueeData {
  tag: string;
  clients: string[];
}
 
export interface WPHomePageData {
  hero: WPHeroData;
  about: WPAboutData;
  experienceCenter: WPExperienceCenterData;
  benefits: WPBenefitsData;
  products: WPProductItem[];
  registry: WPProductRegistry;
  trustSection: WPTrustSectionData;
  testimonials: {
    tag: string;
    items: WPTestimonialItem[];
  };
  clientsMarquee: WPClientsMarqueeData;
  quoteForm: WPQuoteFormData;
}
 
export interface WPAboutPageData {
  hero: WPHeroData;
  about: WPAboutData;
  process: {
    tag: string;
    steps: {
      id: string;
      title: string;
      desc: string;
      status: string;
    }[];
  };
  benefits: WPBenefitsData;
}
 
export interface WPProductsPageData {
  hero: WPHeroData;
  products: WPProductItem[];
  registry: WPProductRegistry;
  benefits: WPBenefitsData;
}
 
export interface WPInfrastructurePageData {
  hero: WPHeroData;
  tag: string;
  title: string;
  description: string;
  watermark: string;
  stats: { id: string; label: string; value: string; detail: string }[];
}
 
export interface WPGalleryPageData {
  hero: WPHeroData;
  categories: { id: string; name: string }[];
  projects: { 
    id: string; 
    name: string; 
    categoryId: string; 
    image: string; 
    detail: string 
  }[];
}
 
export interface WPContactPageData {
  hero: WPHeroData;
  about: WPAboutData;
  documentation: { title: string; desc: string };
  quoteForm: WPQuoteFormData;
}
 
export interface WPClientsPageData {
  hero: WPHeroData;
  about: WPAboutData;
  clientsMarquee: WPClientsMarqueeData;
  testimonials: {
    tag: string;
    items: WPTestimonialItem[];
  };
  partners: { name: string; logo: string; detail: string }[];
}
