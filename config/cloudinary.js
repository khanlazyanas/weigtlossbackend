// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// 1. Ensure environment variables are loaded first
dotenv.config();

// 2. Fundamental Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// === ACTIVE CONNECTION VERIFICATION PING ===
cloudinary.api.ping()
  .then((result) => {
    // High visibility dynamic console message
    console.log('======================================================');
    console.log('✅ Premium Image Laboratory (Cloudinary) Securely Connected');
    // Yahan hum seedha .env se naam utha rahe hain taaki undefined na aaye 👇
    console.log(`👉 Cloud Name detected: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log('======================================================');
  })
  .catch((error) => {
    // Critical visibility for configuration errors
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.error('❌ CRITICAL CONNECTION ERROR: Transformation Lab Failed!');
    console.error('Details:', error.message);
    console.error('Action required: Please verify your .env variables and network.');
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  });

// 3. Setup Professional Cloudinary Storage Structure
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'weightlossdoc_transformations', // Organizational folder
    allowed_formats: ['jpg', 'png', 'jpeg'], // Restricted for quality
  },
});

// 4. Create Multer upload middleware with the validated storage
const upload = multer({ storage: storage });

export default upload;