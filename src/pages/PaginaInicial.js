import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import MixMatch from '../components/MixMatch';
import headerImg from '../assets/images/header.png';

function PaginaInicial() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(true);
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  });
  const searchTerm = searchParams.get('search');

  const formatarTempo = (isoString) => {
    const diff = (new Date() - new Date(isoString)) / 1000;
    if (diff < 60) return "Agora mesmo";
    if (diff < 3600) return `Há ${Math.floor(diff / 60)} minuto(s)`;
    if (diff < 86400) return `Há ${Math.floor(diff / 3600)} hora(s)`;
    return `Há ${Math.floor(diff / 86400)} dia(s)`;
  };

  const calcularCountdown = () => {
    const dataAlvo = new Date('2026-07-07T00:00:00').getTime();
    const agora = new Date().getTime();
    const diferenca = dataAlvo - agora;

    if (diferenca > 0) {
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

      setCountdown({ dias, horas, minutos, segundos });
    }
  };

  useEffect(() => {
    // Carregue os produtos aqui (você pode usar uma API ou dados locais)
    const loadProducts = async () => {
      try {
        // Substitua isso pela sua fonte de dados real
        // const response = await fetch('/api/products');
        // const data = await response.json();
        // setProducts(data);
        
        // Dados de exemplo
        setProducts([
          {
            id: 1,
            name: 'Buda',
            price: '75,00',
            oldPrice: '100,00',
            image: process.env.PUBLIC_URL + '/imagens/camisa/buda_carrosel.png',
            category: 'camiseta',
          },
          {
            id: 3,
            name: 'More Money Azul',
            price: '75,00',
            oldPrice: '100,00',
            image: process.env.PUBLIC_URL + '/imagens/camisa/twk_azul_carrosel.png',
            category: 'camiseta',
            imageScale: 0.7,
          },
          {
            id: 4,
            name: 'More Money Vermelha',
            price: '75,00',
            oldPrice: '100,00',
            image: process.env.PUBLIC_URL + '/imagens/camisa/twk_vermelha_carrosel.png',
            category: 'camiseta',
            imageScale: 0.7,
          },
          {
            id: 5,
            name: 'Swag',
            price: '75,00',
            oldPrice: '100,00',
            image: process.env.PUBLIC_URL + '/imagens/camisa/SwagCarrosel.png',
            category: 'camiseta',
          },
          {
            id: 6,
            name: 'TheEyes',
            price: '75,00',
            oldPrice: '',
            image: process.env.PUBLIC_URL + '/imagens/camisa/theEyesCarrosel.png',
            category: 'camiseta',
          },
        ]);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    loadProducts();

    const loadHistory = () => {
      const visited = JSON.parse(localStorage.getItem('visitedProducts')) || [];
      setHistorico(visited.slice(0, 2));
    };
    
    loadHistory();
    // Atualizar tempo a cada minuto
    const intervalId = setInterval(loadHistory, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    calcularCountdown();
    const intervalId = setInterval(calcularCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  return (
    <div className="pagina-inicial">

      {/* Hero Banner */}
      <section className="hero-banner" style={{ backgroundImage: `url(${headerImg})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">BEM-VINDO À TWK</h1>
            <p className="hero-subtitle">
              O primeiro drop da TWK está chegando rpzd. <br />
              Fique atento à contagem regressiva pro lançamento da TWK.
            </p>
            <div className="hero-buttons">
              <button className="hero-btn hero-btn-outline" onClick={() => document.querySelector('.mix-match-container')?.scrollIntoView({ behavior: 'smooth' })}>
                MONTE SEU KIT
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="countdown-container">
          <h2>CONTAGEM REGRESSIVA PARA 07/07/26</h2>
          <div className="countdown-display">
            <div className="countdown-item">
              <span className="countdown-number">{countdown.dias}</span>
              <span className="countdown-label">DIAS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{countdown.horas}</span>
              <span className="countdown-label">HORAS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{countdown.minutos}</span>
              <span className="countdown-label">MINUTOS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{countdown.segundos}</span>
              <span className="countdown-label">SEGUNDOS</span>
            </div>
          </div>
        </div>
      </section>

      <MixMatch />
      
      {mostrarHistorico && historico.length > 0 && (
        <div className="floating-historico">
          <div className="historico-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>RECENTEMENTE VISTOS</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setMostrarHistorico(false); }} 
              style={{ 
                background: '#333', 
                border: 'none', 
                borderRadius: '50%', 
                width: '22px', 
                height: '22px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '14px', 
                color: '#fff', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              &times;
            </button>
          </div>
          {historico.map((item, index) => (
            <div key={index} className="historico-item">
              <div className="hist-img" style={{ width: '60px', height: '80px', minWidth: '60px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className="hist-info">
                <span className="hist-price">R$ {item.price}</span>
                <span className="hist-name">{item.name.substring(0, 20)}{item.name.length > 20 ? '...' : ''}</span>
                <span className="hist-time">{formatarTempo(item.visitedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaginaInicial;
