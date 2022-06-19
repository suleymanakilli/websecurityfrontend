import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import Spinner from './spinner';
import { toast } from "react-toastify";
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';

function Login() {
    let navigate = useNavigate();
    const recaptchaRef = useRef();
    const [loginState, setLoginState] = useState({ email: "", password: "" })
    const [isFetching, setIsFetching] = useState(false)
    const [errorCount, setErrorCount] = useState(0)

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginState(prev => ({ ...prev, [name]: value }))
    }

    const checkRecaptcha = async () => {
        const res = await axios.post('/users/verifycaptcha', { secret: '6LeaCH4gAAAAAHri5nZigAhC_QN2KdvI0KVegkIk', token: recaptchaRef.current.getValue() })
        console.log("res.data:", res.data)
        return res.data.success
    }

    const login = () => {
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
                setErrorCount(errorCount + 1)
                if (errorCount > 2) {
                    recaptchaRef.current.reset()
                }
            })
            .finally(() => setIsFetching(false))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(loginState)

        if (errorCount < 3) {
            login()
        }
        else {
            const result = await checkRecaptcha();
            console.log("resultcaptcha : ", result)
            if (result) {
                login()
            }
            else {
                toast.error("Captcha yanlış")
            }
        }


        //navigate('login-confirm', { state: { email: loginState.email } })
    }

    const onChangeCaptcha = (value) => {
        console.log('Captcha value:', value);
    }
    return (
        <div className="main">
            <p className="sign" align="center">Sign in</p>
            <form className="form1" onSubmit={handleSubmit}>
                <input className="form-item " type="text" required onChange={handleChange}
                    placeholder="Email" name="email" value={loginState.email} />
                <input className="form-item" type="password" required onChange={handleChange}
                    placeholder="Password" name="password" value={loginState.password} />
                {errorCount > 2 ?
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1rem"
                    }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LeaCH4gAAAAAGDTrEMUetcVevGempDcE0Sau-bk"
                            onChange={onChangeCaptcha}
                        />
                    </div> : null}



                <button className="submit" disabled={isFetching}>{isFetching ? <Spinner /> : 'Sign in'}</button>
            </form>

        </div>
    )
}

export default Login