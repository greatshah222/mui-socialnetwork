import NavBar from "../navbar/index";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MypostWidget from "../widgets/MypostWidget";
const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px");

    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <NavBar />

            <Box width="100%" padding={"2rem 6%"} display={isNonMobileScreens ? "flex" : "block"} gap="0.5rem" justifyContent={"space-between"}>
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
                    <MypostWidget picturePath={picturePath} />
                </Box>
                {isNonMobileScreens && <Box flexBasis={"26%"}>{/* <UserWidget userId={_id} picturePath={picturePath} /> */}</Box>}
            </Box>
        </Box>
    );
};

export default HomePage;
