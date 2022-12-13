import React, { useEffect, useState as UseState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./UpdatePassword.css";
import { updatePassword } from '../../Redux/Actions/User';
import { useAlert } from 'react-alert';
import Logo from "../../assets/app-logo.png";

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = UseState("");
    const [newPassword, setNewPassword] = UseState("");
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector(state => state.like);

    const updatePasswordHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword));
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
    }, [dispatch, error, alert, message]);


    return (
        <div className="updatePassword">
            <form className="updatePasswordForm" onSubmit={updatePasswordHandler}>
                <img src={Logo} alt="logo" className='app-logo' />
                <h2>Soicout</h2>
                <div className='inputbox'>
                    <input
                        type="password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <span>Old Password</span>
                    <i></i>
                </div>
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
                <button type="submit" className='btn' disabled={loading}>Change Password</button>
            </form>
        </div>
    );
};


export default UpdatePassword;