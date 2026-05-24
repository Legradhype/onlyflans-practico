const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const CreatorProfile = sequelize.define(
  'CreatorProfile',
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    profile_picture_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banner_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'creator_profiles',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at',
    underscored: true,
  }
);

module.exports = CreatorProfile;
