const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const db = require("../utils/db");
const config = require("../config/default.json");

const passport = require("passport");
const Strategy = require("passport-http").BasicStrategy;

// const router = express.Router();
// router.use(passport.initialize());
app.use(passport.initialize());

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new Strategy(async (email, password, done) => {
    const errorMessage = "Incorrect username or password";

    try {
      const userList = await db.load(`SELECT * FROM customer WHERE customer_email = ${email}`);
      if (userList.length == 0) {
        return done(null, false, { message: errorMessage });
      } else {
        const customerId = userList[0]["customer_id"];
        const customerName = userList[0]["customer_name"];
        const passwordHash = userList[0]["password"];

        let bcryptResult = bcrypt.compareSync(password, passwordHash);
        if (bcryptResult == true) {
          console.log("xxx", { customerId, customerName });
          return done(null, { customerId, customerName });
        } else {
          return done(null, false, { message: errorMessage });
        }
      }
    } catch (err) {
      console.error(err);
      return done(null);
    }

  })
);

let jwtSecretKey = config.jwtSecret;

if (jwtSecretKey == undefined) {
  console.error("Error with secretKey");
}

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

passport.use(
  new JwtStrategy(options, function (jwt_payload, done) {
    return done(null, jwt_payload);
  })
);
