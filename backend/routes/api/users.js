// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

// backend/routes/api/users.js
// ...
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Must Provide a first name'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Must Provide a last name'),
    handleValidationErrors
];





// backend/routes/api/users.js
// ...

// ### Sign Up a User
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;


        const allUsers = await User.findAll()



        for (let user of allUsers) {
            // console.log(user)
            if (email === user.dataValues.email) {
                res.status(403)
                return res.json({
                    message: "User already exists",
                    statusCode: 403,
                    errors: {
                        "email": "User with that email already exists"
                    }

                })
            }
            if (username === user.dataValues.username) {
                res.status(403)
                return res.json({
                    message: "User already exists",
                    statusCode: 403,
                    errors: {
                        "username": "User with that username already exists"
                    }

                })

            }
        }
        const user = await User.signup({ email, username, password, firstName, lastName });

        // const userId=user.dataValues.id

        // const result=await User.findOne({
        //     where:{
        //         id:userId
        //     }
        // })

        await setTokenCookie(res, user);

        return res.json({
            user

        });

    }
);


module.exports = router;