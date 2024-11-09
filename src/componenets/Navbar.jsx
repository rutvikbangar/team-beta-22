import React from 'react';
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const buttonStyles = 'bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:bg-[#4A6281] scale:1.1';

    return (
        <div className='bg-[#A6AEBF] flex justify-between items-center w-full py-4 mx-auto relative z-10'>
            {isLoggedIn && (
                <nav>
                    <ul className='text-richblack-100 flex gap-x-6'>
                        <li>
                            <Link to="/"><IoHome className="text-2xl" /></Link>
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
                                    setIsLoggedIn(false);
                                    toast.success("Logged Out");
                                }}
                                className={buttonStyles}
                            >
                                Log Out
                            </button>
                        </Link>
                        <Link to="/dashboard">
                            <button className={buttonStyles}>
                                Dashboard
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
