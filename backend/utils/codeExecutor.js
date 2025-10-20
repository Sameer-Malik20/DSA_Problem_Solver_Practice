// Code Execution Engine - Similar to LeetCode/GeeksforGeeks
// This is a simulation. In production, use Docker containers or sandboxed environments

/**
 * Execute user code against test cases
 * @param {string} code - User's code
 * @param {string} language - Programming language
 * @param {Array} testCases - Array of test cases
 * @param {string} functionName - Function name to test
 * @returns {Object} Execution result with detailed feedback
 */
export const executeCode = async (code, language, testCases, functionName = 'solution') => {
  try {
    const results = {
      status: 'Pending',
      totalTests: testCases.length,
      passedTests: 0,
      failedTests: 0,
      testResults: [],
      runtime: 0,
      memory: 0,
      errorMessage: null,
      compilationError: null,
    };

    let totalRuntime = 0;
    let maxMemory = 0;

    // Execute each test case
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const testResult = await executeTestCase(
        code,
        language,
        testCase,
        i + 1,
        functionName
      );

      results.testResults.push(testResult);
      totalRuntime += testResult.runtime;
      maxMemory = Math.max(maxMemory, testResult.memory);

      if (testResult.passed) {
        results.passedTests++;
      } else {
        results.failedTests++;
      }
    }

    // Calculate average runtime and max memory
    results.runtime = Math.round(totalRuntime / testCases.length);
    results.memory = maxMemory;

    // Determine overall status
    if (results.passedTests === results.totalTests) {
      results.status = 'Accepted';
    } else if (results.passedTests === 0) {
      results.status = 'Wrong Answer';
    } else {
      results.status = 'Partial Pass';
    }

    return results;
  } catch (error) {
    return {
      status: 'Runtime Error',
      totalTests: testCases.length,
      passedTests: 0,
      failedTests: testCases.length,
      testResults: [],
      runtime: 0,
      memory: 0,
      errorMessage: error.message,
      compilationError: error.stack,
    };
  }
};

/**
 * Execute a single test case
 */
const executeTestCase = async (code, language, testCase, testNumber, functionName) => {
  const startTime = Date.now();
  
  try {
    let result;
    let actualOutput;
    let expectedOutput = testCase.expectedOutput;

    // JavaScript execution
    if (language === 'javascript') {
      result = executeJavaScript(code, testCase.input, functionName);
      actualOutput = result.output;
    }
    // Python execution (simulated)
    else if (language === 'python') {
      result = executePython(code, testCase.input, functionName);
      actualOutput = result.output;
    }
    // Java execution (simulated)
    else if (language === 'java') {
      result = executeJava(code, testCase.input, functionName);
      actualOutput = result.output;
    }
    // C++ execution (simulated)
    else if (language === 'cpp') {
      result = executeCpp(code, testCase.input, functionName);
      actualOutput = result.output;
    }
    else {
      throw new Error(`Unsupported language: ${language}`);
    }

    const runtime = Date.now() - startTime;
    const memory = Math.floor(Math.random() * 20) + 10; // Simulated memory usage

    // Compare outputs
    const passed = compareOutputs(actualOutput, expectedOutput);

    return {
      testNumber,
      passed,
      input: testCase.input,
      expectedOutput,
      actualOutput,
      runtime,
      memory,
      hidden: testCase.isHidden || false,
      errorMessage: result.error || null,
      explanation: passed 
        ? 'Test case passed successfully!' 
        : generateErrorExplanation(testCase.input, expectedOutput, actualOutput),
    };
  } catch (error) {
    return {
      testNumber,
      passed: false,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: null,
      runtime: Date.now() - startTime,
      memory: 0,
      hidden: testCase.isHidden || false,
      errorMessage: error.message,
      explanation: `Runtime Error: ${error.message}`,
    };
  }
};

/**
 * Execute JavaScript code
 */
const executeJavaScript = (code, input, functionName) => {
  try {
    // Parse input (can be array, string, number, etc.)
    const parsedInput = parseInput(input);
    
    // Create a sandboxed execution environment
    const wrappedCode = `
      ${code}
      
      // Execute the function
      const __input__ = ${JSON.stringify(parsedInput)};
      const __result__ = ${functionName}(...(Array.isArray(__input__) ? __input__ : [__input__]));
      __result__;
    `;

    // Execute in isolated context (simplified - use vm module in production)
    const result = eval(wrappedCode);
    
    return {
      output: JSON.stringify(result),
      error: null,
    };
  } catch (error) {
    return {
      output: null,
      error: error.message,
    };
  }
};

/**
 * Execute Python code (simulated)
 */
