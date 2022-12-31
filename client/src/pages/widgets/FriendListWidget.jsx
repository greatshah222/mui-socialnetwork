import { Typography, useTheme, Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setFriends } from "../../state";
import Friend from "../../components/Friend";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const { main, medium } = palette.neutral;

    const getFriends = async () => {
        const res = await axios.get(`http://localhost:3005/users/${userId}/friends`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(setFriends({ friends: res?.data }));
    };

    useEffect(() => {
        getFriends();
    }, []);

    console.log("friends", friends);
    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight={"500"}
                sx={{
                    mb: "1.5rem",
                }}
            >
                Friend List
            </Typography>

            <Box display="flex" flexDirection={"column"} gap="1.5rem">
                {friends.map((el) => (
                    <Friend
                        key={el?._id}
                        friendId={el._id}
                        name={`${el?.firstName} ${el?.lastName}`}
                        subtitle={el?.occupation}
                        userPicturePath={el?.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
