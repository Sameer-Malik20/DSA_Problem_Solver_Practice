import fetch from 'node-fetch';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Problem from '../models/Problem.js';
import Company from '../models/Company.js';

dotenv.config();

const companies = [
  {
    name: 'Google',
    slug: 'google',
    logo: 'https://cdn.cdnlogo.com/logos/g/35/google-icon.svg',
    description: 'Tech giant focusing on search, cloud, and AI',
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    logo: 'https://cdn.cdnlogo.com/logos/a/19/amazon.svg',
    description: 'E-commerce and cloud computing leader',
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    logo: 'https://cdn.cdnlogo.com/logos/m/84/microsoft.svg',
    description: 'Software and cloud services giant',
  },
  {
    name: 'Meta',
    slug: 'meta',
    logo: 'https://cdn.cdnlogo.com/logos/m/37/meta.svg',
    description: 'Social media and VR technology company',
  },
  {
    name: 'Apple',
    slug: 'apple',
    logo: 'https://cdn.cdnlogo.com/logos/a/19/apple.svg',
    description: 'Consumer electronics and software innovator',
  },
  {
    name: 'Netflix',
    slug: 'netflix',
    logo: 'https://cdn.cdnlogo.com/logos/n/44/netflix-icon.svg',
    description: 'Streaming entertainment service',
  },
];

// Fetch problems from LeetCode API
const fetchLeetCodeProblems = async () => {
  try {
    const response = await fetch('https://leetcode.com/api/problems/algorithms/');
    const data = await response.json();
    return data.stat_status_pairs || [];
  } catch (error) {
    console.error('Error fetching from LeetCode API:', error);
    return [];
  }
};

// Map LeetCode difficulty to our format
const mapDifficulty = (level) => {
  switch (level) {
    case 1: return 'Easy';
    case 2: return 'Medium';
    case 3: return 'Hard';
    default: return 'Medium';
  }
};

