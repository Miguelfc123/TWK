import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Accordion from '../components/Accordion';

const produtosIniciais = [
  {
    id: 1,
    name: 'buda',
    price: '75,00',
    oldPrice: '100,00',
    image: process.env.PUBLIC_URL + '/buda.png',
    status: '-47%',
    category: 'Início > Buda >',
  },
  {
    id: 3,
    name: 'more money azul',
    price: '75,00',
    oldPrice: '100,00',
    image: process.env.PUBLIC_URL + '/more money azul.png',
    status: 'COMPRAR MAIS, PAGAR MENOS',
    category: 'Início > More Money >',
  },
  {
    id: 4,
    name: 'more money vermelha',
    price: '75,00',
    oldPrice: '100,00',
    image: process.env.PUBLIC_URL + '/more money vermelha.png',
    status: 'COMPRAR MAIS, PAGAR MENOS',
    category: 'Início > More Money >',
  },
  {
    id: 5,
    name: 'swag',
    price: '75,00',
    oldPrice: '100,00',
    image: process.env.PUBLIC_URL + '/swag.PNG',
    status: 'COMPRAR MAIS, PAGAR MENOS',
    category: 'Início > Swag >',
  },
  {
    id: 6,
    name: 'TheEyes',
    price: '75,00',
    oldPrice: '',
    image: process.env.PUBLIC_URL + '/TheEyes.png',
    status: 'COMPRAR MAIS, PAGAR MENOS',
    category: 'Início > TheEyes >',
  }
];

function PaginaProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');
  
  // Estados para o Frete
  const [cep, setCep] = useState('');
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [opcoesFrete, setOpcoesFrete] = useState(null);
  const [freteSelecionado, setFreteSelecionado] = useState(null);
  const [erroFrete, setErroFrete] = useState('');
  const [mostrarHistorico, setMostrarHistorico] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const localProd = produtosIniciais.find((p) => p.id === parseInt(id, 10)) || produtosIniciais[0];
    setProduto(localProd);
    document.title = localProd.name;
    setLoading(false);
    
    // Salvar no histórico de visualizações
    const historicoAtual = JSON.parse(localStorage.getItem('visitedProducts')) || [];
    const novoHistorico = historicoAtual.filter(p => p.id !== localProd.id);
    novoHistorico.unshift({ ...localProd, visitedAt: new Date().toISOString() });
    localStorage.setItem('visitedProducts', JSON.stringify(novoHistorico.slice(0, 10)));
  }, [id]);

  const handleCalcularFrete = async () => {
    if (!cep || cep.replace(/\D/g, '').length !== 8) {
      setErroFrete('Por favor, digite um CEP válido (8 dígitos).');
      setOpcoesFrete(null);
      return;
    }

    setErroFrete('');
    setCalculandoFrete(true);
    setOpcoesFrete(null);
    setFreteSelecionado(null);

    try {
      const cleanCep = cep.replace(/\D/g, '');

      // Consumindo a API pública do ViaCEP para obter a localidade (funciona nativamente no Vercel)
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErroFrete('CEP não encontrado. Verifique e tente novamente.');
        setCalculandoFrete(false);
        return;
      }

      const localTexto = `${data.localidade} - ${data.uf}`;

      // Simulando valores baseados no estado (Já que a API oficial dos Correios bloqueia acesso direto do navegador por CORS)
      let valorPac = 15.90;
      let prazoPac = 5;
      let valorSedex = 35.90;
      let prazoSedex = 2;

      if (data.uf === 'SP') {
        valorPac = 9.90;
        prazoPac = 3;
        valorSedex = 19.90;
        prazoSedex = 1;
      } else if (['RJ', 'MG', 'PR', 'SC', 'RS'].includes(data.uf)) {
        valorPac = 18.90;
        prazoPac = 7;
        valorSedex = 42.90;
        prazoSedex = 3;
      } else {
        valorPac = 28.90;
        prazoPac = 12;
        valorSedex = 65.90;
        prazoSedex = 5;
      }

      const novasOpcoes = [
        { tipo: 'Correios PAC', valor: valorPac, prazo: prazoPac, local: localTexto },
        { tipo: 'Correios SEDEX', valor: valorSedex, prazo: prazoSedex, local: localTexto }
      ];

      setOpcoesFrete(novasOpcoes);
      setFreteSelecionado(novasOpcoes[0]);

    } catch (error) {
      console.error('Erro no cálculo de frete:', error);
      setErroFrete('Não foi possível calcular o frete. Verifique sua conexão ou tente novamente.');
    } finally {
      setCalculandoFrete(false);
    }
  };

  const handleComprar = () => {
    if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho antes de comprar.");
      return;
    }
    
    if (!cep || cep.trim() === '') {
      alert("Por favor, informe seu CEP para calcularmos o frete.");
      return;
    }

    const numeroWhatsApp = "5511932530679";
    
    let infoFrete = freteSelecionado 
      ? `\n*Valor do Frete:* R$ ${freteSelecionado.valor.toFixed(2).replace('.', ',')} (${freteSelecionado.tipo} para ${freteSelecionado.local})`
      : `\n*Meu CEP:* ${cep} (Frete não calculado na página)`;

    const textoMensagem = `Olá! Tenho interesse em comprar o seguinte produto:
    
*Modelo:* ${produto.name}
*Tamanho:* ${tamanhoSelecionado}
*Quantidade:* ${quantidade}
*Preço Unitário:* R$ ${produto.price}${infoFrete}

Gostaria de prosseguir com o pagamento.`;

    const textoCodificado = encodeURIComponent(textoMensagem);
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`, '_blank');
  };

  if (loading || !produto) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="page-produto">
      <main className="produto-container">
        
        {/* Imagens do Produto (Esquerda) */}
        <div className="produto-galeria">
          <div className="miniaturas">
            <img src={produto.image} alt="Thumb 1" className="miniatura ativa" />
            <img src={produto.image} alt="Thumb 2" className="miniatura" />
            <img src={produto.image} alt="Thumb 3" className="miniatura" />
            <div className="scroll-arrows">
              <button>&#708;</button>
              <button>&#709;</button>
            </div>
          </div>
          <div className="imagem-principal">
            <span className="badge-desconto">{produto.status}</span>
            <img src={produto.image} alt={produto.name} />
          </div>
        </div>

        {/* Informações do Produto (Direita) */}
        <div className="produto-detalhes">
          <div className="produto-breadcrumb">
            {produto.category} <strong>{produto.name}</strong>
          </div>
          
          <h1 className="produto-titulo">{produto.name}</h1>
          
          <div className="produto-precos">
            <span className="preco-atual">R${produto.price}</span>
            {produto.oldPrice && <span className="preco-antigo">R${produto.oldPrice}</span>}
          </div>
          
          <p className="produto-parcelamento">12x de R$30,52</p>
          <p className="combinado-aviso">Pode ser combinado com qualquer produto da loja.</p>

          {/* Seletor de Tamanho */}
          <div className="produto-tamanhos">
            <span className="tamanho-label">Tamanho</span>
            <div className="tamanhos-grid">
              {['PP', 'P', 'M', 'G', 'GG'].map(size => (
                <button 
                  key={size} 
                  className={`btn-tamanho ${tamanhoSelecionado === size ? 'selecionado' : ''}`}
                  onClick={() => setTamanhoSelecionado(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Calculador de Frete */}
          <div className="produto-cep-container">
            <span className="tamanho-label" style={{ marginBottom: '8px' }}>Calcular Frete e Prazo</span>
            <div className="frete-input-group">
              <input 
                type="text" 
                placeholder="00000-000" 
                className="frete-input"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                maxLength="9"
              />
              <button 
                onClick={handleCalcularFrete}
                className="btn-frete-ok"
              >
                {calculandoFrete ? '...' : 'OK'}
              </button>
            </div>
            
            {erroFrete && <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '8px' }}>{erroFrete}</p>}
            
            {opcoesFrete && (
              <div className="frete-resultado">
                <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '10px' }}>
                  Enviando para: <strong>{opcoesFrete[0].local}</strong>
                </p>
                {opcoesFrete.map((opcao, index) => (
                  <div 
                    key={index} 
                    onClick={() => setFreteSelecionado(opcao)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '10px', 
                      borderBottom: index === 0 ? '1px solid #222' : 'none',
                      cursor: 'pointer',
                      background: freteSelecionado?.tipo === opcao.tipo ? '#222' : 'transparent',
                      borderRadius: '4px',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="radio" 
                          checked={freteSelecionado?.tipo === opcao.tipo} 
                          onChange={() => setFreteSelecionado(opcao)}
                          style={{ accentColor: '#fff' }}
                        />
                        <strong style={{ fontSize: '13px' }}>{opcao.tipo}</strong>
                      </div>
                      <span style={{ fontSize: '11px', color: '#888', marginLeft: '22px' }}>Chega em até {opcao.prazo} dias úteis</span>
                    </div>
                    <span style={{ fontWeight: '700', fontSize: '14px' }}>
                      R$ {opcao.valor.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quantidade e Comprar */}
          <div className="produto-acoes">
            <div className="seletor-quantidade">
              <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))}>−</button>
              <input type="text" value={quantidade} readOnly />
              <button onClick={() => setQuantidade(quantidade + 1)}>+</button>
            </div>
            <button className="btn-comprar-black" onClick={handleComprar}>Comprar via WhatsApp</button>
          </div>

          {/* Accordions */}
          <div className="produto-accordions">
            <Accordion title="Meios de pagamento" defaultOpen={false}>
              <p>Cartão de crédito, Pix, Boleto.</p>
            </Accordion>
            <Accordion title="Meios de envio" defaultOpen={false}>
              <p>Correios, Transportadora.</p>
            </Accordion>
            <Accordion title="Descrição" defaultOpen={true}>
              <p>PRÉ VENDA {produto.name.toUpperCase()}</p>
              <p>Tamanho: <strong>{tamanhoSelecionado || 'Selecione um tamanho'}</strong></p>
            </Accordion>
          </div>
        </div>
      </main>

      {/* Produtos Relacionados */}
      <section className="produtos-relacionados">
        <h2 className="section-title-center">Produtos relacionados</h2>
        <div className="product-grid-center">
          {produtosIniciais.slice(2, 4).map(prod => (
             <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Quem viu este produto também viu */}
      <section className="produtos-vistos">
        <h2 className="section-title-center">Quem viu este produto também viu</h2>
        <div className="product-grid-scroller">
          {produtosIniciais.map(prod => (
             <ProductCard key={prod.id} product={prod} />
          ))}
          {produtosIniciais.map(prod => (
             <ProductCard key={prod.id + '_copy'} product={prod} />
          ))}
        </div>
      </section>

      {/* Floating Histórico (bottom right) */}
      {mostrarHistorico && (
        <div className="floating-historico-small">
          <div className="btn-historico" style={{ paddingRight: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
            </svg>
            <span style={{ cursor: 'pointer' }}>Histórico</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setMostrarHistorico(false); }} 
              style={{ 
                marginLeft: '5px', 
                background: '#e0e0e0', 
                border: 'none', 
                borderRadius: '50%', 
                width: '22px', 
                height: '22px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '14px', 
                color: '#333', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaProduto;
