
const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');


//### Get all Spots
router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage
            }
        ]
    })

    const Spots = [];
    allSpots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach((spot) => {
        spot.SpotImages.forEach(spotImage => {
            // console.log(spotImage.url);
            if (spotImage.url) {
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
        spot.avgRating = count / i;
        delete spot.SpotImages;
        delete spot.Reviews;
    });

    res.json({ Spots });
})

// ### Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res, next) => {
    //current user

    const currentUserId = req.user.id
    // console.log(currentUserId)

    const allSpots = await Spot.findAll(
        {
            where: {
                ownerId: currentUserId
            },
            include: [
                {
                    model: Review,
                },
                {
                    model: SpotImage
                }
            ]
        }
    );

    const Spots = [];
    allSpots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach((spot) => {
        spot.SpotImages.forEach(spotImage => {
            // console.log(spotImage.url);
            if (spotImage.url) {
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
        spot.avgRating = count / i;
        delete spot.SpotImages;
        delete spot.Reviews;
    });

    res.json(Spots)
})


//### Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {


    let spotsId = req.params.spotId;
    spotsId = parseInt(spotsId)

    const allSpots = await Spot.findAll({
        where: {
            id: spotsId
        },
        include: [
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Review,
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
        ]
    })

    const Spots = [];
    allSpots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach((spot) => {
        let i = 0;
        let count = 0;
        spot.Reviews.forEach(review => {
            i++;
            // console.log(review);
            count = count + review.stars;
        })
        spot.avgStarRating = count / i;
        spot.numReviews = i;
        delete spot.Reviews;
    });

    if (allSpots.length !== 0) {
        res.json(Spots)
    } else {
        const err = new Error("Couldn't find a Spot with the specified id");
        err.status = 404;
        err.title = "Spot couldn't be found";
        err.errors = ["Couldn't find a Spot with the specified id"]
        res.status(404)
        res.json(err)
    }




})

// ### Edit a Spot

router.put("/:spotId", requireAuth, async (req, res) => {

    let { spotId } = req.params;
    spotId = parseInt(spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const targetSpot = await Spot.findOne({
        where: {
            id: spotId
        }
    })
    if (targetSpot) {
        targetSpot.update({
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
        res.json(targetSpot)
    } else if (!targetSpot) {
        const err = new Error("edit spot error");
        err.status = 404;
        err.errors = "Spot couldn't be found"
        res.status(404)
        res.json(err)
    } else {
        next(err)//how to hit validation error?
    }

})


//### Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {

    let { spotId } = req.params
    spotId = parseInt(spotId)

    const reviews = await Review.findOne({
        where: {
            spotId
        },
        include: {
            model: User,
            attributes: ["id", "firstName", "lastName"]
        },
        include: {
            model: ReviewImage
        }
    })

    if (reviews) {

        res.json(reviews)
    } else if (!reviews) {
        const err = new Error("Spot couldn't be found");
        err.statusCode = 404;
        err.errors = "Spot couldn't be found"
        res.status(404)
        res.json(err)
    }




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

//### Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
    let { spotId } = req.params;
    spotId = parseInt(spotId)

    const { review, stars } = req.body

    const targetSpot = await Review.findOne({
        where: {
            spotId
        }

    })

    if (targetSpot && !targetSpot.review) {
        //this is edit, not add, need to refactor
        targetSpot.review = review
        targetSpot.stars = stars
        res.status(201)
        res.json(targetSpot)
    } else if (!targetSpot) {
        const err = new Error("Couldn't find a Spot with the specified id");
        err.status = 404;
        err.title = "Spot couldn't be found";
        err.errors = ["Couldn't find a Spot with the specified id"]
        res.status(404)
        res.json(err)
    } else if (targetSpot.review) {
        const err = new Error("User already has a review for this spot");
        err.status = 403;
        err.error = "User already has a review for this spot"
        res.status(403)
        res.json(err)
    }


})

//### Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
    let { spotId } = req.params
    spotId = parseInt(spotId)

    const { startDate, endDate } = req.body

    const theSpot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    // console.log(theSpot)

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start.getTime() < end.getTime()) {

        const newBooking = await Booking.create({
            startDate,//do we need to format the response date here??
            endDate,

        })

        res.json(newBooking) //how do I insert spotId and UserId to it?
    } else if (start.getTime() > end.getTime()) {
        const err = new Error("Validation error");
        err.status = 400;
        err.title = "Validation error"
        err.error = {
            "endDate": "endDate cannot be on or before startDate"
        }
        res.status(400)
        res.json(err)

    } else if (!theSpot) {//this if statement does not work, question asked
        const err = new Error("Spot couldn't be found");
        err.status = 404;

        err.error = "Spot couldn't be found"
        res.status(404)
        res.json(err)
    }



})

//### Get all Bookings for a Spot based on the Spot's id

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
    let { spotId } = req.params
    spotId = parseInt(spotId)


    const bookings = await Booking.findOne({
        where: {
            spotId
        },
        include: [{
            model: User,
            attributes: ["id", "firstName", "lastName"]
        }]
    })

    const restrictedBooking = await Booking.findOne({
        where: {
            spotId
        },
        attributes: ["spotId", "startDate", "endDate"]
    })

    if (!bookings) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        err.error = "Spot couldn't be found"
        res.status(404)
        res.json(err)
    }

    const userId = bookings.userId
    const currentUserId = req.user.id

    // console.log(userId)
    // console.log(currentUserId)


    if (userId == currentUserId) {
        res.json(bookings)
    } else if (userId != currentUserId) {
        res.json(restrictedBooking)
    }

    res.json(bookings)



})



module.exports = router;