// Determine category based on tags
const determineCategory = (tags) => {
  const categories = {
    'Array': ['array'],
    'String': ['string'],
    'Linked List': ['linked-list'],
    'Tree': ['tree', 'binary-tree'],
    'Graph': ['graph'],
    'Dynamic Programming': ['dynamic-programming', 'dp'],
    'Stack': ['stack'],
    'Queue': ['queue'],
    'Hash Table': ['hash-table', 'hash'],
    'Sorting': ['sorting'],
    'Searching': ['binary-search', 'search'],
    'Math': ['math'],
    'Greedy': ['greedy'],
  };

  for (const [category, keywords] of Object.entries(categories)) {
    for (const tag of tags) {
      if (keywords.some(keyword => tag.toLowerCase().includes(keyword))) {
        return category;
      }
    }
  }
  return 'Array'; // Default category
};

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Fetch problem details from alternative API
const fetchProblemDetails = async (titleSlug) => {
  try {
    const query = `
      query getQuestionDetail($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          content
          topicTags {
            name
            slug
          }
          hints
          codeSnippets {
            lang
            code
          }
          sampleTestCase
          exampleTestcases
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { titleSlug },
      }),
    });

    const data = await response.json();
    return data.data?.question || null;
  } catch (error) {
    console.error(`Error fetching details for ${titleSlug}:`, error.message);
    return null;
  }
};

const seedDatabaseFromAPI = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Company.deleteMany({});
    await Problem.deleteMany({});

    console.log('Seeding companies...');
    const createdCompanies = await Company.insertMany(companies);
    console.log(`${createdCompanies.length} companies seeded!`);

    console.log('\nFetching problems from LeetCode API...');
    const leetcodeProblems = await fetchLeetCodeProblems();
    
    if (leetcodeProblems.length === 0) {
      console.log('No problems fetched. Using fallback data...');
      process.exit(1);
    }

    console.log(`Fetched ${leetcodeProblems.length} problems from LeetCode`);
    console.log('Processing 500+ problems organized for DSA learning (this may take 10-15 minutes)...\n');

    // Organize by difficulty for learning progression
    const easyProblems = leetcodeProblems
      .filter(item => !item.paid_only && item.difficulty.level === 1)
      .slice(0, 300); // 300 Easy problems for beginners
    
    const mediumProblems = leetcodeProblems
      .filter(item => !item.paid_only && item.difficulty.level === 2)
      .slice(0, 150); // 150 Medium problems
    
    const hardProblems = leetcodeProblems
      .filter(item => !item.paid_only && item.difficulty.level === 3)
      .slice(0, 50); // 50 Hard problems
    
    const problemsToProcess = [...easyProblems, ...mediumProblems, ...hardProblems];

    const processedProblems = [];

    for (let i = 0; i < problemsToProcess.length; i++) {
      const item = problemsToProcess[i];
      const stat = item.stat;
      
      console.log(`[${i + 1}/${problemsToProcess.length}] Processing: ${stat.question__title}`);

      const titleSlug = stat.question__title_slug;
      
      // Fetch detailed information
      const details = await fetchProblemDetails(titleSlug);
      
      // Add a small delay to avoid rate limiting (reduced for more problems)
      await new Promise(resolve => setTimeout(resolve, 200));

      const tags = details?.topicTags?.map(tag => tag.name) || [];
      const category = determineCategory(tags);
      
      // Extract code snippets
      const codeSnippets = details?.codeSnippets || [];
      const starterCode = {
        javascript: codeSnippets.find(s => s.lang === 'JavaScript')?.code || '// Write your code here',
        python: codeSnippets.find(s => s.lang === 'Python3')?.code || '# Write your code here',
        java: codeSnippets.find(s => s.lang === 'Java')?.code || '// Write your code here',
        cpp: codeSnippets.find(s => s.lang === 'C++')?.code || '// Write your code here',
      };

      // Clean HTML content
      const cleanContent = details?.content 
        ? details.content.replace(/<[^>]*>/g, '').substring(0, 500) + '...'
        : `Solve the problem: ${stat.question__title}`;

      const problem = {
        title: stat.question__title,
        slug: generateSlug(stat.question__title),
        description: cleanContent,
        difficulty: mapDifficulty(item.difficulty.level),
        category: category,
        tags: tags.slice(0, 5),
        companies: createdCompanies
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1)
          .map(c => c._id),
        examples: [{
          input: details?.sampleTestCase || 'Example input',
          output: 'Example output',
          explanation: 'Explanation of the solution',
        }],
        constraints: details?.hints?.slice(0, 3) || ['See problem description for constraints'],
        hints: details?.hints || [],
        starterCode: starterCode,
        testCases: [{
          input: details?.sampleTestCase || 'test input',
          expectedOutput: 'expected output',
          isHidden: false,
        }],
        acceptanceRate: stat.total_acs && stat.total_submitted 
          ? ((stat.total_acs / stat.total_submitted) * 100).toFixed(1)
          : Math.floor(Math.random() * 60) + 20,
        submissions: stat.total_submitted || Math.floor(Math.random() * 100000) + 10000,
        accepted: stat.total_acs || Math.floor(Math.random() * 50000) + 5000,
        likes: Math.floor(Math.random() * 5000) + 100,
        dislikes: Math.floor(Math.random() * 500) + 10,
      };

      processedProblems.push(problem);
    }

    console.log('\nInserting problems into database...');
    const createdProblems = await Problem.insertMany(processedProblems);
    console.log(`${createdProblems.length} problems seeded!`);

    // Update companies with their problems
    console.log('\nUpdating company problem associations...');
    for (const company of createdCompanies) {
      const companyProblems = createdProblems
        .filter(p => p.companies.includes(company._id))
        .map(p => p._id);
      
      await Company.findByIdAndUpdate(company._id, {
        problems: companyProblems,
      });
    }

    console.log('\n✅ Database seeded successfully with real LeetCode data!');
    console.log(`📊 Total: ${createdProblems.length} problems from LeetCode`);
    console.log(`🏢 Total: ${createdCompanies.length} companies`);
    
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabaseFromAPI();
