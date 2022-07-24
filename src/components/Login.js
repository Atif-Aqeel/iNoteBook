import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [credentils, setCredentials] = useState({email: "", password:""})
    let history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //API Call
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentils.email, password: credentils.password})

        });
        const json = await response.json();
        console.log(json); 
        if(json.success ){
            //save the auth token and redirect
            localStorage.setItem('token', json.token);
            props.showAlert("Logged in Successfully","success");
            //useHistory Hook used to redirect
            history.push("/");

        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentils, [e.target.name]: e.target.value })
    }

    return (
        <div className="mt-3">
            <h2>Login to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentils.email} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} value={credentils.password} id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
