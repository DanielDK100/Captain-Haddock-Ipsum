'use strict';

import express from 'express';
import generateParagraphs from './helpers/generateParagraphs.js';
import insults from './data/insults.json';
import bodyParser from 'body-parser';
import { LoremIpsum } from "lorem-ipsum";

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))
app.set('view engine', 'ejs')
const lorem = new LoremIpsum({
    words: insults,
});

app.get('/', (req, res) => {
    res.render('index', {
        insult: null,
        paragraphs: []
    })
});

app.post('/generate-paragraphs', urlencodedParser, (req, res) => {
    res.render('index', {
        insult: lorem.generateWords(1),
        paragraphs: generateParagraphs(req.body.numberOfParagraphs, lorem)
    })
});

app.get('/generate-paragraphs-json', urlencodedParser, (req, res) => {
    res.json({
        insult: lorem.generateWords(1),
        paragraphs: generateParagraphs(req.query.numberOfParagraphs, lorem)
    })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);