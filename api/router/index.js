const router = require("express").Router();

router.use("/apps", require("./apps"))
router.use("/users", require("./users"));

module.exports = router;