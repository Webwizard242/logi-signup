const express = require("express");
const { signup, login } = require("../controllers/authController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/signup", upload.fields([{ name: "govId" }, { name: "profilePic" }]), signup);
router.post("/login", login);

module.exports = router;
