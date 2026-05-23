import DescriptionTab from './DescriptionTab';
import SolutionsTab from './SolutionsTab';
import SubmissionList from '../submissions';
import ChatAi from '../ChatAi';

const LeftPanel = ({ problem, activeTab, onTabChange, problemId ,contestId}) => {
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'submissions', label: 'Submissions' },
    { id: 'chatAi', label: 'Ask AI' },
  ];

  return (
    <div className="w-1/2 flex flex-col bg-white">
      {/* Tabs */}
      {contestId?
      <button
            key={tabs[0].id}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
              activeTab === tabs[0].id
                ? 'text-green-600 border-green-600'
                : 'text-gray-600 hover:text-green-600 border-transparent hover:border-green-300'
            }`}
            onClick={() => onTabChange(tabs[0].id)}
          >
            {tabs[0].label}
          </button>
      :
      <div className="flex border-b border-gray-200 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
              activeTab === tab.id
                ? 'text-green-600 border-green-600'
                : 'text-gray-600 hover:text-green-600 border-transparent hover:border-green-300'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
}
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">

        {contestId && problem ? activeTab === 'description' && <DescriptionTab problem={problem} /> : <>
        {problem && (
          <>
            {activeTab === 'description' && <DescriptionTab problem={problem} />}
            {activeTab === 'solutions' && <SolutionsTab problem={problem} />}
            {activeTab === 'submissions' && <SubmissionList problemId={problemId} />}
            {activeTab === 'chatAi' && <ChatAi problem={problem} />}
          </>
        )}
      </> }
      </div>
    </div>
  );
};

export default LeftPanel;