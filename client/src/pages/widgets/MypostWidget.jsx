import { EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";

import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from "@mui/material";
import { borderRadius } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPosts } from "../../state";
import Dropzone from "react-dropzone";

const MypostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);

    const [post, setPost] = useState("");
    const { palette } = useTheme();

    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px");

    const { mediumMain, medium } = palette.neutral;

    const handlePost = async () => {
        const formData = new FormData();

        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const res = await axios.post(`http://localhost:3005/posts`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(setPosts(res.data));
        setImage(null);
        setPost("");
        setIsImage(false);
    };
    return (
        <WidgetWrapper>
            <FlexBetween gap="1rem">
                <UserImage image={picturePath} />

                <InputBase
                    placeholder="What's on your mind ...."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>

            {isImage && (
                <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                            setImage(acceptedFiles[0]);
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <input {...getInputProps} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(null)}>
                                        <DeleteOutlined />{" "}
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider
                sx={{
                    margin: "1.25rem 0",
                }}
            />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!image)}>
                    <ImageOutlined />
                    <Typography
                        color={mediumMain}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: medium,
                            },
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined
                                sx={{
                                    color: mediumMain,
                                }}
                            />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined
                                sx={{
                                    color: mediumMain,
                                }}
                            />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <MicOutlined
                                sx={{
                                    color: mediumMain,
                                }}
                            />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <>
                        <FlexBetween gap="0.25rem">
                            <MoreHorizOutlined
                                sx={{
                                    color: mediumMain,
                                }}
                            />
                        </FlexBetween>
                    </>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    Post
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MypostWidget;
