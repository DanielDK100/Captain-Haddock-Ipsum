'use strict';
import 'dotenv/config'
import express from 'express';
import generateParagraphs from './helpers/generateParagraphs.js';
import insults from './data/insults.json';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';
import { LoremIpsum } from "lorem-ipsum";

// Constants
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// App
const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug')
const lorem = new LoremIpsum({
    words: insults,
});

// Routes
app.get('/', (req, res) => {
    return res.render('index')
});
app.post('/generate-paragraphs',
    body('numberOfParagraphs').isInt({ min: 1, max: 1000 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('index', {
                errors: errors.array()
            })
        }
        return res.render('index', {
            insult: lorem.generateWords(1),
            paragraphs: generateParagraphs(req.body.numberOfParagraphs, lorem)
        })
    });
app.get('/generate-paragraphs-json', (req, res) => {
    return res.json({
        insult: lorem.generateWords(1),
        paragraphs: generateParagraphs(req.query.numberOfParagraphs, lorem)
    })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);