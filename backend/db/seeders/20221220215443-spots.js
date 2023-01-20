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
        description: "Whippoorwill Retreat is nestled in treetops on Sand Mountain, 20 min. ",
        price: 356,

      },
      {
        ownerId: 2,
        address: '2001 Walnut Street',
        city: "Packwood",
        state: "WA",
        country: "USA",
        lat: 200.01,
        lng: 200.1,
        name: "Cozy River Cabin at Mt. Rainier",
        description: "Our original 1960's A-frame cabin is nestled (a literal stone's-throw) between the Cowlitz River and Coal Creek...",
        price: 249,
      },
      {
        ownerId: 3,
        address: '3001 Walnut Street',
        city: "Oxnard",
        state: "CA",
        country: "USA",
        lat: 300.01,
        lng: 300.1,
        name: "Salt House’s Relaxed Cali Vibe",
        description: "Everything was intentionally chosen to provide a stylish, fun, and comfortable stay.  ",
        price: 550,

      },
      {
        ownerId: 4,
        address: '4001 Walnut Street',
        city: "Cleveland",
        state: "WI",
        country: "USA",
        lat: 400.01,
        lng: 400.1,
        name: "THE CASTLE VINEYARD–Theater, Golf Simulator, Sauna",
        description: "For travelers who want an exclusive taste of Tuscany without the hassle of jetting across an ocean, The Castle Vineyard is the place to stay. ",
        price: 312,

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
