// api/enviar-ip.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: 'IP não fornecido' });
  }

  console.log(`IP recebido: ${ip}`);

  return res.status(200).json({ mensagem: 'IP recebido com sucesso' });
}
