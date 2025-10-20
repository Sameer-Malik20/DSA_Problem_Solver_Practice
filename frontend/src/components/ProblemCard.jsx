import { Link } from 'react-router-dom';

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
};

const ProblemCard = ({ problem, solved }) => {
  return (
    <Link
      to={`/problems/${problem.slug}`}
      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
            {problem.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <DifficultyBadge difficulty={problem.difficulty} />
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              {problem.category}
            </span>
          </div>
        </div>
        {solved && (
          <div className="ml-4">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {problem.description?.substring(0, 120)}...
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {problem.tags?.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-md bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            {problem.submissions || 0}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {problem.acceptanceRate || 0}%
          </span>
        </div>
        {problem.companies && problem.companies.length > 0 && (
          <div className="flex -space-x-2">
            {problem.companies.slice(0, 3).map((company, index) => (
              <img
                key={index}
                src={company.logo}
                alt={company.name}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                title={company.name}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProblemCard;
