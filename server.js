const path = require('path');
const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection');
//helpers
const helper = require('./utils/helper');
//express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helper });

//need to include passport

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serve up public files
app.use(express.static(path.join(__dirname, 'public')));
//express-handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(controllers);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});