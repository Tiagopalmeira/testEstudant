
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: 'IP não fornecido' });
  }

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;
  const mensagem = `🛰️ Novo acesso detectado:\nIP: ${ip}`;

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: mensagem }),
    });

    const result = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Erro do Telegram:', result);
      return res.status(500).json({ error: 'Erro ao enviar para o Telegram', details: result });
    }

    return res.status(200).json({ mensagem: 'IP enviado com sucesso ao Telegram' });

  } catch (e) {
    console.error('Erro inesperado:', e);
    return res.status(500).json({ error: 'Erro interno', details: e.message });
  }
}
