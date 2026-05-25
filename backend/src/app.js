const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const env = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');

const authRoute = require('./modules/auth/route/auth.route');
const userRoute = require('./modules/users/route/user.route');
const creatorRoute = require('./modules/creators/route/creator.route');
const followRoute = require('./modules/follows/route/follow.route');
const favoriteRoute = require('./modules/favorites/route/favorite.route');
const postRoute = require('./modules/posts/route/post.route');
const commentRoute = require('./modules/comments/route/comment.route');
const donationRoute = require('./modules/donations/route/donation.route');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, '..', env.upload.dir)));


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/creators', creatorRoute);
app.use('/api/follows', followRoute);
app.use('/api/favorites', favoriteRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/donations', donationRoute);

app.get('/health', (req, res) => res.json({ status: 'ok' }));


app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});


app.use(errorHandler);

module.exports = app;
