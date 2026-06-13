// controllers/transformationController.js
import asyncHandler from 'express-async-handler';
import Transformation from '../model/Transformation.js';

// @desc    Upload a new dynamic transformation story (Owner Only)
// @route   POST /api/transformations/upload
// @access  Protected/Admin (Owner)
export const createTransformationStory = asyncHandler(async (req, res) => {
  const { name, tag, lostMass, duration } = req.body;

  // req.files will contain the uploaded images via multer
  if (!req.files || !req.files.beforeImg || !req.files.afterImg) {
    res.status(400);
    throw new Error('Both Before and After images are required.');
  }

  // Extract Cloudinary secure URLs from req.files
  const beforeImgUrl = req.files.beforeImg[0].path;
  const afterImgUrl = req.files.afterImg[0].path;

  try {
    const story = await Transformation.create({
      name,
      tag,
      lostMass,
      duration,
      beforeImg: beforeImgUrl,
      afterImg: afterImgUrl,
    });

    res.status(201).json({
      message: 'Premium transformation story uploaded successfully!',
      data: story,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || 'Database error occurred during story creation');
  }
});

// @desc    Get all transformation stories dynamically (Public)
// @route   GET /api/transformations
// @access  Public
export const getAllTransformations = asyncHandler(async (req, res) => {
  const stories = await Transformation.find({}).sort({ createdAt: -1 }); // Get latest stories first
  res.json(stories);
});