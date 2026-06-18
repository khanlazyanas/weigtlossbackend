import asyncHandler from 'express-async-handler';
import Lead from '../model/Lead.js';

// @desc    Create a new lead (Jab koi Frontend par Blueprint form bharega)
// @route   POST /api/leads
// @access  Public
export const createLead = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const lead = await Lead.create({
    name,
    phone,
    email,
  });

  if (lead) {
    res.status(201).json({
      message: 'Lead captured successfully',
      data: lead
    });
  } else {
    res.status(400);
    throw new Error('Invalid lead data');
  }
});

// @desc    Get all leads (Admin Dashboard ke table ke liye)
// @route   GET /api/leads
// @access  Private (Sirf owner dekh sake)
export const getLeads = asyncHandler(async (req, res) => {
  // .sort({ createdAt: -1 }) latest lead ko sabse upar dikhayega
  const leads = await Lead.find({}).sort({ createdAt: -1 }); 
  
  // Format data for frontend table
  const formattedLeads = leads.map(lead => ({
    _id: lead._id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    date: lead.createdAt.toISOString().split('T')[0] // '2026-06-18' format
  }));

  res.json(formattedLeads);
});