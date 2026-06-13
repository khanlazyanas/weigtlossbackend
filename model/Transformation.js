// model/Transformation.js
import mongoose from 'mongoose';

const transformationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    tag: {
      type: String,
      required: [true, 'Transformation tag is required (e.g., Metabolic Reset)'],
      trim: true,
    },
    lostMass: {
      type: String, // e.g., "15 kg"
      required: [true, 'Weight lost data is required'],
    },
    duration: {
      type: String, // e.g., "4 Months"
      required: [true, 'Time frame is required'],
    },
    // === The crucial Cloudinary URLs ===
    beforeImg: {
      type: String,
      required: [true, 'Before image is mandatory'],
    },
    afterImg: {
      type: String,
      required: [true, 'After image is mandatory'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Transformation = mongoose.model('Transformation', transformationSchema);

export default Transformation;