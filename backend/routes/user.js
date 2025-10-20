import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('solvedProblems.problemId', 'title difficulty category')
      .populate({
        path: 'submissions',
        populate: { path: 'problem', select: 'title difficulty' },
      });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user stats
router.get('/stats', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('solvedProblems.problemId', 'difficulty');

    const stats = {
      totalSolved: user.solvedProblems.length,
      easy: user.solvedProblems.filter(p => p.problemId.difficulty === 'Easy').length,
      medium: user.solvedProblems.filter(p => p.problemId.difficulty === 'Medium').length,
      hard: user.solvedProblems.filter(p => p.problemId.difficulty === 'Hard').length,
      totalSubmissions: user.submissions.length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
