// src/integrations/discord.integration.js
const axios = require('axios');
const { DISCORD_WEBHOOK_URL } = require('../config');

const sendNotification = async (content) => {
  try {
    const response = await axios.post(DISCORD_WEBHOOK_URL, { content });
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao enviar mensagem para o Discord: ${error.message}`);
  }
};

module.exports = {
  sendNotification,
};