const request = require('supertest');
const express = require('express');
const session = require('express-session');
const notesRouter = require('../routes/Notes');

// --- МОКАЕМ ensureAuthenticated ---
jest.mock('../config/auth', () => ({
    ensureAuthenticated: (req, res, next) => {
        req.user = { id: 'test-user-id' };
        next();
    }
}));

// --- МОКАЕМ БАЗУ ---
jest.mock('../db/db', () => ({
    query: jest.fn()
}));

const pool = require('../db/db');

const app = express();
app.use(express.json());
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use('/notes', notesRouter);

describe('Notes API', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // очищаем мок перед каждым тестом
    });

    // GET /notes
    it('GET /notes → should return notes list', async () => {

        pool.query.mockResolvedValue({
            rows: [
                { id: "1", title: "Test Note", description: "desc", category_name: "Work" }
            ]
        });

        const res = await request(app).get('/notes');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe("Test Note");
    });

    //GET categories

    //POST note

    //PUT note/:id

    //DELETE note/:id

    //PATCH note/:id (toggle completed)
})