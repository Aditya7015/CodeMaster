import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';
import axiosClient from '../utils/axios';

const ProblemsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProb, setSolvedProb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all',
    search: '',
  });
 
  console.log("problems",problems);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axiosClient.get('/problem/AllProbmlem');
        console.log("response",response.data);
        setProblems(response.data);
      } catch (err) {
        console.error('Error fetching problems:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSolvedProblems = async () => {
      if (!user) return;
      try {
        const { data } = await axiosClient.get('/problem/getallsubmitproblem');
        setSolvedProb(data);
      } catch (err) {
        console.error('Error fetching solved problems:', err);
      }
    };

    fetchProblems();
    fetchSolvedProblems();
  }, [user]);

  // Get unique tags for filter dropdown
  const allTags = [...new Set(problems.flatMap(p => p.tags || []))];

  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const matchesTag = filters.tag === 'all' || (problem.tags && problem.tags.includes(filters.tag));
    const matchesStatus = filters.status === 'all' ||
      (filters.status === 'solved' ? solvedProb.some(sp => sp._id === problem._id) :
       filters.status === 'unsolved' ? !solvedProb.some(sp => sp._id === problem._id) : true);
    const matchesSearch = problem.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchesDifficulty && matchesTag && matchesStatus && matchesSearch;
  });

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Problems</h1>
        <p className="text-gray-600 mt-2">Practice coding challenges and improve your skills.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl text-gray-400 shadow-sm border border-gray-200 p-6 mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
          <input
            type="text"
            placeholder="Search problems by title..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg placeholder-gray-600 focus:ring-2  focus:ring-green-600 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <select
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition bg-white"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition bg-white"
          >
            <option value="all">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition bg-white"
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading problems...</div>
        ) : filteredProblems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No problems found matching your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProblems.map((problem) => {
                  const isSolved = solvedProb.some(sp => sp._id === problem._id);
                  return (
                    <tr key={problem._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <NavLink to={`/codeeditor/${problem._id}`} className="text-gray-900 hover:text-green-600 font-medium">
                          {problem.title}
                        </NavLink>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${difficultyColor[problem.difficulty]}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {problem?.tags}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isSolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {isSolved ? 'Solved' : 'Unsolved'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ProblemsPage;