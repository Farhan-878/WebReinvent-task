import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import { useAuthStore } from '../store';
import { FaUserPlus } from 'react-icons/fa';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await register(email, password);
      if(response.data.token) {
      setToken(response.data.token);
      navigate('/dashboard');
      }
      else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-purple-200 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl text-purple-800 font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="mb-4 relative">
          <label className="block mb-2 text-purple-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 mb-4 pl-10 border text-purple-700 ${error ? 'border-red-500' : 'border-purple-300'} rounded-full bg-purple-50 focus:border-purple-500 focus:outline-none`}
            placeholder="Email"
          />
          <FiMail className="absolute left-3 top-12 text-purple-700" />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2 text-purple-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 mb-4 pl-10 border text-purple-700 ${error ? 'border-red-500' : 'border-purple-300'} rounded-full bg-purple-50 focus:border-purple-500 focus:outline-none`}
            placeholder="Password"
          />
          <FiLock className="absolute left-3 top-12 text-purple-700" />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-12 text-purple-700"
          >
            {!showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <div className="mb-6 relative">
          <label className="block mb-2 text-purple-700">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-3 mb-4 pl-10 border text-purple-700 ${error ? 'border-red-500' : 'border-purple-300'} rounded-full bg-purple-50 focus:border-purple-500 focus:outline-none`}
            placeholder="Confirm Password"
          />
          <FiLock className="absolute left-3 top-12 text-purple-700" />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-12 text-purple-700"
          >
            {!showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button
          onClick={handleSignUp}
          className="w-full bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 flex items-center justify-center"
        >
          <FaUserPlus className="mr-2" />
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/signin" className="text-purple-600 hover:text-purple-800">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
