import React from 'react'
import Template from '../componenets/template'
import PropTypes from 'prop-types';


const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build habits for today, tomorrow, and beyond."
      desc2="Stay productive and HAPPY."
      
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login