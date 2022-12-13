import React, { useState } from 'react'
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../../Redux/Actions/User';
import "./ResetPassword.css";
import Logo from "../../assets/app-logo.png";


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const { error, message, loading } = useSelector(state => state.like);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, newPassword));
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
        <div className="restPassword">
            <form className="restPasswordForm" onSubmit={submitHandler}>
                <img src={Logo} alt="" className='app-logo' />
                <h2>Soicout</h2>
                <div className='inputbox'>
                    <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span>New Password</span>
                    <i></i>
                </div>
                <div className='links'>
                    <Link to="/forgot/password" className='link'>
                        Request Another Token!
                    </Link>
                    <Link to="/" className='link'>
                        Login
                    </Link>
                </div>
                <button type="submit" className='btn' disabled={loading}>Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPassword