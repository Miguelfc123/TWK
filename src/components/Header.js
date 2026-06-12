import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sincroniza o input com o parâmetro da URL (ex: ao voltar no navegador)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    setSearchTerm(search);
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Se limpar a barra, volta ao normal imediatamente
    if (value === '') {
      navigate('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-top-row">
        <div className="header-left">
          {/* Left side actions (optional) */}
        </div>

        <div className="logo-center">
          <Link 
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img 
              src="/logo.transp.png" 
              alt="FIOTI Logo" 
              className="logo-img"
            />
          </Link>
        </div>
        
        <div className="header-actions">
          <form className={`search-bar ${searchOpen ? 'open' : ''}`} onSubmit={handleSearch}>
            <input 
              id="header-search-input"
              type="text" 
              placeholder="O que você está buscando?" 
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => { if(!searchTerm) setSearchOpen(false) }}
            />
            <button 
              type={searchOpen && searchTerm ? "submit" : "button"} 
              className="search-btn" 
              onClick={() => {
                setSearchOpen(true);
                document.getElementById('header-search-input')?.focus();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </form>
          <button className="cart-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <span className="cart-count">0</span>
          </button>
        </div>
      </div>

      <nav className="main-nav-centered">
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><a href="https://wa.me/5511932530679?text=Ol%C3%A1%21%20Gostaria%20de%20falar%20com%20o%20suporte.%20Preciso%20de%20ajuda%20com%20um%20pedido%20ou%20tirar%20uma%20d%C3%BAvida." target="_blank" rel="noopener noreferrer">CONTATO E SUPORTE</a></li>
          <li><a href="https://wa.me/5511932530679?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20uma%20troca%20ou%20devolu%C3%A7%C3%A3o%20de%20um%20pedido." target="_blank" rel="noopener noreferrer">TROCA E DEVOLUÇÃO</a></li>
          <li><a href="https://www.instagram.com/twk.club/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
