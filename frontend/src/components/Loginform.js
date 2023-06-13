import {useForm} from "react-hook-form"
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";

function Loginform(props) {
    const {register, handleSubmit, reset, formState} = useForm();
    const [user, setUser] = useState();
    
    const [errorMessage, setErrorMessage] = useState("")
    const {errors } = formState
    const onSubmit = async (data) => {
        console.log(data)
        const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        const response = await fetch('http://localhost:4000/users/login', requestOptions);
        try {
            const responseData = await response.json()

            if (responseData.message === "Success") {
                setUser(data)
                localStorage.setItem("curUser", JSON.stringify(data))
                localStorage.setItem("authenticated", "true")
                props.setUserRender(prevRender => !prevRender)
                
            }
            else if (responseData.message === "noUser") {
                setErrorMessage("Username doesn't exist")
                reset()
            }
            else if (responseData.message === "wrongPwd") {
                setErrorMessage("User exists, but this is the wrong password!")
                reset()
            }
        }
        catch (error) {console.log(error)}

    }
    return (
        <div className="form--wrapper">
            {
                user && <Navigate to="/userprofile" replace = {true} />
            }
            <form className="user--form"
                // action="/localhost:4000"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1
                    style={
                        {
                            "fontFamily": "Inter",
                            "color": "#F4EEE0",
                            "alignSelf": "center"
                        }
                    }
                >Welcome!</h1>
                <label className="form--label">Username</label>
                <input className="user--input" 
                    placeholder="Username"
                    name="username"
                    {...register("username",  {required: true})}                    
                />
                {
                    errors.username && errors.username.type === "required" && (
                        <div className="form--errors">Username is required</div>
                    )
                }
                
                <label className="form--label" >Password</label>
                <input className="user--input" 
                    name="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", {required: true})}
                    style = {{

                    }}
                   ></input>
                {
                    errors.password && errors.password.type === "required" && (
                        <div className="form--errors">Password is required</div>
                    )
                }
                {
                    errorMessage && <div className="form--errors">{errorMessage}</div>
                }
                <input className="user--input--buttons" value="Log In" type="submit" 
                ></input>
                <p className="form--label">Don't have an account? 
                <Link to="/Signupform"
                style = {
                    {
                        "textDecoration" : "none",
                        "marginLeft": "15px",
                        "backgroundColor": "white",
                        "padding": "10px",
                        "borderRadius": "6px",
                        "fontSize" : "18px",
                    }
                }
                >
                     Sign Up 
                </Link>
</p>
            </form>
        </div>
    )
}

export default Loginform;