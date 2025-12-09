const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const pool = require("../db/db");
const { noteValidator } = require('../middleware/validators')
const asyncHandler = require('../utils/asyncHandler'); // <- добавляем

// GET all notes
router.get("/", asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const result = await pool.query(`
        SELECT n.*, c.name AS category_name 
        FROM notes.notes n
        JOIN notes.categories c ON n.category_id = c.id
        WHERE n.user_id = $1
        ORDER BY completed ASC, created_at DESC
    `, [userId]);
    res.json(result.rows);
}));

// GET categories
router.get("/categories", asyncHandler(async (req, res) => {
    const result = await pool.query("SELECT id, name FROM notes.categories");
    res.json(result.rows);
}));

// POST new note
router.post("/", asyncHandler(async (req, res) => {
    const { title, desc, category, image_file } = req.body;
    const newId = uuidv4();
    const userId = req.user.id;

    const insertQuery = `
    INSERT INTO notes.notes
        (id, title, description, category_id, user_id, image_file)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, title, description, category_id AS category, image_file, created_at
`;

    const { rows } = await pool.query(insertQuery, [newId, title, desc, category, userId, image_file]);
    const newNote = rows[0];

    const categoryResult = await pool.query('SELECT name FROM notes.categories WHERE id=$1', [category]);
    newNote.category_name = categoryResult.rows[0]?.name || null;

    res.status(201).json(newNote);
}));

// PUT update note
router.put("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, desc, category, image_file } = req.body;
    const userId = req.user.id;

    const updateResult = await pool.query(`
        UPDATE notes.notes 
        SET title=$1, description=$2, category_id=$3, image_file=$4 
        WHERE id=$5 AND user_id=$6
        RETURNING *
    `, [title, desc, category, image_file, id, userId]);

    const updatedNote = updateResult.rows[0];
    const categoryResult = await pool.query("SELECT name FROM notes.categories WHERE id=$1", [category]);
    updatedNote.category_name = categoryResult.rows[0]?.name || "Unknown";

    res.status(200).json(updatedNote);
}));

// DELETE note
router.delete("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const check = await pool.query(
        "SELECT * FROM notes.notes WHERE id=$1 AND user_id=$2",
        [id, userId]
    );

    if (check.rows.length === 0) {
        return res.status(404).json({ error: "Note not found or not allowed" });
    }

    await pool.query(
        "DELETE FROM notes.notes WHERE id=$1 AND user_id=$2",
        [id, userId]
    );

    res.status(200).json({ message: "Note deleted", id });
}));

// PATCH toggle completed
router.patch("/:id/toggle", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await pool.query(`
        UPDATE notes.notes
        SET completed = NOT completed
        WHERE id=$1 AND user_id = $2
        RETURNING *
    `, [id, userId]);

    if (result.rows.length === 0) {
        return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(result.rows[0]);
}));

module.exports = router;
