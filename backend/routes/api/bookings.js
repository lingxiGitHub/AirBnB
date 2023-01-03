const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const spot = require('../../db/models/spot');


// ### Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
    let currentUserId = req.user.id;
    currentUserId = parseInt(currentUserId);

    // console.log(currentUserId)

    const bookings = await Booking.findAll({
        where: {
            userId: currentUserId
        },
        include: [
            {
                model: Spot,
                attributes:{exclude:["updatedAt","createdAt"]},
                include: [{ model: SpotImage }]
            }//need to add previewImage to spot
        ]
    })

    const bookingList = []

    bookings.forEach(booking => {
        bookingList.push(booking.toJSON())
    });

    bookingList.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                booking.Spot.previewImage = image.url
            }
        })

        if (!booking.Spot.previewImage) {
            booking.Spot.previewImage = "no preview image found"
        }
        delete booking.Spot.SpotImages
    })

    res.json({
        "Bookings":bookingList
    })
})


//Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
    let { bookingId } = req.params
    bookingId = parseInt(bookingId)

    const { startDate, endDate } = req.body

    const theBooking = await Booking.findOne({
        where: {
            id: bookingId
        }
    })



    if (!theBooking) {


        res.status(404)

        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        })

    }

    //current user must be the owner
    const userId = theBooking.userId
    const currentUserId = req.user.id
    const spotId = theBooking.spotId

    if (userId !== currentUserId) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.error = "Forbidden"
        res.status(403)
        res.json(err)
    }

    //endDate cannot come before startDate

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start.getTime() >= end.getTime()) {

        res.status(400)

        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                "endDate": "endDate cannot come before startDate"
            }


        })

    }

    //Can't edit a booking that's past the end date
    const rightnow = Date.now()


    if (rightnow > end.getTime()) {
        const err = new Error("Can't edit a booking that's past the end date");
        err.status = 403;

        err.error = "Past bookings can't be modified"
        res.status(403)
        return res.json(err)

    }


    //overlapping

    const exsitBookings = await Booking.findAll(
        {
            where: {
                spotId
            }
        }
    )

    // console.log(exsitBookings)

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

        // console.log(start.getTime())//desired start date from 1970
        // console.log(end.getTime())//desired end date from 1970

        // console.log(existingEnd)//existing end
        // console.log(existingStart)//existing start
    }



    //success
    if (start.getTime() < end.getTime() && userId === currentUserId && theBooking && rightnow < end.getTime()) {

        theBooking.update({
            startDate,
            endDate
        })

        res.json(theBooking)
    }
}

)


//### Delete a Booking

router.delete("/:bookingId", requireAuth, async (req, res) => {

    let { bookingId } = req.params
    bookingId = parseInt(bookingId)

    const theBooking = await Booking.findOne({
        where: {
            id: bookingId
        }
    })

    if (!theBooking) {
        // const err = new Error("Booking couldn't be found");
        // err.status = 404;
        // // err.title = "Booking couldn't be found"
        // err.error = "Booking couldn't be found"
        // res.status(404)
        // return res.json(err)

        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }


    const userId = theBooking.userId
    const currentUserId = req.user.id

    // console.log(userId)
    // console.log(currentUserId)

    if (userId !== currentUserId) {
        const err = new Error("Forbidden");
        err.status = 403;

        err.error = "Forbidden"
        res.status(403)
        return res.json(err)
    };

    const rightnow = Date.now()
    const startDate = new Date(theBooking.startDate).getTime()
    // console.log(rightnow)
    // console.log(startDate)

    if (rightnow > startDate) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;

        err.error = "Bookings that have been started can't be deleted"
        res.status(403)
        return res.json(err)

    }



    if (userId === currentUserId && theBooking) {
        // res.json(theBooking)
        await theBooking.destroy()
        res.status(200)
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
})
    }




})





module.exports = router;