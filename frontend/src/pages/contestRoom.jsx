// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosClient from "../utils/axios";
// import socket from "../utils/socket";
// import { List, Trophy, Clock, ArrowLeft, Calendar, Users } from "lucide-react";
// import ContestLeaderboard from "./contestLeaderboard";
// export default function ContestRoom() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [contest, setContest] = useState(null);
//   const [tab, setTab] = useState("leaderboard");
//   const [timeLeft, setTimeLeft] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [contestStatus, setContestStatus] = useState("upcoming"); // upcoming, live, ended

//   useEffect(() => {
//     socket.emit("joinContest", id);
//     const fetchContest = async () => {
//       try {
//         const res = await axiosClient.get(`/contest/${id}`);
//         setContest(res.data);
//         // Determine contest status based on current time
//         const now = new Date();
//         const start = new Date(res.data.startTime);
//         const end = new Date(res.data.endTime);
//         if (now < start) setContestStatus("upcoming");
//         else if (now >= start && now <= end) setContestStatus("live");
//         else setContestStatus("ended");
//       } catch (err) {
//         console.error("Failed to fetch contest", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContest();

//     return () => {
//       socket.emit("leaveContest", id);
//     };
//   }, [id]);

//   // Timer logic
//   useEffect(() => {
//     if (!contest) return;

//     const updateTimer = () => {
//       const now = new Date();
//       const start = new Date(contest.startTime);
//       const end = new Date(contest.endTime);
//       let diff = 0;
//       let text = "";

//       if (now < start) {
//         diff = start - now;
//         text = "Starts in ";
//       } else if (now >= start && now <= end) {
//         diff = end - now;
//         text = "Ends in ";
//       } else {
//         setTimeLeft("Contest Ended");
//         return;
//       }

//       const hours = Math.floor(diff / 3600000);
//       const mins = Math.floor((diff % 3600000) / 60000);
//       const secs = Math.floor((diff % 60000) / 1000);

//       let formatted = "";
//       if (hours > 0) formatted = `${hours}h ${mins}m ${secs}s`;
//       else if (mins > 0) formatted = `${mins}m ${secs}s`;
//       else formatted = `${secs}s`;

//       setTimeLeft(`${text}${formatted}`);
//     };

//     updateTimer();
//     const interval = setInterval(updateTimer, 1000);
//     return () => clearInterval(interval);
//   }, [contest]);

//   // Helper to get badge style based on difficulty
//   const getDifficultyBadge = (difficulty) => {
//     const map = {
//       easy: "bg-green-100 text-green-800",
//       medium: "bg-yellow-100 text-yellow-800",
//       hard: "bg-red-100 text-red-800",
//     };
//     const key = difficulty?.toLowerCase() || "medium";
//     return map[key] || map.medium;
//   };

//   // Helper for contest status badge
//   const getStatusBadge = () => {
//     const statusMap = {
//       upcoming: { label: "Upcoming", class: "bg-blue-100 text-blue-800" },
//       live: { label: "Live", class: "bg-green-100 text-green-800" },
//       ended: { label: "Ended", class: "bg-gray-100 text-gray-800" },
//     };
//     const { label, class: className } = statusMap[contestStatus];
//     return <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{label}</span>;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-500 animate-pulse">Loading contest...</div>
//       </div>
//     );
//   }

//   if (!contest) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <p className="text-gray-500 mb-4">Contest not found</p>
//         <button
//           onClick={() => navigate("/contest")}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//         >
//           Back to Contests
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Top Bar with Back Button */}
//       <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
//         <button
//           onClick={() => navigate("/contest")}
//           className="p-2 hover:bg-gray-100 rounded-lg transition"
//           aria-label="Back to contests"
//         >
//           <ArrowLeft size={20} className="text-gray-600" />
//         </button>
//         <div className="flex items-center gap-3">
//           <h1 className="text-lg font-semibold text-gray-900">{contest.title}</h1>
//           {getStatusBadge()}
//         </div>
//       </div>

//       <div className="flex flex-1 overflow-hidden">
//         {/* LEFT PANEL */}
//         <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <List size={20} className="text-green-600" />
//               Problems
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               {contest.problems.length} problems
//             </p>
//           </div>

//           {/* Problem List */}
//           <div className="flex-1 overflow-y-auto">
//             {contest.problems.map((problem, idx) => (
//               <div
//                 key={problem._id}
//                 className="p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition group"
//                 onClick={() =>
//                       {
//                       if(contestStatus==="live")
//                       navigate(`/contest/${id}/problem/${problem._id}`)
//                     }}
//               >
//                 <div className="flex items-start gap-2">
//                   <span className="text-sm font-medium text-gray-500 min-w-6">
//                     {String.fromCharCode(65 + idx)}.
//                   </span>
//                   <div className="flex-1">
//                     <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition">
//                       {problem.title}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyBadge(problem.difficulty)}`}>
//                         {problem.difficulty || "Medium"}
//                       </span>
//                       {problem.solvedCount !== undefined && (
//                         <span className="text-xs text-gray-500">
//                           ✅ {problem.solvedCount} solved
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Leaderboard Button */}
//           <div className="p-4 border-t border-gray-200">
//             <button
//               onClick={() => setTab("leaderboard")}
//               className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
//                 tab === "leaderboard"
//                   ? "bg-green-600 text-white"
//                   : "border border-gray-300 text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               <Trophy size={18} />
//               Leaderboard
//             </button>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Contest Info Bar */}
//           <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center gap-4 text-sm text-gray-600">
//               <div className="flex items-center gap-1">
//                 <Calendar size={16} />
//                 <span>{new Date(contest.startTime).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Clock size={16} />
//                 <span>{new Date(contest.startTime).toLocaleTimeString()} – {new Date(contest.endTime).toLocaleTimeString()}</span>
//               </div>
//               {contest.participantCount !== undefined && (
//                 <div className="flex items-center gap-1">
//                   <Users size={16} />
//                   <span>{contest.participantCount} participants</span>
//                 </div>
//               )}
//             </div>

