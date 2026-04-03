import { WPGlobalSettings, WPHomePageData } from './wp-types';

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
const WP_API = `${WP_URL}/wp-json/wp/v2`;

export const FALLBACK_GLOBAL_SETTINGS: WPGlobalSettings = {
  navLinks: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Collections', href: '/products' },
    { name: 'Facility', href: '/infrastructure' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ],
  brandName: 'Xindo Window',
  brandSubtitle: 'Industrial Excellence',
  navCtaText: 'Inquire',
  navMobilePhone: '94440 45544',
  navMobileCtaText: 'Consult Engineering',
  
  footerBrandDescription: 'Engineering the absolute benchmark in high-value fenestration systems. Architectural precision crafted for the future of Indian living.',
  footerSystemStatus: 'System Online: release 1.02',
  footerQualityIndex: 'Quality Index: certified',
  footerNavInfrastructure: [
    { name: 'Engineering', href: '/about' },
    { name: 'Standards', href: '/about#quality' },
    { name: 'Plant', href: '/infrastructure' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Technical', href: '/contact' }
  ],
  footerNavSystems: [
    { name: 'Sliding', href: '/products#sliding' },
    { name: 'Casement', href: '/products#casement' },
    { name: 'Special', href: '/products#special' },
    { name: 'Hardware', href: '/products#hardware' },
    { name: 'Aluminum', href: '/products#aluminum' }
  ],
  footerPhone: '+91 94440 45544',
  footerWhatsappUrl: 'https://wa.me/919444045544',
  footerCtaText: 'Request Protocol',
  footerAddress: 'No. 115/62, Canal Bank Road,\nCIT Nagar, Chennai — 600035',
  footerCopyright: '© 2026 XINDO WINDOW PRIVATE LIMITED',
  footerHeritageTagline: 'GERMAN TECHNICAL HERITAGE',
  footerCertifications: [
    { id: 'GS-9001', name: 'GS-9001', detail: 'CERTIFIED' },
    { id: 'LUMI-AIR', name: 'LUMI-AIR', detail: 'AIR-TIGHT PROTOCOL' }
  ],
  whatsappUrl: 'https://wa.me/919444045544',
  whatsappTooltip: 'Technical Desk'
};

export const FALLBACK_HOME_DATA: WPHomePageData = {
  hero: {
    chipText: 'System Release 1.02',
    headlineLine1: ['Engineering'],
    headlineLine2: ['The', 'Future'],
    subtext: 'Crafting high-value industrial infrastructure through state-of-the-art German uPVC technology. Architectural precision designed for the future of Indian living.',
    ctaPrimaryText: 'Configure Project',
    ctaSecondaryText: 'Facility Tour',
    ctaSecondaryLink: '/infrastructure',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4',
    bgImage: '/images/hero-bg.png',
    watermark1: 'XINDO',
    watermark2: 'PRECISION',
  },
  about: {
    tag: 'Architectural Paradigm',
    title: 'The New Benchmark in Fenestration.',
    description1: 'Since our inception, Xindo Window has operated at the intersection of German technological heritage and Indian manufacturing prowess. We do not just make windows; we engineer complete architectural envelopes.',
    description2: 'Our systems are stress-tested against extreme weather protocols, ensuring acoustic perfection, thermal mapping efficiency, and structural integrity that lasts generations.',
    badgeNumber: '25+',
    badgeText: 'Years of Technical\nExcellence',
    image: '/images/hero-bg.png'
  }
};

export async function fetchWPAPI(endpoint: string, options = {}) {
  if (!WP_URL) return null;
  try {
    const res = await fetch(`${WP_API}${endpoint}`, {
      next: { revalidate: 60 },
      ...options,
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    console.warn('WP API Failed:', error);
    return null;
  }
}

export async function getGlobalSettings(): Promise<WPGlobalSettings> {
  const data = await fetchWPAPI('/acf/v3/options/options'); // example endpoint
  if (!data?.acf) return FALLBACK_GLOBAL_SETTINGS;
  return {
    ...FALLBACK_GLOBAL_SETTINGS,
    // in real scenario we map data.acf here
  };
}

export async function getHomePageData(): Promise<WPHomePageData> {
  return FALLBACK_HOME_DATA;
}
