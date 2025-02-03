// Carregando variaveis de ambiente
require('dotenv').config();

// Imports
const express = require('express');
const axios = require('axios');

const app = express();

// Middleware para interpretar JSON enviado pelo GitHub
app.use(express.json());

// Rota que recebe o webhook
app.post('/webhook', async (req, res) => {
  // Captura o tipo de evento enviado pelo GitHub a partir do cabeçalho "x-github-event"
  const githubEvent = req.headers['x-github-event'];
  
  if (githubEvent === 'pull_request') {
    const action = req.body.action;
    
    // Filtra as ações (opened e closed)
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
          // "content" será exibido como texto simples(possível formatar mais elaboradamente, usando "embeds").
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
