import { Delete } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react'
import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCommentOnPost, getMyPosts } from '../../Redux/Actions/Post';
import { getFollowingPosts } from '../../Redux/Actions/User';
import './commentCard.css';

const commentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount,
}) => {
    const { user } = UseSelector(state => state.user);
    const dispatch = UseDispatch();

    const deleteCommentHandler = async() => {
        await dispatch(deleteCommentOnPost(postId, commentId));

        if (isAccount) {
            dispatch(getMyPosts());
        } else {
            dispatch(getFollowingPosts());
        }
    };

    return (
        <div className='commentUser'>
            <Link to={`/user/${userId}`}>
                <img src={avatar} alt={name} />
                <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
            </Link>
            <Typography>{comment}</Typography>
            {isAccount ? <Button onClick={deleteCommentHandler}>
                <Delete />
            </Button> : userId === user._id ? <Button onClick={deleteCommentHandler}>
                <Delete />
            </Button> : null}
        </div>
    )
}

export default commentCard