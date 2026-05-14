# Projeto Demo

Este projeto é uma aplicação web com frontend em React e backend em Spring Boot.

## Estrutura do Projeto

### Frontend (Frontend-App)

- **assets**: Contém arquivos estáticos como imagens e CSS
- **components**: Componentes React reutilizáveis
  - **layout**: Componentes de layout como cabeçalho e rodapé
  - **produtos**: Componentes relacionados a produtos
- **context**: Contextos React para gerenciamento de estado
- **hooks**: Hooks personalizados
- **pages**: Páginas da aplicação
- **services**: Serviços para comunicação com o backend

### Backend (src)

- **main/java/com/example/demo**
  - **controller**: Controladores REST
  - **service**: Serviços de negócio
  - **repository**: Repositórios para acesso a dados
  - **model**: Modelos de dados/entidades
  - **dto**: Objetos de transferência de dados
  - **config**: Configurações da aplicação
  - **exception**: Classes de exceção personalizadas
  - **util**: Classes utilitárias

## Como Executar

### Pré-requisitos

- Node.js e npm
- Java 17
- Maven

### Instalação

1. Clone o repositório
2. Instale as dependências do backend: `mvn install`
3. Instale as dependências do frontend: `cd Frontend-App && npm install`
4. Instale as dependências do projeto raiz: `npm install`

### Execução

- Para executar apenas o frontend: `npm run start:frontend`
- Para executar apenas o backend: `npm run start:backend`
- Para executar ambos simultaneamente: `npm start`