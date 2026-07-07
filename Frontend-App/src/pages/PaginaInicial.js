import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import MixMatch from '../components/MixMatch';
import headerImg from '../assets/images/header.png';

function PaginaInicial() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

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
            hoverImage: process.env.PUBLIC_URL + '/Cards/buda-hover.jpg',
            category: 'camiseta',
          },
          {
            id: 3,
            name: 'More Money Azul',
            price: '75,00',
            oldPrice: '100,00',
            image: process.env.PUBLIC_URL + '/imagens/camisa/twk_azul_carrosel.png',
            hoverImage: process.env.PUBLIC_URL + '/Cards/more-money-azul-hover.jpg',
            category: 'camiseta',
            imageScale: 0.7,
          },
          {
            id: 4,
            name: 'More Money Vermelha',
            price: '75,00',
            oldPrice: '100,00',
            image: process.env.PUBLIC_URL + '/imagens/camisa/twk_vermelha_carrosel.png',
            hoverImage: process.env.PUBLIC_URL + '/Cards/more-money-vermelha-hover.jpg',
            category: 'camiseta',
            imageScale: 0.7,
          },
          {
            id: 5,
            name: 'Swag',
            price: '75,00',
            oldPrice: '100,00',
            image: process.env.PUBLIC_URL + '/imagens/camisa/SwagCarrosel.png',
            hoverImage: process.env.PUBLIC_URL + '/Cards/swag-hover.jpg',
            category: 'camiseta',
            imageScale: 0.75,
          },
          {
            id: 6,
            name: 'TheEyes',
            price: '75,00',
            oldPrice: '',
            image: process.env.PUBLIC_URL + '/imagens/camisa/theEyesCarrosel.png',
            hoverImage: process.env.PUBLIC_URL + '/Cards/theeyes-hover.jpg',
            category: 'camiseta',
            imageScale: 0.8,
          },
        ]);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    loadProducts();
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
              Descubra nossa coleção exclusiva de roupas e acessórios. Cada peça é<br />
              cuidadosamente selecionada para trazer estilo, conforto e qualidade ao seu<br />
              guarda-roupa.
            </p>
            <div className="hero-buttons">
              <button className="hero-btn hero-btn-outline" onClick={() => document.querySelector('.produtos-section')?.scrollIntoView({ behavior: 'smooth' })}>
                EXPLORAR COLEÇÃO
              </button>
            </div>
          </div>
        </div>
      </section>

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

      <MixMatch />
    </div>
  );
}

export default PaginaInicial;
