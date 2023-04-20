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
        review: "Our experience was terrific!! Amber was very responsive and helpful throughout our entire stay.",
        stars: 4.5,

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
      {
        spotId: 5,
        userId: 11,
        review: "Cannot thank Danny enough for accommodating my family last minute.We had a really rough day 1 upon landing in NYC but this listing saved us! ",
        stars: 4.8,

      },
      {
        spotId: 5,
        userId: 12,
        review: "We loved the location and the apartment was as expected.",
        stars: 4.6,

      },
      {
        spotId: 6,
        userId: 11,
        review: "Great hosts, and overall great experience! ",
        stars: 4.7,

      },
      {
        spotId: 6,
        userId: 12,
        review: "Great location, and easy communication with hosts. Cute home, was the perfect North End getaway for our family.",
        stars: 4.7,

      },

      {
        spotId: 7,
        userId: 11,
        review: "A lovely place, the view, the accommodations and the area are worth every penny!  ",
        stars: 4.8,

      },
      {
        spotId: 7,
        userId: 12,
        review: "Nice location with great view.",
        stars: 4.8,

      },

      {
        spotId: 8,
        userId: 11,
        review: "Mirela's place is gorgeous and the location, right on the beach, is incredible.  ",
        stars: 4.9,

      },
      {
        spotId: 8,
        userId: 12,
        review: "Beautiful location!!! The house is super welcoming and comfortable and is the perfect getaway with fantastic views! ",
        stars: 4.9,

      },

      {
        spotId: 9,
        userId: 1,
        review: "Amazing stay!!!",
        stars: 5.0,

      },
      {
        spotId: 9,
        userId: 2,
        review: "Wonderful stay and lovely home!",
        stars: 4.9,

      },

      {
        spotId: 10,
        userId: 1,
        review: "Everything was great.",
        stars: 5.0,

      },
      {
        spotId: 10,
        userId: 2,
        review: "Great place, loved it!",
        stars: 4.9,

      },
      {
        spotId: 11,
        userId: 1,
        review: "We had a really lovely weekend away here. We were looked after really well.",
        stars: 5.0,

      },
      {
        spotId: 11,
        userId: 2,
        review: "Beautiful little find on Air BnB! ",
        stars: 4.9,

      },

      {
        spotId: 12,
        userId: 3,
        review: "This place has incredible ocean views all over the house. It was exactly as advertised.",
        stars: 5.0,

      },
      {
        spotId: 12,
        userId: 4,
        review: "Amazing views, host and just overall. The location was great.",
        stars: 4.9,

      },

      {
        spotId: 13,
        userId: 3,
        review: "Great place! Communication was easy and joe was very responsive.",
        stars: 4.7,

      },
      {
        spotId: 13,
        userId: 4,
        review: "Had a really lovely stay in the peacock room! It was close to the wineries I was tasting at during the day and the recommendation for dinner was perfect.",
        stars: 4.8,

      },

      {
        spotId: 14,
        userId: 3,
        review: "We took 2 nights here at guard tower. My son was so excited to be here since the Guard Tower looks like a building in Star Wars.",
        stars: 4.7,

      },
      {
        spotId: 14,
        userId: 4,
        review: "Unique experience with picturesque surroundings.",
        stars: 4.8,

      },

      {
        spotId: 15,
        userId: 5,
        review: "The host was extremely friendly and the housing was just amazing. ",
        stars: 4.9,

      },
      {
        spotId: 15,
        userId: 6,
        review: "My family had a wonderful relaxing get away at the House in the clouds.",
        stars: 4.8,

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
