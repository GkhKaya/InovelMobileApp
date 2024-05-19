const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const rolesRouter = require('./routes/roles');
app.use('/roles', rolesRouter);
app.use(bodyParser.json());

const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter);

const eventCategoriesRouter = require('./routes/eventcategories');
app.use('/eventcategories', eventCategoriesRouter);

const departmentsRouter = require('./routes/departments');
app.use('/departments', departmentsRouter);

const announcementsRouter = require('./routes/announcements');
app.use('/announcements', announcementsRouter);

const membersRouter = require('./routes/members');
app.use('/members', membersRouter);

const clubMembersRouter = require('./routes/clubMembers');
app.use('/clubmembers', clubMembersRouter);

const contentsRouter = require('./routes/contents');
app.use('/contents', contentsRouter);

const contentCategoriesRouter = require('./routes/contentCategories');
app.use('/contentcategories', contentCategoriesRouter);


module.exports = app;