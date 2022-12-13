import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyPosts } from '../../Redux/Actions/Post';
import { deleteMyProfile, loadUser, logoutUser } from '../../Redux/Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import User from '../User/User';
import './Account.css';

const Account = () => {
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);

    const alert = useAlert();
    const { user, loading: userLoading } = useSelector(state => state.user);
    const { loading, error, posts } = useSelector(state => state.myPosts);
    const { error: likeError, message, loading: deleteLoading } = useSelector(state => state.like);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
        alert.success('Logged out successfully');
    }

    const deleteProfileHandler = async () => {
        await dispatch(deleteMyProfile());
        dispatch(logoutUser());
    }

    useEffect(() => {
        dispatch(getMyPosts());
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (likeError) {
            alert.error(likeError);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [error, likeError, message, alert, dispatch]);


    return (
        loading === true || userLoading === true ? <Loader /> : (
            <div className='account'>
                <div className='accountleft'>
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <Post
                                key={post._id}
                                postId={post._id}
                                caption={post.caption}
                                postImage={post.image.url}
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={post.owner.avatar.url}
                                ownerName={post.owner.name}
                                ownerId={post.owner._id}
                                isPage="account"
                                isDelete={true}
                            />
                        ))
                    ) : (
                        <Typography variant="h6">You have not made any post</Typography>
                    )}
                </div>
                <div className='accountright'>
                    <Avatar src={user.avatar.url}
                        sx={{ width: "8vmax", height: "8vmax" }}
                    />
                    <Typography variant="h5">{user.name}</Typography>
                    <div>
                        <button onClick={() => setFollowersToggle(!followersToggle)} className="account-btn">
                            <Typography variant="h6">Followers</Typography>
                        </button>
                        <Typography variant="h6">{user.followers.length}</Typography>
                    </div>
                    <div>
                        <button onClick={() => setFollowingToggle(!followingToggle)} className="account-btn">
                            <Typography variant="h6">Following</Typography>
                        </button>
                        <Typography variant="h6">{user.following.length}</Typography>
                    </div>
                    <div>
                        <Typography variant="h6">Posts</Typography>
                        <Typography variant="h6">{user.posts.length}</Typography>
                    </div>
                    <Link to="/update/profile" >Edit Profile</Link>
                    <Link to="/update/password" >Change Password</Link>
                    <Button variant="contained" onClick={logoutHandler} style={{ marginTop: "2vmax"}}>
                    Logout
                </Button>
                <Button
                    sx={{ color: "red", margin: "2vmax" }}
                    onClick={deleteProfileHandler}
                    disabled={deleteLoading}
                >
                    Delete My Profile
                </Button>
                <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                    <div className='DialogBox'>
                        <Typography variant="h6">Followers</Typography>
                        {user && user.followers.length > 0 ? (
                            user.followers.map((follower) => (
                                <User
                                    key={follower._id}
                                    userId={follower._id}
                                    name={follower.name}
                                    avatar={follower.avatar.url}
                                />
                            ))
                        ) : (
                            <Typography style={{ margin: "2vmax" }}>
                                You have no followers
                            </Typography>
                        )}
                    </div>
                </Dialog>
                <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                    <div className='DialogBox'>
                        <Typography variant="h6">Following</Typography>
                        {user && user.following.length > 0 ? (
                            user.following.map((following) => (
                                <User
                                    key={following._id}
                                    userId={following._id}
                                    name={following.name}
                                    avatar={following.avatar.url}
                                />
                            ))
                        ) : (
                            <Typography style={{ margin: "2vmax" }}>
                                You are not following anyone
                            </Typography>
                        )}
                    </div>
                </Dialog>
            </div>
            </div >
        )
    )
}

export default Account