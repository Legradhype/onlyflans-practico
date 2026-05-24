const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Donation = sequelize.define(
  'Donation',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
    support_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'FLAN',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 10.00,
    },
  },
  {
    tableName: 'donations',
    timestamps: true,
    updatedAt: false,
    underscored: true,
    hooks: {
      beforeUpdate: () => {
        throw new Error('Las donaciones son inmutables');
      },
      beforeDestroy: () => {
        throw new Error('Las donaciones no se pueden eliminar');
      },
    },
  }
);

Donation.associate = (models) => {
  Donation.belongsTo(models.User, {
    foreignKey: 'follower_id',
    as: 'follower',
  });

  Donation.belongsTo(models.User, {
    foreignKey: 'creator_id',
    as: 'creator',
  });
};

module.exports = Donation;