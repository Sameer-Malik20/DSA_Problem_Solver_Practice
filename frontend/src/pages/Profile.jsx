import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI, submissionsAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Trophy, Code, CheckCircle, XCircle, Calendar, Award, Target, TrendingUp } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [statsRes, submissionsRes] = await Promise.all([
        userAPI.getStats(),
        submissionsAPI.getUserSubmissions(user._id),
      ]);
      setStats(statsRes.data);
      setSubmissions(submissionsRes.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = () => {
    // Calculate current streak based on submissions
    const today = new Date();
    let streak = 0;
    // Simplified streak calculation
    return submissions.length > 0 ? Math.min(submissions.length, 30) : 0;
  };

  const getRecentActivity = () => {
    return submissions.slice(0, 10);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const totalSolved = stats?.totalSolved || 0;
  const totalProblems = 500; // Total available problems
  const progressPercentage = ((totalSolved / totalProblems) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-24 h-24 rounded-full border-4 border-primary-500 shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {user?.username}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {user?.email}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Joined {new Date(user?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {calculateStreak()} Day Streak
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {totalSolved}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Solved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats?.easy || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Easy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats?.medium || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {stats?.hard || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hard</div>
              </div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Overall Progress
              </span>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {progressPercentage}% ({totalSolved}/{totalProblems})
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-8">
              {['overview', 'submissions', 'achievements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Skills Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Progress by Difficulty
              </h2>
              <div className="space-y-4">
                {/* Easy */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Easy</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {stats?.easy || 0} / 300 solved
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((stats?.easy || 0) / 300) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</span>
                    </div>
                    <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                      {stats?.medium || 0} / 150 solved
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((stats?.medium || 0) / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hard</span>
                    </div>
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                      {stats?.hard || 0} / 50 solved
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((stats?.hard || 0) / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h2>
              {getRecentActivity().length > 0 ? (
                <div className="space-y-3">
                  {getRecentActivity().map((submission, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {submission.status === 'Accepted' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {submission.problem?.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {submission.language} • {submission.status}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No submissions yet. Start solving problems!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              All Submissions ({submissions.length})
            </h2>
            {submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Problem</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Language</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Runtime</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{submission.problem?.title}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            submission.status === 'Accepted'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{submission.language}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{submission.runtime}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Code className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No submissions yet. Start solving problems!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Achievements & Badges
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Achievement Cards */}
              <div className={`p-6 rounded-xl border-2 ${
                totalSolved >= 10
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-50'
              }`}>
                <Award className={`w-12 h-12 mb-4 ${totalSolved >= 10 ? 'text-yellow-500' : 'text-gray-400'}`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Getting Started
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Solve 10 problems
                </p>
                <div className="mt-3 text-sm font-semibold">
                  {totalSolved >= 10 ? '✓ Unlocked!' : `${totalSolved}/10`}
                </div>
              </div>

              <div className={`p-6 rounded-xl border-2 ${
                totalSolved >= 50
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-50'
              }`}>
                <Target className={`w-12 h-12 mb-4 ${totalSolved >= 50 ? 'text-blue-500' : 'text-gray-400'}`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Problem Solver
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Solve 50 problems
                </p>
                <div className="mt-3 text-sm font-semibold">
                  {totalSolved >= 50 ? '✓ Unlocked!' : `${totalSolved}/50`}
                </div>
              </div>

              <div className={`p-6 rounded-xl border-2 ${
                totalSolved >= 100
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10'
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-50'
              }`}>
                <Trophy className={`w-12 h-12 mb-4 ${totalSolved >= 100 ? 'text-purple-500' : 'text-gray-400'}`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Century Club
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Solve 100 problems
                </p>
                <div className="mt-3 text-sm font-semibold">
                  {totalSolved >= 100 ? '✓ Unlocked!' : `${totalSolved}/100`}
                </div>
              </div>

              <div className={`p-6 rounded-xl border-2 ${
                (stats?.easy || 0) >= 100
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-50'
              }`}>
                <CheckCircle className={`w-12 h-12 mb-4 ${(stats?.easy || 0) >= 100 ? 'text-green-500' : 'text-gray-400'}`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Easy Master
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Solve 100 easy problems
                </p>
                <div className="mt-3 text-sm font-semibold">
                  {(stats?.easy || 0) >= 100 ? '✓ Unlocked!' : `${stats?.easy || 0}/100`}
                </div>
              </div>

              <div className={`p-6 rounded-xl border-2 ${
                calculateStreak() >= 7
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-50'
              }`}>
                <TrendingUp className={`w-12 h-12 mb-4 ${calculateStreak() >= 7 ? 'text-orange-500' : 'text-gray-400'}`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Week Warrior
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  7-day streak
                </p>
                <div className="mt-3 text-sm font-semibold">
                  {calculateStreak() >= 7 ? '✓ Unlocked!' : `${calculateStreak()}/7`}
                </div>
              </div>

              <div className={`p-6 rounded-xl border-2 ${
                (stats?.hard || 0) >= 10
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-50'
              }`}>
                <Award className={`w-12 h-12 mb-4 ${(stats?.hard || 0) >= 10 ? 'text-red-500' : 'text-gray-400'}`} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Challenge Accepted
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Solve 10 hard problems
                </p>
                <div className="mt-3 text-sm font-semibold">
                  {(stats?.hard || 0) >= 10 ? '✓ Unlocked!' : `${stats?.hard || 0}/10`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
