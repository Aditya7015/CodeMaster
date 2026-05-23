import React, { useState, useEffect } from 'react';
import axiosClient from "../utils/axios";
import { Search, Trash2 } from 'lucide-react';

export function ProblemDelete() {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problem/AllProbmlem");
        setProblems(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
        setError("Could not load problems. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getAllProblems();
  }, []);

  const handleDelete = async (id, problemTitle) => {
    if (window.confirm(`Are you sure you want to delete the problem: "${problemTitle}"?`)) {
      try {
        await axiosClient.delete(`/problem/deleteproblem/${id}`);
        setProblems(currentProblems =>
          currentProblems.filter(problem => problem._id !== id)
        );
        alert(`Problem "${problemTitle}" deleted successfully.`);
      } catch (err) {
        console.error("Failed to delete problem:", err);
        alert("An error occurred while deleting the problem.");
      }
    }
  };

  const filteredProblems = problems.filter(problem =>
    problem.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to get difficulty badge styling
  const getDifficultyBadge = (difficulty) => {
    const map = {
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    };
    return map[difficulty?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading problems...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Problem</h2>
        <p className="text-gray-600">Remove problems from the platform</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full max-w-md pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Problems Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tag
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProblems.map((problem) => (
              <tr key={problem._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {problem.title}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDifficultyBadge(problem.difficulty)}`}>
                    {problem.difficulty || "medium"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {problem.tags || "Array"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(problem._id, problem.title)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProblems.length === 0 && problems.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            No problems match your search.
          </div>
        )}

        {problems.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No problems found.
          </div>
        )}
      </div>
    </div>
  );
}