const router = require('express').Router();
const { createPost, getPostWithId, getAllPost, editPost, deletePost } = require('../../controller/post/crud.js');
const passport = require('passport');

// Basic crud
router.post('/post', passport.authenticate('jwt', { session: false }), createPost);
router.get('/post', passport.authenticate('jwt', { session: false }), getAllPost);
router.put('/post', passport.authenticate('jwt', { session: false }), editPost);
router.delete('/post', passport.authenticate('jwt', { session: false }), deletePost);

// Get post by id
router.get('/postById', passport.authenticate('jwt', { session: false }), getPostWithId);

module.exports = router;