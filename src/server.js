'use strict';

import express from 'express';
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
let insult = null
let paragraphs = []

app.get('/', (req, res) => {
    insult = null
    paragraphs = []
    res.render('index', {
        insult,
        paragraphs
    })
});

app.post('/generate-paragraphs', urlencodedParser, (req, res) => {
    paragraphs = []
    for (let index = 0; index < req.body.numberOfParagraphs; index++) {
        paragraphs.push(lorem.generateSentences(8))
    }
    res.render('index', {
        insult: lorem.generateWords(1),
        paragraphs
    })
});

app.get('/generate-paragraphs-json', urlencodedParser, (req, res) => {
    paragraphs = []
    for (let index = 0; index < req.query.numberOfParagraphs; index++) {
        paragraphs.push(lorem.generateSentences(8))
    }
    res.json({
        insult: lorem.generateWords(1),
        paragraphs
    })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);