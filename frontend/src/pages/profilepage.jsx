// pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosClient from "../utils/axios";
import { User, Edit2 } from "lucide-react"; // icons for avatar and edit

const ProfilePage = () => {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get(`auth/${userId}/profile`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">User not found</div>
      </div>
    );
  }

  const { user, solved, submissionsLastYear, maxStreak, acceptanceRate, totalSubmissions } = data;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <>{user?.role === "admin"?<NavLink to="/admin" className="text-3xl font-bold ml-1 text-black  mb-2" >Admin <span className="text-3xl font-bold ml-1 text-gray-600 mb-2">Profile</span></NavLink>:<span className="text-3xl font-bold ml-1 text-gray-600 mb-2">Profile</span>}</>
        
        <p className="text-gray-600 mb-8">Your coding journey at a glance</p>

        {/* Main grid: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Profile info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center">
              {/* Avatar placeholder with icon */}
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{user.emailId}</p>
              
              {/* <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                <Edit2 size={18} />
                Edit Profile
              </button> */}
            </div>
          </div>

          {/* Middle & right combined - Stats */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Total solved big number */}
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500">Total Solved</p>
                <p className="text-4xl font-bold text-gray-900">{solved.totalSolved}</p>
              </div>

              {/* Difficulty breakdown with colored labels */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm text-gray-600">Easy</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(solved.easy / 3000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{solved.easy}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm text-gray-600">Medium</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${(solved.medium / 3000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{solved.medium}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm text-gray-600">Hard</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${(solved.hard / 3000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{solved.hard}</span>
                </div>
              </div>
            </div>

            {/* Overall progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Overall Progress</span>
                <span>{Math.round((solved.totalSolved / 3000) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600"
                  style={{ width: `${(solved.totalSolved / 3000) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Card */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500">Submissions (1 year)</p>
              <p className="text-2xl font-bold text-gray-900">{submissionsLastYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Max Streak</p>
              <p className="text-2xl font-bold text-gray-900">{maxStreak}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Acceptance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{acceptanceRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{totalSubmissions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;