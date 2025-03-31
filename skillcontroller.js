const Skill = require("../models/Skill");

exports.addSkill = async (req, res) => {
  try {
    const { name, skill } = req.body;
    if (!name || !skill) return res.status(400).json({ error: "Name and skill required" });

    const newSkill = new Skill({ name, skill });
    await newSkill.save();
    res.json({ message: "Skill added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
