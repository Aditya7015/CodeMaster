import { useSelector } from "react-redux";
import AuthModal from "../authModal";
import { useState } from "react";
import { LogIn } from "lucide-react"; // Import the login icon

const EditorActions = ({ onRun, onSubmit, loading,isContestOver }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  const openSignup = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        {isAuthenticated ? (
          <div className="flex gap-3">
            <button
              className={`px-5 py-2 text-sm font-medium rounded-full shadow-sm transition ${
                loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={onRun}
              disabled={loading}
            >
              {loading ? "Running..." : "Run"}
            </button>
            <button
              className={`px-5 py-2 text-sm font-medium rounded-full shadow-sm transition ${
                loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        ) : (
          <button
            onClick={openSignup}
            className="px-5 py-2 text-sm font-medium rounded-full shadow-sm transition bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <LogIn size={18} />
            Sign in to Submit
          </button>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />
    </>
  );
};

export default EditorActions;