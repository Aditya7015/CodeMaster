import { useState, useEffect } from 'react';
import SubmissionModal from './submissionsModals';
import axiosClient from '../utils/axios';

const SubmissionList = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const res = await axiosClient.get(`/submit/submittedSolution/${problemId}`, {
        withCredentials: true,
      });

      if (Array.isArray(res.data)) {
        setSubmissions(res.data);
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      console.error('Error fetching submissions', err);
    }
  };

  useEffect(() => {
    if (problemId) fetchSubmissions();
  }, [problemId]);

  const statusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 font-medium';
      case 'wrong':
        return 'text-red-600 font-medium';
      case 'error':
        return 'text-yellow-600 font-medium';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Submissions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Runtime</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Testcases</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No submissions yet.
                </td>
              </tr>
            ) : (
              submissions.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50 transition">
                  <td className={`px-4 py-3 ${statusColor(sub.status)}`}>
                    {sub.status}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{sub.language}</td>
                  <td className="px-4 py-3 text-gray-700">{sub.runtime} ms</td>
                  <td className="px-4 py-3 text-gray-700">{sub.memory} kb</td>
                  <td className="px-4 py-3 text-gray-700">
                    {sub.testCasesPassed}/{sub.testCasesTotal}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="px-3 py-1 text-sm rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setSelectedSubmission(sub)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default SubmissionList;