const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get("/:keyword", async (req, res, next) => {
    const { keyword } = req.params;
    // console.log("keyword?", keyword)

    if (!keyword) {
        return res.status(400).send('Please provide a search keyword');
    }

    const searchedSpot = await Spot.findAll({
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage
            }
        ],
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${keyword}%` } },
                { city: { [Op.iLike]: `%${keyword}%` } }
            ]
        }
    })

    //********using op.ilike in production mode / render
    //*********using op.like locally

    // console.log("searchedspot backend 1",searchedSpot)
    const Spots = [];
    searchedSpot.forEach(spot => {
        Spots.push(spot.toJSON());
    })

//    console.log("spots backend api 2",Spots)

    Spots.forEach((spot) => {
        // console.log("!!!",spot)
        spot.SpotImages.forEach(spotImage => {
            // console.log("???",spotImage.url);
            if (spotImage.preview && spotImage.url) {
                spot.previewImage = spotImage.url;
            }
        })
        let i = 0;
        let count = 0;
        spot.Reviews.forEach(review => {
            i++;
            // console.log(review);
            count = count + review.stars;
        })
        spot.avgRating = (count / i).toFixed(2);
        if (spot.avgRating === "NaN") {
            spot.avgRating = "New"
        }
        delete spot.SpotImages;
        delete spot.Reviews;
    });

    // if (searchedSpot.length === 0) {
    //     res.status(404)
    //     return res.json({
    //         message: "Spot couldn't be found",
    //         statusCode: 404,

    //     })
    // }

    res.json(Spots)

})


module.exports = router;