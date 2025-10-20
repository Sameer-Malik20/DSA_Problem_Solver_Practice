import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  return (
    <Link
      to={`/companies/${company.slug}`}
      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 group"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {company.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {company.problems?.length || 0} Problems
          </p>
        </div>
      </div>

      {company.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {company.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline">
          View Problems →
        </span>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Active</span>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
