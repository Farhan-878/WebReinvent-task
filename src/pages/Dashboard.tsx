import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { fetchUsers } from '../services/api';
import { FiLogIn } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';


interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token = useAuthStore((state) => state.token);
  const clearToken = useAuthStore((state) => state.clearToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers(token as string);
        console.log('API Response:', response.data);
        setUsers(response.data.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    clearToken();
    navigate('/signin');
  };



  const handleSignUp = () => {
    navigate('/signup');
  };

  // console.log('Users:>>>>', users);

  return (
    <div className="min-h-screen bg-purple-100 p-6">
      <h1 className="text-3xl text-purple-800 font-bold mb-6 text-center">Dashboard</h1>
      <div className="absolute top-4 right-4 flex space-x-4">

        <button
          onClick={handleSignUp}
          className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 flex items-center justify-center mr-4"
        >
          <FaUserPlus className="mr-2" />
          Add User
        </button>
        <button
          onClick={handleLogout}
          className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 flex items-center justify-center mr-4">
        
          <FiLogIn className="mr-2" />
          Logout
        </button>
      </div>
     <div className="flex flex-wrap justify-center">
        {users.length > 0 &&
          users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-lg p-4 m-4 w-64 border border-purple-500">
              <img className="rounded-full mx-auto mb-4" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <div className="text-center">
                <p className="font-bold text-purple-800 text-xl">{user.first_name} {user.last_name}</p>
                <p className="text-purple-600">{user.email}</p>
              </div>
            </div>
          ))}
      </div>

    </div>
  );
}

export default Dashboard;
