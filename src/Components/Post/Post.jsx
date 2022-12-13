import React, { useEffect, useState } from 'react'
import './Post.css';
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutlined
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentOnPost, deletePost, getMyPosts, likePost, updatePost } from '../../Redux/Actions/Post';
import { getFollowingPosts, getUserPosts, loadUser } from '../../Redux/Actions/User';
import User from '../User/User';
import CommentCard from '../commentCard/commentCard';


const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isPage = "account",
}) => {
    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const params = useParams();

    const handleLike = async () => {
        setLiked(!liked);

        await dispatch(likePost(postId));

        if (isPage === "account") {
            dispatch(getMyPosts());
        } else if (isPage === "profile") {
            dispatch(getUserPosts(params.id));
        } else {
            dispatch(getFollowingPosts());
        }
    };

    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));

        if (isPage === "account") {
            dispatch(getMyPosts());
        } else if (isPage === "profile") {
            dispatch(getUserPosts(params.id));
        } else {
            dispatch(getFollowingPosts());
        }
    };


    const updateCaptionHandler = (e) => {
        e.preventDefault();
        dispatch(updatePost(captionValue, postId));
        dispatch(getMyPosts());
    };

    const deletePostHandler = async () => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
    };

    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true);
            }
        });
    }, [likes, user._id]);


    return (
        <div className='post'>
            <div className='postHeader'>
                <div className='userInfo'>
                    <Avatar
                        src={ownerImage}
                        alt={ownerName}
                        sx={{ width: "3vmax", height: "3vmax" }}
                        className='userAvatar'
                    />
                    <Link to={`/user/${ownerId}`} className="userName">
                        <Typography fontWeight={700}>{ownerName}</Typography>
                    </Link>
                </div>
                {isPage === "account" ? (
                    <Button onClick={() => setCaptionToggle(!captionToggle)}>
                        <MoreVert />
                    </Button>) : null}
            </div>
            <img src={postImage} alt="Post" />
            {caption ? <div className='postDetails'>
                <Link to={`/user/${ownerId}`} className="userName">
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>
                <Typography
                    fontWeight={100}
                    color="rgba(0,0,0,0.582)"
                    style={{ alignSelf: "center" , fontWeight: "400" }}
                >
                    {caption}
                </Typography>
            </div> : null}
            <Button
                style={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    margin: "1vmax 2vmax",
                }}
                onClick={() => setLikesUser(!likesUser)}
                disabled={likes.length === 0 ? true : false}
            >
                <Typography>{likes.length} Likes</Typography>
            </Button>
            <div className="postFooter">
                <Button onClick={handleLike}>
                    {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
                </Button>

                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>
                {isDelete ? <Button onClick={deletePostHandler}>
                    <DeleteOutlined />
                </Button> : null}
            </div>
            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>
                    {likes.map((like) => (
                        <User
                            key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url}
                        />
                    ))}
                </div>
            </Dialog>
            <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>
                    <form className='commentForm' onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Add a comment..."
                            required
                        />
                        <Button type="submit" variant='contained'>Add</Button>
                    </form>
                    {
                        comments.length > 0 ? comments.map((comment) => (
                            <CommentCard
                                key={comment._id}
                                userId={comment.user._id}
                                name={comment.user.name}
                                avatar={comment.user.avatar.url}
                                comment={comment.comment}
                                commentId={comment._id}
                                postId={postId}
                                isAccount={isPage === "account" ? true : false}
                            />
                        )) : <Typography variant="h5">No Comments Yet</Typography>
                    }
                </div>
            </Dialog>
            <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Update Caption</Typography>
                    <form className='commentForm' onSubmit={updateCaptionHandler}>
                        <input
                            type="text"
                            value={captionValue}
                            onChange={(e) => setCaptionValue(e.target.value)}
                            placeholder="Caption..."
                            required
                        />
                        <Button type="submit" variant='contained'>Update</Button>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}

export default Post