const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createThoughtReaction,
    deleteThoughtReaction
} = require('../../controllers/thought-controller');

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId')
.post(createThoughtReaction)
.delete(deleteThoughtReaction);

module.exports = router;