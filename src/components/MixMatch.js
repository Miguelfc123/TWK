import React, { useState } from 'react';

const categories = [
  {
    id: 'hat',
    name: 'Boné',
    items: [
      { id: 1, name: 'Boné Gucci Preto', img: process.env.PUBLIC_URL + '/imagens/boné/boneGucciPreto.png', price: 120, translateY: 10 },
      { id: 2, name: 'Boné Gucci Marrom', img: process.env.PUBLIC_URL + '/imagens/boné/boneGucciMarrom.png', price: 120, translateY: 10 },
      { id: 3, name: 'Boné Gucci Rosa', img: process.env.PUBLIC_URL + '/imagens/boné/boneGucciRosa.png', price: 120, translateY: 10 },
      { id: 4, name: 'Touca Cinza', img: process.env.PUBLIC_URL + '/imagens/boné/tocacinza.png', price: 80, scale: 0.6, translateY: 10 },
      { id: 5, name: 'Touca Olho', img: process.env.PUBLIC_URL + '/imagens/boné/toucaOlho.png', price: 80, scale: 0.9, translateY: 10 },
    ]
  },
  {
    id: 'shirt',
    name: 'Camisa',
    items: [
      { id: 1, name: 'Camisa Buda', img: process.env.PUBLIC_URL + '/imagens/camisa/buda_carrosel.png', price: 75, scale: 1.4 },
      { id: 5, name: 'Camisa Swag', img: process.env.PUBLIC_URL + '/imagens/camisa/SwagCarrosel.png', price: 75, scale: 1.4, translateY: -15, translateX: 0 },
      { id: 6, name: 'Camisa TheEyes', img: process.env.PUBLIC_URL + '/imagens/camisa/theEyesCarrosel.png', price: 75, scale: 1.4 },
      { id: 3, name: 'Camisa TWK Azul', img: process.env.PUBLIC_URL + '/imagens/camisa/twk_azul_carrosel.png', price: 75, scale: 1.1 },
      { id: 4, name: 'Camisa TWK Vermelha', img: process.env.PUBLIC_URL + '/imagens/camisa/twk_vermelha_carrosel.png', price: 75, scale: 1.1 },
      { id: 7, name: 'Blusa Preta', img: process.env.PUBLIC_URL + '/imagens/camisa/blusaPreta.png', price: 180, scale: 0.9, translateY: -20 },
    ]
  },
  {
    id: 'pants',
    name: 'Calça',
    items: [
      { id: 5, name: 'Calça Preta', img: process.env.PUBLIC_URL + '/imagens/calca/CalçaPreta.png', price: 200, scale: 1.2, translateY: 0 },
      { id: 6, name: 'Calça Cinza', img: process.env.PUBLIC_URL + '/imagens/calca/calçaCinza.png', price: 200, scale: 1.2, translateY: 0 },
      { id: 7, name: 'Calça Flare Preta', img: process.env.PUBLIC_URL + '/imagens/calca/calçaFlarePreta.png', price: 220, scale: 1.3, translateY: -10 },
      { id: 8, name: 'Calça Flare Cinza', img: process.env.PUBLIC_URL + '/imagens/calca/calçaFlareCinza.png', price: 220, scale: 1.1, translateY: -10 },
      { id: 9, name: 'Calça Moletom', img: process.env.PUBLIC_URL + '/imagens/calca/moletomCalça.png', price: 180, scale: 1.1, translateY: -10 },
      { id: 1, name: 'Jorts Cinza', img: process.env.PUBLIC_URL + '/imagens/calca/jortsCinza.png', price: 150, scale: 1.4, translateY: -20 },
      { id: 2, name: 'Jorts Preto', img: process.env.PUBLIC_URL + '/imagens/calca/jortsPreto.png', price: 150, scale: 1.4, translateY: -20 },
      { id: 3, name: 'Short Moletom', img: process.env.PUBLIC_URL + '/imagens/calca/shortMoletom.png', price: 130, scale: 1.0, translateY: -20 },
      { id: 4, name: 'Short Flor', img: process.env.PUBLIC_URL + '/imagens/calca/shortflor.png', price: 130, scale: 1.0, translateY: -20 },
    ]
  },
  {
    id: 'shoes',
    name: 'Tênis',
    items: [
      { id: 1, name: 'Tênis 95 Neon', img: process.env.PUBLIC_URL + '/imagens/tenis/95Neon.png', price: 450, scale: 1.1, translateY: -30 },
      { id: 2, name: 'Tênis 95 Preto', img: process.env.PUBLIC_URL + '/imagens/tenis/95preto.png', price: 450, scale: 0.9, translateY: -30 },
      { id: 3, name: 'Tênis DN', img: process.env.PUBLIC_URL + '/imagens/tenis/dn.png', price: 450, scale: 1, translateY: -30 },
      { id: 4, name: 'Tênis Skepta Azul', img: process.env.PUBLIC_URL + '/imagens/tenis/skepta_azul.png', price: 450, scale: 1.2, translateY: -40 },
      { id: 5, name: 'Tênis Skepta Vermelho', img: process.env.PUBLIC_URL + '/imagens/tenis/skepta_vermelho.png', price: 450, scale: 1.2, translateY: -30 },
      { id: 6, name: 'Tênis Tailwind', img: process.env.PUBLIC_URL + '/imagens/tenis/tailwind.png', price: 450, scale: 1.2, translateY: -30 },
      { id: 7, name: 'Tênis TNCPb', img: process.env.PUBLIC_URL + '/imagens/tenis/TNCPb.png', price: 450, scale: 1.1, translateY: -30 },
      { id: 8, name: 'Nike Shox P', img: process.env.PUBLIC_URL + '/imagens/tenis/NikeShoxP.png', price: 480, scale: 0.9, translateY: -30 },
      { id: 9, name: 'Corteiz Verde', img: process.env.PUBLIC_URL + '/imagens/tenis/CorteizVerde.png', price: 480, scale: 0.9, translateY: -30 },
      { id: 10, name: 'Air Force 1', img: process.env.PUBLIC_URL + '/imagens/tenis/af1.png', price: 400, scale: 0.9, translateY: -30 },
      { id: 11, name: 'Ryder Slide', img: process.env.PUBLIC_URL + '/imagens/tenis/RyderSlide.png', price: 200, scale: 0.8, translateY: 0 },
    ]
  }
];

