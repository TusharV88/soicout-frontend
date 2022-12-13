import React, { useEffect, useState as UseState } from 'react'
import "./Login.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/app-logo.png";
import { loginUser } from '../../Redux/Actions/User';
import { useAlert } from 'react-alert';

const Login = () => {
    const [email, setEmail] = UseState("");
    const [password, setPassword] = UseState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error } = useSelector(state => state.user);
    const { message } = useSelector(state => state.like);

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, error, message, alert]);


    return (
        <div className="login">
            <form className="loginForm" onSubmit={loginHandler}>
                <img src={Logo} alt="logo" className='app-logo' />
                <h2>Soicout</h2>
                <div className='inputbox'>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>Email</span>
                    <i></i>
                </div>
                <div className='inputbox'>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>Password</span>
                    <i></i>
                </div>
                <div className='links'>
                    <Link to="/forgot/password">
                        <Typography>Forgot Password?</Typography>
                    </Link>

                    <Link to="/register">
                        <Typography>NewUser?</Typography>
                    </Link>
                </div>
                <button type="submit" className='btn'>Login</button>

            </form>
        </div>
    );
};

export default Login