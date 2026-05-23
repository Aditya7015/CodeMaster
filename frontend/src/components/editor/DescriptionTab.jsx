const difficultyStyles = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

const DescriptionTab = ({ problem }) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyStyles[problem.difficulty]}`}>
          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {problem.tags}
        </span>
      </div>

      <div className="prose max-w-none text-gray-700">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {problem.description}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples:</h3>
        <div className="space-y-4">
          {problem?.visibleTestCases?.map((example, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Example {index + 1}:</h4>
              <div className="space-y-2 text-sm font-mono text-gray-700">
                {/* <div><span className="font-medium text-gray-900">Input:</span > <pre></pre> {example.input}</div>
                <div><span className="font-medium text-gray-900">Output:</span> {example.output}</div>
    
                <div><span className="font-medium text-gray-900">Explanation:</span> {example.explanation}</div> */}

                <div>
  <span className="font-medium text-gray-900">Input:</span>
  <pre className=" text-gray-800 p-2 rounded mt-1">
    {example.input}
  </pre>
</div>

<div>
  <span className="font-medium text-gray-900">Output:</span>
  <pre className=" text-gray-800 p-2 rounded mt-1">
    {example.output}
  </pre>
</div>

<div>
  <span className="font-medium text-gray-900">Explanation:</span>
  <p className="mt-1 text-gray-800">{example.explanation}</p>
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionTab;