import CodeTab from './CodeTab';
import TestCaseTab from './TestCaseTab';
import ResultTab from './ResultTab';

const RightPanel = ({
  problem,
  selectedLanguage,
  code,
  onCodeChange,
  onLanguageChange,
  onRun,
  onSubmit,
  loading,
  runResult,
  isContestOver,
  submitResult,
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'code', label: 'Code' },
    { id: 'testcase', label: 'Testcase' },
    { id: 'result', label: 'Result' },
  ];

  return (
    <div className="w-1/2 flex flex-col bg-white">
      {/* Tabs */}
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

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'code' && (
          <CodeTab
            selectedLanguage={selectedLanguage}
            code={code}
            onCodeChange={onCodeChange}
            onLanguageChange={onLanguageChange}
            onRun={onRun}
            onSubmit={onSubmit}
            loading={loading}
            isContestOver={isContestOver}
          />
        )}
        {activeTab === 'testcase' && <TestCaseTab runResult={runResult} />}
        {activeTab === 'result' && <ResultTab submitResult={submitResult} />}
      </div>
    </div>
  );
};

export default RightPanel;