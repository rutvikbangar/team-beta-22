import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Signupform.css'

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  const [accountType, setAccountType] = useState('student');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function fileChangeHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (!selectedFile) {
      toast.error('Please upload an image file.');
      return;
    }

    if (!formData.password) {
      toast.error('Please enter a password.');
      return;
    }

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('fullname', formData.fullName);
      formDataWithFile.append('username', formData.username);
      formDataWithFile.append('email', formData.email);
      formDataWithFile.append('password', formData.password);
      formDataWithFile.append('profilepicture', selectedFile);
      formDataWithFile.append('accountType', accountType);
      console.log(formDataWithFile)

      const response = await fetch('http://localhost:4000/api/v1/users/register', {
        method: 'POST',
        body: formDataWithFile,
      });

      

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const responseData = await response.json();
      const { accessToken } = responseData.data;

      localStorage.setItem('accessToken', accessToken);
      setIsLoggedIn(true);
      toast.success('Account Created');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed');
    }
  }

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="fullName">
              <p className="label">
                Full Name<sup className="required">*</sup>
              </p>
              <input
                required
                type="text"
                id="fullName"
                name="fullName"
                onChange={changeHandler}
                placeholder="Enter Full Name"
                value={formData.fullName}
                className="input-field"
              />
            </label>

            <label htmlFor="username">
              <p className="label">
                Username<sup className="required">*</sup>
              </p>
              <input
                required
                type="text"
                id="username"
                name="username"
                onChange={changeHandler}
                placeholder="Enter Username"
                value={formData.username}
                className="input-field"
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <p className="label">
                Email Address<sup className="required">*</sup>
              </p>
              <input
                required
                type="email"
                id="email"
                name="email"
                onChange={changeHandler}
                placeholder="Enter Email Address"
                value={formData.email}
                className="input-field"
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <p className="label">
                Password<sup className="required">*</sup>
              </p>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                onChange={changeHandler}
                placeholder="Enter Password"
                value={formData.password}
                className="input-field"
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="file">
              <p className="label">
                Upload File<sup className="required">*</sup>
              </p>
              <input
                required
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={fileChangeHandler}
                className="input-field"
              />
            </label>
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
      </div>
      </div>
  );
};

SignupForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default SignupForm;
