
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

    // const currentUser=req.user.id;

    const targetReview = await ReviewImage.create({
        url: url,
        where: {
            reviewId
        },
        // attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    if (targetReview) {
        targetReview.url = url

        res.json(targetReview)
    } else if (!targetReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        err.errors = "Review couldn't be found"
        res.status(404)
        res.json(err)
    }


})


//### Get all Reviews of the Current User

router.get("/current", requireAuth, async (req, res) => {
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
                include: [
                    {
                        model: SpotImage,
                        attributes: ["url"]
                    },


                ]
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            },

        ]
    })

    res.json(reviews)

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

    if (userId == req.user.id && theReview && review && stars >= 1 && stars <= 5) {
        await theReview.update({
            review,
            stars
        })

        res.json(theReview)

    } else if (!review || stars < 1 || stars > 5) {
        const err = new Error("Validation error");
        err.statusCode = 400;
        err.errors = {
            "review": "Review text is required",
            "stars": "Stars must be an integer from 1 to 5",
        }
        res.status(400)
        res.json(err)
    } else if (!theReview) {
        const err = new Error("Review couldn't be found");
        err.statusCode = 404;
        err.errors = "Review couldn't be found"
        res.status(404)
        res.json(err)

    }




})






module.exports = router;