const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, User, SpotImage, Favorite, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//get all of current user's favorite spots
router.get("/current", requireAuth, async (req, res) => {
    let currentUserId = req.user.id;
    currentUserId = parseInt(currentUserId);

    const favorites = await Favorite.findAll({
        where: {
            userId: currentUserId
        },
        include: [
            {
                model: Spot,
                attributes: { exclude: ["updatedAt", "createdAt"] },
                include: [
                    {
                        model: SpotImage,
                        where:
                        {
                            preview: true
                        }
                    },
                    // {
                    //     model: User,
                    //     as: "Owner",
                    //     attributes: ["id", "firstName", "lastName"]
                    // }
                ]
            }
        ]
    })

    res.json({
        "Favorites": favorites
    })

})

//add a spot to favorite list
router.post("/:spotId", requireAuth, async (req, res) => {
    let spotId = req.params.spotId
    spotId = parseInt(spotId)

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    let currentUserId = req.user.id;
    currentUserId = parseInt(currentUserId);

    const newSave = await Favorite.create({
        spotId,
        userId: currentUserId

    })

    const newFavoriteId = newSave.id

    const result = await Favorite.findOne({
        where:{
            id: newFavoriteId
        }
    })

    res.json(result)



})

//delete a spot to favorite list

router.delete("/:spotId", requireAuth, async(req, res)=>{
    let spotId = req.params.spotId;
    spotId = parseInt(spotId);

    let currentUserId = req.user.id;
    currentUserId = parseInt(currentUserId);

    const theFavorite = await Favorite.findOne({
        where:{
            spotId,
            userId: currentUserId
        }
    })

    if (theFavorite){
        await theFavorite.destroy()
        res.status(200);
        res.json({
            statusCode: 200,
            message: "Successfully deleted"
        })

    }

    


})

module.exports = router;