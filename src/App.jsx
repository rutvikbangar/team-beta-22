import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Slider from './components/Slider'
import AichatBot from './components/Aichatbot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AichatBot/>
    </>
  );
}

export default App
