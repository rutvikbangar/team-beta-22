import React, { useState } from 'react';
import axios from 'axios';
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
            const response = await axios.post('http://localhost:5000/api/login', formData, {
                withCredentials: true
            });
            const { accessToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            setIsLoggedIn(true);
            toast.success("Logged In");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Login failed");
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
  };

export default LoginForm;
