import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },

        likes: {
            type: Map,
            of: Boolean,
        },

        comments: {
            type: Array,
            default: [],
        },
        location: String,
        picturePath: String,

        userPicturePath: String,
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
