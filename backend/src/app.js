const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const env = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');

// Routes
const authRoute = require('./modules/auth/route/auth.route');
const userRoute = require('./modules/users/route/user.route');
const creatorRoute = require('./modules/creators/route/creator.route');
const followRoute = require('./modules/follows/route/follow.route');
const favoriteRoute = require('./modules/favorites/route/favorite.route');
const postRoute = require('./modules/posts/route/post.route');
const commentRoute = require('./modules/comments/route/comment.route');
const donationRoute = require('./modules/donations/route/donation.route');

const app = express();

// ─── Security & Logging ────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static Uploads ───────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '..', env.upload.dir)));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/creators', creatorRoute);
app.use('/api/follows', followRoute);
app.use('/api/favorites', favoriteRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/donations', donationRoute);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
