// api/enviar-ip.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: 'IP não fornecido' });
  }

  const token = 'SEU_TOKEN_DO_BOT';
  const chatId = 'SEU_CHAT_ID'; // Pode ser ID do seu usuário ou grupo
  const mensagem = `🛰️ Novo acesso detectado:\nIP: ${ip}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const telegramResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: mensagem,
      }),
    });

    if (!telegramResponse.ok) {
      const err = await telegramResponse.json();
      console.error('Erro Telegram:', err);
      return res.status(500).json({ error: 'Erro ao enviar para o Telegram', details: err });
    }

    return res.status(200).json({ mensagem: 'IP enviado com sucesso ao Telegram' });
  } catch (e) {
    console.error('Erro geral:', e);
    return res.status(500).json({ error: 'Erro interno', details: e.message });
  }
}
