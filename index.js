require('dotenv').config(); // se quiser carregar variáveis de ambiente de um .env
const express = require('express');
const axios = require('axios');

const app = express();

// Middleware para interpretar JSON enviado pelo GitHub
app.use(express.json());

// Rota que recebe o webhook
app.post('/webhook', async (req, res) => {
  // Verifica se é um evento de pull_request
  const githubEvent = req.headers['x-github-event'];
  
  if (githubEvent === 'pull_request') {
    const action = req.body.action;
    
    // Filtra as ações que você quer (opened, closed, etc.)
    if (action === 'opened' || action === 'closed') {
      const pullRequest = req.body.pull_request;
      const title = pullRequest.title;
      const url = pullRequest.html_url;
      const user = pullRequest.user.login;

      // Monta a mensagem para enviar no Discord
      const content = `**Pull Request** \`${action}\` por **${user}**:\n` +
                      `**Título:** ${title}\n` +
                      `**Link:** ${url}`;

      try {
        await axios.post(process.env.DISCORD_WEBHOOK_URL, {
          // "content" será exibido como texto simples.
          // Se quiser formatar mais elaboradamente, use "embeds".
          content
        });
        console.log('Mensagem enviada para o Discord com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar mensagem para o Discord:', error.message);
      }
    }
  }

  // Retornamos 200 para o GitHub indicar que recebemos
  res.sendStatus(200);
});

// Inicia o servidor na porta configurada ou na 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
