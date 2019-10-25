require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

const user = require('./controllers/usercontroller');
const trail = require('./controllers/trailcontroller');
const toVisit = require('./controllers/tovisitcontroller');
const userTrails = require('./controllers/usertrailcontroller');


sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'))


// EXPOSED ROUTES //
app.use('/user', user); // Leads to our user Routes
app.use('/trail', trail);

// PROTECTED ROUTES, REQUIRE AUTHORIZATION //

app.use(require('./middleware/validateSession'));
app.use('/visit', toVisit);
app.use('/usertrails', userTrails);



app.listen(3000, () => console.log('Listening on port 3000'))