// import { useEffect, useState } from "react";
import "./App.css"
import Navbar from "./components/Navbar.js"
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";

import Home from "./components/Home";
import Rides from "./components/Rides"
import Requests from "./components/Requests"
import Signupform from "./components/Signupform";
import Loginform from "./components/Loginform";
function App() {

  // const element = <Home />
  // const HomeRoutes = () => {
  //   useRoutes (['/home', '/'].map(path => ({path, element})))
  
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} >

        </Route>
        <Route path="/home" element={<Home />}>

        </Route>
        <Route path="/rides" element={<Rides />}>
        </Route>
        <Route path="/Requests" element={<Requests />}>
        </Route>
        <Route path="/Signupform" element={<Signupform />}>

        </Route>
        <Route paht="/Loginform" element={<Loginform />}>

        </Route>
      </Routes>
    </BrowserRouter>








  )
}

export default App;