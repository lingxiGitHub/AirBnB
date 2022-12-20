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
        foreignKey: "ownerId"
      })

      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        hooks: true
      })
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        hooks: true
      })

      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        hooks: true
      })
    }
  }
  Spot.init({
    ownerId: DataTypes.STRING,
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
  });
  return Spot;
};