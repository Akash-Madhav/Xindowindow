import { 
  WPHomePageData, 
  WPAboutData, 
  WPGlobalSettings, 
  WPHeroData, 
  WPAboutPageData,
  WPInfrastructurePageData,
  WPGalleryPageData,
  WPContactPageData,
  WPClientsPageData,
  WPProductsPageData
} from './wp-types';

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
    tag: 'Manufacturing Core',
    title: 'The New Benchmark in Fenestration.',
    description1: 'Since our inception, Xindo Window has operated at the intersection of German technological heritage and Indian manufacturing prowess. We do not just make windows; we engineer complete architectural envelopes.',
    description2: 'Our systems are stress-tested against extreme weather protocols, ensuring acoustic perfection, thermal mapping efficiency, and structural integrity that lasts generations.',
    badgeNumber: '25+',
    badgeText: 'Years of Technical Excellence',
    image: '/images/hero-bg.png'
  },
  experienceCenter: {
    tag: 'The Showcase',
    title1: 'Architectural',
    title2: 'Symphony.',
    description: 'Step into 1:1 scale precision. Our Experience Center isn\'t just a showroom; it\'s a laboratory of acoustic and thermal performance, where the future of high-value infrastructure is felt.',
    stats: [
      { label: 'Acoustic Seal', value: '-48.2dB' },
      { label: 'System Class', value: 'LUMI-01' },
      { label: 'Interaction', value: 'Full-Scale' }
    ],
    ctaText: 'Private Tour',
    image: '/images/experience-center.png',
    watermark: 'X-CENTER'
  },
  products: [
    { 
      id: 'veka', 
      name: 'VEKA (UPVC)', 
      type: 'German Precision Vinyl', 
      watermark: 'VEKA', 
      links: ['Multi-Chambered', 'Acoustic I-50', 'Tropical Grade'], 
      desc: 'Uncompromising German-engineered uPVC profiles. Designed for hyper-durability and extreme tropical resistance, featuring advanced multi-chambered technology for ultimate insulation.', 
      image: '/images/sliding.png' 
    },
    { 
      id: 'aluk', 
      name: 'ALUK / ALUMINIUM', 
      type: 'Architectural System Aluminium', 
      watermark: 'ALUK', 
      links: ['Infineo Series', 'SC95 Minimalist', 'Structural Glazing'], 
      desc: 'High-performance architectural aluminum systems. Combining sleek, ultra-slim aesthetics with unyielding structural integrity for expansive modern focal points.', 
      image: '/images/casement.png' 
    },
    { 
      id: 'totalis', 
      name: 'TOTALIS', 
      type: 'Elite Performance Fenestration', 
      watermark: 'TOTALIS', 
      links: ['Zero-Threshold', 'Max Security', 'Weather-Tight'], 
      desc: 'Bespoke high-end fenestration solutions for unique architectural requirements. Engineered for zero-threshold transitions and maximum security architectural deployment.', 
      image: '/images/tilt_turn.png' 
    },
    { 
      id: 'xindo', 
      name: 'XINDO (SLEEK)', 
      type: 'Ultra-Slim Luxury Series', 
      watermark: 'SLEEK', 
      links: ['Invisible Frame', 'X12 Partition', 'Grand Panoramic'], 
      desc: 'The pinnacle of minimalist engineering. Ultra-slim profile systems designed for maximum transparency and zero-sightline luxury residential and commercial spaces.', 
      image: '/images/hardware.png' 
    }
  ],
  trustSection: {
    tag: 'Strategic Nodes',
    title1: 'Ecosystem',
    title2: 'Collaboration.',
    logos: [
      { name: 'Architectural Digest', detail: 'Feature Design' },
      { name: 'Lumière Foundry', detail: 'Precision Partner' },
      { name: 'De-Tech Systems', detail: 'Hardware Core' },
      { name: 'Glaze Dynamics', detail: 'Surface Tech' },
      { name: 'Form-X Group', detail: 'Structural Node' },
      { name: 'Vantage Build', detail: 'Implementation' }
    ],
    certifications: [
      { id: '01', name: 'ISO 9001:2015', detail: 'Global Quality Management Protocol' },
      { id: '02', name: 'DIN EN 12608', detail: 'German Technical Profile Standard' },
      { id: '03', name: 'GS CERTIFIED', detail: 'Safety & Material Validation' }
    ],
    efficiencyMetric: '99.8%',
    protocolMetric: 'GER'
  },
  quoteForm: {
    tag: 'Channel 08',
    titleLine1: 'Initiate',
    titleLine2: 'Protocol.',
    phone: '+91 94440 45544',
    address: 'No. 115/62, Canal Bank Road,\nCIT Nagar, Chennai — 600035',
    responseStatus: '24H RESPONSE TIME',
    standardStatus: 'GLB STANDARDS'
  },
  testimonials: [
    { author: 'Arul O', text: "FAST DELIVERY AND WINTECH PROFILE PRECISION. XINDO REPRESENTS THE ABSOLUTE BENCHMARK IN FENESTRATION." },
    { author: 'Bharathi ChandraSekhar', text: "EXCEPTIONAL ARCHITECTURAL EXECUTION. COMPLICATED DESIGN CHALLENGES MET WITH TECHNICAL MASTERY." },
    { author: 'Hari Babu R', text: "OFFICE INFRASTRUCTURE UPGRADED WITH SUPERIOR QUALITY. RELIABLE, REASONABLE, AND REMARKABLE." },
    { author: 'Vijayalakshmanan S', text: "CUSTOMIZED TO PERFECTION. THE MODULAR PRECISION MEETS EVERY SPECIFICATION OF MY VISION." }
  ],
  clientsMarquee: {
    tag: 'Strategic Partners',
    clients: [
      'Royal Splendour Developers', 'Pacifica Companies', 'KG Foundations Pvt. Ltd.', 'Janani Homes', 
      'Jain Housing', 'Endee Shelters', 'Elegant Constructions', 'Arun Excello', 'Pacifica Aurum'
    ]
  }
};

