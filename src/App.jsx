import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./componenets/Navbar"
import Slider from "./components/Slider";
import Login from "./components/Login"
import Signup from "./components/Signup"

import { useEffect, useState } from 'react'
import GoalsPage from "./components/goalAssign";



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  return (
    <div className="w-screen h-screen ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Routes>
    </div>
  );
}

export default App;