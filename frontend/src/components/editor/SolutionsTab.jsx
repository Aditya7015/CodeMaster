const SolutionsTab = ({ problem }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Solutions</h2>
      <div className="space-y-6">
        {problem.referenceSolution?.length > 0 ? (
          problem.referenceSolution.map((solution, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">
                  {problem.title} - {solution.language}
                </h3>
              </div>
              <div className="p-4 bg-white">
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto text-gray-800">
                  <code>{solution.completeCode}</code>
                </pre>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            Solutions will be available after you solve the problem.
          </p>
        )}
      </div>
    </div>
  );
};

export default SolutionsTab;