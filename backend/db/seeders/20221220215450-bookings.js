'use strict';

/** @type {import('sequelize-cli').Migration} */



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
    */options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 9,
        startDate: new Date("2022-01-02"),
        endDate: new Date("2022-01-03"),
       
      },

      {
        spotId: 3,
        userId: 1,
        startDate: new Date("2030-01-02"),
        endDate: new Date("2030-01-03"),

      },
      {
        spotId: 2,
        userId: 8,
        startDate: new Date("2022-02-02"),
        endDate: new Date("2022-02-03"),

      },
      {
        spotId: 3,
        userId: 7,
        startDate: new Date("2022-03-02"),
        endDate: new Date("2022-03-03"),

      },

      {
        spotId: 4,
        userId: 6,
        startDate: new Date("2022-03-02"),
        endDate: new Date("2022-03-03"),

      },

      {
        spotId: 5,
        userId: 1,
        startDate: new Date("2020-03-02"),
        endDate: new Date("2020-03-03"),

      },

      {
        spotId: 6,
        userId: 4,
        startDate: new Date("2022-03-02"),
        endDate: new Date("2022-03-03"),

      },

      {
        spotId: 7,
        userId: 3,
        startDate: new Date("2022-03-02"),
        endDate: new Date("2022-03-03"),

      },

      {
        spotId: 8,
        userId: 2,
        startDate: new Date("2022-03-02"),
        endDate: new Date("2022-03-03"),

      },

      {
        spotId: 9,
        userId: 1,
        startDate: new Date("2022-03-02"),
        endDate: new Date("2022-03-03"),

      },

      {
        spotId: 10,
        userId: 9,
        startDate: new Date("2022-03-02"),
        endDate: new Date("2022-03-03"),

      },
      {
        spotId: 11,
        userId: 8,
        startDate: new Date("2022-10-02"),
        endDate: new Date("2022-10-03"),

      },
      {
        spotId: 12,
        userId: 7,
        startDate: new Date("2022-10-02"),
        endDate: new Date("2022-10-03"),

      },

      {
        spotId: 13,
        userId: 6,
        startDate: new Date("2022-10-02"),
        endDate: new Date("2022-10-03"),

      },

      {
        spotId: 14,
        userId: 5,
        startDate: new Date("2022-10-02"),
        endDate: new Date("2022-10-03"),

      },

      {
        spotId: 15,
        userId: 4,
        startDate: new Date("2022-10-02"),
        endDate: new Date("2022-10-03"),

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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2] }
    });
  }
};
