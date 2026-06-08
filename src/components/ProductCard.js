import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const priceNum = parseFloat(product.price.replace(',', '.'));
  const installment = (priceNum / 12).toFixed(2).replace('.', ',');

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <span className="hover-tag">COMPRAR MAIS, PAGAR MENOS</span>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            style={product.imageScale ? { transform: `scale(${product.imageScale})` } : {}}
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name.toUpperCase()}</h3>
          <div className="product-price-container">
            <span className="product-price">R${product.price}</span>
            {product.oldPrice && product.oldPrice !== '' && (
              <span className="product-old-price">R${product.oldPrice}</span>
            )}
          </div>
          <p className="product-installments">12x de R${installment}</p>
          <button className="btn-comprar">COMPRAR</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
