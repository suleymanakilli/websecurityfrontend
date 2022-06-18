

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Routes,
  Route
} from "react-router-dom";
import Auth from "./pages/auth";
import UserDetails from "./pages/userDetails";
import Navbar from "./components/navbar";
import RegisterConfirm from "./components/registerConfirm";
import LoginConfirm from "./components/loginConfirm";
import axios from 'axios'
import Deneme from "./pages/deneme";

function App() {
  axios.defaults.baseURL = "http://localhost:3000/api/v1/";
  return (
    <div >
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route path="/user-detail" element={<UserDetails />} />
        <Route path="/register-confirm" element={<RegisterConfirm />} />
        <Route path="/login-confirm" element={<LoginConfirm />} />
        <Route path="/deneme" element={<Deneme />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
