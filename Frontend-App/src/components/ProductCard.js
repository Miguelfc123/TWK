import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <span className="hover-tag">COMPRAR MAIS, PAGAR MENOS</span>
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price-container">
            <span className="product-price">R${product.price}</span>
            {product.oldPrice && (
              <span className="product-old-price">R${product.oldPrice}</span>
            )}
          </div>
          <p className="product-installments">12x de R${(parseFloat(product.price.replace(',', '.')) / 12).toFixed(2).replace('.', ',')}</p>
          <button className="btn-comprar">Comprar</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
