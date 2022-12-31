import { PersonAddOutlined, PersonRemoveRounded } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const { main, medium } = palette.neutral;

    const isFriend = friends.find((el) => el?._id === friendId);

    const patchFriend = async () => {
        const res = await axios.patch(
            `http://localhost:3005/users/${_id}/${friendId}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("res?.data", res?.data);

        dispatch(
            setFriends({
                friends: res?.data,
            })
        );
    };

    return (
        <>
            <FlexBetween>
                <FlexBetween>
                    <UserImage image={userPicturePath} size="55px" />
                    <Box
                        onClick={() => {
                            navigate(`/profile/${friendId}`);
                            // this below will refresh the page ->problem is react not recognizing the changes
                            navigate(0);
                        }}
                    >
                        <Typography
                            color={main}
                            variant="h5"
                            fontWeight={"500"}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography color={medium} fontSize="0.75rem">
                            {subtitle}
                        </Typography>
                    </Box>
                </FlexBetween>
                {/* // if post belong to user we dont shoe add friend icon */}
                {_id !== friendId && (
                    <IconButton
                        sx={{
                            backgroundColor: primaryLight,
                            p: "0.6rem",
                        }}
                        onClick={patchFriend}
                    >
                        {isFriend ? (
                            <PersonRemoveRounded
                                sx={{
                                    color: primaryDark,
                                }}
                            />
                        ) : (
                            <PersonAddOutlined
                                sx={{
                                    color: primaryDark,
                                }}
                            />
                        )}
                    </IconButton>
                )}
            </FlexBetween>
        </>
    );
};

export default Friend;
