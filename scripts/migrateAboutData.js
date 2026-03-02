import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AboutPage from '../models/AboutPage.js';

dotenv.config();

// Existing team data from frontend
const teamData = [
  {
    type: "member",
    name: "Shamsuddin Khan",
    role: "Director – E-Incarnation Recycling Pvt. Ltd.",
    description: "Mr. Shamsuddin Khan is the Director of E-Incarnation Recycling Pvt. Ltd., with over 12 years of experience in the Information Technology (IT) sector. He holds a Bachelor of Arts (B.A.) degree and brings strong hands-on industry exposure and leadership experience. With deep expertise in IT systems, technology lifecycle management, and operational efficiency, he plays a key role in shaping the company's strategic vision and operations. His leadership drives ethical recycling, data security, environmental compliance, and circular economy initiatives, strengthening the organization's commitment to innovation and long-term sustainability.",
    reverse: false,
    order: 0
  },
  {
    type: "member",
    name: "Amruta Babar",
    role: "Chief Operating Officer (COO) – E-Incarnation Recycling Pvt. Ltd.",
    description: "Ms. Amruta Babar is the Chief Operating Officer (COO) of E-Incarnation Recycling Pvt. Ltd. She holds a B.Sc. in Botany and a Master's degree in Environment from Griffith University, Queensland, bringing a strong academic foundation in environmental science. With over 15 years of experience in the e-waste recycling industry and 12 years with E-Incarnation, she has deep expertise in regulatory compliance, process optimization, and operational excellence.",
    reverse: true,
    order: 1
  },
  {
    type: "feature",
    title: "Our Commitment to Excellence",
    description: "Under the leadership of our experienced management team, E-Incarnation continues to set industry standards in e-waste recycling. We combine technical expertise with environmental consciousness to deliver sustainable solutions that benefit both our clients and the planet. Our team's dedication ensures every project meets the highest standards of quality, compliance, and environmental responsibility.",
    order: 2
  }
];

// Existing certifications data from frontend
const certificationsData = [
  {
    id: "ISO 9001",
    name: "ISO 9001",
    description: "We follow globally recognized quality standards to ensure consistent excellence in our products and services. Customer satisfaction and continuous improvement are at the heart of everything we do.",
    text: "We follow globally recognized quality standards to ensure consistent excellence in our products and services. Customer satisfaction and continuous improvement are at the heart of everything we do.",
    order: 0
  },
  {
    id: "ISO 14001",
    name: "ISO 14001",
    description: "We are committed to minimizing environmental impact through responsible and sustainable practices. Our operations strictly follow international environmental safety standards.",
    text: "We are committed to minimizing environmental impact through responsible and sustainable practices. Our operations strictly follow international environmental safety standards.",
    order: 1
  },
  {
    id: "SEEPZ",
    name: "SEEPZ",
    description: "We are an authorized SEEPZ unit, enabling efficient export-oriented operations and global trade compliance. This approval ensures faster processing, tax benefits, and seamless international business.",
    text: "We are an authorized SEEPZ unit, enabling efficient export-oriented operations and global trade compliance. This approval ensures faster processing, tax benefits, and seamless international business.",
    order: 2
  },
  {
    id: "MPCB",
    name: "MPCB",
    description: "We operate in compliance with MPCB norms to control pollution and protect the environment. Our processes meet regulatory standards for safety, waste management, and emissions.",
    text: "We operate in compliance with MPCB norms to control pollution and protect the environment. Our processes meet regulatory standards for safety, waste management, and emissions.",
    order: 3
  }
];

async function migrateAboutData() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if AboutPage document exists
    let aboutPage = await AboutPage.findOne();

    if (!aboutPage) {
      console.log('📝 Creating new AboutPage document...');
      aboutPage = new AboutPage({
        pageTitle: 'About Us',
        team: [],
        certifications: []
      });
    }

    // Migrate team data
    console.log('\n🔄 Migrating team data...');
    if (aboutPage.team.length === 0) {
      aboutPage.team = teamData;
      console.log(`✅ Added ${teamData.length} team members`);
    } else {
      console.log(`ℹ️  Team data already exists (${aboutPage.team.length} members). Skipping...`);
    }

    // Migrate certifications data
    console.log('\n🔄 Migrating certifications data...');
    if (aboutPage.certifications.length === 0) {
      aboutPage.certifications = certificationsData;
      console.log(`✅ Added ${certificationsData.length} certifications`);
    } else {
      console.log(`ℹ️  Certifications data already exists (${aboutPage.certifications.length} certs). Skipping...`);
    }

    // Save to database
    await aboutPage.save();
    console.log('\n✅ Migration completed successfully!');
    
    console.log('\n📊 Summary:');
    console.log(`   Team Members: ${aboutPage.team.length}`);
    console.log(`   Certifications: ${aboutPage.certifications.length}`);
    
    console.log('\n🎉 You can now view and edit this data in the Admin Panel!');
    console.log('   Navigate to: http://localhost:5173/admin/dashboard');
    console.log('   → About Us Page → Core Team');
    console.log('   → About Us Page → Certifications');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

// Run migration
migrateAboutData();
