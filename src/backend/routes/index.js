const express = require('express');
const userRoutes = require('./UserRoutes.js');
const gfRoutes = require('./GfRoutes.js');
const ongRoutes = require('./OngRoutes.js');
const leaderRoutes = require('./LeaderRoutes.js');
const professorRoutes = require('./ProfessorRoutes.js');
const studentRoutes = require('./StudentRoutes.js');
const responsableRoutes = require('./ResponsableRoutes.js');
const workshopRoutes = require('./WorkshopRoutes.js');
const studentClassRoutes = require('./StudentClassRoutes.js');
const studentPresenceClassesRoutes = require('./StudentPresencesClasses.js');
const classInstanceRoutes = require('./ClassInstanceRoutes.js');
const professorClassesRoutes = require('./ProfessorClassesRoutes.js');
const classSchedulesRoutes = require('./ClassesSchedules.js');

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('Index Route :)'));

  app.use(express.json());

  app.use('/api',
    userRoutes,
     gfRoutes,
     ongRoutes,
     leaderRoutes,
     studentRoutes,
     responsableRoutes,
     workshopRoutes,
     studentClassRoutes,
     studentPresenceClassesRoutes,
     classInstanceRoutes,
     professorClassesRoutes,
     classSchedulesRoutes,
     professorRoutes
  );
};

module.exports = routes;
