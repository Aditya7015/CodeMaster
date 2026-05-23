// AuthModal.jsx
import { X } from 'lucide-react';
import Signup from './signup';
import Signin from './signin';

function AuthModal({ isOpen, onClose, mode, setMode }) {
  if (!isOpen) return null;

  const toggleMode = () => {
    setMode(mode === 'signup' ? 'signin' : 'signup');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition z-10"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Render the appropriate form */}
        {mode === 'signup' ? (
          <Signup onToggleMode={toggleMode} />
        ) : (
          <Signin onToggleMode={toggleMode} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;