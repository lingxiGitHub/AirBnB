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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/bed11433-68e5-45bb-8ad6-112783ee5297.jpeg?im_w=960",
        preview: true,

      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/7ef593e9-1849-4843-9a0f-41616c5b2d23.jpeg?im_w=1200",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/45fa0467-4aed-4d19-a988-13c6c284fb0d.jpeg?im_w=1200",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/087f3a0c-12cf-4c16-80f1-c42ee6790557.jpeg?im_w=1200",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/5578d82b-99f1-4f7c-a9e5-676c7a232b89.jpeg?im_w=1200",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/628a37a1-2dc3-4379-a755-20a000b0c754.jpeg?im_w=1200",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/674b102c-cc2d-4cd3-90f7-6cb0cbc0abea.jpeg?im_w=1200",
        preview: false,
      },

      {
        spotId: 2,
        url: "www.spot2image.com",
        preview: false,

      },
      {
        spotId: 3,
        url: "www.spot3image.com",
        preview: false,

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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2] }
    });
  }
};
