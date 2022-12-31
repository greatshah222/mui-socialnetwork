import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";

import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPost } from "../../state";

// };
const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {
    const [isComment, setIsComment] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUserId = useSelector((state) => state.user._id);

    const isLiked = Boolean(likes[loggedInUserId]);
    // cause likes will be array of UserId and if not liked by current user ->it will return false
    // likes={
    //     "userId1":true,
    //     "userId2":true,
    // }

    const likeCount = Object.keys(likes)?.length;

    const token = useSelector((state) => state.token);
    const { palette } = useTheme();

    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const data = {
            userId: loggedInUserId,
        };
        const res = await axios.patch(`http://localhost:3005/posts/${postId}/like`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(setPost({ post: res?.data }));
    };
    return (
        <WidgetWrapper m="2rem 0">
            <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />

            <Typography
                color={main}
                sx={{
                    mt: "1rem",
                }}
            >
                {description}
            </Typography>

            {picturePath && (
                <img
                    width={"100%"}
                    height={"100%"}
                    src={`http://localhost:3005/assets/${picturePath}`}
                    alt={"post"}
                    style={{
                        borderRadius: "0.75rem",
                        marginTop: "0.75rem",
                    }}
                />
            )}

            <FlexBetween mt="0.5rem">
                {/* LIKE&COMMENT */}
                <FlexBetween gap="1rem">
                    {/* LIKE */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>{isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}</IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    {/* COMMENT */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComment(!isComment)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments?.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                {/* SHARE */}
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {/* ALL COMMENTS */}

            {isComment && (
                <Box mt="0.5rem">
                    {comments.map((el, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography
                                color={main}
                                sx={{
                                    m: "0.5rem 0",
                                    pl: "1rem",
                                }}
                            >
                                {el}
                            </Typography>
                            <Divider />
                        </Box>
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
