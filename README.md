# Shop Microservices (gRPC)

Simple backend project for an online shop using microservices architecture.  
Services communicate with each other via gRPC.

## Services

- Customer Service (user management)  
- Products Service (product data)  
- Shopping Service (cart and checkout)  

## Tech

- Node.js + Express  
- MongoDB  
- gRPC  
- Docker  

## Run

### Run with Docker

```bash
docker-compose up --build
```

### Run each service manually

```bash
cd customer
npm install
npm start
```

Repeat the same for `products` and `shopping` services.
