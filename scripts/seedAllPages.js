import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import AboutPage from '../models/AboutPage.js';
import ServicesPage from '../models/ServicesPage.js';
import EprPage from '../models/EprPage.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Events Data
const eventsData = [
  { 
    title: "Dev Dynaneshwar Society E-Waste Collection Drive", 
    location: "Andheri",
    description: "Community e-waste collection initiative",
    date: new Date('2024-03-15'),
    image: "https://example.com/events.png"
  },
  { 
    title: "Corporate E-Waste Awareness Workshop", 
    location: "Bandra",
    description: "Educational workshop for corporate sector",
    date: new Date('2024-04-10'),
    image: "https://example.com/events.png"
  },
  { 
    title: "Mumbai IT Park Recycling Initiative", 
    location: "Powai",
    description: "Large-scale IT park recycling program",
    date: new Date('2024-05-20'),
    image: "https://example.com/events.png"
  },
  { 
    title: "School Electronics Recycling Program", 
    location: "Malad",
    description: "Educational institution e-waste drive",
    date: new Date('2024-06-05'),
    image: "https://example.com/events.png"
  },
  { 
    title: "Residential Complex Collection Campaign", 
    location: "Kandivali",
    description: "Residential area collection drive",
    date: new Date('2024-07-12'),
    image: "https://example.com/events.png"
  },
  { 
    title: "Government Office E-Waste Drive", 
    location: "Churchgate",
    description: "Government sector recycling initiative",
    date: new Date('2024-08-18'),
    image: "https://example.com/events.png"
  },
];

// About Page Data
const aboutPageData = {
  hero: {
    title: "About E-Incarnation",
    subtitle: "Transforming E-Waste into Environmental Excellence",
    backgroundImage: "https://example.com/hero-bg.png"
  },
  intro: {
    title: "Trusted Partner for Secure & Sustainable E-Waste Recycling",
    description1: "E-Incarnation Recycling Pvt. Ltd. is an authorized e-waste recycler providing secure, compliant, and sustainable recycling solutions across India. We ensure safe e-waste disposal with strong data security, regulatory compliance, full traceability, and zero landfill practices.",
    description2: "Our structured processes, certified data destruction, and circular economy approach help organizations reduce environmental impact while managing e-waste responsibly and transparently.",
    image: "https://example.com/recycling.png"
  },
  mission: "To provide comprehensive, environmentally responsible e-waste recycling solutions that protect data security, ensure regulatory compliance, and contribute to a circular economy.",
  vision: "To be India's most trusted e-waste recycling partner, setting industry standards for environmental sustainability and data security.",
  values: [
    "Environmental Stewardship",
    "Data Security Excellence",
    "Regulatory Compliance",
    "Transparency & Traceability",
    "Innovation & Technology"
  ],
  history: {
    title: "Our History",
    description: "Founded with a vision to transform India's e-waste management landscape, E-Incarnation has grown from a small operation to one of the country's leading authorized e-waste recyclers. Our journey reflects our commitment to environmental sustainability and responsible recycling practices.",
    image1: "https://example.com/history-main.png",
    image2: "https://example.com/history-overlay.png"
  },
  team: [
    {
      name: "Shamsuddin Khan",
      position: "Director",
      bio: "Mr. Shamsuddin Khan is the Director of E-Incarnation Recycling Pvt. Ltd., with over 12 years of experience in the Information Technology (IT) sector. He holds a Bachelor of Arts (B.A.) degree and brings strong hands-on industry exposure and leadership experience.",
      image: "https://example.com/team-member.png",
      order: 1
    },
    {
      name: "Amruta Babar",
      position: "Chief Operating Officer (COO)",
      bio: "Ms. Amruta Babar is the Chief Operating Officer (COO) of E-Incarnation Recycling Pvt. Ltd. She holds a B.Sc. in Botany and a Master's degree in Environment from Griffith University, Queensland, bringing a strong academic foundation in environmental science.",
      image: "https://example.com/team-member.png",
      order: 2
    }
  ],
  stats: [
    { label: "Years of Experience", value: "10+", icon: "calendar" },
    { label: "Tons Recycled", value: "5000+", icon: "recycle" },
    { label: "Happy Clients", value: "500+", icon: "users" },
    { label: "Certifications", value: "15+", icon: "award" }
  ]
};

