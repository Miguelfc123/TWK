import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);



  const isHome = window.location.pathname === '/';

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="product-card-link">
        <div 
          className={`product-image-container${isHovered && isHome ? ' hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="hover-tag">COMPRAR MAIS, PAGAR MENOS</span>
          <img
            src={product.image}
            alt={product.name}
            className={`product-image product-image-default${isHovered && isHome && (product.hoverImage || product.cardImage) ? ' hide' : ''}`}
            style={product.imageScale ? { transform: `translate(-50%, -50%) scale(${product.imageScale})` } : {}}
          />
          {(product.hoverImage || product.cardImage) && isHome && (
            <img
              src={product.hoverImage || product.cardImage}
              alt={`${product.name} hover`}
              className={`product-image product-image-hover${isHovered && isHome ? ' show' : ''}`}
            />
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name.toUpperCase()}</h3>
          <div className="product-price-container">
            <span className="product-price">R${product.price}</span>
            {product.oldPrice && product.oldPrice !== '' && (
              <span className="product-old-price">R${product.oldPrice}</span>
            )}
          </div>
          <button className="btn-comprar">COMPRAR</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
