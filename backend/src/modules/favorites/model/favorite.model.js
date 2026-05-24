const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Favorite = sequelize.define(
  'Favorite',
  {
    follower_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    creator_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    tableName: 'favorites',
    timestamps: true,
    updatedAt: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['follower_id', 'creator_id'],
      },
    ],
  }
);

Favorite.associate = (models) => {
  Favorite.belongsTo(models.User, {
    foreignKey: 'follower_id',
    as: 'follower',
  });

  Favorite.belongsTo(models.User, {
    foreignKey: 'creator_id',
    as: 'creator',
  });
};

module.exports = Favorite;