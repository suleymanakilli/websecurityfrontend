import React, { useState } from 'react'
import Spinner from './spinner'
import { useLocation } from 'react-router-dom'
import AuthService from '../services/authService';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import CountDown from './countDown';

function LoginConfirm() {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { email, password } = state;
    const [loginCode, setLoginCode] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [isExpired, setIsExpired] = useState(false)
    const [timeLimit, setTimeLimit] = useState(60)

    const handleSubmit = e => {
        e.preventDefault()
        let authService = new AuthService();
        setIsFetching(true)
        authService.confirmLogin({ email, loginCode }).then(res => {
            console.log(res.data);
            toast.info(res.data.message)
            navigate('/user-detail')
        })
            .catch(err => {
                toast.error(err.response.data.message)
            })
            .finally(() => setIsFetching(false))
    }

    const handleResendCode = e => {
        let authService = new AuthService();
        console.log({ email, password })
        setIsFetching(true)
        authService.login({ email, password })
            .then(res => {
                console.log("data:", res.data)
                toast.info(res.data.message)
                setTimeLimit(60)
                setIsExpired(false)

            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
            .finally(() => setIsFetching(false))
    }
    return (
        email ?
            <div className="main">
                <p className="sign" align="center">Enter your login code</p>
                <div align="center"><CountDown timeLimit={timeLimit} setIsExpired={setIsExpired} setTimeLimit={setTimeLimit} /></div>

                <form className="form1" onSubmit={handleSubmit}>
                    <input className="form-item" type="text" required placeholder="Login Code" name='loginCode'
                        onChange={e => setLoginCode(e.target.value)} value={loginCode} />
                    {isExpired ?
                        <button type='button' className="submit" onClick={handleResendCode} disabled={isFetching}>{isFetching ? <Spinner /> : 'Resend'}</button>
                        :
                        <button type='submit' className="submit" disabled={isFetching}>{isFetching ? <Spinner /> : 'Send'}</button>}

                </form>

            </div> : <div>error</div>
    )
}

export default LoginConfirm