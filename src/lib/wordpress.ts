import { 
  WPHomePageData, 
  WPAboutPageData, 
  WPGlobalSettings, 
  WPProductItem,
  WPProductRegistry,
  WPTrustSectionData,
  WPQuoteFormData,
  WPHeroData,
  WPAboutData,
  WPExperienceCenterData,
  WPBenefitsData,
  WPClientsMarqueeData,
  WPTestimonialItem,
  WPProductsPageData,
  WPInfrastructurePageData,
  WPGalleryPageData,
  WPContactPageData,
  WPClientsPageData
} from './wp-types';
 
// Constants for ambient labels and assets
export const AUTHENTICITY_LABEL = "AUTHENTICITY REGISTERED";
export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
export const ASSET_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
 
export const FALLBACK_CERTIFICATIONS = [
  { id: 'GS-9001', name: 'GS-9001', detail: 'CERTIFIED' },
  { id: 'LUMI-AIR', name: 'LUMI-AIR', detail: 'AIR-TIGHT PROTOCOL' }
];
 
export const FALLBACK_GLOBAL_SETTINGS: WPGlobalSettings = {
  navLinks: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Infrastructure', href: '/infrastructure' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ],
  brandName: "XINDO",
  brandSubtitle: "German Precision Windows",
  navCtaText: "Expert Consultation",
  navMobilePhone: "+91 94440 45544",
  navMobileCtaText: "Request Technical Quote",
  footerBrandDescription: "Crafting architectural legacies through German-engineered uPVC systems. Sustainable. Secure. Superior.",
  footerSystemStatus: "MANUFACTURING: OPERATIONAL",
  footerQualityIndex: "ISO-9001:2015 CERTIFIED",
  footerNavInfrastructure: [
    { name: 'Manufacturing Unit', href: '/infrastructure' },
    { name: 'R&D Lab', href: '/infrastructure' },
    { name: 'Supply Chain', href: '/infrastructure' }
  ],
  footerNavSystems: [
    { name: 'Elite Series', href: '/products' },
    { name: 'Heritage Series', href: '/products' },
    { name: 'Prime Series', href: '/products' }
  ],
  footerPhone: "+91 94440 45544",
  footerWhatsappUrl: "https://wa.me/919444045544",
  footerCtaText: "Direct Technical Access",
  footerAddress: "No. 4/33, Mettukuppam Road, Via Maduravoyal, Chennai – 600 095.",
  footerCopyright: "© 2024 XINDO WINDOWS. ALL RIGHTS RESERVED.",
  footerHeritageTagline: "ENGINEERING THE FUTURE OF LIVING — SINCE 2012",
  footerCertifications: FALLBACK_CERTIFICATIONS,
  whatsappUrl: 'https://wa.me/919444045544',
  whatsappTooltip: 'Technical Desk',
  navDirectoryLabel: 'Directory',
  navTechnicalDeskLabel: 'Technical Desk',
  brandWatermark: 'XINDO',
  footerInfrastructureLabel: 'Infrastructure',
  footerSystemsLabel: 'Systems',
  footerOperationsLabel: 'Operations',
  footerHqLabel: 'Headquarters',
  preloaderSteps: ['INITIALIZING_CORE', 'LOADING_ASSETS', 'CALIBRATING_SYSTEMS', 'READY'],
  preloaderSystemLabel: 'SYSTEM_STATUS',
  preloaderGridLabel: 'GRID_SYNC',
  whatsappAriaLabel: "Chat with our technical experts on WhatsApp",
  whatsappDefaultMessage: "Hi, I'm interested in Xindo Windows and Doors. I'd like to know more about your products.",
  seoTitle: "Xindo Window | Premium Indo-German uPVC Fenestration",
  seoDescription: "India's leading Indo-German uPVC windows and doors manufacturer. Sliding, casement, and special systems with 10-year warranty. Engineered for architectural precision.",
  seoKeywords: ["uPVC Windows", "uPVC Doors", "Indo-German Fenestration", "Chennai Windows", "Premium Windows"],
  ogImage: "/images/og-image.png",
  favicon: "/favicon.ico"
};
 
export const FALLBACK_PRODUCTS: WPProductItem[] = [
  {
    id: "01",
    title: "Elite Series",
    type: "Premium Structural",
    watermark: "ELITE",
    description: "Multi-chambered systems with titan-strength reinforcement. Engineered for high-rise acoustic values.",
    image: "/images/product-1.png",
    specs: ["70mm Depth", "U-Value 1.1", "40dB Insulation"]
  }
];
 
