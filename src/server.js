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
let numberOfParagraphs = []
let insult = null

app.get('/', (req, res) => {
    numberOfParagraphs = []
    insult = null
    res.render('index', {
        numberOfParagraphs,
        insult
    })
});

app.post('/generate-paragraphs', urlencodedParser, (req, res) => {
    numberOfParagraphs = []
    for (let index = 0; index < req.body.paragraphs; index++) {
        numberOfParagraphs.push(lorem.generateSentences(8))
    }
    res.render('index', {
        numberOfParagraphs,
        insult: lorem.generateWords(1)
    })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);