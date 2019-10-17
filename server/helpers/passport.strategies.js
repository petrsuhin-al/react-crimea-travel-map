import passport from "passport";
import servicesConfig from "../helpers/services-config";
const FacebookStrategy = require('passport-facebook').Strategy;
import userControllers from '../controllers/user.controllers';

passport.use(new FacebookStrategy({
        clientID: servicesConfig.facebook.clientID,
        clientSecret: servicesConfig.facebook.clientSecret,
        callbackURL: servicesConfig.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email', "profileUrl", "gender", 'birthday', "location"],
        // profileFields: ['id', 'email', 'user_gender', 'user_link', 'user_location', 'name', 'user_birthday'],
        //enableProof: true
        // passReqToCallback : true,
    }, userControllers.authUserWithFB
));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));