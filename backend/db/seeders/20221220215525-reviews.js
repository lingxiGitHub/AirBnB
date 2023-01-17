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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 7,
        review: "AMAZING!!! cozy and beautiful. The welcome basket was so thoughtful and personal. We had an amazing relaxing weekend in the treehouse! We will be back!!",
        stars: 5,

      },
      {
        spotId: 1,
        userId: 8,
        review: "Our experience was terrific!! Amber was very responsive and helpful throughout our entire stay. We had a few hiccups the first night but Amber was willing to come to the treehouse and help us so that we could enjoy our time there. ",
        stars: 5,

      },
      {
        spotId: 2,
        userId: 2,
        review: "good place too",
        stars: 5,

      },
      {
        spotId: 3,
        userId: 3,
        review: "good place too",
        stars: 5,

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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2] }
    });
  }
};
