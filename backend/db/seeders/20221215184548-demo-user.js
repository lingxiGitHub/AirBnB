'use strict';

/** @type {import('sequelize-cli').Migration} */


const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: "Ada",
        lastName: "Albert",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: "Ben",
        lastName: "Bernard",
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: "Cici",
        lastName: "Cecilia",
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: "Dee",
        lastName: "Devon",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: "Evelyn",
        lastName: "Ed",
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        firstName: "Fiona",
        lastName: "Fred",
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        firstName: "Gina",
        lastName: "Grey",
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'user7@user.io',
        username: 'FakeUser7',
        firstName: "Helen",
        lastName: "Henry",
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'user8@user.io',
        username: 'FakeUser8',
        firstName: "Jay",
        lastName: "Jolin",
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'user9@user.io',
        username: 'FakeUser9',
        firstName: "Laren",
        lastName: "Lobby",
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'user10@user.io',
        username: 'FakeUser10',
        firstName: "Mandy",
        lastName: "Moore",
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        email: 'user11@user.io',
        username: 'FakeUser11',
        firstName: "Nancy",
        lastName: "Newman",
        hashedPassword: bcrypt.hashSync('password11')
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};