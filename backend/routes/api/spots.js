
const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



router.get("/", async (req, res, next) => {
    //current user
    // const { credential, password } = req.body;

    // const user = await User.login({ credential, password });


    const spots = await Spot.findAll(
        // {
        //     where: {
        //         id: user.id
        //     }
        // }
    );
    // const avgRating=await Review.AVG("stars")
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

//### Create a Spot
router.post("/", requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.json(newSpot)
})


//### Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {


    let spotId = req.params.spotId
    spotId = parseInt(spotId)

    const theSpot = await SpotImage.findOne({
        where: {
            spotId
        },
        attributes: { exclude: ["createdAt", "updatedAt",] }
    })


    //find owner id
    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    const ownerId = spot.ownerId

    // console.log(theSpot)
    // console.log(req.user.id)//current user id -3
    // console.log(ownerId)//3
    // console.log(spotId)//3

    if (ownerId == req.user.id) {

        //update url and preview
        theSpot.url = req.body.url;
        theSpot.preview = req.body.preview
        res.json(theSpot)

    }

})



module.exports = router;