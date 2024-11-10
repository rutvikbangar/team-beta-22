import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./componenets/Navbar"
import Slider from "./components/Slider";
import Login from "./components/Login"
import Signup from "./components/Signup"

import { useEffect, useState } from 'react'
import GoalsPage from "./components/goalAssign";
import AichatBot from "./components/Aichatbot";
import Dashboard from "./components/dashboard/Dashboard";
import ProfilePage from "./components/dashboard/Profile";
import MyCards from "./components/Items/Myitems";
import StoreCards from "./components/Items/Store";




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
        <Route path="/moodmate" element={<AichatBot/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/myitems" element={<MyCards/>} />
        <Route path="/store" element={<StoreCards/>} />
      </Routes>
    </div>
  );
}

export default App;