export const FALLBACK_HOME_DATA: WPHomePageData = {
  hero: {
    chipText: "System Release 1.02",
    headlineLine1: ["Engineering"],
    headlineLine2: ["The", "Future"],
    subtext: "Crafting high-value industrial infrastructure through state-of-the-art German uPVC technology. Architectural precision designed for the future of Indian living.",
    ctaPrimaryText: "Configure Project",
    ctaSecondaryText: "Facility Tour",
    ctaSecondaryLink: "/infrastructure",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4",
    bgImage: "/images/hero-bg.png",
    watermark1: "XINDO",
    watermark2: "PRECISION"
  },
  about: {
    tag: "A Legacy Reimagined",
    title: "The Pinnacle of German Precision.",
    description1: "Founded on the principles of unapologetic quality, Xindo Windows represents the apex of architectural fenestration systems.",
    description2: "Our German-engineered profiles deliver unparalleled thermal efficiency and structural integrity, specifically optimized for the diverse Indian climate.",
    badgeNumber: "12",
    badgeText: "Years of Engineering Excellence",
    image: "/images/about-industrial.png",
    badgeStatusLabel: "PHASE_VALIDATED",
    ctaLabel: "TECHNICAL PORTFOLIO",
    stats: [
      { id: "01", label: "MANUFACTURED", value: "500K+", detail: "ELITE UNITS" },
      { id: "02", label: "FACILITY", value: "50K", detail: "SQ.FT PRECISION" }
    ]
  },
  experienceCenter: {
    tag: "Physical Verification",
    title1: "Tactile",
    title2: "Precision.",
    description: "Visit our state-of-the-art facility to experience the mechanical superiority of Xindo systems firsthand.",
    image: "/images/experience-center.png",
    watermark: "X-CENTER",
    ambientLabel: AUTHENTICITY_LABEL,
    ctaText: "SCHEDULE FACILITY TOUR",
    stats: [
      { id: "01", label: "SHOWROOM", value: "3D", detail: "Virtual Model" },
      { id: "02", label: "TOLERANCE", value: "±0.1", detail: "MM Precision" }
    ]
  },
  benefits: {
    tag: "THE PREMIUM CHOICE",
    title: "ABSOLUTE BENCHMARKS OF ENGINEERING",
    items: [
      { id: "01", label: "GERMAN", value: "PRECISION", detail: "DIN EN 12608 STANDARDS" },
      { id: "02", label: "THERMAL", value: "ISOLATION", detail: "MULTI-CHAMBERED CORE" },
      { id: "03", label: "ACOUSTIC", value: "SILENCE", detail: "40DB NOISE REDUCTION" },
      { id: "04", label: "STORM", value: "RESISTANT", detail: "2.5KPA WIND TOLERANCE" }
    ]
  },
  products: FALLBACK_PRODUCTS,
  registry: {
    '01': ['ELITE-70', 'MAJESTY-SLIDE', 'HERITAGE-60'],
    '02': ['PRIME-50', 'ECO-LITE', 'SMART-GLAZE'],
    '03': ['LUX-FRAME', 'VISION-PANEL', 'ULTRA-SLIM']
  },
  trustSection: {
    tag: 'Strategic Nodes',
    title1: 'Ecosystem',
    title2: 'Collaboration.',
    logos: [
      { name: 'Architectural Digest', detail: 'Feature Design' },
      { name: 'Lumière Foundry', detail: 'Precision Partner' },
      { name: 'De-Tech Systems', detail: 'Hardware Core' }
    ],
    certifications: [
      { id: '01', name: 'ISO 9001:2015', detail: 'Global Quality Management Protocol' },
      { id: '02', name: 'DIN EN 12608', detail: 'German Technical Profile Standard' },
      { id: '03', name: 'GS CERTIFIED', detail: 'Safety & Material Validation' }
    ],
    efficiencyMetric: '99.8%',
    protocolMetric: 'GER',
    validationTag: 'Validation',
    uptimeLabel: 'TECHNICAL UPTIME',
    protocolLabel: 'CORE PROTOCOL'
  },
  testimonials: {
    tag: "Channel 06: Client Feedback",
    items: [
      { author: 'Arul O', text: "FAST DELIVERY AND WINTECH PROFILE PRECISION. XINDO REPRESENTS THE ABSOLUTE BENCHMARK IN FENESTRATION." },
      { author: 'Bharathi ChandraSekhar', text: "EXCEPTIONAL ARCHITECTURAL EXECUTION. COMPLICATED DESIGN CHALLENGES MET WITH TECHNICAL MASTERY." },
      { author: 'Hari Babu R', text: "OFFICE INFRASTRUCTURE UPGRADED WITH SUPERIOR QUALITY. RELIABLE, REASONABLE, AND REMARKABLE." },
      { author: 'Vijayalakshmanan S', text: "CUSTOMIZED TO PERFECTION. THE MODULAR PRECISION MEETS EVERY SPECIFICATION OF MY VISION." }
    ]
  },
  clientsMarquee: {
    tag: "Strategic Partners",
    clients: ['Royal Splendour', 'Pacifica Companies', 'KG Foundations', 'Janani Homes', 'Jain Housing']
  },
  quoteForm: {
    tag: 'Channel 08',
    titleLine1: 'Initialize',
    titleLine2: 'Technical Query',
    description: 'Our engineering desk will process your architectural requirements within 24 standard cycles.',
    watermark: 'XINDO-PROTOCOL-08',
    submitText: 'EXECUTE REQUEST',
    successTitle: 'PROTOCOL COMMENCED',
    successMessage: 'Your technical query is being analyzed by our engineering team.',
    phone: '+91 94440 45544',
    address: 'No. 4/33, Mettukuppam Road, Via Maduravoyal, Chennai – 600 095.',
    responseStatus: '24H RESPONSE TIME',
    standardStatus: 'GLOBAL ISO STANDARDS',
    formLabels: {
      name: "ARCHITECT/CLIENT NAME",
      email: "COMMUNICATION PROTOCOL (EMAIL)",
      phone: "TECHNICAL CHANNEL (PHONE)",
      project: "PROJECT IDENTIFIER (M2/SQFT)",
      type: "SYSTEM SERIES (U-PVC/ALU)",
      message: "ARCHITECTURAL SPECIFICATIONS",
      submit: "EXECUTE REQUEST",
      placeholderName: "Enter full name...",
      placeholderEmail: "email@protocol.com",
      placeholderPhone: "+91 00000 00000",
      placeholderProject: "e.g. 5000",
      placeholderType: "Select series...",
      placeholderMessage: "Specify requirements..."
    }
  }
};
 
