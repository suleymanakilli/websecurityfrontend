import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import Spinner from './spinner';
import { toast } from "react-toastify";

function Login() {
    let navigate = useNavigate();
    const [loginState, setLoginState] = useState({ email: "", password: "" })
    const [isFetching, setIsFetching] = useState(false)

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginState(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(loginState)
        let authService = new AuthService()
        setIsFetching(true)
        authService.login(loginState)
            .then(res => {
                console.log("data:", res.data)
                toast.info(res.data.message)
                navigate('login-confirm', { state: { email: loginState.email, password: loginState.password } })
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
            .finally(() => setIsFetching(false))
        //navigate('login-confirm', { state: { email: loginState.email } })
    }
    return (
        <div className="main">
            <p className="sign" align="center">Sign in</p>
            <form className="form1" onSubmit={handleSubmit}>
                <input className="form-item " type="text" required onChange={handleChange}
                    placeholder="Email" name="email" value={loginState.email} />
                <input className="form-item" type="password" required onChange={handleChange}
                    placeholder="Password" name="password" value={loginState.password} />
                <button className="submit" disabled={isFetching}>{isFetching ? <Spinner /> : 'Sign in'}</button>
            </form>

        </div>
    )
}

export default Login