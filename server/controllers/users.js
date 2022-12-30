import User from "../models/User.js";

// Read

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({
            message: err.message,
        });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        const friends = await Promise.all(user.friends.map((id) => User.findById(id)));

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, picturePath }) => {
            return { _id, firstName, lastName, occupation, picturePath };
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({
            message: err.message,
        });
    }
};
// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            // remove friend from user friend array list
            user.friends = user.friends.filter((el) => el !== friendId);
            // remove user  from from friend friends list

            friend.friends = friend.friends.filter((el) => el !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(user.friends.map((id) => User.findById(id)));

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, picturePath }) => {
            return { _id, firstName, lastName, occupation, picturePath };
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({
            message: err.message,
        });
    }
};
