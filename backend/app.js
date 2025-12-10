
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { ensureAuthenticated } = require('./middleware/auth.js')
const notesRouter = require('./routes/Notes');
const authRouter = require('./routes/Auth');
const imageRouter = require("./routes/Images.js");

const app = express();

// Security Middlewares
app.use(helmet());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
}));

//CORS
const allowedOrigins = [
    'http://localhost:5173', // dev
    process.env.CLIENT_ORIGIN  // production
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow non-browser requests like Postman
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session
app.use(session({
    name: process.env.SESSION_NAME, // 👈 ВАЖНО
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//Passport
require('./config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());



//Routes
app.use("/notes", ensureAuthenticated, notesRouter)
app.use("/users", authRouter)
app.use("/images", ensureAuthenticated, imageRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    if (res.headersSent) return next(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

//Start server
const PORT = process.env.PORT || 3000;

app.get('/test', (req, res) => {
    res.send('Helo from SnapNotes api!')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app
