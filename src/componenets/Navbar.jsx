import React from 'react';
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const buttonStyles = 'bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:bg-[#4A6281] scale:1.1';

    const navigate = useNavigate();
    const submitHandler = async (event) => {
        // Prevent default form submission
    
        try {
            // Use fetch to send the logout request
            const response = await fetch('http://localhost:4000/api/v1/users/logout', {
                method: "POST",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
                }

            });
            console.log(response.json());
            if (!response.ok) {
                throw new Error("Logout failed");
            }

    
          
            localStorage.removeItem('accessToken');

    
            
            setIsLoggedIn(false);
    
      
            toast.success("Logged out");
            navigate("/login");
    
        } catch (error) {
            toast.error(error.message || "Logout failed");
        }
    };
    
    return (
        <div className='bg-[#FEF3E2] flex justify-between items-center w-full py-4 mx-auto relative z-10'>
            {isLoggedIn && (
                <nav>
                    <ul className='text-richblack-100 flex gap-x-6 px-6'>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
            )}

            <div className='flex items-center gap-x-5 px-[20px]'>
                {!isLoggedIn && (
                    <>
                        <Link to="/login">
                            <button className={`${buttonStyles} bg-yellow-50`}>
                                Log in
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className={`${buttonStyles} bg-richblack-800`}>
                                Sign up
                            </button>
                        </Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/">
                            <button
                                onClick={() => {
                                    submitHandler();
                                }}
                                className={buttonStyles}
                            >
                                Log Out
                            </button>
                        </Link>
                        <Link to="/myitems">
                            <button className={buttonStyles}>
                                MyItems
                            </button>
                        </Link>
                        <Link to="/goals">
                            <button className={buttonStyles}>
                                Goals
                            </button>
                        </Link>
                        <Link to="/moodmate">
                            <button className={buttonStyles}>
                                Make Mood
                            </button>
                        </Link>
                        <Link to="/profile">
                            <button className={buttonStyles}>
                                Profile
                            </button>
                        </Link>
                        <Link to="/store">
                            <button className={buttonStyles}>
                                Store
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

Navbar.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;