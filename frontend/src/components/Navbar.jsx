import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Code2, Menu, X } from 'lucide-react';
import { logoutUser } from '../authslice';
import AuthModal from './authModal';
// import LandingPage from '../pages/landingpage';
import Homepage from '../pages/home';

const Navbar = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'signin'

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

 
  
    const openSignup = () => {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
    };

  const navItems = [
    { name: 'Problems', path: '/problems' },
    { name: 'Contest', path: '/contest' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Explore', path: '/explore' },
  ];

  return (
    <>
  
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 font-bold text-xl cursor-pointer">
          <div className="bg-green-600 p-1.5 rounded-lg shadow-sm">
            <Code2 className="text-white" size={20} />
          </div>
          <span className="text-gray-800">Code<span className="text-green-600">Master</span></span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 transition ${
                  isActive ? 'text-green-600 font-semibold' : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop User Menu / Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <NavLink to={`user/${user._id}/profile`} >
              <span className="text-sm text-gray-700">{user.firstName}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded-full px-4 shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* <NavLink to="/signin" className="btn btn-ghost btn-sm text-gray-700 hover:bg-gray-100">
                Sign in
              </NavLink> */}
              {/* <NavLink
                to="/signup"
                className="btn btn-primary btn-sm bg-green-600 hover:bg-green-700 text-white border-none rounded-full px-5 shadow-sm"
              >
                Sign
              </NavLink> */}
              <button onClick={openSignup} className="btn btn-primary btn-sm bg-green-600 hover:bg-green-700 text-white border-none rounded-full px-5 shadow-sm">
          Sign
        </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <NavLink to={`user/${user._id}/profile`} >
              <span className="text-sm text-gray-700">{user.firstName}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded-full px-4 shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            // <div className="pt-2 flex gap-2">
            //   <NavLink
            //     to="/signin"
            //     className="flex-1 btn btn-outline btn-sm border-gray-300 text-gray-700 hover:bg-gray-50"
            //   >
            //     Sign in
            //   </NavLink>
            //   <NavLink
            //     to="/signup"
            //     className="flex-1 btn btn-primary btn-sm bg-green-600 hover:bg-green-700 text-white border-none"
            //   >
            //     Sign up
            //   </NavLink>
            // </div>
            <>
            <button onClick={openSignup} className="btn btn-primary btn-sm bg-green-600 hover:bg-green-700 text-white border-none rounded-full px-5 shadow-sm">
          Sign
        </button>
            </>
          )}
        </div>
      )}
    </nav>

    {/* <Homepage></Homepage> */}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />
    </>
    
  );
};

export default Navbar;