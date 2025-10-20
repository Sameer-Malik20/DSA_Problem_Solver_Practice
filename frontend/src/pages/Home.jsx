import { Link } from 'react-router-dom';
import { Code2, Zap, Trophy, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Code2,
      title: 'Extensive Problem Set',
      description: '1000+ curated DSA problems covering all topics from arrays to dynamic programming',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Zap,
      title: 'Company-Wise Questions',
      description: 'Practice problems asked by top tech companies like Google, Amazon, Microsoft',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Trophy,
      title: 'Track Your Progress',
      description: 'Monitor your improvement with detailed statistics and submission history',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TrendingUp,
      title: 'Premium Code Editor',
      description: 'Built-in Monaco editor with syntax highlighting and multiple language support',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const stats = [
    { value: '1000+', label: 'Problems' },
    { value: '50+', label: 'Companies' },
    { value: '10K+', label: 'Users' },
    { value: '100K+', label: 'Submissions' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Master Data Structures & Algorithms
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Crack Your Dream
              <span className="block bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                Tech Interview
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
              Practice coding problems from top companies, track your progress, and ace your technical interviews with our premium platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/problems"
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl hover:from-primary-700 hover:to-primary-600 transition-all shadow-lg hover:shadow-xl font-semibold text-lg flex items-center"
              >
                Start Practicing
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/companies"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:shadow-lg transition-all border-2 border-gray-200 dark:border-gray-700 font-semibold text-lg"
              >
                Browse Companies
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CodeMaster?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to prepare for your coding interviews in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary-500"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start your journey in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose a Problem',
                description: 'Browse our extensive collection of problems categorized by topic and difficulty',
              },
              {
                step: '02',
                title: 'Code Your Solution',
                description: 'Use our premium code editor to write and test your solution in real-time',
              },
              {
                step: '03',
                title: 'Track Progress',
                description: 'Monitor your improvement and prepare for interviews with confidence',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-center mb-6">
                  <div className="text-6xl font-bold text-primary-200 dark:text-primary-900">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-primary-300 dark:text-primary-700">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Join thousands of developers preparing for their dream job
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
