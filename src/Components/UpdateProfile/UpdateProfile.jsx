import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../Redux/Actions/User';
import Loader from '../Loader/Loader';
import './UpdateProfile.css';
import Logo from "../../assets/app-logo.png";

const UpdateProfile = () => {
    const { loading, error, user } = useSelector((state) => state.user);
    const { loading: updateLoading, error: updateError, message } = useSelector((state) => state.like);

    const [name, setName] = useState(user.name);
    const [mail, setMail] = useState(user.email);
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPreview(Reader.result);
                setAvatar(Reader.result);
            }
        };
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, mail, avatar));
        dispatch(loadUser());
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (updateError) {
            alert.error(updateError);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, error, alert, updateError, message]);

    return (
        loading ? <Loader /> : (<div className="updateProfile">
            <form className="updateProfileForm" onSubmit={submitHandler}>
                <img src={Logo} alt="appLogo" className='app-logo' />
                <h2 style={{ padding: "2vmax" }}>
                    Soicout
                </h2>

                <Avatar
                    src={avatarPreview}
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
                <button
                    type="submit"
                    className='btn'
                    disabled={updateLoading}
                >
                    Update
                </button>
            </form>
        </div >
        ));
};



export default UpdateProfile;