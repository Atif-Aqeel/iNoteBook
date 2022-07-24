//Navbar componenet by bootstrap //rafce
import React from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";


const Navbar = () => {
    //The useLocation hook returns the location object that represents the current URL. You can think about it like a useState that returns a new location whenever the URL changes.
    let location = useLocation();
    let history = useHistory();

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        history.push('/login')
    }

    return (
        //Navbar from Bootstrap
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* here ternory operator used, when we click on Home, then Home button will be active/bright and all other some how lless bright/gray */}
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {/* if localstorage.getitem is not null, then a user is loggen in, otherwise */}
                    {!localStorage.getItem('token') ?  <form className="d-flex" >
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>: <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    }


                    {/* <form className="d-flex" >
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form> */}
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>

            </div>
        </nav>

    )
}

export default Navbar
