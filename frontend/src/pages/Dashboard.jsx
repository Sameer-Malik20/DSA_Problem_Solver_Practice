import { useState, useEffect } from 'react';
import { Target, TrendingUp, Award, Code, Calendar } from 'lucide-react';
import StatCard from '../components/StatCard';
import ProblemCard from '../components/ProblemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { userAPI, problemsAPI } from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, problemsRes] = await Promise.all([
        userAPI.getStats(),
        problemsAPI.getAll({ limit: 6 }),
      ]);
      setStats(statsRes.data);
      setRecentProblems(problemsRes.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.username}! 👋
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Track your progress and continue your coding journey
              </p>
            </div>
            <img
              src={user?.avatar}
              alt={user?.username}
              className="w-20 h-20 rounded-full border-4 border-primary-500 shadow-lg"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Target}
            title="Total Solved"
            value={stats?.totalSolved || 0}
            subtitle="Problems completed"
            color="primary"
          />
          <StatCard
            icon={Award}
            title="Easy"
            value={stats?.easy || 0}
            subtitle="Easy problems"
            color="green"
          />
          <StatCard
            icon={TrendingUp}
            title="Medium"
            value={stats?.medium || 0}
            subtitle="Medium problems"
            color="yellow"
          />
          <StatCard
            icon={Code}
            title="Hard"
            value={stats?.hard || 0}
            subtitle="Hard problems"
            color="red"
          />
        </div>

        {/* Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Progress
          </h2>
          <div className="space-y-4">
            {/* Easy Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Easy</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {stats?.easy || 0} solved
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats?.easy || 0) / 100 * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Medium Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</span>
                <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                  {stats?.medium || 0} solved
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats?.medium || 0) / 100 * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Hard Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hard</span>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                  {stats?.hard || 0} solved
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats?.hard || 0) / 100 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Continue Practicing
            </h2>
            <a
              href="/problems"
              className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
            >
              View All →
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProblems.map((problem) => (
              <ProblemCard
                key={problem._id}
                problem={problem}
                solved={false}
              />
            ))}
          </div>
        </div>

        {/* Activity Calendar Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Activity Overview
            </h2>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Your submission activity will be displayed here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {stats?.totalSubmissions || 0} total submissions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
