import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SiHappycow } from "react-icons/si"



function Navbar(props) {


    const auth = localStorage.getItem("authenticated")
    const [authState, setAuthState] = useState(auth)
    let user = "";
    if (auth.length > 0)
        user = JSON.parse(localStorage.getItem("curUser"))
    return (
        <nav className="header">
            <div className="home-button-style">
                <img src="https://img.icons8.com/dotty/80/000000/circled-h.png"  color />
                <NavLink style={{"fontSize": "45px" }} to="/Home">
                    Hoober
                </NavLink>

            </div>
            {
                auth.length !== 0 ?
                    <div className="header--links">
                        <NavLink to="/Rides">
                            Rides
                        </NavLink>
                        <NavLink to="/Requests">
                            Requests
                        </NavLink>
                        <div className="user--dropdown">
                            <p className="username">
                                {user.username}
                            </p>
                            <div className="dropdown--content">
                                <NavLink to="/userprofile">
                                    Dashboard
                                </NavLink>
                                <NavLink to="/loginform" onClick={() => {
                                    localStorage.setItem("authenticated", "")
                                    localStorage.setItem("curUser", "")
                                    props.setUserRender( prevRender => !prevRender)
                                }
                                }>
                                    Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="header--links">
                        <NavLink to="/Rides">
                            Rides
                        </NavLink>
                        <NavLink to="/Requests">
                            Requests
                        </NavLink>
                        <NavLink to="/Loginform">
                            Sign Up / Log in
                        </NavLink>
                    </div>


            }


        </nav>
    )
}
export default Navbar