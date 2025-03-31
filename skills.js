const express = require("express");
const { addSkill, getSkills } = require("../controllers/skillController");

const router = express.Router();

router.post("/add-skill", addSkill);
router.get("/skills", getSkills);

module.exports = router;
