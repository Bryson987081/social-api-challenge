const Thought = require('../models/Thought');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                }
                res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            if (!newThought) {
                return res.status(404).json({ message: 'Could not create thought' });
            }
            res.json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(req.params.id, req.body, { new: true});
            if (!updatedThought) {
                return res.status(404).json({ message: 'Could not update thought' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete(req.params.id);
            if (!deletedThought) {
                return res.status(404).json({ message: 'Could not delete thought' });
            }
            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThoughtReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            )
            if (!newReaction) {
                return res.status(404).json({ message: 'Could not create reaction to thought' });
            }
            res.json(newReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThoughtReaction(req, res) {
        try {
            const deletedReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId }}},
                {new: true }
            )
            if (!deletedReaction) {
                return res.status(404).json({ message: 'Could not delete reaction' });
            }
            res.json(deletedReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}