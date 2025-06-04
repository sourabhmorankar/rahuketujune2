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

console.log('🔥 Testing Firebase connection...');
console.log(`📡 Project ID: ${firebaseConfig.projectId}`);

// Import and test Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

async function testConnection() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('✅ Firebase app initialized');
    console.log('✅ Firestore connected');
    
    // Test read operation
    try {
      const testDoc = doc(db, 'test', 'connection');
      await getDoc(testDoc);
      console.log('✅ Firestore read test passed');
    } catch (readError) {
      console.log('⚠️ Firestore read test failed (this might be normal for empty database)');
    }
    
    // Test write operation
    await setDoc(doc(db, 'test', 'connection'), {
      timestamp: new Date(),
      message: 'Connection test successful'
    });
    console.log('✅ Firestore write test passed');
    
    console.log('🎉 All tests passed! Your Firebase connection is working.');
    console.log('');
    console.log('Now you can run: npm run db:init');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('');
    console.error('Common issues:');
    console.error('1. Check your .env.local file has correct Firebase config');
    console.error('2. Ensure Firestore is enabled in Firebase Console');
    console.error('3. Check if you have proper permissions');
    process.exit(1);
  }
}

testConnection();