// Services Page Data
const servicesPageData = {
  pageTitle: "Our Services",
  pageDescription: "Comprehensive waste management and recycling solutions",
  heroImage: "https://example.com/services-hero.png",
  sections: [
    {
      title: "E-Waste Collection & Transportation",
      description: "Convenient doorstep pickup and scheduled collection services for all types of electronic waste across multiple locations with certified transportation.",
      image: "https://example.com/collection.png",
      features: [
        "Doorstep pickup service",
        "Scheduled collections",
        "Certified transportation",
        "Multi-location coverage"
      ],
      order: 1
    },
    {
      title: "Secure Data Destruction",
      description: "Certified data destruction and hard drive shredding services ensuring complete confidentiality and compliance with data protection regulations.",
      image: "https://example.com/data-security.png",
      features: [
        "Certified data wiping",
        "Physical destruction",
        "Compliance certificates",
        "Chain of custody tracking"
      ],
      order: 2
    },
    {
      title: "E-Waste Recycling",
      description: "Environmentally responsible recycling processes that recover valuable materials while ensuring zero landfill disposal of electronic components.",
      image: "https://example.com/recycle.png",
      features: [
        "Zero landfill policy",
        "Material recovery",
        "Environmental compliance",
        "Circular economy practices"
      ],
      order: 3
    },
    {
      title: "Hazardous Waste Management",
      description: "Specialized handling and safe disposal of hazardous e-waste materials including batteries, CRT monitors, and chemical components.",
      image: "https://example.com/hazardous.png",
      features: [
        "Specialized handling",
        "Safe disposal methods",
        "CPCB authorized",
        "Environmental protection"
      ],
      order: 4
    }
  ]
};

// EPR Page Data
const eprPageData = {
  hero: {
    title: "Extended Producer\nResponsibility (EPR)",
    subtitle: "Comprehensive EPR solutions for electronics manufacturers, importers, and brand owners. We help you meet your environmental obligations while focusing on your core business.",
    backgroundImage: "https://example.com/epr-hero.png"
  },
  intro: {
    title: "What is EPR?",
    description: "Extended Producer Responsibility (EPR) is an environmental policy approach where producers take responsibility for the entire lifecycle of their products, especially for take-back, recycling, and final disposal. Under the E-Waste Management Rules, 2016, every producer must obtain EPR authorization and meet collection targets.",
    image: "https://example.com/epr-intro.png"
  },
  services: [
    {
      title: "EPR Authorization",
      description: "Complete assistance in obtaining EPR authorization from Central Pollution Control Board (CPCB) for e-waste management.",
      icon: "shield",
      order: 1
    },
    {
      title: "Compliance Reporting",
      description: "Regular documentation and submission of annual returns to ensure full regulatory compliance with e-waste management rules.",
      icon: "file-check",
      order: 2
    },
    {
      title: "Collection & Recycling",
      description: "Pan-India collection network and certified recycling facilities to meet your Extended Producer Responsibility targets.",
      icon: "recycle",
      order: 3
    },
    {
      title: "Certificate Management",
      description: "Timely issuance of EPR certificates, recycling certificates, and all compliance documentation for your records.",
      icon: "award",
      order: 4
    }
  ],
  benefits: [
    "Full regulatory compliance with E-Waste Management Rules, 2016",
    "Reduced environmental liability and brand risk",
    "Cost-effective EPR solutions with transparent pricing",
    "Pan-India collection and recycling infrastructure",
    "Real-time tracking and reporting dashboard",
    "Timely submission of statutory returns and documentation"
  ],
  cta: {
    title: "Ready to Get Started?",
    description: "Contact our EPR compliance team for a free consultation. We'll help you understand your obligations and create a customized compliance plan.",
    buttonText: "Get EPR Authorization"
  }
};

const seedAllPages = async () => {
  try {
    await connectDB();

    console.log('\n🌱 Starting comprehensive database seeding...\n');

    // Clear existing data
    console.log('📦 Clearing existing page data...');
    await Event.deleteMany({});
    await AboutPage.deleteMany({});
    await ServicesPage.deleteMany({});
    await EprPage.deleteMany({});

    // Seed Events
    console.log('📅 Seeding Events...');
    const createdEvents = await Event.insertMany(eventsData);
    console.log(`✓ ${createdEvents.length} events created`);

    // Seed About Page
    console.log('ℹ️  Seeding About Page...');
    const createdAboutPage = await AboutPage.create(aboutPageData);
    console.log(`✓ About page created`);

    // Seed Services Page
    console.log('🔧 Seeding Services Page...');
    const createdServicesPage = await ServicesPage.create(servicesPageData);
    console.log(`✓ Services page created with ${servicesPageData.sections.length} sections`);

    // Seed EPR Page
    console.log('♻️  Seeding EPR Page...');
    const createdEprPage = await EprPage.create(eprPageData);
    console.log(`✓ EPR page created with ${eprPageData.services.length} services`);

    console.log('\n✅ All pages seeded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Events: ${createdEvents.length}`);
    console.log(`   - About Page: 1 (with ${aboutPageData.team.length} team members)`);
    console.log(`   - Services Page: 1 (with ${servicesPageData.sections.length} sections)`);
    console.log(`   - EPR Page: 1 (with ${eprPageData.services.length} services)`);
    console.log('\n🎯 Next Steps:');
    console.log('   1. Start backend: npm run dev (already running)');
    console.log('   2. Start frontend: cd ../Eincarnation && npm run dev');
    console.log('   3. Test pages: About, Services, EPR, Events');
    console.log('   4. Admin Panel: http://localhost:5173/adminlogin');
    console.log('   5. Test CRUD operations from Admin Panel\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAllPages();
