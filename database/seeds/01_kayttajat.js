const testPassword = "salasana"

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hashedpassword = bcrypt.hashSync(testPassword, salt);


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('kayttajat').del()
    .then(function () {
      // Inserts seed entries
      return knex('kayttajat').insert([
        {id: 1, nimi: 'Testaaja', salasana: hashedpassword, rooli: "admin"}
      ]);
    });
};