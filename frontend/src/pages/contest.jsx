import { useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Users } from "lucide-react"; // optional icons
//inputTime = "2026-03-22T15:30";

const formatUTC = (time) => {
  return new Date(time).toLocaleString("en-IN", {
    timeZone: "UTC", // ✅ IMPORTANT
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export default function ContestPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axiosClient.get("/contest/getAllContest");
        console.log("contest",res.data);
        setContests(res.data);
      } catch (err) {
        console.error("Failed to fetch contests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  // const group = {
  //   live: contests.filter((c) => c.status === "live"),
  //   upcoming: contests.filter((c) => c.status === "upcoming"),
  //   past: contests.filter((c) => c.status === "past"),
  // };

const now = Date.now() + 19800000 ; // ✅ number
console.log("now",now);
const group = {
  live: contests.filter((c) => {
    const start = new Date(c.startTime).getTime();
    const end = new Date(c.endTime).getTime();
    console.log("live","start",start,"end",end);
    return now >= start && now <= end;
  }),

  upcoming: contests.filter((c) => {
    const start = new Date(c.startTime).getTime();
    console.log("upcoming","start",start);
    return now < start;
  }),

  past: contests.filter((c) => {
    const end = new Date(c.endTime).getTime();
    console.log("past","end",end);
    return now > end;
  }),
};

  const renderSection = (title, list, emptyMessage) => (
    <div className="mt-8 first:mt-0">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {list.length === 0 ? (
        <p className="text-gray-500 bg-white rounded-xl border border-gray-200 p-6 text-center">
          {emptyMessage}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((contest) => (
            <div
              key={contest._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition cursor-pointer group"
              onClick={() =>{
                if (group.live.includes(contest) || group.past.includes(contest)){
                  navigate(`/contest/${contest._id}`)
                }
                
              } }
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition">
                {contest.title}
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Start: {formatUTC(contest.startTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>End: {formatUTC(contest.endTime)}</span>
                </div>
                {contest.participantCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{contest.participantCount} participants</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading contests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contests</h1>
        <p className="text-gray-600 mb-8">
          Participate in coding contests and challenge yourself
        </p>

        {renderSection("Live Now", group.live, "No live contests at the moment")}
        {renderSection("Upcoming", group.upcoming, "No upcoming contests scheduled")}
        {renderSection("Past", group.past, "No past contests yet")}
      </div>
    </div>
  );
}