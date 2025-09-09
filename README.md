# Dados de inscrição

Nome: Matheus Henrique Cunha de Arruda
E-mail: matheus.e.arruda@gmail.com
Telefone: (65) 9924025-45

# Sistema de Pessoas Desaparecidas

Este projeto é uma aplicação Next.js para gerenciamento de pessoas desaparecidas.

## Requisitos

- Docker e Docker Compose
- Ou Node.js 20.x e npm

## Como executar com Docker

A aplicação está configurada para ser executada facilmente com Docker. Siga os passos abaixo:

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd missing-persons
```

### 2. Builde o projeto

```bash
docker-compose build
```

### 3. Inicie a aplicação

```bash
docker-compose up
```

A aplicação estará disponível em `http://localhost:3000`.

## Como executar localmente

Se você preferir executar a aplicação localmente sem Docker, siga os passos abaixo:

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd missing-persons
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.