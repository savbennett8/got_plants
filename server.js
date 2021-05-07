const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const controllers = require('./controllers');
const flash = require('express-flash');

const passportInit = require('./utils/passport');
passportInit(passport, username => {
    users.find(user => user.username === username)
});

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(flash());
const sess = {
    secret: 'THIS IS A SECRET',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(passport.initialize());
app.use(passport.session(sess));

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serve up public files
app.use(express.static(path.join(__dirname, 'public')));

app.use(controllers);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});