const executePython = (code, input, functionName) => {
  // In production, use child_process to execute Python
  // For now, simulate execution
  try {
    // Simulate Python execution
    const parsedInput = parseInput(input);
    const simulatedOutput = simulateExecution(parsedInput);
    
    return {
      output: JSON.stringify(simulatedOutput),
      error: null,
    };
  } catch (error) {
    return {
      output: null,
      error: error.message,
    };
  }
};

/**
 * Execute Java code (simulated)
 */
const executeJava = (code, input, functionName) => {
  // In production, compile and execute Java
  try {
    const parsedInput = parseInput(input);
    const simulatedOutput = simulateExecution(parsedInput);
    
    return {
      output: JSON.stringify(simulatedOutput),
      error: null,
    };
  } catch (error) {
    return {
      output: null,
      error: error.message,
    };
  }
};

/**
 * Execute C++ code (simulated)
 */
const executeCpp = (code, input, functionName) => {
  // In production, compile and execute C++
  try {
    const parsedInput = parseInput(input);
    const simulatedOutput = simulateExecution(parsedInput);
    
    return {
      output: JSON.stringify(simulatedOutput),
      error: null,
    };
  } catch (error) {
    return {
      output: null,
      error: error.message,
    };
  }
};

/**
 * Parse input string to appropriate data type
 */
const parseInput = (input) => {
  try {
    // Try to parse as JSON
    return JSON.parse(input);
  } catch {
    // If not JSON, return as string
    return input;
  }
};

/**
 * Simulate execution for non-JavaScript languages
 */
const simulateExecution = (input) => {
  // This is a placeholder - replace with actual execution
  // For demonstration, just return the input modified
  if (Array.isArray(input)) {
    return input.length;
  }
  return input;
};

/**
 * Compare actual output with expected output
 */
const compareOutputs = (actual, expected) => {
  try {
    // Normalize outputs
    const normalizedActual = normalizeOutput(actual);
    const normalizedExpected = normalizeOutput(expected);
    
    // Deep comparison
    return JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
  } catch {
    return actual === expected;
  }
};

/**
 * Normalize output for comparison
 */
const normalizeOutput = (output) => {
  if (typeof output === 'string') {
    try {
      return JSON.parse(output);
    } catch {
      return output.trim();
    }
  }
  return output;
};

/**
 * Generate detailed error explanation
 */
const generateErrorExplanation = (input, expected, actual) => {
  return `
❌ Wrong Answer

📥 Input:
${formatInput(input)}

✅ Expected Output:
${formatOutput(expected)}

❌ Your Output:
${formatOutput(actual)}

💡 Explanation:
Your solution produced incorrect output for this test case. 
${analyzeError(expected, actual)}
  `.trim();
};

/**
 * Format input for display
 */
const formatInput = (input) => {
  try {
    const parsed = parseInput(input);
    if (Array.isArray(parsed)) {
      return `[${parsed.join(', ')}]`;
    }
    return JSON.stringify(parsed, null, 2);
  } catch {
    return input;
  }
};

/**
 * Format output for display
 */
const formatOutput = (output) => {
  if (output === null || output === undefined) {
    return 'null';
  }
  try {
    const parsed = typeof output === 'string' ? JSON.parse(output) : output;
    return JSON.stringify(parsed, null, 2);
  } catch {
    return String(output);
  }
};

/**
 * Analyze the difference between expected and actual output
 */
const analyzeError = (expected, actual) => {
  if (actual === null || actual === undefined) {
    return 'Your function did not return any value. Make sure to return the result.';
  }
  
  try {
    const expectedParsed = normalizeOutput(expected);
    const actualParsed = normalizeOutput(actual);
    
    if (Array.isArray(expectedParsed) && Array.isArray(actualParsed)) {
      if (expectedParsed.length !== actualParsed.length) {
        return `Expected array length: ${expectedParsed.length}, but got: ${actualParsed.length}`;
      }
      return 'Array values do not match the expected output.';
    }
    
    if (typeof expectedParsed === 'number' && typeof actualParsed === 'number') {
      const diff = Math.abs(expectedParsed - actualParsed);
      return `Numerical difference: ${diff}`;
    }
    
    return 'Output does not match expected result. Check your logic carefully.';
  } catch {
    return 'Could not analyze the difference. Please review your solution.';
  }
};

/**
 * Compile code (check for syntax errors)
 */
export const compileCode = async (code, language) => {
  try {
    if (language === 'javascript') {
      // Try to parse JavaScript
      new Function(code);
      return { success: true, error: null };
    }
    
    // For other languages, simulate compilation
    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error.message,
        line: error.lineNumber || null,
        column: error.columnNumber || null,
      },
    };
  }
};
