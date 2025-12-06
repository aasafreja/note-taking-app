const { body, validationResult } = require('express-validator');

const registerValidator = [
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 chars'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 chars'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

const noteValidator = [
    body('title')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Title is required'),
    body('desc')
        .optional()
        .isString()
        .trim(),
    body('image_file')
        .optional()
        .isString()
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]

module.exports = { registerValidator, noteValidator };
