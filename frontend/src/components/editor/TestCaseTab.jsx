const decodeBase64 = (str) => {
  try {
    return atob(str);
  } catch {
    return str;
  }
};

const TestCaseTab = ({ runResult }) => {
  if (!runResult) {
    return (
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-4">Test Results</h3>
        <div className="text-gray-500 bg-white p-6 rounded-lg border border-gray-200 text-center">
          Click "Run" to test your code with the example test cases.
        </div>
      </div>
    );
  }

  const testCases = runResult.testCases || [];

  const total = testCases.length;
  const passedCount = testCases.filter(tc => tc.passed).length;
  const allPassed = total > 0 && passedCount === total;

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <h3 className="font-semibold text-gray-900 mb-4">Test Results</h3>

      <div
        className={`p-4 rounded-lg border ${
          allPassed
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        {/* Summary */}
        <h4 className="font-bold mb-2">
          {allPassed
            ? "✅ All test cases passed!"
            : "❌ Some test cases failed"}
        </h4>

        <p className="text-sm">
          Passed {passedCount} / {total} test cases
        </p>

        <p className="text-sm mt-1">Runtime: {runResult.runtime} sec</p>
        <p className="text-sm">Memory: {runResult.memory} KB</p>

        {/* Test case details */}
        <div className="mt-4 space-y-2">
          {testCases.map((tc, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded border border-gray-200 text-xs"
            >
              <div className="font-mono text-gray-800">
                <div>
                  <span className="font-medium">Test Case:</span> {tc.testCase}
                </div>

                <div>
                  <span className="font-medium">Expected:</span>{" "}
                  {decodeBase64(tc.expected)}
                </div>

                <div>
                  <span className="font-medium">Output:</span> {tc.output}
                </div>

                <div
                  className={
                    tc.passed
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {tc.passed ? "✓ Passed" : `✗ ${tc.status}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestCaseTab;