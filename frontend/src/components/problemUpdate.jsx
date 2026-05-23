import React,{ useState, useEffect } from "react";
import axiosClient from "../utils/axios";
import { Search, Edit2, X, Save } from "lucide-react";

export function ProblemUpdate() {
  const [problems, setProblems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axiosClient.get("/problem/AllProbmlem");
        setProblems(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, []);

  const handleEdit = (problem) => {
    setEditingId(problem._id);
    setFormData(problem);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (id) => {
    try {
      await axiosClient.put(`/problem/update/${id}`, formData);
      const updatedProblems = problems.map((p) =>
        p._id === id ? { ...p, ...formData } : p
      );
      setProblems(updatedProblems);
      setEditingId(null);
      alert("Update successful");
    } catch (error) {
      console.error(error);
      alert("Error updating problem");
    }
  };

  const filteredProblems = problems.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading problems...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search problem by title..."
          className="w-full text-gray-600 max-w-md pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProblems.map((problem) => (
              <React.Fragment key={problem._id}>
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {problem.title}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        problem.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : problem.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {problem.tags}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(problem)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition"
                    >
                      <Edit2 size={16} />
                      Update
                    </button>
                  </td>
                </tr>

                {/* Edit Form Row */}
                {editingId === problem._id && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 bg-gray-50">
                      <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            name="title"
                            value={formData.title || ""}
                            onChange={handleChange}
                            placeholder="Title"
                            className="px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <select
                            name="difficulty"
                            value={formData.difficulty || ""}
                            onChange={handleChange}
                            className="px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </select>
                          <select
                            name="tags"
                            value={formData.tags || ""}
                            onChange={handleChange}
                            className="px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="Array">Array</option>
                            <option value="linkedList">Linked List</option>
                            <option value="tree">Tree</option>
                            <option value="graph">Graph</option>
                          </select>
                        </div>

                        <textarea
                          name="description"
                          value={formData.description || ""}
                          onChange={handleChange}
                          placeholder="Problem Description"
                          rows={6}
                          className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />

                        {/* Visible Test Cases */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Visible Test Cases
                          </h3>
                          {formData.visibleTestCases?.map((tc, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2"
                            >
                              <input
                                type="text"
                                placeholder="Input"
                                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={tc.input}
                                onChange={(e) => {
                                  const updated = [...formData.visibleTestCases];
                                  updated[idx].input = e.target.value;
                                  setFormData({
                                    ...formData,
                                    visibleTestCases: updated,
                                  });
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Output"
                                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={tc.output}
                                onChange={(e) => {
                                  const updated = [...formData.visibleTestCases];
                                  updated[idx].output = e.target.value;
                                  setFormData({
                                    ...formData,
                                    visibleTestCases: updated,
                                  });
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Explanation"
                                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={tc.explanation}
                                onChange={(e) => {
                                  const updated = [...formData.visibleTestCases];
                                  updated[idx].explanation = e.target.value;
                                  setFormData({
                                    ...formData,
                                    visibleTestCases: updated,
                                  });
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Hidden Test Cases */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Hidden Test Cases
                          </h3>
                          {formData.hiddenTestCases?.map((tc, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2"
                            >
                              <input
                                type="text"
                                placeholder="Input"
                                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={tc.input}
                                onChange={(e) => {
                                  const updated = [...formData.hiddenTestCases];
                                  updated[idx].input = e.target.value;
                                  setFormData({
                                    ...formData,
                                    hiddenTestCases: updated,
                                  });
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Output"
                                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={tc.output}
                                onChange={(e) => {
                                  const updated = [...formData.hiddenTestCases];
                                  updated[idx].output = e.target.value;
                                  setFormData({
                                    ...formData,
                                    hiddenTestCases: updated,
                                  });
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Start Code */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Start Code
                          </h3>
                          {formData.startCode?.map((code, idx) => (
                            <div key={idx} className="mt-3 space-y-2">
                              <input
                                type="text"
                                placeholder="Language"
                                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={code.language}
                                onChange={(e) => {
                                  const updated = [...formData.startCode];
                                  updated[idx].language = e.target.value;
                                  setFormData({ ...formData, startCode: updated });
                                }}
                              />
                              <textarea
                                placeholder="Initial Code"
                                rows={4}
                                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500"
                                value={code.initialCode}
                                onChange={(e) => {
                                  const updated = [...formData.startCode];
                                  updated[idx].initialCode = e.target.value;
                                  setFormData({ ...formData, startCode: updated });
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Reference Solution */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Reference Solution
                          </h3>
                          {formData.referenceSolution?.map((sol, idx) => (
                            <div key={idx} className="mt-3 space-y-2">
                              <input
                                type="text"
                                placeholder="Language"
                                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                value={sol.language}
                                onChange={(e) => {
                                  const updated = [...formData.referenceSolution];
                                  updated[idx].language = e.target.value;
                                  setFormData({ ...formData, referenceSolution: updated });
                                }}
                              />
                              <textarea
                                placeholder="Complete Code"
                                rows={6}
                                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500"
                                value={sol.completeCode}
                                onChange={(e) => {
                                  const updated = [...formData.referenceSolution];
                                  updated[idx].completeCode = e.target.value;
                                  setFormData({ ...formData, referenceSolution: updated });
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleUpdate(problem._id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                          >
                            <Save size={18} />
                            Submit
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                          >
                            <X size={18} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {filteredProblems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No problems found.
          </div>
        )}
      </div>
    </div>
  );
}