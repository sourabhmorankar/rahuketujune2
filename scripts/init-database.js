import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse .env.local file
function loadEnvFile() {
  try {
    const envPath = join(__dirname, '..', '.env.local');
    const envFile = readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envFile.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Error reading .env.local file:', error.message);
    console.error('Make sure .env.local exists and contains your Firebase configuration');
    process.exit(1);
  }
}

// Load environment variables
const env = loadEnvFile();

// Firebase configuration
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// Validate configuration
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  console.error('❌ Missing Firebase configuration keys:', missingKeys);
  console.error('Please check your .env.local file');
  process.exit(1);
}

console.log('🔥 Firebase configuration loaded successfully');
console.log(`📡 Project ID: ${firebaseConfig.projectId}`);

// Import Firebase after configuration is validated
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initializeDatabase() {
  try {
    console.log('🚀 Starting database initialization...');
    console.log('📦 Connected to Firestore database');

    // 1. Create BioCluster Cards
    console.log('📝 Creating bioCluster cards...');
    
    // Welcome Card
    await setDoc(doc(db, 'bioCluster', 'welcome'), {
      cardType: 'welcome',
      title: 'Welcome',
      isActive: true,
      position: { x: 0, y: 0, width: 2, height: 1 },
      content: {
        welcome: {
          message: 'Welcome to my interactive portfolio',
          animation: 'typing',
          brandColors: ['#3B82F6', '#8B5CF6', '#06B6D4']
        }
      },
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        version: 1
      }
    });
    console.log('  ✅ Welcome card created');
    // Bio Card
    await setDoc(doc(db, 'bioCluster', 'bio'), {
      cardType: 'bio',
      title: 'About Rahul',
      isActive: true,
      position: { x: 2, y: 0, width: 3, height: 2 },
      content: {
        bio: {
          name: 'Rahul Nangare',
          tagline: 'Sr Cloud Network & Automation Engineer',
          position: 'Senior Cloud Network & Automation Engineer',
          location: 'Pune, Maharashtra, India',
          profileImage: '/images/rahul-profile.jpg',
          personalStory: 'Experienced network engineer with over 10 years in managing enterprise network infrastructure. Specialized in cloud automation, network troubleshooting, and modern infrastructure solutions.',
          missionStatement: 'Bridging the gap between traditional networking and modern cloud infrastructure through automation and innovation.',
          socialLinks: [
            { platform: 'linkedin', url: 'https://in.linkedin.com/in/rahul-nangare', icon: 'linkedin' },
            { platform: 'email', url: 'mailto:rahulnangare93@gmail.com', icon: 'email' }
          ],
          contactInfo: {
            email: 'rahulnangare93@gmail.com',
            phone: '+91 7588378020',
            website: 'https://rahulnangare.com'
          },
          timeline: [
            { year: '2020', title: 'Sr Cloud Network & Automation Engineer at Nice CXone', description: 'Leading cloud infrastructure and automation initiatives', milestone: true },
            { year: '2019', title: 'L2 Network Operations Engineer at Varian Medical Systems', description: 'Managing enterprise network infrastructure', milestone: false },
            { year: '2017', title: 'Network and Security Engineer at FIS Global', description: 'Data center network management', milestone: false },
            { year: '2014', title: 'Network Executive at Tata Communications', description: 'Backbone network operations', milestone: true }
          ]
        }
      },
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        version: 1
      }
    });
    console.log('  ✅ Bio card created');

    // Skills Card
    await setDoc(doc(db, 'bioCluster', 'skills'), {
      cardType: 'skills',
      title: 'Technical Skills',
      isActive: true,
      position: { x: 5, y: 0, width: 3, height: 2 },
      content: {
        skills: {
          categories: [
            {
              name: 'Network Infrastructure',
              skills: [
                { name: 'Juniper Routers & Switches', icon: 'network', proficiency: 90, yearsOfExperience: 8, certifications: ['JNCIA-Junos', 'JNCIA-Cloud'], description: 'Expert in Juniper network devices' },
                { name: 'Arista Switches', icon: 'switch', proficiency: 85, yearsOfExperience: 6, certifications: [], description: 'Advanced configuration and troubleshooting' },
                { name: 'Palo Alto Firewalls', icon: 'shield', proficiency: 88, yearsOfExperience: 7, certifications: [], description: 'Security policy management and troubleshooting' },
                { name: 'F5 Load Balancers', icon: 'balance', proficiency: 80, yearsOfExperience: 5, certifications: [], description: 'Load balancing and application delivery' }
              ]
            },
            {
              name: 'Cloud & Automation',
              skills: [
                { name: 'AWS', icon: 'aws', proficiency: 85, yearsOfExperience: 4, certifications: ['AWS Certified Advanced Networking–Specialty'], description: 'Amazon Web Services networking' },
                { name: 'Azure', icon: 'azure', proficiency: 75, yearsOfExperience: 3, certifications: ['Azure Fundamentals'], description: 'Microsoft Azure cloud platform' },
                { name: 'Python Scripting', icon: 'python', proficiency: 80, yearsOfExperience: 5, certifications: [], description: 'Network automation and scripting' },
                { name: 'Ansible', icon: 'automation', proficiency: 78, yearsOfExperience: 4, certifications: [], description: 'Infrastructure automation' }
              ]
            }
          ]
        }
      },
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        version: 1
      }
    });
    console.log('  ✅ Skills card created');
    // Experience Card
    await setDoc(doc(db, 'bioCluster', 'experience'), {
      cardType: 'experience',
      title: 'Professional Experience',
      isActive: true,
      position: { x: 0, y: 2, width: 4, height: 2 },
      content: {
        experience: {
          positions: [
            {
              company: 'Nice CXone',
              position: 'Sr Cloud Network & Automation Engineer',
              location: { city: 'Pune', country: 'India', coordinates: { lat: 18.5204, lng: 73.8567 } },
              startDate: new Date('2020-09-28'),
              endDate: null,
              description: 'Working with on-premises and cloud network resources, handling firewall policies, and automating network tasks.',
              achievements: ['MVP award for automating network tasks (Aug 2023)', 'SME for Juniper devices & Network Automation'],
              technologies: ['Python', 'Ansible', 'AWS', 'Juniper', 'Palo Alto'],
              companyLogo: '/images/companies/nice-cxone.png'
            },
            {
              company: 'Varian Medical Systems',
              position: 'L2 Network Operations Engineer',
              location: { city: 'Pune', country: 'India', coordinates: { lat: 18.5204, lng: 73.8567 } },
              startDate: new Date('2019-09-26'),
              endDate: new Date('2020-09-25'),
              description: 'Managing enterprise network devices including routers, switches, firewalls, and VPN gateways.',
              achievements: ['Employee of the Quarter (Apr 2021)', 'Network infrastructure modernization'],
              technologies: ['Network Infrastructure', 'VPN', 'Wireless', 'Python'],
              companyLogo: '/images/companies/varian.png'
            }
          ]
        }
      },
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        version: 1
      }
    });
    console.log('  ✅ Experience card created');

    // Medals Card
    await setDoc(doc(db, 'bioCluster', 'medals'), {
      cardType: 'medals',
      title: 'Achievements & Certifications',
      isActive: true,
      position: { x: 4, y: 2, width: 4, height: 1 },
      content: {
        medals: {
          achievements: [
            {
              title: 'AWS Certified Advanced Networking–Specialty',
              image: '/images/certs/aws-advanced-networking.png',
              description: 'Advanced networking certification from Amazon Web Services',
              date: new Date('2023-01-01'),
              category: 'certification',
              verificationUrl: 'https://aws.amazon.com/certification/'
            },
            {
              title: 'CCNA Certification',
              image: '/images/certs/ccna.png',
              description: 'Cisco Certified Network Associate',
              date: new Date('2020-01-01'),
              category: 'certification',
              verificationUrl: 'https://cisco.com/certification/'
            },
            {
              title: 'MVP Award - Network Automation',
              image: '/images/awards/mvp-nice.png',
              description: 'MVP award for automating network tasks at Nice CXone',
              date: new Date('2023-08-01'),
              category: 'award',
              verificationUrl: ''
            }
          ]
        }
      },
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        version: 1
      }
    });
    console.log('  ✅ Medals card created');
    // Ask Card
    await setDoc(doc(db, 'bioCluster', 'ask'), {
      cardType: 'ask',
      title: 'Let\'s Connect',
      isActive: true,
      position: { x: 0, y: 4, width: 3, height: 1 },
      content: {
        ask: {
          callToAction: 'Ready to collaborate? Let\'s build something amazing together!',
          description: 'Looking for opportunities in network automation, cloud infrastructure, or want to discuss technology solutions.',
          collaborationTypes: [
            'Network Infrastructure Consulting',
            'Cloud Migration Projects',
            'Automation & Scripting Solutions',
            'Technical Mentoring'
          ],
          responseTime: 'Usually responds within 24 hours',
          preferredContact: 'email'
        }
      },
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        version: 1
      }
    });
    console.log('  ✅ Ask card created');
    console.log('✅ BioCluster cards created successfully');

    // 2. Create Categories
    console.log('📂 Creating categories...');
    
    const categories = [
      {
        categoryId: 'technology',
        name: 'Technology',
        slug: 'technology',
        description: 'Posts about technology trends and innovations',
        color: '#3B82F6',
        icon: 'cpu',
        parentCategory: null,
        sortOrder: 0,
        isActive: true,
        metadata: { createdAt: new Date(), updatedAt: new Date(), contentCount: 0 }
      },
      {
        categoryId: 'networking',
        name: 'Networking',
        slug: 'networking',
        description: 'Network infrastructure and protocols',
        color: '#10B981',
        icon: 'network',
        parentCategory: null,
        sortOrder: 1,
        isActive: true,
        metadata: { createdAt: new Date(), updatedAt: new Date(), contentCount: 0 }
      },
      {
        categoryId: 'automation',
        name: 'Automation',
        slug: 'automation',
        description: 'Automation scripts and tools',
        color: '#8B5CF6',
        icon: 'cog',
        parentCategory: null,
        sortOrder: 2,
        isActive: true,
        metadata: { createdAt: new Date(), updatedAt: new Date(), contentCount: 0 }
      }
    ];

    for (const category of categories) {
      await setDoc(doc(db, 'categories', category.categoryId), category);
    }
    console.log('✅ Categories created successfully');

    // 3. Create Tags
    console.log('🏷️ Creating tags...');
    
    const tags = [
      { name: 'Python', slug: 'python', color: '#3776AB', description: 'Python programming' },
      { name: 'AWS', slug: 'aws', color: '#FF9900', description: 'Amazon Web Services' },
      { name: 'Networking', slug: 'networking', color: '#0066CC', description: 'Network infrastructure' },
      { name: 'Automation', slug: 'automation', color: '#8B5CF6', description: 'Infrastructure automation' }
    ];

    for (const tag of tags) {
      await setDoc(doc(db, 'tags', tag.slug), {
        tagId: tag.slug,
        ...tag,
        usageCount: 0,
        metadata: { createdAt: new Date(), lastUsed: new Date() }
      });
    }
    console.log('✅ Tags created successfully');
    // 4. Create Default Grid Layout
    console.log('🎨 Creating default grid layout...');
    
    await setDoc(doc(db, 'gridLayout', 'default'), {
      layoutId: 'default',
      name: 'Default Portfolio Layout',
      description: 'Default grid layout for Rahul\'s interactive portfolio',
      isActive: true,
      isDefault: true,
      viewport: { width: 1200, height: 800, minZoom: 0.5, maxZoom: 2.0, defaultZoom: 1.0 },
      cards: [
        { cardId: 'welcome', cardType: 'bioCluster', position: { x: 0, y: 0, width: 2, height: 1, zIndex: 1 } },
        { cardId: 'bio', cardType: 'bioCluster', position: { x: 2, y: 0, width: 3, height: 2, zIndex: 1 } },
        { cardId: 'skills', cardType: 'bioCluster', position: { x: 5, y: 0, width: 3, height: 2, zIndex: 1 } },
        { cardId: 'experience', cardType: 'bioCluster', position: { x: 0, y: 2, width: 4, height: 2, zIndex: 1 } },
        { cardId: 'medals', cardType: 'bioCluster', position: { x: 4, y: 2, width: 4, height: 1, zIndex: 1 } },
        { cardId: 'ask', cardType: 'bioCluster', position: { x: 0, y: 4, width: 3, height: 1, zIndex: 1 } }
      ],
      metadata: { createdAt: new Date(), updatedAt: new Date(), createdBy: 'system', version: 1 }
    });
    console.log('✅ Grid layout created successfully');

    // 5. Create Settings
    console.log('⚙️ Creating site settings...');
    
    const settings = [
      {
        settingKey: 'site_title',
        value: 'Rahul Nangare - Network Engineer & Cloud Specialist',
        type: 'string',
        description: 'Main site title',
        category: 'general',
        isPublic: true
      },
      {
        settingKey: 'contact_email',
        value: 'rahulnangare93@gmail.com',
        type: 'string',
        description: 'Primary contact email',
        category: 'general',
        isPublic: true
      }
    ];

    for (const setting of settings) {
      await setDoc(doc(db, 'settings', setting.settingKey), {
        ...setting,
        metadata: { updatedAt: new Date(), updatedBy: 'system' }
      });
    }
    console.log('✅ Settings created successfully');

    console.log('🎉 Database initialization completed successfully!');
    console.log('');
    console.log('✅ Created collections:');
    console.log('  - bioCluster (6 cards)');
    console.log('  - categories (3 categories)');
    console.log('  - gridLayout (1 default layout)');
    console.log('  - tags (4 tags)');
    console.log('  - settings (2 settings)');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('  1. Deploy Firestore rules: npm run firebase:deploy');
    console.log('  2. View your data in Firebase Console');
    console.log('  3. Start building your SvelteKit components');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    console.error('Full error details:', error.stack);
    throw error;
  }
}

// Execute the initialization
if (process.argv.includes('--run')) {
  initializeDatabase()
    .then(() => {
      console.log('✅ Initialization complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Initialization failed:', error.message);
      process.exit(1);
    });
} else {
  console.log('');
  console.log('🚀 Firebase Database Initializer');
  console.log('To run this script, use: npm run db:init');
  console.log('Or manually: node scripts/init-database.js --run');
  console.log('');
  console.log('Make sure your .env.local file is configured with Firebase credentials');
}

export { initializeDatabase };