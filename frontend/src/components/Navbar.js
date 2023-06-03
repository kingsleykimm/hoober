import React, { useState } from "react";
import { NavLink } from "react-router-dom";




function Navbar () {
    return (
        <nav className="header">
            <NavLink className = "header" to="/Home">
                Home
            </NavLink>
            <NavLink className = "header" to="/Rides">
                Rides
            </NavLink>
            <NavLink className = "header" to="/Requests">
                Requests
            </NavLink>
            <div className="header--links">
                <NavLink to="/Signupform">
                    Sign Up
                </NavLink>
                <NavLink to="/Loginform">
                    Log in
                </NavLink>
            </div>
            
        </nav>
    )
}
export default Navbar;