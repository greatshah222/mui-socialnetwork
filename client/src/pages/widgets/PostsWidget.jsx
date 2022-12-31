import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    // all posts

    const getPosts = async () => {
        const res = await axios.get("http://localhost:3005/posts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(
            setPosts({
                posts: res.data,
            })
        );
    };
    // only user posts

    const getUserPosts = async () => {
        const res = await axios.get(`http://localhost:3005/posts/${userId}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("res", res);
        dispatch(
            setPosts({
                posts: res.data,
            })
        );
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    return posts?.map(({ _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments }) => (
        <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
        />
    ));
};

export default PostsWidget;
