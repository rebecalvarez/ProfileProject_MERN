const router = require("express").Router();
const profileRoutes = require("./profiles");

// profile routes
router.use("/profiles", profileRoutes);

module.exports = router;
