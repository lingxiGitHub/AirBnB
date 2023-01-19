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
        city: "Packwood",
        state: "WA",
        country: "USA",
        lat: 200.01,
        lng: 200.1,
        name: "Cozy River Cabin at Mt. Rainier",
        description: "Our original 1960's A-frame cabin is nestled (a literal stone's-throw) between the Cowlitz River and Coal Creek...surrounded by unobstructed river and mountain views within beautiful National Forest. The feeling of being here can only be understood by experiencing it!",
        price: 302,

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
        description: "Everything was intentionally chosen to provide a stylish, fun, and comfortable stay; the rooftop deck offers the perfect spot to enjoy an afternoon cocktail or morning coffee. Both Hollywood beach & the harbor are steps away — for surfing, SUPing, or kayaking - this location is perfect! This small beach town has much to offer, but you’ll be tempted to just stay in and cozy up on the comfy sofas, play ping-pong, or ride our bikes. ",
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
        description: "For travelers who want an exclusive taste of Tuscany without the hassle of jetting across an ocean, The Castle Vineyard is the place to stay. The dramatic, spellbinding stone castle proudly overlooks over twenty acres of idyllic rolling hills and a gorgeous, working vineyard. Once inside, the interior does nothing to dispel the magic.",
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
