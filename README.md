# openai-node-template

## Requirements

- node
- docker
- docker-compose

# Db setup
```
cp .env.example .env
```
Set .env file with 
```
POSTGRES_USER=POSTGRES_USER
POSTGRES_PASSWORD=POSTGRES_PASSWORD
POSTGRES_DB=POSTGRES_DB
```
then
```
docker-compose up -d
```

# Back setup 

```
cd back
cp .env.example .env
```

```env
OPENAI_API_KEY="SQUEEZIEGAMING"
DB_USER=postgres
DB_PASSWORD=postgres
DB=postgres
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
