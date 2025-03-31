const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/Routes");
const skillRoutes = require("./routes/skills");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Ensure "uploads" directory exists
const UPLOADS_DIR = process.env.UPLOADS_DIR || "uploads/";
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(UPLOADS_DIR));

// File Upload API (For Profile Photo & Govt. ID)
app.post("/api/upload", upload.fields([{ name: "profilePhoto" }, { name: "govtID" }]), (req, res) => {
    if (!req.files || (!req.files.profilePhoto && !req.files.govtID)) {
        return res.status(400).json({ error: "No files uploaded" });
    }

    res.json({
        message: "Files uploaded successfully",
        profilePhoto: req.files.profilePhoto ? req.files.profilePhoto[0].filename : null,
        govtID: req.files.govtID ? req.files.govtID[0].filename : null
    });
});

app.use("/api/auth", Routes);
app.use("/api/skills", skills);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
