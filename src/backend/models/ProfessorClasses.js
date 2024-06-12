const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect.js');
const Professor = require('./Professor.js');
const ClassInstance = require('./ClassInstance.js');

const ProfessorsClasses = sequelize.define('ProfessorsClasses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  professor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Professor,
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

ProfessorsClasses.belongsTo(Professor, { foreignKey: 'professor_id' });
Professor.hasMany(ProfessorsClasses, { foreignKey: 'professor_id' });

module.exports = ProfessorsClasses;
