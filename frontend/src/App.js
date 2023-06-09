// import { useEffect, useState } from "react";

import "./components/dashboard.css"
import Navbar  from "./components/Navbar.js"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Home from "./components/Home";
import Rides from "./components/Rides"
import Requests from "./components/Requests"
import Profile from "./components/Profile"
import Loginform from "./components/Loginform";
import Signupform from "./components/Signupform";
import './components/dialog-styles.css';
import './components/tab-styles.css'
import "./App.css"
function App() {
  const [userRender, setUserRender] = useState(false)
  // localStorage.setItem("curUser", "")
  // localStorage.setItem("authenticated", "")
  // const element = <Home />
  // const HomeRoutes = () => {
  //   useRoutes (['/home', '/'].map(path => ({path, element})))
  

  return (
    
    <BrowserRouter>
      <Navbar
      userRender = {userRender}
      setUserRender = {setUserRender}
      />

      <Routes>
        <Route path="/" element={<Home />} >

        </Route>
        <Route path="/home" element={<Home />}>

        </Route>
        <Route path="/rides" element={<Rides />}>
        </Route>
        <Route path="/Requests" element={<Requests />}>
        </Route>
        <Route path="/Signupform" element={<Signupform 
            userRender = {userRender}
            setUserRender = {setUserRender}
            />}>

        </Route>
        <Route path="/Loginform" element={<Loginform 
           userRender = {userRender}
           setUserRender = {setUserRender}
        />}>
      
        </Route>
        <Route path="/userprofile" element = {<Profile />}>
          
        </Route>
      </Routes>
    </BrowserRouter>








  )
}

export default App;