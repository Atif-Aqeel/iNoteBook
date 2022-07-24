import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Signup = (props) => {

  const [credentils, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //get name, email, password, cpassword from credentials (it is due to get cpassword, as it is not in thunder client)
    //destructuring
    const { name, email, password } = credentils;
    //API Call
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })

    });
    const json = await response.json();
    //after signup, any thing we get lock into console
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.token);

      //useHistory Hook used to redirect
      history.push("/");
      props.showAlert("Account Created Successfully","success");

    }
    else {
      props.showAlert("Invalid Details","danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentils, [e.target.name]: e.target.value })
  }
  return (
    <div className="container mt-2">
      <h2>Create an Account on iNoteBook</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-3 mt-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" id="name" onChange={onChange} />
          </div>
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
