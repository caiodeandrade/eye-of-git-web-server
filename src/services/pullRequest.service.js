// src/services/pullRequest.service.js
const discordIntegration = require('../integrations/discord.integration');

const processPullRequestEvent = async ({ action, pullRequest }) => {
  // Extrai dados do pull request
  const title = pullRequest.title;
  const url = pullRequest.html_url;
  const user = pullRequest.user.login;

  // Monta a mensagem a ser enviada
  const content = `**Pull Request** \`${action}\` por **${user}**:\n` +
                  `**Título:** ${title}\n` +
                  `**Link:** ${url}`;

  // Delegando o envio para a camada de integração
  await discordIntegration.sendNotification(content);
};

module.exports = {
  processPullRequestEvent,
};