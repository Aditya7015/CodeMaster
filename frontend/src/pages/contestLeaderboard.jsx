import { useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import socket from "../utils/socket";
import { Trophy, Medal } from "lucide-react"; // optional icons

export default function ContestLeaderboard({ contestId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const res = await axiosClient.get(`/contest/${contestId}/leaderboard`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching leaderboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    socket.emit("joinContest", contestId);
    socket.on("leaderboardUpdate", () => {
      fetchLeaderboard();
    });

    return () => {
      socket.off("leaderboardUpdate");
    };
  }, [contestId]);

  // Helper to get rank badge for top 3
  const getRankBadge = (rank) => {
    if (rank === 1) return <Trophy size={18} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={18} className="text-gray-400" />;
    if (rank === 3) return <Medal size={18} className="text-amber-600" />;
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-gray-500 text-center">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Trophy size={20} className="text-green-600" />
          Contest Leaderboard
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solved
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penalty (min)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((user, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;

              return (
                <tr key={user.userId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getRankBadge(rank)}
                      <span className={`font-semibold ${isTop3 ? "text-green-600" : "text-gray-900"}`}>
                        {rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <div className="flex flex-col">
                        <span >{user.firstName} </span>
                        <span className="text-gray-600 text-sm ">{user.emailId}</span>

                      </div>
                    </div>
                    {/* If you have user name/email, show it here */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {user.solved}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-gray-600">
                      {Math.floor(user.penalty)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No submissions yet. Be the first!
          </div>
        )}
      </div>
    </div>
  );
}