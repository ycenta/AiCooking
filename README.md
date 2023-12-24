# openai-node-template

## Requirements

- node
- docker
- docker-compose

# Db setup
```
cd db
docker-compose up -d
```

# Back setup 

```
cd back
cp .env.example .env
```

```env
OPENAI_API_KEY="SQUEEZIEGAMING"
```

```
npm install
npm run start
```

# Front setup 

```
  cd front \
  npm install \
  npm run dev
```
