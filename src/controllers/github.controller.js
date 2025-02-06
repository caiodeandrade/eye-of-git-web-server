// src/controllers/github.controller.js
const pullRequestService = require('../services/pullRequest.service');

const handleWebhook = async (req, res) => {
  // Extrai o tipo de evento a partir do cabeçalho "x-github-event"
  const githubEvent = req.headers['x-github-event'];

  if (githubEvent === 'pull_request') {
    const action = req.body.action;

    // Considera apenas as ações 'opened' e 'closed'
    if (action === 'opened' || action === 'closed') {
      const pullRequest = req.body.pull_request;

      try {
        await pullRequestService.processPullRequestEvent({ action, pullRequest });
        console.log('Mensagem enviada para o Discord com sucesso!');
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  // Retorna 200 para o GitHub confirmar o recebimento do webhook
  res.sendStatus(200);
};

module.exports = {
  handleWebhook,
};