import React from 'react';

const TopBanner = () => {
  const content = (
    <div className="marquee-group">
      <span>AS PEÇAS MAIS BARATAS DA CENA!  </span>
      <span>ENVIOS RÁPIDOS PARA TODO BRASIL  </span>
      <span>AS PEÇAS MAIS BARATAS DA CENA!  </span>
      <span>ENVIOS RÁPIDOS PARA TODO BRASIL  </span>
      <span>AS PEÇAS MAIS BARATAS DA CENA!  </span>
      <span>ENVIOS RÁPIDOS PARA TODO BRASIL  </span>
      <span>ENVIOS RÁPIDOS PARA TODO BRASIL  </span>
      <span>AS PEÇAS MAIS BARATAS DA CENA!  </span>
      <span>ENVIOS RÁPIDOS PARA TODO BRASIL  </span>
    </div>
  );

  return (
    <div className="top-banner">
      <div className="marquee-content">
        {content}
        {content}
      </div>
    </div>
  );
};

export default TopBanner;
