// Vercel Serverless Function - Proxy para API Melhor Envio
// Rota: POST /api/frete
// Isso evita expor o token no frontend e contorna problemas de CORS

export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN;
  const CEP_ORIGEM = process.env.CEP_ORIGEM || '04752005';

  if (!MELHOR_ENVIO_TOKEN) {
    console.error('MELHOR_ENVIO_TOKEN não configurado nas variáveis de ambiente');
    return res.status(500).json({ error: 'Configuração do servidor incompleta. Token não encontrado.' });
  }

  const { cep_destino, produtos } = req.body;

  if (!cep_destino) {
    return res.status(400).json({ error: 'CEP de destino é obrigatório.' });
  }

  // Montar o payload para a API do Melhor Envio
  // Usando o formato com "products" para que a API calcule o empacotamento
  const payload = {
    from: {
      postal_code: CEP_ORIGEM
    },
    to: {
      postal_code: cep_destino.replace(/\D/g, '')
    },
    products: produtos && produtos.length > 0
      ? produtos
      : [
          {
            // Valores padrão para uma camiseta
            id: "1",
            width: 30,       // cm
            height: 5,       // cm
            length: 40,      // cm
            weight: 0.3,     // kg
            insurance_value: 75, // valor em R$ para seguro
            quantity: 1
          }
        ]
  };

  try {
    const response = await fetch(
      'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MELHOR_ENVIO_TOKEN}`,
          'User-Agent': 'TWK Store (contato@twk.com.br)'
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro na API Melhor Envio:', JSON.stringify(data));
      return res.status(response.status).json({
        error: 'Erro ao consultar Melhor Envio.',
        details: data
      });
    }

    // Filtrar apenas serviços disponíveis (sem erro) e formatar a resposta
    const servicosDisponiveis = data
      .filter(servico => !servico.error)
      .map(servico => ({
        id: servico.id,
        nome: servico.name,
        empresa: servico.company?.name || servico.name,
        logo: servico.company?.picture || null,
        preco: parseFloat(servico.custom_price || servico.price),
        precoOriginal: parseFloat(servico.price),
        desconto: parseFloat(servico.discount || 0),
        prazoMin: servico.delivery_time || 0,
        prazoMax: servico.custom_delivery_time || servico.delivery_time || 0,
        tipo: `${servico.company?.name || ''} ${servico.name}`.trim()
      }))
      .sort((a, b) => a.preco - b.preco); // Ordenar por preço

    return res.status(200).json({
      success: true,
      cep_origem: CEP_ORIGEM,
      cep_destino: cep_destino.replace(/\D/g, ''),
      servicos: servicosDisponiveis,
      total_servicos: servicosDisponiveis.length
    });

  } catch (error) {
    console.error('Erro interno ao calcular frete:', error);
    return res.status(500).json({
      error: 'Erro interno ao calcular frete. Tente novamente.'
    });
  }
}
