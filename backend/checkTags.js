import mongoose from 'mongoose';
import Problem from './models/Problem.js';

mongoose.connect('mongodb://localhost:27017/dsa-platform')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const problems = await Problem.find();
    console.log(`\nTotal problems in database: ${problems.length}`);
    
    // Collect all unique tags
    const tags = new Set();
    const tagCounts = {};
    
    problems.forEach(p => {
      p.tags.forEach(t => {
        tags.add(t);
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    });
    
    console.log('\n=== All Available Tags ===');
    console.log(Array.from(tags).sort().join(', '));
    
    console.log('\n=== Tag Counts (sorted by count) ===');
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30);
    
    sortedTags.forEach(([tag, count]) => {
      console.log(`${tag}: ${count}`);
    });
    
    // Check difficulty distribution
    const difficultyCount = {
      Easy: problems.filter(p => p.difficulty === 'Easy').length,
      Medium: problems.filter(p => p.difficulty === 'Medium').length,
      Hard: problems.filter(p => p.difficulty === 'Hard').length,
    };
    
    console.log('\n=== Difficulty Distribution ===');
    console.log(difficultyCount);
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
