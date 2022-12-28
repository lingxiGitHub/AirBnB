
const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required.'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required.'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required.'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is required.'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is required.'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required.'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required.'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required.'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
]


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

router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {

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
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
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

    const { url, preview } = req.body

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    //could not find the spot
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        err.error = "Spot couldn't be found"
        res.status(404)
        res.json(err)
    }

    //find owner id
    const ownerId = spot.ownerId

    if (ownerId !== req.user.id) {
        const err = new Error("You don't have authorization");
        err.status = 401;
        err.error = "You don't have authorization"
        res.status(401)
        res.json(err)
    }

    if (ownerId == req.user.id && spot) {//only the owner can create image

        //update url and preview
        const newImage = await SpotImage.create({
            url,
            preview,
            spotId

        })

        //return the result

        const newImageId = newImage.id

        const result = await SpotImage.findOne({
            where: {
                id: newImageId,
            },
            attributes: ["id", "url", "preview"]

        })
        res.json(result)

    }

})

//### Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, validateReview, async (req, res) => {
    let { spotId } = req.params;
    spotId = parseInt(spotId)

    const { review, stars } = req.body

    const currentUserId = req.user.id



    const targetSpot = await Spot.findOne({
        where: {
            id: spotId
        }

    })

    const targetReviews = await Review.findAll({
        where: {
            spotId
        }
    })

    for (let review of targetReviews) {
        if (review.userId === currentUserId) {
            const err = new Error("User already has a review for this spot");
            err.status = 403;
            err.error = "User already has a review for this spot"
            res.status(403)
            res.json(err)
        }
    }


    if (targetSpot) {
        //this is edit, not add, need to refactor
        const newReview = await Review.create({
            review,
            stars,
            userId: currentUserId,
            spotId
        })
        res.status(201)
        res.json(newReview)

    } else if (!targetSpot) {
        const err = new Error("Couldn't find a Spot with the specified id");
        err.status = 404;
        err.title = "Spot couldn't be found";
        err.errors = ["Couldn't find a Spot with the specified id"]
        res.status(404)
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

    if (!theSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;

        err.error = "Spot couldn't be found"
        res.status(404)
        res.json(err)
    }

    //owner cannot book

    const ownerId = theSpot.ownerId
    const currentUserId = req.user.id

    if (ownerId === currentUserId) {
        const err = new Error("Owner is not allowed to book his/her own spots");
        err.status = 404;

        err.error = "Owner is not allowed to book his/her own spots"
        res.status(404)
        res.json(err)
    }


    //end date before start date

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start.getTime() > end.getTime()) {
        const err = new Error("Validation error");
        err.status = 400;
        err.title = "Validation error"
        err.error = {
            "endDate": "endDate cannot be on or before startDate"
        }
        res.status(400)
        res.json(err)

    }

    //overlapping

    const exsitBookings = await Booking.findAll(
        {
            where: {
                spotId
            }
        }
    )

    for (let booking of exsitBookings) {

        const existingStart = booking.startDate.getTime()
        const existingEnd = booking.endDate.getTime()

        if (start.getTime() <= existingEnd && start.getTime() >= existingStart) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        if (end.getTime() <= existingEnd && end.getTime() >= existingStart) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

    }


    //success booking
    if (start.getTime() < end.getTime()) {

        const newBooking = await Booking.create({
            startDate,//the date format does not matter
            endDate,
            spotId,
            userId: currentUserId

        })

        //to show the result
        const newId = newBooking.id

        const result = await Booking.findOne({
            where: {
                id: newId
            }
        })

        res.json(result)
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

//### Delete a Spot


router.delete("/:spotId", requireAuth, async (req, res) => {
    let { spotId } = req.params
    spotId = parseInt(spotId)

    const theSpot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    if (!theSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        err.error = "Spot couldn't be found"
        res.status(404)
        res.json(err)

    }

    const ownerId = theSpot.ownerId
    const currentUserId = req.user.id

    if (ownerId !== currentUserId) {
        const err = new Error("You don't have authorization");
        err.status = 401;

        err.error = "You don't have authorization"
        res.status(401)
        res.json(err)

    } else if (ownerId === currentUserId) {
        await theSpot.destroy()
        res.json("Successfully deleted")
    }



})


module.exports = router;