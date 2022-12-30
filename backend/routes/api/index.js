// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require("./spots.js")
const reviewRouter = require("./reviews.js");
const bookingRouter = require("./bookings.js")

const { restoreUser, requireAuth } = require("../../utils/auth.js");

const { Spot, Review, ReviewImage, User, SpotImage, Booking, sequelize } = require('../../db/models');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null

router.get("/test", requireAuth, (req, res) => {
    res.json({ message: "success" })
})

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use("/spots", spotsRouter); //adding spots 

router.use("/reviews", reviewRouter)// adding reviews

router.use("/bookings", bookingRouter)// adding bookings

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


//### Delete a Spot Image
router.delete("/spot-images/:imageId", requireAuth, async (req, res) => {



    let { imageId } = req.params
    imageId = parseInt(imageId)
    const theImage = await SpotImage.findOne({
        where: {
            id: imageId
        }
    })

    if (!theImage) {
        // const err = new Error("Spot Image couldn't be found");
        // err.statusCode = 404;

        // err.error = "Spot Image couldn't be found"
        // res.status(404)
        // return res.json(err)

        res.status(404)
        res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }

    //need to figure out how to Only the owner of the spot is authorized to delete
    const currentUserId = req.user.id
    const spotId = theImage.spotId
    const theSpot = await Spot.findOne({
        where: {
            id: spotId
        }
    })


    const ownerId = theSpot.id

    if (currentUserId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;

        err.error = "Forbidden"
        res.status(403)
        return res.json(err)

    }

    if (theImage && currentUserId === ownerId) {
        // res.json(theSpot.ownerId)
        await theImage.destroy()

        res.status(200)
        res.json({
            statusCode: 200,
            message: "Successfully deleted"
        })

    }


})

//### Delete a Review Image
router.delete("/review-images/:imageId", requireAuth, async (req, res) => {
    let { imageId } = req.params
    imageId = parseInt(imageId)

    const theImage = await ReviewImage.findOne({
        where: {
            id: imageId
        },
        include: [{
            model: Review
        }]
    })

    if (!theImage) {
        // const err = new Error("Review Image couldn't be found");
        // err.statusCode = 404;

        // err.error = "Review Image couldn't be found"
        // res.status(404)
        // res.json(err)

        res.status(404)
        res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })

    }



    const userId = theImage.Review.userId
    const currentUserId = req.user.id
    //    console.log(userId)
    //    console.log(currentUserId)

    if (userId !== currentUserId) {
        const err = new Error("Forbidden");
        err.status = 403;

        err.error = "Forbidden"
        res.status(403)
        res.json(err)

    }

    if (userId === currentUserId && theImage) {
        await theImage.destroy()
        res.status(200)
        res.json({
            statusCode: 200,
            message: "Successfully deleted"
        })
    }



})




module.exports = router;