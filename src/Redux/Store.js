import { configureStore } from "@reduxjs/toolkit";
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from "./Reducers/User";


const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPost: userPostsReducer,
}
});

export const server = process.env.REACT_APP_API_URL;


export default store;