export const FALLBACK_ABOUT_DATA: WPAboutPageData = {
  hero: {
    chipText: "Technical Heritage",
    headlineLine1: ["The", "Legacy"],
    headlineLine2: ["Of", "Precision"],
    subtext: "Three decades of engineering mastery, reimagined for the modern architectural era.",
    ctaPrimaryText: "Consult Technical Hub",
    ctaSecondaryText: "Quality Standards",
    ctaSecondaryLink: "#quality-standards",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4",
    bgImage: "/images/hero-bg.png",
    watermark1: "LEGACY",
    watermark2: "PRECISION"
  },
  about: FALLBACK_HOME_DATA.about,
  process: {
    tag: "TECHNICAL WORKFLOW",
    steps: [
      { id: "01", title: "Consultation", desc: "Technical specifications analysis", status: "PHASE_01" },
      { id: "02", title: "Engineering", desc: "Precision custom profiling", status: "PHASE_02" },
      { id: "03", title: "Installation", desc: "Certified airtight deployment", status: "PHASE_03" }
    ]
  },
  benefits: FALLBACK_HOME_DATA.benefits
};
 
export async function getGlobalSettings(): Promise<WPGlobalSettings> {
  return FALLBACK_GLOBAL_SETTINGS;
}
 
export async function getHomePageData(): Promise<WPHomePageData> {
  return FALLBACK_HOME_DATA;
}
 
export async function getAboutPageData(): Promise<WPAboutPageData> {
  return FALLBACK_ABOUT_DATA;
}
 
export async function getProductsPageData(): Promise<WPProductsPageData> {
    return {
      hero: {
        chipText: "System Catalog",
        headlineLine1: ["Elite"],
        headlineLine2: ["Systems"],
        subtext: "Explore our comprehensive range of high-performance uPVC and Aluminum fenestration protocols.",
        ctaPrimaryText: "Consult Technical Hub",
        ctaSecondaryText: "Quality Standards",
        ctaSecondaryLink: "#quality-standards",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4",
        bgImage: "/images/hero-bg.png",
        watermark1: "SYSTEMS",
        watermark2: "ELITE"
      },
      products: FALLBACK_PRODUCTS,
      registry: FALLBACK_HOME_DATA.registry,
      benefits: FALLBACK_HOME_DATA.benefits
    };
}
 
