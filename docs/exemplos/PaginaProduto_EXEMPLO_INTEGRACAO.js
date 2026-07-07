/**
 * EXEMPLO DE INTEGRAÇÃO COM MELHOR ENVIO
 * 
 * Este arquivo mostra como integrar o componente ShippingCalculator
 * ao arquivo PaginaProduto.js existente.
 * 
 * Passos:
 * 1. Importe o componente ShippingCalculator no topo do arquivo
 * 2. Adicione um estado para armazenar o frete selecionado
 * 3. Inclua o componente no JSX onde desejar exibir o cálculo de frete
 * 4. Atualize a função handleComprar para incluir informações do frete
 */

// ============================================
// 1. ADICIONE ESTA IMPORTAÇÃO NO TOPO DO ARQUIVO
// ============================================

import ShippingCalculator from '../components/ShippingCalculator';

// ============================================
// 2. ADICIONE ESTE ESTADO NO COMPONENTE
// ============================================

// Dentro da função PaginaProduto(), após os outros useState:
const [freteRealSelecionado, setFreteRealSelecionado] = useState(null);

// ============================================
// 3. ADICIONE ESTA FUNÇÃO PARA LIDAR COM SELEÇÃO DE FRETE
// ============================================

const handleFreteRealSelecionado = (opcaoFrete) => {
  setFreteRealSelecionado(opcaoFrete);
  console.log('Frete selecionado via Melhor Envio:', opcaoFrete);
};

// ============================================
// 4. ADICIONE ESTE COMPONENTE NO JSX
// ============================================

// Adicione em algum lugar apropriado no JSX, por exemplo, após o input de CEP:

<div className="frete-section">
  <h3>Calcular Frete com Melhor Envio</h3>
  <ShippingCalculator 
    products={[
      {
        id: produto.id,
        width: 15,
        height: 10,
        length: 20,
        weight: 0.5,
        insurance_value: parseFloat(produto.price.replace(',', '.')),
        quantity: quantidade
      }
    ]}
    onSelectShipping={handleFreteRealSelecionado}
    apiBaseUrl="http://localhost:5000"
  />
</div>

// ============================================
// 5. ATUALIZE A FUNÇÃO handleComprar
// ============================================

const handleComprar = () => {
  if (!tamanhoSelecionado) {
    alert("Por favor, selecione um tamanho antes de comprar.");
    return;
  }

  // Use o frete real se disponível, caso contrário use o CEP informado
  let infoFrete = '';
  
  if (freteRealSelecionado) {
    infoFrete = `\n*Opção de Frete:* ${freteRealSelecionado.name}
*Transportadora:* ${freteRealSelecionado.carrier}
*Valor do Frete:* R$ ${freteRealSelecionado.custom_price.toFixed(2).replace('.', ',')}
*Prazo de Entrega:* ${freteRealSelecionado.custom_delivery_time} dias úteis`;
  } else if (cep && cep.trim() !== '') {
    infoFrete = `\n*CEP informado:* ${cep}`;
  } else {
    alert("Por favor, calcule o frete antes de comprar.");
    return;
  }

  const numeroWhatsApp = "5511932530679";
  const textoMensagem = `Olá! Tenho interesse em comprar o seguinte produto:
*Modelo:* ${produto.name}
*Tamanho:* ${tamanhoSelecionado}
*Quantidade:* ${quantidade}
*Preço Unitário:* R$ ${produto.price}${infoFrete}
Gostaria de prosseguir com o pagamento.`;

  const textoCodificado = encodeURIComponent(textoMensagem);
  window.open(`https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`, '_blank');
};

// ============================================
// 6. ADICIONE ESTILOS CSS (OPCIONAL)
// ============================================

// Adicione ao seu arquivo CSS ou em um <style> tag:

.frete-section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.frete-section h3 {
  margin-top: 0;
  color: #333;
  font-size: 18px;
}

// ============================================
// EXEMPLO COMPLETO DE INTEGRAÇÃO
// ============================================

/*
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Accordion from '../components/Accordion';
import ShippingCalculator from '../components/ShippingCalculator'; // NOVA IMPORTAÇÃO

function PaginaProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');
  const [cep, setCep] = useState('');
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [opcoesFrete, setOpcoesFrete] = useState(null);
  const [freteSelecionado, setFreteSelecionado] = useState(null);
  const [erroFrete, setErroFrete] = useState('');
  const [mostrarHistorico, setMostrarHistorico] = useState(true);
  const [freteRealSelecionado, setFreteRealSelecionado] = useState(null); // NOVO ESTADO

  // ... resto do código ...

  const handleFreteRealSelecionado = (opcaoFrete) => {
    setFreteRealSelecionado(opcaoFrete);
    console.log('Frete selecionado via Melhor Envio:', opcaoFrete);
  };

  const handleComprar = () => {
    if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho antes de comprar.");
      return;
    }

    let infoFrete = '';
    
    if (freteRealSelecionado) {
      infoFrete = `\n*Opção de Frete:* ${freteRealSelecionado.name}
*Transportadora:* ${freteRealSelecionado.carrier}
*Valor do Frete:* R$ ${freteRealSelecionado.custom_price.toFixed(2).replace('.', ',')}
*Prazo de Entrega:* ${freteRealSelecionado.custom_delivery_time} dias úteis`;
    } else if (cep && cep.trim() !== '') {
      infoFrete = `\n*CEP informado:* ${cep}`;
    } else {
      alert("Por favor, calcule o frete antes de comprar.");
      return;
    }

    const numeroWhatsApp = "5511932530679";
    const textoMensagem = `Olá! Tenho interesse em comprar o seguinte produto:
*Modelo:* ${produto.name}
*Tamanho:* ${tamanhoSelecionado}
*Quantidade:* ${quantidade}
*Preço Unitário:* R$ ${produto.price}${infoFrete}
Gostaria de prosseguir com o pagamento.`;

    const textoCodificado = encodeURIComponent(textoMensagem);
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`, '_blank');
  };

  return (
    <div>
      {/* ... resto do JSX ... */}
      
      <div className="frete-section">
        <h3>Calcular Frete com Melhor Envio</h3>
        <ShippingCalculator 
          products={[
            {
              id: produto?.id,
              width: 15,
              height: 10,
              length: 20,
              weight: 0.5,
              insurance_value: parseFloat(produto?.price.replace(',', '.') || 0),
              quantity: quantidade
            }
          ]}
          onSelectShipping={handleFreteRealSelecionado}
          apiBaseUrl="http://localhost:5000"
        />
      </div>

      {/* ... resto do JSX ... */}
    </div>
  );
}

export default PaginaProduto;
*/
