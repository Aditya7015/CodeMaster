import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import { Calendar, Edit2, Clock } from "lucide-react";

export function ContestUpdate() {
  const [contests, setContests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axiosClient.get("/contest/getAllContest");
        setContests(res.data);
      } catch (err) {
        console.error("Failed to fetch contests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const handleSelect = (contest) => {
    setSelected(contest);
    setForm({
      title: contest.title,
      startTime: contest.startTime?.slice(0, 16),
      endTime: contest.endTime?.slice(0, 16),
    });
  };

  const handleUpdate = async () => {
    if (!selected) return;
    setUpdating(true);
    try {
      await axiosClient.put(`/contest/update/${selected._id}`, form);
      alert("Contest updated ✅");
      // Optionally refresh the list
      const res = await axiosClient.get("/contest/getAllContest");
      setContests(res.data);
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    } finally {
      setUpdating(false);
    }
  };

  // Helper to get status badge style
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Update Contest</h2>
        <p className="text-gray-600">Modify an existing contest</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contest List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Contest</h3>
            <p className="text-sm text-gray-500 mt-1">
              {contests.length} contest{contests.length !== 1 && "s"} available
            </p>
          </div>

          <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
            {contests.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No contests found</div>
            ) : (
              contests.map((contest) => (
                <div
                  key={contest._id}
                  onClick={() => handleSelect(contest)}
                  className={`p-4 cursor-pointer transition ${
                    selected?._id === contest._id
                      ? "bg-green-50 border-l-4 border-l-green-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{contest.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>{new Date(contest.startTime).toLocaleDateString()}</span>
                        <Clock size={14} className="ml-2" />
                        <span>{new Date(contest.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(contest.status)}`}>
                      {contest.status || "upcoming"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Edit Form */}
        {selected ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Contest</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contest Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 text-gray-600 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={updating}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Edit2 size={18} />
                {updating ? "Updating..." : "Update Contest"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center text-gray-500">
            Select a contest to edit
          </div>
        )}
      </div>
    </div>
  );
}