//             <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
//               contestStatus === "live" ? "bg-red-50" : "bg-gray-50"
//             }`}>
//               <Clock size={18} className={contestStatus === "live" ? "text-red-500" : "text-gray-500"} />
//               <span className={`font-mono font-bold ${contestStatus === "live" ? "text-red-600" : "text-gray-600"}`}>
//                 {timeLeft}
//               </span>
//             </div>
//           </div>

//           {/* CONTENT */}
//           <div className="flex-1 overflow-y-auto p-6">
//             {tab === "leaderboard" ? (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 {/* <h2 className="text-lg font-semibold text-gray-900 mb-4">
//                   Contest Leaderboard
//                 </h2> */}
//                 {/* Placeholder – you can replace with your Leaderboard component */}
//                 {/* <p className="text-green-700 text-center py-8">
//                   Leaderboard will be displayed here.
//                 </p> */}
//                 {/* <Leaderboard contestId={id} /> */}
//                 <ContestLeaderboard contestId={id} />
//               </div>
//             ) : (
//               <div className="text-center text-gray-500 mt-20">
//                 <p className="mb-2">👈 Select a problem from the left panel to start solving.</p>
//                 <p className="text-sm">Good luck!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../utils/axios";
import socket from "../utils/socket";
import { List, Trophy, Clock, ArrowLeft, Calendar, Users } from "lucide-react";
import ContestLeaderboard from "./contestLeaderboard";

export default function ContestRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [tab, setTab] = useState("leaderboard");
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(true);
  const [contestStatus, setContestStatus] = useState("upcoming");

  // ✅ IST format helpers
  // const formatISTDate = (time) => {
  //   return new Date(time).toLocaleDateString("en-IN", {
  //     timeZone: "Asia/Kolkata",
  //   });
  // };

  // const formatISTTime = (time) => {
  //   return new Date(time).toLocaleTimeString("en-IN", {
  //     timeZone: "Asia/Kolkata",
  //     hour12: true,
  //   });
  // };

  useEffect(() => {
    socket.emit("joinContest", id);

    const fetchContest = async () => {
      try {
        const res = await axiosClient.get(`/contest/${id}`);
        setContest(res.data);
      } catch (err) {
        console.error("Failed to fetch contest", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContest();

    return () => {
      socket.emit("leaveContest", id);
    };
  }, [id]);

  // ✅ Timer + LIVE status update
  useEffect(() => {
    if (!contest) return;

    const updateTimer = () => {
      const now = Date.now() + 19800000;
      const start = new Date(contest.startTime).getTime();
      const end = new Date(contest.endTime).getTime();

      let diff = 0;
      let text = "";

      if (now < start) {
        setContestStatus("upcoming");
        diff = start - now;
        text = "Starts in ";
      } else if (now >= start && now <= end) {
        setContestStatus("live");
        diff = end - now;
        text = "Ends in ";
      } else {
        setContestStatus("ended");
        setTimeLeft("Contest Ended");
        return;
      }

      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      let formatted = "";
      if (hours > 0) formatted = `${hours}h ${mins}m ${secs}s`;
      else if (mins > 0) formatted = `${mins}m ${secs}s`;
      else formatted = `${secs}s`;

      setTimeLeft(`${text}${formatted}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  const getDifficultyBadge = (difficulty) => {
    const map = {
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    };
    const key = difficulty?.toLowerCase() || "medium";
    return map[key] || map.medium;
  };

  const getStatusBadge = () => {
    const statusMap = {
      upcoming: { label: "Upcoming", class: "bg-blue-100 text-blue-800" },
      live: { label: "Live", class: "bg-green-100 text-green-800" },
      ended: { label: "Ended", class: "bg-gray-100 text-gray-800" },
    };
    const { label, class: className } = statusMap[contestStatus];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        {label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 animate-pulse">Loading contest...</div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Contest not found</p>
        <button
          onClick={() => navigate("/contest")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Back to Contests
        </button>
      </div>
    );
  }
 

  const [date, startTimeWithMs] = new Date(contest.startTime).toISOString().split("T");
const startTime = startTimeWithMs.split(".")[0];

const [endDate, endTimeWithMs] = new Date(contest.endTime).toISOString().split("T");
const endTime = endTimeWithMs.split(".")[0];


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate("/contest")}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">
            {contest.title}
          </h1>
          {getStatusBadge()}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <List size={20} className="text-green-600" />
              Problems
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {contest.problems.length} problems
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contest.problems.map((problem, idx) => (
              <div
                key={problem._id}
                className="p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition group"
                onClick={() => {
                  if (contestStatus === "live") {
                    navigate(`/contest/${id}/problem/${problem._id}`);
                  }
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-500 min-w-6">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition">
                      {problem.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyBadge(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty || "Medium"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setTab("leaderboard")}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white"
            >
              <Trophy size={18} />
              Leaderboard
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{date}</span>
              <span>
                {startTime}{" - "}
                {endTime}
              </span>
            </div>

            <div className="font-mono font-bold text-red-600">
              {timeLeft}
            </div>
          </div>

          <div className="flex-1 p-6">
            <ContestLeaderboard contestId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}