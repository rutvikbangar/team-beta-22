import { Route, Routes } from "react-router-dom";
import "./App.css";


import { useEffect, useState } from 'react'
import {ActiveGoals} from "./pages/ActiveGoals";
import Home from "./componenets/LandingPage";




function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  return (

<Home></Home>
  );
}

export default App;