import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ServicesPage from '../models/ServicesPage.js';

dotenv.config();

// Existing process data from frontend
const processSteps = [
  { title: "Collection and Pickup", description: "Scheduled e-waste collection from corporates, institutions, and households.", order: 0 },
  { title: "Secure Transportation", description: "Safe transport to authorized facilities as per CPCB norms.", order: 1 },
  { title: "Inspection & Segregation", description: "Material is weighed, inspected, and categorized for recycling.", order: 2 },
  { title: "Refurbishment & Reuse", description: "Repairable items are refurbished to extend product life.", order: 3 },
  { title: "Dismantling", description: "Non-repairable items are dismantled to separate components.", order: 4 },
  { title: "Material Recovery", description: "Recovery of metals, plastics, and valuable resources.", order: 5 },
  { title: "Hazardous Waste Management", description: "Safe handling and disposal of hazardous e-waste materials.", order: 6 },
  { title: "Responsible Recycling", description: "Environmentally responsible recycling as per regulations.", order: 7 },
  { title: "Documentation & Certification", description: "Compliance documents and recycling certificates provided.", order: 8 },
];

async function migrateServicesProcess() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if ServicesPage document exists
    let servicesPage = await ServicesPage.findOne();

    if (!servicesPage) {
      console.log('📝 Creating new ServicesPage document...');
      servicesPage = new ServicesPage({
        pageTitle: 'Our Services',
        pageDescription: 'Comprehensive waste management and recycling solutions',
        recyclingProcess: {
          title: 'Our Recycling Process',
          description: 'Our process ensures safe, compliant e-waste handling with maximum resource recovery.',
          steps: []
        }
      });
    }

    // Migrate recycling process data
    console.log('\n🔄 Migrating recycling process data...');
    if (!servicesPage.recyclingProcess || servicesPage.recyclingProcess.steps.length === 0) {
      servicesPage.recyclingProcess = {
        title: 'Our Recycling Process',
        description: 'Our process ensures safe, compliant e-waste handling with maximum resource recovery.',
        steps: processSteps
      };
      console.log(`✅ Added ${processSteps.length} process steps`);
    } else {
      console.log(`ℹ️  Recycling process data already exists (${servicesPage.recyclingProcess.steps.length} steps). Skipping...`);
    }

    // Save to database
    await servicesPage.save();
    console.log('\n✅ Migration completed successfully!');
    
    console.log('\n📊 Summary:');
    console.log(`   Process Title: ${servicesPage.recyclingProcess.title}`);
    console.log(`   Process Steps: ${servicesPage.recyclingProcess.steps.length}`);
    
    console.log('\n🎉 You can now view and edit this data in the Admin Panel!');
    console.log('   Navigate to: http://localhost:5173/admin/dashboard');
    console.log('   → Services Page → Recycling Process');

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
migrateServicesProcess();
