// import React, { useState } from "react";
// import { ProblemDelete } from "../components/deleteProblem";
// import { ProblemCreator } from "../components/problemCreator";
// import { ProblemUpdate } from "../components/problemUpdate";
// import { VideoAttach } from "../components/vidoattach";

// // 👉 You will need to create these components
// import { ContestCreator } from "../components/contestCreator";
// import { ContestUpdate } from "../components/contestUpdate";
// import { ContestDelete } from "../components/contestDelete";

// export function AdminPanel() {
//   const [activeView, setActiveView] = useState(null);

//   // ✅ All admin actions (cards)
//   const adminActions = [
//     {
//       title: "Create Problem",
//       desc: "Add new coding problems",
//       key: "create-problem",
//     },
//     {
//       title: "Update Problem",
//       desc: "Modify existing problems",
//       key: "update-problem",
//     },
//     {
//       title: "Delete Problem",
//       desc: "Remove problems",
//       key: "delete-problem",
//     },
//     {
//       title: "Create Contest",
//       desc: "Setup a new contest",
//       key: "create-contest",
//     },
//     {
//       title: "Update Contest",
//       desc: "Edit contest details",
//       key: "update-contest",
//     },
//     {
//       title: "Delete Contest",
//       desc: "Remove a contest",
//       key: "delete-contest",
//     },
//     // optional
//     // {
//     //   title: "Attach Video",
//     //   desc: "Add video explanation",
//     //   key: "video",
//     // },
//   ];

//   // ✅ Render selected component
//   const renderActiveView = () => {
//     switch (activeView) {
//       case "create-problem":
//         return <ProblemCreator />;

//       case "update-problem":
//         return <ProblemUpdate />;

//       case "delete-problem":
//         return <ProblemDelete />;

//       case "create-contest":
//         return <ContestCreator />;

//       case "update-contest":
//         return <ContestUpdate />;

//       case "delete-contest":
//         return <ContestDelete />;

//       case "video":
//         return <VideoAttach />;

//       default:
//         return (
//           <div className="text-center text-gray-500 mt-10">
//             <p className="text-xl">Select an action from above</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//       <h1 className="text-4xl font-bold text-center mb-8">
//         Admin Dashboard
//       </h1>

//       {/* ✅ Show cards only when no view selected */}
//       {!activeView && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {adminActions.map((action) => (
//             <div
//               key={action.key}
//               onClick={() => setActiveView(action.key)}
//               className="cursor-pointer p-6 rounded-2xl shadow-md border hover:shadow-xl transition bg-white hover:scale-[1.02]"
//             >
//               <h2 className="text-xl font-semibold mb-2">
//                 {action.title}
//               </h2>
//               <p className="text-gray-500 text-sm">{action.desc}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Show selected component */}
//       {activeView && (
//         <div className="mt-6">
//           <button
//             onClick={() => setActiveView(null)}
//             className="btn btn-sm btn-outline mb-6"
//           >
//             ← Back to Dashboard
//           </button>

//           {renderActiveView()}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { ProblemDelete } from "../components/deleteProblem";
import { ProblemCreator } from "../components/problemCreator";
import { ProblemUpdate } from "../components/problemUpdate";
import { VideoAttach } from "../components/vidoattach";
import { ContestCreator } from "../components/contestCreator";
import { ContestUpdate } from "../components/contestUpdate";
import { ContestDelete } from "../components/contestDelete";

// Lucide icons (make sure you have lucide-react installed)
import {
  PlusCircle,
  Edit2,
  Trash2,
  CalendarPlus,
} from "lucide-react";

export function AdminPanel() {
  const [activeView, setActiveView] = useState(null);

  const adminActions = [
    {
      title: "Create Problem",
      desc: "Add new coding problems",
      key: "create-problem",
      icon: PlusCircle,
    },
    {
      title: "Update Problem",
      desc: "Modify existing problems",
      key: "update-problem",
      icon: Edit2,
    },
    {
      title: "Delete Problem",
      desc: "Remove problems",
      key: "delete-problem",
      icon: Trash2,
    },
    {
      title: "Create Contest",
      desc: "Setup a new contest",
      key: "create-contest",
      icon: CalendarPlus,
    },
    {
      title: "Update Contest",
      desc: "Edit contest details",
      key: "update-contest",
      icon: Edit2,   // using same Edit2 icon
    },
    {
      title: "Delete Contest",
      desc: "Remove a contest",
      key: "delete-contest",
      icon: Trash2,  // using same Trash2 icon
    },
    // optional
    // {
    //   title: "Attach Video",
    //   desc: "Add video explanation",
    //   key: "video",
    //   icon: Video,
    // },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case "create-problem":
        return <ProblemCreator />;
      case "update-problem":
        return <ProblemUpdate />;
      case "delete-problem":
        return <ProblemDelete />;
      case "create-contest":
        return <ContestCreator />;
      case "update-contest":
        return <ContestUpdate />;
      case "delete-contest":
        return <ContestDelete />;
      case "video":
        return <VideoAttach />;
      default:
        return (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-xl">Select an action from above</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-gray-50 py-8">
      <div className=" max-w-[75%] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage problems and contests</p>

        {!activeView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {adminActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.key}
                  onClick={() => setActiveView(action.key)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer group"
                >
                  {Icon && (
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
                      <Icon className="text-green-600" size={24} />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{action.desc}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <button
                onClick={() => setActiveView(null)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                ← Back to Dashboard
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {renderActiveView()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}