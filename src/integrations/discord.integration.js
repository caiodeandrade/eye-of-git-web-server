const axios = require('axios');
const { DISCORD_WEBHOOK_URL } = require('../config');

const sendNotification = async (content) => {
  try {
    console.log('🔹 Enviando mensagem para o Discord...');
    console.log('🔹 DISCORD_WEBHOOK_URL:', DISCORD_WEBHOOK_URL);
    console.log('🔹 Conteúdo:', content);

    const response = await axios.post(DISCORD_WEBHOOK_URL, { content });

    console.log('✅ Mensagem enviada com sucesso!', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem para o Discord:', error.response?.data || error.message);
    throw new Error(`Erro ao enviar mensagem para o Discord: ${error.message}`);
  }
};

module.exports = {
  sendNotification,
};