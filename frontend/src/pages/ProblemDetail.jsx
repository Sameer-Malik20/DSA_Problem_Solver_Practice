import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { Play, Send, CheckCircle2, XCircle, Clock, Cpu, ChevronRight, Lightbulb } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import TestResults from '../components/TestResults';
import { problemsAPI, submissionsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ProblemDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [submitting, setSubmitting] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [runResult, setRunResult] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [showHints, setShowHints] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
  ];

  useEffect(() => {
    fetchProblem();
  }, [slug]);

  useEffect(() => {
    if (problem && problem.starterCode) {
      setCode(problem.starterCode[language] || '// Write your code here');
    }
  }, [language, problem]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      const { data } = await problemsAPI.getBySlug(slug);
      setProblem(data);
      if (data.starterCode) {
        setCode(data.starterCode.javascript || '// Write your code here');
      }
    } catch (error) {
      console.error('Error fetching problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setRunning(true);
      setRunResult(null);
      const { data } = await submissionsAPI.run({
        problemId: problem._id,
        code,
        language,
      });
      setRunResult(data);
      setActiveTab('testcases');
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        executionResult: {
          status: 'Error',
          errorMessage: error.response?.data?.message || 'Failed to run code',
        },
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await submissionsAPI.submit({
        problemId: problem._id,
        code,
        language,
      });
      setResult(data);
      setActiveTab('submission');
    } catch (error) {
      console.error('Error submitting solution:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
      Medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
      Hard: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    };
    return colors[difficulty] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Problem not found
          </h2>
          <button
            onClick={() => navigate('/problems')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      {/* Left Panel - Problem Description */}
      <div className="w-full md:w-1/2 overflow-y-auto bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {problem.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {problem.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                {problem.acceptanceRate}% Acceptance
              </span>
              <span>{problem.submissions} Submissions</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex gap-6">
              {['description', 'examples', 'hints', 'testcases', 'submission'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {tab === 'testcases' ? 'Test Cases' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {problem.description}
                </p>
              </div>

              {problem.constraints && problem.constraints.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Constraints:
                  </h3>
                  <ul className="space-y-2">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {problem.tags && problem.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Tags:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-6">
              {problem.examples?.map((example, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Example {index + 1}:
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Input:</span>
                      <pre className="mt-1 p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                        <code className="text-gray-800 dark:text-gray-200">{example.input}</code>
                      </pre>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Output:</span>
                      <pre className="mt-1 p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                        <code className="text-gray-800 dark:text-gray-200">{example.output}</code>
                      </pre>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Explanation:</span>
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'hints' && (
            <div className="space-y-4">
              {problem.hints && problem.hints.length > 0 ? (
                problem.hints.map((hint, index) => (
                  <div key={index} className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                          Hint {index + 1}
                        </h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">{hint}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No hints available for this problem.</p>
              )}
            </div>
          )}

          {activeTab === 'result' && result && (
            <div className={`rounded-lg p-6 ${result.status === 'Accepted' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
              <div className="flex items-center mb-4">
                {result.status === 'Accepted' ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 mr-3" />
                )}
                <div>
                  <h3 className={`text-2xl font-bold ${result.status === 'Accepted' ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                    {result.status}
                  </h3>
                  <p className={`text-sm ${result.status === 'Accepted' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    {result.testCasesPassed} / {result.totalTestCases} test cases passed
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-lg ${result.status === 'Accepted' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                  <div className="flex items-center mb-1">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Runtime</span>
                  </div>
                  <p className="text-lg font-bold">{result.runtime}</p>
                </div>
                <div className={`p-3 rounded-lg ${result.status === 'Accepted' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                  <div className="flex items-center mb-1">
                    <Cpu className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Memory</span>
                  </div>
                  <p className="text-lg font-bold">{result.memory}</p>
                </div>
              </div>
            </div>
          )}

          {/* Test Cases Tab - Show Run Results */}
          {activeTab === 'testcases' && (
            <div>
              {runResult ? (
                <TestResults 
                  executionResult={runResult.executionResult} 
                  showAllTests={false}
                />
              ) : (
                <div className="text-center py-12">
                  <Play className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Run your code to see test case results
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Click "Run Code" to test against sample inputs
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Submission Tab - Show Full Results */}
          {activeTab === 'submission' && (
            <div>
              {result && result.executionResult ? (
                <TestResults 
                  executionResult={result.executionResult} 
                  showAllTests={true}
                />
              ) : (
                <div className="text-center py-12">
                  <Send className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Submit your solution to see all test results
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Click "Submit" to run against all test cases including hidden ones
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="w-full md:w-1/2 flex flex-col bg-gray-900">
        {/* Editor Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === lang.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRun}
              disabled={running}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {running ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </>
              )}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16 },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
