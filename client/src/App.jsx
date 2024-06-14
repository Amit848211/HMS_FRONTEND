import React, { useContext, useEffect } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  {BrowserRouter, Route, Routes, } from "react-router-dom"
import Home from "./page/Home"
import AboutUs from "./page/AboutUs"
import Register from "./page/Register"
import Login from "./page/Login"
import Appointment from "./page/Appointment"
import Navbar from "./components/Navbar"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Context } from "./main";
import axios from "axios";
import Footer from "./components/Footer";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } =
  useContext(Context);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://hms-server-t26s.onrender.com/api/v1/user/patient/me",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
}, [isAuthenticated]);

  return (
<>
  <BrowserRouter>
  <Navbar />
  <Routes>
   <Route path='/' element={<Home />} />
   <Route path='/appointment' element={<Appointment />} />
   <Route path='/about' element={<AboutUs />} />
   <Route path='/register' element={<Register />} />
   <Route path='/login' element={<Login />} />
   

  </Routes>
   <ToastContainer position='top-center'      />
   <Footer />
  </BrowserRouter>
</>     
    
  )
}

export default App
