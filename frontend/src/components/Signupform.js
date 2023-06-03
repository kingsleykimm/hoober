import React from "react"
import {Form, useForm} from "react-hook-form"
function Signupform () {
    const {register, handleSubmit, watch } = useForm();


    return (

        <Form>
            <label>Username: </label><input {...register("username", {required : true})}></input>
            <input {...register("password", {required: true})}></input>
            <input {...register("confirmPassword", {required : true})}/>
        </Form>
    )

}
export default Signupform;