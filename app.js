require('dotenv').config();

const express = require('express');
const app = express();
const test = require('./controllers/testcontroller');
const user = require('./controllers/usercontroller');
const authTest = require('./controllers/authtestcontroller')
const trail = require('./controllers/trailcontroller');

const sequelize = require('./db');

sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'))


// EXPOSED ROUTES //
app.use('/test', test); // Leads to our test Routes
app.use('/user', user); // Leads to our user Routes

// PROTECTED ROUTES, REQUIRE AUTHORIZATION //

app.use(require('./middleware/validateSession'));
app.use('/authtest', authTest);
app.use('/trail', trail);



app.listen(3000, () => console.log('Listening on port 3000'))