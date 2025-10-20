import { CheckCircle, Circle, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Roadmap = () => {
  const navigate = useNavigate();

  const handleTopicClick = (categories, difficulty) => {
    // Navigate to problems page with filters
    const params = new URLSearchParams();
    if (difficulty && difficulty !== 'Easy-Medium' && difficulty !== 'Medium-Hard') {
      params.set('difficulty', difficulty);
    }
    // Use the first category for filtering
    if (Array.isArray(categories)) {
      params.set('category', categories[0]);
    } else {
      params.set('category', categories);
    }
    navigate(`/problems?${params.toString()}`);
  };
  const roadmapSteps = [
    {
      phase: 'Phase 1: Foundations (Beginner)',
      duration: '4-6 weeks',
      problemCount: 100,
      topics: [
        {
          title: 'Arrays & Strings',
          category: ['Array', 'String'],
          problems: 30,
          description: 'Master basic array operations, two pointers, sliding window',
          examples: ['Two Sum', 'Reverse String', 'Maximum Subarray'],
          difficulty: 'Easy',
        },
        {
          title: 'Hash Tables & Sets',
          category: 'Hash Table',
          problems: 20,
          description: 'Learn hash-based data structures for O(1) lookups',
          examples: ['Valid Anagram', 'Group Anagrams', 'First Unique Character'],
          difficulty: 'Easy',
        },
        {
          title: 'Basic Math & Logic',
          category: 'Math',
          problems: 25,
          description: 'Number manipulation, bit operations, mathematical concepts',
          examples: ['Palindrome Number', 'FizzBuzz', 'Power of Two'],
          difficulty: 'Easy',
        },
        {
          title: 'Sorting & Searching',
          category: 'Binary Search',
          problems: 25,
          description: 'Binary search, sorting algorithms, search techniques',
          examples: ['Binary Search', 'Search Insert Position', 'Find Peak Element'],
          difficulty: 'Easy',
        },
      ],
    },
    {
      phase: 'Phase 2: Data Structures (Intermediate)',
      duration: '6-8 weeks',
      problemCount: 150,
      topics: [
        {
          title: 'Linked Lists',
          category: 'Linked List',
          problems: 25,
          description: 'Single, double, circular linked lists and operations',
          examples: ['Reverse Linked List', 'Merge Two Lists', 'Detect Cycle'],
          difficulty: 'Easy-Medium',
        },
        {
          title: 'Stacks & Queues',
          category: 'Stack',
          problems: 25,
          description: 'LIFO and FIFO data structures, monotonic stacks',
          examples: ['Valid Parentheses', 'Min Stack', 'Daily Temperatures'],
          difficulty: 'Easy-Medium',
        },
        {
          title: 'Trees & BST',
          category: 'Tree',
          problems: 40,
          description: 'Binary trees, BST, traversals, tree properties',
          examples: ['Inorder Traversal', 'Maximum Depth', 'Validate BST'],
          difficulty: 'Medium',
        },
        {
          title: 'Heaps & Priority Queues',
          category: 'Heap (Priority Queue)',
          problems: 20,
          description: 'Min/max heaps, k-way merge, top K problems',
          examples: ['Kth Largest Element', 'Merge K Lists', 'Top K Frequent'],
          difficulty: 'Medium',
        },
        {
          title: 'Graphs Basics',
          category: 'Breadth-First Search',
          problems: 40,
          description: 'Graph representation, BFS, DFS, basic algorithms',
          examples: ['Number of Islands', 'Clone Graph', 'Course Schedule'],
          difficulty: 'Medium',
        },
      ],
    },
    {
      phase: 'Phase 3: Algorithms (Advanced)',
      duration: '8-10 weeks',
      problemCount: 200,
      topics: [
        {
          title: 'Dynamic Programming',
          category: 'Dynamic Programming',
          problems: 60,
          description: 'Memoization, tabulation, state transitions, optimization',
          examples: ['Climbing Stairs', 'Coin Change', 'Longest Common Subsequence'],
          difficulty: 'Medium-Hard',
        },
        {
          title: 'Backtracking',
          category: 'Backtracking',
          problems: 30,
          description: 'Recursive exploration, constraint satisfaction',
          examples: ['Permutations', 'N-Queens', 'Word Search'],
          difficulty: 'Medium-Hard',
        },
        {
          title: 'Greedy Algorithms',
          category: 'Greedy',
          problems: 25,
          description: 'Optimal choice at each step, interval problems',
          examples: ['Jump Game', 'Gas Station', 'Meeting Rooms'],
          difficulty: 'Medium',
        },
        {
          title: 'Advanced Graphs',
          category: 'Depth-First Search',
          problems: 35,
          description: 'Shortest path, MST, topological sort, union-find',
          examples: ['Dijkstra', 'Network Delay Time', 'Min Cost to Connect'],
          difficulty: 'Medium-Hard',
        },
        {
          title: 'Tries & Advanced DS',
          category: 'Segment Tree',
          problems: 20,
          description: 'Prefix trees, segment trees, advanced structures',
          examples: ['Implement Trie', 'Word Search II', 'Range Sum Query'],
          difficulty: 'Medium-Hard',
        },
        {
          title: 'Advanced Techniques',
          category: 'Sliding Window',
          problems: 30,
          description: 'Sliding window, two pointers, divide & conquer',
          examples: ['Median of Two Arrays', 'Sliding Window Maximum'],
          difficulty: 'Hard',
        },
      ],
    },
    {
      phase: 'Phase 4: Mastery (Expert)',
      duration: '4-6 weeks',
      problemCount: 50,
      topics: [
        {
          title: 'Hard Problems Mix',
          category: 'Array',
          problems: 50,
          description: 'Challenge yourself with complex algorithmic problems',
          examples: ['Merge K Lists', 'Word Ladder', 'Serialize Binary Tree'],
          difficulty: 'Hard',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Complete DSA Learning Roadmap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            500+ Problems Organized for Systematic Learning
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">300</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Easy Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">150</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Medium Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">50</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hard Problems</div>
            </div>
          </div>
        </div>

        {/* Roadmap Phases */}
        <div className="space-y-8">
          {roadmapSteps.map((phase, phaseIndex) => (
            <div
              key={phaseIndex}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8"
            >
              {/* Phase Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {phase.phase}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>⏱️ {phase.duration}</span>
                    <span>📝 {phase.problemCount} problems</span>
                  </div>
                </div>
                <div className="text-right">
                  <Link
                    to="/problems"
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all shadow-md hover:shadow-lg font-semibold"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>

              {/* Topics */}
              <div className="grid md:grid-cols-2 gap-6">
                {phase.topics.map((topic, topicIndex) => (
                  <div
                    key={topicIndex}
                    onClick={() => handleTopicClick(topic.category, topic.difficulty)}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {topic.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        topic.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : topic.difficulty === 'Medium' || topic.difficulty === 'Easy-Medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : topic.difficulty === 'Medium-Hard'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {topic.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {topic.description}
                    </p>
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        📊 {topic.problems} problems
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        Example Problems:
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {topic.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        View Problems <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl border border-primary-200 dark:border-primary-800 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            💡 Learning Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ✅ Do's
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Solve problems consistently (1-2 daily)</li>
                <li>• Understand the pattern, not just the solution</li>
                <li>• Review and revise previous problems</li>
                <li>• Time yourself to improve speed</li>
                <li>• Practice explaining your approach</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ❌ Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Don't skip the basics</li>
                <li>• Don't memorize solutions</li>
                <li>• Don't jump to hard problems too quickly</li>
                <li>• Don't give up after 5 minutes</li>
                <li>• Don't ignore time complexity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/problems"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl hover:from-primary-700 hover:to-primary-600 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            Start Your Journey Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
