import express from 'express';
import Submission from '../models/Submission.js';
import Problem from '../models/Problem.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { executeCode, compileCode } from '../utils/codeExecutor.js';

const router = express.Router();

// Submit solution
router.post('/', protect, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    // Get problem with test cases
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // First, check for compilation errors
    const compilationResult = await compileCode(code, language);
    if (!compilationResult.success) {
      return res.status(400).json({
        status: 'Compilation Error',
        error: compilationResult.error,
        message: 'Your code has syntax errors. Please fix them and try again.',
      });
    }

    // Execute code against test cases
    const executionResult = await executeCode(
      code,
      language,
      problem.testCases,
      'solution' // Default function name
    );

    // Create submission record
    const submission = await Submission.create({
      user: req.user._id,
      problem: problemId,
      code,
      language,
      status: executionResult.status,
      runtime: `${executionResult.runtime}ms`,
      memory: `${executionResult.memory}MB`,
      testCasesPassed: executionResult.passedTests,
      totalTestCases: executionResult.totalTests,
      testResults: executionResult.testResults,
      errorMessage: executionResult.errorMessage,
    });

    // Update problem stats
    await Problem.findByIdAndUpdate(problemId, {
      $inc: {
        submissions: 1,
        accepted: executionResult.status === 'Accepted' ? 1 : 0,
      },
    });

    // Update acceptance rate
    problem.acceptanceRate = ((problem.accepted / problem.submissions) * 100).toFixed(1);
    await problem.save();

    // If accepted, add to user's solved problems
    if (executionResult.status === 'Accepted') {
      const alreadySolved = req.user.solvedProblems.some(
        p => p.problemId.toString() === problemId
      );

      if (!alreadySolved) {
        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            solvedProblems: { problemId },
            submissions: submission._id,
          },
        });
      }
    }

    // Return detailed results
    res.status(201).json({
      submission,
      executionResult,
      message: executionResult.status === 'Accepted' 
        ? '🎉 Accepted! All test cases passed!' 
        : executionResult.status === 'Wrong Answer'
        ? '❌ Wrong Answer. Some test cases failed.'
        : `❌ ${executionResult.status}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Run code (without submitting)
router.post('/run', protect, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    // Get problem with test cases
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Check compilation
    const compilationResult = await compileCode(code, language);
    if (!compilationResult.success) {
      return res.status(400).json({
        status: 'Compilation Error',
        error: compilationResult.error,
        message: 'Your code has syntax errors.',
      });
    }

    // Run only visible test cases
    const visibleTestCases = problem.testCases.filter(tc => !tc.isHidden);
    
    const executionResult = await executeCode(
      code,
      language,
      visibleTestCases,
      'solution'
    );

    res.json({
      executionResult,
      message: executionResult.status === 'Accepted'
        ? '✅ All visible test cases passed!'
        : '❌ Some test cases failed. Check the details below.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user submissions
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.params.userId })
      .populate('problem', 'title difficulty')
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
