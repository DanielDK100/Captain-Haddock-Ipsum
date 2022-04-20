'use strict';
require('dotenv').config()
const express = require('express');
const i18next = require('i18next');
const middleware = require('i18next-http-middleware')
const Backend = require('i18next-fs-backend');
const bodyParser = require('body-parser');

const generateIpsumRoute = require('./routes/generateIpsumRoute.js');

// Constants
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// App
i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        backend: {
            loadPath: 'locales/{{lng}}/{{ns}}.json',
        },
        debug: false,
        detection: {
            order: ['querystring', 'cookie', 'header'],
            caches: ['cookie']
        },
        preload: ['en-US', 'da'],
        fallbackLng: 'en-US'
    });
const app = express()

app.use(middleware.handle(i18next));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug')

app.use('/', generateIpsumRoute);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);