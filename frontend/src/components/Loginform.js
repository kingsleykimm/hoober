import {useForm} from "react-hook-form"

function Loginform() {
    const {register, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        const response = await fetch('http://localhost:4000/users/login', requestOptions);
        try {
            const responseData = await response.json()
            console.log(responseData)
        }
        catch (error) {console.log(error)}
        
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
                >Welcome!</h1>
                <label className="form--label">Username</label>
                <input
                    placeholder="Username"
                    name="username"
                    {...register("username",  {required: true, errors: "Username is required"})}                    
                />
                <label className="form--label" >Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", {required: true, errors: "Password is required"})}
                    style = {{
                        "marginBottom" : "20px",
                    }}
                   ></input>
                <input value="Log In" type="submit" 
                ></input>
            </form>
        </div>
    )
}

export default Loginform;