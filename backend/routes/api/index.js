// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser, requireAuth } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null

router.get("/test", requireAuth, (req, res) => {
    res.json({ message: "success" })
})

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

//router.use("/spots",spotsRouter) //eventually will use this

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;