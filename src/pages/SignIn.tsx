import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { login } from '../services/api';
import { useAuthStore } from '../store';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleSignIn = async () => {
    try {
      const response = await login(email, password);
      setToken(response.data.token);
      // alert('User logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login failed', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-purple-200 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl text-purple-800 font-bold mb-6 text-center">Sign In</h1>
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
        <div className="mb-6 relative">
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
        <button
          onClick={handleSignIn}
          className="w-full bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 flex items-center justify-center"
        >
          <FiLogIn className="mr-2" />
          Sign In
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-500">Don't have an account? </span>
          <Link to="/signup" className="text-purple-600 hover:text-purple-800">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
