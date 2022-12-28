
const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');




//### Add an Image to a Review based on the Review's id

router.post("/:reviewId/images", requireAuth, async (req, res) => {
    let { reviewId } = req.params
    reviewId = parseInt(reviewId)
    const { url } = req.body

    const currentUserId = req.user.id;

    const foundReview = await Review.findOne({
        where: {
            id: reviewId
        }
    })

    if (!foundReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        err.errors = "Review couldn't be found"
        res.status(404)
        res.json(err)

    }

    const ownerId = foundReview.userId;
    // console.log(ownerId)

    if (ownerId !== currentUserId) {
        const err = new Error("You don't have authorization");
        err.status = 401;
        err.error = "You don't have authorization"
        res.status(401)
        res.json(err)

    }

    //for max 10

    const allReviewImages = await ReviewImage.findAll({
        where: {
            reviewId
        }
    })

    console.log(allReviewImages)

    let count = 0

    for (let item of allReviewImages) {
        count++
    }

    if (count >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        err.error = "Maximum number of images for this resource was reached"
        res.status(403)
        res.json(err)


    }

    if (foundReview && ownerId === currentUserId && count < 10) {
        const newReview = await ReviewImage.create({
            url,
            reviewId,


        })
        // show the result

        const newReviewId = newReview.id;

        const result = await ReviewImage.findOne({
            where: {
                id: newReviewId
            },
            attributes: ["id", "url"]
        })


        res.json(result)
    }


})


//### Get all Reviews of the Current User

router.get("/current", requireAuth, async (req, res) => {



    // const previewImages = await Spot.findAll({
    //     include: [{
    //         model: SpotImage
    //     }]
    // })

    const userId = req.user.id

    const reviews = await Review.findAll({
        where: {
            userId
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,//how to add previewImage???POJO??
                include: [{
                    model: SpotImage,
                    // attributes:["id","url"]
                }]
            },

            {
                model: ReviewImage,
                attributes: ["id", "url"]
            },


        ]
    })

    let reviewsList = []
    reviews.forEach(review => {
        reviewsList.push(review.toJSON())
    })

    reviewsList.forEach(review => {
        review.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                review.Spot.previewImage = image.url
            }
        })
        if (!review.Spot.previewImage) {
            review.Spot.previewImage = "no preview image found"
        }
        delete review.Spot.SpotImages
    })

    res.json(reviewsList)

})

router.put("/:reviewId", requireAuth, async (req, res) => {
    let { reviewId } = req.params
    reviewId = parseInt(reviewId)

    const { review, stars } = req.body

    const theReview = await Review.findOne({
        where: {
            id: reviewId
        }
    })

    const userId = theReview.userId

    // console.log(userId)
    // console.log(req.user.id)

    if (!theReview) {
        const err = new Error("Review couldn't be found");
        err.statusCode = 404;
        err.errors = "Review couldn't be found"
        res.status(404)
        res.json(err)

    }

    if (!review || stars < 1 || stars > 5) {
        const err = new Error("Validation error");
        err.statusCode = 400;
        err.errors = {
            "review": "Review text is required",
            "stars": "Stars must be an integer from 1 to 5",
        }
        res.status(400)
        res.json(err)
    }

    if (userId == req.user.id && theReview && review && stars >= 1 && stars <= 5) {
        await theReview.update({
            review,
            stars
        })

        res.json(theReview)

    }







})

router.delete("/:reviewId", requireAuth, async (req, res) => {

    let { reviewId } = req.params
    reviewId = parseInt(reviewId)


    const theReview = await Review.findOne({
        where: {
            id: reviewId
        }
    })

    if (!theReview) {
        const err = new Error("Couldn't find a Review with the specified id");
        err.statusCode = 404;
        err.errors = "Couldn't find a Review with the specified id"
        res.status(404)
        res.json(err)
    }

    const currentUserId = req.user.id
    const userId = theReview.userId

    if (currentUserId !== userId) {

        const err = new Error("You don't have authorization");
        err.status = 401;

        err.error = "You don't have authorization"
        res.status(401)
        res.json(err)
    }

    if (theReview && currentUserId === userId) {

        await theReview.destroy()
        res.json("Successfully deleted")

    }






})






module.exports = router;