const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect.js');
const Student = require('./Student.js');
const ClassInstance = require('./ClassInstance.js');

const StudentsPresencesClasses = sequelize.define('StudentsPresencesClasses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id',
    },
  },
  class_instance_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClassInstance,
      key: 'id',
    },
  },
});

module.exports = StudentsPresencesClasses;
