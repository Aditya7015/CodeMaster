import { Route, Routes, Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { checkAuth } from "./authslice";

import { AdminPanel } from "./pages/problemcontr";
import ProblemsPage from "./pages/problems";
import ContestPage from "./pages/contest";
import ExplorePage from "./pages/explore";
import MainLayout from "./components/MainLayout";
import CodeEditorPage from "./pages/CodeEditorPage";
import Homepage from "./pages/home";
import ProfilePage from "./pages/profilepage";
import ContestRoom from "./pages/contestRoom";
import LeaderboardPage from "./pages/leaderboard";

function App() {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-base-100">
      <Routes>

        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>

          {/* Homepage */}
          <Route index element={<Homepage />} />

          {/* Other Pages */}
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="contest" element={<ContestPage />} />
          <Route path="contest/:id" element={<ContestRoom />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route
            path="user/:userId/profile"
            element={<ProfilePage />}
          />

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            user ? (
              user.role === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Code Editor Routes */}
        <Route
          path="/codeeditor/:id"
          element={<CodeEditorPage />}
        />

        <Route
          path="/contest/:contestId/problem/:id"
          element={<CodeEditorPage />}
        />

      </Routes>
    </div>
  );
}

export default App;