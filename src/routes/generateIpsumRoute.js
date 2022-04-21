const { body, query } = require('express-validator');
const { Router } = require('express');
const generateIpsumController = require('../controllers/generateIpsumController');

const router = Router();

router.get('/', generateIpsumController.index);
router.post('/generate-paragraphs', body('numberOfParagraphs').isInt({ min: 1, max: 1000 }), generateIpsumController.generate);
router.get('/generate-paragraphs-json', [query('numberOfParagraphs').isInt({ min: 1, max: 1000 }), query('lng').not().isEmpty()], generateIpsumController.generateJson);

module.exports = router;