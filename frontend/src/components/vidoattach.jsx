import React, { useState, useEffect } from 'react';
import axiosClient from "../utils/axios";
import {NavLink} from "react-router"
export function VideoAttach() {
    // State to hold the original, complete list of problems
    const [problems, setProblems] = useState([]);
    // State to hold the user's search query
    const [searchTerm, setSearchTerm] = useState('');
    // State to handle loading status for better UX
    const [loading, setLoading] = useState(true);
    // State to handle potential errors
    const [error, setError] = useState(null);

    // useEffect hook to fetch data when the component mounts
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


    
    // Function to handle the deletion of a problem
    const handleDelete = async (id, problemTitle) => {
  if (window.confirm(`Are you sure you want to delete the video: "${problemTitle}"?`)) {
    try {
       
      await axiosClient.delete(`/video/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError(err);
      console.log("Failed to delete video:", err);
     
    }
  }
};

    // --- SEARCH FUNCTIONALITY ---
    // Filter the problems based on the searchTerm before rendering.
    // This derived state is calculated on every render.
    const filteredProblems = problems.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center p-4">Loading problems...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error.response.data.err}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Delete a Problem</h2>
            
            {/* Search Input Field */}
            <div className="form-control mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Difficulty</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map over the FILTERED list, not the original one */}
                        {filteredProblems.map((problem) => (
                            <tr key={problem._id} className="hover">
                                <td>{problem.title}</td>
                                <td className="capitalize">{problem.difficulty}</td>
                                <td className="text-center">
                                    
                                    <NavLink
                                        to={`/video/upload/${problem._id}`}
                                        className="btn btn-sm bg-emerald-500 text-black"
                                    >
                                        Upload
                                    </NavLink>
                                </td>
                                <td className="text-center">
                                    
                                    <button
                                        onClick={() => handleDelete(problem._id, problem.title)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Show a message if there are no results from the search */}
                {filteredProblems.length === 0 && problems.length > 0 && (
                     <p className="text-center p-4 text-gray-500">No problems match your search.</p>
                )}

                {/* Show a message if there are no problems at all */}
                {problems.length === 0 && !loading && (
                    <p className="text-center p-4">No problems found.</p>
                )}
            </div>
        </div>
    );
}