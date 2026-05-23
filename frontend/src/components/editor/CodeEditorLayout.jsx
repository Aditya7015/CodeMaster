import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from '../../utils/axios';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const langMap = {
  cpp: 'c++',
  java: 'java',
  javascript: 'javascript',
};

const CodeEditorLayout = ({ problemId, contestId, contestEndTime }) => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');

  const { handleSubmit } = useForm();

  // Fetch problem data
  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/getproblem/${problemId}`);
        const initialCode = response.data.startCode.find(
          (sc) => sc.language === langMap[selectedLanguage]
        )?.initialCode;
        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId, selectedLanguage]);

  // Update code when language changes
  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(
        (sc) => sc.language === langMap[selectedLanguage]
      )?.initialCode;
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);

    try {
      console.log('run')
      const response = await axiosClient.post(`/submit/runproblem/${problemId}`, {
        code,
        language: selectedLanguage,
        contestId: contestId || null 
      });
console.log(response.data);
      const testCases = response.data;
      const success = testCases.every(
        (tc) => tc.stdout?.trim() === tc.expected_output?.trim()
      );

      setRunResult({
        success,
        runtime: testCases[0]?.time,
        memory: testCases[0]?.memory,
        testCases,
      });

      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      console.log('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error',
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);

    try {
      console.log("run called");
      const response = await axiosClient.post(`/submit/submitproblem/${problemId}`, {
        code,
        language: selectedLanguage,
        contestId: contestId || null 
      });
      console.log(response.data);

      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
    } catch (error) {
      console.log('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-0rem)] bg-gray-50">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }
 const isContestOver =
  contestEndTime && new Date() > new Date(contestEndTime);
  return (
    <div className="flex h-[calc(100vh-0rem)] bg-white">
      <LeftPanel
        problem={problem}
        activeTab={activeLeftTab}
        onTabChange={setActiveLeftTab}
        problemId={problemId}
        contestId={contestId}
      />
      <div className="w-px bg-gray-200" /> {/* vertical divider */}
      <RightPanel
        problem={problem}
        selectedLanguage={selectedLanguage}
        code={code}
        onCodeChange={setCode}
        onLanguageChange={handleLanguageChange}
        onRun={handleRun}
        onSubmit={handleSubmitCode}
        loading={loading}
        isContestOver={isContestOver}
        runResult={runResult}
        submitResult={submitResult}
        activeTab={activeRightTab}
        onTabChange={setActiveRightTab}
      />
    </div>
  );
};

export default CodeEditorLayout;