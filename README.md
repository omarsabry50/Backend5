# E-commerce API (Node.js + Express + MongoDB)

Endpoints:
- `POST /api/auth/register` { email, password } -> returns token
- `POST /api/auth/login` { email, password } -> returns token
- `GET  /api/products` -> list products
- `POST /api/products` (admin) -> create product (requires Bearer token)
- `GET  /api/user/me` -> your profile (requires token)
- `POST /api/user/cart` { productId, quantity? } -> add to cart (requires token)
- `GET  /api/user/cart` -> get cart (requires token)
- `POST /api/user/wishlist` { productId } -> add to wishlist (requires token)
- `GET  /api/user/wishlist` -> get wishlist (requires token)

## Quick start
1. Install Node.js (LTS).  
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI` & `JWT_SECRET`.
4. `npm run dev` (with nodemon) or `npm start`.