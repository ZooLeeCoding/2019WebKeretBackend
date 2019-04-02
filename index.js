var express = require('express');
// npm install express --save
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var cors = require('cors');
/* npm install --save body-parser cookie-parser express-session
      passport passport-local */

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

var users = require('./gyak04_users');

passport.use('local', new LocalStrategy.Strategy(function(
    username, password, done) {
        if(users[username] && users[username] === password) {
            return done(null, username);
        } else {
            return done("Wrong username/pw", null);
        }
    }));

passport.serializeUser(function(username, done) {
    return done(null, username);
});

passport.deserializeUser(function(username, done) {
    return done(null, username);
});

app.use(expressSession({secret: '123456ezegyelrefijheigeihgieajhgijheaighiea'}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(5000, function() {
    console.log('app is listening');
});

// node index.js