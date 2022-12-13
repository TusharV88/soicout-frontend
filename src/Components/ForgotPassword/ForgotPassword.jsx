import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Redux/Actions/User';
import "./ForgotPassword.css";
import Logo from "../../assets/app-logo.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, message } = useSelector(state => state.like);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
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
        <div className="forgotPassword">
            <form className="forgotPasswordForm" onSubmit={submitHandler}>
                <img src={Logo} alt="logo" className='app-logo' />
                <h2>Soicout</h2>
                <div className='inputbox'>
                    <input
                        type="mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>Email</span>
                    <i></i>
                </div>
                <button type="submit" className='btn' disabled={loading}>Send Token</button>
            </form>
        </div>
    )
}

export default ForgotPassword