const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect.js');
const Student = require('./Student.js');
const ClassSchedule = require('./ClassSchedule.js');

const StudentClass = sequelize.define('StudentClass', {
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
  class_schedule_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClassSchedule,
      key: 'id',
    },
  },
});

StudentClass.belongsTo(Student, { foreignKey: 'student_id' });
StudentClass.belongsTo(ClassSchedule, { foreignKey: 'class_schedule_id' });
Student.hasMany(StudentClass, { foreignKey: 'student_id' });
ClassSchedule.hasMany(StudentClass, { foreignKey: 'class_schedule_id' });

module.exports = StudentClass;
