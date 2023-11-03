import React from 'react'
import { useLocation, Link,useHistory } from "react-router-dom";
const Navbar = () => {
    let history = useHistory()
    const handleLogout =()=>{
        localStorage.removeItem("token");
        history.push('/login')
    }
    let location = useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary">
                <div className="container-fluid">
                    <b>iNotebook</b>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {localStorage.getItem("token")?<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>:<b>&nbsp;</b>}
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token")?<form className="d-flex" role="search">
                            <Link className="btn btn-dark mx-2" to="/login" role="button">Log in</Link>
                            <Link className="btn btn-dark mx-2" to="/signup" role="button">Sign up</Link>
                        </form>:<button className='btn btn-dark' onClick={handleLogout}>Log out</button>}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
