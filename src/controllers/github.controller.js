const pullRequestService = require('../services/pullRequest.service');

const handleWebhook = async (req, res) => {
  console.log('🔹 Webhook recebido:', req.body); // <-- Adicionado

  // Extrai o tipo de evento a partir do cabeçalho "x-github-event"
  const githubEvent = req.headers['x-github-event'];
  console.log('🔹 Evento do GitHub:', githubEvent); // <-- Adicionado

  if (githubEvent === 'pull_request') {
    const action = req.body.action;
    console.log('🔹 Ação do PR:', action); // <-- Adicionado

    if (action === 'opened' || action === 'closed') {
      const pullRequest = req.body.pull_request;

      try {
        console.log('🔹 Chamando processPullRequestEvent...'); // <-- Adicionado
        await pullRequestService.processPullRequestEvent({ action, pullRequest });
        console.log('✅ Mensagem enviada para o Discord!');
      } catch (error) {
        console.error('❌ Erro no serviço do PR:', error.message);
      }
    }
  }

  res.sendStatus(200);
};

module.exports = {
  handleWebhook,
};