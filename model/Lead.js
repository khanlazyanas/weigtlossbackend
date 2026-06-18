import mongoose from 'mongoose';

const leadSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a name'] 
  },
  phone: { 
    type: String, 
    required: [true, 'Please add a phone number'] 
  },
  email: { 
    type: String, 
    required: [true, 'Please add an email'] 
  }
}, { 
  timestamps: true // Ye automatically createdAt date add kar dega
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;