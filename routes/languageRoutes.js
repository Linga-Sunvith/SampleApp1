const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');

// GET /api/languages/:userId
router.get('/:userId', languageController.getUserLanguages);

// GET /api/languages/:userId/:langId
router.get('/:userId/:langId', languageController.getLanguageDetails);

module.exports = router;
