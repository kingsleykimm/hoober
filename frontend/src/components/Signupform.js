import React, {useState} from "react"
import {useForm} from "react-hook-form"
function Signupform () {
    const {register, handleSubmit, watch} = useForm();
    const [data, setData] = useState("");


    return (

        <form
        // action="/localhost:4000"
        onSubmit= {handleSubmit(async (data) => {
            console.log(JSON.stringify(data))
            const requestOptions = {
                method: "POST",

                mode: "no-cors",
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            const response = await fetch("http://localhost:4000/users/", requestOptions)
            console.log(response)
        })}
        >
            <input 
            placeholder="Username" 
            {...register("username", {required : true})}></input>
            <input placeholder="Password" {...register("password", {required: true})}></input>
            <input placeholder="Confirm Password" {...register("confirmPassword", {required : true})}></input>
            <input value="Sign Up" type="submit"></input>

        </form>
    )

}
export default Signupform;