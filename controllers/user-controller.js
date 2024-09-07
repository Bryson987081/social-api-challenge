const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete(req.params.id);
            res.json(deletedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate({ _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId || req.params.friendId } },
                { new: true }
            )
            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const deletedFriend = await User.findOneAndUpdate({ _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )
            res.json(deletedFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

