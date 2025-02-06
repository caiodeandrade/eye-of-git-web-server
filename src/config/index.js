// src/config/index.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
};