export const FALLBACK_ABOUT_DATA: WPAboutPageData = {
  hero: {
    title: "Our Heritage",
    subtitle: "Bridging Indo-German architectural excellence since inception. We don't just build windows; we engineer views and secure legacies.",
    bgText: "LEGACY"
  },
  about: {
    tag: "The Engineering Vision",
    title: "We don't manufacture windows — We engineer thresholds.",
    description1: "Guided by German precision and fueled by Indian architectural ambition, Xindo represents a paradigm shift in fenestration. Every profile we produce is a technical asset, designed for structural supremacy and aesthetic purity.",
    description2: "Our strategic Indo-German technical alliance ensures every profile meets the most stringent global standards for thermal insulation, security, and extreme climate durability.",
    badgeNumber: "ISO-9001",
    badgeText: "Certified Plant",
    image: "/images/about-vision.png"
  },
  process: {
    tag: "The Masterclass",
    steps: [
      { num: '01', title: 'Consultation', desc: 'Analyzing the specific wind-loads and acoustic requirements of your architectural site.' },
      { num: '02', title: 'Specification', desc: 'Selecting the precise uPVC blend and steel reinforcement for maximum stability.' },
      { num: '03', title: 'Craftsmanship', desc: 'Indo-German fabrication using precision-automated machinery.' },
      { num: '04', title: 'Integration', desc: 'Seamless structural installation within 4 working days.' }
    ]
  },
  benefits: {
    tag: "Quality Standards",
    title: "Engineered to Outlast the Elements",
    items: [
      { title: 'Extreme Durability', desc: 'Resistant to coastal salt and city smog' },
      { title: 'Thermal Barrier', desc: 'Reducing energy costs by up to 30%' },
      { title: 'Acoustic Control', desc: 'Up to 40dB noise reduction' },
      { title: 'Zero Maintenance', desc: 'UV-resistant profiles that never fade' }
    ]
  }
};

