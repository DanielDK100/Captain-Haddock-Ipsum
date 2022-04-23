const _ = require('lodash');
const { validationResult } = require('express-validator');
const generateParagraphs = require('../helpers/generateParagraphs');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const index = (req, res) => {
    return res.render('index')
}

const generate = (req, res) => {





    const lorem = new LoremIpsum({ words: req.t('insults', { returnObjects: true }) });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('index', { errors: errors.array() })
    }
    return res.render('index', {
        insult: lorem.generateWords(1),
        paragraphs: generateParagraphs(req.body.numberOfParagraphs, lorem)
    })
}

const generateJson = (req, res) => {
    const lorem = new LoremIpsum({ words: req.t('insults', { returnObjects: true }) });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return res.json({
        insult: lorem.generateWords(1),
        paragraphs: generateParagraphs(req.query.numberOfParagraphs, lorem)
    })
}

module.exports = {
    index,
    generate,
    generateJson
}