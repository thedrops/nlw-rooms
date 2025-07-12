# NLW Backend

API RESTful desenvolvida com Fastify, TypeScript e PostgreSQL para gerenciamento de agentes.

## 🚀 Tecnologias

- [Fastify](https://www.fastify.io/) - Framework web rápido e eficiente
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para TypeScript e JavaScript
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Zod](https://zod.dev/) - Validação de esquema TypeScript-first

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- Docker (opcional, para rodar o banco de dados)

## 🔧 Configuração

1. Clone o repositório:
   ```bash
   git clone [seu-repositorio]
   cd back
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` conforme necessário.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🐋 Rodando com Docker

1. Inicie o container do PostgreSQL:
   ```bash
   docker run --name postgres -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=agents -p 5432:5432 -d postgres
   ```

2. Execute as migrações (se aplicável):
   ```bash
   # Comando para rodar migrações (ajuste conforme necessário)
   npx drizzle-kit push:pg
   ```

## 🚀 Comandos Úteis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm start`: Inicia o servidor em produção
- `npm run db:seed`: Executa as seeds do banco de dados

## 🌐 Endpoints

A documentação da API estará disponível em `http://localhost:3333/documentation` após iniciar o servidor.

## 📦 Estrutura do Projeto

```
src/
├── http/
│   ├── routes/         # Rotas da aplicação
│   └── server.ts       # Configuração do servidor
├── db/
│   ├── schema.ts       # Esquemas do banco de dados
│   └── seed.ts         # Dados iniciais
└── types/              # Tipos TypeScript
```

