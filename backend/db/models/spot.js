'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "Owner",
      })

      // favorite join table
      // Spot.hasMany(models.User, {
      //   foreignKey: "spotId",
      // })


      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: 'CASCADE',
        hooks: true
      })
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: 'CASCADE',
        hooks: true
      })

      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // userId:DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,

  }, {
    sequelize,
    modelName: 'Spot',
    // defaultScope: {
    //   attributes: { exclude: ["createdAt", "updatedAt"] }
    // }
  });
  return Spot;
};