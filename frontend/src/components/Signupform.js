import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from 'yup'
function Signupform() {
    const formSchema = Yup.object().shape({
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at 6 characters long'),
        confirmPassword: Yup.string()
          .required('Password is required')
          .oneOf([Yup.ref('password')], 'Passwords do not match'),
      })
    const formOptions = {resolver: yupResolver(formSchema)}
    const { register, handleSubmit, formState } = useForm(formOptions);
    const {errors} = formState



    const onSubmit = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        const response = await fetch("http://localhost:4000/users", requestOptions)
        try {
            const responseData = await response.json()
            console.log(responseData)
            return responseData
        }
        catch (error) { console.log("Error: " + error) }
    }

    return (
        <div className="form--wrapper">

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
                >Sign Up</h1>
                <label className="form--label">Username</label>
                <input
                    placeholder="Username"
                    name="username"
                    {...register("username")}                    
                />
                <label className="form--label">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                   ></input>
                <div className="form--label"> {errors.password?.message}</div>
                <label className="form--label">Confirm Password</label>
                <input style={{ 'marginBottom': "20px" }}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                ></input>
                <div className="form--label">{errors.confirmPassword?.message}</div>
                <input value="Sign Up" type="submit"
                ></input>
                
            </form>
        </div>
    )

}
export default Signupform;