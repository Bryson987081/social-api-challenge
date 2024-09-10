const Thought = require('../models/Thought');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
                res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            res.json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(req.params.id, req.body, { new: true});
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete(req.params.id);
            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThoughtReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body.reactionId || req.params.reactionId } },
                { new: true }
            )
            res.json(newReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThoughtReaction(req, res) {
        try {
            const deletedReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.params.reactionId }},
                {new: true }
            )
            res.json(deletedReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}