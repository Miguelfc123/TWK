# TWK Store - Frontend

Aplicação React moderna com Tailwind CSS para uma loja de roupas com simulador de frete integrado.

## Funcionalidades

- Catálogo de produtos com design moderno
- Páginas de produto individuais com visual responsivo
- Simulador de frete com Entrega Fácil API
- Interface totalmente responsiva e moderna
- Animações suaves e transições elegantes

## Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento
- **CRACO** - Configuração Create React App
- **Entrega Fácil API** - Cálculo de frete

## Design System

O projeto utiliza um design system moderno com:

- **Cores**: Gradientes roxo-azul para elementos principais
- **Tipografia**: Fontes sans-serif modernas
- **Espaçamento**: Sistema de espaçamento consistente
- **Componentes**: Cards elevados com sombras suaves
- **Animações**: Hover effects e transições suaves
- **Responsividade**: Design mobile-first

## Configuração da API Correios

Para usar o cálculo de frete dos Correios:

1. O cálculo será feito via o serviço oficial dos Correios.
2. Configure no arquivo `.env`:
   ```env
   REACT_APP_CORREIOS_CEP_ORIGEM=01001-000
   ```

> Observação: o navegador pode bloquear requisições diretas aos Correios por CORS.
> Por isso a aplicação usa um proxy público para desenvolvimento.


## Desenvolvimento Local

```bash
npm install
npm start
```

A aplicação será executada em http://localhost:3000

## Build de Produção

```bash
npm run build
```

## Deploy

### Vercel

1. Faça push do código para Git
2. Conecte ao Vercel
3. Configure build command: `npm run build`
4. Deploy automático

### Netlify

1. Faça push do código para Git
2. Conecte ao Netlify
3. Configure build command: `npm run build`
4. Deploy automático

## Estrutura do Projeto

```
Frontend-App/
├── src/
│   ├── assets/css/
│   │   └── styles.css          # Configuração Tailwind + estilos customizados
│   ├── components/
│   │   └── Header.js           # Header responsivo com Tailwind
│   ├── pages/
│   │   ├── PaginaInicial.js    # Página inicial com grid de produtos
│   │   └── PaginaProduto.js    # Página de produto com simulador de frete
│   ├── app.js                  # Componente principal da aplicação
│   └── index.js                # Ponto de entrada React
├── public/
│   ├── index.html
│   ├── _redirects             # Configuração SPA para Netlify
│   └── assets/images/         # Imagens dos produtos
├── tailwind.config.js         # Configuração Tailwind CSS
├── craco.config.js           # Configuração CRACO
├── package.json
└── README.md
```

## Classes Tailwind Utilizadas

### Layout e Containers
- `min-h-screen` - Altura mínima da tela
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` - Container responsivo
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` - Grid responsivo

### Cores e Background
- `bg-gradient-to-r from-purple-600 to-blue-600` - Gradiente header
- `bg-gray-50` - Background claro
- `bg-white` - Cards brancos

### Espaçamento
- `p-6`, `py-8`, `px-4` - Padding consistente
- `mb-4`, `mt-6` - Margens
- `space-y-6` - Espaçamento vertical entre elementos

### Tipografia
- `text-3xl font-bold` - Títulos grandes
- `text-xl md:text-2xl` - Textos responsivos
- `text-blue-600` - Cores de destaque

### Componentes Interativos
- `hover:scale-105 transition-transform duration-300` - Efeitos hover
- `shadow-lg hover:shadow-xl` - Sombras dinâmicas
- `rounded-xl` - Bordas arredondadas

## Personalização

Para personalizar o design:

1. **Cores**: Edite `tailwind.config.js` para adicionar cores customizadas
2. **Componentes**: Modifique as classes Tailwind nos componentes
3. **Responsividade**: Ajuste breakpoints conforme necessário
4. **Animações**: Adicione ou modifique transições CSS

O Tailwind CSS permite iteração rápida e consistente no design da aplicação.

1. Instale as dependências:
   ```
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

3. Acesse a aplicação em seu navegador:
   ```
   http://localhost:3000
   ```

## Próximos Passos

- Implementação de páginas adicionais (Produtos, Ofertas, Contato)
- Integração com backend para dados dinâmicos
- Implementação de carrinho de compras funcional
- Sistema de busca de produtos

## Licença

Este projeto está sob a licença ISC.