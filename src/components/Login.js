import { useState } from 'react';
import React from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:"" })
    let history = useHistory();
    const host = "http://localhost:8000"
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            localStorage.setItem("token",json.authtoken);
            props.showAlert("Login Successfully","success");
            history.push("/");
        }
        else{
            props.showAlert("Invalid Details","danger")

        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" name="email" className="form-control" id="email" value={credentials.email} onChange={onChange} placeholder="Email" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" name="password" className="form-control" id="password" value={credentials.password} onChange={onChange} placeholder="Password" />
                    </div>
                </div>
                <button className="btn btn-dark" type="submit" >Submit</button>
            </form>
        </>
    )
}

export default Login

