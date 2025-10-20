import express from 'express';
import Problem from '../models/Problem.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all problems with filters
router.get('/', async (req, res) => {
  try {
    const { difficulty, category, company, search } = req.query;
    let query = {};

    if (difficulty) query.difficulty = difficulty;
    
    // Check both category field and tags array for category filtering
    if (category) {
      query.$or = [
        { category: category },
        { tags: category }
      ];
    }
    
    if (company) query.companies = company;
    
    // Search has its own $or, so handle separately
    if (search && !category) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    } else if (search && category) {
      // If both search and category, use $and with nested $or
      query.$and = [
        {
          $or: [
            { category: category },
            { tags: category }
          ]
        },
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } }
          ]
        }
      ];
      delete query.$or; // Remove the standalone $or
    }

    const problems = await Problem.find(query)
      .populate('companies', 'name logo')
      .sort({ createdAt: -1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single problem by slug
router.get('/:slug', async (req, res) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug })
      .populate('companies', 'name logo');

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get random problem
router.get('/random/problem', async (req, res) => {
  try {
    const { difficulty } = req.query;
    let query = {};
    if (difficulty) query.difficulty = difficulty;

    const count = await Problem.countDocuments(query);
    const random = Math.floor(Math.random() * count);
    const problem = await Problem.findOne(query).skip(random);

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
