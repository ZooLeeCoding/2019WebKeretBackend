var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login', function(req, res) {
    console.log(req.body);
    passport.authenticate('local', function(error, username){
        if(error) {
            return res.status(403).send(error);
        } else {
            req.logIn(username, function(error) {
                if(error) {
                    return res.status(500).send(
                        {error: "Serialization error" });
                } else {
                    return res.status(200).send(
                        {msg: "Welcome"});
                }
            });
        }
    })(req, res);
});

router.post('/logout', function(req, res) {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send({msg: "logout successful"});
    }
    return res.status(403).send({msg: "log in first"});
    

});

router.get('/proba', function(req, res) {
    if(req.isAuthenticated()) {
        return res.status(200).send({msg: "you are logged in"});
    } else {
        return res.status(403).send({msg: "you have no access"});
    }

})

module.exports = router;