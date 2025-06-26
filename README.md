
# 🛒 Microservices Shopping App

This project is a basic e-commerce backend system using **microservices architecture**.

## 📁 Services Structure

```
shopping-app/
├── customer-service/     # User registration, login, and auth via gRPC + JWT
├── product-service/      # Product CRUD with image upload and Redis caching
├── shopping-service/     # Shopping cart management
├── payment-service/      # Zarinpal payment integration
├── gateway/              # API Gateway using http-proxy-middleware
```

## 🚀 Services and Ports

| Service           | Port | Description                       |
|-------------------|------|-----------------------------------|
| Customer Service  | 8001 | JWT Auth, Token Validation (gRPC) |
| Product Service   | 8002 | Product management and cache      |
| Shopping Service  | 8003 | Cart logic and validation         |
| Payment Service   | 8004 | Payment with Zarinpal             |
| API Gateway       | 8000 | Central entry point (proxy)       |

## 🧪 How to Run

1. Clone the repository
2. Install dependencies in each service:
   ```bash
   npm install
   ```
3. Run each service manually:
   ```bash
   node index.js
   ```
4. Access services via the gateway at `http://localhost:8000`

## ✅ Features

- Microservice architecture
- gRPC between services
- JWT authentication
- Redis caching
- Zarinpal payment
- Proxy-based API gateway

---

Made with ❤️ by Saeid Ebrahimi
