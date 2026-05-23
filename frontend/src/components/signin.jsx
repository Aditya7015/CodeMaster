// Signin.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginUser } from '../authslice'; // adjust import to your actual login action

function Signin({ onToggleMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
   console.log(isAuthenticated,loading,error);
  const signinSchema = z.object({
    emailId: z.string().email('Invalid Email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // or close modal and stay? adjust as needed
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome back to <span className="text-green-600">CodeMaster</span>
      </h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register('emailId')}
          placeholder="Enter your email"
          className="w-full text-gray-600 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
        />
        {errors.emailId && (
          <p className="mt-1 text-sm text-red-600">{errors.emailId.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          {...register('password')}
          placeholder="Enter your password"
          className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Toggle to Sign Up */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-green-600 hover:text-green-700 font-medium hover:underline focus:outline-none"
        >
          Sign Up
        </button>
      </p>

      {/* Optional error message from Redux */}
      {/* {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>} */}
    </form>
  );
}

export default Signin;