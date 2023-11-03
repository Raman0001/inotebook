import { useState } from 'react';
import React from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",Cpassword:"" })
    let history = useHistory();
    const host = "http://localhost:8000"
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name,email,password} = credentials
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password}),
        });
        const json = await response.json();
        // console.log(json)
        if (json.success) {
            localStorage.setItem("token",json.authtoken);
            props.showAlert("Account Created Successfully","success")
            history.push("/")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" className="form-control" id="name" value={credentials.name} placeholder="Name" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="email" value={credentials.email} placeholder="Email" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" id="password" className="form-control" value={credentials.password} aria-describedby="passwordHelpBlock" placeholder="Password" required minLength={8} onChange={onChange}/>
                <div id="password" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </div>
            </div>
            <div className="mb-3">
                <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
                <input type="password" name="Cpassword" id="Cpassword" value={credentials.Cpassword} className="form-control" aria-describedby="passwordHelpBlock" placeholder="Confirm Password" required minLength={8} onChange={onChange}/>
                    <div id="Cpassword" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </div>
            </div>
            <button type="submit" className="btn btn-dark">Sign up</button>
            </form>
        </>
    )
}

export default Signup

