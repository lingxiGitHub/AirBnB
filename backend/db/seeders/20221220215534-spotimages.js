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


      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/5d9d1543-8210-4f36-bf1c-848ffc9982d9.jpg?im_w=1200",
        preview: true,

      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/819688ff-11ea-4c25-91c0-585c0d886a9c.jpg?im_w=1200",
        preview: false,

      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/fe4d4cc3-79ca-4ba8-8864-e6e25295700f.jpg?im_w=1200",
        preview: false,

      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/257e512c-aad3-4245-9175-68f0071d44ff.jpg?im_w=1200",
        preview: false,

      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/38618410-b07a-43e8-afff-0ebae906295b.jpg?im_w=1200",
        preview: false,

      },

      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53702666/original/4871918b-b32f-4706-8c0c-66062cc5dd8a.jpeg?im_w=960",
        preview: true,

      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53702666/original/4928d877-fe8b-4e5d-85f6-229247ca3bec.jpeg?im_w=1200",
        preview: false,

      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53702666/original/702a7435-f31b-4750-8316-44fef64cff9d.jpeg?im_w=1200",
        preview: false,

      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53702666/original/fe1fa817-b89b-4553-bc94-afd70ff7a5c0.jpeg?im_w=1200",
        preview: false,

      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53702666/original/efb54df0-fbc2-42e4-bbe2-fe94dec75f4c.jpeg?im_w=1200",
        preview: false,

      },

      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-618663319397545338/original/e91c486d-8397-45cf-b3c9-9ea6481f1e09.jpeg?im_w=960",
        preview: true,

      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-618663319397545338/original/f7b72807-aa36-4887-b9b0-34e92e61f405.jpeg?im_w=1200",
        preview: false,

      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-618663319397545338/original/bb1d79c4-b8de-45b9-b47a-cea2811b499e.jpeg?im_w=1200",
        preview: false,

      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-618663319397545338/original/fc166a42-c18c-46c9-9128-860ad91df460.jpeg?im_w=1200",
        preview: false,

      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-618663319397545338/original/f98e75c9-f84a-46d5-a5cd-8047234a7e14.jpeg?im_w=1200",
        preview: false,

      },

      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/92534e36-d67a-4346-b3cf-7371b1985aca.jpg?im_w=960",
        preview: true,

      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/a47228ef-e1f8-4c44-b98d-104972d533a0.jpg?im_w=1200",
        preview: false,

      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-38819319/original/a888a20a-d3f9-4cce-bdb5-31c0235f4198.jpeg?im_w=1200",
        preview: false,

      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-38819319/original/c4627122-de72-492c-bb51-cf067bd236b4.jpeg?im_w=1200",
        preview: false,

      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/51d4e45c-ab30-4214-83a8-e2e4ffec7a46.jpg?im_w=1200",
        preview: false,

      },


      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/44d07c19-a2f5-41a0-bfaf-50f9877b586f.jpg?im_w=1200",
        preview: true,

      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/4f00aa6f-64e7-4fc7-abf5-2bebca147a9e.jpg?im_w=1200",
        preview: false,

      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/61f203e5-fb79-4220-bf98-2be7aeb5b7d4.jpg?im_w=1200",
        preview: false,

      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/969d4f95-0b4b-4ded-bfcc-f5130b7700a3.jpg?im_w=1200",
        preview: false,

      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/2f46e2e3-99b9-409f-b9cc-7c73b6f0c1b7.jpg?im_w=1200",
        preview: false,

      },

      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/01f12e45-69c5-4dad-b160-a9770a26a8c8.jpg?im_w=1200",
        preview: true,

      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-29338836/original/208fd39c-971b-4351-bcd1-5410970afe3c.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/9f927ae2-0c52-4321-bb3d-223252135b72.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/cfb5d1cb-cb3a-4b9a-b40f-bf9538181c47.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/43f5a567-547f-4427-a9cf-15161570269b.jpg?im_w=1440",
        preview: false,

      },

      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-23206143/original/e7da1f36-922f-4631-a287-91ceda05970f.jpeg?im_w=1200",
        preview: true,

      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-23206143/original/e80ace7e-c494-49b9-9595-08ab76ef4365.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-23206143/original/9c6444f8-69f2-47d0-9796-6cf039bcd593.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/cdf6b2b5-a526-4a99-a5b1-e0f272ac41d7.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/d3543076-0a9b-4836-aff9-afd46b112d9f.jpg?im_w=1440",
        preview: false,

      },

      {
        spotId: 12,
        url: "https://images.unsplash.com/photo-1767567467844-ce73778da9ac?w=1200",
        preview: true,

      },
      {
        spotId: 12,
        url: "https://images.unsplash.com/photo-1654559595621-27e662e1bf3c?w=1200",
        preview: false,

      },
      {
        spotId: 12,
        url: "https://images.unsplash.com/photo-1678691372118-87387a1a73ab?w=1200",
        preview: false,

      },
      {
        spotId: 12,
        url: "https://images.unsplash.com/photo-1630617907445-4bcf7012d8a9?w=1200",
        preview: false,

      },
      {
        spotId: 12,
        url: "https://images.unsplash.com/photo-1721369483526-62f48a00b949?w=1200",
        preview: false,

      },

      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39873771/original/655cd3c8-e5b0-47dc-89d4-53cb815f9ac5.jpeg?im_w=1200",
        preview: true,

      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39873771/original/61ec3298-dc93-49ff-a857-72db715f34ea.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/02b49059-3cf8-4385-b53a-042f424e42f8.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/9c106753-544b-4a91-b3b5-efe47cfa1070.jpg?im_w=1440",
        preview: false,

      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/3764bda9-4ce5-4fdc-81be-ac7f5f683aa3.jpg?im_w=1440",
        preview: false,

      },

      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51234810/original/5231025a-4c39-4a96-ac9c-b088fceb5531.jpeg?im_w=1200",
        preview: true,

      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51234810/original/782b2391-dbc3-4f00-a3af-34f16300ac24.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51234810/original/289abd63-7c19-459c-8bbf-736da1f89ab6.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51234810/original/73c09ac8-ee67-49a0-af61-79c420c02abc.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51234810/original/720ff764-4133-4f6a-be59-ea3ecbd24f35.jpeg?im_w=1440",
        preview: false,

      },

      {
        spotId: 15,
        url: "https://images.unsplash.com/photo-1683889643940-188a1d8d8176?w=1200",
        preview: true,

      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-845746412116984685/original/dc3a2dbe-f7ec-4df3-bb77-aef66b06cc69.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-845746412116984685/original/69dd1628-327f-4da7-9ba9-3dba4c582d7b.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-845746412116984685/original/8e80368a-6b0e-44f6-b4db-4b6c370e9b50.jpeg?im_w=1440",
        preview: false,

      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-845746412116984685/original/00f3e031-1b00-4632-89b6-175250bf3243.jpeg?im_w=1440",
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
