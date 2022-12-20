'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1001 Walnut Street',
        city:"Philadelphia",
        state:"PA",
        country:"USA",
        lat:100.01,
        lng:100.1,
        name:"treehouse",
        description:"the treehouse",
        price:100,

      },
      {
        ownerId: 2,
        address: '2001 Walnut Street',
        city: "LA",
        state: "CA",
        country: "USA",
        lat: 200.01,
        lng: 200.1,
        name: "beachhouse",
        description: "the beachhouse",
        price: 200,

      },
     
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2] }
    }, {});
  }
};
