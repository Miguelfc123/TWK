import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import MixMatch from '../components/MixMatch';
import headerBg from '../assets/images/header.png';

// ── Produtos da seção principal ───────────────────────────────────
const produtosIniciais = [
  { id: 1, name: 'buda',                price: '75,00', oldPrice: '550,00', image: '/Cards/BudaCard.JPG',                status: 'COMPRAR MAIS, PAGAR MENOS' },
  { id: 3, name: 'more money azul',     price: '75,00', oldPrice: '323,00', image: '/Cards/TWkazulCard.jpg',     status: 'COMPRAR MAIS, PAGAR MENOS' },
  { id: 4, name: 'more money vermelha', price: '75,00', oldPrice: '149,90', image: '/Cards/TWkVermCard.jpg', status: 'COMPRAR MAIS, PAGAR MENOS' },
  { id: 5, name: 'swag',                price: '75,00', oldPrice: '149,90', image: '/Cards/SwagCard.JPG',                status: 'COMPRAR MAIS, PAGAR MENOS' },
  { id: 6, name: 'TheEyes',             price: '75,00', oldPrice: '',       image: '/Cards/theEyesCard.JPG',             status: 'COMPRAR MAIS, PAGAR MENOS' },
];

// ── Página principal ───────────────────────────────────────────────
function PaginaInicial() {
  const [historico, setHistorico] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const atualizarHistorico = () => {
      const visitedProducts = JSON.parse(localStorage.getItem('visitedProducts')) || [];
      setHistorico(visitedProducts);
    };
    
    atualizarHistorico();
    const intervalo = setInterval(atualizarHistorico, 500); // Atualiza a cada 500ms
    return () => clearInterval(intervalo);
  }, []);

  const formatarTempo = (isoString) => {
    if (!isoString) return 'Agora mesmo';
    const agora = new Date();
    const visitado = new Date(isoString);
    const diferenca = Math.floor((agora - visitado) / 1000);
    
    if (diferenca < 60) return 'Agora mesmo';
    if (diferenca < 3600) return `Há ${Math.floor(diferenca / 60)} minuto${Math.floor(diferenca / 60) > 1 ? 's' : ''}`;
    if (diferenca < 86400) return `Há ${Math.floor(diferenca / 3600)} hora${Math.floor(diferenca / 3600) > 1 ? 's' : ''}`;
    return `Há ${Math.floor(diferenca / 86400)} dia${Math.floor(diferenca / 86400) > 1 ? 's' : ''}`;
  };

  const produtosFiltrados = useMemo(() => {
    if (!search) return produtosIniciais;
    return produtosIniciais.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="page-home">
      <main className="main-content">

        {/* Seção Hero/Banner */}
        {!search && (
          <section className="hero-banner" style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${headerBg}) center 40% / cover no-repeat`,
            padding: '160px 40px',
            borderRadius: '12px',
            marginBottom: '60px',
            textAlign: 'center',
            border: '1px solid #333'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '900',
              marginBottom: '15px',
              letterSpacing: '3px'
            }}>BEM-VINDO À TWK</h1>
            <p style={{
              fontSize: '16px',
              color: '#aaa',
              marginBottom: '30px',
              maxWidth: '600px',
              margin: '0 auto 30px',
              lineHeight: '1.8'
            }}>
              Descubra nossa coleção exclusiva de roupas e acessórios. Cada peça é cuidadosamente selecionada para trazer estilo, conforto e qualidade ao seu guarda-roupa.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '12px 40px',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '30px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '14px',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.background = '#eee'} onMouseLeave={(e) => e.target.style.background = '#fff'}>
                EXPLORAR COLEÇÃO
              </button>
              <button style={{
                padding: '12px 40px',
                background: 'transparent',
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: '30px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '14px',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#000'; }} onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}>
                SAIBA MAIS AGORA
              </button>
            </div>
          </section>
        )}
        
        {/* Seção de Produtos */}
        <section className="products-section">
          <h2 className="section-title-center">
            {search ? `Resultados para: "${search}"` : 'Nossos Destaques'}
          </h2>
          <div className="product-grid">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <ProductCard key={produto.id} product={produto} />
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#888' }}>
                Nenhum produto encontrado.
              </div>
            )}
          </div>
        </section>

        {/* Seção Mix & Match */}
        {!search && (
          <section className="mix-match-section" style={{ marginTop: '40px' }}>
            <MixMatch />
          </section>
        )}
      </main>

      <div className="floating-historico">
        <h3 className="hist-title">RECENTEMENTE VISTOS</h3>
        {historico.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '12px' }}>Nenhum produto visualizado</div>
        ) : (
          historico.slice(0, 2).map((produto, idx) => (
            <div key={idx} className="historico-item">
              <div className="hist-img"><img src={produto.image} alt={produto.name} /></div>
              <div className="hist-info">
                <span className="hist-price">R$ {produto.price}</span>
                <span className="hist-name">{produto.name}</span>
                <span className="hist-time">{formatarTempo(produto.visitedAt)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PaginaInicial;
