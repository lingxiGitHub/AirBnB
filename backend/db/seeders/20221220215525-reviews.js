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
        userId: 5,
        review: "10/10 will recommend to friends!! The location was PERFECT! It was so cozy and cute! A-frame was an A++++++!!!!!",
        stars: 4.7,

      },
      {
        spotId: 2,
        userId: 6,
        review: "Beautiful cabin and great views across the river from the campfire. Would stay again in a heartbeat.",
        stars: 4.5,

      },
      {
        spotId: 3,
        userId: 9,
        review: "Lovely house, amazing location, and the host was great - super communicative and helpful. I'd definitely stay again!",
        stars: 4.9,

      },
      {
        spotId: 3,
        userId: 10,
        review: "Great location and beautiful home. The space is curated so well and provided a comfortable and pretty backdrop for my son's first birthday.",
        stars: 4.8,

      },
      {
        spotId: 4,
        userId: 11,
        review: "Great stay. Responsive and helpful host. Highly recommend!",
        stars: 4.8,

      },
      {
        spotId: 4,
        userId: 12,
        review: "If we could give ten stars we would! This will undoubtedly be one of the highlights of our year.",
        stars: 4.9,

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
