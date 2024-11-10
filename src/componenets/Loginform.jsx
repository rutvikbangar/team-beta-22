import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
        // Use fetch to send the login request
        const response = await fetch('http://localhost:4000/api/v1/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error("Login failed");
        }
        
        // Await the response JSON
        const data = await response.json();

   
        const { accessToken } = data.data;

        
        localStorage.setItem('accessToken', accessToken);
        console.log(data);
        // Update the login status
        setIsLoggedIn(true);

        // Notify the user and navigate to the home page
        toast.success("Logged In");
        navigate("/");

    } catch (error) {
        toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={submitHandler} className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
