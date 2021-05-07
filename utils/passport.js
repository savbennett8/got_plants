const LocalStrat = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function Init(passport, getUsername) {
        const auth = (username, password, done) => {
        const user = getUsername(username)
        if(!user) {
            return done(null, false, { message: 'No user with this email' })
        }
        try {
            if (await bcrypt.compare('password', user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password does not match'});
            }
        } catch {
            return done(err);
        }
    }

    passport.use(new LocalStrat({ usernameField: 'username' }), auth);
    passport.serialize((user, done) => { });
    passport.deserialize((user, done) => { });
};

module.exports = Init;