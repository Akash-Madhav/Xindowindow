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

export interface WPHomePageData {
  hero: WPHeroData;
  about: WPAboutData;
}
