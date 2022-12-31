import { useMediaQuery, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import FriendListWidget from "../widgets/FriendListWidget";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../navbar";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import MypostWidget from "../widgets/MypostWidget";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();

    const token = useSelector((state) => state.token);

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        const res = await axios.get(`http://localhost:3005/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(res?.data);
    };
    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null;
    }

    return (
        <Box>
            <NavBar />

            <Box width="100%" padding={"2rem 6%"} display={isNonMobileScreens ? "flex" : "block"} gap="2rem" justifyContent={"center"}>
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user?.picturePath} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
                    {/* <MypostWidget picturePath={user?.picturePath} /> */}
                    <Box m="-2rem 0" />

                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
