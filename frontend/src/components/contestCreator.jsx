import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import { Search, X } from "lucide-react";

export function ContestCreator() {
  const [form, setForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });
  const [allProblems, setAllProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axiosClient.get("/problem/AllProbmlem");
        setAllProblems(res.data);
      } catch (err) {
        console.error("Error fetching problems", err);
      }
    };
    fetchProblems();
  }, []);

  const handleSelect = (problem) => {
    if (selectedProblems.find((p) => p._id === problem._id)) return;
    setSelectedProblems([...selectedProblems, problem]);
  };

  const handleRemove = (id) => {
    setSelectedProblems(selectedProblems.filter((p) => p._id !== id));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.startTime || !form.endTime) {
      alert("Please fill all contest details");
      return;
    }
    if (selectedProblems.length === 0) {
      alert("Please select at least one problem");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        problems: selectedProblems.map((p) => p._id),
      };
      await axiosClient.post("/contest/create", payload);
      alert("Contest Created ✅");
      // Reset form
      setForm({ title: "", startTime: "", endTime: "" });
      setSelectedProblems([]);
      setSearch("");
    } catch (err) {
      console.error(err);
      alert("Error creating contest ❌");
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = allProblems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Contest</h2>
        <p className="text-gray-600">Set up a new coding competition</p>
      </div>

      {/* Contest Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contest Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Weekly Challenge #42"
            className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              className="w-full px-4 py-2 placeholder-gray-600 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={form.startTime}
              style={{ colorScheme:"light" }}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={form.endTime}
              style={{ colorScheme:"light" }}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Problem Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Select Problems <span className="text-red-500">*</span>
        </label>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4  text-gray-600 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Problem list dropdown */}
        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg bg-white">
          {filteredProblems.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No problems found
            </div>
          ) : (
            filteredProblems.map((problem) => (
              <div
                key={problem._id}
                onClick={() => handleSelect(problem)}
                className="p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-0 transition"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {problem.title}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      problem.difficulty === "easy"
                        ? "bg-green-100 text-green-800"
                        : problem.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {problem.difficulty || "medium"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected problems pills */}
        {selectedProblems.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selected Problems ({selectedProblems.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedProblems.map((p) => (
                <div
                  key={p._id}
                  className="inline-flex text-gray-600 items-center gap-1 bg-green-100  px-3 py-1 rounded-full text-sm"
                >
                  <span>{p.title}</span>
                  <button
                    onClick={() => handleRemove(p._id)}
                    className="ml-1 hover:text-green-900 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Contest"}
      </button>
    </div>
  );
}