import mongoose from 'mongoose';
import dotenv from 'dotenv';
import EprPage from '../models/EprPage.js';

dotenv.config();

const migrateEprData = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('🔄 Migrating EPR page data...');

    // Check if EPR page already exists
    let eprPage = await EprPage.findOne();
    
    if (eprPage) {
      console.log('⚠️  EPR page already exists. Updating...');
    } else {
      console.log('📝 Creating new EPR page...');
      eprPage = new EprPage();
    }

    // Hero Section
    eprPage.hero = {
      title: 'Extended Producer\nResponsibility (EPR)',
      subtitle: 'Comprehensive EPR solutions for electronics manufacturers, importers, and brand owners. We help you meet your environmental obligations while focusing on your core business.',
      image: '',
      imagePublicId: ''
    };

    // Brochure Link (empty by default - admin will add)
    eprPage.brochureLink = '';

    // What is EPR Section
    eprPage.whatIsEpr = {
      title: 'What is EPR?',
      paragraphs: [
        'Extended Producer Responsibility (EPR) is an environmental policy approach where producers take responsibility for the entire lifecycle of their products, especially for take-back, recycling, and final disposal.',
        'Under the E-Waste Management Rules, 2016, every producer of electrical and electronic equipment (EEE) must obtain EPR authorization from the Central Pollution Control Board (CPCB) and meet collection and recycling targets.',
        'E-Incarnation helps you navigate these requirements with end-to-end EPR compliance services.'
      ],
      image: '',
      imagePublicId: ''
    };

    // Coverage Items
    eprPage.coverage = [
      { item: 'IT & Telecommunication Equipment', order: 0 },
      { item: 'Consumer Electronics', order: 1 },
      { item: 'Medical Equipment', order: 2 },
      { item: 'Electrical & Electronic Equipment', order: 3 },
      { item: 'LED & Compact Fluorescent Lamps', order: 4 }
    ];

    // EPR Services
    eprPage.services = [
      {
        title: 'EPR Authorization',
        description: 'Complete assistance in obtaining EPR authorization from Central Pollution Control Board (CPCB) for e-waste management.',
        icon: 'Shield',
        order: 0
      },
      {
        title: 'Compliance Reporting',
        description: 'Regular documentation and submission of annual returns to ensure full regulatory compliance with e-waste management rules.',
        icon: 'FileCheck',
        order: 1
      },
      {
        title: 'Collection & Recycling',
        description: 'Pan-India collection network and certified recycling facilities to meet your Extended Producer Responsibility targets.',
        icon: 'Recycle',
        order: 2
      },
      {
        title: 'Certificate Management',
        description: 'Timely issuance of EPR certificates, recycling certificates, and all compliance documentation for your records.',
        icon: 'Award',
        order: 3
      }
    ];

    // Compliance Process Steps
    eprPage.complianceSteps = [
      {
        step: '01',
        title: 'Registration & Authorization',
        description: 'We assist producers in registering with CPCB and obtaining EPR authorization for e-waste management.',
        order: 0
      },
      {
        step: '02',
        title: 'Target Allocation',
        description: 'Help determine collection targets based on your product sales and ensure compliance with mandated percentages.',
        order: 1
      },
      {
        step: '03',
        title: 'Collection Network',
        description: 'Establish pan-India collection points and reverse logistics for efficient e-waste collection from end-users.',
        order: 2
      },
      {
        step: '04',
        title: 'Certified Recycling',
        description: 'Process collected e-waste at authorized facilities with environmentally sound recycling practices.',
        order: 3
      },
      {
        step: '05',
        title: 'Documentation & Reporting',
        description: 'Maintain records, submit annual returns, and provide EPR certificates demonstrating compliance.',
        order: 4
      }
    ];

    // Benefits
    eprPage.benefits = [
      { benefit: 'Full regulatory compliance with E-Waste Management Rules, 2016', order: 0 },
      { benefit: 'Reduced environmental liability and brand risk', order: 1 },
      { benefit: 'Cost-effective EPR solutions with transparent pricing', order: 2 },
      { benefit: 'Pan-India collection and recycling infrastructure', order: 3 },
      { benefit: 'Real-time tracking and reporting dashboard', order: 4 },
      { benefit: 'Timely submission of statutory returns and documentation', order: 5 }
    ];

    // CTA Section
    eprPage.ctaSection = {
      title: 'Ready to Get Started?',
      description: 'Contact our EPR compliance team for a free consultation. We\'ll help you understand your obligations and create a customized compliance plan.',
      stats: [
        { icon: 'Shield', text: 'CPCB Authorized Recycler' },
        { icon: 'Award', text: 'ISO 9001 & 14001 Certified' },
        { icon: 'Recycle', text: '10+ Years Experience' }
      ]
    };

    await eprPage.save();

    console.log('✅ EPR page data migrated successfully!\n');
    console.log('📊 Summary:');
    console.log(`   Coverage Items: ${eprPage.coverage.length}`);
    console.log(`   Services: ${eprPage.services.length}`);
    console.log(`   Compliance Steps: ${eprPage.complianceSteps.length}`);
    console.log(`   Benefits: ${eprPage.benefits.length}`);
    console.log('\n🎉 You can now manage EPR page content from the Admin Panel!');
    console.log('   Navigate to: http://localhost:5173/admin/dashboard');
    console.log('   → EPR Page\n');

  } catch (error) {
    console.error('❌ Error migrating EPR data:', error);
  } finally {
    console.log('👋 Database connection closed');
    await mongoose.connection.close();
    process.exit(0);
  }
};

migrateEprData();
