const router = require("express").Router();

const appController = require("../controller/app.controller.js");
const movieController = require("../controller/movie.controller.js");
const authController = require("../controller/auth.controller.js");

router.route("")
.get(appController.getAll)
.post(authController.authenticate, appController.addOne);

router.route("/:appId")
.get(appController.getOne)
.put(authController.authenticate, appController.replaceOne)
.patch(authController.authenticate, appController.updateOne)
.delete(authController.authenticate, appController.deleteOne);

router.route("/:appId/movies")
.get(movieController.getAll)

router.route("/:appId/movies/:movieId")
.get(movieController.getOne)

module.exports = router;