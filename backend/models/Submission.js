import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Partial Pass', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error'],
    required: true,
  },
  runtime: String,
  memory: String,
  testCasesPassed: Number,
  totalTestCases: Number,
  testResults: [{
    testNumber: Number,
    passed: Boolean,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    runtime: Number,
    memory: Number,
    hidden: Boolean,
    errorMessage: String,
    explanation: String,
  }],
  errorMessage: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
