import { Avatar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Redux/Actions/User';
import './Register.css';
import Logo from "../../assets/app-logo.png";

const Register = () => {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error } = useSelector((state) => state.user);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, mail, password, avatar));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
    }, [dispatch, error, alert]);

    return (
        <div className="register">
            <form className="registerForm" onSubmit={submitHandler}>
                <img src={Logo} alt=""  className='app-logo'/>
                <h2 style={{ padding: "2vmax" }}>
                    Soicout
                </h2>
                <Avatar
                    src={avatar}
                    alt="User"
                    sx={{ height: "10vmax", width: "10vmax" }}
                />

                <input type="file" accept="image/*" onChange={handleImageChange} />

                <div className='inputbox'>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span>Username</span>
                    <i></i>
                </div>

                <div className='inputbox'>
                    <input
                        type="mail"
                        required
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
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
                <div className='logbox'>
                    <h3>Already have an account?</h3>
                    <Link to="/">
                        <Typography>Login Now</Typography>
                    </Link>
                </div>
                <button type="submit" className='btn' disabled={loading}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};


export default Register