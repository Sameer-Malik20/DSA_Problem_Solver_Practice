# 🚀 Code Execution System - Like LeetCode & GeeksforGeeks

## Overview

The DSA Platform now includes a comprehensive code execution and testing system similar to LeetCode and GeeksforGeeks. This system provides detailed feedback on code submissions, showing exactly which test cases pass or fail and why.

---

## ✨ Features

### 1. **Detailed Test Case Results**
- ✅ Shows pass/fail status for each test case
- 📥 Displays input for each test
- ✅ Shows expected output
- ❌ Shows actual output from your code
- 💡 Provides explanations for why tests failed

### 2. **Compilation Error Detection**
- Checks code for syntax errors before execution
- Shows detailed error messages with line numbers
- Prevents submission of invalid code

### 3. **Runtime Error Handling**
- Catches and displays runtime errors
- Shows error message and stack trace
- Helps identify bugs in logic

### 4. **Multiple Status Types**
- ✅ **Accepted** - All test cases passed
- ❌ **Wrong Answer** - Some test cases failed
- ⚠️ **Partial Pass** - Some tests passed, some failed
- 🔴 **Runtime Error** - Code crashed during execution
- 🟣 **Compilation Error** - Syntax errors in code
- ⏱️ **Time Limit Exceeded** - Code took too long

### 5. **Performance Metrics**
- Runtime measurement (milliseconds)
- Memory usage (MB)
- Performance comparison across test cases

### 6. **Two Execution Modes**

#### **Run Code** (Blue Button)
- Tests against visible test cases only
- Quick feedback for development
- Doesn't count as submission
- Results shown in "Test Cases" tab

#### **Submit** (Green Button)
- Tests against all test cases (including hidden)
- Counts as official submission
- Updates user statistics
- Results shown in "Submission" tab

---

## 🏗️ Architecture

### Backend Components

#### 1. **Code Executor** (`backend/utils/codeExecutor.js`)

Main execution engine that:
- Compiles code to check for syntax errors
- Executes code against test cases
- Measures performance (runtime, memory)
- Compares outputs with expected results
- Generates detailed error explanations

**Key Functions:**

```javascript
// Execute code against all test cases
executeCode(code, language, testCases, functionName)

// Check for compilation errors
compileCode(code, language)

// Execute single test case
executeTestCase(code, language, testCase, testNumber, functionName)

// Compare outputs
compareOutputs(actual, expected)

// Generate error explanations
generateErrorExplanation(input, expected, actual)
```

#### 2. **Submissions Route** (`backend/routes/submissions.js`)

Updated endpoints:

```javascript
// Submit solution (all test cases)
POST /api/submissions
Body: { problemId, code, language }

// Run code (visible test cases only)
POST /api/submissions/run
Body: { problemId, code, language }
```

#### 3. **Submission Model** (`backend/models/Submission.js`)

Enhanced schema with detailed test results:

```javascript
{
  user: ObjectId,
  problem: ObjectId,
  code: String,
  language: String,
  status: String, // Accepted, Wrong Answer, etc.
  runtime: String,
  memory: String,
  testCasesPassed: Number,
  totalTestCases: Number,
  testResults: [{
    testNumber: Number,
    passed: Boolean,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    runtime: Number,
    memory: Number,
    hidden: Boolean,
    errorMessage: String,
    explanation: String
  }],
  errorMessage: String,
  submittedAt: Date
}
```

### Frontend Components

#### 1. **TestResults Component** (`frontend/src/components/TestResults.jsx`)

Displays execution results in LeetCode-style UI:

**Features:**
- Overall status indicator (Accepted/Wrong Answer)
- Test case breakdown
- Input/Output comparison
- Error explanations
- Debugging tips
- Performance metrics
- Hidden test cases indicator

**Props:**
```javascript
<TestResults 
  executionResult={executionResult}
  showAllTests={false}  // false for Run, true for Submit
/>
```

#### 2. **ProblemDetail Page** (`frontend/src/pages/ProblemDetail.jsx`)

Updated with:
- **Run Code** button (blue) - Tests visible cases
- **Submit** button (green) - Tests all cases
- **Test Cases** tab - Shows run results
- **Submission** tab - Shows submission results
- Real-time execution state

