const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Follow = sequelize.define(
  'Follow',
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
    tableName: 'follows',
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

Follow.associate = (models) => {
  Follow.belongsTo(models.User, {
    foreignKey: 'follower_id',
    as: 'follower',
  });

  Follow.belongsTo(models.User, {
    foreignKey: 'creator_id',
    as: 'creator',
  });
};

module.exports = Follow;