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
            { model: Spot }//need to add previewImage to spot
        ]
    })

    res.json(bookings)
})

router.put("/:bookingId", requireAuth, async (req, res, next) => {
    let { bookingId } = req.params
    bookingId = parseInt(bookingId)

    const { startDate, endDate } = req.body



    const theBooking = await Booking.findOne({
        where: {
            id: bookingId
        }
    })

    const userId = theBooking.userId
    // console.log(userId)

    const currentUserId = req.user.id
    // console.log(currentUserId)

    if (userId == currentUserId) {

        if (!theBooking) {
            const err = new Error("Booking couldn't be found");
            err.status = 404;
            err.error = "Booking couldn't be found"
            res.status(404)
            res.json(err)

        }

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (start.getTime() < end.getTime()) {

            theBooking.set({
                startDate,
                endDate
            })

            res.json(theBooking)
        } else if (start.getTime() > end.getTime()) {
            const err = new Error("Validation error");
            err.status = 400;
            err.title = "Validation error"
            err.error = {
                "endDate": "endDate cannot be on or before startDate"
            }
            res.status(400)
            res.json(err)

        }
    } else {
        throw new Error("you don't have authorization")
    }




    //this is the space reserved for conflict booking

})






module.exports = router;