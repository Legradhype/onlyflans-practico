const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    creator_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    text_content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'posts',
    timestamps: true,
    paranoid: true,
    underscored: true,
    validate: {
      hasContent() {
        if (!this.text_content && !this.image_url) {
          throw new Error('Posteaje debe tener texto o imagen');
        }
      },
    },
  }
);

module.exports = Post;
