import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { registerUser } from '../authslice';

function Signup({ onToggleMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
 
  const signupSchema = z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters'),
    emailId: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Join <span className="text-green-600">CodeMaster</span>
      </h2>

      {/* First Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          type="text"
          {...register('firstName')}
          placeholder="Enter your first name"
          className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register('emailId')}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
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
          placeholder="Create a password"
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
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>

      {/* Toggle to Sign In */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-green-600 hover:text-green-700 font-medium hover:underline focus:outline-none"
        >
          Sign In
        </button>
      </p>

      {/* Optional error message from Redux */}
      {/* {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>} */}
    </form>
  );
}

export default Signup;