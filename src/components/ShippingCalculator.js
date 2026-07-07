import React, { useState } from 'react';
import useShippingCalculator from '../hooks/useShippingCalculator';

/**
 * Componente para calcular e exibir opções de frete
 * 
 * Props:
 * - products: Array de produtos para calcular frete
 * - onSelectShipping: Callback quando um frete é selecionado
 * - apiBaseUrl: URL base da API (padrão: http://localhost:5000)
 */
const ShippingCalculator = ({ 
  products = [], 
  onSelectShipping = null,
  apiBaseUrl = 'http://localhost:5000'
}) => {
  const [cep, setCep] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const { loading, error, options, calculateShipping, clearError } = useShippingCalculator(apiBaseUrl);

  const handleCalculate = async (e) => {
    e.preventDefault();
    clearError();

    if (!cep || cep.replace(/\D/g, '').length !== 8) {
      alert('Por favor, digite um CEP válido com 8 dígitos.');
      return;
    }

    if (products.length === 0) {
      alert('Adicione produtos ao carrinho antes de calcular o frete.');
      return;
    }

    try {
      await calculateShipping(cep, products);
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (onSelectShipping) {
      onSelectShipping(option);
    }
  };

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = (e) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
  };

  return (
    <div className="shipping-calculator">
      <div className="shipping-form">
        <h3>Calcular Frete</h3>
        <form onSubmit={handleCalculate}>
          <div className="form-group">
            <label htmlFor="cep">CEP de Entrega:</label>
            <input
              id="cep"
              type="text"
              placeholder="12345-678"
              value={cep}
              onChange={handleCepChange}
              maxLength="9"
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-calculate"
          >
            {loading ? 'Calculando...' : 'Calcular Frete'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <strong>Erro:</strong> {error}
          </div>
        )}
      </div>

      {options && options.length > 0 && (
        <div className="shipping-options">
          <h4>Opções de Frete Disponíveis:</h4>
          <div className="options-list">
            {options.map((option) => (
              <div
                key={option.id}
                className={`shipping-option ${selectedOption?.id === option.id ? 'selected' : ''}`}
                onClick={() => handleSelectOption(option)}
              >
                <div className="option-header">
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedOption?.id === option.id}
                    onChange={() => handleSelectOption(option)}
                  />
                  <div className="option-info">
                    <strong>{option.name}</strong>
                    <span className="carrier">({option.carrier})</span>
                  </div>
                </div>
                <div className="option-details">
                  <div className="delivery-time">
                    Entrega em até <strong>{option.custom_delivery_time} dias úteis</strong>
                  </div>
                  <div className="price">
                    R$ <strong>{option.custom_price.toFixed(2).replace('.', ',')}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {options && options.length === 0 && !loading && (
        <div className="no-options">
          <p>Nenhuma opção de frete disponível para este CEP.</p>
        </div>
      )}

      <style>{`
        .shipping-calculator {
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        .shipping-form h3 {
          margin-top: 0;
          color: #333;
          font-size: 18px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-group input:disabled {
          background-color: #f0f0f0;
          cursor: not-allowed;
        }

        .btn-calculate {
          width: 100%;
          padding: 12px;
          background-color: #000;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-calculate:hover:not(:disabled) {
          background-color: #333;
        }

        .btn-calculate:disabled {
          background-color: #999;
          cursor: not-allowed;
        }

        .error-message {
          margin-top: 15px;
          padding: 12px;
          background-color: #fee;
          border: 1px solid #fcc;
          border-radius: 4px;
          color: #c33;
          font-size: 14px;
        }

        .shipping-options {
          margin-top: 20px;
        }

        .shipping-options h4 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 16px;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .shipping-option {
          padding: 15px;
          border: 2px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          background-color: white;
        }

        .shipping-option:hover {
          border-color: #999;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .shipping-option.selected {
          border-color: #000;
          background-color: #f0f0f0;
        }

        .option-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
        }

        .option-header input[type="radio"] {
          margin-top: 4px;
          cursor: pointer;
        }

        .option-info {
          flex: 1;
        }

        .option-info strong {
          display: block;
          color: #333;
          font-size: 14px;
        }

        .carrier {
          display: block;
          color: #999;
          font-size: 12px;
          margin-top: 4px;
        }

        .option-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 32px;
          font-size: 14px;
        }

        .delivery-time {
          color: #666;
        }

        .price {
          font-weight: 600;
          color: #000;
          font-size: 16px;
        }

        .no-options {
          margin-top: 15px;
          padding: 15px;
          background-color: #fff3cd;
          border: 1px solid #ffc107;
          border-radius: 4px;
          color: #856404;
          text-align: center;
        }

        @media (max-width: 600px) {
          .shipping-calculator {
            padding: 15px;
          }

          .option-details {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ShippingCalculator;
