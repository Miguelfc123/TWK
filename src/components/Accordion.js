import React, { useState } from 'react';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <button 
        className="accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
