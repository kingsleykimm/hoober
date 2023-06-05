import React from "react"

import {useForm} from "react-hook-form"
function Signupform () {
    const {register, handleSubmit, watch} = useForm();

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
        catch (error) { console.log ("Error: " + error)}
    }

    return (

        <form
        // action="/localhost:4000"
        onSubmit= {handleSubmit(onSubmit)}
        >
            <input 
            placeholder="Username" 
            {...register("username", {required : true})}
            />
            <input placeholder="Password" {...register("password", {required: true})}></input>
            <input placeholder="Confirm Password" {...register("confirmPassword", {required : true})}></input>
            <input value="Sign Up" type="submit"></input>

        </form>
    )

}
export default Signupform;