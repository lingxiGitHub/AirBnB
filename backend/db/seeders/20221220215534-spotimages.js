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
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/e1a816a3-2c39-47e4-919d-8880f4eb59c5.jpg?im_w=1200",
        preview: true,

      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/bebfeaef-2661-47cc-b23f-7344e5862d22.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/41502929-a45b-482b-ab3a-212c90a07fae.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/8e4ffe69-8a76-4f8a-a5c7-3a37fb9cfdd9.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/c3601a6b-8680-4a11-b246-4c7f086d6eb2.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/db6253fa-889c-46c7-a624-840c8036048b.jpg?im_w=1200",
        preview: true,

      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-48959048/original/724ecad4-a1eb-4c24-b5cb-5232b4939ff7.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/f84c4884-10cc-41a0-bf85-3f693ea618dd.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-48959048/original/5df411b3-992a-4d23-a93e-e657fc6c113f.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-48959048/original/c948d411-9b03-4a0d-af57-acf547261bf0.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-616473242380750899/original/92dbd162-b07b-4818-b386-9b66edd05717.jpeg?im_w=1200",
        preview: true,

      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-616473242380750899/original/6d0b0014-b580-4e35-a96f-a6df126b862b.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-616473242380750899/original/fda19f29-7342-4473-936a-9f41376b0a15.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-616473242380750899/original/53e0da9e-4dda-41ce-8119-1aea663d346d.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-616473242380750899/original/0564a86f-511e-4e48-aec7-33822f5e5a93.jpeg?im_w=1440",
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
