var pg = require('pg');
var jsSHA = require("jssha");

require('dotenv').load();

var conString = process.env.DATABASE_URL;

module.exports = {
  findByEmailAddress: function(emailAddress, cb) {
    pg.connect(conString, function(err, client, done) {
      if (err) {
        console.log(err);
        throw(err);
      }
      client.query('SELECT * FROM users WHERE email_address = $1', [emailAddress], function(err, result) {
        done();
        if (err) {
          console.log(err);
          throw(err);
        }

        cb(result.rows[0]);
      });
    });
  },

  createUser: function(user, cb) {
    pg.connect(conString, function(err, client, done) {
      if (err) {
        console.log(err);
        throw(err);
      }

      client.query('INSERT INTO users (email_address, password, created_at, updated_at) VALUES ($1, $2, now(), now()) RETURNING id', [user.emailAddress, user.password], function(err, result) {
        done();
        if (err) {
          console.log(err);
          throw(err);
        }

        user.id = result.rows[0].id;
        cb(user);
      });
    });
  },

  authenticate: function(authEmail, authPassword, cb) {
    pg.connect(conString, function(err, client, done) {
      if (err) {
        console.log(err);
        throw(err);
      }

      client.query('SELECT * FROM users WHERE email_address = $1', [authEmail], function(err, result) {
        var isTrue = false;
        var user = {};

        done();
        if (err) {
          console.log(err);
          throw(err);
        }

         if (result.rows[0]) {
           if  (authPassword == result.rows[0].password) {
             console.log("successfully allow login");
             user.id = result.rows[0].id;
             isTrue = true;
           }
           else {
             console.log('Password does not match');
           }
         }
         else {
           console.log('User with this email does not exist');
         }

         cb(isTrue, user);
      });
    });
  }
}
