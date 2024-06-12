const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect.js');
const Ong = require('./Ong.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('gf', 'leader', 'professor'),
    allowNull: false,
  },
  ong_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ong,
      key: 'id',
    },
  },
});

User.belongsTo(Ong, { foreignKey: 'ong_id' });

module.exports = User;
