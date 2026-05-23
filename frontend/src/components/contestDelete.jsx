import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import { Search, Trash2 } from "lucide-react";

export function ContestDelete() {
  const [contests, setContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axiosClient.get("/contest/getAllContest");
        setContests(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch contests", err);
        setError("Could not load contests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the contest: "${title}"?`)) {
      try {
        await axiosClient.delete(`/contest/delete/${id}`);
        setContests((prev) => prev.filter((c) => c._id !== id));
        alert(`Contest "${title}" deleted successfully.`);
      } catch (err) {
        console.error("Failed to delete contest", err);
        alert("An error occurred while deleting the contest.");
      }
    }
  };

  const filteredContests = contests.filter((contest) =>
    contest.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper for status badge
  const getStatusBadge = (status) => {
    const map = {
      upcoming: "bg-blue-100 text-blue-800",
      live: "bg-green-100 text-green-800",
      past: "bg-gray-100 text-gray-800",
    };
    return map[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading contests...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Contest</h2>
        <p className="text-gray-600">Remove contests from the platform</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by contest title..."
          className="w-full max-w-md pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
             </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContests.map((contest) => (
              <tr key={contest._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {contest.title}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(contest.status)}`}>
                    {contest.status || "upcoming"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(contest.startTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(contest.endTime).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(contest._id, contest.title)}
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

        {filteredContests.length === 0 && contests.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            No contests match your search.
          </div>
        )}

        {contests.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No contests found.
          </div>
        )}
      </div>
    </div>
  );
}