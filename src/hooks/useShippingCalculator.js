import { useState } from 'react';

/**
 * Hook para calcular frete usando a API do Melhor Envio
 * 
 * Uso:
 * const { loading, error, options, calculateShipping } = useShippingCalculator();
 * 
 * await calculateShipping('12345678', [{ id: 'prod1', weight: 0.5, ... }]);
 */
export const useShippingCalculator = (apiBaseUrl = 'http://localhost:5000') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const [lastCalculation, setLastCalculation] = useState(null);

  const calculateShipping = async (destinationCep, products) => {
    setLoading(true);
    setError(null);
    setOptions(null);

    try {
      // Validações básicas
      if (!destinationCep || destinationCep.replace(/\D/g, '').length !== 8) {
        throw new Error('CEP inválido. Use um CEP com 8 dígitos.');
      }

      if (!products || products.length === 0) {
        throw new Error('Adicione pelo menos um produto para calcular o frete.');
      }

      // Fazer requisição à API
      const response = await fetch(`${apiBaseUrl}/api/shipping/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          destinationCep,
          products
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao calcular frete');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erro ao calcular frete');
      }

      setOptions(data.data);
      setLastCalculation({
        cep: destinationCep,
        timestamp: new Date().toISOString(),
        productCount: products.length
      });

      return data.data;

    } catch (err) {
      const errorMessage = err.message || 'Erro desconhecido ao calcular frete';
      setError(errorMessage);
      console.error('Erro no cálculo de frete:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearOptions = () => setOptions(null);

  return {
    loading,
    error,
    options,
    lastCalculation,
    calculateShipping,
    clearError,
    clearOptions
  };
};

export default useShippingCalculator;