export const FALLBACK_INFRASTRUCTURE_DATA: WPInfrastructurePageData = {
  hero: { title: "The Infrastructure", subtitle: "State-of-the-art manufacturing facility powered by German robotics and local craftsmanship. Witness the precision behind Xindo.", bgText: "FACTORY" },
  about: {
    tag: "Strategic Capability",
    title: "20,000 Sq.Ft. of Automated Precision",
    description1: "Our Chennai facility employs fully automated CNC processing centers to ensure every miter, every cut, and every weld is accurate to 0.5mm. We don't believe in manual error; we believe in robotic perfection.",
    description2: "From automatic PVC welding to CNC corner cleaning and EPDM gasket integration, our production line is a technical masterclass in modern fenestration technology.",
    badgeNumber: "Industry 4.0",
    badgeText: "Standard Facility",
    image: "/images/about-factory.png"
  },
  process: {
    tag: "Supply Chain Integrity",
    steps: [
      { num: '01', title: 'Extrusion', desc: 'Sourcing high-grade uPVC compounds engineered for UV stability.' },
      { num: '02', title: 'Fabrication', desc: 'Precision-automated machining with millimetric accuracy.' },
      { num: '03', title: 'Quality Control', desc: 'Rigorous 20-point inspection before any dispatch.' },
      { num: '04', title: 'Logistics', desc: 'Secured transport and tracking system for timely delivery.' }
    ]
  }
};

export const FALLBACK_GALLERY_DATA: WPGalleryPageData = {
  hero: { title: "The Gallery", subtitle: "A visual testament to architectural grandeur. Explore our portfolio of luxury residences and high-profile commercial landmarks.", bgText: "PORTFOLIO" },
  gallery: {
    tag: "Visual Testament",
    title: "SHOWCASE",
    items: [
      { id: 10, name: 'Sapphire Residences', height: 'h-[400px]', image: '/images/gallery/sapphire.png', location: 'Chennai', system: 'VEKA' },
      { id: 11, name: 'Marina Bay Towers', height: 'h-[300px]', image: '/images/gallery/marina.png', location: 'Dubai', system: 'ALUK' },
      { id: 12, name: 'Skyline Corporate Hub', height: 'h-[450px]', image: '/images/gallery/skyline.png', location: 'Bangalore', system: 'TOTALIS' },
      { id: 13, name: 'The Emerald Villa', height: 'h-[320px]', image: '/images/gallery/emerald.png', location: 'Hyderabad', system: 'SLEEK' },
      { id: 14, name: 'Azure Tech Park', height: 'h-[380px]', image: '/images/gallery/azure.png', location: 'Pune', system: 'VEKA' },
      { id: 15, name: 'Ivory Heights', height: 'h-[280px]', image: '/images/gallery/ivory.png', location: 'Mumbai', system: 'ALUK' }
    ]
  }
};

export const FALLBACK_CONTACT_DATA: WPContactPageData = {
  hero: { title: "Connect with Us", subtitle: "Ready to transform your vision into an architectural masterpiece? Our experts are here to guide your technical and aesthetic choices.", bgText: "CONTACT" },
  quoteForm: FALLBACK_HOME_DATA.quoteForm,
  about: {
    tag: "Regional Presence",
    title: "Corporate Office & Advanced Manufacturing",
    description1: "Located in the industrial heart of Chennai, our corporate headquarters and primary manufacturing facility are open for architectural consultations and technical walkthroughs.",
    description2: "Direct Tech Support: +91 94440 45544 | info@xindowindow.com | CIT Nagar, Chennai",
    badgeNumber: "Chennai",
    badgeText: "HQ Command",
    image: "/images/about-office.png"
  },
  documentation: {
    title: "Architectural Documentation",
    desc: "Have a technical question about our uPVC systems or installation process? Our technical help desk is available for deep-dive specification analysis."
  }
};

export const FALLBACK_CLIENTS_DATA: WPClientsPageData = {
  hero: { title: "Our Strategic Partners", subtitle: "Trusted by India's leading developers and visionary architects. Our client list is a reflection of our commitment to quality.", bgText: "PARTNERSHIP" },
  about: {
    tag: "Strategic Alliances",
    title: "We engineer solutions with India's leading visionaries.",
    description1: "From complex commercial landmarks to exclusive high-end residences, Xindo Window is the definitive fenestration partner for developers who demand structural perfection.",
    description2: "We offer an elite Indo-German technical standard that ensures every architectural vision is realized with absolute precision and climate resilience.",
    badgeNumber: "Top-Tier",
    badgeText: "Industrial Partner",
    image: "/images/about-clients.png"
  },
  clientsMarquee: FALLBACK_HOME_DATA.clientsMarquee,
  testimonials: FALLBACK_HOME_DATA.testimonials
};

