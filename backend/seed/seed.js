import mongoose from 'mongoose';
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

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'Easy',
    category: 'Array',
    tags: ['Array', 'Hash Table'],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    hints: [
      'Use a hash map to store complements',
      'For each number, check if its complement exists in the map',
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
    },
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isHidden: false },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]', isHidden: false },
      { input: '[3,3]\n6', expectedOutput: '[0,1]', isHidden: true },
    ],
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['String', 'Stack'],
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.',
    ],
    hints: [
      'Use a stack to keep track of opening brackets',
      'When you encounter a closing bracket, check if it matches the top of the stack',
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Your code here
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Your code here
        pass`,
    },
    testCases: [
      { input: '()', expectedOutput: 'true', isHidden: false },
      { input: '()[]{}', expectedOutput: 'true', isHidden: false },
    ],
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    difficulty: 'Easy',
    category: 'Linked List',
    tags: ['Linked List', 'Recursion'],
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
      },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    starterCode: {
      javascript: `/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // Your code here
};`,
    },
    testCases: [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', isHidden: false },
    ],
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    hints: [
      'Use Kadane\'s algorithm',
      'Keep track of current sum and maximum sum',
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // Your code here
};`,
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', isHidden: false },
    ],
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: 'Medium',
    category: 'String',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Your code here
};`,
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3', isHidden: false },
    ],
  },
  {
    title: 'Binary Tree Inorder Traversal',
    slug: 'binary-tree-inorder-traversal',
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    difficulty: 'Easy',
    category: 'Tree',
    tags: ['Stack', 'Tree', 'Depth-First Search'],
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    // Your code here
};`,
    },
    testCases: [
      { input: '[1,null,2,3]', expectedOutput: '[1,3,2]', isHidden: false },
    ],
  },
  {
    title: 'LRU Cache',
    slug: 'lru-cache',
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.`,
    difficulty: 'Medium',
    category: 'Design',
    tags: ['Hash Table', 'Linked List', 'Design'],
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    // Your code here
};

LRUCache.prototype.get = function(key) {
    // Your code here
};

LRUCache.prototype.put = function(key, value) {
    // Your code here
};`,
    },
    testCases: [
      { input: '2\n["put",1,1]\n["put",2,2]\n["get",1]', expectedOutput: '1', isHidden: false },
    ],
  },
  {
    title: 'Merge K Sorted Lists',
    slug: 'merge-k-sorted-lists',
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.`,
    difficulty: 'Hard',
    category: 'Linked List',
    tags: ['Linked List', 'Divide and Conquer', 'Heap', 'Merge Sort'],
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    // Your code here
};`,
    },
    testCases: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]', isHidden: false },
    ],
  },
  {
    title: 'Word Ladder',
    slug: 'word-ladder',
    description: `Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.`,
    difficulty: 'Hard',
    category: 'Graph',
    tags: ['Hash Table', 'String', 'Breadth-First Search'],
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '5',
        explanation: 'One shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog".',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    // Your code here
};`,
    },
    testCases: [
      { input: '"hit"\n"cog"\n["hot","dot","dog","lot","log","cog"]', expectedOutput: '5', isHidden: false },
    ],
  },
  {
    title: 'Clone Graph',
    slug: 'clone-graph',
    description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.`,
    difficulty: 'Medium',
    category: 'Graph',
    tags: ['Hash Table', 'Depth-First Search', 'Breadth-First Search', 'Graph'],
    examples: [
      {
        input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
        output: '[[2,4],[1,3],[2,4],[1,3]]',
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    // Your code here
};`,
    },
    testCases: [
      { input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]', isHidden: false },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Company.deleteMany({});
    await Problem.deleteMany({});

    console.log('Seeding companies...');
    const createdCompanies = await Company.insertMany(companies);
    console.log(`${createdCompanies.length} companies seeded!`);

    // Assign random companies to problems
    console.log('Seeding problems...');
    const problemsWithCompanies = problems.map(problem => {
      const randomCompanies = createdCompanies
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1)
        .map(c => c._id);
      
      return {
        ...problem,
        companies: randomCompanies,
        acceptanceRate: Math.floor(Math.random() * 60) + 20,
        submissions: Math.floor(Math.random() * 100000) + 10000,
        accepted: Math.floor(Math.random() * 50000) + 5000,
        likes: Math.floor(Math.random() * 5000) + 100,
        dislikes: Math.floor(Math.random() * 500) + 10,
      };
    });

    const createdProblems = await Problem.insertMany(problemsWithCompanies);
    console.log(`${createdProblems.length} problems seeded!`);

    // Update companies with their problems
    for (const company of createdCompanies) {
      const companyProblems = createdProblems
        .filter(p => p.companies.includes(company._id))
        .map(p => p._id);
      
      await Company.findByIdAndUpdate(company._id, {
        problems: companyProblems,
      });
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
