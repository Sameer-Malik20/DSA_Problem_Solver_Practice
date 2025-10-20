import { CheckCircle, XCircle, Clock, Database, AlertTriangle, Code } from 'lucide-react';

const TestResults = ({ executionResult, showAllTests = false }) => {
  if (!executionResult) return null;

  const { status, totalTests, passedTests, failedTests, testResults, runtime, memory, errorMessage } = executionResult;

  // Status colors and icons
  const getStatusStyle = () => {
    switch (status) {
      case 'Accepted':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-500',
          text: 'text-green-700 dark:text-green-400',
          icon: <CheckCircle className="w-6 h-6" />,
        };
      case 'Wrong Answer':
      case 'Partial Pass':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-500',
          text: 'text-red-700 dark:text-red-400',
          icon: <XCircle className="w-6 h-6" />,
        };
      case 'Runtime Error':
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          border: 'border-orange-500',
          text: 'text-orange-700 dark:text-orange-400',
          icon: <AlertTriangle className="w-6 h-6" />,
        };
      case 'Compilation Error':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          border: 'border-purple-500',
          text: 'text-purple-700 dark:text-purple-400',
          icon: <Code className="w-6 h-6" />,
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-500',
          text: 'text-gray-700 dark:text-gray-400',
          icon: <Clock className="w-6 h-6" />,
        };
    }
  };

  const statusStyle = getStatusStyle();

  // Filter test results to show
  const displayedTests = showAllTests 
    ? testResults 
    : testResults.filter(test => !test.hidden);

  return (
    <div className="space-y-4">
      {/* Overall Status */}
      <div className={`${statusStyle.bg} border-l-4 ${statusStyle.border} p-4 rounded-lg`}>
        <div className="flex items-center gap-3">
          <div className={statusStyle.text}>
            {statusStyle.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${statusStyle.text}`}>
              {status}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {passedTests}/{totalTests} test cases passed
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{runtime}ms</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Database className="w-4 h-4" />
              <span>{memory}MB</span>
            </div>
          </div>
        </div>

        {/* Error message if exists */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded border border-red-300 dark:border-red-700">
            <p className="text-sm font-mono text-red-800 dark:text-red-300">
              {errorMessage}
            </p>
          </div>
        )}
      </div>

      {/* Test Cases Results */}
      {displayedTests.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Test Cases
          </h4>

          {displayedTests.map((test) => (
            <div
              key={test.testNumber}
              className={`border rounded-lg overflow-hidden ${
                test.passed
                  ? 'border-green-300 dark:border-green-700'
                  : 'border-red-300 dark:border-red-700'
              }`}
            >
              {/* Test Header */}
              <div
                className={`px-4 py-3 flex items-center justify-between ${
                  test.passed
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  {test.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Test Case {test.testNumber}
                  </span>
                  {test.hidden && (
                    <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span>{test.runtime}ms</span>
                  <span>{test.memory}MB</span>
                </div>
              </div>

              {/* Test Details */}
              <div className="p-4 bg-white dark:bg-gray-800 space-y-3">
                {/* Input */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Input:
                  </label>
                  <pre className="mt-1 p-2 bg-gray-50 dark:bg-gray-900 rounded text-sm font-mono overflow-x-auto">
                    {test.input}
                  </pre>
                </div>

                {/* Expected Output */}
                <div>
                  <label className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                    Expected Output:
                  </label>
                  <pre className="mt-1 p-2 bg-green-50 dark:bg-green-900/30 rounded text-sm font-mono overflow-x-auto text-green-800 dark:text-green-300">
                    {test.expectedOutput}
                  </pre>
                </div>

                {/* Actual Output */}
                <div>
                  <label className={`text-xs font-semibold uppercase ${
                    test.passed 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    Your Output:
                  </label>
                  <pre className={`mt-1 p-2 rounded text-sm font-mono overflow-x-auto ${
                    test.passed
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  }`}>
                    {test.actualOutput || 'null'}
                  </pre>
                </div>

                {/* Explanation/Error */}
                {!test.passed && test.explanation && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                          Why this failed:
                        </p>
                        <pre className="text-xs whitespace-pre-wrap text-yellow-700 dark:text-yellow-400 font-mono">
                          {test.explanation}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {test.errorMessage && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded">
                    <p className="text-xs font-semibold text-red-800 dark:text-red-300 mb-1">
                      Runtime Error:
                    </p>
                    <p className="text-xs font-mono text-red-700 dark:text-red-400">
                      {test.errorMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Hidden test cases message */}
          {!showAllTests && testResults.some(test => test.hidden) && (
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🔒 {testResults.filter(test => test.hidden).length} hidden test case(s) not shown
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Submit your solution to see all test results
              </p>
            </div>
          )}
        </div>
      )}

      {/* Performance Summary */}
      {status === 'Accepted' && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h4 className="font-semibold text-green-800 dark:text-green-300">
              Congratulations! 🎉
            </h4>
          </div>
          <p className="text-sm text-green-700 dark:text-green-400">
            Your solution passed all test cases successfully!
          </p>
          <div className="mt-3 flex gap-4 text-xs text-green-600 dark:text-green-500">
            <span>Runtime: {runtime}ms</span>
            <span>Memory: {memory}MB</span>
          </div>
        </div>
      )}

      {/* Hints for Wrong Answer */}
      {(status === 'Wrong Answer' || status === 'Partial Pass') && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            💡 Debugging Tips:
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
            <li>Check your logic for edge cases</li>
            <li>Verify data type conversions</li>
            <li>Test with the provided examples manually</li>
            <li>Review the problem constraints carefully</li>
            <li>Add console.log to debug intermediate values</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestResults;