export const FALLBACK_PRODUCTS_PAGE_DATA: WPProductsPageData = {
  hero: { title: "Systems Portfolio", subtitle: "Uncompromising engineering precision in every profile. Explore our ranges from high-performance sliding systems to grand architectural focal points.", bgText: "ENGINEERING" },
  products: FALLBACK_HOME_DATA.products,
  benefits: {
    tag: "Architectural Freedom",
    title: "Customized for Your Design Language",
    items: [
      { title: 'Bespoke Sizing', desc: 'Millimeter precision for any rough opening' },
      { title: 'Color Curation', desc: 'Premium lamination in metallic and wood finishes' },
      { title: 'Glass Integration', desc: 'Supporting DGU, TGU, and Acoustic laminates' },
      { title: 'Smart Security', desc: 'Compatible with modern home automation sensors' }
    ]
  }
};

export async function fetchWPAPI(endpoint: string, options = {}) {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!WP_URL) return null;
  const WP_API = `${WP_URL}/wp-json/wp/v2`;
  try {
    const res = await fetch(`${WP_API}${endpoint}`, {
      next: { revalidate: 60 },
      ...options,
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    console.warn(`WP API [${endpoint}] Failed:`, error);
    return null;
  }
}

export async function getGlobalSettings(): Promise<WPGlobalSettings> {
  const data = await fetchWPAPI('/acf/v3/options/options'); 
  if (!data?.acf) return FALLBACK_GLOBAL_SETTINGS;
  return {
    ...FALLBACK_GLOBAL_SETTINGS,
    // Add real mapping here
  };
}

export async function getHomePageData(): Promise<WPHomePageData> {
  const data = await fetchWPAPI('/pages?slug=home&_embed');
  if (!data?.[0]?.acf) return FALLBACK_HOME_DATA;
  return FALLBACK_HOME_DATA;
}

export async function getAboutPageData(): Promise<WPAboutPageData> {
  const data = await fetchWPAPI('/pages?slug=about&_embed');
  if (!data?.[0]?.acf) return FALLBACK_ABOUT_DATA;
  return FALLBACK_ABOUT_DATA;
}

export async function getInfrastructurePageData(): Promise<WPInfrastructurePageData> {
  const data = await fetchWPAPI('/pages?slug=infrastructure&_embed');
  if (!data?.[0]?.acf) return FALLBACK_INFRASTRUCTURE_DATA;
  return FALLBACK_INFRASTRUCTURE_DATA;
}

export async function getGalleryPageData(): Promise<WPGalleryPageData> {
  const data = await fetchWPAPI('/pages?slug=gallery&_embed');
  if (!data?.[0]?.acf) return FALLBACK_GALLERY_DATA;
  return FALLBACK_GALLERY_DATA;
}

export async function getContactPageData(): Promise<WPContactPageData> {
  const data = await fetchWPAPI('/pages?slug=contact&_embed');
  if (!data?.[0]?.acf) return FALLBACK_CONTACT_DATA;
  return FALLBACK_CONTACT_DATA;
}

export async function getClientsPageData(): Promise<WPClientsPageData> {
  const data = await fetchWPAPI('/pages?slug=clients&_embed');
  if (!data?.[0]?.acf) return FALLBACK_CLIENTS_DATA;
  return FALLBACK_CLIENTS_DATA;
}

export async function getProductsPageData(): Promise<WPProductsPageData> {
  const data = await fetchWPAPI('/pages?slug=products&_embed');
  if (!data?.[0]?.acf) return FALLBACK_PRODUCTS_PAGE_DATA;
  return FALLBACK_PRODUCTS_PAGE_DATA;
}
