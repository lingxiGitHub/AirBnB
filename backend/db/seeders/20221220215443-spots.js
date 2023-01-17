'use strict';

/** @type {import('sequelize-cli').Migration} */



let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
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
        city: "Trenton",
        state: "Georgia",
        country: "United States",
        lat: 100.01,
        lng: 100.1,
        name: "Whippoorwill Retreat Treehouse",
        description: "Whippoorwill Retreat is nestled in treetops on Sand Mountain, 20 min. from Chattanooga, Tn. A private, romantic two-story getaway with floor to ceiling views, sun/moon rise perch, large outdoor porch w/fireplace, & fire pit for lazy long nights. Enjoy nature with 2 outdoor soaking tubs that includes the Whippoorwill scent bath",
        price: 356,

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
      {
        ownerId: 3,
        address: '3001 Walnut Street',
        city: "LA",
        state: "CA",
        country: "USA",
        lat: 300.01,
        lng: 300.1,
        name: "beachhouse",
        description: "the beachhouse",
        price: 300,

      },


    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2] }
    });
  }
};
