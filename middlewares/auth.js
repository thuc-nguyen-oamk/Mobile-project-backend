const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const db = require("../utils/db");
const config = require("../config/default.json");

const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

// const router = express.Router();
// router.use(passport.initialize());
app.use(passport.initialize());

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Passport strategy for authenticating a customer with email and password
passport.use(
  "basic.customer",
  new BasicStrategy(async (email, password, done) => {
    try {
      const userList = await db.load(`SELECT * FROM customer WHERE customer_email = "${email}"`);
      if (userList.length == 0) {
        return done(null, false);
      } else {
        let bcryptResult = bcrypt.compareSync(password, userList[0].customer_password);
        if (bcryptResult == true) {
          delete userList[0].customer_password;
          return done(null, userList[0]);
        } else {
          return done(null, false);
        }
      }
    } catch (err) {
      console.error(err);
      return done(null);
    }
  })
);

// Passport strategy for authenticating the admin with email and password
passport.use(
  "basic.admin",
  new BasicStrategy(async (email, password, done) => {
    try {
      const userList = await db.load(`SELECT * FROM admin WHERE admin_email = "${email}"`);
      if (userList.length == 0) {
        return done(null, false);
      } else {
        let bcryptResult = bcrypt.compareSync(password, userList[0].admin_password);
        if (bcryptResult == true) {
          delete userList[0].admin_password;
          return done(null, userList[0]);
        } else {
          return done(null, false);
        }
      }
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
);

let jwtSecretKey = config.authenticate.jwtSecret;

if (jwtSecretKey == undefined) {
  console.error("Error with secretKey");
}

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

// Passport strategy for authenticating a customer with json web token
passport.use(
  "jwt",
  new JwtStrategy(options, function (jwt_payload, done) {
    console.log("jwt_payload", jwt_payload);
    return done(null, jwt_payload);
  })
);

// Passport strategy for authenticating the admin with json web token
passport.use(
  "jwt.admin",
  new JwtStrategy(options, function (jwt_payload, done) {
    console.log(jwt_payload)
    if (!jwt_payload.admin_id) {
      console.log('jwt_payload.admin_id is undefined')
      return done(null, false);
    }
    return done(null, jwt_payload);
  })
);

