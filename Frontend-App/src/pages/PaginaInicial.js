import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import MixMatch from '../components/MixMatch';

function PaginaInicial() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  const formatarTempo = (isoString) => {
    const diff = (new Date() - new Date(isoString)) / 1000;
    if (diff < 60) return "Agora mesmo";
    if (diff < 3600) return `Há ${Math.floor(diff / 60)} minuto(s)`;
    if (diff < 86400) return `Há ${Math.floor(diff / 3600)} hora(s)`;
    return `Há ${Math.floor(diff / 86400)} dia(s)`;
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
          { id: 1, name: 'Camiseta', price: '29,90', image: process.env.PUBLIC_URL + '/imagens/camisa/buda_carrosel.png', category: 'camiseta' },
          { id: 2, name: 'Calça', price: '99,90', image: process.env.PUBLIC_URL + '/imagens/calca/CalçaPreta.png', category: 'calça' },
          { id: 3, name: 'Tênis', price: '149,90', image: process.env.PUBLIC_URL + '/imagens/tenis/95Neon.png', category: 'tênis' },
          { id: 4, name: 'Boné', price: '49,90', image: process.env.PUBLIC_URL + '/imagens/boné/boneGucciPreto.png', category: 'boné' },
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
      <MixMatch />
      
      <div className="produtos-section">
        <h2>{searchTerm ? `Resultados para: ${searchTerm}` : 'Nossos Produtos'}</h2>
        
        <div className="produtos-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
      
      {historico.length > 0 && (
        <div className="floating-historico">
          <div className="historico-header">RECENTEMENTE VISTOS</div>
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
