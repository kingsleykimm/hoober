import React, { useState} from "react"
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from 'yup'
import { Navigate } from "react-router-dom";

function Signupform(props) {
    const formSchema = Yup.object().shape({
        username: Yup.string()
           .required("Username is required"),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at 6 characters long'),
        confirmPassword: Yup.string()
          .required('Password is required')
          .oneOf([Yup.ref('password')], 'Passwords do not match'),
      })
    const formOptions = {resolver: yupResolver(formSchema)}
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const {errors} = formState
    const [userExists, setUserExists] = useState(false)
    const [user, setUser] = useState(null)
    const onSubmit = async (data) => {
        const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        const response = await fetch("http://localhost:4000/users", requestOptions)
        try {
            const responseData = await response.json()
            if (responseData["userExists"]) {
                setUserExists(true)
                reset()
            }
            else {
                setUserExists(false);
                setUser(data)
                localStorage.setItem("curUser", JSON.stringify(data))
                localStorage.setItem("authenticated", true)
                props.setUserRender(prevRender => !prevRender)
            }
               

        }
        catch (error) { console.log("Error: " + error) }
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
                <input
                    placeholder="Username"
                    name="username"
                    {...register("username")}                    
                />
                <div className="form--errors"> {errors.username?.message}</div>
                <label className="form--label">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                   ></input>
                <div className="form--errors"> {errors.password?.message}</div>
                <label className="form--label">Confirm Password</label>
                <input style={{ 'marginBottom': "20px" }}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                ></input>
                <div className="form--errors">{errors.confirmPassword?.message}</div>
                <input value="Sign Up" type="submit"
                ></input>
                {userExists && <p className="form--label" style = {
                    {
                        "textAlign": "center",
                        "marginBottom": "0px"
                    }
                    }>User already exists in our database</p>}
                
            </form>
        </div>
    )

}
export default Signupform;