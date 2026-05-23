// pages/AdminCreateContest.jsx

import { useEffect, useState } from "react";
import axiosClient from "../utils/axios";

export default function AdminCreateContest() {
  const [problems, setProblems] = useState([]);
  const [selected, setSelected] = useState([]);

  const [form, setForm] = useState({
    title: "",
    startTime: "",
    endTime: ""
  });

  useEffect(async() => {
     await axiosClient.get("/api/problems").then(res => {
      setProblems(res.data);
    });
  }, []);

  const toggleProblem = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    await axiosClient.post("/api/contest", {
      ...form,
      problems: selected
    });

    alert("Contest created");
  };

  return (
    <div className="p-6">
      <h1>Create Contest</h1>

      <input
        placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        type="datetime-local"
        onChange={e => setForm({ ...form, startTime: e.target.value })}
      />

      <input
        type="datetime-local"
        onChange={e => setForm({ ...form, endTime: e.target.value })}
      />

      <h2 className="mt-4 font-bold">Select Problems</h2>

      {problems.map(p => (
        <div key={p._id}>
          <input
            type="checkbox"
            onChange={() => toggleProblem(p._id)}
          />
          {p.title} ({p.difficulty})
        </div>
      ))}

      <button className="btn mt-4" onClick={handleSubmit}>
        Create Contest
      </button>
    </div>
  );
}