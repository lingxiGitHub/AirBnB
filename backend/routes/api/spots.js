
const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize")

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

const validateSpotGetAll = [
    check('page')
        .isInt({ min: 1, max: 10 })
        .withMessage("Page must be greater than or equal to 1 and less or equal to 10"),
    check('size')
        .isInt({ min: 1, max: 20 })
        .withMessage("Size must be greater than or equal to 1 and less or equal to 20"),
    check('minLat')
        .optional()
        .isDecimal()
        .withMessage("Minimum latitude is invalid"),
    check('maxLat')
        .optional()
        .isDecimal()
        .withMessage("Maximum latitude is invalid"),
    check('minLng')
        .optional()
        .isDecimal()
        .withMessage("Minimum longitude is invalid"),
    check('maxLng')
        .optional()
        .isDecimal()
        .withMessage("Maximum longitude is invalid"),
    check('minPrice')
        .optional()
        .isInt({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .optional()
        .isInt({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
]

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
//## Add Query Filters to Get All Spots
router.get('/', validateSpotGetAll, async (req, res, next) => {

    //pagination
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page)) page = 1;
    if (Number.isNaN(size)) size = 20;

    const pagination = {}
    if (page > 0 && size > 0) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

    let where = {}

    if (minLat && !maxLat) {
        where.lat = { [Op.gte]: +minLat };
    } else if (!minLat && maxLat) {
        where.lat = { [Op.lte]: +maxLat };
    } else if (minLat && maxLat) {
        where.lat = { [Op.between]: [+minLat, +maxLat] };
    }

    if (minLng && !maxLng) {
        where.lng = { [Op.gte]: +minLng };
    } else if (!minLng && maxLng) {
        where.lng = { [Op.lte]: +maxLng };
    } else if (minLng && maxLng) {
        where.lng = { [Op.between]: [+minLat, +maxLng] };
    }


    if (minPrice && !maxPrice) {
        if (minPrice < 0) {
            minPrice = 0;
        }
        where.price = { [Op.gte]: +minPrice };
    } else if (!minPrice && maxPrice) {
        where.price = { [Op.lte]: +maxPrice };
    } else if (minPrice && maxPrice) {
        where.price = { [Op.between]: [+minPrice, +maxPrice] };
    }



    //other parts
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage
            }
        ],
        where,
        ...pagination
    })

    const Spots = [];
    allSpots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach((spot) => {
        spot.SpotImages.forEach(spotImage => {
            // console.log(spotImage.url);
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
        spot.avgRating = count / i;
        delete spot.SpotImages;
        delete spot.Reviews;
    });

    res.json({
        Spots,
        page,
        size
    });
})

// ### Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res, next) => {


    const currentUserId = req.user.id


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

    res.json({
        "Spots": Spots
    })
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

    if (allSpots.length === 0) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,

        })
    }

    const Spots = [];
    allSpots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach((spot) => {
        let i = 0;
        let count = 0;
        spot.Reviews.forEach(review => {
            i++;
            count = count + review.stars;
        })
        spot.avgStarRating = count / i;
        spot.numReviews = i;
        delete spot.Reviews;
    });

    if (allSpots) {
        res.json(Spots)
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


    if (!targetSpot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,


        })

    }

    //current user must be the owner
    const ownerId = targetSpot.ownerId

    if (ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.error = "Forbidden"
        res.status(403)
        return res.json(err)
    }

    if (targetSpot && ownerId === req.user.id) {
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
    }


})


//### Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {

    let { spotId } = req.params
    spotId = parseInt(spotId)

    const reviews = await Review.findAll({
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

    if (reviews.length !== 0) {

        res.json({ "Reviews": reviews })
    } else if (reviews.length === 0) {

        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,


        })
    }




})



//### Create a Spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
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
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,


        })
    }

    //find owner id
    const ownerId = spot.ownerId

    if (ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.error = "Forbidden"
        res.status(403)
        return res.json(err)
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
            return res.json(err)
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

        res.status(404)

        return res.json({
            message: "Couldn't find a Spot with the specified id",
            statusCode: 404,


        })
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
        // const err = new Error("Spot couldn't be found");
        // err.status = 404;

        // err.error = "Spot couldn't be found"
        // res.status(404)
        // res.json(err)

        res.status(404)

        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,


        })
    }

    //owner cannot book

    const ownerId = theSpot.ownerId
    const currentUserId = req.user.id

    if (ownerId === currentUserId) {
        const err = new Error("Owner is not allowed to book his/her own spots");
        err.status = 404;

        err.error = "Owner is not allowed to book his/her own spots"
        res.status(404)
        return res.json(err)
    }


    //end date before start date

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start.getTime() > end.getTime()) {


        res.status(400)

        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                "endDate": "endDate cannot be on or before startDate"
            }


        })

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

        if (start.getTime() <= existingStart && end.getTime() >= existingEnd) {
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

        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,

        })
    }

    const userId = bookings.userId
    const currentUserId = req.user.id

    // console.log(userId)
    // console.log(currentUserId)


    if (userId == currentUserId) {
        res.json({
            "Bookings": [bookings]
        })
    } else if (userId != currentUserId) {
        res.json({
            "Bookings": [restrictedBooking]
        })
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
        return res.json(err)

    }

    const ownerId = theSpot.ownerId
    const currentUserId = req.user.id

    if (ownerId !== currentUserId) {
        const err = new Error("Forbidden");
        err.status = 403;

        err.error = "Forbidden"
        res.status(403)
        return res.json(err)

    } else if (ownerId === currentUserId) {
        await theSpot.destroy()
        res.status(200)
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }



})


module.exports = router;