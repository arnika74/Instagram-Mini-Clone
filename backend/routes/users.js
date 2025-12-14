const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1d' });
        res.json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1d' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Follow
router.put('/follow/:id', auth, async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user);

        if (!userToFollow.followers.includes(req.user)) {
            userToFollow.followers.push(req.user);
            currentUser.following.push(userToFollow._id);
            await userToFollow.save();
            await currentUser.save();
        }
        res.json({ message: 'Followed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Unfollow
router.put('/unfollow/:id', auth, async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user);

        userToUnfollow.followers = userToUnfollow.followers.filter(f => f.toString() !== req.user);
        currentUser.following = currentUser.following.filter(f => f.toString() !== userToUnfollow._id.toString());

        await userToUnfollow.save();
        await currentUser.save();

        res.json({ message: 'Unfollowed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get logged-in user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        const posts = await Post.find({ user: req.user });

        res.json({ user, posts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user profile + posts
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password');

        const posts = await require('../models/Post')
            .find({ user: req.params.id });

        res.json({ user, posts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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
