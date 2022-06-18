import axios from 'axios'

export default class AuthService {
    login(values) {
        return axios.post('users/login', values)
    }
    signup(values) {
        return axios.post('users/signup', values)
    }
    confirmRegister(values) {
        return axios.post('users/confirmregister', values)
    }
    confirmLogin(values) {
        return axios.post('users/confirmlogin', values)
    }
    getUser(id) {
        return axios.get(`users/${id}`)
    }
}