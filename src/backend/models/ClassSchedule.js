const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect.js');
const Workshop = require('./Workshop.js');

const ClassSchedule = sequelize.define('ClassSchedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  workshop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workshop,
      key: 'id',
    },
  },
  day_of_week: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
 start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  frequency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = ClassSchedule;
