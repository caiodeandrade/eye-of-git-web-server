// src/routes/github.routes.js
const express = require('express');
const router = express.Router();
const githubController = require('../controllers/github.controller');

router.post('/webhook', githubController.handleWebhook);

module.exports = router;