const path = require("path");
const multer = require("multer");
require("dotenv").config();

const UPLOADS_DIR = process.env.UPLOADS_DIR || "uploads/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });
