import { NavLink } from 'react-router-dom';
import { Hash, Braces, Link, TreePine, Cpu, Activity } from 'lucide-react';

const ExplorePage = () => {
  const topics = [
    { name: 'Arrays', icon: Hash, tag: 'array' },
    { name: 'Strings', icon: Braces, tag: 'string' },
    { name: 'Linked Lists', icon: Link, tag: 'linkedlist' },
    { name: 'Trees', icon: TreePine, tag: 'tree' },
    { name: 'Dynamic Programming', icon: Cpu, tag: 'dp' },
    { name: 'Graphs', icon: Activity, tag: 'graph' },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Topics</h1>
      <p className="text-gray-600 mb-8">Choose a category to start practicing</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <NavLink
            key={topic.name}
            to={`/problems?tag=${topic.tag}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
              <topic.icon className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.name}</h3>
            <p className="text-gray-600 text-sm">Practice {topic.name.toLowerCase()} problems</p>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default ExplorePage;