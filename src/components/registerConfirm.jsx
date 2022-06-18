import React, { useState } from 'react'
import Spinner from './spinner'
import { useLocation } from 'react-router-dom'
import AuthService from '../services/authService';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
function RegisterConfirm() {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { email } = state;
    const [registerCode, setRegisterCode] = useState("")
    const [isFetching, setIsFetching] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();
        let authService = new AuthService();
        setIsFetching(true)
        console.log({ email, emailCode: registerCode })
        authService.confirmRegister({ email, code: registerCode }).then(res => {
            console.log(res.data);
            toast.info(res.data.message)
            navigate('/user-detail')
        })
            .catch(err => {
                toast.error(err.response.data.message)
            })
            .finally(() => setIsFetching(false))
    }
    return (
        email ?
            <div className="main">
                <p className="sign" align="center">Confirm Your Account</p>
                <form className="form1" onSubmit={handleSubmit}>
                    <input className="form-item" type="text" required placeholder="Register Code" name='registerCode'
                        onChange={e => setRegisterCode(e.target.value)} value={registerCode} />
                    <button className="submit" disabled={isFetching}>{isFetching ? <Spinner /> : 'Send'}</button>
                </form>

            </div> : <div>error</div>
    )
}

export default RegisterConfirm