function MixMatch() {
  const [indices, setIndices] = useState({ hat: 0, shirt: 0, pants: 0, shoes: 0 });

  const nextItem = (catId) => {
    const cat = categories.find(c => c.id === catId);
    setIndices(prev => ({
      ...prev,
      [catId]: (prev[catId] + 1) % cat.items.length
    }));
  };

  const prevItem = (catId) => {
    const cat = categories.find(c => c.id === catId);
    setIndices(prev => ({
      ...prev,
      [catId]: (prev[catId] - 1 + cat.items.length) % cat.items.length
    }));
  };

  return (
    <div className="mix-match-container">
      <h2 className="mix-match-title">Monte seu kit</h2>
      <div className="mix-match-stack">
        {categories.map(cat => (
          <div key={cat.id} className={`mix-match-row row-${cat.id}`}>
            <button className="nav-btn prev" onClick={() => prevItem(cat.id)}>
              <svg viewBox="0 0 24 24" width="24" height="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" /></svg>
            </button>
            <div className="item-display" key={`display-${cat.id}-${indices[cat.id]}`}>
              <img
                src={cat.items[indices[cat.id]].img}
                alt={cat.items[indices[cat.id]].name}
                style={{
                  transform: `scale(${cat.items[indices[cat.id]].scale || 1}) translate(${cat.items[indices[cat.id]].translateX || 0}px, ${cat.items[indices[cat.id]].translateY || 0}px) translateZ(0)`,
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
            <button className="nav-btn next" onClick={() => nextItem(cat.id)}>
              <svg viewBox="0 0 24 24" width="24" height="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MixMatch;
