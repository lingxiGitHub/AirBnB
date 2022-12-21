
const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get("/spots", async (res, req, next) => {
    const spots = await Spot.findAll()
    res.json(spots)
})


router.get("/:spotId", async (req, res, next) => {


    let spotsId = req.params.spotId;
    spotsId = parseInt(spotsId)

    const spots = await Spot.findAll({
        where: {
            id: spotsId
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Review,//need to get rid of Review:[{}], question asked
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
                    [sequelize.fn("COUNT", sequelize.col("Reviews.review")), "numReviews"]
                ]
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            }
        ]

    })

    if (!spots) {
        const err = new Error("Couldn't find a Spot with the specified id");
        err.status = 404;
        err.title = "Spot couldn't be found";
        err.errors = ["Couldn't find a Spot with the specified id"]
    }
    res.json(spots)


})


router.get("/:spotId/reviews", async (req, res) => {
    const { spotsId } = req.params

    console.log("testing")

    if (spotsId) {
        const reviews = await Review.findAll({
            where: {
                id: spotsId
            },
            include: {
                model: User
            },
            include: {
                model: ReviewImage
            }
        })

        res.json(reviews)
    }
    //else {
    //     res.status(404)
    //     error.message = "Spot couldn't be found"
    // }

})



module.exports = router;