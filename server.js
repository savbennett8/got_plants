const path = require('path');
const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection');
//helpers
const helpers = require('./utils/helpers');
//express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
//express-sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'THIS IS A SECRET',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

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