---

## 📊 Execution Flow

### Run Code Flow

```
User clicks "Run Code"
     ↓
Frontend → POST /api/submissions/run
     ↓
Backend: compileCode()
     ↓
Backend: executeCode() (visible tests only)
     ↓
Frontend: Display in "Test Cases" tab
```

### Submit Code Flow

```
User clicks "Submit"
     ↓
Frontend → POST /api/submissions
     ↓
Backend: compileCode()
     ↓
Backend: executeCode() (all tests)
     ↓
Backend: Save submission to database
     ↓
Backend: Update problem stats
     ↓
Backend: Update user solved problems (if accepted)
     ↓
Frontend: Display in "Submission" tab
```

---

## 🧪 Test Case Structure

Each test case in the database includes:

```javascript
{
  input: "[[1,2],[3,4]]",      // Input as string
  expectedOutput: "10",         // Expected result
  isHidden: false,              // Visible or hidden
}
```

### Test Case Processing

1. **Parse Input**: Convert string to appropriate data type
   ```javascript
   "[1,2,3]" → [1, 2, 3]
   "5" → 5
   ```

2. **Execute Code**: Run user's function with parsed input

3. **Compare Outputs**: Deep comparison of results
   ```javascript
   Expected: [1,2,3]
   Actual:   [1,2,3]  ✅ Match
   
   Expected: [1,2,3]
   Actual:   [1,3,2]  ❌ No Match
   ```

4. **Generate Explanation**: If wrong, explain why
   ```
   ❌ Wrong Answer
   
   📥 Input: [1,2,3,4]
   ✅ Expected: 10
   ❌ Your Output: 8
   
   💡 Explanation:
   Numerical difference: 2
   ```

---

## 🎨 UI Components

### Status Indicators

| Status | Color | Icon | Description |
|--------|-------|------|-------------|
| Accepted | Green | ✅ | All tests passed |
| Wrong Answer | Red | ❌ | Some tests failed |
| Partial Pass | Red | ❌ | Some passed, some failed |
| Runtime Error | Orange | ⚠️ | Code crashed |
| Compilation Error | Purple | 🔧 | Syntax errors |

### Test Case Display

```
┌─────────────────────────────────────┐
│ ✅ Test Case 1                      │
├─────────────────────────────────────┤
│ Input:                              │
│ [1, 2, 3, 4]                        │
│                                     │
│ Expected Output:                    │
│ 10                                  │
│                                     │
│ Your Output:                        │
│ 10                                  │
└─────────────────────────────────────┘
```

### Error Explanation

```
┌─────────────────────────────────────┐
│ 💡 Why this failed:                 │
│                                     │
│ Your solution produced incorrect    │
│ output for this test case.          │
│                                     │
│ Expected array length: 3            │
│ But got: 2                          │
└─────────────────────────────────────┘
```

---

## 🔧 Language Support

### Currently Supported

#### JavaScript (Fully Functional)
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var solution = function(nums) {
    // Your code here
};
```

#### Python, Java, C++ (Simulated)
- Code structure validation
- Simulated execution
- Ready for real execution implementation

### Adding Real Execution

To enable actual code execution for other languages:

1. **Python**:
   ```javascript
   const { spawn } = require('child_process');
   const python = spawn('python3', ['-c', code]);
   ```

2. **Java**:
   ```javascript
   // Compile: javac Solution.java
   // Execute: java Solution
   ```

3. **C++**:
   ```javascript
   // Compile: g++ solution.cpp -o solution
   // Execute: ./solution
   ```

**Security Note**: Use Docker containers or sandboxed environments for production!

---

## 🔒 Security Considerations

### Current Implementation (Development)

- ⚠️ Uses `eval()` for JavaScript execution
- ⚠️ No sandboxing
- ⚠️ No resource limits

### Production Requirements

1. **Use Docker Containers**
   ```javascript
   docker run --rm \
     --cpus=0.5 \
     --memory=128m \
     --timeout=5s \
     --network=none \
     user-code-image
   ```

2. **Implement Resource Limits**
   - CPU time limit (e.g., 1-5 seconds)
   - Memory limit (e.g., 128-256 MB)
   - Network isolation
   - File system restrictions

3. **Use Sandboxing Services**
   - [Judge0](https://github.com/judge0/judge0)
   - [Piston](https://github.com/engineer-man/piston)
   - [CodeX Executor](https://github.com/Jaagrav/CodeX)

---

## 📈 Performance Optimization

### Caching

```javascript
// Cache compiled code
const compiledCache = new Map();

