import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import AuthService from '../services/authService';
import Spinner from './spinner';

function Register() {
    let navigate = useNavigate();
    const [registerState, setRegisterState] = useState({ name: "", lastName: "", email: "", password: "", passwordConfirm: "" })
    const [isFetching, setIsFetching] = useState(false)
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setRegisterState(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (registerState.password !== registerState.passwordConfirm) {
            toast.error("Şifreler aynı değil")
        }
        else {
            console.log(registerState)
            let authService = new AuthService();
            setIsFetching(true)
            authService.signup(registerState).then(res => {
                console.log(res.data);
                toast.info(res.data.message)
                navigate('register-confirm', { state: { email: registerState.email } })
            })
                .catch(err => {
                    toast.error(err.response.data.message)
                })
                .finally(() => setIsFetching(false))

        }

    }
    return (
        <div className="main">
            <p className="sign" align="center">Sign up</p>
            <form className="form1" onSubmit={handleSubmit}>
                <input className="form-item" type="text" required placeholder="Name" name='name'
                    onChange={handleChange} value={registerState.name} />
                <input className="form-item" type="text" required placeholder="Last Name" name='lastName'
                    onChange={handleChange} value={registerState.lastName} />
                <input className="form-item" type="text" required placeholder="Email" name='email'
                    onChange={handleChange} value={registerState.email} />
                <input className="form-item" type="password" required placeholder="Password" name='password'
                    onChange={handleChange} value={registerState.password} />
                <input className="form-item" type="password" required placeholder="Password Confirm" name='passwordConfirm'
                    onChange={handleChange} value={registerState.passwordConfirm} />
                <button className="submit" disabled={isFetching}>{isFetching ? <Spinner /> : 'Sign up'}</button>
            </form>

        </div>
    )
}

export default Register