const sequelize = require('../config/database');

// Import all models
const User = require('../modules/users/model/user.model');
const CreatorProfile = require('../modules/creators/model/creatorProfile.model');
const CreatorGoal = require('../modules/creators/model/creatorGoal.model');
const Follow = require('../modules/follows/model/follow.model');
const Favorite = require('../modules/favorites/model/favorite.model');
const Post = require('../modules/posts/model/post.model');
const Comment = require('../modules/comments/model/comment.model');
const Donation = require('../modules/donations/model/donation.model');

// ─── Associations ──────────────────────────────────────────────────────────────

// User ↔ CreatorProfile (1:1)
User.hasOne(CreatorProfile, { foreignKey: 'user_id', as: 'creatorProfile' });
CreatorProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// User → CreatorGoal (1:M)
User.hasMany(CreatorGoal, { foreignKey: 'creator_id', as: 'goals' });
CreatorGoal.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });

// User → Post (1:M)
User.hasMany(Post, { foreignKey: 'creator_id', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });

// User → Comment (1:M)
User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

// Post → Comment (1:M)
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });

// Follow: User (follower) ↔ User (creator)
User.belongsToMany(User, {
  through: Follow,
  as: 'following',
  foreignKey: 'follower_id',
  otherKey: 'creator_id',
});
User.belongsToMany(User, {
  through: Follow,
  as: 'followers',
  foreignKey: 'creator_id',
  otherKey: 'follower_id',
});

// Favorite: User (follower) ↔ User (creator)
User.belongsToMany(User, {
  through: Favorite,
  as: 'favoritedCreators',
  foreignKey: 'follower_id',
  otherKey: 'creator_id',
});
User.belongsToMany(User, {
  through: Favorite,
  as: 'favoritedBy',
  foreignKey: 'creator_id',
  otherKey: 'follower_id',
});
Favorite.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'creator',
});

Favorite.belongsTo(User, {
  foreignKey: 'follower_id',
  as: 'follower',
});

User.hasMany(Favorite, {
  foreignKey: 'creator_id',
  as: 'favoritesReceived',
});

User.hasMany(Favorite, {
  foreignKey: 'follower_id',
  as: 'favoritesMade',
});

// Donation: User (follower) → User (creator)
User.hasMany(Donation, { foreignKey: 'follower_id', as: 'donationsMade' });
User.hasMany(Donation, { foreignKey: 'creator_id', as: 'donationsReceived' });
Donation.belongsTo(User, { foreignKey: 'follower_id', as: 'follower' });
Donation.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });

module.exports = {
  sequelize,
  User,
  CreatorProfile,
  CreatorGoal,
  Follow,
  Favorite,
  Post,
  Comment,
  Donation,
};