// Cache test results for identical code
const resultCache = new Map();
```

### Parallel Execution

```javascript
// Run independent test cases in parallel
const results = await Promise.all(
  testCases.map(tc => executeTestCase(code, language, tc))
);
```

### Resource Management

```javascript
// Limit concurrent executions
const executionQueue = new Queue({ concurrency: 10 });
```

---

## 🐛 Debugging Features

### For Users

1. **Detailed Error Messages**
   - Shows exact input that failed
   - Compares expected vs actual
   - Suggests possible issues

2. **Test Case Visibility**
   - Run shows visible cases
   - Submit shows all cases
   - Clear indication of hidden tests

3. **Debugging Tips**
   - Check edge cases
   - Verify data types
   - Test manually
   - Review constraints

### For Developers

```javascript
// Enable debug logging
const DEBUG = process.env.DEBUG_EXECUTOR === 'true';

if (DEBUG) {
  console.log('Input:', parsedInput);
  console.log('Output:', result);
  console.log('Expected:', expected);
}
```

---

## 📝 Usage Examples

### Run Code

```javascript
// Frontend
const handleRun = async () => {
  const { data } = await submissionsAPI.run({
    problemId: problem._id,
    code: userCode,
    language: 'javascript'
  });
  
  // data.executionResult contains:
  // - status
  // - testResults (visible only)
  // - runtime, memory
};
```

### Submit Code

```javascript
// Frontend
const handleSubmit = async () => {
  const { data } = await submissionsAPI.submit({
    problemId: problem._id,
    code: userCode,
    language: 'javascript'
  });
  
  // data.executionResult contains:
  // - status
  // - testResults (all tests)
  // - runtime, memory
  // - saved to database
};
```

---

## 🎯 Future Enhancements

### Planned Features

1. **Real-time Execution**
   - WebSocket for live updates
   - Progress indicators
   - Cancellable execution

2. **Code Analysis**
   - Time complexity analysis
   - Space complexity analysis
   - Code quality metrics

3. **Custom Test Cases**
   - Let users add their own tests
   - Save custom test suites
   - Share test cases

4. **Video Explanations**
   - Embed solution videos
   - Step-by-step walkthroughs
   - Visual debugging

5. **AI Assistance**
   - GPT-powered hints
   - Code review suggestions
   - Bug detection

---

## 🚀 Getting Started

### 1. Test the System

1. Start backend and frontend servers
2. Navigate to any problem
3. Write a solution
4. Click "Run Code" to test visible cases
5. Fix any errors
6. Click "Submit" to test all cases

### 2. Example Problem Test

```javascript
// Problem: Sum of Array
// Input: [1, 2, 3, 4]
// Expected Output: 10

function solution(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

// This will:
// ✅ Pass Test 1: [1,2,3,4] → 10
// ✅ Pass Test 2: [5,5] → 10
// ✅ Pass Test 3: [] → 0
```

### 3. View Results

- **Test Cases Tab**: See which tests passed/failed
- **Submission Tab**: See full results after submit
- **Performance**: Check runtime and memory usage

---

## 📞 Troubleshooting

### Issue: "Compilation Error"

**Solution**: Check your code syntax
- Missing brackets, semicolons
- Typos in function names
- Incorrect language selected

### Issue: "Runtime Error"

**Solution**: Check your logic
- Null/undefined errors
- Array index out of bounds
- Division by zero

### Issue: "Wrong Answer"

**Solution**: Debug your algorithm
- Check edge cases
- Verify data types
- Test with examples manually
- Review problem constraints

---

## 🎉 Summary

Your DSA platform now has a **complete code execution system** like LeetCode:

✅ Detailed test case results  
✅ Error explanations  
✅ Performance metrics  
✅ Run vs Submit modes  
✅ Beautiful UI  
✅ Multiple language support (structure ready)  

**Happy Coding! 🚀💻**
