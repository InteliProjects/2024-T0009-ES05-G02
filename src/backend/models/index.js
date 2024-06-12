const User = require('./User.js');
const Responsable = require('./Responsable.js');
const Professor = require('./Professor.js');
const Student = require('./Student.js');
const Workshop = require('./Workshop.js');
const GF = require('./Gf.js');
const Ong = require('./Ong.js');
const Leader = require('./Leader.js');
const StudentClass = require('./StudentClasses.js');
const ClassSchedule = require('./ClassSchedule.js');
const ClassInstance = require('./ClassInstance.js');
const ProfessorsClasses = require('./ProfessorClasses.js');
const StudentsPresencesClasses = require('./StudentsPresencesClasses.js');

StudentClass.belongsTo(Student, { foreignKey: 'student_id' });
StudentClass.belongsTo(ClassSchedule, { foreignKey: 'class_schedule_id' });

Student.hasMany(StudentClass, { foreignKey: 'student_id' });
ClassSchedule.hasMany(StudentClass, { foreignKey: 'class_schedule_id' });

ClassSchedule.belongsTo(StudentClass, { foreignKey: 'student_class_id' });
StudentClass.hasMany(ClassSchedule, { foreignKey: 'student_class_id' });

User.belongsTo(Ong, { foreignKey: 'ong_id' });
Ong.hasMany(User, { foreignKey: 'ong_id' });

ProfessorsClasses.belongsTo(Professor, { foreignKey: 'professor_id' });
Professor.hasMany(ProfessorsClasses, { foreignKey: 'professor_id' });

module.exports = {
  User,
  Responsable,
  Professor,
  Student,
  Workshop,
  GF,
  Ong,
  Leader,
  StudentClass,
  ClassSchedule,
  ClassInstance,
  ProfessorsClasses,
  StudentsPresencesClasses,
};
