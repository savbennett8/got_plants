// const path = require('path');
const express = require('express');
const controllers = require('./controllers');
// import sequelize connection
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('views'))

// Set Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(controllers);

// sync sequelize models to the database, then turn on the server
// sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
// });

// Routes

