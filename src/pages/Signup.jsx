


import React from 'react'

import PropTypes from 'prop-types';
import Template from '../componenets/Signupform'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Join with cute bubby and keep it HAPPY for free"
      desc1="Build habits for today, tomorrow, and beyond."
      desc2="Stay productive and HAPPY."
     
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

Signup.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Signup