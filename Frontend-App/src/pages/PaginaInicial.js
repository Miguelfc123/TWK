import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import MixMatch from '../components/MixMatch';

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
          { id: 1, name: 'Camiseta', price: '29.90', image: '/imagens/camisa/buda_carrosel.png', category: 'camiseta' },
          { id: 2, name: 'Calça', price: '99.90', image: '/imagens/calca/CalçaPreta.png', category: 'calça' },
          { id: 3, name: 'Tênis', price: '149.90', image: '/imagens/tenis/tenis1.jpg', category: 'tênis' },
          { id: 4, name: 'Boné', price: '49.90', image: '/imagens/boné/boneGucciPreto.png', category: 'boné' },
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
    </div>
  );
}

export default PaginaInicial;
