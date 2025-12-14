const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create Post
router.post('/', auth, async (req, res) => {
    try {
        const { image, caption } = req.body;
        const post = await Post.create({ user: req.user, image, caption });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Like Post
router.put('/like/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user)) post.likes.push(req.user);
    await post.save();
    res.json(post);
});

// Unlike Post
router.put('/unlike/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.likes = post.likes.filter(u => u.toString() !== req.user);
    await post.save();
    res.json(post);
});

// Comment
router.post('/comment/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user, text: req.body.text });
    await post.save();
    res.json(post);
});

// Feed
router.get('/feed', auth, async (req, res) => {
    const user = await User.findById(req.user);
    const posts = await Post.find({ user: { $in: user.following } }).populate('user', 'username').populate('comments.user', 'username').sort({ createdAt: -1 });
    res.json(posts);
});

// Get single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('user', 'username')
            .populate('comments.user', 'username');

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
