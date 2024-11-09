import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./componenets/Navbar"
import Slider from "./pages/Slider";
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import { useEffect, useState } from 'react'



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      <Routes>

        <Route path="/" element= {<Slider/>} />
        <Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
        

      </Routes>

    </div>
    )
}

export default App;