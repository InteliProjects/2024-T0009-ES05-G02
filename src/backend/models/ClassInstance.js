const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect.js');
const ClassSchedule = require('./ClassSchedule.js');

const ClassInstance = sequelize.define('ClassInstances', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  class_schedule_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClassSchedule,
      key: 'id',
    },
  },
  date: DataTypes.DATE,
  status: DataTypes.INTEGER,
  observation: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = ClassInstance;
