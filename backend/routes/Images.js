const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../config/supabase.js"); // your config file

const router = express.Router();

const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/x-png",
    "image/webp",
    "image/svg+xml",
];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return cb(new Error("Only images allowed (jpeg, png, webp, svg)"))
        }
        cb(null, true)
    }
});

// Upload an image
router.post("/upload", upload.single("image"), async (req, res, next) => {
    try {
        console.log("📥 FILE RECEIVED =", req.file);

        const file = req.file;
        if (!file) {
            console.log("❌ ERROR: no file sent");
            return res.status(400).json({ error: "No file uploaded" });
        }

        const extension = path.extname(file.originalname).toLowerCase();
        const fileName = `${uuidv4()}${extension}`;
        console.log("🧩 GENERATED FILENAME =", fileName);

        const { data, error } = await supabase.storage
            .from("notes-images-private")
            .upload(fileName, file.buffer, { contentType: file.mimetype });

        console.log("📤 SUPABASE UPLOAD RESPONSE =", data);
        console.log("📤 SUPABASE UPLOAD ERROR =", error);

        if (error) return next(error)

        console.log("✅ SUCCESS — uploaded file:", fileName);

        return res.status(201).json({ fileName });
    } catch (err) {
        next(err);
    }
});


// Get signed URL for an image
router.get("/signed-url/:fileName", async (req, res, next) => {
    try {
        const { fileName } = req.params;
        console.log("🔐 Request signed URL for:", fileName);

        const { data, error } = await supabase.storage
            .from("notes-images-private")
            .createSignedUrl(fileName, 3600); // 1 hour expiry

        console.log("🔐 SIGNED URL DATA =", data);
        console.log("🔐 SIGNED URL ERROR =", error);

        if (error || !data?.signedUrl) {
            return res.status(404).json({ error: "File not found" });
        }

        console.log("🔐 SUCCESS signed URL:", data?.signedUrl);

        res.json({ url: data.signedUrl });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
