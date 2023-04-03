import './App.css';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Routes, Route } from 'react-router-dom';
import Home from "./Components/Home.js"
import Reserve from "./Components/Reserve.js";
import Nav from "./Components/Nav.js";
import Footer from "./Components/Footer.js";
import NavigationContext from './Context/NavigationContext.js';

function App() {
  const [width, setWidth] = useState(0)

  useEffect (() => {
    handleResize();

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }


  }, [])

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  const [headFoot, setHeadFoot] = useState(true)

  return (
    <NavigationContext.Provider value={{ headFoot, setHeadFoot }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {headFoot &&
          <Nav vw={width} />
        }

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="reserve-a-table" element={<Reserve />} />
        </Routes>

        {headFoot &&
          <Footer vw={width} />
        }
      </LocalizationProvider>
    </NavigationContext.Provider>
  );
};

export default App;