export async function getInfrastructurePageData(): Promise<WPInfrastructurePageData> {
  return {
    hero: {
      chipText: "Technical Foundation",
      headlineLine1: ["Advanced"],
      headlineLine2: ["Manufacturing"],
      subtext: "Our state-of-the-art facility represents the physical realization of German engineering excellence.",
      ctaPrimaryText: "Consult Technical Hub",
      ctaSecondaryText: "Quality Standards",
      ctaSecondaryLink: "#quality-standards",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4",
      bgImage: "/images/hero-bg.png",
      watermark1: "INFRA",
      watermark2: "CORE"
    },
    tag: "THE FACILITY",
    title: "Precision in Production.",
    description: "Every Xindo profile is manufactured within our 50,000 sq.ft facility using globally certified CNC protocols.",
    watermark: "FAB-GRID",
    stats: [
      { id: "01", label: "PLANT AREA", value: "50K", detail: "SQ.FT PRECISION" },
      { id: "02", label: "CAPACITY", value: "10K+", detail: "MONTHLY UNITS" }
    ]
  };
}

export async function getGalleryPageData(): Promise<WPGalleryPageData> {
    return {
        hero: {
            chipText: "Project Registry",
            headlineLine1: ["Visual"],
            headlineLine2: ["Portfolio"],
            subtext: "A curated collection of architectural achievements powered by Xindo systems.",
            ctaPrimaryText: "Consult Technical Hub",
            ctaSecondaryText: "Quality Standards",
            ctaSecondaryLink: "#quality-standards",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4",
            bgImage: "/images/hero-bg.png",
            watermark1: "VISUAL",
            watermark2: "PROOF"
        },
        categories: [
            { id: "residential", name: "Residential Elite" },
            { id: "commercial", name: "Commercial Prime" }
        ],
        projects: [
            { id: "01", name: "Lakeside Villa", categoryId: "residential", image: "/images/project-1.png", detail: "Custom Casement Deployment" }
        ]
    };
}

export async function getContactPageData(): Promise<WPContactPageData> {
    return {
        hero: {
            chipText: "Communication Hub",
            headlineLine1: ["Direct"],
            headlineLine2: ["Access"],
            subtext: "Initialize a technical dialogue with our engineering desk for your upcoming project.",
            ctaPrimaryText: "Consult Technical Hub",
            ctaSecondaryText: "Quality Standards",
            ctaSecondaryLink: "#quality-standards",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4",
            bgImage: "/images/hero-bg.png",
            watermark1: "CONNECT",
            watermark2: "PROTOCOL"
        },
        about: FALLBACK_HOME_DATA.about,
        documentation: {
            title: "Technical Documentation",
            desc: "For commercial technical specifications and bulk procurement protocols, please request the latest CAD/BIM library from our engineering hub."
        },
        quoteForm: FALLBACK_HOME_DATA.quoteForm
    };
}

export async function getClientsPageData(): Promise<WPClientsPageData> {
    return {
        hero: {
            chipText: "Strategic Network",
            headlineLine1: ["Our"],
            headlineLine2: ["Partners"],
            subtext: "A testament to excellence through high-value architectural partnerships.",
            ctaPrimaryText: "Consult Technical Hub",
            ctaSecondaryText: "Quality Standards",
            ctaSecondaryLink: "#quality-standards",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-4475-large.mp4",
            bgImage: "/images/hero-bg.png",
            watermark1: "PARTNERS",
            watermark2: "NETWORK"
        },
        about: {
            tag: "Corporate Synergy",
            title: "Scaling Engineering Excellence.",
            description1: "We collaborate with the nation's leading architectural firms and infrastructure developers to redefine quality in Indian living spaces.",
            description2: "Our partnership model is built on mutual precision and certified engineering protocols.",
            badgeNumber: "150+",
            badgeText: "High-Profile Deployments",
            image: "/images/about-industrial.png",
            badgeStatusLabel: "NETWORK_ACTIVE"
        },
        clientsMarquee: FALLBACK_HOME_DATA.clientsMarquee,
        testimonials: FALLBACK_HOME_DATA.testimonials,
        partners: [
            { name: "Artha Infracon", logo: "/logos/artha.png", detail: "Elite Infrastructure" }
        ]
    };
}
