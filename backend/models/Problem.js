import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  companies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  }],
  examples: [{
    input: String,
    output: String,
    explanation: String,
  }],
  constraints: [String],
  hints: [String],
  starterCode: {
    javascript: String,
    python: String,
    java: String,
    cpp: String,
  },
  testCases: [{
    input: String,
    expectedOutput: String,
    isHidden: {
      type: Boolean,
      default: false,
    },
  }],
  acceptanceRate: {
    type: Number,
    default: 0,
  },
  submissions: {
    type: Number,
    default: 0,
  },
  accepted: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;
