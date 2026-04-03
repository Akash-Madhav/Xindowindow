import { NextResponse } from 'next/server';
import { 
  FALLBACK_GLOBAL_SETTINGS, 
  FALLBACK_HOME_DATA, 
  FALLBACK_ABOUT_DATA,
  FALLBACK_PRODUCTS
} from '@/lib/wordpress';

export async function GET() {
  try {
    // Construct all the fallback data exactly as defined in the fallback returns
    const allData = {
      global: FALLBACK_GLOBAL_SETTINGS,
      home: FALLBACK_HOME_DATA,
      about: FALLBACK_ABOUT_DATA,
      productsPage: {
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
      },
      infrastructure: {
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
      },
      gallery: {
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
      },
      contact: {
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
      },
      clients: {
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
      }
    };

    const apiUrl = process.env.WORDPRESS_API_URL || 'http://localhost/wordpress/wp-json';
    
    console.log("Seeding data to WP at:", `${apiUrl}/xindo/v1/sync`);
    
    const res = await fetch(`${apiUrl}/xindo/v1/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(allData)
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ success: true, wpResponse: data, seededData: allData });
    } else {
      const text = await res.text();
      return NextResponse.json({ success: false, error: text }, { status: res.status });
    }

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
