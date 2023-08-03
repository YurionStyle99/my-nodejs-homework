const express = require("express");

const router = express.Router();

const userControllers = require("../../controllers/userControllers/userControllers");
const {authenticate, upload} = require("../../middlewares/index");

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.post("/logout", authenticate, userControllers.logoutUser);
router.get("/current", authenticate, userControllers.getCurrentUser);
router.patch("/status", authenticate, userControllers.updateUserStatus);
router.patch("/avatars", authenticate, upload.single("avatar"), userControllers.updateUserAvatar)

module.exports = router;
