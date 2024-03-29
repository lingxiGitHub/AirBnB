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
      {
        ownerId: 5,
        address: '123 Main St',
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 500.01,
        lng: 500.1,
        name: "Luxury Flatiron Condo in New York",
        description: "Magnificent Manhattan skyline views from the Condo from all directions 24 hours of the day.  ",
        price: 5135,

      },
      {
        ownerId: 6,
        address: '456 Elm St',
        city: "Boston",
        state: "MA",
        country: "USA",
        lat: 600.01,
        lng: 600.1,
        name: "North End Family Villa",
        description: "Unique single family 3 bedroom home in the heart of Boston's North End.   ",
        price: 5033,

      },

      {
        ownerId: 7,
        address: '789 Sunset Blvd',
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 700.01,
        lng: 700.1,
        name: "Gorgeous Oceanfront Condo",
        description: "Located along the picturesque cliffs of Solana Beach is this modern, sun-filled condo with endless ocean views from its floor to ceiling windows.  ",
        price: 3476,

      },

      {
        ownerId: 8,
        address: '321 Ocean View Dr',
        city: "Half Moon Bay",
        state: "CA",
        country: "USA",
        lat: 800.01,
        lng: 800.1,
        name: "A little piece of heaven",
        description: "Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect.",
        price: 2033,

      },

      {
        ownerId: 9,
        address: '654 Main St',
        city: "San Diego",
        state: "CA",
        country: "USA",
        lat: 900.01,
        lng: 900.1,
        name: "Cape Cod-Style Home near Bird Rock",
        description: "The entire house is very light, airy and spacious. There is a living room, a family room and plenty of outdoor furniture and fire pit to spread out and feel at home.",
        price: 1099,

      },
      {
        ownerId: 10,
        address: '123 Desert Road',
        city: "Joshua Tree",
        state: "CA",
        country: "USA",
        lat: 900.01,
        lng: 900.1,
        name: "Zebra Shadow, Joshua Tree",
        description: "Zebra Shadow  is an idyllic setting for your desert experience.  Indoor & outdoor living, breathtaking views from each room, and objects curated to reflect the natural landscape.",
        price: 219,

      },

      {
        ownerId: 11,
        address: '456 Pine Street',
        city: "Seattle",
        state: "WA",
        country: "USA",
        lat: 900.01,
        lng: 900.1,
        name: "The Granary, Rustic Modern Barn Conversion",
        description: "The house is Grade II listed building, dated around 1600. It has full of character, with beautiful garden. ",
        price: 118,

      },

      {
        ownerId: 1,
        address: '789 Oceanview Drive',
        city: "Moss Beach",
        state: "CA",
        country: "USA",
        lat: 900.01,
        lng: 900.1,
        name: "Oceanfront Coastal Home w Breathtaking Views",
        description: "Come discover this nature-filled private coastal getaway, peaceful retreat, or an ocean front home base from which to explore the coast.",
        price: 461,

      },
      {
        ownerId: 3,
        address: '321 Vineyard Lane',
        city: "Napa",
        state: "CA",
        country: "USA",
        lat: 900.01,
        lng: 900.1,
        name: "Private Bedroom (the Peacock) on Secluded Vineyard",
        description: "Contemporary farmhouse chic - the Peacock Room is an airy and bright getaway. Enjoy your own private bedroom with a private entryway and parking as well as a stunning bathroom. Self- check in.",
        price: 205,

      },

      {
        ownerId: 4,
        address: '456 Desert Bloom Avenue',
        city: "Joshua Tree",
        state: "CA",
        country: "USA",
        lat: 900.01,
        lng: 900.1,
        name: "Guard Tower Suite #1 with Pool",
        description: "The ULTIMATE GLAMPING experience!  Featured on HGTV: The Castle House Estate brings Tiny Home living to another level, located in the heart of Joshua Tree and minutes from the National Park.",
        price: 245,

      },

      {
        ownerId: 5,
        address: '789 Desert Bloom Avenue',
        city: "El Dorado Hills",
        state: "CA",
        country: "USA",
        lat: 900.01,
        lng: 900.1,
        name: "House In The Clouds!",
        description: "Welcome to the “House in the Clouds”. This 2,060sf Sicilian Villa home set on 10 acres is beautiful and private. This house has an incredible view of Folsom Lake & the American River.",
        price: 333,

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
