const ResultTab = ({ submitResult }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <h3 className="font-semibold text-gray-900 mb-4">Submission Result</h3>
      {submitResult ? (
        <div className={`p-4 rounded-lg border ${
          submitResult.accepted
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div>
            {submitResult.status === 'accepted' ? (
              <div>
                <h4 className="font-bold text-lg">🎉 Accepted</h4>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    Test Cases Passed: {submitResult.testCasesPassed}/{submitResult.testCasesTotal}
                  </p>
                  <p>Runtime: {submitResult.runtime} sec</p>
                  <p>Memory: {submitResult.memory} KB</p>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-bold text-lg">❌ {submitResult.error || 'Wrong Answer'}</h4>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    Test Cases Passed: {submitResult.testCasesPassed}/{submitResult.testCasesTotal}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 bg-white p-6 rounded-lg border border-gray-200 text-center">
          Click "Submit" to submit your solution for evaluation.
        </div>
      )}
    </div>
  );
};

export default ResultTab;