import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PaginaInicial from './pages/PaginaInicial';
import PaginaProduto from './pages/PaginaProduto';
import Header from './components/Header';
import TopBanner from './components/TopBanner';
import Footer from './components/Footer';
import './assets/css/styles.css';
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isSearching = new URLSearchParams(location.search).has('search');

  return (
    <div className="App">
      <Header />
      {!isSearching && <TopBanner />}
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/produto/:id" element={<PaginaProduto />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;