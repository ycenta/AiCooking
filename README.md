# openai-node-template

## Requirements

- Docker
- Docker Compose

## Setup

```
cd back
```

```bash
cp .env.example .env
```

```env
OPENAI_API_KEY="sk-tB9B3zKK76ALzjfUVOtWT3BlbkFJjzww"
```

## Docker Compose Services Startup

```bash
docker-compose up --detach
```

## Node.js Modules Installation

```bash
docker-compose exec node npm install
```

## Node.js Entrypoint Start

```bash
docker-compose exec node npm start
```

## Docker Compose Services Shutdown

```bash
docker-compose down --remove-orphans --volumes
```
