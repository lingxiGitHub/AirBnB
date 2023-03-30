const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get("/", async (req, res, next) => {
    const { keyword } = req.body;
    console.log("keyword?",keyword)

    if (!keyword){
        return res.status(400).send('Please provide a search keyword'); 
    }

    const searchedSpot = await Spot.findAll({
        where:{
            name: {
                [Op.like]: `%${keyword}%`
            }
        }
    })

    if (searchedSpot.length === 0){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,

        })
    }

    res.json(searchedSpot)

})


module.exports = router;