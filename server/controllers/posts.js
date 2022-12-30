import Post from "../models/Post.js";
import User from "../models/User.js";

// Create

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;

        const user = await User.findById(userId);
        // console.log("user", req.body);

        const { firstName, lastName, location } = user;
        const newPost = new Post({
            userId,
            firstName,
            lastName,
            location,
            description,
            userPicturePath: user?.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });

        await newPost.save();

        // grab all the posts

        const post = await Post.find();

        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({
            mesage: error.message,
        });
    }
};

// REAd

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            mesage: error.message,
        });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const post = await Post.find({ userId });

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            mesage: error.message,
        });
    }
};

// UPDATE COMMENT

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        // chekicng whether liked ot not
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            // delete
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                likes: post.likes,
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({
            mesage: error.message,
        });
    }
};
