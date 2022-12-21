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
    handleValidationErrors
];

// backend/routes/api/users.js
// ...

// ### Sign Up a User
router.post(
    '/',
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName });

        //for duplicate user sign up
        // const findEmail = await User.findAll({
        //     where: {
        //         email
        //     }
        // })
        // if (findEmail) {
        //     err.status = 403;
        //     err.title = "email";
        //     err.errors = ["User with that email already exists"];
        //     return next(err);
        // }

        //use express validator??

        //add token into response body


        // let token = await setTokenCookie(res, user);

        // let userlist = []
        // user.forEach((item) => {
        //     userlist.push(item.toJSON())
        //     userlist.push(token)
        // }

        // )




        return res.json({
            user

        });
    }
);


// backend/routes/api/users.js
// ...

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);

module.exports = router;