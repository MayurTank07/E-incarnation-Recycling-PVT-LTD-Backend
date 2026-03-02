import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';
import Client from '../models/Client.js';
import Testimonial from '../models/Testimonial.js';

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

// Services data from the frontend
const services = [
  { 
    title: "Collection", 
    buttonText: "Contact Us", 
    icon: "https://example.com/collection.png",
    description: "Convenient doorstep pickup and scheduled collection services for all types of electronic waste across multiple locations."
  },
  { 
    title: "Data Security", 
    buttonText: "Contact Us", 
    icon: "https://example.com/encrypted.png",
    description: "Certified data destruction and hard drive shredding services ensuring complete confidentiality and compliance with data protection regulations."
  },
  { 
    title: "Recycle", 
    buttonText: "Contact Us", 
    icon: "https://example.com/recycling.png",
    description: "Environmentally responsible recycling processes that recover valuable materials while ensuring zero landfill disposal of electronic components."
  },
  { 
    title: "Hazardous Waste", 
    buttonText: "Contact Us", 
    icon: "https://example.com/danger.png",
    description: "Specialized handling and safe disposal of hazardous e-waste materials including batteries, CRT monitors, and chemical components."
  },
  { 
    title: "Metal Recovery", 
    buttonText: "Contact Us", 
    icon: "https://example.com/gears.png",
    description: "Advanced metal extraction and recovery processes to reclaim precious metals and reduce environmental impact through circular economy practices."
  },
  { 
    title: "EPR", 
    buttonText: "View More", 
    icon: "https://example.com/recycling.png",
    description: "Complete Extended Producer Responsibility compliance services including documentation, reporting, and target achievement for manufacturers."
  },
];

// Client logos data
const clients = [
  { 
    name: "Client 1",
    logo: "https://example.com/logo1.png",
    order: 1
  },
  { 
    name: "Client 2",
    logo: "https://example.com/logo2.png",
    order: 2
  },
  { 
    name: "Client 3",
    logo: "https://example.com/logo3.png",
    order: 3
  },
  { 
    name: "Client 4",
    logo: "https://example.com/logo4.png",
    order: 4
  },
  { 
    name: "Client 5",
    logo: "https://example.com/logo5.png",
    order: 5
  },
  { 
    name: "Client 6",
    logo: "https://example.com/logo6.png",
    order: 6
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Lihov Sergey",
    position: "UI/UX Designer",
    testimonial: "Motion Elements is the best online site to download AE templates for free. Choose from free templates for After Effects, free videos and free music. Our elements are commission-free, you can use them in various projects, in any type of media around the world. Get Free Bookmarklet Items.",
    rating: 5,
    image: "https://example.com/human.png",
    company: "Creative Solutions Inc.",
    order: 1
  },
  {
    name: "Nitin Sharma",
    position: "React Developer",
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 5,
    image: "https://example.com/human.png",
    company: "Tech Innovations Ltd.",
    order: 2
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Service.deleteMany({});
    await Client.deleteMany({});
    await Testimonial.deleteMany({});

    // Seed Services
    console.log('Seeding services...');
    const createdServices = await Service.insertMany(services);
    console.log(`✓ ${createdServices.length} services created`);

    // Seed Clients
    console.log('Seeding clients...');
    const createdClients = await Client.insertMany(clients);
    console.log(`✓ ${createdClients.length} clients created`);

    // Seed Testimonials
    console.log('Seeding testimonials...');
    const createdTestimonials = await Testimonial.insertMany(testimonials);
    console.log(`✓ ${createdTestimonials.length} testimonials created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can now:');
    console.log('1. Start the backend: npm run dev');
    console.log('2. Access admin panel at http://localhost:5173/adminlogin');
    console.log('3. Manage content from the Admin Panel');
    console.log('4. Changes will reflect immediately on the frontend\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
